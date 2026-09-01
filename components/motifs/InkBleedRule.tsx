import { cn } from "@/lib/utils";

/**
 * A hand-torn, mis-registered ink line — a straight <line> run through an
 * SVG feTurbulence + feDisplacementMap filter, so a section boundary reads
 * as a press-bled edge rather than a vector-perfect UI border. Purely
 * static (a filtered shape, not an animation), so it needs no
 * reduced-motion gating. `id` must be unique per instance on the page —
 * SVG filter references resolve by ID document-wide, so two instances
 * sharing one id would both render whichever definition happens to be
 * first in the DOM.
 */
export function InkBleedRule({
  id,
  seed = 7,
  className,
}: {
  id: string;
  seed?: number;
  className?: string;
}) {
  const filterId = `ink-bleed-${id}`;
  return (
    <svg
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      className={cn("block h-6 w-full", className)}
      aria-hidden
    >
      {/*
       * filterUnits="userSpaceOnUse" with an absolute region is load-
       * bearing, not stylistic: a <line> has a zero-height geometric
       * bounding box, so the SVG-default percentage-based
       * (objectBoundingBox) filter region resolves to zero height and
       * silently clips the whole filter to nothing — confirmed via an
       * isolated Playwright screenshot (invisible with the default
       * region, a visible wobbly line once switched to an absolute
       * userSpaceOnUse region matching the viewBox).
       */}
      <filter id={filterId} filterUnits="userSpaceOnUse" x="-20" y="-40" width="1240" height="100">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.4" numOctaves={2} seed={seed} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <line x1="0" y1="12" x2="1200" y2="12" stroke="currentColor" strokeWidth="1.5" filter={`url(#${filterId})`} />
    </svg>
  );
}
