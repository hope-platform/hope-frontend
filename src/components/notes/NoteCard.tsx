"use client";

import { Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Note } from "@/lib/store";
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

export function NoteCard({ note }: NoteCardProps) {
  const t = useTranslations("notes");
  const locale = useLocale();
  const deleteNote = useHopeStore((s) => s.deleteNote);

  const dateLabel = new Date(note.createdAt).toLocaleString(locale, DATE_OPTIONS);

  return (
    <article className="flex gap-4 rounded-card border border-ink-05 bg-paper p-5">
      <span aria-hidden="true" className="w-1 self-stretch rounded-pill bg-coral" />

      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <header className="flex items-start justify-between gap-2">
          <time
            className="text-[11px] text-ink-55"
            dateTime={note.createdAt}
          >
            {dateLabel}
          </time>
          <button
            type="button"
            onClick={() => deleteNote(note.id)}
            aria-label={t("delete")}
            className="grid h-7 w-7 place-items-center rounded-full text-ink-35 transition-colors duration-base hover:bg-ink-05 hover:text-coral-d"
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
          </button>
        </header>

        <p className="whitespace-pre-wrap text-base leading-loose text-ink-90">
          {note.text}
        </p>
      </div>
    </article>
  );
}
