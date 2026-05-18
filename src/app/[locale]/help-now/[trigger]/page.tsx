import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { StrategyView } from "@/components/help-now/StrategyView";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LanguageSwitcher } from "@/components/dashboard/LanguageSwitcher";
import { getStrategy, TRIGGER_IDS, type TriggerId } from "@/lib/help-now-content";

interface PageProps {
  params: { locale: string; trigger: string };
}

/**
 * Per-trigger Help Now screen.
 * Reads the strategy for `params.trigger` in the active locale. Returns
 * Next's notFound() page if the trigger ID is unknown.
 */
export default function HelpNowStrategyPage({ params }: PageProps) {
  const locale = useLocale();
  const t = useTranslations("navigation");
  const strategy = getStrategy(params.locale, params.trigger);

  if (!strategy || !TRIGGER_IDS.includes(params.trigger as TriggerId)) {
    notFound();
  }

  return (
    <main className="bg-cream">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 py-7 md:px-8 md:py-10">

        <header className="flex items-center justify-between gap-4">
          <DashboardHeader />
          <LanguageSwitcher />
        </header>

        {/* Back link to the picker */}
        <Link
          href={`/${locale}/help-now`}
          className="
            inline-flex items-center gap-1 text-sm font-medium text-ink-55
            transition-colors duration-base hover:text-ink
          "
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          {t("help_now")}
        </Link>

        <StrategyView
          strategy={strategy}
          triggerId={params.trigger as TriggerId}
          doneHref={`/${locale}`}
        />
      </div>
    </main>
  );
}
