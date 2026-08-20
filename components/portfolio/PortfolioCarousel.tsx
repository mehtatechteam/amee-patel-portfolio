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

  // Deliberately NOT based on each card's pixel distance from the
  // viewport's geometric center. That metric can never agree with a
  // flush-left resting layout: card 0 sits near the left edge at
  // scrollLeft 0 (there's nothing to its left to scroll away), so a pure
  // center-distance measurement crowns a *different* card "closest" on
  // first load — confirmed live, not just in theory. Scroll-progress
  // fraction is correct by construction at both ends (progress 0 → index
  // 0 exactly, progress 1 → last index exactly) regardless of edge padding.
  const updateScales = useCallback(() => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    const scrollableWidth = track.scrollWidth - track.clientWidth;
    const progress = scrollableWidth > 0 ? track.scrollLeft / scrollableWidth : 0;
    const continuousIndex = progress * (items.length - 1);

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const norm = Math.min(Math.abs(i - continuousIndex) / 1.6, 1);
      gsap.set(card, { scale: 1 - norm * 0.09, opacity: 1 - norm * 0.55, filter: `blur(${norm * 0.8}px)` });
    });

    setActiveIndex(Math.round(continuousIndex));
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

  const scrollToIndex = (i: number) => {
    const card = cardRefs.current[Math.max(0, Math.min(items.length - 1, i))];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
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
    if (e.key === "ArrowRight") scrollToIndex(activeIndex + 1);
    if (e.key === "ArrowLeft") scrollToIndex(activeIndex - 1);
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
            onClick={() => scrollToIndex(activeIndex - 1)}
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
            onClick={() => scrollToIndex(activeIndex + 1)}
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
