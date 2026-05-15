import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Supported languages — English, French, and Dari (dr)
  locales: ["en", "fr", "dr"],

  // Default language if none is detected
  defaultLocale: "en",
});

export const config = {
  // Apply middleware to all routes except these
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
