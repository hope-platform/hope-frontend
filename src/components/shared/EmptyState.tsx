import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  /** Optional CTA button at the bottom. */
  action?: React.ReactNode;
}

/**
 * Calm empty-state used when a list has no items yet (e.g. Notes, or a
 * filtered Resource Hub with no matches). Centred card with a soft
 * mist icon pill, serif italic title, and a short caption.
 */
export function EmptyState({ Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card border border-ink-05 bg-paper-2 px-6 py-12 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-btn bg-mist">
        <Icon className="h-6 w-6 text-teal" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <h3 className="font-serif text-2xl italic leading-snug text-ink">{title}</h3>
      <p className="max-w-sm text-sm leading-loose text-ink-55">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
