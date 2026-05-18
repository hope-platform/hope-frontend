"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  BookOpen,
  NotebookPen,
  Users,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

interface Tab {
  // i18n key under "navigation"
  key: "help_now" | "resources" | "specialists" | "notes";
  // First URL segment after the locale (e.g. "help-now" → /en/help-now)
  route: string;
  Icon: LucideIcon;
  // Help Now gets a coral pill — always visually prominent
  prominent: boolean;
}

const TABS: ReadonlyArray<Tab> = [
  { key: "help_now",    route: "help-now",    Icon: AlertCircle, prominent: true  },
  { key: "resources",   route: "resources",   Icon: BookOpen,    prominent: false },
  { key: "specialists", route: "specialists", Icon: Users,       prominent: false },
  { key: "notes",       route: "notes",       Icon: NotebookPen, prominent: false },
];

/**
 * Persistent bottom navigation. Shown on every screen via the locale
 * layout. Active tab is read from the URL segment after the locale,
 * so /en/help-now/meltdown still highlights the Help Now tab.
 */
export function BottomNav() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("navigation");

  // "/en/help-now/meltdown" → ["", "en", "help-now", …]
  const segment = pathname.split("/")[2] ?? "";

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-ink-05 bg-paper"
    >
      <ul className="mx-auto flex h-nav-height max-w-2xl items-stretch justify-around">
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
                  /* Help Now — always coral, white icon */
                  <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-coral text-white shadow-hope-sm">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                ) : (
                  <Icon
                    className={`h-5 w-5 transition-colors duration-base ${
                      isActive ? "text-teal" : "text-ink-55"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-[11px] font-medium transition-colors duration-base ${
                    isActive ? "text-teal" : "text-ink-55"
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
