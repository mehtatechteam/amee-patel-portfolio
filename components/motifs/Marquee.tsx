"use client";

/**
 * Infinite horizontal studio ticker. Pure CSS animation (translateX loop,
 * see `@keyframes marquee` in globals.css) — no JS/GSAP needed, and it
 * respects `prefers-reduced-motion` for free via the site-wide reduced-
 * motion override in globals.css. Content is duplicated once so the loop
 * seams invisibly (translating exactly -50% of a doubled track).
 */
export function Marquee({ items }: { items: string[] }) {
  const track = (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-8 font-display text-lg font-semibold whitespace-nowrap text-ink">
          {item}
          <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  );

  // Purely decorative — the same information (services, experience,
  // guarantees) already exists as real copy elsewhere on the page, so the
  // whole ticker is hidden from assistive tech rather than read twice.
  // A light paper-raised ribbon (not solid black) so a thin ticker doesn't
  // read as an abrupt dark stripe sandwiched between two light sections.
  return (
    <div className="overflow-hidden border-y border-line bg-paper-raised py-3.5" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {track}
        {track}
      </div>
    </div>
  );
}
