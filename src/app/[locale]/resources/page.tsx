"use client";

import { useMemo, useState } from "react";
import { Search, Wifi } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { TopBar } from "@/components/layout/TopBar";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { getGuides, type GuideCategory } from "@/lib/guides-content";

type CategoryFilter = "all" | GuideCategory;

const CATEGORY_FILTERS: { id: CategoryFilter; key: string }[] = [
  { id: "all",     key: "category_all" },
  { id: "routine", key: "category_routine" },
  { id: "comm",    key: "category_comm" },
  { id: "sensory", key: "category_sensory" },
  { id: "sleep",   key: "category_sleep" },
  { id: "self",    key: "category_self" },
];

/**
 * Resource Hub — list of Quick Guides.
 *
 * Layout:
 *   1. Top bar (brand + language switcher)
 *   2. Eyebrow + serif title + subtitle
 *   3. Offline reassurance chip
 *   4. Search input
 *   5. Category pill row (horizontal scroll on mobile)
 *   6. Card list — 1 column on mobile, 2 on md+
 *
 * Search matches title + summary case-insensitively.
 */
export default function ResourcesPage() {
  const t = useTranslations("resources");
  const locale = useLocale();
  const guides = getGuides(locale);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guides.filter((g) => {
      if (filter !== "all" && g.category !== filter) return false;
      if (!q) return true;
      return g.title.toLowerCase().includes(q) || g.summary.toLowerCase().includes(q);
    });
  }, [guides, filter, query]);

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
            {t("subtitle", { count: guides.length })}
          </p>
        </section>

        {/* Offline chip */}
        <span className="inline-flex h-7 w-fit items-center gap-1.5 rounded-pill bg-mist px-3 text-xs font-medium text-teal-d">
          <Wifi className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
          {t("offline_chip")}
        </span>

        {/* Search */}
        <label className="relative block">
          <span className="sr-only">{t("search_label")}</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-35"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search_placeholder")}
            className="
              w-full rounded-btn border border-ink-08 bg-paper py-3 ltr:pl-11 ltr:pr-4 rtl:pr-11 rtl:pl-4
              text-sm text-ink placeholder:text-ink-35
              transition-colors duration-base
              focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10
            "
          />
        </label>

        {/* Category filter */}
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0 md:pb-0">
          {CATEGORY_FILTERS.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                className={`
                  inline-flex h-9 flex-shrink-0 items-center rounded-pill px-4 text-xs font-medium
                  transition-colors duration-base
                  ${active
                    ? "bg-ink text-cream"
                    : "border border-ink-08 bg-paper text-ink-70 hover:text-ink"}
                `}
              >
                {t(c.key)}
              </button>
            );
          })}
        </div>

        {/* Card list / empty state */}
        {filtered.length === 0 ? (
          <EmptyState
            Icon={Search}
            title={t("empty_title")}
            description={t("empty_description")}
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filtered.map((g) => (
              <ResourceCard
                key={g.slug}
                guide={g}
                href={`/${locale}/resources/${g.slug}`}
                readMinutesLabel={t("read_minutes", { minutes: g.readMinutes })}
                newLabel={t("new_tag")}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
