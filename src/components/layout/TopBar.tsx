"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LanguageSwitcher } from "@/components/dashboard/LanguageSwitcher";

/**
 * Shared header row used on every screen.
 *
 * Layout: brand mark (link home) on the left, a small settings gear +
 * language pills on the right. Extracted from the per-page inline
 * pattern so the settings screen is reachable from every screen with
 * a single tap, and so the header is consistent everywhere.
 */
export function TopBar() {
  const locale = useLocale();
  const tSettings = useTranslations("settings");

  return (
    <header className="flex items-center justify-between gap-4">
      <DashboardHeader />
      <div className="flex items-center gap-1.5">
        <Link
          href={`/${locale}/settings`}
          aria-label={tSettings("aria_link")}
          className="grid h-8 w-8 place-items-center rounded-full text-ink-55 transition-colors duration-base hover:bg-ink-05 hover:text-ink"
        >
          <Settings className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
