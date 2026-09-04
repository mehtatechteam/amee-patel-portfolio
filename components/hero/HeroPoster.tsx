"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePointerType } from "@/hooks/usePointerType";
import { cn } from "@/lib/utils";
import { heroShowcaseItems } from "@/lib/constants/heroShowcase";
import { useDominantColor } from "@/hooks/useDominantColor";
import { Icon } from "@/lib/icons";

export type ShowcaseMode = "carton" | "mockup" | "dieline";

// Earlier version of this file hardcoded a `PACKAGING_SPECS` table with
// specific invented board stocks, dieline types, and finishes ("Silver
// Foil Stamp", "Braille Emboss", exact GSM weights) per real named
// product and displayed them as fact. Removed entirely — this project's
// own documented discipline (docs/client-requirements.md) is to never
// present an unconfirmed technical spec as real about a real client's
// product. The ambient glow below now uses the same real, sampled-from-
// the-actual-photo color already used for portfolio cards
// (useDominantColor) instead of a per-slug invented color.

export function HeroPoster() {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<ShowcaseMode>("carton");
  const [spotUvActive, setSpotUvActive] = useState(true);

  const stageRef = useRef<HTMLDivElement>(null);
  const cartonRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { isFinePointer } = usePointerType();

  // Gesture tracking with strict pan-y protection (never trap vertical scroll)
  const touchStart = useRef({ x: 0, y: 0, isHorizontal: false });

  // 3D Tilt proxy
  const tilt = useRef({ rotX: 0, rotY: 0, swipeX: 0, swipeRotZ: 0, sheenX: 50 });
  const setTiltX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const setTiltY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    setTiltX.current = gsap.quickTo(tilt.current, "rotX", { duration: 0.4, ease: "power2.out" });
    setTiltY.current = gsap.quickTo(tilt.current, "rotY", { duration: 0.4, ease: "power2.out" });

    function renderLoop() {
      if (!cartonRef.current) return;
      const s = tilt.current;
      gsap.set(cartonRef.current, {
        x: s.swipeX,
        rotateX: s.rotX,
        rotateY: s.rotY,
        rotateZ: s.swipeRotZ,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      });
    }

    gsap.ticker.add(renderLoop);
    return () => {
      gsap.ticker.remove(renderLoop);
    };
  }, []);

  const goTo = useCallback((next: number) => {
    const len = heroShowcaseItems.length;
    const clamped = ((next % len) + len) % len;
    setIndex(clamped);
  }, []);

  // Pointer/Mouse 3D tilt (for fine pointers on desktop/laptops)
  function onStageMouseMove(e: React.MouseEvent) {
    if (reducedMotion || !isFinePointer || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = mode === "carton" ? 14 : 9;
    setTiltY.current?.(normX * maxTilt);
    setTiltX.current?.(-normY * maxTilt);
    tilt.current.sheenX = Math.max(0, Math.min(100, (normX + 0.5) * 100));
  }

  function onStageMouseLeave() {
    setTiltX.current?.(0);
    setTiltY.current?.(0);
    tilt.current.sheenX = 50;
  }

  // Non-blocking Touch Handlers: strictly allows native vertical page scrolling!
  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = {
      x: t.clientX,
      y: t.clientY,
      isHorizontal: false,
    };
  }

  function onTouchMove(e: React.TouchEvent) {
    const t = e.touches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;

    // Detect if user is swiping horizontally
    if (!touchStart.current.isHorizontal && Math.abs(dx) > 12) {
      if (Math.abs(dx) > Math.abs(dy) * 1.3) {
        touchStart.current.isHorizontal = true;
      }
    }

    // Only apply carousel swipe resistance if gesture is predominantly horizontal
    if (touchStart.current.isHorizontal) {
      tilt.current.swipeX = dx * 0.45;
      tilt.current.swipeRotZ = dx * 0.02;
    }
  }

  function onTouchEnd() {
    const { isHorizontal } = touchStart.current;
    const dx = tilt.current.swipeX / 0.45;

    if (isHorizontal && Math.abs(dx) > 45) {
      goTo(dx < 0 ? index + 1 : index - 1);
    }

    gsap.to(tilt.current, {
      swipeX: 0,
      swipeRotZ: 0,
      duration: 0.4,
      ease: "power3.out",
    });
    touchStart.current.isHorizontal = false;
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  }

  const currentItem = heroShowcaseItems[index];
  const sampledColor = useDominantColor(currentItem?.src ?? "");
  const glowColor = sampledColor ? `rgba(${sampledColor}, 0.35)` : "rgba(245, 71, 28, 0.18)";



  return (
    <div className="flex flex-col items-center gap-3 sm:gap-6">
      {/* Packaging Inspection Mode Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-ink/10 bg-paper-raised p-1 shadow-xs">
        <button
          type="button"
          onClick={() => setMode("carton")}
          aria-pressed={mode === "carton"}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
            mode === "carton" ? "bg-ink text-paper shadow-sm" : "text-ink-soft hover:text-ink",
          )}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          Folded Carton
        </button>

        <button
          type="button"
          onClick={() => setMode("mockup")}
          aria-pressed={mode === "mockup"}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
            mode === "mockup" ? "bg-ink text-paper shadow-sm" : "text-ink-soft hover:text-ink",
          )}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          Digital Mockup
        </button>

        <button
          type="button"
          onClick={() => setMode("dieline")}
          aria-pressed={mode === "dieline"}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
            mode === "dieline" ? "bg-ink text-paper shadow-sm" : "text-ink-soft hover:text-ink",
          )}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="1" strokeDasharray="3 3" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
          </svg>
          CAD Dieline
        </button>
      </div>

      {/* Main Showcase Stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-label="Interactive packaging showcase — swipe horizontally or use buttons to inspect"
        onMouseMove={onStageMouseMove}
        onMouseLeave={onStageMouseLeave}
        onKeyDown={onKeyDown}
        className="relative flex w-full items-center justify-center gap-2 sm:gap-4 outline-none"
      >
        {/* Desktop Prev Button */}
        <button
          type="button"
          aria-label="Previous packaging design"
          onClick={() => goTo(index - 1)}
          className="hidden size-10 flex-none items-center justify-center rounded-full border border-ink/15 text-ink transition-all hover:scale-105 hover:border-ink hover:bg-paper-raised active:scale-95 sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dynamic Ambient Ink Glow Backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-full blur-3xl transition-colors duration-700 opacity-70"
          style={{ background: glowColor }}
        />

        {/* Packaging Canvas / Container — strictly touch-pan-y so page scroll is 100% fluid */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative w-full max-w-[17rem] touch-pan-y select-none sm:max-w-[19.5rem] md:max-w-[21rem]"
          style={{ perspective: 1200 }}
        >
          {/* MODE 1: 3D FOLDED CARTON */}
          {mode === "carton" && (
            <div
              ref={cartonRef}
              className="relative mx-auto flex flex-col items-center justify-center py-2 transition-transform duration-100"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* The 3D Packaging Box Structure */}
              <div
                className="relative w-full overflow-visible rounded-xl shadow-2xl transition-all duration-500"
                style={{
                  aspectRatio: "1 / 1.35",
                  transform: "rotateY(-12deg) rotateX(4deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front Face: SBS Coated Board with Artwork */}
                <div
                  className={cn(
                    "relative h-full w-full overflow-hidden rounded-xl border border-black/10 bg-[#f7f5ee] shadow-inner",
                    spotUvActive && "spot-uv-sheen",
                  )}
                  style={{
                    transform: "translateZ(24px)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src={currentItem.src}
                    alt={currentItem.title}
                    fill
                    sizes="(min-width: 640px) 21rem, 85vw"
                    priority
                    draggable={false}
                    className="h-full w-full object-contain p-2"
                  />

                  {/* Top Tuck-Flap Crease Line */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute top-3 inset-x-0 h-0.5 border-t border-dashed border-ink/25"
                  />

                  {/* Spot-UV Finish Specular Sheen Layer */}
                  {spotUvActive && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent opacity-80 mix-blend-overlay transition-opacity duration-300"
                      style={{
                        transform: `translateX(${(tilt.current.sheenX - 50) * 1.2}%) skewX(-20deg)`,
                      }}
                    />
                  )}

                  {/* Board Stock Texture Overlay */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                {/* Right Side Panel: 3D Depth Flap — a generic packaging
                    side-panel silhouette (fold seam, faint print-line
                    bars, a plain barcode shape with no digits), not a
                    per-product spec. The previous version's dashed box
                    with literal "||| | | ||" text read as an unfinished
                    debug placeholder rather than part of the box. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-0 right-0 h-full w-14 overflow-hidden rounded-r-lg border-y border-r border-black/15 bg-gradient-to-r from-[#ebe7db] to-[#d3cdbc] p-2 shadow-[inset_2px_0_4px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.15)]"
                  style={{
                    transform: "rotateY(90deg) translateZ(6px)",
                    transformOrigin: "right center",
                  }}
                >
                  {/* Fold-seam highlight along the spine edge */}
                  <div className="absolute inset-y-0 left-0 w-px bg-white/40" />

                  <div className="flex h-full flex-col justify-between py-4 opacity-45">
                    <div className="h-1.5 w-full bg-ink/25 rounded-xs" />
                    <div className="h-1.5 w-3/4 bg-ink/25 rounded-xs" />
                    <div className="h-1.5 w-1/2 bg-ink/25 rounded-xs" />

                    {/* Plain barcode silhouette — no digits/number
                        claimed, purely a generic packaging motif. */}
                    <div className="mt-auto flex h-8 w-full items-stretch justify-center gap-[1.5px]">
                      {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1].map((w, i) => (
                        <div key={i} className="bg-ink" style={{ width: w, opacity: 0.55 }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Realistic Contact Shadow on Atelier Desk */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 inset-x-2 h-7 rounded-full bg-ink/20 blur-md transition-all duration-300"
                  style={{
                    transform: "rotateX(75deg) translateZ(-20px)",
                  }}
                />
              </div>
            </div>
          )}

          {/* MODE 2: DIGITAL MOCKUP */}
          {mode === "mockup" && (
            <div
              ref={cartonRef}
              className="relative mx-auto w-full max-w-[16rem] overflow-hidden rounded-[2.3rem] border-[6px] border-[#1d1d1f] bg-black p-1 shadow-2xl sm:max-w-[17.5rem]"
              style={{
                aspectRatio: "9 / 18",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Speaker / Dynamic Island Pill */}
              <div
                aria-hidden
                className="absolute top-3 left-1/2 z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-black flex items-center justify-end px-2"
              >
                <div className="size-2 rounded-full bg-[#111] ring-1 ring-white/10" />
              </div>

              {/* Screen Area with Packaging Artwork */}
              <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-[#f8f7f2] flex items-center justify-center p-3">
                <Image
                  src={currentItem.src}
                  alt={currentItem.title}
                  fill
                  sizes="(min-width: 640px) 18rem, 80vw"
                  priority
                  draggable={false}
                  className="h-full w-full object-contain p-2"
                />

                {/* Glass Specular Reflection */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60"
                />
              </div>
            </div>
          )}

          {/* MODE 3: CAD PREPRESS DIELINE BLUEPRINT */}
          {mode === "dieline" && (
            <div
              ref={cartonRef}
              className="relative mx-auto w-full overflow-hidden rounded-2xl border border-line bg-[#fbfaf6] p-4 shadow-xl"
              style={{ aspectRatio: "1 / 1.3" }}
            >
              <div className="mb-2 flex items-center justify-between border-b border-line/80 pb-2">
                <span className="font-spec text-[10px] font-bold tracking-wider text-accent uppercase">
                  Dieline CAD Proof
                </span>
                <span className="font-spec text-[9px] text-ink-soft uppercase">1:1 Prepress</span>
              </div>

              {/* Architectural CAD Blueprint Overlay */}
              <div className="relative h-[80%] w-full overflow-hidden rounded-lg border border-line/60 bg-[#f7f5ed] p-2">
                <svg viewBox="0 0 300 240" className="h-full w-full select-none" role="img" aria-label="Carton Dieline">
                  <defs>
                    <pattern id="grid-pattern-hero" width="15" height="15" patternUnits="userSpaceOnUse">
                      <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#e7e3d6" strokeWidth="0.75" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern-hero)" />

                  {/* Bleed outline */}
                  <rect x="20" y="20" width="260" height="200" fill="none" stroke="#00a3e0" strokeWidth="1" strokeDasharray="2 3" />

                  {/* Carton Panels */}
                  <rect x="35" y="45" width="55" height="150" fill="#ede9db" stroke="#f5471c" strokeWidth="1.2" />
                  <rect x="90" y="45" width="70" height="150" fill="rgba(245,71,28,0.06)" stroke="#f5471c" strokeWidth="1.2" />
                  <rect x="160" y="45" width="55" height="150" fill="#ede9db" stroke="#f5471c" strokeWidth="1.2" />
                  <rect x="215" y="45" width="60" height="150" fill="#ede9db" stroke="#f5471c" strokeWidth="1.2" />

                  {/* Creases */}
                  <line x1="90" y1="45" x2="90" y2="195" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 2" />
                  <line x1="160" y1="45" x2="160" y2="195" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 2" />
                  <line x1="215" y1="45" x2="215" y2="195" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 2" />

                  {/* Tuck Flaps */}
                  <path d="M 90 45 L 98 25 Q 125 20 152 25 L 160 45 Z" fill="none" stroke="#f5471c" strokeWidth="1.2" />
                  <path d="M 90 195 L 98 215 Q 125 220 152 215 L 160 195 Z" fill="none" stroke="#f5471c" strokeWidth="1.2" />

                  {/* Labels */}
                  <text x="125" y="125" textAnchor="middle" fill="#f5471c" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    FRONT FACE
                  </text>
                  <text x="62" y="125" textAnchor="middle" fill="#86868b" fontSize="8" fontFamily="monospace">
                    SIDE
                  </text>
                  <text x="187" y="125" textAnchor="middle" fill="#86868b" fontSize="8" fontFamily="monospace">
                    SIDE
                  </text>
                  <text x="245" y="125" textAnchor="middle" fill="#86868b" fontSize="8" fontFamily="monospace">
                    BACK
                  </text>
                </svg>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] font-spec text-ink-soft">
                <span className="text-emerald-700 font-medium">✓ Fold Checked</span>
                <span className="text-accent font-semibold">3mm Bleed Protected</span>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Next Button */}
        <button
          type="button"
          aria-label="Next packaging design"
          onClick={() => goTo(index + 1)}
          className="hidden size-10 flex-none items-center justify-center rounded-full border border-ink/15 text-ink transition-all hover:scale-105 hover:border-ink hover:bg-paper-raised active:scale-95 sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Mobile Swipe Buttons & Tactile Indicators */}
      <div className="flex items-center gap-3 sm:hidden">
        <button
          type="button"
          aria-label="Previous packaging design"
          onClick={() => goTo(index - 1)}
          className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink active:bg-paper-raised"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span className="font-spec text-[11px] font-semibold text-ink-soft">
          {index + 1} / {heroShowcaseItems.length}
        </span>

        <button
          type="button"
          aria-label="Next packaging design"
          onClick={() => goTo(index + 1)}
          className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink active:bg-paper-raised"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Packaging Info & Interactive Finishing Inspection Controls */}
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <div>
          {/* A plain paragraph, not a heading — this sits before any <h2>
              in document order (Hero renders first), so an <h3> here
              would skip a level in the page's heading hierarchy
              (WCAG 1.3.1). Styled identically either way. */}
          <p className="font-display text-base font-semibold text-ink sm:text-lg">
            {currentItem.title}
          </p>
          <p className="mt-0.5 font-spec text-xs text-ink-soft">
            {currentItem.client}
            {currentItem.tags?.[0] ? ` · ${currentItem.tags[0]}` : ""}
          </p>
        </div>

        {/* Spot-UV sheen toggle — an illustrative preview effect (see the
            "Spot-UV Preview" label), not a claim that this specific
            product was actually finished with spot-UV varnish. */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSpotUvActive(!spotUvActive)}
            aria-pressed={spotUvActive}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-spec text-[11px] font-semibold transition-all shadow-xs",
              spotUvActive
                ? "border border-amber-300 bg-amber-50 text-amber-900 ring-2 ring-amber-200/60"
                : "border border-ink/15 bg-paper text-ink-soft hover:text-ink",
            )}
            title="Toggle an illustrative spot-UV sheen preview"
          >
            <Icon name="sparkle" width={12} height={12} className="text-amber-500" aria-hidden />
            {spotUvActive ? "Spot-UV Preview: On" : "Spot-UV Preview: Off"}
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-1 pt-0.5" role="group" aria-label="Hero showcase pagination">
          {heroShowcaseItems.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-5 bg-ink" : "w-1.5 bg-ink/20 hover:bg-ink/40",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
