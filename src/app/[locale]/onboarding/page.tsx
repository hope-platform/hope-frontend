"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { useHasHydrated, useHopeStore, type Locale } from "@/lib/store";

type Step = "welcome" | "language" | "name";

const LANG_OPTIONS: { code: Locale; nativeLabel: string; subKey: string }[] = [
  { code: "en", nativeLabel: "English",  subKey: "en_sub" },
  { code: "fr", nativeLabel: "Français", subKey: "fr_sub" },
  { code: "dr", nativeLabel: "دری",      subKey: "dr_sub" },
];

/**
 * Onboarding — three calm steps:
 *   1. Welcome      (logo, value props, "Get started")
 *   2. Language     (pick one of three; persists immediately)
 *   3. Name         (first name only; stored locally)
 *
 * On completion the user is redirected to `/{language}` (the Dashboard).
 * If they're already onboarded, /{locale}/onboarding bounces them home.
 */
export default function OnboardingPage() {
  const t = useTranslations("onboarding");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const locale = useLocale();
  const hydrated = useHasHydrated();
  const onboardedAt = useHopeStore((s) => s.onboardedAt);
  const completeOnboarding = useHopeStore((s) => s.completeOnboarding);

  const [step, setStep] = useState<Step>("welcome");
  const [pickedLanguage, setPickedLanguage] = useState<Locale>(locale as Locale);
  const [name, setName] = useState("");

  // Already onboarded? Bounce home.
  useEffect(() => {
    if (hydrated && onboardedAt) {
      router.replace(`/${locale}`);
    }
  }, [hydrated, onboardedAt, locale, router]);

  const finish = () => {
    completeOnboarding(name, pickedLanguage);
    router.replace(`/${pickedLanguage}`);
  };

  // Until store is hydrated we render the welcome step shell so first paint isn't blank.
  return (
    <main className="min-h-screen bg-cream">
      {step === "welcome" && (
        <WelcomeView t={t} tCommon={tCommon} onContinue={() => setStep("language")} />
      )}

      {step === "language" && (
        <StepShell stepIdx={0}>
          <header>
            <Eyebrow t={t} index={1} />
            <h1 className="mt-2 font-serif text-3xl italic leading-snug text-ink md:text-4xl">
              {t("language_title")}
            </h1>
            <p className="mt-2 text-sm leading-loose text-ink-55">{t("language_subtitle")}</p>
          </header>

          <div className="flex flex-col gap-2.5">
            {LANG_OPTIONS.map((opt) => {
              const active = pickedLanguage === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setPickedLanguage(opt.code)}
                  className={`
                    flex items-center justify-between rounded-card border px-5 py-4 text-left
                    transition-all duration-base
                    ${active
                      ? "border-teal bg-paper shadow-[0_0_0_4px_rgba(47,130,118,0.10)]"
                      : "border-ink-08 bg-cream hover:border-ink-15"}
                  `}
                >
                  <span className="block">
                    <span className="block text-base font-medium text-ink">{opt.nativeLabel}</span>
                    <span className="mt-0.5 block text-xs text-ink-55">{t(opt.subKey)}</span>
                  </span>
                  {active && (
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-teal text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <PrimaryButton onClick={() => setStep("name")}>{t("continue")}</PrimaryButton>
        </StepShell>
      )}

      {step === "name" && (
        <StepShell stepIdx={1}>
          <header>
            <Eyebrow t={t} index={2} />
            <h1 className="mt-2 font-serif text-3xl italic leading-snug text-ink md:text-4xl">
              {t("name_title")}
            </h1>
            <p className="mt-2 text-sm leading-loose text-ink-55">{t("name_subtitle")}</p>
          </header>

          <label className="block">
            <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-ink-55">
              {t("name_label")}
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("name_placeholder")}
              autoFocus
              className="
                w-full rounded-btn border border-ink-08 bg-paper px-4 py-3
                text-base text-ink placeholder:text-ink-35
                transition-colors duration-base
                focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10
              "
            />
          </label>

          <PrimaryButton onClick={finish} disabled={!name.trim()}>
            {t("finish")}
          </PrimaryButton>

          <button
            type="button"
            onClick={() => setStep("language")}
            className="text-center text-xs text-ink-55 transition-colors hover:text-ink"
          >
            ← {t("back")}
          </button>
        </StepShell>
      )}
    </main>
  );
}

/* ─────────────── Inner pieces ─────────────── */

function WelcomeView({
  t,
  tCommon,
  onContinue,
}: {
  t: ReturnType<typeof useTranslations>;
  tCommon: ReturnType<typeof useTranslations>;
  onContinue: () => void;
}) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-between gap-10 px-5 py-12 md:py-16">
      {/* Soft brand mark — the designed Hope icon (PNG; the SVG wrapper is empty) */}
      <div className="flex flex-col items-start gap-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/favicon/web-app-manifest-192x192.png"
          alt=""
          aria-hidden="true"
          className="h-12 w-12 rounded-xl"
        />

        <header>
          <h1 className="font-serif text-4xl italic leading-tight text-ink md:text-5xl">
            {t("welcome_title")}
          </h1>
          <p className="mt-4 max-w-md text-base leading-loose text-ink-70">
            {t("welcome_subtitle")}
          </p>
        </header>

        {/* Value props */}
        <ul className="flex flex-col gap-3">
          {["welcome_prop_help", "welcome_prop_guides", "welcome_prop_specialists", "welcome_prop_offline"].map(
            (key) => (
              <li key={key} className="flex items-center gap-3 text-sm text-ink-70">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-btn bg-mist">
                  <Check className="h-4 w-4 text-teal" strokeWidth={2} aria-hidden="true" />
                </span>
                {t(key)}
              </li>
            ),
          )}
        </ul>
      </div>

      <div className="flex flex-col items-stretch gap-2">
        <button
          type="button"
          onClick={onContinue}
          className="
            inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-ink px-6
            text-sm font-medium text-cream shadow-hope-sm
            transition-all duration-base hover:brightness-110
          "
        >
          {t("welcome_cta")}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </button>
        <p className="text-center text-[11px] text-ink-35">{tCommon("brand_subtitle")}</p>
      </div>
    </div>
  );
}

function StepShell({
  stepIdx,
  children,
}: {
  stepIdx: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-5 py-10 md:py-14">
      {/* Step progress */}
      <div className="flex items-center gap-1.5" aria-label={`Step ${stepIdx + 1} of 2`}>
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-pill transition-colors duration-modal ${
              i <= stepIdx ? "bg-teal" : "bg-ink-08"
            }`}
          />
        ))}
      </div>
      {children}
    </div>
  );
}

function Eyebrow({ t, index }: { t: ReturnType<typeof useTranslations>; index: number }) {
  return (
    <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-teal">
      {t("step_of", { current: index, total: 2 })}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="
        inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-teal px-6
        text-sm font-medium text-white shadow-hope-sm
        transition-all duration-base hover:bg-teal-d
        disabled:bg-ink-15 disabled:text-ink-55 disabled:cursor-not-allowed
      "
    >
      {children}
      <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
    </button>
  );
}
