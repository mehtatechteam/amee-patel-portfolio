"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePointerType } from "@/hooks/usePointerType";

// Anything the visitor can act on — hovering one of these morphs the
// crosshair into a filled pen-nib to signal "this is targetable".
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, select, textarea, label, summary, .cursor-pointer, [data-cursor-hover]';

/**
 * Custom design-tool cursor — a precision crosshair/registration-mark
 * glyph (see components/motifs/RegistrationMark.tsx for the motif this
 * draws from) that trails the real pointer with a short GSAP `quickTo`
 * lag, the same technique HeroParallaxCollage uses for its tilt effect.
 * Morphs into a filled pen-nib over interactive elements.
 *
 * Gating is intentionally conservative and mirrors useReducedMotion's
 * SSR-safe pattern: nothing renders and the native OS cursor stays
 * visible until a post-mount effect confirms this is a fine-pointer,
 * motion-tolerant device. Only then do we (a) mount the custom cursor
 * and (b) flip on the `custom-cursor-active` class that hides the native
 * cursor (see app/globals.css). Reversing that order would leave a
 * touch/reduced-motion visitor with no visible pointer at all.
 */
export function DesignCursor() {
  const reducedMotion = useReducedMotion();
  const { isFinePointer } = usePointerType();
  const [active, setActive] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const quickSetters = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  // Decide eligibility only after mount — never assume it synchronously.
  useEffect(() => {
    const eligible = isFinePointer && !reducedMotion;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- eligibility is only knowable post-mount (matchMedia); must diverge from the SSR-safe default here, not during a lazy initializer.
    setActive(eligible);
    document.documentElement.classList.toggle("custom-cursor-active", eligible);
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isFinePointer, reducedMotion]);

  useEffect(() => {
    if (!active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resets visibility when eligibility flips off (e.g. reduced-motion toggled mid-session), not a render-driven derivation.
      setVisible(false);
      return;
    }
    const el = cursorRef.current;
    if (!el) return;

    // Center the glyph on the pointer once, then let quickTo animate x/y
    // on top of that offset (GSAP composites xPercent/yPercent with x/y
    // into a single transform, so these don't fight each other).
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    quickSetters.current = {
      x: gsap.quickTo(el, "x", { duration: 0.18, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.18, ease: "power3" }),
    };

    function onMove(e: MouseEvent) {
      quickSetters.current?.x(e.clientX);
      quickSetters.current?.y(e.clientY);
      setVisible(true);
    }

    function onOver(e: MouseEvent) {
      const target = e.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) setHoveringInteractive(true);
    }
    function onOut(e: MouseEvent) {
      const target = e.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) setHoveringInteractive(false);
    }
    function onLeaveWindow() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[200] transition-opacity duration-150"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className={hoveringInteractive ? "text-accent" : "text-ink"}
      >
        {/* Default state: thin crosshair in a circle, registration-mark style */}
        <g
          style={{
            opacity: hoveringInteractive ? 0 : 1,
            transform: hoveringInteractive ? "scale(0.4)" : "scale(1)",
            transformOrigin: "center",
            transformBox: "fill-box",
            transition: "opacity 180ms ease-out, transform 180ms ease-out",
          }}
        >
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" />
          <path d="M12 2v5M12 17v5M2 12h5M17 12h5" stroke="currentColor" strokeWidth="1" />
        </g>
        {/* Hover state: filled pen nib, cueing an interactive target */}
        <g
          style={{
            opacity: hoveringInteractive ? 1 : 0,
            transform: hoveringInteractive ? "scale(1)" : "scale(0.4)",
            transformOrigin: "center",
            transformBox: "fill-box",
            transition: "opacity 180ms ease-out, transform 180ms ease-out",
          }}
        >
          <path d="M4 20l1-4L16 5l3 3L8 19l-4 1Z" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}
