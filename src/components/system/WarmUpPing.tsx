"use client";

import { useEffect } from "react";
import { getHealth } from "@/lib/api";

/**
 * Fire-and-forget warm-up ping.
 *
 * The Hope backend lives on Render's free tier, which sleeps after
 * ~15 minutes of inactivity. The first request after a sleep can
 * take ~30 seconds to wake. This component pings `GET /health` once
 * on app boot so the box is warm by the time the user navigates to a
 * data-driven screen.
 *
 * We don't await it, don't read the response, and silently swallow
 * errors — this is purely a UX accelerator. Mounted once from
 * [locale]/layout.tsx; renders nothing.
 */
export function WarmUpPing() {
  useEffect(() => {
    void getHealth().catch(() => {
      /* ignore — the ping is opportunistic */
    });
  }, []);

  return null;
}
