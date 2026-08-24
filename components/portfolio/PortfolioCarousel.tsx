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
  const targetIndexRef = useRef(0);

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
      gsap.set(card, { scale: 1 - norm * 0.05, opacity: 1 - norm * 0.35 });
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

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || e.pointerType !== "mouse") return;
    isDragging.current = true;
    dragDistance.current = 0;
    dragStart.current = { x: e.clientX, scrollLeft: track.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !isDragging.current || !trackRef.current) return;
    const dist = Math.abs(e.clientX - dragStart.current.x);
    dragDistance.current = dist;
    if (dist > 5) {
      trackRef.current.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.x);
    }
  };

  const endDrag = () => {
    isDragging.current = false;
  };

  const onClickCapture = (e: React.MouseEvent) => {
    // Only block click if actual significant drag happened (> 15px)
    if (dragDistance.current > 15) {
      e.stopPropagation();
      e.preventDefault();
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
        aria-label="Portfolio projects carousel"
        aria-roledescription="carousel"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="flex items-start snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingLeft: EDGE_PAD, paddingRight: EDGE_PAD }}
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

      {/* Prev / Next buttons */}
      <button
        type="button"
        aria-label="Previous project"
        disabled={activeIndex === 0}
        onClick={() => scrollToIndex(targetIndexRef.current - 1)}
        className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper/95 text-ink shadow-xl backdrop-blur transition-all hover:scale-110 hover:bg-ink hover:text-paper disabled:opacity-0 sm:flex sm:left-4"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next project"
        disabled={activeIndex === items.length - 1}
        onClick={() => scrollToIndex(targetIndexRef.current + 1)}
        className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper/95 text-ink shadow-xl backdrop-blur transition-all hover:scale-110 hover:bg-ink hover:text-paper disabled:opacity-0 sm:flex sm:right-4"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="mt-8 flex items-center justify-center px-5 sm:px-8">
        <div className="flex gap-1.5" role="group" aria-label="Carousel position">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to project ${i + 1} of ${items.length}`}
              aria-current={i === activeIndex}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === activeIndex ? "w-8 bg-ink" : "w-2 bg-ink/15 hover:bg-ink/35",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
