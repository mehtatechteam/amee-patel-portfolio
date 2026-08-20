import { whyPartner } from "@/lib/constants/site-copy";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { StampBadge } from "@/components/motifs/StampBadge";

const stampLines = [
  ["10+ YEARS", "EXPERTISE"],
  ["PRINT-READY", "GUARANTEED"],
  ["CREATIVE &", "APPROACHABLE"],
];

export function WhyPartnerSection() {
  return (
    <section className="bg-paper-raised px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionIndex index="04" label="TRUST" meta="WHY PARTNER WITH ME" />
          <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {whyPartner.heading}
          </h2>
        </Reveal>

        <Reveal className="mt-16 grid gap-5 sm:grid-cols-3" delay={0.1}>
          {whyPartner.items.map((item, i) => (
            <div key={item.title} className="flex flex-col items-start gap-5 rounded-3xl bg-paper p-8">
              <StampBadge lines={stampLines[i]} />
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16 grid gap-8 border-t border-line pt-12 sm:grid-cols-3" delay={0.2}>
          {whyPartner.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl font-semibold text-accent">{stat.value}</p>
              <p className="mt-1.5 text-sm text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
