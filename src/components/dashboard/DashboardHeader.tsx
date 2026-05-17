import Link from "next/link";
import { useLocale } from "next-intl";

/**
 * Dashboard top header: Hope icon mark + "Hope" wordmark in Instrument Serif.
 * The whole header is a Link back to the Dashboard, so it doubles as a "home"
 * tap target from any sub-screen that chooses to render it.
 */
export function DashboardHeader() {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}`}
      aria-label="Hope home"
      className="inline-flex items-center gap-2"
    >
      {/* The favicon SVG also serves as our small brand mark. Using a plain
          <img> here (not next/image) because SVGs from /public don't benefit
          from Next's optimiser and a 24-byte tag is simpler to reason about. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/favicon/favicon.svg"
        alt=""
        aria-hidden="true"
        className="h-8 w-auto"
      />
      <span className="font-serif text-2xl leading-none text-bark-text">
        Hope
      </span>
    </Link>
  );
}
