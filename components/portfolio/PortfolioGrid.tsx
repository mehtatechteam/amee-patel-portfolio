import type { PortfolioItem } from "@/lib/constants/portfolio";
import { PortfolioCard } from "./PortfolioCard";

export function PortfolioGrid({
  items,
  onOpen,
}: {
  items: PortfolioItem[];
  onOpen: (item: PortfolioItem) => void;
}) {
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
      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <PortfolioCard
            key={item.slug}
            item={item}
            index={i}
            onOpen={onOpen}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}
