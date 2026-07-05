"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

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
 * Behaviour:
 *   - Closes on backdrop click, Escape, and the X button.
 *   - Locks body scroll while open.
 *   - Moves keyboard focus into the modal on open and traps Tab
 *     inside it (both directions), so users can't Tab into the
 *     background.
 *   - Restores focus to whatever was focused before open when it closes.
 *   - Close button label is translated (common.close).
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
  const tCommon = useTranslations("common");
  const contentRef = useRef<HTMLDivElement>(null);

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

  // Focus trap: move focus into the modal on open, keep Tab cycling
  // inside it, and restore focus to the previously-focused element on
  // close. Uses no library — just a live query of focusable children.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const getFocusable = (): HTMLElement[] =>
      Array.from(
        contentEl.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    // Focus the first focusable child on open, or the container itself
    // if the modal has no interactive elements (rare).
    const focusables = getFocusable();
    (focusables[0] ?? contentEl).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [open]);

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
        ref={contentRef}
        tabIndex={-1}
        className={`
          hope-fade-in w-full ${maxWidthClassName}
          max-h-[92vh] overflow-y-auto
          rounded-t-sheet bg-paper shadow-hope-lg
          md:rounded-sheet
          focus:outline-none
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
            aria-label={tCommon("close")}
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
