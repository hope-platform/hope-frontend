import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  /** The card label (e.g. "Help Now") — already translated. */
  title: string;
  /** Supporting description shown below the title — already translated. */
  description: string;
  /** Lucide icon component to render at the top of the card. */
  Icon: LucideIcon;
  /** Where the card navigates to. Must already include the locale prefix. */
  href: string;
  /**
   * "primary"  — the prominent Help Now card (Forest Deep, white text, bigger).
   * "secondary" — standard white-surface card with a coloured icon (default).
   */
  variant?: "primary" | "secondary";
  /** Tailwind text-colour class for the icon when variant is "secondary". */
  accentClassName?: string;
}

/**
 * Reusable dashboard card. Use variant="primary" for the Help Now card
 * (full-width, Forest Deep). Use variant="secondary" for the smaller
 * white feature cards (Resource Hub, Find Specialist, Add Note).
 */
export function DashboardCard({
  title,
  description,
  Icon,
  href,
  variant = "secondary",
  accentClassName = "text-forest-deep",
}: DashboardCardProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={
        isPrimary
          ? "flex flex-col gap-3 rounded-card bg-forest-deep p-card-pad text-white shadow-card transition-colors duration-base hover:bg-forest-deep-dark"
          : "flex flex-col gap-3 rounded-card bg-hope-surface-white p-card-pad text-bark-text shadow-card transition-colors duration-base hover:bg-sage-mist"
      }
    >
      <Icon
        className={
          isPrimary ? "h-7 w-7 text-white" : `h-6 w-6 ${accentClassName}`
        }
        aria-hidden="true"
      />
      <div>
        <h2
          className={
            isPrimary
              ? "text-xl font-semibold leading-snug"
              : "text-lg font-medium leading-snug"
          }
        >
          {title}
        </h2>
        <p
          className={
            isPrimary
              ? "mt-1 text-sm text-white/80"
              : "mt-1 text-sm text-hope-text-secondary"
          }
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
