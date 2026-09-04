"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/lib/constants/portfolio";
import { PortfolioCard } from "./PortfolioCard";

const INITIAL_VISIBLE = 9;

export function PortfolioGrid({
  items,
  onOpen,
}: {
  items: PortfolioItem[];
  onOpen: (item: PortfolioItem) => void;
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // Reset the reveal count when the filtered item set changes (switching
  // category filters) — adjusted during render (React's recommended
  // pattern, same one ProjectModal uses for its own zoom-reset) rather
  // than in an effect, to avoid a synchronous setState-in-effect cascade.
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setVisibleCount(INITIAL_VISIBLE);
  }

  const visibleItems = items.slice(0, visibleCount);
  const remaining = items.length - visibleItems.length;

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      {/*
       * items-start (not the grid default `stretch`) is load-bearing:
       * without it, every card in a row is force-stretched to match the
       * row's tallest sibling. Cards with a "wide" (4:3) image sit next to
       * "portrait" (4:5) ones in the same row, so their fixed-aspect image
       * stays shorter while the rest of the stretched card has nowhere to
       * put the extra height except the flexed text body underneath —
       * confirmed via screenshot as a 150-250px dead gap before the footer
       * tag row on exactly the wide-aspect cards (Aqua, PeptidesDepot,
       * Globiomed, TSD World). With items-start, each card's height comes
       * only from its own content.
       */}
      {/* Occasional flagship pieces span 2 columns — a deliberate,
          sparing break from the otherwise uniform grid rhythm (every
          card was reading as the same weight regardless of the work
          behind it). Still respects the items-start fix above; a
          col-span change doesn't reintroduce the height-stretch bug
          since it only affects column width, not cross-axis sizing. */}
      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, i) => {
          const emphasize = item.isFlagship && i % 5 === 2;
          return (
            <PortfolioCard
              key={item.slug}
              item={item}
              index={i}
              onOpen={onOpen}
              className={emphasize ? "w-full sm:col-span-2" : "w-full"}
            />
          );
        })}
      </div>

      {/* All 20 specimens rendering at once was a real, previously-flagged
          issue — the grid ballooned the page to 13,000–18,000px with no
          natural stopping point. Gated behind an explicit "Load More"
          action instead of infinite scroll: simpler, keeps back-to-top/
          footer reachable without extra scroll distance for visitors who
          don't need the full archive. */}
      {remaining > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount(items.length)}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-paper-raised"
          >
            Load More Specimens
            <span className="font-spec text-xs text-ink-soft">+{remaining}</span>
          </button>
        </div>
      )}
    </div>
  );
}
