import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface HelpNowHeroProps {
  /** Already-localised route (e.g. "/en/help-now"). */
  href: string;
}

/**
 * The dominant card on the Dashboard. The whole surface is one tap
 * target (a Link). Dark ink background, coral eyebrow line, serif
 * italic title, pulsing coral icon box on the left.
 *
 * Per design:
 *  - 28px hero radius
 *  - 56-64px icon container with the coral pulse
 *  - "Always here · Works offline" eyebrow (coral, all-caps, .12em tracking)
 *  - "Help Now" in Instrument Serif italic, ~30-34px
 *  - Body text in cream/65
 *  - Coral arrow on the right (hidden on small viewports)
 */
export function HelpNowHero({ href }: HelpNowHeroProps) {
  const t = useTranslations("dashboard");
  const tNav = useTranslations("navigation");

  return (
    <Link
      href={href}
      className="
        group relative flex items-center gap-5 overflow-hidden rounded-hero
        bg-ink px-6 py-6 text-cream
        transition-all duration-base
        hover:-translate-y-0.5 hover:brightness-110
        focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-cream
        md:gap-6 md:px-8 md:py-7
      "
    >
      {/* Pulsing coral icon container */}
      <span
        className="hope-pulse grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl bg-coral md:h-16 md:w-16"
        aria-hidden="true"
      >
        <AlertCircle className="h-6 w-6 text-white md:h-7 md:w-7" strokeWidth={1.8} />
      </span>

      {/* Eyebrow + title + body */}
      <span className="flex-1 min-w-0">
        <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-coral md:text-[11px]">
          {t("help_now_eyebrow")}
        </span>
        <span className="mt-1.5 block font-serif italic text-[30px] leading-none md:text-4xl">
          {tNav("help_now")}
        </span>
        <span className="mt-2 block text-sm leading-snug text-cream/65">
          {t("help_now_description")}
        </span>
      </span>

      {/* Right arrow (hidden on mobile to save space) */}
      <ArrowRight
        className="hidden h-6 w-6 flex-shrink-0 text-coral transition-transform duration-base group-hover:translate-x-1 sm:block rtl:rotate-180"
        aria-hidden="true"
      />
    </Link>
  );
}
