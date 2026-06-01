/**
 * Hope backend API client.
 *
 * - Reads the base URL from `NEXT_PUBLIC_API_BASE_URL`.
 * - Throws `ApiError` on any non-2xx response, carrying the backend's
 *   own `{ error: { code, message } }` shape so callers can branch on
 *   the code (e.g. show a friendly EMAIL_FAILED message on booking).
 * - Sends `X-Hope-User-Id` automatically for protected calls when a
 *   `userId` is passed.
 *
 * Intentionally thin — no caching, no retries, no abort handling.
 * Each feature can layer those concerns on top when it needs them.
 */

import type {
  Booking,
  CreateBookingBody,
  CreateUserBody,
  Health,
  Specialist,
  Strategy,
  SituationType,
  Language,
  User,
  ApiErrorPayload,
} from "@/types/api";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://hope-backend-91e6.onrender.com";

/** Thrown by every helper below on a non-2xx response. */
export class ApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.error?.message ?? `Request failed with status ${status}`);
    this.code = payload.error?.code ?? "UNKNOWN";
    this.status = status;
    this.name = "ApiError";
  }
}

interface RequestOpts {
  /** When set, sends `X-Hope-User-Id`. Required for protected endpoints. */
  userId?: string;
  /** JSON body for POST requests. */
  body?: unknown;
  /** HTTP method; defaults to GET. */
  method?: "GET" | "POST";
  /** Pre-encoded query string (no leading `?`). */
  search?: string;
}

async function request<T>(path: string, opts: RequestOpts = {}): Promise<T> {
  const url = `${BASE_URL}${path}${opts.search ? `?${opts.search}` : ""}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (opts.userId) headers["X-Hope-User-Id"] = opts.userId;

  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  if (!res.ok) {
    // Try to parse the documented error shape; fall back gracefully if
    // the response has no JSON body (e.g. CORS preflight failures).
    let payload: ApiErrorPayload = {
      error: { code: "UNKNOWN", message: res.statusText },
    };
    try {
      payload = (await res.json()) as ApiErrorPayload;
    } catch {
      /* keep the fallback */
    }
    throw new ApiError(res.status, payload);
  }

  return (await res.json()) as T;
}

/* ── Public endpoints ───────────────────────────────────── */

/** Cold-start warm-up + uptime check. */
export const getHealth = (): Promise<Health> => request<Health>("/health");

/** All Help Now strategies for a given language. */
export const getSituations = (
  lang: Language,
): Promise<{ strategies: Strategy[] }> =>
  request<{ strategies: Strategy[] }>("/situations", { search: `lang=${lang}` });

/** One Help Now strategy by type. */
export const getSituation = (
  type: SituationType,
  lang: Language,
): Promise<{ strategy: Strategy }> =>
  request<{ strategy: Strategy }>(`/situations/${type}`, {
    search: `lang=${lang}`,
  });

/** All specialists. Optional language and location filters. */
export const getSpecialists = (
  filters: { language?: Language; location?: string } = {},
): Promise<{ specialists: Specialist[] }> => {
  const params = new URLSearchParams();
  if (filters.language) params.set("language", filters.language);
  if (filters.location) params.set("location", filters.location);
  return request<{ specialists: Specialist[] }>("/specialists", {
    search: params.toString(),
  });
};

/** One specialist by id. */
export const getSpecialist = (
  id: string,
): Promise<{ specialist: Specialist }> =>
  request<{ specialist: Specialist }>(`/specialists/${id}`);

/* ── Protected endpoints ────────────────────────────────── */

/** Create the user record after onboarding. No `userId` required — this is the bootstrap. */
export const createUser = (body: CreateUserBody): Promise<{ user: User }> =>
  request<{ user: User }>("/users", { method: "POST", body });

/** Look up a user by id. Requires `X-Hope-User-Id`. */
export const getUser = (id: string, userId: string): Promise<{ user: User }> =>
  request<{ user: User }>(`/users/${id}`, { userId });

/** Submit a booking. */
export const createBooking = (
  body: CreateBookingBody,
  userId: string,
): Promise<{ booking: Booking }> =>
  request<{ booking: Booking }>("/bookings", {
    method: "POST",
    body,
    userId,
  });
