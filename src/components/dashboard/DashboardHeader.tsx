import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

/**
 * Dashboard top header: the designed Hope icon (from /public/favicon/favicon.svg)
 * next to the "Hope" wordmark and a small subline. The whole header is a
 * Link back to the Dashboard so it doubles as a "home" tap target.
 *
 * Using a plain <img> rather than next/image because the SVG already wraps a
 * pre-sized raster — Next's optimiser would add no value and would force us
 * to allow SVGs in next.config.
 */
export function DashboardHeader() {
  const locale = useLocale();
  const t = useTranslations("common");

  return (
    <Link
      href={`/${locale}`}
      aria-label={`${t("brand_name")} — home`}
      className="inline-flex items-center gap-3"
    >
      {/* The designed Hope icon mark.
          Using the 192px PNG (not favicon.svg) because the SVG file Real-
          FaviconGenerator produced is an empty wrapper with no embedded
          image data. The PNG is the actual designed art. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/favicon/web-app-manifest-192x192.png"
        alt=""
        aria-hidden="true"
        className="h-10 w-10 rounded-[10px]"
      />

      {/* Wordmark + subline */}
      <span className="leading-tight">
        <span className="block text-base font-medium tracking-tight text-ink">
          {t("brand_name")}
        </span>
        <span className="block text-[11px] text-ink-55">
          {t("brand_subtitle")}
        </span>
      </span>
    </Link>
  );
}
