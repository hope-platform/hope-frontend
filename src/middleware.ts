import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Supported languages
  locales: ["en", "fr"],

  // Default language if none is detected
  defaultLocale: "en",
});

export const config = {
  // Apply middleware to all routes except these
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};