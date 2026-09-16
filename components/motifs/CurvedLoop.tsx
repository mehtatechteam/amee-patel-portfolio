"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
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
  const measureRef = useRef<SVGTextElement>(null);
  const rotationRef = useRef(0);
  const draggingRef = useRef(false);
  const lastAngleRef = useRef(0);
  const radius = size / 2 - 10;
  const unit = `${text} ✦ `;

  // The path is a closed circle, so textPath content keeps wrapping around
  // it past 360°. A fixed repeat count overlapped 3-4x for this text/size
  // combo, garbling the loop. Measure the unit string's real rendered
  // length and repeat just enough times to fill the circumference once.
  const [repeatCount, setRepeatCount] = useState(1);
  useLayoutEffect(() => {
    const unitLength = measureRef.current?.getComputedTextLength();
    if (unitLength) {
      const circumference = 2 * Math.PI * radius;
      setRepeatCount(Math.max(1, Math.round(circumference / unitLength)));
    }
  }, [unit, radius]);

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

  const repeated = unit.repeat(repeatCount);

  return (
    // touch-pan-y, not touch-none: this badge renders inside a `sticky`
    // card (DesignerSpecCard), so it stays under the same spot on screen
    // while that section scrolls. touch-none there ate any scroll gesture
    // that happened to start on it — the exact bug ImageTrail's comment
    // warns about — so vertical panning has to pass through untouched.
    <svg
      ref={svgRef}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={cn("cursor-grab touch-pan-y select-none active:cursor-grabbing", className)}
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
      <text
        ref={measureRef}
        className="font-spec text-[8.5px] tracking-widest uppercase"
        style={{ visibility: "hidden" }}
        aria-hidden
      >
        {unit}
      </text>
      <text className="font-spec fill-ink-soft text-[8.5px] tracking-widest uppercase">
        <textPath href={`#${pathId}`} startOffset="0">
          {repeated}
        </textPath>
      </text>
    </svg>
  );
}
