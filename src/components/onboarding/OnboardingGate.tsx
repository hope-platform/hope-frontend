"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useHasHydrated, useHopeStore } from "@/lib/store";

/**
 * Client-side gate that redirects un-onboarded users to /{locale}/onboarding.
 * Mounted once in [locale]/layout.tsx so it guards EVERY screen — opening a
 * deep link like /en/notes before onboarding now redirects too.
 *
 * Does nothing until Zustand has hydrated (so returning users don't see a
 * flash), and never redirects away from the onboarding screen itself
 * (which would cause an infinite loop). Returns null — purely a side effect.
 */
export function OnboardingGate() {
  const hydrated = useHasHydrated();
  const onboardedAt = useHopeStore((s) => s.onboardedAt);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    if (!hydrated) return;
    if (onboardedAt) return;
    // Already on the onboarding flow — don't redirect (would loop forever).
    if (pathname.includes("/onboarding")) return;
    router.replace(`/${locale}/onboarding`);
  }, [hydrated, onboardedAt, locale, pathname, router]);

  return null;
}
