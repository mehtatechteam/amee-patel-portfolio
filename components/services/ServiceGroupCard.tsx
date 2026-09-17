import type { ServiceGroup } from "@/lib/constants/services";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

// Bordered "technical stamp" mark instead of a filled pastel tile — a solid
// SaaS-icon-tile fill read as a generic tech-dashboard badge rather than
// anything print-specific; a thin ink-bordered mark with the accent color
// only on the stroke/glyph reads closer to a registration/proof stamp.
const accentStyles = {
  accent: { badge: "border-accent/40 text-accent", ring: "group-hover:border-accent/40" },
  cyan: { badge: "border-cyan/40 text-cyan", ring: "group-hover:border-cyan/40" },
  magenta: { badge: "border-magenta/40 text-magenta", ring: "group-hover:border-magenta/40" },
  yellow: { badge: "border-yellow/50 text-ink", ring: "group-hover:border-yellow/50" },
} as const;

function pillLabel(item: string) {
  return item.split(" — ")[0];
}

export function ServiceGroupCard({
  group,
  index,
  className,
}: {
  group: ServiceGroup;
  index: number;
  className?: string;
}) {
  const accent = accentStyles[group.accent];

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-3xl rounded-tl-md border border-line bg-paper-raised p-8 transition-all duration-300",
        "hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_18px_34px_-16px_rgba(29,29,31,0.15)]",
        group.featured && "lg:col-span-2",
        className,
      )}
    >
      {/* An atelier job-jacket folder tab poking above the card's top-left corner */}
      <span
        className={cn(
          "absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-t-md border border-b-0 bg-paper-raised px-3 py-1 font-spec text-[10px] font-semibold tracking-widest uppercase transition-transform duration-200 group-hover:-translate-y-0.5 shadow-2xs",
          accent.badge,
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-75" />
        {`TAB // ${String(index).padStart(2, "0")}`}
      </span>

      <div className="flex items-center gap-2.5">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border bg-paper transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs",
            accent.badge,
          )}
        >
          <Icon name={group.icon} width={19} height={19} />
        </div>
        {!group.hasPortfolioProof && (
          <span className="rounded-full border border-line bg-paper px-2.5 py-0.5 text-[11px] font-medium text-ink-soft">
            By request
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">{group.title}</h3>
      {group.intro && <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{group.intro}</p>}

      <div className="mt-6 flex flex-1 flex-wrap content-start items-start gap-2 border-t border-line/70 pt-6">
        {group.items.map((item) => (
          <span
            key={item}
            title={item}
            className="inline-flex h-fit items-center rounded-full border border-line/60 bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft"
          >
            {pillLabel(item)}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line/70 pt-3">
        <span className="font-spec text-[10px] tracking-wider text-ink-soft uppercase">Delivery Standard</span>
        <span className="font-spec text-[10px] tracking-wide text-ink-soft uppercase">
          {group.id === "digital" ? "100% Digital Optimized · High Resolution" : "100% Print-Ready · Exact Bleed"}
        </span>
      </div>
    </article>
  );
}
