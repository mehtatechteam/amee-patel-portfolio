"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/constants/testimonials";
import { cn } from "@/lib/utils";

/**
 * Same interaction language as PortfolioCarousel (snap-x scroll track,
 * mouse pointer-drag, prev/next buttons, dot indicators) — reused
 * deliberately rather than reinvented, so every carousel on the site
 * behaves identically. Skips PortfolioCarousel's scale/opacity focus
 * effect: these cards vary a lot in height (quote length, footer layout),
 * so a centered "focused card" treatment isn't as clean here — the
 * snap+dots affordance alone carries the same "one card at a time"
 * reading.
 */
export function TestimonialCarousel({ reviews }: { reviews: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const dragDistance = useRef(0);
  const targetIndexRef = useRef(0);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track || reviews.length === 0) return;
    const scrollLeft = track.scrollLeft;

    let nearest = 0;
    let nearestDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const dist = Math.abs(card.offsetLeft - scrollLeft);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    });
    setActiveIndex(nearest);
    targetIndexRef.current = nearest;
  }, [reviews.length]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, reviews.length);
    trackRef.current?.scrollTo({ left: 0 });
    const raf = requestAnimationFrame(updateActive);
    return () => cancelAnimationFrame(raf);
  }, [reviews, updateActive]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [updateActive]);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    const clamped = Math.max(0, Math.min(reviews.length - 1, i));
    const card = cardRefs.current[clamped];
    if (!track || !card) return;
    targetIndexRef.current = clamped;
    setActiveIndex(clamped);
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
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
      {/* Arrow controls live in their own row above the track, not floating
          over the card content — absolutely-centered chevrons previously
          risked clipping into card text at narrower lg+ widths. */}
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Previous review"
          disabled={activeIndex === 0}
          onClick={() => scrollToIndex(targetIndexRef.current - 1)}
          className="flex size-10 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all hover:border-ink hover:bg-paper-raised disabled:opacity-30"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next review"
          disabled={activeIndex === reviews.length - 1}
          onClick={() => scrollToIndex(targetIndexRef.current + 1)}
          className="flex size-10 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all hover:border-ink hover:bg-paper-raised disabled:opacity-30"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        aria-label="Client testimonials carousel"
        aria-roledescription="carousel"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((t, i) => (
          <div
            key={t.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="w-[88vw] shrink-0 snap-start sm:w-[420px]"
          >
            <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_-16px_rgba(29,29,31,0.3)] sm:p-8">
              <div>
                {/* min-height reserves room for the tag row to wrap to two
                    lines on longer project names (e.g. "Dholera Smart City
                    Trifold Brochure") without shifting where the quote
                    starts relative to shorter-tag cards in the same row —
                    previously the quote's top edge varied per card. */}
                <div className="flex min-h-[52px] flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-amber-500" aria-label={`${t.rating} out of 5 stars`}>
                      {[...Array(t.rating)].map((_, idx) => (
                        <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-display text-xs font-bold text-ink">{t.rating}.0</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-spec text-[11px] font-normal tracking-wide text-emerald-700 uppercase">
                      ✓ {t.source}
                    </span>
                    <span className="rounded-full bg-paper-raised px-2.5 py-0.5 font-spec text-[11px] font-normal tracking-wide text-ink-soft uppercase">
                      {t.project}
                    </span>
                  </div>
                </div>

                <blockquote className="mt-5 text-[15px] leading-relaxed text-ink-soft">&ldquo;{t.content}&rdquo;</blockquote>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-line/60 pt-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm ${t.avatarBg}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-ink">{t.name}</p>
                    <p className="text-xs text-ink-soft">
                      {t.role} · <span className="font-semibold text-ink">{t.company}</span>
                    </p>
                  </div>
                </div>
                <span className="font-spec text-[10px] text-ink-soft">{t.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center">
        <div className="flex gap-1.5" role="group" aria-label="Review position">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to review ${i + 1} of ${reviews.length}`}
              aria-current={i === activeIndex}
              onClick={() => scrollToIndex(i)}
              className="group flex items-center justify-center p-2.5"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === activeIndex ? "w-6 bg-ink" : "w-1.5 bg-ink/15 group-hover:bg-ink/35",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
