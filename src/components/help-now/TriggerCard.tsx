import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface TriggerCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  href: string;
  /** Tailwind class for the icon-circle background (e.g. "bg-coral-l") */
  iconBgClassName: string;
  /** Tailwind class for the icon's own colour (e.g. "text-coral-d") */
  iconColorClassName: string;
}

/**
 * One tappable trigger chip in the Help Now picker grid.
 * Two columns on mobile, paper card with soft ink-05 border, coloured
 * icon badge per trigger.
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
      className="
        group flex flex-col gap-3 rounded-card border border-ink-05 bg-paper p-5
        transition-all duration-base
        hover:-translate-y-0.5 hover:border-ink-15
        focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-cream
      "
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-btn ${iconBgClassName}`}
      >
        <Icon className={`h-5 w-5 ${iconColorClassName}`} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="block">
        <span className="block text-base font-medium leading-snug text-ink">
          {title}
        </span>
        <span className="mt-1 block text-xs leading-snug text-ink-55">
          {description}
        </span>
      </span>
    </Link>
  );
}
