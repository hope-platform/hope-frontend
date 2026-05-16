"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

/**
 * Each locale's label is shown in its own language so users can find their
 * language even if the current UI is in a different one.
 */
const LOCALES = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "dr", label: "دری" },
] as const;

/**
 * Top-of-page language switcher. Three pill links that swap the locale
 * prefix in the URL while keeping the rest of the path intact.
 *
 * Example: when on /en/help-now, clicking FR navigates to /fr/help-now.
 */
export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("language");

  // Strip the current locale prefix from the path so we can prepend a new one.
  // pathname looks like "/en" (dashboard) or "/en/help-now" (a subroute).
  const pathWithoutLocale = pathname.replace(/^\/(en|fr|dr)/, "") || "";

  return (
    <nav aria-label={t("label")} className="flex items-center gap-2">
      {LOCALES.map(({ code, label }) => {
        const isActive = currentLocale === code;
        return (
          <Link
            key={code}
            href={`/${code}${pathWithoutLocale}`}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-pill bg-forest-deep px-3 py-1 text-sm font-medium text-white transition-colors duration-base"
                : "rounded-pill px-3 py-1 text-sm font-medium text-hope-text-secondary transition-colors duration-base hover:bg-bark-text-08"
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
