import Image from "next/image";
import type { PortfolioItem } from "@/lib/constants/portfolio";
import { cn } from "@/lib/utils";

export function PortfolioCard({
  item,
  cardRef,
  index,
  onOpen,
  className,
}: {
  item: PortfolioItem;
  cardRef?: (el: HTMLDivElement | null) => void;
  index: number;
  onOpen: (item: PortfolioItem) => void;
  className?: string;
}) {
  const wide = item.cardAspect === "wide";

  return (
    <div
      ref={cardRef}
      data-carousel-card
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View ${item.title}`}
      onClick={(e) => {
        e.preventDefault();
        onOpen(item);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item);
        }
      }}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-[2rem] bg-paper-raised text-left shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className || "w-[82vw] shrink-0 snap-center sm:w-[420px] lg:w-[460px]",
      )}
    >
      <div className={cn("relative w-full overflow-hidden bg-paper/50", wide ? "aspect-4/3" : "aspect-4/5")}>
        <Image
          src={item.src}
          alt={`${item.title} — ${item.tags.join(", ")}`}
          fill
          sizes="(min-width: 1024px) 460px, (min-width: 640px) 420px, 82vw"
          priority={index < 3}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />

        {/* Hover quick preview badge */}
        <div className="absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-paper/95 px-5 py-2.5 text-xs font-semibold text-ink shadow-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            Click to View Full Project
          </span>
        </div>

        {item.isFlagship && (
          <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-bold text-ink shadow-md backdrop-blur">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <p className="font-display text-xl font-semibold text-ink group-hover:text-accent transition-colors">
            {item.title}
          </p>
          <p className="mt-2 text-sm text-ink-faint">{item.tags.join(" · ")}</p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-xs font-semibold text-accent">
          <span>{item.client}</span>
          <span className="inline-flex items-center gap-1 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-ink">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}
