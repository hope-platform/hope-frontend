"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, Filter, RefreshCw, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { TopBar } from "@/components/layout/TopBar";
import { SpecialistCard } from "@/components/specialists/SpecialistCard";
import { BookingModal } from "@/components/specialists/BookingModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { getSpecialists } from "@/lib/api";
import { SPECIALIST_CITIES } from "@/lib/locations";
import {
  adaptApiSpecialist,
  filterSpecialists,
  type Language,
  type Specialist,
} from "@/lib/specialists-content";

/**
 * Specialist Directory — list of verified clinicians fetched from the
 * Hope backend (GET /specialists), with language + city filters and an
 * email-or-WhatsApp booking flow.
 *
 * Filter dropdown values come from a hardcoded city list
 * (src/lib/locations.ts) because the backend doesn't expose a `facets`
 * block in MVP — Muzhgan is adding that in Phase 2.
 *
 * Filtering itself is client-side. With ~6 specialists in MVP, fetching
 * everything once is faster than a roundtrip per filter change.
 */
export default function SpecialistsPage() {
  const t = useTranslations("specialists");

  const [specialists, setSpecialists] = useState<Specialist[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<Language | "">("");
  const [city, setCity] = useState<string>("");
  const [booking, setBooking] = useState<Specialist | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setSpecialists(null);
    try {
      const { specialists: list } = await getSpecialists();
      setSpecialists(list.map(adaptApiSpecialist));
    } catch (e) {
      // Surface a friendly message; details go to the console for dev.
      console.error("Failed to load specialists:", e);
      setError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const loading = specialists === null && !error;
  const totalCount = specialists?.length ?? 0;

  const filtered = useMemo(
    () =>
      specialists
        ? filterSpecialists(specialists, { language: lang, city })
        : [],
    [specialists, lang, city],
  );

  return (
    <main className="bg-cream">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 py-7 md:px-8 md:py-10">

        <TopBar />

        {/* Page header */}
        <section className="hope-fade-in">
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-teal">
            {t("eyebrow")}
          </div>
          <h1 className="mt-2 font-serif text-3xl italic leading-snug text-ink md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-loose text-ink-70">
            {t("subtitle", { count: totalCount })}
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
              disabled={loading || !!error}
              className="rounded-btn border border-ink-08 bg-cream px-3 py-1.5 text-xs text-ink focus:border-teal focus:outline-none disabled:opacity-50"
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
              disabled={loading || !!error}
              className="rounded-btn border border-ink-08 bg-cream px-3 py-1.5 text-xs text-ink focus:border-teal focus:outline-none disabled:opacity-50"
            >
              <option value="">{t("any")}</option>
              {SPECIALIST_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <span className="ms-auto text-xs text-ink-55">
            {t("count_of", { shown: filtered.length, total: totalCount })}
          </span>
        </section>

        {/* Loading → calm and brand-styled; first load can take ~30s
            on Render's free tier the very first time. */}
        {loading ? (
          <div className="hope-fade-in flex flex-col items-center gap-3 rounded-card border border-ink-05 bg-paper px-6 py-12 text-center">
            <span className="grid h-12 w-12 animate-pulse place-items-center rounded-full bg-mist">
              <Users className="h-5 w-5 text-teal" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h2 className="font-serif text-xl italic text-teal-d">{t("loading_title")}</h2>
            <p className="max-w-sm text-sm leading-loose text-ink-55">
              {t("loading_description")}
            </p>
          </div>
        ) : error ? (
          <div className="hope-fade-in flex flex-col items-center gap-3 rounded-card border border-ink-05 bg-paper-2 px-6 py-12 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-coral-l">
              <AlertCircle className="h-5 w-5 text-coral-d" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h2 className="font-serif text-xl italic text-coral-d">{t("error_title")}</h2>
            <p className="max-w-sm text-sm leading-loose text-ink-55">
              {t("error_description")}
            </p>
            <button
              type="button"
              onClick={load}
              className="
                mt-2 inline-flex h-10 items-center gap-2 rounded-pill bg-teal px-5
                text-sm font-medium text-white shadow-hope-sm
                transition-colors duration-base hover:bg-teal-d
              "
            >
              <RefreshCw className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              {t("retry")}
            </button>
          </div>
        ) : filtered.length === 0 ? (
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
