import type { Config } from "tailwindcss";

/**
 * Hope — Tailwind config (MVP palette)
 *
 * Tokens point at CSS variables defined in `src/app/globals.css`.
 *   - Tailwind classes like `bg-teal` work out of the box
 *   - Raw CSS like `background: var(--teal)` also works
 *   - Changing a colour means editing globals.css only
 *
 * shadcn primitives (--background, --foreground, --primary, …) are
 * remapped in globals.css to Hope colours, so the stock shadcn Button
 * already looks like a Hope dark button without rewriting it.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── shadcn primitives (read from HSL in globals.css) ──
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // ── Hope MVP palette ──
        cream:    "var(--cream)",
        paper:    "var(--paper)",
        "paper-2": "var(--paper-2)",

        teal:  { DEFAULT: "var(--teal)",  d: "var(--teal-d)",  l: "var(--teal-l)"  },
        slate: { DEFAULT: "var(--slate)", d: "var(--slate-d)", l: "var(--slate-l)" },
        coral: { DEFAULT: "var(--coral)", d: "var(--coral-d)", l: "var(--coral-l)" },

        mist: "var(--mist)",
        sand: { DEFAULT: "var(--sand)", l: "var(--sand-l)", d: "var(--sand-d)" },

        ink: {
          DEFAULT: "var(--ink)",
          90:      "var(--ink-90)",
          70:      "var(--ink-70)",
          55:      "var(--ink-55)",
          35:      "var(--ink-35)",
          15:      "var(--ink-15)",
          "08":    "var(--ink-08)",
          "05":    "var(--ink-05)",
        },
      },

      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
      },

      fontSize: {
        xs:    "var(--text-xs)",
        sm:    "var(--text-sm)",
        base:  "var(--text-base)",
        md:    "var(--text-md)",
        lg:    "var(--text-lg)",
        xl:    "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        "5xl": "var(--text-5xl)",
      },

      lineHeight: {
        tight:  "var(--leading-tight)",
        snug:   "var(--leading-snug)",
        normal: "var(--leading-normal)",
        loose:  "var(--leading-loose)",
      },

      fontWeight: {
        regular:  "var(--font-weight-regular)",
        medium:   "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
      },

      spacing: {
        "screen-h":   "var(--spacing-screen-h)",
        "card-pad":   "var(--spacing-card-pad)",
        "section-gap":"var(--spacing-section-gap)",
        "nav-height": "var(--spacing-nav-height)",
        "help-btn-h": "var(--spacing-help-btn-h)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        field: "var(--radius-sm)",
        btn:   "var(--radius-md)",
        card:  "var(--radius-lg)",
        sheet: "var(--radius-xl)",
        hero:  "var(--radius-xl)",
        pill:  "var(--radius-pill)",
      },

      boxShadow: {
        "hope-sm": "var(--shadow-sm)",
        "hope-md": "var(--shadow-md)",
        "hope-lg": "var(--shadow-lg)",
        card:  "var(--shadow-card)",
        modal: "var(--shadow-modal)",
        nav:   "var(--shadow-nav)",
      },

      transitionTimingFunction: { hope: "cubic-bezier(.2, .7, .2, 1)" },
      transitionDuration: { fast: "150ms", base: "200ms", modal: "300ms" },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};

export default config;
