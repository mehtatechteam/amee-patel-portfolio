"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Two orphaned studio-prop renders (assets/hero/*.png, from an earlier,
 * since-replaced hero iteration) reused as small, low-opacity "designer's
 * desk" decorations with a subtle scroll parallax — not the hero's main
 * subject, just atmosphere in the section's own margins. Inert under
 * reduced motion (no transform updates at all, not just a smaller one).
 */
export function HeroAtelierProps() {
  const reducedMotion = useReducedMotion();
  const penRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;
    function apply() {
      ticking = false;
      const y = window.scrollY;
      if (penRef.current) penRef.current.style.transform = `translateY(${Math.min(y * 0.1, 60)}px) rotate(-10deg)`;
      if (clipRef.current) clipRef.current.style.transform = `translateY(${Math.min(y * 0.06, 40)}px) rotate(12deg)`;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Studio drafting fountain pen resting at bottom-left. Anchored
          well clear of the section's own bottom edge (bottom-24, not
          bottom-6) — the scroll parallax below pushes it down by up to
          another 60px, and at the old bottom-6 offset that pushed it
          past the section boundary, visibly guillotined by the wrapper's
          overflow-hidden right at the seam with the Marquee below
          (confirmed via a zoomed screenshot, not just visual impression). */}
      <div
        ref={penRef}
        className="absolute bottom-24 left-4 hidden w-28 opacity-40 drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)] lg:block lg:w-36"
        style={{ transform: "rotate(-18deg)" }}
      >
        <Image src="/hero/fountain-pen.png" alt="" width={256} height={256} className="h-auto w-full select-none" />
      </div>

      {/* Pencil shavings resting near bottom-right — same clipping fix. */}
      <div
        ref={clipRef}
        className="absolute bottom-20 right-8 hidden w-20 opacity-35 drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] xl:block"
        style={{ transform: "rotate(14deg)" }}
      >
        <Image src="/hero/pencil-shavings.png" alt="" width={256} height={256} className="h-auto w-full select-none" />
      </div>
    </div>
  );
}
