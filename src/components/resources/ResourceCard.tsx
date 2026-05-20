import Link from "next/link";
import {
  Sun, BookOpen, MessageCircle, Sparkles, Waves, Bed, Moon, Heart,
  type LucideIcon,
} from "lucide-react";
import type { Guide, GuideCategory, GuideIcon } from "@/lib/guides-content";

const ICONS: Record<GuideIcon, LucideIcon> = {
  Sun, BookOpen, MessageCircle, Sparkles, Waves, Bed, Moon, Heart,
};

/**
 * Each category gets a curated colour scheme so the Resource Hub list
 * still feels visually rhythmic even when the cards are mostly text.
 */
const CATEGORY_SCHEME: Record<GuideCategory, { bg: string; iconColor: string }> = {
  routine: { bg: "bg-mist",    iconColor: "text-teal" },
  comm:    { bg: "bg-slate-l", iconColor: "text-slate-d" },
  sensory: { bg: "bg-sand-l",  iconColor: "text-sand-d" },
  sleep:   { bg: "bg-slate-l", iconColor: "text-slate-d" },
  self:    { bg: "bg-coral-l", iconColor: "text-coral-d" },
};

interface ResourceCardProps {
  guide: Guide;
  href: string;
  readMinutesLabel: string; // already localised, e.g. "4 min read"
  newLabel: string;         // already localised, e.g. "New"
}

export function ResourceCard({ guide, href, readMinutesLabel, newLabel }: ResourceCardProps) {
  const Icon = ICONS[guide.icon];
  const { bg, iconColor } = CATEGORY_SCHEME[guide.category];

  return (
    <Link
      href={href}
      className="
        group flex items-start gap-4 rounded-card border border-ink-05 bg-paper p-5
        transition-all duration-base
        hover:-translate-y-0.5 hover:bg-paper-2
        focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-cream
      "
    >
      <span className={`grid h-12 w-12 flex-shrink-0 place-items-center rounded-btn ${bg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.8} aria-hidden="true" />
      </span>

      <span className="flex flex-1 flex-col gap-1.5 min-w-0">
        <span className="flex flex-wrap items-center gap-2 text-[11px] text-ink-55">
          <span>{readMinutesLabel}</span>
          {guide.isNew && (
            <span className="inline-flex h-5 items-center rounded-pill bg-coral-l px-2 text-[10px] font-medium uppercase tracking-[0.08em] text-coral-d">
              {newLabel}
            </span>
          )}
        </span>
        <span className="text-base font-medium leading-snug text-ink">{guide.title}</span>
        <span className="text-sm leading-snug text-ink-55">{guide.summary}</span>
      </span>
    </Link>
  );
}
