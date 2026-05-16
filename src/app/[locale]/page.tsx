import { BookOpen, HeartPulse, LifeBuoy, NotebookPen } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Greeting } from "@/components/dashboard/Greeting";
import { LanguageSwitcher } from "@/components/dashboard/LanguageSwitcher";

/**
 * Hope's home / Dashboard screen — the first thing parents see when they open
 * the app. Mobile-first layout (max-w-md), built on Hope design tokens.
 *
 * Layout (top → bottom):
 *   - Language switcher (right-aligned)
 *   - Time-of-day greeting + subtitle
 *   - Help Now card (Forest Deep, most prominent)
 *   - Three secondary cards: Resource Hub · Find Specialist · Add Note
 *
 * Card hrefs point at routes we haven't built yet — those are the Day 5+ work.
 */
export default function Home() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-hope-bg">
      <div className="mx-auto flex w-full max-w-md flex-col gap-section-gap px-screen-h py-section-gap">
        {/* Language switcher — top of page, right-aligned */}
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>

        {/* Time-of-day greeting + subtitle */}
        <Greeting />

        {/* Help Now — the most prominent card, full-width Forest Deep */}
        <DashboardCard
          variant="primary"
          title={t("navigation.help_now")}
          description={t("dashboard.help_now_description")}
          Icon={LifeBuoy}
          href={`/${locale}/help-now`}
        />

        {/* Three secondary cards */}
        <DashboardCard
          title={t("navigation.resources")}
          description={t("dashboard.resources_description")}
          Icon={BookOpen}
          href={`/${locale}/resources`}
          accentClassName="text-ember-warm"
        />

        <DashboardCard
          title={t("navigation.specialists")}
          description={t("dashboard.specialists_description")}
          Icon={HeartPulse}
          href={`/${locale}/specialists`}
          accentClassName="text-dusk-violet"
        />

        <DashboardCard
          title={t("navigation.notes")}
          description={t("dashboard.notes_description")}
          Icon={NotebookPen}
          href={`/${locale}/notes`}
          accentClassName="text-forest-deep"
        />
      </div>
    </main>
  );
}
