"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Wraps children in a zone where moving the mouse spawns real thumbnails
 * trailing the cursor, fading/scaling out behind it. Mouse-pointer only —
 * deliberately ignores touch pointer events entirely (never sets
 * touch-action on the container) so this can't trap page scroll on
 * mobile, the exact bug this project hit once before with a
 * touch-none drag zone (see HeroPhoneShowcase's touch-pan-y fix).
 */
export function ImageTrail({
  images,
  className,
  children,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnRef = useRef(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const indexRef = useRef(0);

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const container = containerRef.current;
    if (!container || images.length === 0) return;

    const now = performance.now();
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (lastPosRef.current) {
      const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);
      if (dist < 70 || now - lastSpawnRef.current < 100) return;
    }
    lastPosRef.current = { x, y };
    lastSpawnRef.current = now;

    const item = images[indexRef.current % images.length];
    indexRef.current += 1;

    const node = document.createElement("div");
    Object.assign(node.style, {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      width: "76px",
      height: "76px",
      marginLeft: "-38px",
      marginTop: "-38px",
      borderRadius: "0.75rem",
      overflow: "hidden",
      pointerEvents: "none",
      boxShadow: "0 14px 28px -10px rgba(29,29,31,0.35)",
      zIndex: "5",
    });

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    Object.assign(img.style, { width: "100%", height: "100%", objectFit: "cover" });
    node.appendChild(img);
    container.appendChild(node);

    const rotate = (Math.random() - 0.5) * 18;
    gsap.fromTo(node, { opacity: 0, scale: 0.55, rotate }, { opacity: 1, scale: 1, duration: 0.22, ease: "power2.out" });
    gsap.to(node, {
      opacity: 0,
      scale: 0.8,
      duration: 0.55,
      delay: 0.3,
      ease: "power1.in",
      onComplete: () => node.remove(),
    });
  }

  return (
    <div ref={containerRef} onPointerMove={onPointerMove} className={cn("relative", className)}>
      {children}
    </div>
  );
}
