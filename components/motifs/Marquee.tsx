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

  // A second, thinner track of press-calibration ink dashes — same CMYK
  // sequence as PressColorBar/CMYKSwatch elsewhere, scrolling the opposite
  // direction at the same speed for a "dual-track calibration ribbon"
  // feel. Purely decorative generic ink swatches, not a claim about any
  // specific real press run.
  const inks = [
    { name: "C", className: "bg-cyan" },
    { name: "M", className: "bg-magenta" },
    { name: "Y", className: "bg-yellow" },
    { name: "K", className: "bg-ink" },
  ];
  const calibrationTrack = (
    <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {inks.map((ink) => (
            <span key={ink.name} className={`h-2 w-4 rounded-[1px] ${ink.className}`} />
          ))}
        </div>
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
      <div className="overflow-hidden border-t border-line/60 bg-paper py-1.5" aria-hidden="true">
        <div className="flex w-max animate-marquee" style={{ animationDirection: "reverse", animationDuration: "22s" }}>
          {calibrationTrack}
          {calibrationTrack}
        </div>
      </div>
      <InkBleedRule id="marquee-bottom" seed={13} className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2 text-ink/20" />
    </div>
  );
}
