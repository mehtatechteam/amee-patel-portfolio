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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
