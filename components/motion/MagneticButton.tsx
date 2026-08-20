"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Wraps a single interactive child (button/link) and nudges it toward the
 * cursor within a padded radius — a restrained "magnetic" hover, not a
 * gimmick: max offset is small (12px) and it only engages on fine
 * pointers with motion allowed. */
export function MagneticButton({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = wrapRef.current?.firstElementChild as HTMLElement | null;
    if (!el || reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const setX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const setY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      setX(x * strength);
      setY(y * strength);
    }

    function onLeave() {
      setX(0);
      setY(0);
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion, strength]);

  return (
    <div ref={wrapRef} className="inline-block">
      {children}
    </div>
  );
}
