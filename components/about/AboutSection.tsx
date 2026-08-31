"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { about } from "@/lib/constants/site-copy";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { DesignerSpecCard } from "./DesignerSpecCard";

// Four CMYK "color separation" halftone layers, each a repeating dot
// pattern in one ink color, nudged a few px off from the others — like
// real misregistered print plates. Purely decorative/aria-hidden and
// layered *on top of* the real content below (which is never itself
// hidden or moved), so there's nothing to restore if the breakpoint or
// motion preference changes mid-session.
const HALFTONE_LAYERS: { color: string; offset: string }[] = [
  { color: "var(--color-cyan)", offset: "0px 0px" },
  { color: "var(--color-magenta)", offset: "3px 1px" },
  { color: "var(--color-yellow)", offset: "-2px 3px" },
  { color: "var(--color-ink)", offset: "1px -2px" },
];

export function AboutSection() {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const rollerRef = useRef<HTMLDivElement>(null);
  const maskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  // Scoped to this section only, mirroring PharmaSpecializationSection's
  // matchMedia pattern. Desktop (lg+) only: once the two-column content
  // scrolls into place, it pins briefly while an ink roller sweeps across
  // and the four halftone layers above peel away to 0 opacity, staggered —
  // a print-press pass playing out as an extra flourish, not a substitute
  // for the ordinary Reveal fade-up the content already gets on every
  // breakpoint. Below lg, and under reduced motion, this whole block never
  // runs; the overlay elements stay at `hidden` (see className below) and
  // the section is just the plain Reveal-based layout.
  useGSAP(
    () => {
      if (reducedMotion || !sequenceRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const roller = rollerRef.current;
        const masks = maskRefs.current.filter((el): el is HTMLDivElement => !!el);
        if (!roller || !masks.length) return undefined;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sequenceRef.current,
            start: "top top+=88",
            end: "+=60%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.6,
          },
        });

        tl.fromTo(roller, { xPercent: -30, autoAlpha: 1 }, { xPercent: 130, duration: 0.4, ease: "none" })
          .to(roller, { autoAlpha: 0, duration: 0.1 }, 0.35)
          .to(masks, { opacity: 0, stagger: 0.09, duration: 0.7, ease: "power1.out" }, 0.15);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sequenceRef, dependencies: [reducedMotion] },
  );

  return (
    <section id="about" className="scroll-mt-24 px-5 py-28 sm:scroll-mt-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionIndex index="01" label="ABOUT" meta="THE DESIGNER" />
      </div>

      <div ref={sequenceRef} className="relative mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
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

        {/* Print-press overlay — lg+ and motion-enabled only. Conditionally
            rendered (not just hidden) on reducedMotion: the masks start
            opaque and only ever get animated to 0 by the lg+ matchMedia
            branch above, which never runs under reduced motion — without
            this they'd sit permanently covering the real content. */}
        {!reducedMotion && (
        <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block" aria-hidden>
          {HALFTONE_LAYERS.map((layer, i) => (
            <div
              key={layer.color}
              ref={(el) => {
                maskRefs.current[i] = el;
              }}
              className="absolute inset-0 opacity-55 mix-blend-multiply"
              style={{
                backgroundImage: `radial-gradient(circle, ${layer.color} 1px, transparent 1.1px)`,
                backgroundSize: "13px 13px",
                backgroundPosition: layer.offset,
              }}
            />
          ))}
          <div
            ref={rollerRef}
            className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-transparent via-ink/15 to-transparent opacity-0 blur-2xl"
          />
        </div>
        )}
      </div>
    </section>
  );
}
