import { pricingGroups, pricingTerms } from "@/lib/constants/pricing";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/lib/icons";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { cn } from "@/lib/utils";
import { ProjectEstimator } from "./ProjectEstimator";

export function PricingSection() {
  return (
    <section id="pricing" className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-2xl">
          <SectionIndex index="06" label="PRICING" meta="INVESTMENT" />
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Pricing
          </h2>
          <p className="mt-4 text-[15px] text-ink-soft">
            Straightforward, project-based rates — no hidden fees.
          </p>
        </Reveal>

        <Reveal className="grid gap-5 md:grid-cols-2" delay={0.1}>
          {pricingGroups.map((group, i) => {
            const isLoneLast = i === pricingGroups.length - 1 && pricingGroups.length % 2 === 1;
            // The lone odd-one-out gets a compact horizontal treatment
            // spanning both columns — a sparse half-width card here would
            // just recreate the empty-space problem this ordering exists
            // to avoid (see lib/constants/pricing.ts).
            if (isLoneLast) {
              return (
                <div
                  key={group.title}
                  className={cn(
                    "relative flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-paper-raised p-8 md:col-span-2",
                    group.mostPopular && "border-2 border-accent",
                  )}
                >
                  {group.mostPopular && (
                    <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-paper">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper text-ink shadow-sm">
                      <Icon name={group.icon} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">{group.title}</h3>
                      {group.note && <p className="mt-1 text-xs text-ink-faint">{group.note}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {group.rows.map((row) => (
                      <div key={row.label} className="flex items-baseline gap-4 text-sm">
                        <span className="text-ink-soft">{row.label}</span>
                        <span className="font-semibold text-ink">{row.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={group.title} className="rounded-3xl bg-paper-raised p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-ink shadow-sm">
                    <Icon name={group.icon} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink">{group.title}</h3>
                </div>
                {group.note && <p className="mb-4 text-xs text-ink-faint">{group.note}</p>}
                <ul className="flex flex-col gap-3.5">
                  {group.rows.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-baseline justify-between gap-4 border-b border-ink/[0.06] pb-3.5 text-sm last:border-none last:pb-0"
                    >
                      <span className="text-ink-soft">{row.label}</span>
                      <span className="shrink-0 font-semibold text-ink">{row.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Reveal>

        <Reveal className="mt-5" delay={0.15}>
          <ProjectEstimator />
        </Reveal>

        <ul className="mt-12 flex flex-col gap-2 border-t border-ink/[0.06] pt-8 text-xs text-ink-faint">
          {pricingTerms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
