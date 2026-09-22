"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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

// Was 6000ms — real users on a slow connection could be blocked behind
// the curtain for up to 6s before any content is interactive, a genuine
// Core Web Vitals (LCP/INP) risk. This is a worst-case safety net only —
// on any normal connection the real preload (3 hero images + fonts, see
// useAssetPreloader) finishes and dismisses the curtain well before this
// fires, so lowering it doesn't change the designed experience for
// anyone but the slow-network tail.
const SAFETY_TIMEOUT_MS = 2500;

/**
 * Gated on real asset preload (see useAssetPreloader), not a fake timer.
 * The counter is a continuously-eased simulated progress, not a direct
 * readout of real checkpoints — the real preload only has 4 discrete
 * steps (3 hero images + fonts ready), so driving the number straight off
 * it produced an abrupt 0/25/50/75/100 staircase every time a checkpoint
 * landed, especially on a fast/cached load where all 4 can resolve within
 * a couple hundred milliseconds. Instead a per-frame ticker glides the
 * displayed value toward a "ceiling" every frame: the ceiling creeps up
 * on its own (so the number is always visibly moving, never frozen
 * between checkpoints) and is raised early by genuine progress, so real
 * completions still pull it forward rather than being ignored. On
 * completion, the counter/label let go (scale + fade) a beat before the
 * WebGL cloth curtain (ClothCurtainScene) lifts up and off-screen,
 * revealing the real page underneath in one continuous motion rather
 * than a hard cut.
 */
export function LoadingScreen() {
  const { progress, ready } = useAssetPreloader();
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();

  const [displayProgress, setDisplayProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const curtainHandleRef = useRef<ClothCurtainHandle | null>(null);

  // Live-read inside the per-frame ticker via refs rather than
  // resubscribing the ticker callback on every progress/ready change.
  const progressRef = useRef(0);
  const readyRef = useRef(false);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);
  useEffect(() => {
    readyRef.current = ready;
  }, [ready]);

  // Hold scroll position while the loader is up.
  useEffect(() => {
    lenis?.stop();
    document.documentElement.classList.add("overflow-hidden");
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [lenis]);

  // Plain requestAnimationFrame loop, not gsap.ticker/useGSAP — this needs
  // to run every frame for the whole loading-screen lifetime (not "create
  // a tween and let it finish"), and empirically gsap.ticker.add() here
  // never actually fired a single frame in this component (confirmed via
  // logging: zero ticks over a 5s window while the surrounding app's own
  // GSAP-driven Lenis sync ran fine) — not worth chasing why inside a
  // library integration when a plain rAF loop is the more natural tool
  // for this job anyway and has no such ambiguity.
  useEffect(() => {
    if (reducedMotion) {
      // One-time sync to an external condition (matches the same pattern,
      // with the same justification, in useReducedMotion.ts itself) — not
      // a state update in response to a state/prop change during render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayProgress(100);
      return;
    }

    const CREEP_CAP = 92; // Never self-creep past this — the last stretch
    // to 100 only happens once actually ready, so the number can't lie
    // about being finished before the page really is.
    const CREEP_MS = 1800;
    const startedAt = performance.now();
    const value = { current: 0 };
    const ceiling = { current: 0 };
    let frameId: number;

    function tick() {
      const t = Math.min(1, (performance.now() - startedAt) / CREEP_MS);
      const creep = CREEP_CAP * (1 - Math.pow(1 - t, 3)); // ease-out cubic
      const target = readyRef.current ? 100 : Math.max(creep, progressRef.current);
      ceiling.current = Math.max(ceiling.current, target);

      // Exponential smoothing toward the ceiling every frame — continuous
      // motion, no discrete steps, no restarting tweens fighting each
      // other as real checkpoints land. Converges faster once ready so
      // the finish sequence below isn't left waiting on the last couple
      // of percent.
      const rate = readyRef.current ? 0.18 : 0.1;
      value.current += (ceiling.current - value.current) * rate;
      if (readyRef.current && ceiling.current - value.current < 0.1) {
        value.current = 100;
      }

      setDisplayProgress(Math.round(value.current));
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    // Also covers the safety-timeout path (real assets never actually
    // finished loading) — either way, once we're committed to lifting the
    // curtain the counter should race to 100 rather than sit stuck at
    // whatever it happened to reach.
    readyRef.current = true;

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
      .to(markRef.current, { scale: 0.9, autoAlpha: 0, duration: 0.4, ease: "power1.in" })
      .to(
        curtainState,
        {
          // Was power4.inOut — a much sharper acceleration curve that read
          // as a snap/flick rather than a lift. power2.inOut covers the
          // same distance more gradually at both ends, and the slightly
          // longer duration keeps it from feeling rushed.
          progress: 1,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => curtainHandleRef.current?.setProgress(curtainState.progress),
        },
        "-=0.1",
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
