"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type GreetingKey =
  | "greeting_morning"
  | "greeting_afternoon"
  | "greeting_evening";

/**
 * Renders a calm time-of-day greeting in Instrument Serif, followed by the
 * subtitle in Inter. The hour is read from the user's local clock (browser),
 * not the server, so it's always correct no matter where the server is.
 *
 * To avoid a hydration mismatch on the first render, we start with "morning"
 * as a stable default and then correct it inside useEffect after mount.
 */
export function Greeting() {
  const t = useTranslations("dashboard");
  const [greetingKey, setGreetingKey] = useState<GreetingKey>("greeting_morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreetingKey("greeting_morning");
    } else if (hour < 18) {
      setGreetingKey("greeting_afternoon");
    } else {
      setGreetingKey("greeting_evening");
    }
  }, []);

  return (
    <header>
      <h1 className="font-serif text-3xl leading-snug text-bark-text">
        {t(greetingKey)}
      </h1>
      <p className="mt-2 text-md text-hope-text-secondary">{t("subtitle")}</p>
    </header>
  );
}
