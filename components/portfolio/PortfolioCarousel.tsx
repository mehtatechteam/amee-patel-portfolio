"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PortfolioItem } from "@/lib/constants/portfolio";
import { PortfolioCard } from "./PortfolioCard";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const EDGE_PAD = "max(1.25rem, calc((100vw - 80rem) / 2 + 1.25rem))";

export function PortfolioCarousel({
  items,
  onOpen,
}: {
  items: PortfolioItem[];
  onOpen: (item: PortfolioItem) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const dragDistance = useRef(0);
  // Tracks the button-driven target index independently of `activeIndex`
  // state. `activeIndex` only updates from the track's scroll event, which
  // lags behind an in-flight smooth scroll — so a second Next/Prev click
  // fired before that event catches up (a plausible fast trackpad
  // double-click) would read stale state and recompute the *same* target.
  // Confirmed live: two quick Next clicks left scrollLeft unchanged after
  // the second. This ref always holds the true last-requested index.
  const targetIndexRef = useRef(0);

  // Distance-to-clamped-center, using the exact same offset formula
  // `scrollToIndex()` targets below — NOT a scroll-progress fraction
  // across the full track width. A progress fraction (scrollLeft /
  // maxScroll * (count-1)) disagrees with the button's own per-card
  // target for every card except the very first/last: at rest (scrollLeft
  // 0) a plain nearest-center distance also breaks, because card 0's raw
  // centering offset is negative (nothing to its left to scroll to) so
  // the browser clamps the actual scroll to 0 while the raw math still
  // says index 1 is "closer." Clamping each card's target to
  // [0, maxScroll] before comparing — mirroring what the browser does to
  // scrollToIndex's own scrollTo() call — fixes both ends AND keeps this
  // metric in permanent agreement with `targetIndexRef`, which previously
  // caused a real bug: this function used to resync `targetIndexRef` from
  // an incompatible formula, silently overwriting a just-clicked target
  // back to the wrong index and making every second Next/Prev click a
  // no-op (confirmed live).
  const updateScales = useCallback(() => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const scrollLeft = track.scrollLeft;

    const centers = cardRefs.current.map((card) => {
      if (!card) return null;
      const raw = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
      return Math.max(0, Math.min(maxScroll, raw));
    });

    const validCenters = centers.filter((c): c is number => c !== null);
    const spacing =
      validCenters.length > 1
        ? (validCenters[validCenters.length - 1] - validCenters[0]) / (validCenters.length - 1)
        : 400;

    let nearest = 0;
    let nearestDist = Infinity;
    centers.forEach((center, i) => {
      if (center === null) return;
      const dist = Math.abs(scrollLeft - center);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    });

    centers.forEach((center, i) => {
      const card = cardRefs.current[i];
      if (!card || center === null) return;
      const norm = Math.min(Math.abs(scrollLeft - center) / (spacing * 1.6), 1);
      gsap.set(card, { scale: 1 - norm * 0.09, opacity: 1 - norm * 0.55, filter: `blur(${norm * 0.8}px)` });
    });

    setActiveIndex(nearest);
    targetIndexRef.current = nearest;
  }, [items.length]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, items.length);
    trackRef.current?.scrollTo({ left: 0 });
    const raf = requestAnimationFrame(updateScales);
    return () => cancelAnimationFrame(raf);
  }, [items, updateScales]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateScales();
        ticking = false;
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateScales]);

  // Direct `track.scrollTo()` against a computed offset — not
  // `card.scrollIntoView()`. `scrollIntoView` computes its target against
  // live layout at call time, so rapid repeat calls before the browser's
  // smooth-scroll finishes settling can be dropped or resolve to the same
  // position. Computing the offset once from `offsetLeft` and driving the
  // track directly is deterministic regardless of any scroll already in
  // flight, and updating `targetIndexRef`/`activeIndex` synchronously (not
  // waiting for the scroll event) lets a second rapid click stack on top
  // of the first instead of reading stale state.
  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    const card = cardRefs.current[clamped];
    if (!track || !card) return;

    targetIndexRef.current = clamped;
    setActiveIndex(clamped);

    const target = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left: target, behavior: "smooth" });
  };

  // Click-and-drag scrolling for mouse/trackpad users only — touch already
  // gets smooth native scroll-snap for free, and writing scrollLeft by
  // hand on every pointermove fights the browser's own touch-scroll
  // momentum, causing stutter.
  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || e.pointerType !== "mouse") return;
    isDragging.current = true;
    dragDistance.current = 0;
    track.setPointerCapture(e.pointerId);
    dragStart.current = { x: e.clientX, scrollLeft: track.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !isDragging.current || !trackRef.current) return;
    dragDistance.current = Math.abs(e.clientX - dragStart.current.x);
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.x);
  };
  const endDrag = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    isDragging.current = false;
    trackRef.current?.releasePointerCapture(e.pointerId);
  };
  // A click firing right after a drag-release would otherwise open the
  // modal the user was just trying to scroll past — swallow it once.
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragDistance.current > 5) {
      e.stopPropagation();
      dragDistance.current = 0;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") scrollToIndex(targetIndexRef.current + 1);
    if (e.key === "ArrowLeft") scrollToIndex(targetIndexRef.current - 1);
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        tabIndex={0}
        aria-label="Portfolio projects, scrollable"
        aria-roledescription="carousel"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="flex items-start snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        style={{ paddingLeft: EDGE_PAD, paddingRight: EDGE_PAD, cursor: "grab" }}
      >
        {items.map((item, i) => (
          <PortfolioCard
            key={item.slug}
            item={item}
            index={i}
            onOpen={onOpen}
            cardRef={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between px-5 sm:px-8">
        <div className="flex gap-1.5" role="group" aria-label="Carousel position">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to project ${i + 1} of ${items.length}`}
              aria-current={i === activeIndex}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex ? "w-7 bg-ink" : "w-1.5 bg-ink/15 hover:bg-ink/30",
              )}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous project"
            disabled={activeIndex === 0}
            onClick={() => scrollToIndex(targetIndexRef.current - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-raised text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-paper-raised disabled:hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next project"
            disabled={activeIndex === items.length - 1}
            onClick={() => scrollToIndex(targetIndexRef.current + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-raised text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-paper-raised disabled:hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
