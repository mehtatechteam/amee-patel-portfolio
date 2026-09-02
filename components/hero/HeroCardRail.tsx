"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { portfolioItems } from "@/lib/constants/portfolio";
import type { HeroArcHandle } from "./HeroArcScene";

const HeroArcScene = dynamic(() => import("./HeroArcScene").then((m) => m.HeroArcScene), { ssr: false });

// Curated, flagship-first spread across categories and aspect ratios so the
// arc's card widths vary naturally (like a real print-portfolio spread)
// rather than a uniform grid — mirrors each item's real width/height from
// lib/constants/portfolio.ts.
const RAIL_SLUGS = [
  "organic-amla-powder",
  "paracetamol-tablets-blue",
  "shri-hanuman-realty-dholera",
  "medween-pharma-box",
  "madburgs-burger-box",
  "lilaura-lavender",
  "prio-technology-logo",
  "npmakeover-bridal-catalog",
  "kenheal-healthcare-wellness",
  "littlegrow-baby-cereal",
];

const railItems = RAIL_SLUGS.map((slug) => portfolioItems.find((i) => i.slug === slug)!).filter(Boolean);

/**
 * Full-bleed, freely-draggable arc of product shots — the hero's visual
 * centerpiece, rebuilding jesperlandberg.com's dark-void curved-card arc
 * in light mode on this codebase's own R3F stack (see HeroArcScene.tsx).
 * This component owns the DOM/pointer side: a plain drag surface over the
 * WebGL canvas translates pointer deltas into `nudge`/`release` calls on
 * the scene's imperative handle (the same pattern UnfoldingBox.tsx uses
 * for its drag-to-rotate, including the `preventDefault` fix for Chromium
 * arming native text-selection drag on an unprevented pointerdown).
 */
export function HeroCardRail() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HeroArcHandle | null>(null);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className="flex h-[46vh] gap-6 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:h-[56vh] [&::-webkit-scrollbar]:hidden">
        {railItems.map((item) => (
          <div
            key={item.slug}
            className="relative h-full flex-none overflow-hidden rounded-3xl bg-paper-raised shadow-[0_25px_60px_-25px_rgba(0,0,0,0.35)]"
            style={{ aspectRatio: `${item.width} / ${item.height}` }}
          >
            <Image src={item.src} alt={item.title} fill sizes="60vh" draggable={false} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  function onPointerDown(e: React.PointerEvent) {
    e.preventDefault();
    const surface = surfaceRef.current;
    if (!surface) return;
    try {
      surface.setPointerCapture(e.pointerId);
    } catch {
      // A pointerId the browser doesn't recognize as currently active (only
      // reachable via synthetic/programmatic events, never a real user
      // gesture) throws here — drag still works without capture, so this
      // is a defensive no-op, not a recovery path real users hit.
    }
    surface.classList.add("cursor-grabbing");
    surface.classList.remove("cursor-grab");

    let lastX = e.clientX;
    let lastT = performance.now();
    let velocity = 0;

    function onMove(ev: PointerEvent) {
      const now = performance.now();
      const dt = now - lastT;
      const dx = ev.clientX - lastX;
      if (dt > 0) velocity = (dx / dt) * 16.7 * 0.0035;
      lastX = ev.clientX;
      lastT = now;
      handleRef.current?.nudge(dx);
    }
    function endDrag(ev: PointerEvent) {
      surface!.removeEventListener("pointermove", onMove);
      surface!.removeEventListener("pointerup", endDrag);
      surface!.removeEventListener("pointercancel", endDrag);
      try {
        surface!.releasePointerCapture(ev.pointerId);
      } catch {
        // Mirrors the setPointerCapture try/catch above — a no-op if
        // capture was never actually acquired for this pointerId.
      }
      surface!.classList.remove("cursor-grabbing");
      surface!.classList.add("cursor-grab");
      handleRef.current?.release(velocity);
    }

    surface.addEventListener("pointermove", onMove);
    surface.addEventListener("pointerup", endDrag, { once: true });
    surface.addEventListener("pointercancel", endDrag, { once: true });
  }

  return (
    <div className="relative h-[46vh] w-full sm:h-[62vh]">
      <HeroArcScene
        items={railItems}
        onHandleReady={(handle) => {
          handleRef.current = handle;
        }}
      />
      <div
        ref={surfaceRef}
        role="group"
        aria-label="Drag to browse product photography"
        onPointerDown={onPointerDown}
        className="absolute inset-0 cursor-grab touch-none select-none"
      />
    </div>
  );
}
