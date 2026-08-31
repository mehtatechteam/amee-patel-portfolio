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
}: {
  lines: string[];
  accentLine?: number;
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

      // Registration-snap entrance: three CMYK ghost duplicates of each
      // word start offset like misaligned print plates and snap into
      // perfect register once, before crossfading into the real ink-black
      // text underneath — a literal print-production metaphor. Synced to
      // LOADING_SCREEN_DONE_EVENT (dispatched from LoadingScreen.tsx the
      // moment its overlay actually starts clearing) rather than a fixed
      // delay — a hardcoded guess drifts out of sync with real preload
      // time, which measurably let this play out fully hidden behind the
      // overlay on slower connections.
      //
      // Also: reads matchMedia synchronously here (not the reducedMotion
      // hook's state) specifically to hide realWords — the hook's SSR-safe
      // default is `false` for one render even on a reduced-motion machine,
      // and depending on that state to gate a "hide the real heading" set
      // risks a real machine briefly showing a blank heading before the
      // state/cleanup catches up. A direct synchronous check has no such
      // race; it's safe here because this whole callback only ever runs
      // client-side (never during SSR), so it can't cause a hydration
      // mismatch the way reading it in render/lazy state would.
      const ghosts = container.current.querySelectorAll<HTMLElement>("[data-ghost]");
      const realWords = container.current.querySelectorAll<HTMLElement>("[data-word-real]");
      const prefersReducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (ghosts.length && !prefersReducedNow) {
        const offsets: [number, number][] = [
          [-4, 3],
          [4, -3],
          [-2, -4],
        ];
        gsap.set(ghosts, {
          x: (i) => offsets[i % 3][0],
          y: (i) => offsets[i % 3][1],
        });
        gsap.set(realWords, { autoAlpha: 0 });

        const entrance = gsap
          .timeline({ paused: true })
          .to(ghosts, { x: 0, y: 0, duration: 0.45, ease: "power3.out", stagger: 0.02 })
          .to(ghosts, { autoAlpha: 0, duration: 0.25, ease: "power1.out" }, "-=0.1")
          .to(realWords, { autoAlpha: 1, duration: 0.25, ease: "power1.out" }, "<");

        if (window.__loadingScreenDone) {
          entrance.play();
        } else {
          const onLoadingDone = () => entrance.play();
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
      className="font-display text-[clamp(2.75rem,11vw,3.75rem)] font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-[5rem]"
    >
      {lines.map((line, li) => (
        <span key={li} className={cn("block overflow-hidden py-1", li === accentLine && "text-accent")}>
          {line.split(" ").map((word, wi) => (
            <span key={wi} data-word className="relative inline-block whitespace-nowrap will-change-transform">
              {!reducedMotion && (
                <>
                  <span aria-hidden data-ghost className="absolute inset-0 text-cyan [mix-blend-mode:multiply]">
                    {word}
                  </span>
                  <span aria-hidden data-ghost className="absolute inset-0 text-magenta [mix-blend-mode:multiply]">
                    {word}
                  </span>
                  <span aria-hidden data-ghost className="absolute inset-0 text-yellow [mix-blend-mode:multiply]">
                    {word}
                  </span>
                </>
              )}
              <span data-word-real>{word}</span>
              {wi < line.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
