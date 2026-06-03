import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { BottomNav } from "@/components/layout/BottomNav";
import { OnboardingGate } from "@/components/onboarding/OnboardingGate";
import { UserBootstrap } from "@/components/system/UserBootstrap";
import { WarmUpPing } from "@/components/system/WarmUpPing";
import "../globals.css";

// Inter — Hope's UI / body typeface.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Instrument Serif — Hope's editorial / display typeface (italic for emotion).
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hope — Autism Family Support",
  description: "A calm companion for parents of autistic children",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  // Hope teal — the brand primary. Tints the mobile browser's address bar
  // when the PWA is installed to the home screen.
  themeColor: "#2F8276",
};

/**
 * Root layout — wraps every page with the language provider, loads
 * Hope's two fonts, sets text direction (RTL for Dari), and mounts the
 * persistent BottomNav.
 */
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  // Dari is right-to-left; English and French are left-to-right
  const dir = locale === "dr" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* Redirects un-onboarded users to /onboarding on any screen */}
          <OnboardingGate />
          {/* Wakes the Render backend on app boot so the first data-driven
              page doesn't wait through a 30s cold start. */}
          <WarmUpPing />
          {/* Retries the backend user POST if onboarding finished locally
              but the backend id is still missing (e.g. backend was cold). */}
          <UserBootstrap />
          <div className="min-h-screen pb-nav-height">{children}</div>
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
