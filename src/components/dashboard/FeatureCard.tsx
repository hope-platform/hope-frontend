import Link from "next/link";
import type { LucideIcon } from "lucide-react";

/**
 * The three pre-curated colour schemes for secondary feature cards on
 * the Dashboard. Each scheme is a triple of (background tint, icon colour).
 *
 * IMPORTANT: literal class strings — Tailwind reads these from source
 * during the JIT pass, so do NOT switch to dynamic concatenation.
 */
const SCHEMES = {
  resources:   { bg: "bg-mist",    iconColor: "text-teal" },
  specialists: { bg: "bg-slate-l", iconColor: "text-slate-d" },
  notes:       { bg: "bg-coral-l", iconColor: "text-coral-d" },
} as const;

export type FeatureCardScheme = keyof typeof SCHEMES;

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  /** Already-localised route. Omit when the card opens a modal instead. */
  href?: string;
  /** Click handler — used when the card opens a modal (e.g. Add a Note). */
  onClick?: () => void;
  scheme: FeatureCardScheme;
}

/**
 * Secondary feature card. Sits below the Help Now hero in a 3-up grid
 * on desktop, 1-up on mobile. Renders as a <Link> when href is given,
 * otherwise as a <button> — needed because "Add a Note" opens a modal.
 */
export function FeatureCard({
  title,
  description,
  Icon,
  href,
  onClick,
  scheme,
}: FeatureCardProps) {
  const { bg, iconColor } = SCHEMES[scheme];

  const classes = `
    group flex min-h-[170px] flex-col justify-between gap-8 rounded-card
    ${bg} px-5 py-6 text-left
    border border-ink-05
    transition-all duration-base
    hover:-translate-y-0.5 hover:brightness-[0.97]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-cream
  `;

  const content = (
    <>
      {/* Icon pill — translucent white so each scheme stays calm */}
      <span className="grid h-11 w-11 place-items-center rounded-btn bg-white/55">
        <Icon className={`h-[22px] w-[22px] ${iconColor}`} strokeWidth={1.7} aria-hidden="true" />
      </span>

      <span className="block">
        <span className="block text-lg font-medium tracking-tight">{title}</span>
        <span className="mt-1 block text-[13px] text-ink-55">{description}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
