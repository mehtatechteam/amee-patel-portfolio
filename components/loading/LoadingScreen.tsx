"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAssetPreloader } from "./useAssetPreloader";
import { siteMeta } from "@/lib/constants/site-copy";
import { LOADING_SCREEN_DONE_EVENT } from "@/lib/loadingScreenEvent";
import type { ClothCurtainHandle } from "./ClothCurtainScene";

const ClothCurtainScene = dynamic(() => import("./ClothCurtainScene").then((m) => m.ClothCurtainScene), {
  ssr: false,
});

const SAFETY_TIMEOUT_MS = 6000;

/**
 * Gated on real asset preload (see useAssetPreloader), not a fake timer.
 * The percentage counter advances in mechanical "steps" rather than a
 * smooth tween — reads like a printer/plotter readout, matching Amee's
 * print-production identity. On completion, the counter/label let go
 * (scale + fade) a beat before the WebGL cloth curtain (ClothCurtainScene)
 * lifts up and off-screen, revealing the real page underneath in one
 * continuous motion rather than a hard cut.
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
  const curtainHandleRef = useRef<ClothCurtainHandle | null>(null);

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
      // Let other components (the hero's registration-snap entrance) sync
      // their own one-time animation to this moment — dispatched once the
      // overlay is actually gone, not when it starts clearing (an earlier
      // version fired this at the top of finish(), which meant dependent
      // animations could finish playing while still hidden behind the
      // curtain-wipe sequence below; confirmed via review that this
      // made the hero's entrance effectively invisible in practice).
      window.__loadingScreenDone = true;
      window.dispatchEvent(new Event(LOADING_SCREEN_DONE_EVENT));
    };

    if (reducedMotion || !markRef.current || !overlayRef.current || !curtainHandleRef.current) {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3, onComplete: unlock });
      return;
    }

    const curtainState = { progress: 0 };
    gsap
      .timeline({ onComplete: unlock })
      .to(markRef.current, { scale: 0.85, autoAlpha: 0, duration: 0.35, ease: "power2.in" })
      .to(
        curtainState,
        {
          progress: 1,
          duration: 0.9,
          ease: "power4.inOut",
          onUpdate: () => curtainHandleRef.current?.setProgress(curtainState.progress),
        },
        "-=0.05",
      )
      .set(overlayRef.current, { autoAlpha: 0 });
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
    <div ref={overlayRef} role="status" aria-busy={!ready} aria-live="polite" className="fixed inset-0 z-[100] bg-paper">
      {!reducedMotion && (
        <div className="absolute inset-0">
          <ClothCurtainScene
            onReady={(handle) => {
              curtainHandleRef.current = handle;
            }}
          />
        </div>
      )}
      <div ref={markRef} className="absolute inset-0 flex flex-col items-center justify-center">
        <p aria-hidden className="font-spec text-[20vw] leading-none font-normal tabular-nums text-ink sm:text-[10rem]">
          {String(displayProgress).padStart(3, "0")}
          <span className="text-accent">%</span>
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs font-medium tracking-wider text-ink-soft uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {siteMeta.name}
        </div>
      </div>
      <span className="sr-only">Loading site — {displayProgress}%</span>
    </div>
  );
}
