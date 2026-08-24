import { whyPartner } from "@/lib/constants/site-copy";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { StampBadge } from "@/components/motifs/StampBadge";

const cardExtras = [
  { badge: "Est. 2001", footer: "Parth Offset (2001–2012) · Freelance (2012–Present)" },
  { badge: "Print-Ready", tags: ["Exact Bleeds", "Exact Dimensions", "Color Profiles"] },
  { badge: "Direct & Friendly" },
] as const;

const cardClass =
  "flex flex-col justify-between rounded-3xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]";

export function WhyPartnerSection() {
  const [expertise, printReady, approachable] = whyPartner.items;
  const [yearsStat, revisionsStat, advanceStat] = whyPartner.stats;

  return (
    <section className="bg-paper-raised px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionIndex index="05" label="TRUST" meta="WHY PARTNER WITH ME" />
          <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {whyPartner.heading}
          </h2>
        </Reveal>

        <Reveal className="mt-16 grid gap-6 sm:grid-cols-3" delay={0.1}>
          <div className={cardClass}>
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-4xl font-semibold text-accent">{yearsStat.value}</span>
                <StampBadge label={cardExtras[0].badge} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{expertise.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{expertise.body}</p>
            </div>
            <p className="mt-6 border-t border-line/60 pt-4 font-spec text-xs text-ink-faint">
              {cardExtras[0].footer}
            </p>
          </div>

          <div className={cardClass}>
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">{printReady.title}</h3>
                <StampBadge label={cardExtras[1].badge} />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{printReady.body}</p>
            </div>
            <div className="mt-6 border-t border-line/60 pt-4">
              <p className="font-spec text-[11px] tracking-wide text-ink-faint uppercase">Included in every file</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cardExtras[1].tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-paper-raised px-2.5 py-1 font-spec text-[10px] font-medium text-ink-faint uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">{approachable.title}</h3>
                <StampBadge label={cardExtras[2].badge} />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{approachable.body}</p>
            </div>
            <div className="mt-6 flex gap-6 border-t border-line/60 pt-4">
              <div>
                <p className="font-display text-2xl font-semibold text-accent">{revisionsStat.value}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{revisionsStat.label}</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-accent">{advanceStat.value}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{advanceStat.label}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
