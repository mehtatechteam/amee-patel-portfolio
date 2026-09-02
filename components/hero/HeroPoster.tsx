"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePointerType } from "@/hooks/usePointerType";
import { cn } from "@/lib/utils";
import { portfolioItems } from "@/lib/constants/portfolio";

// Curated, flagship-first spread across categories — real product shots,
// real colors, no filter/dimming/curvature applied to them.
const POSTER_SLUGS = [
  "organic-amla-powder",
  "madburgs-burger-box",
  "lilaura-lavender",
  "shri-hanuman-realty-dholera",
  "medween-pharma-box",
  "prio-technology-logo",
  "paracetamol-tablets-blue",
  "kenheal-healthcare-wellness",
  "littlegrow-baby-cereal",
  "npmakeover-bridal-catalog",
];

const posterItems = POSTER_SLUGS.map((slug) => portfolioItems.find((i) => i.slug === slug)!).filter(Boolean);

type RenderStyle = "poster" | "card";

const STYLE_CONFIG: Record<RenderStyle, { maxTilt: number; wrapperClass: string; frameClass: string }> = {
  poster: {
    maxTilt: 10,
    wrapperClass: "max-w-sm sm:max-w-md",
    frameClass: "rounded-2xl",
  },
  card: {
    maxTilt: 18,
    wrapperClass: "max-w-[15rem] sm:max-w-[17rem]",
    frameClass: "rounded-[1.25rem] ring-1 ring-ink/10",
  },
};

/**
 * One product shot at a time, shown as a real, full-resolution image (no
 * WebGL texture/shader in between — after several rounds where curved
 * planes and a spotlight shader distorted colors and warped narrow
 * packaging, plain `next/image` inside a CSS 3D transform is what actually
 * "sells the design": full clarity, real color, zero geometry warping).
 * The 3D-ness comes from a mouse-follow tilt (GSAP quickTo driving
 * rotateX/rotateY, same pattern as HeroParallaxCollage used) plus a real
 * perspective on the wrapper, not from bent geometry. Swipe (drag) or the
 * prev/next buttons advance through the set; a Poster/Card toggle swaps
 * two lightweight presentation presets (size + tilt range) — a first cut
 * at the "different render settings" the client asked for, easy to extend
 * with more presets later without touching the interaction logic below.
 */
export function HeroPoster() {
  const [index, setIndex] = useState(0);
  const [style, setStyle] = useState<RenderStyle>("poster");
  const stageRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { isFinePointer } = usePointerType();

  const dragState = useRef({ dragging: false, startX: 0, dx: 0 });

  // Tilt (mouse-follow rotateX/rotateY) and drag (x/rotateZ while swiping)
  // both need to animate the poster's transform, and GSAP's CSSPlugin
  // keeps one shared parsed-transform cache per element — independent
  // tweens/quickTo instances each partially writing that same composite
  // `transform` property invalidate each other's cache and spam
  // "not eligible for reset" warnings (the exact bug already root-caused
  // and fixed once in this codebase, see HeroParallaxCollage's history).
  // Fix is the same here: every setter targets a plain proxy object, never
  // the DOM node directly, and a single ticker writes all four current
  // values to the node in one combined gsap.set() per frame.
  const transform = useRef({ x: 0, rotateX: 0, rotateY: 0, rotateZ: 0 });
  const setRotateX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const setRotateY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    setRotateX.current = gsap.quickTo(transform.current, "rotateX", { duration: 0.5, ease: "power3" });
    setRotateY.current = gsap.quickTo(transform.current, "rotateY", { duration: 0.5, ease: "power3" });

    function syncTransform() {
      if (!posterRef.current) return;
      const s = transform.current;
      gsap.set(posterRef.current, { x: s.x, rotateX: s.rotateX, rotateY: s.rotateY, rotateZ: s.rotateZ });
    }
    gsap.ticker.add(syncTransform);
    return () => {
      gsap.ticker.remove(syncTransform);
    };
  }, []);

  function onStageMouseMove(e: React.MouseEvent) {
    if (reducedMotion || !isFinePointer || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = STYLE_CONFIG[style].maxTilt;
    setRotateY.current?.(normX * maxTilt);
    setRotateX.current?.(-normY * maxTilt);
  }

  function onStageMouseLeave() {
    setRotateX.current?.(0);
    setRotateY.current?.(0);
  }

  function goTo(next: number) {
    const clamped = ((next % posterItems.length) + posterItems.length) % posterItems.length;
    setIndex(clamped);
  }

  function onPointerDown(e: React.PointerEvent) {
    e.preventDefault();
    dragState.current = { dragging: true, startX: e.clientX, dx: 0 };
    stageRef.current?.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    dragState.current.dx = dx;
    transform.current.x = dx * 0.6;
    transform.current.rotateZ = dx * 0.03;
  }
  function onPointerUp() {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    const { dx } = dragState.current;
    const threshold = 70;
    if (Math.abs(dx) > threshold) {
      goTo(dx < 0 ? index + 1 : index - 1);
    }
    gsap.to(transform.current, { x: 0, rotateZ: 0, duration: 0.5, ease: "elastic.out(1, 0.65)" });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  }

  const item = posterItems[index];
  const config = STYLE_CONFIG[style];

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-label="Product showcase — drag, swipe, or use the arrow buttons to browse"
        aria-roledescription="carousel"
        onMouseMove={onStageMouseMove}
        onMouseLeave={onStageMouseLeave}
        onKeyDown={onKeyDown}
        className="relative flex w-full items-center justify-center gap-4 outline-none"
        style={{ perspective: 1200 }}
      >
        <button
          type="button"
          aria-label="Previous design"
          onClick={() => goTo(index - 1)}
          className="hidden size-11 flex-none items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-paper-raised sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={cn("relative w-full touch-none select-none", config.wrapperClass)}
        >
          <div
            key={item.slug}
            ref={posterRef}
            className={cn(
              "relative w-full cursor-grab overflow-hidden bg-paper-raised shadow-[0_35px_70px_-25px_rgba(0,0,0,0.35)] transition-[border-radius] duration-300 active:cursor-grabbing",
              config.frameClass,
            )}
            style={{ aspectRatio: `${item.width} / ${item.height}`, transformStyle: "preserve-3d" }}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(min-width: 640px) 28rem, 90vw"
              draggable={false}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <button
          type="button"
          aria-label="Next design"
          onClick={() => goTo(index + 1)}
          className="hidden size-11 flex-none items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-paper-raised sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:hidden">
        <button
          type="button"
          aria-label="Previous design"
          onClick={() => goTo(index - 1)}
          className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next design"
          onClick={() => goTo(index + 1)}
          className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <div>
          <p className="font-spec text-sm font-normal tracking-wide text-ink">{item.client}</p>
          {item.tags?.[0] && <p className="text-xs text-ink-faint">{item.tags[0]}</p>}
        </div>

        {/* Render-style toggle — a first cut at "different render settings":
            two presentation presets today (poster/card), same interaction
            underneath, easy to add more (e.g. a third preset) later. */}
        <div className="inline-flex items-center rounded-full border border-ink/10 bg-paper-raised p-1 text-xs font-semibold">
          {(["poster", "card"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className={cn(
                "rounded-full px-3.5 py-1.5 capitalize transition-colors",
                style === s ? "bg-ink text-paper" : "text-ink-soft hover:text-ink",
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5" role="group" aria-label="Design position">
          {posterItems.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to design ${i + 1} of ${posterItems.length}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={cn("h-1.5 rounded-full transition-all duration-300", i === index ? "w-6 bg-ink" : "w-1.5 bg-ink/15 hover:bg-ink/35")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
