"use client";

import { useState } from "react";
import { Check, NotebookPen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/shared/Modal";
import { useHopeStore } from "@/lib/store";

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Quick-capture modal. Single textarea, save → close. The note is
 * stored locally only (Zustand persist → localStorage).
 *
 * Shows a brief "Saved on your device" success state before closing.
 */
export function AddNoteModal({ open, onClose }: AddNoteModalProps) {
  const t = useTranslations("notes");
  const addNote = useHopeStore((s) => s.addNote);

  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  const save = () => {
    const clean = text.trim();
    if (!clean) return;
    addNote(clean);
    setText("");
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1500);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow={t("eyebrow")}
      title={t("modal_title")}
      maxWidthClassName="max-w-md"
    >
      {saved ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-mist">
            <Check className="h-6 w-6 text-teal" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <h3 className="font-serif text-xl italic text-teal-d">{t("saved_title")}</h3>
        </div>
      ) : (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => { e.preventDefault(); save(); }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("placeholder")}
            autoFocus
            rows={6}
            className="
              w-full resize-y rounded-btn border border-ink-08 bg-paper px-4 py-3
              text-base leading-loose text-ink placeholder:text-ink-35
              transition-colors duration-base
              focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10
            "
          />

          <p className="text-[11px] text-ink-55">{t("privacy_note")}</p>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center rounded-pill px-4 text-sm font-medium text-ink-55 transition-colors duration-base hover:bg-ink-05 hover:text-ink"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="
                inline-flex h-10 items-center gap-2 rounded-pill bg-teal px-5
                text-sm font-medium text-white shadow-hope-sm
                transition-colors duration-base hover:bg-teal-d
                disabled:bg-ink-15 disabled:text-ink-55 disabled:cursor-not-allowed
              "
            >
              <NotebookPen className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              {t("save")}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
