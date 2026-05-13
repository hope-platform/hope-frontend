import { getRequestConfig } from "next-intl/server";

/** Supported languages in Hope */
const locales = ["en", "fr"];

/**
 * next-intl configuration — loads the correct language file
 * based on the locale in the URL (en or fr)
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request
  let locale = await requestLocale;

  // If no locale or unsupported, fall back to English
  if (!locale || !locales.includes(locale)) {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});