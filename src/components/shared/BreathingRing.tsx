"use client";

import { useTranslations } from "next-intl";

/**
 * A calm 4-2-6 breathing animation:
 *   Inhale for 4 seconds · hold for 2 · exhale for 6.
 *
 * One full cycle is 12 seconds (slightly compressed to feel right
 * visually). Three rounds is usually enough — that's the prompt shown
 * to the parent below the ring.
 *
 * Used inside the "Other" Help Now trigger as a grounding aid, and
 * can be embedded in any other Help Now strategy step that benefits
 * from a regulated breath.
 *
 * Pure CSS — the keyframes live in globals.css as `hope-breathe`.
 */
export function BreathingRing() {
  const t = useTranslations("help_now");

  return (
    <section
      aria-label={t("breathe_caption")}
      className="flex flex-col items-center gap-5 rounded-card border border-ink-05 bg-mist px-4 py-8"
    >
      <div className="relative grid h-44 w-44 place-items-center">
        {/* Outer breathing ring */}
        <span
          aria-hidden="true"
          className="hope-breathe absolute inset-0 rounded-full bg-teal/15"
          style={{ filter: "blur(1px)" }}
        />
        <span
          aria-hidden="true"
          className="hope-breathe absolute inset-3 rounded-full bg-teal/25"
        />
        {/* Inner solid */}
        <span className="relative grid h-20 w-20 place-items-center rounded-full bg-teal text-cream shadow-hope-sm">
          <span className="font-serif italic text-xl">{t("breathe_in")}</span>
        </span>
      </div>

      <p className="max-w-sm text-center text-sm leading-loose text-teal-d">
        {t("breathe_caption")}
      </p>
    </section>
  );
}
