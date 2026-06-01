/**
 * Specialist filter cities — hardcoded for the MVP.
 *
 * Muzhgan's `/specialists` endpoint doesn't expose a `facets` block
 * yet (planned for Phase 2). Until then, this fixed list drives the
 * specialist filter dropdown. Strings match the `location` field
 * exactly so they can be passed straight through to
 * `getSpecialists({ location })`.
 */

export const SPECIALIST_CITIES = [
  "Paris, FR",
  "London, UK",
  "Kabul, AF",
  "Madrid, ES",
  "Lyon, FR",
] as const;

export type SpecialistCity = (typeof SPECIALIST_CITIES)[number];
