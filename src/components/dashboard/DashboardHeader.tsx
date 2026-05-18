import Link from "next/link";
import { Heart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

/**
 * Dashboard top header: Hope brand mark (teal box + heart + coral dot)
 * with the "Hope" wordmark and a small subline. The whole header is a
 * Link back to the Dashboard so it doubles as a "home" tap target.
 *
 * Inline icon — the mark is part of the brand, not a swappable asset.
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
      {/* Brand mark — teal square with heart, coral dot top-right */}
      <span className="relative grid h-10 w-10 place-items-center rounded-[11px] bg-teal">
        <Heart className="h-5 w-5 text-white" strokeWidth={2} aria-hidden="true" />
        <span
          className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-coral"
          aria-hidden="true"
        />
      </span>

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
