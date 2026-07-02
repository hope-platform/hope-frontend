import {
  AlertCircle,
  ArrowRight,
  Backpack,
  Heart,
  Moon,
  Sparkles,
  Waves,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { TriggerCard } from "@/components/help-now/TriggerCard";
import { TopBar } from "@/components/layout/TopBar";
import { DisclaimerGate } from "@/components/help-now/DisclaimerGate";
import type { TriggerId } from "@/lib/help-now-content";
import type { LucideIcon } from "lucide-react";

/**
 * Per-trigger visual identity — icon + Hope palette accent.
 * Tailwind reads these literal class strings from source so they
 * survive tree-shaking. Do NOT switch to dynamic concatenation.
 */
const TRIGGER_VISUALS: Record<
  TriggerId,
  { Icon: LucideIcon; iconBgClassName: string; iconColorClassName: string }
> = {
  meltdown:   { Icon: Waves,      iconBgClassName: "bg-coral-l", iconColorClassName: "text-coral-d" },
  sensory:    { Icon: Sparkles,   iconBgClassName: "bg-sand-l",  iconColorClassName: "text-sand-d"  },
  transition: { Icon: ArrowRight, iconBgClassName: "bg-slate-l", iconColorClassName: "text-slate-d" },
  school:     { Icon: Backpack,   iconBgClassName: "bg-mist",    iconColorClassName: "text-teal-d"  },
  bedtime:    { Icon: Moon,       iconBgClassName: "bg-slate-l", iconColorClassName: "text-slate-d" },
  other:      { Icon: Heart,      iconBgClassName: "bg-coral-l", iconColorClassName: "text-coral-d" },
};

const TRIGGER_ORDER: ReadonlyArray<TriggerId> = [
  "meltdown",
  "sensory",
  "transition",
  "school",
  "bedtime",
  "other",
];

/**
 * Help Now — picker screen, gated by the first-time disclaimer.
 *
 * Parent arrives here from the Dashboard hero or the bottom nav.
 * The first time they reach this screen, DisclaimerGate intercepts
 * and shows the calm "Hope is not an emergency service" notice; once
 * acknowledged (localStorage), the picker is shown directly forever.
 */
export default function HelpNowPicker() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <main className="bg-cream">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 py-7 md:px-8 md:py-10">

        {/* Top bar — same shape as Dashboard for continuity */}
        <TopBar />

        <DisclaimerGate>
          {/* Picker header */}
          <header className="hope-fade-in">
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-coral">
              <AlertCircle className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              {t("navigation.help_now")}
            </div>
            <h1 className="mt-2 font-serif text-3xl italic leading-snug text-ink md:text-4xl">
              {t("help_now.title")}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-loose text-ink-70">
              {t("help_now.subtitle")}
            </p>
          </header>

          {/* Trigger grid */}
          <div className="hope-fade-in mt-6 grid grid-cols-2 gap-3">
            {TRIGGER_ORDER.map((triggerId) => {
              const { Icon, iconBgClassName, iconColorClassName } = TRIGGER_VISUALS[triggerId];
              return (
                <TriggerCard
                  key={triggerId}
                  title={t(`help_now.triggers.${triggerId}.label`)}
                  description={t(`help_now.triggers.${triggerId}.description`)}
                  Icon={Icon}
                  href={`/${locale}/help-now/${triggerId}`}
                  iconBgClassName={iconBgClassName}
                  iconColorClassName={iconColorClassName}
                />
              );
            })}
          </div>
        </DisclaimerGate>
      </div>
    </main>
  );
}
