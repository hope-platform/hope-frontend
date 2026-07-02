"use client";

import { useState } from "react";
import { NotebookPen, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { TopBar } from "@/components/layout/TopBar";
import { AddNoteModal } from "@/components/notes/AddNoteModal";
import { NoteCard } from "@/components/notes/NoteCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { useHasHydrated, useHopeStore } from "@/lib/store";

/**
 * Notes — a calm list of quick captures saved on this device.
 *
 * Per MVP scope, notes live in localStorage only. No tags, no search,
 * no PDF export (those are V2). Just: add → list → optionally delete.
 *
 * The list is read from Zustand; we wait for hydration to avoid showing
 * a "no notes yet" state to returning users for a frame.
 */
export default function NotesPage() {
  const t = useTranslations("notes");
  const hydrated = useHasHydrated();
  const notes = useHopeStore((s) => s.notes);

  const [open, setOpen] = useState(false);

  return (
    <main className="bg-cream">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 py-7 md:px-8 md:py-10">

        <TopBar />

        {/* Page header */}
        <section className="hope-fade-in flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-coral">
              {t("eyebrow")}
            </div>
            <h1 className="mt-2 font-serif text-3xl italic leading-snug text-ink md:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-loose text-ink-70">
              {t("subtitle")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              inline-flex h-10 items-center gap-2 rounded-pill bg-teal px-4
              text-sm font-medium text-white shadow-hope-sm
              transition-colors duration-base hover:bg-teal-d
            "
          >
            <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {t("add_cta")}
          </button>
        </section>

        {/* List or empty */}
        {!hydrated ? (
          <div className="text-sm text-ink-35">…</div>
        ) : notes.length === 0 ? (
          <EmptyState
            Icon={NotebookPen}
            title={t("empty_title")}
            description={t("empty_description")}
            action={
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-pill bg-teal px-4 text-sm font-medium text-white shadow-hope-sm transition-colors hover:bg-teal-d"
              >
                <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {t("add_cta")}
              </button>
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}

        {/* Privacy reminder */}
        {hydrated && notes.length > 0 && (
          <p className="text-center text-[11px] text-ink-35">{t("local_only_note")}</p>
        )}
      </div>

      <AddNoteModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
