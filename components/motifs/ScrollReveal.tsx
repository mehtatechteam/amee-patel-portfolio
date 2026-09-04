"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Splits its text into words and reveals them (opacity + blur) as the
 * paragraph crosses the viewport, scrubbed to scroll position rather than
 * played once on enter — same ScrollTrigger already registered in
 * lib/gsap.ts, no new plugin/dependency.
 */
export function ScrollReveal({
  children,
  className,
  wordClassName,
  blurStrength = 3,
  baseOpacity = 0.35,
}: {
  children: string;
  className?: string;
  wordClassName?: string;
  blurStrength?: number;
  baseOpacity?: number;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    // GSAP writes these styles directly via JS on every tick, bypassing
    // the global `prefers-reduced-motion` CSS override in globals.css
    // (which only forces animation/transition durations to ~0 — it can't
    // touch a JS-driven tween at all). Skipping the tween entirely under
    // reduced motion leaves the words at their plain default (fully
    // opaque, no blur) instead of animating instantly stuck at the
    // "unrevealed" starting state.
    if (!el || reducedMotion) return;

    const words = el.querySelectorAll<HTMLElement>(".sr-word");
    const tween = gsap.fromTo(
      words,
      { opacity: baseOpacity, filter: `blur(${blurStrength}px)` },
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "none",
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=15%",
          end: "bottom center",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [blurStrength, baseOpacity, reducedMotion]);

  const words = children.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className={cn("sr-word inline-block will-change-[opacity,filter]", wordClassName)}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
