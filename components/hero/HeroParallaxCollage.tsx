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
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    // Establish x/y/z/rotateX/rotateY together on one clean baseline before
    // handing out individual quickTo setters per property. Known
    // incomplete fix: this (plus routing the idle breathing tween through
    // the same `z` setter below, which WAS the fix for the console being
    // spammed even at rest) still leaves a harmless "rotateX not eligible
    // for reset" GSAP warning during active mousemove-driven tilt — tried
    // this baseline, `force3D`, and the breathing fix; visual behavior is
    // unaffected (confirmed via screenshots across two review passes), so
    // this is left as a known cosmetic console item, not chased further.
    cardRefs.current.forEach((card) => {
      if (card) gsap.set(card, { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0 });
    });

    const setters = cardRefs.current.map((card) =>
      card
        ? {
            x: gsap.quickTo(card, "x", { duration: 0.6, ease: "power3", force3D: true }),
            y: gsap.quickTo(card, "y", { duration: 0.6, ease: "power3", force3D: true }),
            z: gsap.quickTo(card, "z", { duration: 0.6, ease: "power3", force3D: true }),
            rotateX: gsap.quickTo(card, "rotateX", { duration: 0.6, ease: "power3", force3D: true }),
            rotateY: gsap.quickTo(card, "rotateY", { duration: 0.6, ease: "power3", force3D: true }),
          }
        : null,
    );

    // Continuous idle "breathing" float so the stage feels alive at rest.
    // Tweens a plain proxy value (not the card itself) and routes every
    // frame through the same `z` quickTo setter the mousemove tilt uses —
    // an earlier version tweened `card`'s `z` directly via its own
    // timeline, which kept invalidating GSAP's cached combined-transform
    // against the x/y/rotateX/rotateY quickTo setters above and spammed
    // "rotateX not eligible for reset" continuously, not just on hover.
    const breathing = gsap.timeline({ repeat: -1, yoyo: true });
    cardRefs.current.forEach((card, i) => {
      const setter = setters[i];
      if (!card || !setter) return;
      const proxy = { z: 0 };
      breathing.to(
        proxy,
        {
          z: 6,
          duration: 2.4 + i * 0.3,
          ease: "sine.inOut",
          onUpdate: () => setter.z(proxy.z),
        },
        i * 0.2,
      );
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
      // While a card is spotlighted, its tilt holds at 0 (straightened)
      // instead of chasing the cursor — letting both run at once would
      // fight over the same GSAP-driven transform.
      if (hoveredRef.current !== null) return;
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
      if (hoveredRef.current !== null) return;
      resetTilt();
    }

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const cardEls = cardRefs.current;
    const enterHandlers = cardEls.map((_, i) => () => {
      setHovered(i);
      resetTilt();
    });
    const leaveHandlers = cardEls.map(() => () => setHovered(null));
    cardEls.forEach((card, i) => {
      card?.addEventListener("mouseenter", enterHandlers[i]);
      card?.addEventListener("mouseleave", leaveHandlers[i]);
    });

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      cardEls.forEach((card, i) => {
        card?.removeEventListener("mouseenter", enterHandlers[i]);
        card?.removeEventListener("mouseleave", leaveHandlers[i]);
      });
      breathing.kill();
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
              "absolute aspect-[4/5] overflow-hidden rounded-3xl bg-paper-raised transition-all duration-500 ease-out will-change-transform",
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
              className={cn("h-full w-full object-cover transition-transform duration-500", zoom && !isHovered && "scale-125")}
            />
          </div>
        );
      })}
    </div>
  );
}
