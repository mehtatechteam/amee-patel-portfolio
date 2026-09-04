"use client";

import { useMemo, useState } from "react";
import { portfolioFilters, portfolioItems, type PortfolioCategory, type PortfolioItem } from "@/lib/constants/portfolio";
import { PortfolioCarousel } from "./PortfolioCarousel";
import { PortfolioGrid } from "./PortfolioGrid";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { RegistrationMark } from "@/components/motifs/RegistrationMark";
import { ImageTrail } from "@/components/motifs/ImageTrail";
import { cn } from "@/lib/utils";

// A handful of real portfolio shots for the header's cursor trail — not
// the full catalog, just enough variety to read as "a preview of the
// archive," picked the same way OrbitImages' selection was (visual
// spread across categories, no ranking implied).
const TRAIL_SLUGS = [
  "organic-amla-powder",
  "medween-pharma-box",
  "lilaura-lavender",
  "kenheal-healthcare-wellness",
  "paracetamol-tablets-blue",
  "shri-hanuman-realty-dholera",
];

export function PortfolioSection() {
  const [active, setActive] = useState<"all" | PortfolioCategory | "pharma">("all");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("carousel");

  const filtered = useMemo(() => {
    if (active === "all") return portfolioItems;
    // "pharma" is a cross-cutting tag filter, not a PortfolioCategory.
    if (active === "pharma") return portfolioItems.filter((item) => item.tags.includes("Pharmaceutical"));
    return portfolioItems.filter((item) => item.category === active);
  }, [active]);

  const trailImages = TRAIL_SLUGS.map((slug) => portfolioItems.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => ({ src: item.src, alt: item.client }));

  return (
    <section id="portfolio" className="relative scroll-mt-28 overflow-hidden py-16 sm:scroll-mt-28 sm:py-20">
      {/* Anchor for backwards compatibility */}
      <div id="work" className="sr-only" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIndex index="04" label="PORTFOLIO" meta="PRINT & PACKAGING ARCHIVE" />
      </div>

      <Reveal>
      <ImageTrail images={trailImages} className="mx-auto mb-8 flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 py-4 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Selected Works
          </h2>
          <p className="mt-3 text-base text-ink-soft">
            Explore packaging boxes, pharmaceutical ranges, brand literature, and identities designed for impact.
          </p>
          {/* ImageTrail only reveals itself on mouse movement — nothing
              on the page otherwise hints it's there, so first-time
              visitors have no reason to try moving the cursor here.
              Fine-pointer only, matching the effect it's advertising. */}
          <p className="mt-2 hidden items-center gap-1.5 font-spec text-[10px] tracking-widest text-ink-soft/70 uppercase lg:inline-flex">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 3l14 8-6 2-2 6-6-16z" />
            </svg>
            Hover to Preview the Archive
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 rounded-full bg-paper-raised p-1" role="tablist" aria-label="Filter portfolio by category">
            {portfolioFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                role="tab"
                aria-selected={active === filter.value}
                onClick={() => setActive(filter.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition-all",
                  active === filter.value
                    ? "bg-ink text-paper shadow-sm"
                    : "text-ink-soft hover:text-ink hover:bg-paper/50",
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle (Carousel vs Grid) */}
          <div className="hidden items-center gap-1 rounded-full border border-line bg-paper p-1 sm:flex">
            <button
              type="button"
              aria-label="Carousel View"
              title="Carousel View"
              onClick={() => setViewMode("carousel")}
              className={cn(
                "rounded-full p-2 text-ink transition-colors",
                viewMode === "carousel" ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M7 5v14M17 5v14" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Grid View"
              title="Grid View"
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-full p-2 text-ink transition-colors",
                viewMode === "grid" ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </ImageTrail>
      </Reveal>

      {/* "Press sheet" framing — extends the hero's proof-sheet language
          (running-head caption + crop marks) to the portfolio itself, so
          the whole archive reads as one uncut sheet of specimens rather
          than a plain card grid. Corner marks sit on the outer edge of
          this wrapper, not per-card — the grid's own items-start layout
          gives cards uneven heights, so per-cell trim lines would need a
          structural rework this doesn't call for. */}
      <div className="relative">
        <RegistrationMark className="absolute top-0 left-5 hidden h-5 w-5 -translate-y-1/2 text-ink/30 lg:block lg:left-8" />
        <RegistrationMark className="absolute top-0 right-5 hidden h-5 w-5 -translate-y-1/2 text-ink/30 lg:block lg:right-8" />
        <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between border-b border-line px-5 pb-2.5 sm:px-8">
          <span className="font-spec text-[10px] tracking-widest text-ink-soft uppercase">Portfolio Sheet</span>
          <span className="font-spec text-[10px] tracking-widest text-ink-soft uppercase">{filtered.length} Specimens</span>
        </div>

        {viewMode === "carousel" ? (
          <PortfolioCarousel items={filtered} onOpen={setSelected} />
        ) : (
          <PortfolioGrid items={filtered} onOpen={setSelected} />
        )}
      </div>

      <ProjectModal
        item={selected}
        items={filtered}
        onClose={() => setSelected(null)}
        onSelect={setSelected}
      />
    </section>
  );
}
