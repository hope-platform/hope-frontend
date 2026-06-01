import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Locale codes supported by Hope.
 * Keep in sync with src/i18n.ts and src/middleware.ts.
 */
export type Locale = "en" | "fr" | "dr";

/**
 * A single quick note. Stored locally only — never sent to the backend in MVP.
 * The list lives in localStorage via Zustand persist.
 */
export interface Note {
  id: string;
  text: string;
  createdAt: string; // ISO 8601
  updatedAt?: string; // ISO 8601 — set when the note is edited
}

interface HopeState {
  /** ── User profile (set during onboarding) ───────────────── */
  name: string | null;
  language: Locale;
  /** ISO timestamp the user finished onboarding. null = not yet onboarded. */
  onboardedAt: string | null;

  /** ── Backend user identity ──────────────────────────────── */
  /** Hope backend user UUID — sent as the X-Hope-User-Id header on
   * protected requests. Populated by POST /users during onboarding
   * (wired in a later PR). null = no backend user yet. */
  userId: string | null;

  /** ── Help Now disclaimer ── ISO timestamp the user acknowledged.
   * null = needs to see the disclaimer before the picker. */
  helpNowDisclaimerAcknowledgedAt: string | null;

  /** ── Notes (local-only in MVP) ──────────────────────────── */
  notes: Note[];

  /** ── Actions ────────────────────────────────────────────── */
  setName: (name: string) => void;
  setLanguage: (language: Locale) => void;
  setUserId: (id: string | null) => void;
  completeOnboarding: (name: string, language: Locale) => void;
  acknowledgeHelpNowDisclaimer: () => void;
  addNote: (text: string) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  /** Wipe everything (used by Settings → Reset, useful for testing too). */
  reset: () => void;
}

/**
 * Hope's single client-side store. Persisted to localStorage under
 * `hope-storage`. Backend in MVP stores nothing of this — every state
 * change here is local, by design.
 *
 * SSR note: Zustand initialises with the defaults on the server, then
 * hydrates from localStorage after mount. Components that need the
 * real state should call `useHasHydrated()` and render a fallback
 * (or null) until it returns true.
 */
export const useHopeStore = create<HopeState>()(
  persist(
    (set) => ({
      name: null,
      language: "en",
      onboardedAt: null,
      userId: null,
      helpNowDisclaimerAcknowledgedAt: null,
      notes: [],

      setName: (name) => set({ name: name.trim() || null }),
      setLanguage: (language) => set({ language }),
      setUserId: (id) => set({ userId: id }),

      completeOnboarding: (name, language) =>
        set({
          name: name.trim() || null,
          language,
          onboardedAt: new Date().toISOString(),
        }),

      acknowledgeHelpNowDisclaimer: () =>
        set({ helpNowDisclaimerAcknowledgedAt: new Date().toISOString() }),

      addNote: (text) => {
        const clean = text.trim();
        if (!clean) return;
        set((state) => ({
          notes: [
            { id: crypto.randomUUID(), text: clean, createdAt: new Date().toISOString() },
            ...state.notes,
          ],
        }));
      },

      updateNote: (id, text) => {
        const clean = text.trim();
        if (!clean) return;
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id
              ? { ...n, text: clean, updatedAt: new Date().toISOString() }
              : n,
          ),
        }));
      },

      deleteNote: (id) =>
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),

      reset: () =>
        set({
          name: null,
          language: "en",
          onboardedAt: null,
          userId: null,
          helpNowDisclaimerAcknowledgedAt: null,
          notes: [],
        }),
    }),
    {
      name: "hope-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

/**
 * Convenience hook: returns true once Zustand has rehydrated from
 * localStorage. Use this to avoid SSR/CSR flashes in client components
 * that depend on persisted state (name, onboardedAt, etc.).
 */
import { useEffect, useState } from "react";

export function useHasHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // Set on mount; hasHydrated() reads from the persist middleware
    const unsub = useHopeStore.persist.onFinishHydration(() => setHydrated(true));
    if (useHopeStore.persist.hasHydrated()) setHydrated(true);
    return () => unsub();
  }, []);
  return hydrated;
}
