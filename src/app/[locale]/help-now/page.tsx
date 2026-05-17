import { ArrowRight, Backpack, Heart, Moon, Sparkles, Waves } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { TriggerCard } from "@/components/help-now/TriggerCard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import type { TriggerId } from "@/lib/help-now-content";
import type { LucideIcon } from "lucide-react";

/**
 * Per-trigger visual identity — icon + Hope palette accent.
 * Tailwind reads these literal class strings from source so they survive
 * tree-shaking. Do NOT switch to dynamic concatenation.
 */
const TRIGGER_VISUALS: Record<
  TriggerId,
  { Icon: LucideIcon; iconBgClassName: string; iconColorClassName: string }
> = {
  meltdown: {
    Icon: Waves,
    iconBgClassName: "bg-sand-glow",
    iconColorClassName: "text-ember-warm",
  },
  sensory: {
    Icon: Sparkles,
    iconBgClassName: "bg-lavender-haze",
    iconColorClassName: "text-dusk-violet",
  },
  transition: {
    Icon: ArrowRight,
    iconBgClassName: "bg-sage-mist",
    iconColorClassName: "text-forest-deep",
  },
  school: {
    Icon: Backpack,
    iconBgClassName: "bg-sage-mist",
    iconColorClassName: "text-forest-deep",
  },
  bedtime: {
    Icon: Moon,
    iconBgClassName: "bg-lavender-haze",
    iconColorClassName: "text-dusk-violet",
  },
  other: {
    Icon: Heart,
    iconBgClassName: "bg-sand-glow",
    iconColorClassName: "text-ember-warm",
  },
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
 * Help Now — picker screen.
 * Parent arrives here from the Dashboard, picks the closest situation, and
 * is taken into the per-trigger calm guidance.
 */
export default function HelpNowPicker() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <main className="bg-hope-bg">
      <div className="mx-auto flex w-full max-w-md flex-col gap-section-gap px-screen-h py-section-gap">
        <DashboardHeader />

        <header>
          <p className="text-xs font-medium uppercase tracking-wide text-hope-text-secondary">
            {t("navigation.help_now")}
          </p>
          <h1 className="mt-2 font-serif text-3xl italic leading-snug text-bark-text">
            {t("help_now.title")}
          </h1>
          <p className="mt-2 text-md text-hope-text-secondary">
            {t("help_now.subtitle")}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3">
          {TRIGGER_ORDER.map((triggerId) => {
            const { Icon, iconBgClassName, iconColorClassName } =
              TRIGGER_VISUALS[triggerId];
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
      </div>
    </main>
  );
}
