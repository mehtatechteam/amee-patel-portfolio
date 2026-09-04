"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CMYKSwatch } from "./CMYKSwatch";

/** Editorial section header: "[ 01 // WORK ]" index label + a metadata
 * tag, in the spec-sheet monospace face. Purely a visual/wayfinding motif —
 * the numbering is presentational, not a real document reference.
 *
 * Also carries an oversized ghost numeral that fades/grows in as the
 * header scrolls into view — a kinetic echo of the same index number,
 * strengthening the "editorial index" identity already established by the
 * bracket label. It's a dedicated element with its own ref and its own
 * GSAP tween (opacity/scale only, nothing touching `transform` the way
 * position-based tweens do) — never shares a transform target with
 * another animation on the same node, which is the specific bug class
 * this codebase has hit more than once (see KineticWordmark/HeroPoster
 * history). Set `showNumeral={false}` for a section whose own layout
 * needs tight control over its header's stacking/overflow context (the
 * Pharma section's GSAP-pinned scroll storytelling, specifically).
 */
export function SectionIndex({
  index,
  label,
  meta,
  showNumeral = true,
}: {
  index: string;
  label: string;
  meta: string;
  showNumeral?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numeralRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !numeralRef.current || !rootRef.current) return;
      gsap.fromTo(
        numeralRef.current,
        { opacity: 0, scale: 0.9, y: 14 },
        {
          opacity: 0.06,
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <div ref={rootRef} className="relative mb-8 border-b border-line pb-4">
      {showNumeral && (
        <span
          ref={numeralRef}
          aria-hidden
          className="pointer-events-none absolute right-0 -top-20 hidden font-display text-7xl leading-none font-bold text-ink opacity-[0.06] select-none sm:block sm:text-8xl"
        >
          {index}
        </span>
      )}
      <div className="relative flex items-center justify-between">
        <span className="font-spec text-xs uppercase tracking-widest text-ink-soft">
          {`[ ${index} // ${label} ]`}
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden font-spec text-xs uppercase tracking-widest text-accent sm:inline">
            {meta}
          </span>
          <CMYKSwatch />
        </div>
      </div>
    </div>
  );
}
