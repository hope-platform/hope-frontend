"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/lib/dates";
import type { Locale } from "@/lib/store";

type GreetingKey =
  | "greeting_morning"
  | "greeting_afternoon"
  | "greeting_evening";

interface GreetingProps {
  /**
   * The parent's first name. When provided, the greeting becomes
   * "Good morning, [name]." with [name] rendered in Instrument Serif
   * italic teal. Falls back to "common.default_name" when omitted.
   */
  name?: string;
}

/**
 * Time-of-day greeting hero — the first thing on the Dashboard.
 *
 *   ☀  Tuesday, 16 May
 *   Good morning, *Sarah.*       ← name is serif italic teal
 *   A calm place to find help…
 *
 * The hour is read client-side so the greeting is correct regardless
 * of server timezone. We start with a stable default and correct it
 * inside useEffect to avoid hydration mismatches.
 */
export function Greeting({ name }: GreetingProps) {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;

  const [greetingKey, setGreetingKey] =
    useState<GreetingKey>("greeting_morning");
  const [dateLabel, setDateLabel] = useState<string>("");
  const [isEvening, setIsEvening] = useState(false);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12)      setGreetingKey("greeting_morning");
    else if (hour < 17) setGreetingKey("greeting_afternoon");
    else                setGreetingKey("greeting_evening");

    setIsEvening(hour >= 17);

    setDateLabel(
      formatDate(now, locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    );
  }, [locale]);

  const displayName = name || tCommon("default_name");

  return (
    <header>
      <div className="flex items-center gap-2.5 text-ink-55">
        {isEvening ? (
          <Moon className="h-4 w-4 text-coral" aria-hidden="true" />
        ) : (
          <Sun className="h-4 w-4 text-coral" aria-hidden="true" />
        )}
        <span className="text-sm">{dateLabel || "\u00A0"}</span>
      </div>

      <h1 className="mt-3 text-4xl font-medium leading-tight tracking-tight md:text-5xl">
        {t(greetingKey)},{" "}
        <span className="font-serif italic font-regular text-teal">
          {displayName}.
        </span>
      </h1>

      <p className="mt-3 max-w-xl text-base leading-loose text-ink-70 md:text-md">
        {t("subtitle")}
      </p>
    </header>
  );
}
