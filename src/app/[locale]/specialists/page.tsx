"use client";

import { useMemo, useState } from "react";
import { Filter, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LanguageSwitcher } from "@/components/dashboard/LanguageSwitcher";
import { SpecialistCard } from "@/components/specialists/SpecialistCard";
import { BookingModal } from "@/components/specialists/BookingModal";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  SPECIALISTS,
  allCities,
  filterSpecialists,
  type Language,
  type Specialist,
} from "@/lib/specialists-content";

/**
 * Specialist Directory — list of verified clinicians with language +
 * city filters and an email-or-WhatsApp booking flow.
 *
 * Filters are client-side (the list is small in MVP). Selecting "Book"
 * on a card opens BookingModal, which pre-fills a polite message and
 * hands off to the user's mail client via mailto:.
 */
export default function SpecialistsPage() {
  const t = useTranslations("specialists");
  const cities = useMemo(() => allCities(), []);

  const [lang, setLang] = useState<Language | "">("");
  const [city, setCity] = useState<string>("");
  const [booking, setBooking] = useState<Specialist | null>(null);

  const filtered = useMemo(
    () => filterSpecialists({ language: lang, city }),
    [lang, city],
  );

  return (
    <main className="bg-cream">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 py-7 md:px-8 md:py-10">

        <header className="flex items-center justify-between gap-4">
          <DashboardHeader />
          <LanguageSwitcher />
        </header>

        {/* Page header */}
        <section className="hope-fade-in">
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-teal">
            {t("eyebrow")}
          </div>
          <h1 className="mt-2 font-serif text-3xl italic leading-snug text-ink md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-loose text-ink-70">
            {t("subtitle", { count: SPECIALISTS.length })}
          </p>
        </section>

        {/* Filters */}
        <section className="flex flex-wrap items-center gap-3 rounded-card border border-ink-05 bg-paper p-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-55">
            <Filter className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
            {t("filter_label")}
          </span>

          <label className="flex items-center gap-2 text-xs text-ink-55">
            <span>{t("language")}</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language | "")}
              className="rounded-btn border border-ink-08 bg-cream px-3 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
            >
              <option value="">{t("any")}</option>
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="dr">دری</option>
            </select>
          </label>

          <label className="flex items-center gap-2 text-xs text-ink-55">
            <span>{t("city")}</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-btn border border-ink-08 bg-cream px-3 py-1.5 text-xs text-ink focus:border-teal focus:outline-none"
            >
              <option value="">{t("any")}</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <span className="ms-auto text-xs text-ink-55">
            {t("count_of", { shown: filtered.length, total: SPECIALISTS.length })}
          </span>
        </section>

        {/* List or empty state */}
        {filtered.length === 0 ? (
          <EmptyState
            Icon={Users}
            title={t("empty_title")}
            description={t("empty_description")}
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filtered.map((s) => (
              <SpecialistCard key={s.id} specialist={s} onBook={setBooking} />
            ))}
          </div>
        )}
      </div>

      <BookingModal specialist={booking} onClose={() => setBooking(null)} />
    </main>
  );
}
