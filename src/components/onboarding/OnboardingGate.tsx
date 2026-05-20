"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useHasHydrated, useHopeStore } from "@/lib/store";

/**
 * Client-side gate that redirects unboarded users to /{locale}/onboarding.
 * Mounted in the dashboard page (and could be mounted in other pages too,
 * but for MVP the dashboard is the entry point so this is sufficient).
 *
 * Does nothing until Zustand has hydrated, so returning users don't see
 * a flash. Returns null in all cases — purely a side-effect component.
 */
export function OnboardingGate() {
  const hydrated = useHasHydrated();
  const onboardedAt = useHopeStore((s) => s.onboardedAt);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!hydrated) return;
    if (!onboardedAt) router.replace(`/${locale}/onboarding`);
  }, [hydrated, onboardedAt, locale, router]);

  return null;
}
