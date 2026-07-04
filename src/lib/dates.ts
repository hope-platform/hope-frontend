/**
 * Date formatting that respects Hope's chosen language.
 *
 * The store uses "en" / "fr" / "dr" as its own short codes. "dr" is
 * Hope's shorthand for Dari, but it isn't a valid BCP-47 language tag —
 * passing it straight to Intl silently falls back to the browser's
 * default locale, so Dari dates end up rendering in English or French.
 *
 * `toBCP47` maps our short codes onto real language tags Intl accepts;
 * `formatDate` / `formatDateTime` route every call through it so we
 * never accidentally lose localisation again.
 *
 *   - "en" → "en"      (English)
 *   - "fr" → "fr"      (French)
 *   - "dr" → "fa-AF"   (Persian, Afghanistan region — Dari.
 *                       Renders with Persian numerals: ۱۲۳۴۵۶۷۸۹۰)
 */

import type { Locale } from "@/lib/store";

const BCP47: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  dr: "fa-AF",
};

/** Map a Hope locale code to a BCP-47 tag Intl recognises. */
export function toBCP47(locale: Locale): string {
  return BCP47[locale] ?? "en";
}

type DateInput = Date | string | number;

function toDate(input: DateInput): Date {
  return input instanceof Date ? input : new Date(input);
}

/** Format a calendar date (no time) in the app locale. */
export function formatDate(
  input: DateInput,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions,
): string {
  return toDate(input).toLocaleDateString(toBCP47(locale), options);
}

/** Format a date + time in the app locale. */
export function formatDateTime(
  input: DateInput,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions,
): string {
  return toDate(input).toLocaleString(toBCP47(locale), options);
}
