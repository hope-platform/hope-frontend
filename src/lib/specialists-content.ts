/**
 * Hope — Specialist Directory content.
 *
 * Six verified specialists for MVP launch. Each profile is curated and
 * the contact details are real-shaped (email + WhatsApp in E.164 form).
 *
 * In MVP these are stored as static data — backend wiring comes later.
 * Blurbs are English-only for MVP (DATA_MODEL.md). Localised role +
 * city + price labels are added at render time via i18n.
 */

export type Language = "en" | "fr" | "dr";

export interface Specialist {
  id: string;
  name: string;
  /** Two-letter initials for the avatar. */
  initials: string;
  /** Avatar background colour — chosen from the Hope palette. */
  avatarColor: "teal" | "slate" | "coral-d" | "sand-d";
  /** Role/specialty (English; localise via i18n if needed in V2). */
  role: string;
  /** City label including country code. */
  city: string;
  country: "FR" | "UK" | "AF" | "ES";
  languages: Language[];
  priceRange: string;
  /** Short narrative blurb (~140 chars). */
  blurb: string;
  email: string;
  /** E.164 format (e.g. "+33612345678"). Frontend strips digits to build wa.me link. */
  whatsapp: string;
  verified: boolean;
  verifiedAt: string;
}

export const SPECIALISTS: Specialist[] = [
  {
    id: "elena-rivera",
    name: "Dr. Elena Rivera",
    initials: "ER",
    avatarColor: "teal",
    role: "Developmental pediatrician",
    city: "Paris, FR",
    country: "FR",
    languages: ["en", "fr"],
    priceRange: "€80–120",
    blurb: "15 years working with families navigating new diagnoses. Calm, plain-language approach.",
    email: "rivera@clinic.fr",
    whatsapp: "+33612345678",
    verified: true,
    verifiedAt: "2026-04-01T00:00:00Z",
  },
  {
    id: "maria-chen",
    name: "Maria Chen",
    initials: "MC",
    avatarColor: "slate",
    role: "Occupational therapist",
    city: "Lyon, FR",
    country: "FR",
    languages: ["en", "fr"],
    priceRange: "€60–90",
    blurb: "Sensory integration and daily-living skills. Home visits available across Lyon.",
    email: "maria@brightsteps.fr",
    whatsapp: "+33623456789",
    verified: true,
    verifiedAt: "2026-04-04T00:00:00Z",
  },
  {
    id: "jonas-park",
    name: "Jonas Park",
    initials: "JP",
    avatarColor: "coral-d",
    role: "Speech-language pathologist",
    city: "Marseille, FR",
    country: "FR",
    languages: ["en", "fr"],
    priceRange: "€55–85",
    blurb: "AAC, speech delays, and gestalt language processing. Online sessions available.",
    email: "jonas@speakeasy.fr",
    whatsapp: "+33634567890",
    verified: true,
    verifiedAt: "2026-04-08T00:00:00Z",
  },
  {
    id: "ahmad-karimi",
    name: "Dr. Ahmad Karimi",
    initials: "AK",
    avatarColor: "sand-d",
    role: "Child psychiatrist",
    city: "Kabul, AF",
    country: "AF",
    languages: ["dr", "en"],
    priceRange: "On request",
    blurb: "Mood and anxiety in autistic children. Tele-consultations in Dari and English.",
    email: "a.karimi@hopecare.af",
    whatsapp: "+93791234567",
    verified: true,
    verifiedAt: "2026-04-12T00:00:00Z",
  },
  {
    id: "lila-khan",
    name: "Lila Khan",
    initials: "LK",
    avatarColor: "teal",
    role: "Family therapist",
    city: "London, UK",
    country: "UK",
    languages: ["en"],
    priceRange: "£70–110",
    blurb: "Sibling dynamics, parent burnout, and gentle family routines.",
    email: "lila@khan.uk",
    whatsapp: "+447700900123",
    verified: true,
    verifiedAt: "2026-04-15T00:00:00Z",
  },
  {
    id: "sofia-martinez",
    name: "Sofia Martinez",
    initials: "SM",
    avatarColor: "slate",
    role: "Behavioural therapist",
    city: "Madrid, ES",
    country: "ES",
    languages: ["en", "fr"],
    priceRange: "€65–95",
    blurb: "Naturalistic developmental approaches — never compliance-based. Spanish, English, French.",
    email: "sofia@calmsteps.es",
    whatsapp: "+34612345678",
    verified: true,
    verifiedAt: "2026-04-20T00:00:00Z",
  },
];

/** All unique cities, for the filter dropdown. */
export function allCities(): string[] {
  return Array.from(new Set(SPECIALISTS.map((s) => s.city))).sort();
}

/** All unique languages spoken across the directory. */
export function allLanguages(): Language[] {
  const set = new Set<Language>();
  SPECIALISTS.forEach((s) => s.languages.forEach((l) => set.add(l)));
  return Array.from(set);
}

/** Filter the directory by language and/or city. Empty string = no filter. */
export function filterSpecialists(opts: {
  language?: Language | "";
  city?: string;
}): Specialist[] {
  return SPECIALISTS.filter((s) => {
    if (opts.language && !s.languages.includes(opts.language as Language)) return false;
    if (opts.city && s.city !== opts.city) return false;
    return true;
  });
}

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
