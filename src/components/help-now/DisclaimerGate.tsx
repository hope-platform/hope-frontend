"use client";

import { AlertCircle, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useHasHydrated, useHopeStore } from "@/lib/store";

interface DisclaimerGateProps {
  /** Rendered once the disclaimer is acknowledged. */
  children: React.ReactNode;
}

/**
 * First-time gate for Help Now. The first time a user reaches /help-now
 * (or any sub-route), this screen is shown before the picker. They
 * tap "I understand" to acknowledge — the timestamp is persisted in
 * localStorage so the screen is never shown again.
 *
 * Per the MVP spec, this disclaimer must be acknowledged once per
 * device. We don't bury the underlying emergency-services note — it
 * stays prominent at the top.
 */
export function DisclaimerGate({ children }: DisclaimerGateProps) {
  const t = useTranslations("disclaimer");
  const hydrated = useHasHydrated();
  const acknowledgedAt = useHopeStore((s) => s.helpNowDisclaimerAcknowledgedAt);
  const acknowledge = useHopeStore((s) => s.acknowledgeHelpNowDisclaimer);

  // Until Zustand has read from localStorage, render nothing to avoid a
  // disclaimer flash for returning users.
  if (!hydrated) {
    return (
      <div className="hope-fade-in flex min-h-[40vh] items-center justify-center text-ink-35">
        …
      </div>
    );
  }

  if (acknowledgedAt) {
    return <>{children}</>;
  }

  return (
    <article className="hope-fade-in flex flex-col gap-5">
      {/* Header */}
      <header>
        <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-coral">
          <AlertCircle className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          {t("eyebrow")}
        </div>
        <h1 className="mt-2 font-serif text-3xl italic leading-snug text-ink md:text-4xl">
          {t("title")}
        </h1>
      </header>

      {/* Emergency banner — kept very visible */}
      <div className="rounded-card bg-coral-l px-4 py-4 text-sm leading-normal text-coral-d">
        <p>
          <strong className="font-medium">{t("emergency_strong")} </strong>
          {t("emergency_body")}
        </p>
      </div>

      {/* Calm explainer */}
      <p className="text-base leading-loose text-ink-90">
        {t("explainer")}
      </p>

      {/* Bullet list of caveats */}
      <ul className="flex flex-col gap-3">
        {[
          t("caveat_sources"),
          t("caveat_offline"),
          t("caveat_stop"),
          t("caveat_specialist"),
        ].map((line) => (
          <li key={line} className="flex items-start gap-3 text-sm leading-loose text-ink-70">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" strokeWidth={2.2} aria-hidden="true" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {/* Acknowledge */}
      <button
        type="button"
        onClick={acknowledge}
        className="
          inline-flex h-12 items-center justify-center rounded-pill bg-teal px-6
          text-sm font-medium text-white shadow-hope-sm
          transition-colors duration-base hover:bg-teal-d
          focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-cream
        "
      >
        {t("acknowledge")}
      </button>
      <p className="text-center text-[11px] text-ink-35">{t("once_only")}</p>
    </article>
  );
}
