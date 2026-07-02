import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Check, Sun, BookOpen, MessageCircle, Sparkles, Waves, Bed, Moon, Heart, type LucideIcon, AlertCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { TopBar } from "@/components/layout/TopBar";
import { CATEGORIES, getGuide, type GuideCategory, type GuideIcon } from "@/lib/guides-content";

const ICONS: Record<GuideIcon, LucideIcon> = {
  Sun, BookOpen, MessageCircle, Sparkles, Waves, Bed, Moon, Heart,
};

const SCHEME: Record<GuideCategory, { bg: string; iconColor: string; chipBg: string; chipText: string }> = {
  routine: { bg: "bg-mist",    iconColor: "text-teal",    chipBg: "bg-mist",    chipText: "text-teal-d" },
  comm:    { bg: "bg-slate-l", iconColor: "text-slate-d", chipBg: "bg-slate-l", chipText: "text-slate-d" },
  sensory: { bg: "bg-sand-l",  iconColor: "text-sand-d",  chipBg: "bg-sand-l",  chipText: "text-sand-d" },
  sleep:   { bg: "bg-slate-l", iconColor: "text-slate-d", chipBg: "bg-slate-l", chipText: "text-slate-d" },
  self:    { bg: "bg-coral-l", iconColor: "text-coral-d", chipBg: "bg-coral-l", chipText: "text-coral-d" },
};

interface PageProps {
  params: { locale: string; slug: string };
}

/**
 * Guide reader. Renders a single Quick Guide in three sections —
 * intro → "The short version" bullets → "How to start this week"
 * numbered list — followed by an optional caveat and the source list.
 *
 * Falls back to notFound() if the slug isn't a real guide for this locale.
 */
export default function GuideReader({ params }: PageProps) {
  const t = useTranslations("resources");
  const tNav = useTranslations("navigation");
  const locale = useLocale();
  const guide = getGuide(params.locale, params.slug);

  if (!guide) notFound();

  const Icon = ICONS[guide.icon];
  const { bg, iconColor, chipBg, chipText } = SCHEME[guide.category];
  const categoryLabel = CATEGORIES[guide.category][params.locale as "en"|"fr"|"dr"] ?? CATEGORIES[guide.category].en;
  const isDariFallback = params.locale === "dr";

  return (
    <main className="bg-cream">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 py-7 md:px-8 md:py-10">

        <TopBar />

        {/* Back link */}
        <Link
          href={`/${locale}/resources`}
          className="inline-flex w-fit items-center gap-1 text-sm font-medium text-ink-55 transition-colors duration-base hover:text-ink"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          {tNav("resources")}
        </Link>

        {/* Hero — category + icon + title + summary */}
        <article className="hope-fade-in flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className={`grid h-12 w-12 place-items-center rounded-btn ${bg}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <span className={`inline-flex h-6 items-center rounded-pill ${chipBg} px-2.5 text-[11px] font-medium ${chipText}`}>
                {categoryLabel}
              </span>
              <div className="mt-1 text-[11px] text-ink-55">
                {t("read_minutes", { minutes: guide.readMinutes })}
              </div>
            </div>
          </div>

          <h1 className="font-serif text-3xl italic leading-snug text-ink md:text-4xl">
            {guide.title}
          </h1>
          <p className="text-base leading-loose text-ink-70">{guide.summary}</p>

          {isDariFallback && (
            <div className="rounded-card bg-slate-l px-4 py-3 text-sm leading-normal text-slate-d">
              {t("dari_pending_banner")}
            </div>
          )}

          {/* Intro */}
          <section className="mt-2 rounded-card border border-ink-05 bg-paper p-5 text-base leading-loose text-ink-90">
            {guide.body.intro}
          </section>

          {/* The short version */}
          <section className="mt-2">
            <h2 className="font-serif text-2xl italic leading-snug text-teal-d">
              {t("short_version_heading")}
            </h2>
            <ul className="mt-3 flex flex-col gap-3">
              {guide.body.shortVersion.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-teal" strokeWidth={2.2} aria-hidden="true" />
                  <span className="text-base leading-loose text-ink-90">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* How to start this week */}
          <section className="mt-2">
            <h2 className="font-serif text-2xl italic leading-snug text-teal-d">
              {t("this_week_heading")}
            </h2>
            <ol className="mt-3 flex flex-col gap-3">
              {guide.body.thisWeek.map((item, idx) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-mist text-xs font-medium text-teal-d">
                    {idx + 1}
                  </span>
                  <span className="text-base leading-loose text-ink-90">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Caveat */}
          {guide.body.caveat && (
            <aside className="mt-3 flex items-start gap-3 rounded-card bg-mist px-4 py-4">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-d" strokeWidth={1.8} aria-hidden="true" />
              <p className="text-sm leading-loose text-teal-d">{guide.body.caveat}</p>
            </aside>
          )}

          {/* Sources */}
          <section className="mt-3 border-t border-ink-08 pt-4">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-ink-55">
              {t("sources_heading")}
            </div>
            <ul className="flex flex-col gap-1.5 text-sm text-ink-55">
              {guide.sources.map((source) => (
                <li key={source}>· {source}</li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}
