import { createUser } from "@/lib/api";
import type { Language } from "@/types/api";

/**
 * Create the Hope backend user record and return its id.
 *
 * Called fire-and-forget at two times:
 *   1. When onboarding completes (POSTs the just-picked name and language).
 *   2. On app boot, if the user is onboarded locally but has no backend
 *      user id yet (first attempt failed because the backend was down
 *      or cold-starting at onboarding time).
 *
 * Throws on failure — caller is expected to catch and either ignore
 * (the boot-time retry will try again next launch) or surface the error.
 * The backend assigns the id; we never generate it client-side.
 */
export async function bootstrapBackendUser(input: {
  name: string;
  language_preference: Language;
}): Promise<string> {
  const { user } = await createUser({
    name: input.name,
    language_preference: input.language_preference,
  });
  return user.id;
}
