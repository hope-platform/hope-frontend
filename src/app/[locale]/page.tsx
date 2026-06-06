"use client";

import Link from "next/link";
import { BookOpen, NotebookPen, Settings, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FeatureCard } from "@/components/dashboard/FeatureCard";
import { Greeting } from "@/components/dashboard/Greeting";
import { HelpNowHero } from "@/components/dashboard/HelpNowHero";
import { LanguageSwitcher } from "@/components/dashboard/LanguageSwitcher";
import { OfflineStrip } from "@/components/dashboard/OfflineStrip";
import { useHopeStore } from "@/lib/store";

/**
 * Hope — Dashboard (the first screen a parent sees).
 *
 * Vertical rhythm:
 *   1. Top bar — brand + language switcher
 *   2. Greeting — time of day, date, name, subtitle
 *   3. Help Now hero — dark ink, prominent, full width
 *   4. Three feature cards — Resource Hub · Find a Specialist · Add a Note
 *   5. Offline reassurance strip
 *
 * Mobile-first. On md+ the feature cards become a 3-column grid.
 * Persistent BottomNav lives in [locale]/layout.tsx, not here.
 *
 * Note: this is a "use client" page because it reads the user's name
 * from the Zustand store and shows it in the Greeting. Onboarding
 * redirect is handled inside OnboardingGate.
 */
export default function Home() {
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const tNav = useTranslations("navigation");
  const tSettings = useTranslations("settings");
  const name = useHopeStore((s) => s.name);

  return (
    <main className="bg-cream">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-5 py-7 md:px-8 md:py-10">

        {/* ── Top bar: brand + settings + language ─────────── */}
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

        {/* ── Body ────────────────────────────────────────── */}
        <div className="hope-fade-in flex flex-col gap-7">
          <Greeting name={name ?? undefined} />

          <HelpNowHero href={`/${locale}/help-now`} />

          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
            <FeatureCard
              scheme="resources"
              title={tNav("resources")}
              description={t("resources_description")}
              Icon={BookOpen}
              href={`/${locale}/resources`}
            />
            <FeatureCard
              scheme="specialists"
              title={tNav("specialists")}
              description={t("specialists_description")}
              Icon={Users}
              href={`/${locale}/specialists`}
            />
            <FeatureCard
              scheme="notes"
              title={tNav("notes")}
              description={t("notes_description")}
              Icon={NotebookPen}
              href={`/${locale}/notes`}
            />
          </div>

          <OfflineStrip />
        </div>
      </div>
    </main>
  );
}
