import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
export const metadata: Metadata = {
  title: "Hope — Autism Family Support",
  description: "Support for parents of autistic children",
};

/**
 * Root layout for Hope — wraps every page with the correct language provider
 * @param children - The page content to render
 * @param params - Contains the locale (en or fr)
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

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}