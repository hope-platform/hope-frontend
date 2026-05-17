"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Strategy } from "@/lib/help-now-content";

interface StrategyViewProps {
  strategy: Strategy;
  /** Where the "I'm okay now" / done button navigates to. */
  doneHref: string;
}

/**
 * Step-by-step strategy reader. Renders one step at a time with a progress
 * indicator and prev/next controls. After the last step the Next button
 * becomes "I'm okay now" and links back to the Dashboard.
 *
 * If the current locale is Dari (dr), a small banner is shown above the
 * strategy explaining that the steps are still in English because the Dari
 * translation is in progress.
 */
export function StrategyView({ strategy, doneHref }: StrategyViewProps) {
  const t = useTranslations("help_now");
  const locale = useLocale();
  const [stepIdx, setStepIdx] = useState(0);

  const total = strategy.steps.length;
  const isFirst = stepIdx === 0;
  const isLast = stepIdx === total - 1;
  const step = strategy.steps[stepIdx];

  return (
    <div className="flex flex-col gap-section-gap">
      {/* Translation-pending banner (Dari only, for now) */}
      {locale === "dr" && (
        <div className="rounded-card bg-lavender-haze p-card-pad text-sm leading-normal text-bark-text">
          {t("translation_pending_banner")}
        </div>
      )}

      {/* Step indicator + title */}
      <header>
        <p className="text-xs font-medium uppercase tracking-wide text-hope-text-secondary">
          {t("step_label", { current: stepIdx + 1, total })}
        </p>
        <h1 className="mt-2 font-serif text-2xl italic leading-snug text-bark-text">
          {strategy.title}
        </h1>
      </header>

      {/* Progress dots — the active one stretches into a bar */}
      <div className="flex gap-1.5" aria-hidden="true">
        {strategy.steps.map((_, i) => {
          let cls = "bg-bark-text-08";
          if (i === stepIdx) cls = "bg-forest-deep";
          else if (i < stepIdx) cls = "bg-forest-deep-light";
          return (
            <div
              key={i}
              className={`h-1.5 rounded-pill transition-all duration-modal ${
                i === stepIdx ? "w-8" : "w-2"
              } ${cls}`}
            />
          );
        })}
      </div>

      {/* Step content card */}
      <article className="rounded-card bg-hope-surface-white p-card-pad shadow-card">
        <h2 className="text-lg font-medium leading-snug text-bark-text">
          {step.title}
        </h2>
        <p className="mt-3 text-base leading-loose text-bark-text">
          {step.description}
        </p>
      </article>

      {/* Step controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
          disabled={isFirst}
          className="inline-flex items-center gap-1 rounded-pill px-4 py-2 text-sm font-medium text-hope-text-secondary transition-colors duration-base hover:bg-bark-text-08 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          {t("previous")}
        </button>

        {isLast ? (
          <Link
            href={doneHref}
            className="inline-flex items-center gap-1 rounded-pill bg-forest-deep px-5 py-2 text-sm font-medium text-white transition-colors duration-base hover:bg-forest-deep-dark"
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            {t("im_okay_now")}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setStepIdx((i) => Math.min(total - 1, i + 1))}
            className="inline-flex items-center gap-1 rounded-pill bg-forest-deep px-5 py-2 text-sm font-medium text-white transition-colors duration-base hover:bg-forest-deep-dark"
          >
            {t("next")}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Closing note */}
      <aside className="rounded-card bg-sage-mist p-card-pad text-sm leading-normal text-bark-text">
        {strategy.note}
      </aside>

      {/* Sources — collapsed by default to keep the focus on the steps */}
      <details className="rounded-card border border-hope-border p-card-pad">
        <summary className="cursor-pointer text-sm font-medium text-bark-text">
          {t("sources_label")}
        </summary>
        <ul className="mt-3 flex flex-col gap-1 text-sm text-hope-text-secondary">
          {strategy.sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
