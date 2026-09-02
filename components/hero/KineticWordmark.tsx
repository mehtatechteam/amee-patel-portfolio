"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePointerType } from "@/hooks/usePointerType";
import { cn } from "@/lib/utils";
import { LOADING_SCREEN_DONE_EVENT } from "@/lib/loadingScreenEvent";

/**
 * Oversized headline that drifts and sharpens into focus as the viewer
 * scrolls past the hero — a smooth, unified motion (no per-letter tilt or
 * squish) so it reads as considered typesetting rather than a hand-cut
 * scrapbook effect. Also plays a one-time CMYK registration-snap entrance
 * on mount (see the ghost-duplicate markup below), and — once that
 * entrance has settled — lets the cursor re-open the same CMY plates:
 * move away from a word and its cyan/magenta/yellow ghosts drift back out
 * of register; come close and they snap back to perfect (invisible)
 * registration, leaving crisp ink-black. See the second effect below.
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
   * background). Everything else about the registration-snap/cursor-fringe
   * behavior is identical. */
  variant?: "light" | "dark";
}) {
  const container = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const { isFinePointer } = usePointerType();
  // Flipped true once the load-in entrance timeline (below) actually
  // finishes. The cursor-reveal effect must not touch ghost x/y/autoAlpha
  // before that — both would be GSAP-tweening the same properties on the
  // same elements at once and visibly fight each other.
  const entranceSettledRef = useRef(false);

  useGSAP(
    () => {
      if (reducedMotion || !container.current) return;

      const words = container.current.querySelectorAll<HTMLElement>("[data-word]");
      // Continuous GPU blur compositing on every scroll frame is one of the
      // pricier CSS properties to animate — skip it on smaller viewports
      // (where the flourish is least noticed anyway) and keep only the
      // cheap drift there.
      const allowBlur = window.matchMedia("(min-width: 1024px)").matches;
      // The CMYK registration-snap entrance (three stacked colored ghost
      // duplicates fanning out then converging) is a lg+/fine-pointer
      // flourish. On narrow viewports it was measured to paint a genuinely
      // broken first frame: before this effect's own gsap.set() has run,
      // the ghosts sit at their unstyled default (x/y 0, fully opaque,
      // mix-blend-multiply) directly on top of the real word — three
      // overlapping colored duplicates for however long JS takes to catch
      // up, which reads as garbled/illegible text on slower mobile CPUs
      // for a second or more. Ghosts now default to `opacity-0` in the
      // JSX (a CSS class, present before any JS runs) specifically to
      // prevent that; this flag additionally skips ever touching ghosts
      // on narrow viewports at all and instead just fades the real
      // heading in — "render the settled state first" rather than
      // animate raw stacked layers into it.
      const allowGhostEntrance = window.matchMedia("(min-width: 1024px)").matches;

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
      // word start offset like misaligned print plates, hold for a beat,
      // then snap into perfect register before crossfading into the real
      // ink-black text underneath — a literal print-production metaphor.
      // Synced to LOADING_SCREEN_DONE_EVENT (dispatched from
      // LoadingScreen.tsx once its overlay is actually gone, not when it
      // starts clearing) rather than a fixed delay — a hardcoded guess
      // drifts out of sync with real preload time, and firing on "starts
      // clearing" rather than "actually gone" let this play out mostly
      // hidden behind the overlay's own ~1.15s Flip+fade sequence.
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

      if (ghosts.length && !prefersReducedNow && allowGhostEntrance) {
        // Offsets large enough to unmistakably read as separate colored
        // plates (not a blur/jank) — an earlier 2-4px version was too
        // subtle to register as "misaligned print plates" at all.
        const offsets: [number, number][] = [
          [-11, 8],
          [11, -8],
          [-6, -11],
        ];
        // Ghosts default to `opacity-0` in the JSX (see the pre-JS FOUC
        // note above) — explicitly bring them to opacity 1 here as part
        // of laying out their starting offset, since autoAlpha further
        // down needs to animate *from* actually-visible.
        gsap.set(ghosts, {
          x: (i) => offsets[i % 3][0],
          y: (i) => offsets[i % 3][1],
          opacity: 1,
        });
        gsap.set(realWords, { autoAlpha: 0 });

        const entrance = gsap
          .timeline({ paused: true })
          // Hold the misaligned state for a beat before snapping — an
          // earlier version went straight into the snap, which resolved
          // before a viewer's eye had actually landed on the hero (review
          // confirmed the "before" state was never actually witnessed).
          .to({}, { duration: 0.55 })
          .to(ghosts, { x: 0, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.03 })
          .to(ghosts, { autoAlpha: 0, duration: 0.3, ease: "power1.out" }, "-=0.1")
          .to(realWords, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, "<")
          // Hand off to the cursor-reveal effect only once this timeline
          // has actually finished writing to ghosts/realWords.
          .call(() => {
            entranceSettledRef.current = true;
          });

        if (window.__loadingScreenDone) {
          entrance.play();
        } else {
          const onLoadingDone = () => entrance.play();
          window.addEventListener(LOADING_SCREEN_DONE_EVENT, onLoadingDone, { once: true });
          return () => window.removeEventListener(LOADING_SCREEN_DONE_EVENT, onLoadingDone);
        }
      } else if (!prefersReducedNow) {
        // Below lg (and anywhere reduced motion isn't forced): skip the
        // ghost stack entirely — it never even gets an offset, so there's
        // nothing to flash. Real words get a plain, cheap fade+rise
        // instead, still timed off the loading screen so it doesn't play
        // underneath the overlay.
        gsap.set(realWords, { autoAlpha: 0, y: 14 });
        const simpleEntrance = gsap
          .timeline({ paused: true })
          .to(realWords, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.04 })
          .call(() => {
            entranceSettledRef.current = true;
          });

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

  // Cursor-driven registration reveal: once the load-in snap has settled,
  // each word's CMY ghosts continuously track how close the cursor is to
  // *that word* (not the wordmark as a whole) and fringe briefly as the
  // cursor passes near — a decorative accent, never the resting state.
  //
  // Fixed a real legibility bug here: the distance→fringe curve used to be
  // a one-sided ramp (t -> 1, maximum fringe, for ANY distance beyond
  // `FAR`), so a cursor resting anywhere else on the page — which is the
  // common case, since the heading sits at the top and most dwell time is
  // spent scrolled past it or reading elsewhere — pinned every word at
  // maximum smear indefinitely. Confirmed via screenshot: cold reload,
  // cursor never touching the heading, both lines rendered fringed. Now a
  // bounded triangle: registered (t=0) both very close AND far away, with
  // fringe only in the middle "approaching" band, so the only way to see
  // color is to sweep the cursor near a word — the default/idle/far state
  // is always crisp ink-black, matching the entrance's resting state and
  // the component's own doc comment.
  //
  // Runs as its own effect (not folded into the useGSAP callback above)
  // so it can gate independently on isFinePointer, and so its rAF loop
  // cleans up on every dependency change without disturbing the entrance
  // timeline. Position is sampled into a ref by the mousemove listener and
  // read once per animation frame — decoupled from mousemove's event
  // rate, the same rAF-loop shape InkTrailCanvas already uses.
  useEffect(() => {
    if (reducedMotion || !isFinePointer) return;
    // Mirrors the entrance's own lg+ gate above: below that width the
    // ghosts were never given a starting offset (they stay permanently
    // `opacity-0` from the JSX default), so there is nothing here to
    // reveal — skip attaching the listener/rAF loop entirely rather than
    // spend a frame budget animating elements that can't be seen.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const root = container.current;
    if (!root) return;
    const words = Array.from(root.querySelectorAll<HTMLElement>("[data-word]"));
    if (!words.length) return;

    const allGhosts: HTMLElement[] = [];
    const perWord = words.map((word) => {
      const ghosts = Array.from(word.querySelectorAll<HTMLElement>("[data-ghost]"));
      allGhosts.push(...ghosts);
      return ghosts.map((ghost) => ({
        x: gsap.quickTo(ghost, "x", { duration: 0.45, ease: "power2.out" }),
        y: gsap.quickTo(ghost, "y", { duration: 0.45, ease: "power2.out" }),
        alpha: gsap.quickTo(ghost, "opacity", { duration: 0.35, ease: "power2.out" }),
      }));
    });
    // The entrance above finishes by tweening ghosts to `autoAlpha: 0`,
    // which — unlike plain `opacity` — also sets `visibility: hidden` as
    // its very last step. quickTo can't cleanly reset that compound
    // property afterwards (confirmed via screenshot: it spammed GSAP's
    // "autoAlpha not eligible for reset" warning every animation frame,
    // and the ghosts stayed invisible regardless of opacity because
    // visibility was never restored) — so once the entrance actually
    // settles, this effect force-restores visibility exactly once and
    // drives plain `opacity` from then on. Ghosts are `aria-hidden` and
    // never interactive, so dropping the visibility-toggle half of
    // autoAlpha costs nothing. Guarded by a ref (not state) since it
    // must happen inside the rAF loop below, the instant
    // entranceSettledRef flips, without re-rendering.
    const visibilityRestoredRef = { current: false };

    // Same offset directions as the load-in entrance (scaled by proximity
    // here instead of played once) so the two moments read as the same
    // print-registration language rather than two different effects.
    const OFFSETS: [number, number][] = [
      [-11, 8],
      [11, -8],
      [-6, -11],
    ];
    const NEAR = 60; // px — fully registered (ghosts invisible) inside this radius
    const PEAK = 160; // px — point of maximum fringe
    const FAR = 280; // px — registered again at/beyond this radius (bounded, not unbounded)
    // Margin added around the whole heading's own box for the containment
    // gate below — generous enough that the fringe can start building
    // just before the cursor reaches a word, not only once it's already
    // on top of it.
    const CONTAINMENT_MARGIN = 140;
    const pointer = { x: 0, y: 0, active: false };
    let raf = 0;

    function onMove(e: MouseEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    }
    function onDocLeave() {
      pointer.active = false;
    }

    function tick() {
      if (entranceSettledRef.current) {
        if (!visibilityRestoredRef.current) {
          gsap.set(allGhosts, { visibility: "visible" });
          visibilityRestoredRef.current = true;
        }
        // Containment gate: the whole heading's own box (padded) decides
        // whether the effect is live at all this frame. Bounding the
        // per-word falloff alone (NEAR/PEAK/FAR below) wasn't sufficient
        // on its own — confirmed via screenshot that a cursor resting well
        // away from the heading (bottom-left of a 1440px viewport) still
        // fell inside the per-word FAR radius simply because this
        // headline renders at near-full-viewport width/height, so "far
        // from this one word" was still well within reach of its
        // neighbors. Checking containment against the heading's own
        // rect — not a fixed pixel radius — scales correctly with however
        // large the type happens to render.
        let within = false;
        if (pointer.active && root) {
          const box = root.getBoundingClientRect();
          within =
            pointer.x >= box.left - CONTAINMENT_MARGIN &&
            pointer.x <= box.right + CONTAINMENT_MARGIN &&
            pointer.y >= box.top - CONTAINMENT_MARGIN &&
            pointer.y <= box.bottom + CONTAINMENT_MARGIN;
        }
        words.forEach((word, wi) => {
          // Registered (t=0) inside NEAR and beyond FAR; fringe ramps up
          // to full strength at PEAK and back down either side — a
          // bounded hump, not a one-sided ramp that maxes out and stays
          // there for any cursor position far from the word.
          let t = 0;
          if (within) {
            const rect = word.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(pointer.x - cx, pointer.y - cy);
            if (dist > NEAR && dist < FAR) {
              t = dist <= PEAK ? (dist - NEAR) / (PEAK - NEAR) : 1 - (dist - PEAK) / (FAR - PEAK);
              t = gsap.utils.clamp(0, 1, t);
            }
          }
          perWord[wi].forEach((setter, gi) => {
            setter.x(OFFSETS[gi][0] * t);
            setter.y(OFFSETS[gi][1] * t);
            // Capped below the entrance's own ghost opacity so even peak
            // fringe reads as a subtle accent, never as smeared text.
            setter.alpha(t * 0.4);
          });
        });
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    // `mouseleave` doesn't bubble, so binding it on `document` fires
    // specifically when the cursor exits the viewport — the standard
    // "pointer left the page" trick.
    document.addEventListener("mouseleave", onDocLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onDocLeave);
    };
  }, [reducedMotion, isFinePointer]);

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
              {!reducedMotion && (
                <>
                  {/* opacity-0 by default (a CSS class, present in the very
                      first paint before any JS runs) so the three colored
                      duplicates never sit fully-opaque on top of the real
                      word during the gap before this component's effects
                      execute — that gap was the actual cause of the
                      "garbled overlapping text" bug on slower mobile
                      loads. The desktop entrance explicitly brings them to
                      opacity 1 itself once it's ready to animate them.
                      Blend mode flips multiply->screen in dark variant:
                      multiply crushes to black against anything but a
                      light backdrop, screen is the equivalent trick for a
                      dark one (tints lighten instead of darken). */}
                  <span
                    aria-hidden
                    data-ghost
                    className={cn("absolute inset-0 text-cyan opacity-0", variant === "dark" ? "[mix-blend-mode:screen]" : "[mix-blend-mode:multiply]")}
                  >
                    {word}
                  </span>
                  <span
                    aria-hidden
                    data-ghost
                    className={cn("absolute inset-0 text-magenta opacity-0", variant === "dark" ? "[mix-blend-mode:screen]" : "[mix-blend-mode:multiply]")}
                  >
                    {word}
                  </span>
                  <span
                    aria-hidden
                    data-ghost
                    className={cn("absolute inset-0 text-yellow opacity-0", variant === "dark" ? "[mix-blend-mode:screen]" : "[mix-blend-mode:multiply]")}
                  >
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
