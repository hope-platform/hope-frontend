"use client";

import { useEffect } from "react";
import { useHasHydrated, useHopeStore } from "@/lib/store";
import { bootstrapBackendUser } from "@/lib/user-bootstrap";

/**
 * Boot-time backend user retry.
 *
 * If the user is onboarded locally (we have name + language) but the
 * backend user id is still null — typically because the initial POST
 * /users at onboarding time failed or timed out against a cold-starting
 * server — this component tries once on app boot to create the user
 * and populate the id.
 *
 * Silent on failure: the next app boot will try again. Mounted once
 * from [locale]/layout.tsx; renders nothing.
 */
export function UserBootstrap() {
  const hydrated = useHasHydrated();
  const name = useHopeStore((s) => s.name);
  const language = useHopeStore((s) => s.language);
  const onboardedAt = useHopeStore((s) => s.onboardedAt);
  const userId = useHopeStore((s) => s.userId);
  const setUserId = useHopeStore((s) => s.setUserId);

  useEffect(() => {
    if (!hydrated) return;
    if (!onboardedAt) return; // not onboarded yet
    if (userId) return; // already have a backend user
    if (!name) return; // need a name to create the user

    void bootstrapBackendUser({ name, language_preference: language })
      .then(setUserId)
      .catch((e) => {
        // Silent — we'll retry on the next boot. Logged for dev visibility.
        console.warn("Boot-time user bootstrap failed:", e);
      });
  }, [hydrated, onboardedAt, userId, name, language, setUserId]);

  return null;
}
