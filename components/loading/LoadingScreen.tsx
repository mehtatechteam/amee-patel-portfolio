"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { gsap, Flip } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAssetPreloader } from "./useAssetPreloader";
import { siteMeta } from "@/lib/constants/site-copy";

const SAFETY_TIMEOUT_MS = 6000;

/**
 * Gated on real asset preload (see useAssetPreloader), not a fake timer.
 * The percentage counter advances in mechanical "steps" rather than a
 * smooth tween — reads like a printer/plotter readout, matching Amee's
 * print-production identity. On completion, the mark visually shrinks
 * into the Nav's actual logo position (Flip.fit — see lib/gsap.ts) so the
 * handoff to the real page reads as one continuous motion, not a hard cut.
 */
export function LoadingScreen() {
  const { progress, ready } = useAssetPreloader();
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();

  const [displayProgress, setDisplayProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const counterState = useRef({ value: 0 });
  const finishedRef = useRef(false);

  // Hold scroll position while the loader is up.
  useEffect(() => {
    lenis?.stop();
    document.documentElement.classList.add("overflow-hidden");
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [lenis]);

  // Stepped counter: re-targets to real `progress` every time it advances.
  useGSAP(() => {
    gsap.to(counterState.current, {
      value: progress,
      duration: 0.5,
      ease: "steps(12)",
      onUpdate: () => setDisplayProgress(Math.round(counterState.current.value)),
    });
  }, [progress]);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const unlock = () => {
      setHidden(true);
      lenis?.start();
      document.documentElement.classList.remove("overflow-hidden");
    };

    const logoTarget = document.getElementById("site-logo");

    if (reducedMotion || !markRef.current || !overlayRef.current || !logoTarget) {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3, onComplete: unlock });
      return;
    }

    const fitTween = Flip.fit(markRef.current, logoTarget, {
      duration: 0.75,
      ease: "power3.inOut",
      scale: true,
    }) as gsap.core.Tween;

    gsap
      .timeline({ onComplete: unlock })
      .add(fitTween)
      .to(overlayRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.out" }, "-=0.15");
  }

  useEffect(() => {
    if (ready) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    const id = window.setTimeout(finish, SAFETY_TIMEOUT_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-busy={!ready}
      aria-live="polite"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper"
    >
      <div ref={markRef} className="font-display text-4xl font-semibold text-ink sm:text-5xl">
        {siteMeta.name}
        <span className="text-accent">.</span>
      </div>
      <p aria-hidden className="mt-6 text-sm font-medium tabular-nums text-ink-faint">
        {String(displayProgress).padStart(3, "0")}%
      </p>
      <span className="sr-only">Loading site — {displayProgress}%</span>
    </div>
  );
}
