/**
 * Hope backend API — response & request types.
 *
 * Field naming matches the wire format exactly (snake_case). The
 * component layer maps these to the existing camelCase UI types on
 * the day each feature is migrated — keeping the wrapper thin makes
 * mismatches obvious and easy to track.
 *
 * Shapes are reproduced verbatim from Muzhgan's documented responses.
 */

export type Language = "en" | "fr" | "dr";

export type SituationType =
  | "meltdown"
  | "sensory"
  | "transition"
  | "school"
  | "bedtime"
  | "other";

export type ContactMethod = "email" | "whatsapp";

/** ── Help Now strategies ────────────────────────────────── */

export interface StrategyStep {
  order: number;
  text: string;
}

/** Returned by `GET /situations` (in `{ strategies }`) and `GET /situations/:type` (in `{ strategy }`). */
export interface Strategy {
  id: string;
  situation_type: SituationType;
  steps: StrategyStep[];
  source_citation: string;
  language: Language;
  created_at: string; // ISO 8601
}

/** ── Specialists ────────────────────────────────────────── */

/** Returned by `GET /specialists` (in `{ specialists }`) and `GET /specialists/:id` (in `{ specialist }`). */
export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  location: string;
  languages: Language[];
  price_range: string;
  contact_whatsapp: string;
  contact_email: string;
  bio: string;
  photo_url: string | null;
  verified: boolean;
  created_at: string;
}

/** ── Users ──────────────────────────────────────────────── */

/** Returned by `POST /users` and `GET /users/:id` (in `{ user }`). */
export interface User {
  id: string;
  name: string;
  language_preference: Language;
  created_at: string;
}

export interface CreateUserBody {
  name: string;
  language_preference: Language;
}

/** ── Bookings ───────────────────────────────────────────── */

/** Returned by `POST /bookings` (in `{ booking }`). */
export interface Booking {
  id: string;
  specialist_id: string;
  parent_name: string;
  parent_email: string;
  contact_method: ContactMethod;
  status: string;
  created_at: string;
}

export interface CreateBookingBody {
  specialist_id: string;
  contact_method: ContactMethod;
  parent_name: string;
  parent_email: string;
}

/** ── Health & errors ────────────────────────────────────── */

/** Returned by `GET /health`. */
export interface Health {
  status: string;
  message: string;
  database: string;
}

/** Backend error payload — every non-2xx response uses this shape. */
export interface ApiErrorPayload {
  error: {
    code: string;
    message: string;
  };
}
