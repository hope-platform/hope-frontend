"use client";

import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatDateTime } from "@/lib/dates";
import type { Locale, Note } from "@/lib/store";
import { useHopeStore } from "@/lib/store";

interface NoteCardProps {
  note: Note;
}

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
};

/**
 * A single saved note.
 *
 * Three modes:
 *   - View    — shows the timestamp, an "edited" marker if it was changed,
 *               and pencil / trash actions.
 *   - Edit    — inline textarea with Save / Cancel. Cmd/Ctrl+Enter saves,
 *               Escape cancels. Save is disabled while the text is empty or
 *               unchanged, so an accidental tap can't blank a note.
 *   - Confirm — tapping the trash asks "Delete this note?" first (Cancel /
 *               Delete), so a single mis-tap can't lose a note. Escape cancels.
 */
export function NoteCard({ note }: NoteCardProps) {
  const t = useTranslations("notes");
  const locale = useLocale();
  const deleteNote = useHopeStore((s) => s.deleteNote);
  const updateNote = useHopeStore((s) => s.updateNote);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note.text);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const dateLabel = formatDateTime(note.createdAt, locale as Locale, DATE_OPTIONS);

  const startEdit = () => {
    setDraft(note.text);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(note.text);
    setEditing(false);
  };

  const saveEdit = () => {
    const clean = draft.trim();
    if (!clean || clean === note.text) {
      setEditing(false);
      return;
    }
    updateNote(note.id, clean);
    setEditing(false);
  };

  return (
    <article className="flex gap-4 rounded-card border border-ink-05 bg-paper p-5">
      <span aria-hidden="true" className="w-1 self-stretch rounded-pill bg-coral" />

      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <header className="flex items-start justify-between gap-2">
          <time className="text-[11px] text-ink-55" dateTime={note.createdAt}>
            {dateLabel}
            {note.updatedAt && (
              <span className="text-ink-35"> · {t("edited")}</span>
            )}
          </time>

          {!editing && !confirmingDelete && (
            <div className="flex flex-shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={startEdit}
                aria-label={t("edit")}
                className="grid h-7 w-7 place-items-center rounded-full text-ink-35 transition-colors duration-base hover:bg-ink-05 hover:text-teal-d"
              >
                <Pencil className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                aria-label={t("delete")}
                className="grid h-7 w-7 place-items-center rounded-full text-ink-35 transition-colors duration-base hover:bg-ink-05 hover:text-coral-d"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          )}
        </header>

        {editing ? (
          <div className="flex flex-col gap-3">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  saveEdit();
                }
                if (e.key === "Escape") {
                  e.preventDefault();
                  cancelEdit();
                }
              }}
              autoFocus
              rows={4}
              className="
                w-full resize-y rounded-btn border border-ink-08 bg-cream px-3 py-2.5
                text-base leading-loose text-ink placeholder:text-ink-35
                transition-colors duration-base
                focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10
              "
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={cancelEdit}
                className="inline-flex h-9 items-center gap-1.5 rounded-pill px-4 text-sm font-medium text-ink-55 transition-colors duration-base hover:bg-ink-05 hover:text-ink"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                {t("cancel")}
              </button>
              <button
                type="button"
                onClick={saveEdit}
                disabled={!draft.trim() || draft.trim() === note.text}
                className="
                  inline-flex h-9 items-center gap-1.5 rounded-pill bg-teal px-4
                  text-sm font-medium text-white shadow-hope-sm
                  transition-colors duration-base hover:bg-teal-d
                  disabled:bg-ink-15 disabled:text-ink-55 disabled:cursor-not-allowed
                "
              >
                <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                {t("save")}
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-wrap text-base leading-loose text-ink-90">
              {note.text}
            </p>

            {confirmingDelete && (
              <div
                role="alertdialog"
                aria-label={t("delete_confirm")}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    setConfirmingDelete(false);
                  }
                }}
                className="mt-1 flex flex-wrap items-center justify-between gap-2 rounded-btn bg-paper-2 px-3 py-2.5"
              >
                <span className="text-sm text-ink-70">{t("delete_confirm")}</span>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmingDelete(false)}
                    autoFocus
                    className="inline-flex h-8 items-center rounded-pill px-3 text-sm font-medium text-ink-55 transition-colors duration-base hover:bg-ink-05 hover:text-ink"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteNote(note.id)}
                    className="inline-flex h-8 items-center gap-1.5 rounded-pill bg-coral px-3 text-sm font-medium text-white shadow-hope-sm transition-colors duration-base hover:bg-coral-d"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    {t("delete_confirm_yes")}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}
