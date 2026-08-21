import { about } from "@/lib/constants/site-copy";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { DesignerSpecCard } from "./DesignerSpecCard";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 px-5 py-28 sm:scroll-mt-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionIndex index="05" label="ABOUT" meta="THE DESIGNER" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="relative">
          <DesignerSpecCard />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {about.heading}
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {about.greeting.replace(/\s*👋$/, "")}{" "}
            <span aria-hidden="true">👋</span>
          </h2>

          <div className="mt-7 flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <p className="mt-7 text-xl font-medium text-ink">{about.closing}</p>

          <dl className="mt-12 flex flex-col gap-4 border-t border-ink/[0.06] pt-8">
            {about.credentials.map((c) => (
              <div key={c.label} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  {c.label}
                </dt>
                <dd className="text-sm text-ink-soft">{c.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
