import { about } from "@/lib/constants/site-copy";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { Icon } from "@/lib/icons";
import { DesignerSpecCard } from "./DesignerSpecCard";
import { LanyardGate } from "./LanyardGate";

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-28 px-5 py-16 sm:scroll-mt-28 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionIndex index="01" label="ABOUT" meta="THE DESIGNER" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="relative">
          {/* Hangs apart from the spec card itself (own physics canvas,
              own draggable ID card) rather than crowding it — lg: and up
              only, same breakpoint discipline as the other decorative
              extras this section reserves for wider screens. A bare
              thread trailing into empty space read as a random floating
              object with no visible mount point — this pushpin gives the
              ribbon a real anchor to hang from. */}
          <div className="pointer-events-none absolute -top-6 -right-6 z-10 hidden lg:block">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mx-auto text-ink/60" aria-hidden>
              <circle cx="12" cy="9" r="6" fill="currentColor" />
              <path d="M12 15v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <LanyardGate className="-mt-1 [&>div]:pointer-events-auto" />
          </div>
          <DesignerSpecCard />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {about.heading}
          </span>
          <h2 className="mt-4 flex flex-wrap items-center gap-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {about.greeting.replace(/\s*👋$/, "")}
            {/* Hand-authored SVG in place of the raw 👋 emoji — this site's
                icon set replaces platform-rendered emoji everywhere else
                (see lib/icons.tsx); this was the one spot that had slipped
                through. */}
            <Icon name="wave" width={30} height={30} className="shrink-0 text-accent" aria-hidden />
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
                <dt className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-soft">
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
