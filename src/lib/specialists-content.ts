/**
 * Hope — Specialist Directory shared types & helpers.
 *
 * The actual specialist data now comes from the backend (GET /specialists,
 * via src/lib/api.ts). What lives here:
 *
 *   - The UI-shape `Specialist` type that components consume.
 *   - `adaptApiSpecialist` — maps a snake_case backend record into the
 *     UI shape, filling the three fields the backend doesn't expose
 *     (initials, avatarColor, country) by computing them deterministically
 *     from the record itself.
 *   - `filterSpecialists` — client-side filter by language and city.
 *   - `buildWhatsAppURL` / `buildMailtoURL` — used by SpecialistCard and
 *     BookingModal. BookingModal's mailto path will move to POST /bookings
 *     in the Day 4 PR.
 */

import type { Specialist as ApiSpecialist } from "@/types/api";

export type Language = "en" | "fr" | "dr";

export interface Specialist {
  id: string;
  name: string;
  /** Two-letter initials for the avatar, derived from `name`. */
  initials: string;
  /** Avatar background colour — picked deterministically from `id`
   * so each specialist always renders the same colour across reloads. */
  avatarColor: "teal" | "slate" | "coral-d" | "sand-d";
  /** Role/specialty (English; localise via i18n if needed in V2). */
  role: string;
  /** City label including country code, e.g. "Paris, FR". */
  city: string;
  country: "FR" | "UK" | "AF" | "ES";
  languages: Language[];
  priceRange: string;
  /** Short narrative blurb (~140 chars). */
  blurb: string;
  email: string;
  /** E.164 format. We strip digits to build wa.me links. */
  whatsapp: string;
  verified: boolean;
  verifiedAt: string;
}

/* ── Adapter (API → UI) ──────────────────────────────────── */

const AVATAR_COLORS = ["teal", "slate", "coral-d", "sand-d"] as const;

function hashId(id: string): number {
  // Tiny deterministic string hash — enough to pick an avatar colour
  // bucket. Same id → same bucket forever.
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickAvatarColor(id: string): Specialist["avatarColor"] {
  return AVATAR_COLORS[hashId(id) % AVATAR_COLORS.length];
}

function pickInitials(name: string): string {
  // "Dr. Elena Rivera" → "ER" : strip honorific, take first letters of
  // the first and last word. Falls back to first two characters for
  // single-word names.
  const stripped = name.replace(/^(Dr|Mr|Mrs|Ms|Mx)\.?\s+/i, "").trim();
  const parts = stripped.split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function parseCountry(location: string): Specialist["country"] {
  // "Paris, FR" → "FR". Falls back to "FR" if the suffix isn't one of
  // our four supported country codes (defensive — backend may seed
  // additional cities in the future).
  const code = location.match(/,\s*([A-Z]{2})$/)?.[1];
  if (code === "FR" || code === "UK" || code === "AF" || code === "ES") return code;
  return "FR";
}

/** Map a backend Specialist (snake_case) to the UI Specialist shape. */
export function adaptApiSpecialist(api: ApiSpecialist): Specialist {
  return {
    id: api.id,
    name: api.name,
    initials: pickInitials(api.name),
    avatarColor: pickAvatarColor(api.id),
    role: api.specialty,
    city: api.location,
    country: parseCountry(api.location),
    languages: api.languages,
    priceRange: api.price_range,
    blurb: api.bio,
    email: api.contact_email,
    whatsapp: api.contact_whatsapp,
    verified: api.verified,
    verifiedAt: api.created_at,
  };
}

/* ── Filter ─────────────────────────────────────────────── */

/** Filter the list by language and/or city. Empty string = no filter. */
export function filterSpecialists(
  list: Specialist[],
  opts: { language?: Language | ""; city?: string },
): Specialist[] {
  return list.filter((s) => {
    if (opts.language && !s.languages.includes(opts.language as Language)) return false;
    if (opts.city && s.city !== opts.city) return false;
    return true;
  });
}

/* ── URL builders ───────────────────────────────────────── */

/** Build a wa.me URL from a stored WhatsApp number. */
export function buildWhatsAppURL(whatsapp: string, message?: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  const url = `https://wa.me/${digits}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}

/** Build a mailto: URL with a pre-filled subject + body. */
export function buildMailtoURL(opts: {
  to: string;
  subject: string;
  body: string;
}): string {
  const params = new URLSearchParams({
    subject: opts.subject,
    body: opts.body,
  }).toString();
  return `mailto:${opts.to}?${params}`;
}
