"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Looping text set on a circular SVG path, auto-rotating and
 * pointer-draggable. Rotation is written straight to the SVG's own
 * transform via a ref each animation frame (not React state) — same
 * "don't route high-frequency updates through re-renders" rule already
 * used elsewhere in this codebase (Nav's cursor-tracked ruler highlight,
 * the old phoneRuntime store) — a drag gesture and a 60fps auto-spin both
 * update every frame, so this avoids a re-render per frame for either.
 */
export function CurvedLoop({
  text,
  size = 140,
  className,
  speed = 26,
}: {
  text: string;
  size?: number;
  className?: string;
  /** Seconds per full revolution when not being dragged. */
  speed?: number;
}) {
  const pathId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const rotationRef = useRef(0);
  const draggingRef = useRef(false);
  const lastAngleRef = useRef(0);
  const radius = size / 2 - 10;

  useEffect(() => {
    let raf: number;
    let last = performance.now();
    const degPerMs = 360 / (speed * 1000);

    function tick(now: number) {
      const dt = now - last;
      last = now;
      if (!draggingRef.current) {
        rotationRef.current += degPerMs * dt;
      }
      if (svgRef.current) {
        svgRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  function angleFromEvent(e: React.PointerEvent) {
    const svg = svgRef.current;
    if (!svg) return 0;
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  }

  function onPointerDown(e: React.PointerEvent) {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    draggingRef.current = true;
    lastAngleRef.current = angleFromEvent(e);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    const angle = angleFromEvent(e);
    rotationRef.current += angle - lastAngleRef.current;
    lastAngleRef.current = angle;
  }
  function onPointerUp() {
    draggingRef.current = false;
  }

  const repeated = `${text} ✦ `.repeat(4);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={cn("cursor-grab touch-none select-none active:cursor-grabbing", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <defs>
        <path
          id={pathId}
          d={`M ${size / 2 - radius},${size / 2} a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
        />
      </defs>
      <text className="font-spec fill-ink-soft text-[8.5px] tracking-widest uppercase">
        <textPath href={`#${pathId}`} startOffset="0">
          {repeated}
        </textPath>
      </text>
    </svg>
  );
}
