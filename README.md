# Hope — Autism Family Support Platform

A calm, multilingual Progressive Web App (PWA) for parents of autistic children. Built mobile-first with Next.js 14, fully offline-capable for the critical Help Now flow.

## What Hope does

- 🆘 **Help Now** — Step-by-step calm guidance during the hard moments. First-time disclaimer · six trigger situations (Meltdown · Sensory overload · Transition · School morning · Bedtime · Other) · 4-2-6 breathing ring · works offline.
- 📚 **Resource Hub** — 8 Quick Guides written with clinicians and cited from peer-reviewed sources. Search, category filter, full reader with sources.
- 👩‍⚕️ **Specialist Directory** — 6 verified specialists with one-tap email or WhatsApp booking. Language + city filters. No payments in MVP.
- 📝 **Notes** — Quick local capture from a modal; list view; delete. Notes never leave the device.
- 🚀 **Onboarding** — Welcome → language → name (3 calm steps).

## Tech stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** with Hope design tokens
- **shadcn/ui** for primitives
- **next-intl** for EN / FR / دری with RTL for Dari
- **@serwist/next** for the offline service worker
- **Zustand** (persisted to localStorage) for client state — name, language, disclaimer ack, notes
- **Inter** + **Instrument Serif** via `next/font/google`

## Getting started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` — it redirects to `/en` (then to `/en/onboarding` on first visit).

## First-run flow

1. Onboarding: Welcome → pick language → enter first name → Dashboard
2. Dashboard greets you: "Good morning, *Sarah.*"
3. Tap Help Now → first time only, the disclaimer screen appears → acknowledge → trigger picker
4. Pick a situation → step-by-step strategy view with sources

The disclaimer is shown once per device (acknowledgement persisted in localStorage). The breathing ring appears on the first step of *Meltdown* and *Something else (general grounding)*.

## Design system

The visual language lives in two files:

- `src/app/globals.css` — colour primitives, type scale, radii, shadows, motion tokens
- `tailwind.config.ts` — Tailwind reads the CSS variables so `bg-teal`, `text-coral-d`, `rounded-card` map back to the tokens

**MVP palette** (do not introduce new colours without updating the system):
- `--teal` `#2F8276` — primary
- `--coral` `#EC8F8D` — emotional accent, Help Now signal
- `--slate` `#537D96` — secondary support
- `--cream` `#F4F0E4` / `--paper` `#FBF9F3` — backgrounds
- `--ink` `#2A3331` — text (never pure black)

## Project structure

```
src/
├── app/
│   ├── globals.css                  ← design tokens
│   ├── sw.ts                        ← service worker (offline)
│   └── [locale]/                    ← i18n routes (en | fr | dr)
│       ├── layout.tsx               ← fonts, RTL, BottomNav, providers
│       ├── page.tsx                 ← Dashboard
│       ├── onboarding/page.tsx      ← Welcome → language → name
│       ├── help-now/
│       │   ├── page.tsx             ← picker (gated by first-time disclaimer)
│       │   └── [trigger]/page.tsx   ← per-trigger strategy view
│       ├── resources/
│       │   ├── page.tsx             ← list with search + categories
│       │   └── [slug]/page.tsx      ← guide reader
│       ├── specialists/page.tsx     ← directory + booking modal
│       └── notes/page.tsx           ← list + add note modal
├── components/
│   ├── dashboard/                   ← Header, Greeting, LangSwitcher,
│   │                                  HelpNowHero, FeatureCard, OfflineStrip
│   ├── onboarding/OnboardingGate.tsx ← client-side redirect to onboarding
│   ├── help-now/                    ← DisclaimerGate, TriggerCard, StrategyView
│   ├── resources/ResourceCard.tsx
│   ├── specialists/                 ← SpecialistCard, BookingModal
│   ├── notes/                       ← AddNoteModal, NoteCard
│   ├── shared/                      ← Modal, EmptyState, BreathingRing
│   ├── layout/BottomNav.tsx
│   └── ui/button.tsx                ← shadcn primitive
├── lib/
│   ├── store.ts                     ← Zustand store + useHasHydrated hook
│   ├── help-now-content.ts          ← Help Now strategies (EN+FR, DR fallback)
│   ├── guides-content.ts            ← Resource Hub guides (EN+FR, DR fallback)
│   ├── specialists-content.ts       ← Specialist directory + filters + url helpers
│   └── utils.ts                     ← cn() helper for class merging
├── messages/                        ← next-intl translation files
│   ├── en.json   (source of truth)
│   ├── fr.json   (human-translated, review with native speaker)
│   └── dr.json   (translated where possible; long-form content falls back to EN)
├── i18n.ts                          ← next-intl config
└── middleware.ts                    ← locale detection / redirect
```

## What still needs work (post-MVP polish)

These are functional but rough edges to revisit before launch:

- **Dari (دری) translations for long-form content** — guide bodies and Help Now strategies currently fall back to English with a "translation pending" banner. UI chrome (buttons, labels, headings) is fully translated.
- **Resource Hub guide bodies** — written by Claude for MVP launch. Review with a clinician before going live with parents.
- **Specialist Directory** — 6 placeholder profiles using realistic shapes. Replace with real verified specialists before launch.
- **Email send for booking** — currently uses `mailto:` (opens user's mail client). Backend wiring (`POST /v1/bookings` per the API contract) is V2.
- **PWA precache list** — Serwist uses default cache rules. For full offline support of guides + Help Now strategies, add a precache manifest in `next.config.mjs`.
- **Settings page** — there's no way for a user to reset their data or change their name after onboarding yet. `useHopeStore().reset()` exists but isn't surfaced.

## Team

- **Noorsaba** — Frontend, UI, UX, accessibility, PWA, i18n
- **Muzhgan** — Backend, database, API, content pipeline, email send

Single source of truth for what's in / out of MVP and how the frontend talks to the backend lives in the design project's handoff folder:
- `MVP_SCOPE.md` — what ships
- `DATA_MODEL.md` — every noun
- `API_CONTRACT.md` — every endpoint

## Project update
