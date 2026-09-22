"use client";

import Image from "next/image";
import type { PortfolioItem } from "@/lib/constants/portfolio";
import { CMYKSwatch } from "@/components/motifs/CMYKSwatch";
import { useDominantColor } from "@/hooks/useDominantColor";
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
  // Ambient glow behind the card — a real average color sampled from this
  // exact photo (not an invented "packaging X = color Y" mapping), so it
  // reflects whatever's actually in the shot rather than a guess.
  const glow = useDominantColor(item.src);

  return (
    <div
      ref={cardRef}
      style={glow ? ({ "--glow": `rgba(${glow}, 0.4)` } as React.CSSProperties) : undefined}
      data-carousel-card
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`Inspect Specimen: ${item.title}`}
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
        "group relative flex cursor-pointer flex-col overflow-hidden text-left transition-all duration-300 hover:-translate-y-1",
        className || "w-[85vw] shrink-0 snap-center sm:w-[440px] lg:w-[520px] xl:w-[580px]",
      )}
    >
      <div className={cn("spot-uv-light relative w-full overflow-hidden bg-paper-raised/50", wide ? "aspect-4/3" : "aspect-4/5")}>
        <Image
          src={item.src}
          alt={`${item.title} — ${item.tags.join(", ")}`}
          fill
          sizes="(min-width: 1280px) 580px, (min-width: 1024px) 520px, (min-width: 640px) 440px, 85vw"
          priority={index < 3}
          className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:p-6"
        />

        {/* Hover quick preview badge */}
        <div className="absolute inset-0 flex items-center justify-center bg-ink/25 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-paper/95 px-5 py-2.5 text-xs font-semibold text-ink shadow-lg">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            {item.category === "packaging" ? "Inspect 3D Specimen" : "Inspect Specimen"}
          </span>
        </div>

        {item.isFlagship && (
          <div className="absolute top-4 left-4">
            <span className="spot-uv-light rounded-full bg-paper/95 px-3 py-1 font-spec text-[10px] font-bold text-ink shadow-sm backdrop-blur">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <p className="font-display text-xl font-semibold text-ink group-hover:text-accent transition-colors">
            {item.title}
          </p>
          <p className="mt-2 text-sm text-ink-soft">{item.tags.join(" · ")}</p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-xs font-semibold text-ink">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item.client}
            {/* Concept pieces are self-directed, with no real client brief
                behind them — this stays visible on the grid card itself,
                not just inside the detail modal, so nothing here reads as
                real client work it isn't. */}
            {item.isConcept && (
              <span className="rounded-full bg-ink/8 px-2 py-0.5 font-spec text-[9px] font-semibold tracking-wide text-ink-soft uppercase">
                Concept
              </span>
            )}
            {/* Reinforces "built from real ink separations" on hover —
                the same CMYK motif used sitewide, not a fabricated
                per-image color read. */}
            <CMYKSwatch className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
          <span className="inline-flex items-center gap-1 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-ink">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}
