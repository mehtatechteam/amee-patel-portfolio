"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { PortfolioItem } from "@/lib/constants/portfolio";

type CollageEntry = { item: PortfolioItem; rotate: string; cls: string; depth: number };

export function HeroParallaxCollage({ collage }: { collage: CollageEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const setters = cardRefs.current.map((card) =>
      card
        ? {
            x: gsap.quickTo(card, "x", { duration: 0.6, ease: "power3" }),
            y: gsap.quickTo(card, "y", { duration: 0.6, ease: "power3" }),
            rotateX: gsap.quickTo(card, "rotateX", { duration: 0.6, ease: "power3" }),
            rotateY: gsap.quickTo(card, "rotateY", { duration: 0.6, ease: "power3" }),
          }
        : null,
    );

    // Continuous idle "breathing" float so the stage feels alive at rest,
    // layered on a different transform property (y offset via a wrapper
    // translate handled by GSAP's own timeline) so it never fights the
    // mousemove-driven quickTo tweens above.
    const breathing = gsap.timeline({ repeat: -1, yoyo: true });
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      breathing.to(
        card,
        { z: 6, duration: 2.4 + i * 0.3, ease: "sine.inOut" },
        i * 0.2,
      );
    });

    function onMove(e: MouseEvent) {
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
      setters.forEach((setter) => {
        if (!setter) return;
        setter.x(0);
        setter.y(0);
        setter.rotateX(0);
        setter.rotateY(0);
      });
    }

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      breathing.kill();
    };
  }, [collage, reducedMotion]);

  return (
    <div ref={containerRef} className="relative hidden aspect-square lg:block" style={{ perspective: "1200px" }}>
      {collage.map(({ item, rotate, cls }, i) => (
        <div
          key={item.slug}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`absolute aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] ${rotate} ${cls} will-change-transform`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={item.src}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 30vw, 50vw"
            priority
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
