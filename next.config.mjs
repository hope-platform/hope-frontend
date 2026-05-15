import withSerwistInit from "@serwist/next";
import createNextIntlPlugin from "next-intl/plugin";

// next-intl plugin — points at our i18n config so translations load per-locale
const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

// @serwist/next — builds the offline service worker from our source file
const withSerwist = withSerwistInit({
  // Where our service worker source lives
  swSrc: "src/app/sw.ts",
  // Where the compiled service worker is written (served from the site root)
  swDest: "public/sw.js",
  // Turn the service worker OFF in development so it never caches stale code while you build
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// Wrap the config in both plugins. next-intl stays on the outside, like before.
export default withNextIntl(withSerwist(nextConfig));
