"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, RotateCcw, Server, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LanguageSwitcher } from "@/components/dashboard/LanguageSwitcher";
import { useHasHydrated, useHopeStore, type Locale } from "@/lib/store";

const LANG_OPTIONS: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "dr", label: "دری" },
];

/**
 * Settings — view + edit the things stored locally on this device:
 *   - Parent's name (text input + Save; saved confirmation flashes briefly).
 *   - Language preference (radio; saves immediately and re-routes to the
 *     new-locale settings page so the URL prefix stays in sync).
 *   - Backend account status (read-only indicator; populated by the
 *     onboarding-time POST /users).
 *   - "Start over" — confirmation step then full reset + onboarding.
 *
 * Note: there's no PATCH /users endpoint in MVP, so name and language
 * changes here are local-only. They'll sync to the backend in Phase 2
 * once Muzhgan adds the endpoint.
 */
export default function SettingsPage() {
  const t = useTranslations("settings");
  const router = useRouter();
  const locale = useLocale();
  const hydrated = useHasHydrated();

  const storedName = useHopeStore((s) => s.name);
  const storedLanguage = useHopeStore((s) => s.language);
  const userId = useHopeStore((s) => s.userId);
  const setName = useHopeStore((s) => s.setName);
  const setLanguage = useHopeStore((s) => s.setLanguage);
  const reset = useHopeStore((s) => s.reset);

  const [draftName, setDraftName] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);

  // Sync draft from the store once hydration completes (so the input
  // starts empty during SSR and fills in after mount).
  useEffect(() => {
    if (hydrated) setDraftName(storedName ?? "");
  }, [hydrated, storedName]);

  const trimmedName = draftName.trim();
  const nameUnchanged = trimmedName === (storedName ?? "");

  const saveName = () => {
    if (!trimmedName || nameUnchanged) return;
    setName(trimmedName);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const changeLanguage = (newLocale: Locale) => {
    if (newLocale === storedLanguage) return;
    setLanguage(newLocale);
    // Move to the same page in the new locale so the URL prefix matches.
    router.replace(`/${newLocale}/settings`);
  };

  const doReset = () => {
    reset();
    router.replace(`/${locale}/onboarding`);
  };

  return (
    <main className="bg-cream">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 py-7 md:px-8 md:py-10">

        <header className="flex items-center justify-between gap-4">
          <DashboardHeader />
          <LanguageSwitcher />
        </header>

        {/* Page header */}
        <section className="hope-fade-in">
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-teal">
            {t("eyebrow")}
          </div>
          <h1 className="mt-2 font-serif text-3xl italic leading-snug text-ink md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-loose text-ink-70">
            {t("subtitle")}
          </p>
        </section>

        {/* Name */}
        <section className="rounded-card border border-ink-05 bg-paper p-5">
          <label className="block">
            <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-ink-55">
              {t("name_label")}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); saveName(); }
                }}
                className="
                  flex-1 rounded-btn border border-ink-08 bg-cream px-4 py-3 text-base text-ink
                  placeholder:text-ink-35 transition-colors duration-base
                  focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10
                "
              />
              <button
                type="button"
                onClick={saveName}
                disabled={!trimmedName || nameUnchanged}
                className="
                  inline-flex h-12 items-center gap-1.5 rounded-pill bg-teal px-5
                  text-sm font-medium text-white shadow-hope-sm
                  transition-colors duration-base hover:bg-teal-d
                  disabled:bg-ink-15 disabled:text-ink-55 disabled:cursor-not-allowed
                "
              >
                {savedFlash ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                    {t("saved")}
                  </>
                ) : (
                  t("save")
                )}
              </button>
            </div>
          </label>
        </section>

        {/* Language */}
        <section className="rounded-card border border-ink-05 bg-paper p-5">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-55">
            {t("language_label")}
          </div>
          <div className="flex flex-col gap-2">
            {LANG_OPTIONS.map((opt) => {
              const active = storedLanguage === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => changeLanguage(opt.code)}
                  className={`
                    flex items-center justify-between rounded-btn border px-4 py-3 text-left
                    transition-all duration-base
                    ${active
                      ? "border-teal bg-paper shadow-[0_0_0_3px_rgba(47,130,118,0.10)]"
                      : "border-ink-08 bg-cream hover:border-ink-15"}
                  `}
                >
                  <span className="text-base font-medium text-ink">{opt.label}</span>
                  {active && (
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-teal text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Backend account status */}
        <section className="rounded-card border border-ink-05 bg-paper p-5">
          <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-55">
            {t("account_label")}
          </div>
          <div className="flex items-start gap-3">
            <span className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-btn ${userId ? "bg-mist" : "bg-paper-2"}`}>
              <Server className={`h-4 w-4 ${userId ? "text-teal-d" : "text-ink-55"}`} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="text-sm leading-loose text-ink-70">
              {userId ? t("account_synced") : t("account_pending")}
            </p>
          </div>
        </section>

        {/* Start over */}
        <section className="rounded-card border border-coral/40 bg-coral-l/30 p-5">
          <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-coral-d">
            {t("reset_label")}
          </div>
          <p className="mb-4 text-sm leading-loose text-ink-70">{t("reset_description")}</p>

          {!confirmingReset ? (
            <button
              type="button"
              onClick={() => setConfirmingReset(true)}
              className="
                inline-flex h-10 items-center gap-2 rounded-pill border border-coral/50 bg-paper px-4
                text-sm font-medium text-coral-d transition-colors duration-base
                hover:border-coral-d hover:bg-coral-l/60
              "
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              {t("reset_button")}
            </button>
          ) : (
            <div
              role="alertdialog"
              aria-label={t("reset_confirm")}
              onKeyDown={(e) => {
                if (e.key === "Escape") { e.preventDefault(); setConfirmingReset(false); }
              }}
              className="flex flex-wrap items-center justify-between gap-2 rounded-btn bg-paper px-3 py-2.5"
            >
              <span className="text-sm font-medium text-ink-90">{t("reset_confirm")}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmingReset(false)}
                  autoFocus
                  className="inline-flex h-9 items-center rounded-pill px-3 text-sm font-medium text-ink-55 transition-colors duration-base hover:bg-ink-05 hover:text-ink"
                >
                  {t("cancel")}
                </button>
                <button
                  type="button"
                  onClick={doReset}
                  className="
                    inline-flex h-9 items-center gap-1.5 rounded-pill bg-coral px-3
                    text-sm font-medium text-white shadow-hope-sm transition-colors duration-base
                    hover:bg-coral-d
                  "
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  {t("reset_confirm_yes")}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
