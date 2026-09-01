"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePointerType } from "@/hooks/usePointerType";
import type { UnfoldingBoxHandle } from "./UnfoldingBoxScene";

const UnfoldingBoxScene = dynamic(() => import("./UnfoldingBoxScene").then((m) => m.UnfoldingBoxScene), {
  ssr: false,
});

/**
 * A real dieline literally folding into an open presentation tray with a
 * propped-open hinged lid, scrubbed to scroll — the site's other GSAP work
 * animates opacity/position; this is the one place it animates the actual
 * product construction. Three.js is lazy-loaded (dynamic import,
 * `ssr:false`) and the Canvas itself only mounts once the stage nears the
 * viewport (IntersectionObserver), so the WebGL context and its render loop
 * never exist for a visitor who doesn't scroll this far.
 *
 * The lid is hinged to the back panel (see UnfoldingBoxScene.tsx) rather
 * than swung fully shut over the opening — a sealed lid risked clipping
 * through the front panel, so it ends up propped open, matching the "open
 * presentation tray" copy below.
 */
export function UnfoldingBox() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneHandleRef = useRef<UnfoldingBoxHandle | null>(null);
  const reducedMotion = useReducedMotion();
  const { isFinePointer } = usePointerType();
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (reducedMotion || !stageRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useGSAP(
    () => {
      if (reducedMotion || !wrapperRef.current) return;

      const proxy = { progress: 0 };
      const tween = gsap.to(proxy, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
        onUpdate: () => sceneHandleRef.current?.setFoldProgress(proxy.progress),
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: wrapperRef, dependencies: [reducedMotion] },
  );

  // Fine-pointer drag-to-rotate — a bonus interaction layered on top of the
  // scroll-driven fold, never required to see the box assemble (touch
  // devices get scroll-only, per the research on Lenis+ScrollTrigger+R3F
  // drag jank on mobile).
  useEffect(() => {
    if (reducedMotion || !isFinePointer || !stageRef.current) return;
    const el = stageRef.current;
    let dragging = false;
    let lastX = 0;
    let rotation = 0;

    function onDown(e: PointerEvent) {
      // Without preventDefault, Chromium arms its native text-selection
      // drag on this mousedown (the R3F <canvas> itself isn't selectable,
      // but an un-prevented pointerdown anywhere still starts that browser
      // gesture, which then paints a selection across the page as the
      // pointer moves) — this both eats the drag as rotation input and
      // paints an unwanted selection highlight. Confirmed via Playwright:
      // without this, a drag across the canvas produced zero rotation and
      // a highlighted nav bar; with it, 20 clean pointermove events and a
      // rotated model.
      e.preventDefault();
      dragging = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
    }
    function onMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      rotation += dx * 0.008;
      sceneHandleRef.current?.setUserRotationY(rotation);
    }
    function onUp(e: PointerEvent) {
      dragging = false;
      el.releasePointerCapture(e.pointerId);
    }

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [reducedMotion, isFinePointer]);

  if (reducedMotion) {
    return (
      <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-line bg-paper-raised p-10 text-center">
        <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl bg-paper">
          <Image
            src="/portfolio/packaging/medween-pharma-box.png"
            alt="Medween pharma bottle box, assembled"
            fill
            className="object-contain"
            sizes="320px"
          />
        </div>
        <p className="max-w-md text-sm text-ink-soft">
          Every carton starts as a flat, print-ready dieline before it&apos;s cut, creased, and folded into the finished box.
        </p>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative mt-16">
      <div
        ref={stageRef}
        className="relative mx-auto aspect-square w-full max-w-lg touch-none select-none lg:cursor-grab lg:active:cursor-grabbing"
      >
        {shouldMount ? (
          <UnfoldingBoxScene
            onHandleReady={(handle) => {
              sceneHandleRef.current = handle;
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl border border-dashed border-line/60 text-xs font-spec font-normal tracking-wide text-ink-faint uppercase">
            Scroll to unfold
          </div>
        )}
      </div>
      <p className="mt-6 text-center text-sm text-ink-soft">
        Scroll to watch the flat dieline fold up into shape{isFinePointer ? " — drag to rotate" : ""}.
      </p>
    </div>
  );
}
