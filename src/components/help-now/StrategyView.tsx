"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Strategy, TriggerId } from "@/lib/help-now-content";
import { BreathingRing } from "@/components/shared/BreathingRing";

interface StrategyViewProps {
  strategy: Strategy;
  /** Which trigger we're inside — used to decide if the breathing ring shows. */
  triggerId: TriggerId;
  /** Where the "I'm okay now" button navigates to (e.g. "/en"). */
  doneHref: string;
}

/**
 * Step-by-step strategy reader. One step at a time with progress dots
 * and prev/next controls. On the last step the Next button becomes
 * "I'm okay now" and routes back to the Dashboard.
 *
 * For Dari (dr) a slate-tinted banner explains that the steps are
 * still in English until the native translation is delivered.
 *
 * The BreathingRing is shown on the first step of:
 *   - the "other" trigger (the general grounding)
 *   - the "meltdown" trigger (where the first step is literally "Breathe first")
 */
export function StrategyView({ strategy, triggerId, doneHref }: StrategyViewProps) {
  const t = useTranslations("help_now");
  const locale = useLocale();
  const [stepIdx, setStepIdx] = useState(0);

  const total = strategy.steps.length;
  const isFirst = stepIdx === 0;
  const isLast = stepIdx === total - 1;
  const step = strategy.steps[stepIdx];

  const showBreathingRing =
    stepIdx === 0 && (triggerId === "other" || triggerId === "meltdown");

  return (
    <div className="hope-fade-in flex flex-col gap-6">
      {/* Translation-pending banner (Dari only) */}
      {locale === "dr" && (
        <div className="rounded-card bg-slate-l px-4 py-3 text-sm leading-normal text-slate-d">
          {t("translation_pending_banner")}
        </div>
      )}

      {/* Step indicator + title */}
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-55">
          {t("step_label", { current: stepIdx + 1, total })}
        </p>
        <h1 className="mt-2 font-serif text-3xl italic leading-snug text-ink">
          {strategy.title}
        </h1>
      </header>

      {/* Progress dots — active one stretches into a bar */}
      <div className="flex gap-1.5" aria-hidden="true">
        {strategy.steps.map((_, i) => {
          let cls = "bg-ink-08";
          if (i === stepIdx) cls = "bg-teal";
          else if (i < stepIdx) cls = "bg-teal-l";
          return (
            <div
              key={i}
              className={`h-1.5 rounded-pill transition-all duration-modal ${
                i === stepIdx ? "w-10" : "w-2"
              } ${cls}`}
            />
          );
        })}
      </div>

      {/* Step content card */}
      <article className="rounded-card border border-ink-05 bg-paper p-5 shadow-hope-sm">
        <h2 className="text-lg font-medium leading-snug text-ink">
          {step.title}
        </h2>
        <p className="mt-3 text-base leading-loose text-ink-90">
          {step.description}
        </p>
      </article>

      {/* Optional breathing ring */}
      {showBreathingRing && <BreathingRing />}

      {/* Step controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
          disabled={isFirst}
          className="
            inline-flex items-center gap-1 rounded-pill px-4 py-2
            text-sm font-medium text-ink-55
            transition-colors duration-base hover:bg-ink-05 hover:text-ink
            disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink-55
          "
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          {t("previous")}
        </button>

        {isLast ? (
          <Link
            href={doneHref}
            className="
              inline-flex items-center gap-1 rounded-pill bg-teal px-5 py-2
              text-sm font-medium text-white shadow-hope-sm
              transition-colors duration-base hover:bg-teal-d
            "
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            {t("im_okay_now")}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setStepIdx((i) => Math.min(total - 1, i + 1))}
            className="
              inline-flex items-center gap-1 rounded-pill bg-teal px-5 py-2
              text-sm font-medium text-white shadow-hope-sm
              transition-colors duration-base hover:bg-teal-d
            "
          >
            {t("next")}
            <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Closing note (worsening) */}
      <aside className="rounded-card bg-mist px-4 py-4 text-sm leading-normal text-teal-d">
        {strategy.note}
      </aside>

      {/* Sources — collapsed by default to keep the focus on the steps */}
      <details className="rounded-card border border-ink-08 px-4 py-3 open:bg-paper">
        <summary className="cursor-pointer text-sm font-medium text-ink">
          {t("sources_label")}
        </summary>
        <ul className="mt-3 flex flex-col gap-1 text-sm text-ink-55">
          {strategy.sources.map((source) => (
            <li key={source}>· {source}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
