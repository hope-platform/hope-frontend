"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Check, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/shared/Modal";
import { buildMailtoURL, type Specialist } from "@/lib/specialists-content";
import { useHopeStore } from "@/lib/store";

interface BookingModalProps {
  specialist: Specialist | null;
  onClose: () => void;
}

/**
 * Booking modal. Pre-fills a friendly message addressed to the specialist,
 * the parent's name (from the store), and an email field. Submitting opens
 * the user's mail client via mailto: — no payment, no backend in MVP.
 *
 * Per the MVP doc: "booking is confirmed manually within 48 hours."
 */
export function BookingModal({ specialist, onClose }: BookingModalProps) {
  const t = useTranslations("booking");
  const storedName = useHopeStore((s) => s.name) ?? "";

  const [yourName, setYourName] = useState(storedName);
  const [yourEmail, setYourEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  // When the modal opens for a specialist, reset and seed the message.
  useEffect(() => {
    if (!specialist) return;
    setSent(false);
    setYourName(storedName);
    setYourEmail("");
    setMessage(
      t("message_template", {
        firstName: specialist.name.split(" ").slice(-1)[0],
        signature: storedName || "",
      }),
    );
  }, [specialist, storedName, t]);

  if (!specialist) return null;

  const send = () => {
    const subject = t("subject", { name: specialist.name });
    const fullBody = `${message}\n\n— ${yourName}\nReply to: ${yourEmail}`;
    const url = buildMailtoURL({ to: specialist.email, subject, body: fullBody });
    // Trigger the user's mail client
    window.location.href = url;
    setSent(true);
    // Auto-close after a short success state
    setTimeout(onClose, 2000);
  };

  return (
    <Modal
      open={!!specialist}
      onClose={onClose}
      eyebrow={t("eyebrow")}
      title={specialist.name}
      maxWidthClassName="max-w-md"
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-mist">
            <Check className="h-6 w-6 text-teal" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <h3 className="font-serif text-xl italic text-teal-d">{t("sent_title")}</h3>
          <p className="max-w-xs text-sm leading-loose text-ink-55">{t("sent_body")}</p>
        </div>
      ) : (
        <>
          {/* No-payment notice */}
          <div className="mb-4 flex items-start gap-3 rounded-card bg-paper-2 px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-55" strokeWidth={1.8} aria-hidden="true" />
            <p className="text-xs leading-loose text-ink-70">{t("no_payment_notice")}</p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => { e.preventDefault(); send(); }}
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
                className="w-full rounded-btn border border-ink-08 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-35 transition-colors focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10"
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
                placeholder="you@example.com"
                className="w-full rounded-btn border border-ink-08 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-35 transition-colors focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-ink-55">
                {t("your_message")}
              </span>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={7}
                className="w-full resize-y rounded-btn border border-ink-08 bg-paper px-4 py-3 text-sm leading-loose text-ink placeholder:text-ink-35 transition-colors focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10"
              />
            </label>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 items-center justify-center rounded-pill px-4 text-sm font-medium text-ink-55 transition-colors duration-base hover:bg-ink-05 hover:text-ink"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                disabled={!yourName.trim() || !yourEmail.trim() || !message.trim()}
                className="
                  inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-teal px-5
                  text-sm font-medium text-white shadow-hope-sm
                  transition-colors duration-base hover:bg-teal-d
                  disabled:bg-ink-15 disabled:text-ink-55 disabled:cursor-not-allowed
                "
              >
                <Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                {t("send_to", { email: specialist.email })}
              </button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
}
