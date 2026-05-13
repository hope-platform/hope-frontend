import { useTranslations } from "next-intl";

/**
 * Home page for Hope — shows a simple welcome message
 * This will be replaced with the full dashboard in a later day
 */
export default function Home() {
  const t = useTranslations("dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-green-900">
        🌿 Hope
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        {t("greeting_morning")}
      </p>
    </main>
  );
}