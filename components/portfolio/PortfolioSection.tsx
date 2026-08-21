"use client";

import { useMemo, useState } from "react";
import { portfolioFilters, portfolioItems, type PortfolioCategory, type PortfolioItem } from "@/lib/constants/portfolio";
import { PortfolioCarousel } from "./PortfolioCarousel";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { cn } from "@/lib/utils";

export function PortfolioSection() {
  const [active, setActive] = useState<"all" | PortfolioCategory>("all");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const filtered = useMemo(
    () => (active === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === active)),
    [active],
  );

  return (
    <section id="work" className="scroll-mt-24 overflow-hidden py-28 sm:scroll-mt-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIndex index="01" label="WORK" meta="PRINT & PACKAGING ARCHIVE" />
      </div>

      <Reveal className="mx-auto mb-14 flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Print. Packaging. Presence.
          </h2>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter portfolio by category">
          {portfolioFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={active === filter.value}
              onClick={() => setActive(filter.value)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === filter.value ? "bg-ink text-paper" : "bg-paper-raised text-ink-soft hover:text-ink",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </Reveal>

      <PortfolioCarousel items={filtered} onOpen={setSelected} />
      <ProjectModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
