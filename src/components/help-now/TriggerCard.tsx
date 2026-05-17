import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface TriggerCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  href: string;
  /** Tailwind class for the small icon-circle background (e.g. "bg-sand-glow") */
  iconBgClassName: string;
  /** Tailwind class for the icon's own colour (e.g. "text-ember-warm") */
  iconColorClassName: string;
}

/**
 * One tappable trigger chip in the Help Now picker grid.
 * Two columns on mobile, surface-white card, coloured icon badge per trigger.
 */
export function TriggerCard({
  title,
  description,
  Icon,
  href,
  iconBgClassName,
  iconColorClassName,
}: TriggerCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-card border border-hope-border bg-hope-surface-white p-card-pad transition-colors duration-base hover:border-bark-text-30"
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-pill ${iconBgClassName}`}
      >
        <Icon className={`h-5 w-5 ${iconColorClassName}`} aria-hidden="true" />
      </span>
      <div>
        <h2 className="text-base font-medium leading-snug text-bark-text">
          {title}
        </h2>
        <p className="mt-1 text-xs leading-snug text-hope-text-secondary">
          {description}
        </p>
      </div>
    </Link>
  );
}
