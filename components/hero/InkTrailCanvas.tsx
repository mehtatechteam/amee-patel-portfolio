"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePointerType } from "@/hooks/usePointerType";

type InkDot = { x: number; y: number; r: number; color: string; life: number };

const INK_COLORS = ["#00a3e0", "#ec008c", "#ffd100", "#1d1d1f"];
const MAX_DOTS = 150;
// Life reaches 0 after ~1.4s — an earlier, faster-decaying/smaller/fainter
// version was confirmed via review to be effectively invisible in
// practice; bigger, more opaque, longer-lived dots fix that without
// reintroducing the earlier fast-sweep wash-out bug, since the dot list
// stays capped at MAX_DOTS regardless of stamp rate or lifespan.
const DECAY_PER_MS = 1 / 1400;

/**
 * A cursor-driven halftone ink trail — as the pointer moves across the
 * hero, it stamps small CMYK-tinted dots that fade out behind it, like a
 * print head laying down color separations. Purely additive: the canvas
 * starts fully transparent and the real DOM content underneath is always
 * fully visible, so there's no "hidden until you move the mouse" failure
 * mode. Fine-pointer + motion-enabled only (see usePointerType/
 * useReducedMotion) — coarse/touch and reduced-motion visitors simply
 * never see it, not a degraded version of it.
 *
 * Every frame does a full `clearRect` + redraw from a capped, individually-
 * decaying dot list (not a `destination-out` erosion pass) — that keeps
 * total ink on screen bounded regardless of how fast the pointer moves,
 * so a fast sweep can't accumulate into a solid wash.
 */
export function InkTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const { isFinePointer } = usePointerType();

  useEffect(() => {
    if (reducedMotion || !isFinePointer) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const dots: InkDot[] = [];
    const pointer = { x: -1, y: -1, active: false };
    let raf: number;
    let lastStamp = 0;
    let lastFrame = performance.now();
    let colorCursor = 0;

    // See resize()'s comment: canvas is `pointer-events-none`, so track on
    // `window` and just ignore positions outside its own screen rect.
    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        pointer.active = false;
        return;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    }
    window.addEventListener("mousemove", onMove);

    function tick(now: number) {
      const dt = now - lastFrame;
      lastFrame = now;

      if (pointer.active && now - lastStamp > 25) {
        lastStamp = now;
        dots.push({
          x: pointer.x,
          y: pointer.y,
          r: 4 + Math.random() * 4,
          color: INK_COLORS[colorCursor % INK_COLORS.length],
          life: 1,
        });
        colorCursor++;
        if (dots.length > MAX_DOTS) dots.splice(0, dots.length - MAX_DOTS);
      }

      ctx!.clearRect(0, 0, width, height);
      for (let i = dots.length - 1; i >= 0; i--) {
        const dot = dots[i];
        dot.life -= DECAY_PER_MS * dt;
        if (dot.life <= 0) {
          dots.splice(i, 1);
          continue;
        }
        ctx!.globalAlpha = dot.life * 0.75;
        ctx!.fillStyle = dot.color;
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reducedMotion, isFinePointer]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-30 h-full w-full mix-blend-multiply"
    />
  );
}
