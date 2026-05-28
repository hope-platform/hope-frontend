import { Wifi } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * The reassurance strip at the bottom of the Dashboard.
 *
 * Communicates that Help Now + Quick Guides keep working without signal.
 * Critical to the brand promise — many target families live in low-
 * connectivity environments and the "calm guarantee" depends on it.
 */
export function OfflineStrip() {
  const t = useTranslations("dashboard");

  return (
    <section
      aria-label={t("offline_chip")}
      className="flex flex-wrap items-center gap-4 rounded-card border border-ink-05 bg-paper-2 p-6"
    >
      <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-btn bg-mist">
        <Wifi className="h-4 w-4 text-teal" strokeWidth={1.8} aria-hidden="true" />
      </span>

      <span className="min-w-[200px] flex-1">
        <span className="block text-sm font-medium leading-tight text-ink">
          {t("offline_title")}
        </span>
        <span className="mt-1 block text-xs leading-snug text-ink-55">
          {t("offline_description")}
        </span>
      </span>

      <span className="inline-flex h-7 items-center gap-1.5 rounded-pill bg-mist px-3 text-xs font-medium text-teal-d">
        <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
        {t("offline_chip")}
      </span>
    </section>
  );
}
