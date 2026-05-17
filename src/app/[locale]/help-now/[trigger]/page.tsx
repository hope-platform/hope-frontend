import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useLocale } from "next-intl";
import { StrategyView } from "@/components/help-now/StrategyView";
import { getStrategy } from "@/lib/help-now-content";

interface PageProps {
  params: { locale: string; trigger: string };
}

/**
 * Per-trigger Help Now screen.
 * Reads the strategy for `params.trigger` in the active locale. Returns a
 * Next.js notFound() page if the trigger ID is unknown (caught and rendered
 * as the standard 404).
 */
export default function HelpNowStrategyPage({ params }: PageProps) {
  const locale = useLocale();
  const strategy = getStrategy(params.locale, params.trigger);

  if (!strategy) {
    notFound();
  }

  return (
    <main className="bg-hope-bg">
      <div className="mx-auto flex w-full max-w-md flex-col gap-section-gap px-screen-h py-section-gap">
        {/* Back link to the picker */}
        <Link
          href={`/${locale}/help-now`}
          className="inline-flex items-center gap-1 text-sm font-medium text-hope-text-secondary transition-colors duration-base hover:text-bark-text"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Help Now
        </Link>

        <StrategyView strategy={strategy} doneHref={`/${locale}`} />
      </div>
    </main>
  );
}
