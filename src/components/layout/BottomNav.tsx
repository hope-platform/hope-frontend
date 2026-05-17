"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { BookOpen, HeartPulse, LifeBuoy, NotebookPen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Tab {
  // i18n key under "navigation"
  key: "help_now" | "resources" | "specialists" | "notes";
  // First URL segment after the locale (e.g. "help-now" → /en/help-now)
  route: string;
  Icon: LucideIcon;
  // The Help Now tab carries an extra-visible Forest Deep badge per the MVP spec
  prominent: boolean;
}

const TABS: ReadonlyArray<Tab> = [
  { key: "help_now",    route: "help-now",    Icon: LifeBuoy,    prominent: true },
  { key: "resources",   route: "resources",   Icon: BookOpen,    prominent: false },
  { key: "specialists", route: "specialists", Icon: HeartPulse,  prominent: false },
  { key: "notes",       route: "notes",       Icon: NotebookPen, prominent: false },
];

/**
 * Persistent bottom navigation, shown on every screen via [locale]/layout.tsx.
 * Active tab is detected from the URL segment immediately after the locale,
 * so /en/help-now/meltdown still highlights the Help Now tab.
 */
export function BottomNav() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("navigation");

  // Split "/en/help-now/meltdown" into ["", "en", "help-now", ...] and pick the segment after the locale
  const segment = pathname.split("/")[2] ?? "";

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 border-t border-hope-border bg-hope-surface-white"
    >
      <ul className="mx-auto flex h-nav-height max-w-md items-stretch justify-around">
        {TABS.map(({ key, route, Icon, prominent }) => {
          const isActive = segment === route;
          return (
            <li key={key} className="flex flex-1 items-center justify-center">
              <Link
                href={`/${locale}/${route}`}
                aria-current={isActive ? "page" : undefined}
                className="group flex h-full w-full flex-col items-center justify-center gap-1"
              >
                {prominent ? (
                  // Help Now sits inside a small Forest Deep pill — visually prominent at all times
                  <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-forest-deep text-white shadow-card">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : (
                  <Icon
                    className={`h-5 w-5 transition-colors duration-base ${
                      isActive ? "text-forest-deep" : "text-bark-text-60"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-xs font-medium transition-colors duration-base ${
                    isActive ? "text-forest-deep" : "text-bark-text-60"
                  }`}
                >
                  {t(key)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
