"use client";

import { InkBleedRule } from "./InkBleedRule";

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
  // Edges are hand-torn ink lines (InkBleedRule) rather than a straight
  // CSS border-y — a cheap, static riso/misregistration texture that
  // reinforces the print-shop identity right at the seam between the
  // hero and the rest of the page. Kept outside the overflow-hidden
  // ticker band so the SVGs, centered on the seam, are never clipped.
  return (
    <div className="relative">
      <InkBleedRule id="marquee-top" seed={7} className="absolute inset-x-0 top-0 z-10 -translate-y-1/2 text-ink/20" />
      <div className="overflow-hidden bg-paper-raised py-3.5" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {track}
          {track}
        </div>
      </div>
      <InkBleedRule id="marquee-bottom" seed={13} className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2 text-ink/20" />
    </div>
  );
}
