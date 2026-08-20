"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Lenis and GSAP must share a single rAF loop or ScrollTrigger desyncs from
 * the smooth-scrolled position (the #1 cause of glitchy scroll-linked
 * animation reported across GSAP's own forums). We disable Lenis's internal
 * rAF (`autoRaf: false`) and drive it from `gsap.ticker` instead.
 */
function LenisGsapSync() {
  const lenis = useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    if (!lenis) return;

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        smoothWheel: !reducedMotion,
        duration: 1.1,
        touchMultiplier: 1,
      }}
    >
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
