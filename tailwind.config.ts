import type { Config } from "tailwindcss";
// tailwindcss-rtl ships no .d.ts file, so TypeScript can't infer its shape.
// The plugin itself works fine at runtime — this comment silences the type error.
// @ts-expect-error -- tailwindcss-rtl has no type declarations
import tailwindcssRtl from "tailwindcss-rtl";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // — shadcn/ui tokens (kept: the existing Button component depends on them) —
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        // — Hope brand primitives —
        "forest-deep": {
          DEFAULT: "var(--forest-deep)",
          light: "var(--forest-deep-light)",
          dark: "var(--forest-deep-dark)",
        },
        "ember-warm": {
          DEFAULT: "var(--ember-warm)",
          light: "var(--ember-warm-light)",
          dark: "var(--ember-warm-dark)",
        },
        "dusk-violet": {
          DEFAULT: "var(--dusk-violet)",
          light: "var(--dusk-violet-light)",
          dark: "var(--dusk-violet-dark)",
        },
        "pebble-cream": "var(--pebble-cream)",
        "sage-mist": "var(--sage-mist)",
        "sand-glow": "var(--sand-glow)",
        "lavender-haze": "var(--lavender-haze)",
        "bark-text": {
          DEFAULT: "var(--bark-text)",
          60: "var(--bark-text-60)",
          30: "var(--bark-text-30)",
          "08": "var(--bark-text-08)",
        },

        // — Hope semantic aliases —
        "hope-bg": "var(--color-bg)",
        "hope-surface": "var(--color-surface)",
        "hope-surface-white": "var(--color-surface-white)",
        "hope-primary": "var(--color-primary)",
        "hope-primary-hover": "var(--color-primary-hover)",
        "hope-accent": "var(--color-accent)",
        "hope-accent-hover": "var(--color-accent-hover)",
        "hope-text": "var(--color-text)",
        "hope-text-secondary": "var(--color-text-secondary)",
        "hope-text-placeholder": "var(--color-text-placeholder)",
        "hope-border": "var(--color-border)",
        "hope-scrim": "var(--color-scrim)",
        "feature-mood": "var(--color-feature-mood)",
        "feature-notes": "var(--color-feature-notes)",
        "feature-learn": "var(--color-feature-learn)",

        // — Hope feature surfaces —
        "surface-mood": "var(--surface-mood)",
        "surface-learn": "var(--surface-learn)",
        "surface-notes": "var(--surface-notes)",
        "surface-help": "var(--surface-help)",
        "surface-success": "var(--surface-success)",
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
      },

      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        md: "var(--text-md)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
      },

      lineHeight: {
        tight: "var(--leading-tight)",
        snug: "var(--leading-snug)",
        normal: "var(--leading-normal)",
        loose: "var(--leading-loose)",
      },

      fontWeight: {
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
      },

      spacing: {
        "screen-h": "var(--spacing-screen-h)",
        "card-pad": "var(--spacing-card-pad)",
        "section-gap": "var(--spacing-section-gap)",
        "nav-height": "var(--spacing-nav-height)",
        "help-btn-h": "var(--spacing-help-btn-h)",
      },

      borderRadius: {
        // shadcn/ui (kept so the existing Button component doesn't change shape)
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Hope radii — named for what they're used on
        field: "var(--radius-sm)",   //   8px  — inputs, small elements
        card: "var(--radius-md)",    //  16px  — cards, standard containers
        sheet: "var(--radius-lg)",   //  24px  — modals, bottom sheets
        pill: "var(--radius-pill)",  // 999px  — pills, tags, chips
      },

      boxShadow: {
        card: "var(--shadow-card)",
        modal: "var(--shadow-modal)",
        nav: "var(--shadow-nav)",
      },

      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        modal: "300ms",
      },
    },
  },
  // tailwindcss-rtl adds logical-direction utilities (ms-/me-/ps-/pe-)
  // that flip correctly when the page is in RTL mode (Dari).
  plugins: [tailwindcssRtl],
};

export default config;
