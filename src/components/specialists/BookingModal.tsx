"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Check,
  Loader2,
  Mail,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/shared/Modal";
import { type Specialist } from "@/lib/specialists-content";
import { useHopeStore } from "@/lib/store";
import { ApiError, createBooking } from "@/lib/api";
import { bootstrapBackendUser } from "@/lib/user-bootstrap";
import type { ContactMethod } from "@/types/api";

interface BookingModalProps {
  specialist: Specialist | null;
  onClose: () => void;
}

type BookingState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "email_failed" } // 502 — booking saved but email send failed
  | { kind: "error"; message: string };

/**
 * Booking modal.
 *
 * Calls POST /bookings on submit. The backend templates and sends the
 * email to the specialist server-side (parent's email becomes Reply-To),
 * so there's no message textarea here — only the contact-method
 * preference (email / WhatsApp), which lets the specialist know how the
 * parent would like to be reached.
 *
 * If the user happens to book before the onboarding-time POST /users
 * has completed (userId still null), we attempt one inline bootstrap
 * before sending so the request can carry X-Hope-User-Id.
 */
export function BookingModal({ specialist, onClose }: BookingModalProps) {
  const t = useTranslations("booking");
  const storedName = useHopeStore((s) => s.name) ?? "";
  const storedLanguage = useHopeStore((s) => s.language);
  const userId = useHopeStore((s) => s.userId);
  const setUserId = useHopeStore((s) => s.setUserId);

  const [yourName, setYourName] = useState(storedName);
  const [yourEmail, setYourEmail] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
  const [state, setState] = useState<BookingState>({ kind: "idle" });

  // Reset on open.
  useEffect(() => {
    if (!specialist) return;
    setState({ kind: "idle" });
    setYourName(storedName);
    setYourEmail("");
    setContactMethod("email");
  }, [specialist, storedName]);

  if (!specialist) return null;

  const submitting = state.kind === "submitting";

  const submit = async () => {
    setState({ kind: "submitting" });

    // Make sure we have an X-Hope-User-Id for this request. Normally
    // populated at onboarding time; if not, try one inline bootstrap.
    let currentUserId = userId;
    if (!currentUserId && storedName) {
      try {
        currentUserId = await bootstrapBackendUser({
          name: storedName,
          language_preference: storedLanguage,
        });
        setUserId(currentUserId);
      } catch (e) {
        console.warn("Inline bootstrap during booking failed:", e);
      }
    }

    if (!currentUserId) {
      setState({ kind: "error", message: "no_user" });
      return;
    }

    try {
      await createBooking(
        {
          specialist_id: specialist.id,
          contact_method: contactMethod,
          parent_name: yourName.trim(),
          parent_email: yourEmail.trim(),
        },
        currentUserId,
      );
      setState({ kind: "sent" });
      setTimeout(onClose, 2200);
    } catch (e) {
      if (e instanceof ApiError && e.code === "EMAIL_FAILED") {
        // Booking row saved; email send will be retried server-side.
        setState({ kind: "email_failed" });
        setTimeout(onClose, 3500);
      } else {
        console.error("Booking failed:", e);
        setState({
          kind: "error",
          message: e instanceof Error ? e.message : String(e),
        });
      }
    }
  };

  return (
    <Modal
      open={!!specialist}
      onClose={submitting ? () => undefined : onClose}
      eyebrow={t("eyebrow")}
      title={specialist.name}
      maxWidthClassName="max-w-md"
    >
      {state.kind === "sent" ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-mist">
            <Check className="h-6 w-6 text-teal" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <h3 className="font-serif text-xl italic text-teal-d">{t("sent_title")}</h3>
          <p className="max-w-xs text-sm leading-loose text-ink-55">{t("sent_body")}</p>
        </div>
      ) : state.kind === "email_failed" ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-sand-l">
            <AlertCircle className="h-6 w-6 text-sand-d" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <h3 className="font-serif text-xl italic text-sand-d">{t("email_failed_title")}</h3>
          <p className="max-w-xs text-sm leading-loose text-ink-55">{t("email_failed_body")}</p>
        </div>
      ) : (
        <>
          {/* No-payment notice */}
          <div className="mb-4 flex items-start gap-3 rounded-card bg-paper-2 px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-55" strokeWidth={1.8} aria-hidden="true" />
            <p className="text-xs leading-loose text-ink-70">{t("no_payment_notice")}</p>
          </div>

          {/* Error banner */}
          {state.kind === "error" && (
            <div className="mb-4 flex items-start gap-3 rounded-card bg-coral-l px-4 py-3">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-coral-d" strokeWidth={1.8} aria-hidden="true" />
              <div>
                <div className="text-sm font-medium text-coral-d">
                  {state.message === "no_user" ? t("error_no_user_title") : t("error_title")}
                </div>
                <div className="mt-0.5 text-xs leading-loose text-ink-70">
                  {state.message === "no_user" ? t("error_no_user_body") : t("error_description")}
                </div>
              </div>
            </div>
          )}

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => { e.preventDefault(); void submit(); }}
          >
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-ink-55">
                {t("your_name")}
              </span>
              <input
                type="text"
                required
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                disabled={submitting}
                className="w-full rounded-btn border border-ink-08 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-35 transition-colors focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10 disabled:opacity-50"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-ink-55">
                {t("your_email")}
              </span>
              <input
                type="email"
                required
                value={yourEmail}
                onChange={(e) => setYourEmail(e.target.value)}
                disabled={submitting}
                placeholder="you@example.com"
                className="w-full rounded-btn border border-ink-08 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-35 transition-colors focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10 disabled:opacity-50"
              />
            </label>

            <fieldset className="block">
              <legend className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-ink-55">
                {t("contact_method_label")}
              </legend>
              <div className="grid grid-cols-2 gap-2">
                <ContactMethodOption
                  selected={contactMethod === "email"}
                  onSelect={() => setContactMethod("email")}
                  Icon={Mail}
                  label={t("contact_method_email")}
                  disabled={submitting}
                />
                <ContactMethodOption
                  selected={contactMethod === "whatsapp"}
                  onSelect={() => setContactMethod("whatsapp")}
                  Icon={MessageCircle}
                  label={t("contact_method_whatsapp")}
                  disabled={submitting}
                />
              </div>
            </fieldset>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="inline-flex h-10 items-center justify-center rounded-pill px-4 text-sm font-medium text-ink-55 transition-colors duration-base hover:bg-ink-05 hover:text-ink disabled:opacity-50"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                disabled={!yourName.trim() || !yourEmail.trim() || submitting}
                className="
                  inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-teal px-5
                  text-sm font-medium text-white shadow-hope-sm
                  transition-colors duration-base hover:bg-teal-d
                  disabled:bg-ink-15 disabled:text-ink-55 disabled:cursor-not-allowed
                "
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} aria-hidden="true" />
                    {t("sending")}
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                    {t("submit")}
                  </>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
}

function ContactMethodOption({
  selected,
  onSelect,
  Icon,
  label,
  disabled,
}: {
  selected: boolean;
  onSelect: () => void;
  Icon: LucideIcon;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 rounded-btn border px-4 py-3 text-sm font-medium
        transition-all duration-base disabled:opacity-50
        ${selected
          ? "border-teal bg-paper text-ink shadow-[0_0_0_3px_rgba(47,130,118,0.10)]"
          : "border-ink-08 bg-cream text-ink-70 hover:border-ink-15 hover:text-ink"}
      `}
    >
      <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
      {label}
    </button>
  );
}
