import type { ServiceGroup } from "@/lib/constants/services";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const accentStyles = {
  accent: { badge: "bg-accent-soft text-accent", ring: "group-hover:border-accent/40" },
  cyan: { badge: "bg-cyan-soft text-cyan", ring: "group-hover:border-cyan/40" },
  magenta: { badge: "bg-magenta-soft text-magenta", ring: "group-hover:border-magenta/40" },
  yellow: { badge: "bg-yellow-soft text-ink", ring: "group-hover:border-yellow/50" },
} as const;

function pillLabel(item: string) {
  return item.split(" — ")[0];
}

export function ServiceGroupCard({ group, className }: { group: ServiceGroup; className?: string }) {
  const accent = accentStyles[group.accent];

  return (
    <article
      className={cn(
        "group flex flex-col rounded-3xl border-2 border-transparent bg-paper-raised p-8 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]",
        accent.ring,
        group.featured && "lg:col-span-2",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6",
            accent.badge,
          )}
        >
          <Icon name={group.icon} />
        </div>
        {!group.hasPortfolioProof && (
          <span className="rounded-full bg-paper px-2.5 py-0.5 text-[11px] font-medium text-ink-faint">
            By request
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">{group.title}</h3>
      {group.intro && <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{group.intro}</p>}

      <div className="mt-6 flex flex-1 flex-wrap gap-2 border-t border-ink/[0.06] pt-6">
        {group.items.map((item) => (
          <span
            key={item}
            title={item}
            className="rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft"
          >
            {pillLabel(item)}
          </span>
        ))}
      </div>

      <p className="mt-6 font-spec text-[11px] tracking-wide text-ink-faint uppercase">
        Delivered print-ready, matched to your exact specs
      </p>
    </article>
  );
}
