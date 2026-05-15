import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

// Inter — Hope's UI / body typeface. next/font downloads and self-hosts it at build time.
const inter = Inter({
  subsets: ["latin"],            // only load the Latin character set (smaller download)
  weight: ["400", "500", "600"], // the three weights Hope's design uses
  variable: "--font-inter",      // expose it as a CSS variable we can reference anywhere
  display: "swap",               // show fallback text immediately, swap in Inter when ready
});

// Instrument Serif — Hope's display / heading typeface. Single weight (400), normal + italic.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hope — Autism Family Support",
  description: "Support for parents of autistic children",
  // Link the PWA manifest so the app is installable on a phone's home screen.
  // (next-pwa used to inject this automatically; with Serwist we add it ourselves.)
  manifest: "/manifest.json",
};

/**
 * Root layout for Hope — wraps every page with the correct language provider,
 * loads our two fonts, and sets text direction (RTL for Dari).
 * @param children - The page content to render
 * @param params - Contains the locale (en, fr or dr)
 */
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Load the translations for the current language
  const messages = await getMessages();

  // Dari is written right-to-left; English and French are left-to-right
  const dir = locale === "dr" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
