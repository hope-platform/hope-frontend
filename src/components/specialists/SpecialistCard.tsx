"use client";

import { Check, MapPin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { type Specialist } from "@/lib/specialists-content";

const AVATAR_BG: Record<Specialist["avatarColor"], string> = {
  teal:       "bg-teal",
  slate:      "bg-slate",
  "coral-d":  "bg-coral-d",
  "sand-d":   "bg-sand-d",
};

interface SpecialistCardProps {
  specialist: Specialist;
  onBook: (s: Specialist) => void;
}

/**
 * One specialist profile card. Avatar with initials in a brand colour,
 * name + role + city + languages, blurb, single full-width CTA:
 *
 *   - "Book a consultation" — opens the BookingModal, where the parent
 *     picks email or WhatsApp as their preferred contact method and the
 *     backend (POST /bookings) records it and sends the email.
 *
 * The standalone WhatsApp link was removed when bookings moved to the
 * backend — the modal's contact_method radio replaces it cleanly and
 * keeps every booking in the backend record.
 *
 * Verified badge in the top-right when the specialist is verified.
 */
export function SpecialistCard({ specialist, onBook }: SpecialistCardProps) {
  const t = useTranslations("specialists");
  const tLang = useTranslations("languageCode");
  const avatarBg = AVATAR_BG[specialist.avatarColor];

  return (
    <article className="flex flex-col gap-4 rounded-card border border-ink-05 bg-paper p-5">
      {/* Top row: avatar + name block + verified pill */}
      <header className="flex items-start gap-3">
        <span className={`grid h-12 w-12 flex-shrink-0 place-items-center rounded-btn text-sm font-medium text-white ${avatarBg}`}>
          {specialist.initials}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-medium text-ink">{specialist.name}</h2>
            {specialist.verified && (
              <span className="inline-flex h-5 items-center gap-1 rounded-pill bg-mist px-2 text-[10px] font-medium text-teal-d">
                <Check className="h-3 w-3" strokeWidth={2.4} aria-hidden="true" />
                {t("verified")}
              </span>
            )}
          </div>
          <div className="mt-0.5 text-xs text-ink-55">{specialist.role}</div>
          <div className="mt-1 flex items-center gap-3 text-[11px] text-ink-55">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
              {specialist.city}
            </span>
            <span>·</span>
            <span>{specialist.priceRange}</span>
          </div>
        </div>
      </header>

      {/* Blurb */}
      <p className="text-sm leading-loose text-ink-70">{specialist.blurb}</p>

      {/* Languages */}
      <div className="flex flex-wrap gap-1.5">
        {specialist.languages.map((lang) => (
          <span
            key={lang}
            className="inline-flex h-6 items-center rounded-pill bg-slate-l px-2.5 text-[10px] font-medium text-slate-d"
          >
            {tLang(lang)}
          </span>
        ))}
      </div>

      {/* Action — single full-width Book button; contact method is
          picked inside the modal. */}
      <div className="border-t border-ink-05 pt-3">
        <button
          type="button"
          onClick={() => onBook(specialist)}
          className="
            inline-flex h-10 w-full items-center justify-center gap-2 rounded-pill bg-teal px-4
            text-sm font-medium text-white shadow-hope-sm
            transition-colors duration-base hover:bg-teal-d
          "
        >
          <Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          {t("book_cta")}
        </button>
      </div>
    </article>
  );
}
