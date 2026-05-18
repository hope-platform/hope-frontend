"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

/**
 * Each locale's label is shown in its own language so users can find
 * their language even when the current UI is in a different one.
 */
const LOCALES = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "dr", label: "دری" },
] as const;

/**
 * Compact pill-style language switcher. Three pills inside an ink-05
 * pill container; the active pill is solid ink with cream text.
 *
 * Example: on /en/help-now, clicking FR navigates to /fr/help-now.
 */
export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("language");

  const pathWithoutLocale = pathname.replace(/^\/(en|fr|dr)/, "") || "";

  return (
    <nav
      aria-label={t("label")}
      className="flex items-center gap-1 rounded-pill bg-ink-05 p-1"
    >
      {LOCALES.map(({ code, label }) => {
        const isActive = currentLocale === code;
        return (
          <Link
            key={code}
            href={`/${code}${pathWithoutLocale}`}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-pill bg-ink px-3 py-1 text-xs font-medium text-cream transition-colors duration-base"
                : "rounded-pill px-3 py-1 text-xs font-medium text-ink-55 transition-colors duration-base hover:text-ink"
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
