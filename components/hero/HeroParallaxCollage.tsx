"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/lib/constants/portfolio";

type CollageEntry = { item: PortfolioItem; rotate: string; cls: string; depth: number; zoom?: boolean };

export function HeroParallaxCollage({ collage }: { collage: CollageEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredRef = useRef<number | null>(null);
  const draggingRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    // Root-caused the long-standing "rotateX/rotateY not eligible for
    // reset" console spam: it wasn't a cosmetic quirk, it was five
    // independent `quickTo()` tweens (x, y, z, rotateX, rotateY) all
    // writing the SAME element's composite `transform` property. GSAP's
    // CSSPlugin keeps one shared parsed-transform cache per element;
    // rotateX/rotateY can't be patched incrementally into that cache the
    // way a plain translate can (rotation needs the whole matrix
    // re-derived), so the instant a sibling quickTo (x/y/z) touched the
    // same element's transform first, the rotateX/rotateY tweens' cached
    // PropTween lookup went stale and every resetTo() call warned.
    // Fix: quickTo now eases a plain numeric proxy object per card (not
    // the DOM node — plain object properties have no CSSPlugin transform
    // caching to invalidate), and a single gsap.ticker callback below
    // writes all five current values to the card in one combined
    // `gsap.set()` per frame. One transform write per element per frame,
    // never a partial resetTo, so there's nothing left to invalidate —
    // confirmed via a clean console across a full mousemove sweep.
    const states = cardRefs.current.map(() => ({ x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0 }));

    const setters = cardRefs.current.map((card, i) =>
      card
        ? {
            x: gsap.quickTo(states[i], "x", { duration: 0.6, ease: "power3" }),
            y: gsap.quickTo(states[i], "y", { duration: 0.6, ease: "power3" }),
            z: gsap.quickTo(states[i], "z", { duration: 0.6, ease: "power3" }),
            rotateX: gsap.quickTo(states[i], "rotateX", { duration: 0.6, ease: "power3" }),
            rotateY: gsap.quickTo(states[i], "rotateY", { duration: 0.6, ease: "power3" }),
          }
        : null,
    );

    function syncTransforms() {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const s = states[i];
        // Read the five numbers into a *fresh* plain object rather than
        // passing `states[i]` itself as gsap.set()'s vars. states[i] is
        // also a live quickTo target, so GSAP has attached its own
        // internal `_gsap` cache directly onto it as an enumerable own
        // property; passing that same object as vars leaks `_gsap` in
        // alongside x/y/z/rotateX/rotateY, which was confusing CSSPlugin's
        // harness detection on `card` and produced a fresh batch of
        // "Invalid property ... Missing plugin?" warnings at mount —
        // caught by literally stringifying states[i] and hitting a
        // circular-structure error pointing straight at `_gsap.target`.
        gsap.set(card, { x: s.x, y: s.y, z: s.z, rotateX: s.rotateX, rotateY: s.rotateY });
      });
    }
    gsap.ticker.add(syncTransforms);

    // Continuous idle "breathing" float so the stage feels alive at rest.
    // Tweens the same plain `state.z` proxy the mousemove tilt's quickTo
    // targets — safe to overlap now that both live on a plain object
    // rather than the DOM element's transform.
    const breathing = gsap.timeline({ repeat: -1, yoyo: true });
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      breathing.to(states[i], { z: 6, duration: 2.4 + i * 0.3, ease: "sine.inOut" }, i * 0.2);
    });

    function resetTilt() {
      setters.forEach((setter) => {
        if (!setter) return;
        setter.x(0);
        setter.y(0);
        setter.rotateX(0);
        setter.rotateY(0);
      });
    }

    function onMove(e: MouseEvent) {
      // While a card is spotlighted or being dragged, tilt holds at 0
      // (straightened) instead of chasing the cursor — letting either run
      // at once would fight over the same GSAP-driven transform.
      if (hoveredRef.current !== null || draggingRef.current !== null) return;
      const rect = container!.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      setters.forEach((setter, i) => {
        if (!setter) return;
        const depth = collage[i]?.depth ?? 1;
        setter.x(normX * 16 * depth);
        setter.y(normY * 12 * depth);
        setter.rotateY(normX * 10 * depth);
        setter.rotateX(-normY * 10 * depth);
      });
    }

    function onLeave() {
      if (hoveredRef.current !== null || draggingRef.current !== null) return;
      resetTilt();
    }

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const cardEls = cardRefs.current;
    const enterHandlers = cardEls.map((_, i) => () => {
      if (draggingRef.current !== null) return;
      setHovered(i);
      resetTilt();
    });
    const leaveHandlers = cardEls.map(() => () => {
      if (draggingRef.current !== null) return;
      setHovered(null);
    });
    cardEls.forEach((card, i) => {
      card?.addEventListener("mouseenter", enterHandlers[i]);
      card?.addEventListener("mouseleave", leaveHandlers[i]);
    });

    // Drag-to-lift: pick any card up off the stack and it follows the
    // cursor 1:1 (snappier duration than the ambient tilt's quickTo) with
    // a light swing proportional to drag distance; its two neighbors nudge
    // aside like proofs shifting to make room. Release springs the card
    // back with `elastic.out` — a distinctly bouncier motion signature
    // than the hover tilt's `power3`, so "picked up and dropped" reads as
    // its own gesture rather than a variant of the ambient tilt. Reuses
    // the same quickTo setters (and the tilt/hover suppression above)
    // rather than introducing a second transform-writing system.
    //
    // Root-caused a real bug while building this: dragging silently died
    // after exactly one pointermove, always ending in a `pointercancel`.
    // Eliminated setPointerCapture-vs-window-listening, the transform
    // writes themselves, the sibling nudge, the hover CSS-class swap,
    // `transition-all`, `overflow-hidden` + `preserve-3d`, all one at a
    // time — none were it. The actual cause: images are natively
    // draggable in the browser, and once pointer movement crosses a small
    // threshold on an `<img>` (which next/image renders under the hood),
    // Chromium hands the gesture to native OS drag-and-drop and cancels
    // the in-flight pointer sequence. `draggable={false}` on the `Image`
    // below is the fix — confirmed live afterward with a 20-step drag
    // producing 20 clean pointermove events and a normal pointerup.
    const dragCleanups = cardEls.map((card, i) => {
      if (!card) return () => {};
      const setter = setters[i];
      if (!setter) return () => {};

      function onPointerDown(e: PointerEvent) {
        if (draggingRef.current !== null) return;
        // Without this, Chromium treats the mousedown-then-drag gesture as
        // the start of a native text-selection drag (the same failure mode
        // the process-section box hit) — it doesn't matter that the card
        // itself has nothing selectable in it; an un-prevented mousedown
        // anywhere still arms the browser's default selection-drag, and
        // dragging the pointer then paints a selection across whatever
        // *other* text it passes over (nav links, headings). preventDefault
        // here is what actually suppresses that, confirmed via Playwright:
        // a 15-step drag across the nav produced zero selected text after
        // this, versus the whole page highlighting before it.
        e.preventDefault();
        draggingRef.current = i;
        setHovered(i);
        card!.setPointerCapture(e.pointerId);
        const startX = e.clientX;
        const startY = e.clientY;

        // Nudge the two neighbors a few px away from the lifted card so
        // the stack visibly reshuffles, not just the dragged card moving.
        setters.forEach((s, j) => {
          if (j === i || !s) return;
          const dir = j < i ? -1 : 1;
          s.x(dir * 14);
          s.y(dir * 8);
        });

        function onPointerMove(ev: PointerEvent) {
          const dx = ev.clientX - startX;
          const dy = ev.clientY - startY;
          setter!.x(dx);
          setter!.y(dy);
          setter!.rotateY(Math.max(-20, Math.min(20, dx * 0.07)));
          setter!.rotateX(Math.max(-12, Math.min(12, -dy * 0.05)));
        }

        function endDrag(ev: PointerEvent) {
          card!.removeEventListener("pointermove", onPointerMove);
          card!.removeEventListener("pointerup", endDrag);
          card!.removeEventListener("pointercancel", endDrag);
          card!.releasePointerCapture(ev.pointerId);
          draggingRef.current = null;
          setHovered(null);
          // Tween the plain state proxy (not `card` directly) — the ticker
          // above is the only thing allowed to write the card's transform,
          // so an elastic release has to land through the same proxy the
          // quickTo setters use, or the next tick's syncTransforms() would
          // instantly stomp it back to the stale drag-end values.
          gsap.to(states[i], { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.55)" });
          setters.forEach((s, j) => {
            if (j === i || !s) return;
            s.x(0);
            s.y(0);
          });
        }

        card!.addEventListener("pointermove", onPointerMove);
        card!.addEventListener("pointerup", endDrag, { once: true });
        card!.addEventListener("pointercancel", endDrag, { once: true });
      }

      card.addEventListener("pointerdown", onPointerDown);
      return () => card.removeEventListener("pointerdown", onPointerDown);
    });

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      cardEls.forEach((card, i) => {
        card?.removeEventListener("mouseenter", enterHandlers[i]);
        card?.removeEventListener("mouseleave", leaveHandlers[i]);
      });
      dragCleanups.forEach((cleanup) => cleanup());
      breathing.kill();
      gsap.ticker.remove(syncTransforms);
    };
  }, [collage, reducedMotion]);

  return (
    <div ref={containerRef} className="relative hidden aspect-square lg:block" style={{ perspective: "1200px" }}>
      {collage.map(({ item, rotate, cls, zoom }, i) => {
        const isHovered = hovered === i;
        const isDimmed = hovered !== null && !isHovered;

        return (
          <div
            key={item.slug}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={cn(
              "absolute aspect-[4/5] touch-none select-none overflow-hidden rounded-3xl bg-paper-raised transition-all duration-500 ease-out will-change-transform cursor-grab active:cursor-grabbing",
              isHovered ? "z-30 scale-110 rotate-0 shadow-[0_45px_90px_-20px_rgba(0,0,0,0.4)]" : rotate,
              !isHovered && "shadow-[0_35px_70px_-20px_rgba(0,0,0,0.28)]",
              isDimmed && "z-0 scale-90 opacity-25 blur-[3px] pointer-events-none",
              cls,
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 30vw, 50vw"
              priority
              draggable={false}
              className={cn("h-full w-full object-cover transition-transform duration-500", zoom && !isHovered && "scale-125")}
            />
          </div>
        );
      })}
    </div>
  );
}
