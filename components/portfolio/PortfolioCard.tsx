import Image from "next/image";
import type { PortfolioItem } from "@/lib/constants/portfolio";
import { cn } from "@/lib/utils";

export function PortfolioCard({
  item,
  cardRef,
  index,
  onOpen,
}: {
  item: PortfolioItem;
  cardRef: (el: HTMLDivElement | null) => void;
  index: number;
  onOpen: (item: PortfolioItem) => void;
}) {
  const wide = item.cardAspect === "wide";

  return (
    <div
      ref={cardRef}
      data-carousel-card
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={() => onOpen(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item);
        }
      }}
      className="group relative flex w-[78vw] shrink-0 cursor-pointer snap-center flex-col overflow-hidden rounded-[2rem] bg-paper-raised text-left sm:w-[420px] lg:w-[480px]"
    >
      {/*
        Caption lives on a solid panel below the image, not scrimmed over
        it — the source photos are a mix of dark and light backgrounds (raw
        client mockup exports), so a gradient overlay produced an
        inconsistent, muddy look on the light ones. A solid panel guarantees
        full-contrast type regardless of the photo underneath.
      */}
      <div className={cn("relative w-full overflow-hidden", wide ? "aspect-4/3" : "aspect-4/5")}>
        <Image
          src={item.src}
          alt={`${item.title} — ${item.tags.join(", ")}`}
          fill
          sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 78vw"
          priority={index < 2}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div className="p-7">
        <p className="font-display text-xl font-semibold text-ink">{item.title}</p>
        <p className="mt-1.5 text-sm text-ink-faint">{item.tags.join(" · ")}</p>
      </div>
    </div>
  );
}
