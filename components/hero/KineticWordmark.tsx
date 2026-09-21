"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { LOADING_SCREEN_DONE_EVENT } from "@/lib/loadingScreenEvent";

/**
 * Oversized headline that drifts and sharpens into focus as the viewer
 * scrolls past the hero — a smooth, unified motion (no per-letter tilt or
 * squish) so it reads as considered typesetting rather than a hand-cut
 * scrapbook effect. Also plays a one-time CMYK registration-snap entrance
 * on mount (see the ghost-duplicate markup below).
 */
export function KineticWordmark({
  lines,
  accentLine,
  variant = "light",
}: {
  lines: string[];
  accentLine?: number;
  /** "dark" flips the base ink to paper-white and the CMY ghosts from
   * multiply to screen blending (the equivalent trick against a dark
   * backdrop — multiply crushes to black on anything but a light
   * background). Everything else about the registration-snap behavior is
   * identical. */
  variant?: "light" | "dark";
}) {
  const container = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !container.current) return;

      const words = container.current.querySelectorAll<HTMLElement>("[data-word]");
      // Continuous GPU blur compositing on every scroll frame is one of the
      // pricier CSS properties to animate — skip it on smaller viewports
      // (where the flourish is least noticed anyway) and keep only the
      // cheap drift there.
      const allowBlur = window.matchMedia("(min-width: 1024px)").matches;

      gsap.fromTo(
        words,
        { yPercent: 0, filter: "blur(0px)" },
        {
          yPercent: -10,
          filter: allowBlur ? "blur(6px)" : "blur(0px)",
          stagger: { each: 0.02, from: "start" },
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            // "top top": progress is exactly 0 at natural scroll position 0
            // (the heading sits near the very top of the page on load), so
            // it only starts drifting/blurring once the user actually
            // scrolls past it — not partway through at rest.
            start: "top top",
            end: "+=400",
            scrub: 0.8,
          },
        },
      );

      // Simple fade+rise entrance for all screen sizes — no ghost plates.
      // Reads matchMedia synchronously here (not the reducedMotion hook's
      // state) to avoid an SSR-safe `false` default causing a race where
      // the heading is briefly hidden on a reduced-motion machine.
      const realWords = container.current.querySelectorAll<HTMLElement>("[data-word-real]");
      const prefersReducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedNow) {
        gsap.set(realWords, { autoAlpha: 0, y: 14 });
        const simpleEntrance = gsap
          .timeline({ paused: true })
          .to(realWords, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.04 });

        if (window.__loadingScreenDone) {
          simpleEntrance.play();
        } else {
          const onLoadingDone = () => simpleEntrance.play();
          window.addEventListener(LOADING_SCREEN_DONE_EVENT, onLoadingDone, { once: true });
          return () => window.removeEventListener(LOADING_SCREEN_DONE_EVENT, onLoadingDone);
        }
      }
    },
    { scope: container, dependencies: [reducedMotion] },
  );

  return (
    <h1
      ref={container}
      id="hero-wordmark"
      className={cn(
        "font-display text-[clamp(2.75rem,11vw,3.75rem)] font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-[5rem]",
        variant === "dark" ? "text-paper" : "text-ink",
      )}
    >
      {lines.map((line, li) => (
        <span key={li} className={cn("block overflow-hidden py-1", li === accentLine && "text-accent")}>
          {line.split(" ").map((word, wi) => (
            <span key={wi} data-word className="relative inline-block whitespace-nowrap will-change-transform">
              <span data-word-real>{word}</span>
              {wi < line.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
