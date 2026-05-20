"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  /** Controls visibility. */
  open: boolean;
  /** Called when the user clicks the scrim or presses Escape. */
  onClose: () => void;
  /** Modal title (rendered as h2 with serif italic). */
  title: string;
  /** Optional small label above the title (e.g. "BOOK A CONSULTATION"). */
  eyebrow?: string;
  /** Accessible label override; defaults to the title. */
  ariaLabel?: string;
  /** Max width — useful when a modal needs to be wider/narrower than default. */
  maxWidthClassName?: string;
  children: React.ReactNode;
}

/**
 * Reusable modal shell — bottom-sheet on mobile, centred dialog on
 * desktop. Used by:
 *   - Add a Note
 *   - Booking modal (Specialist Directory)
 *   - Help Now disclaimer gate
 *
 * Closes on backdrop click, Escape, and the X button. Locks body
 * scroll while open.
 */
export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  ariaLabel,
  maxWidthClassName = "max-w-lg",
  children,
}: ModalProps) {
  // Lock body scroll while the modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel ?? title}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/55 backdrop-blur-[2px] md:items-center md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={`
          hope-fade-in w-full ${maxWidthClassName}
          max-h-[92vh] overflow-y-auto
          rounded-t-sheet bg-paper shadow-hope-lg
          md:rounded-sheet
        `}
      >
        {/* Header */}
        <header className="flex items-start gap-3 border-b border-ink-05 px-6 py-5">
          <div className="flex-1 min-w-0">
            {eyebrow && (
              <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-55">
                {eyebrow}
              </div>
            )}
            <h2 className="mt-1 font-serif text-2xl italic leading-snug text-ink">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-ink-55 transition-colors duration-base hover:bg-ink-05 hover:text-ink"
          >
            <X className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
          </button>
        </header>

        {/* Body */}
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
