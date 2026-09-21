"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { portfolioItems } from "@/lib/constants/portfolio";
import { pharma, siteMeta } from "@/lib/constants/site-copy";
import { whatsappLink } from "@/lib/utils";
import { Icon } from "@/lib/icons";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { CornerBrackets } from "@/components/motifs/CornerBrackets";

const pharmaCaseStudies = portfolioItems.filter((item) => item.tags.includes("Pharmaceutical"));

export function PharmaSpecializationSection() {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Scoped to this section only (per the build plan — not a site-wide motion
  // rework). Every card fades/rises up as it individually scrolls into
  // view — same mechanism at every breakpoint (desktop just gets a touch
  // more distance and stagger for a fuller sweep), no pin, no scrub. Fully
  // inert under reduced motion.
  //
  // An earlier version pinned the whole intro+grid block (`pin: true`,
  // `end: "+=60%"`) so the cards could stagger in while the section held
  // in place. Root-caused a real bug from that: `sequenceRef`'s natural
  // content height (header + trust strip + a 2-row, 6-card grid, ~2000px+)
  // is well over a typical viewport's height. Pinning an element taller
  // than the viewport freezes its scroll position on screen but does NOT
  // let you scroll to see what's below the fold *inside* it — so the
  // second row of case-study cards was never actually visible during the
  // pin, and the moment the pin released, the layout jumped straight to
  // wherever the reserved scroll distance had already carried it,
  // reading as a dead, empty gray band before Portfolio (confirmed via
  // screenshot + DOM inspection: a literal 540px trailing `padding` on
  // GSAP's own `.pin-spacer`, colored only by the section's own
  // background with nothing rendered in it). A plain per-card
  // scroll-reveal has no spacer, no fixed-height assumption, and no
  // capacity to hide content below an arbitrary pin boundary.
  useGSAP(
    () => {
      if (reducedMotion || !sequenceRef.current || !gridRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const grid = gridRef.current;
        if (!grid) return undefined;
        const cards = gsap.utils.toArray<HTMLElement>(grid.children);
        if (!cards.length) return undefined;

        const tweens = cards.map((card, i) =>
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 36 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          ),
        );

        return () => {
          tweens.forEach((tween) => {
            tween.scrollTrigger?.kill();
            tween.kill();
          });
        };
      });

      mm.add("(max-width: 1023.98px)", () => {
        const grid = gridRef.current;
        if (!grid) return undefined;
        const cards = gsap.utils.toArray<HTMLElement>(grid.children);
        if (!cards.length) return undefined;

        const tweens = cards.map((card, i) =>
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              delay: 0.1 + i * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          ),
        );

        return () => {
          tweens.forEach((tween) => {
            tween.scrollTrigger?.kill();
            tween.kill();
          });
        };
      });

      return () => mm.revert();
    },
    { scope: sequenceRef, dependencies: [reducedMotion] },
  );

  return (
    <section id="pharma" className="relative scroll-mt-28 bg-paper-raised px-5 py-8 sm:scroll-mt-28 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div ref={sequenceRef}>
          <Reveal>
            <SectionIndex index="03" label="PHARMA" meta={pharma.eyebrow.toUpperCase()} showNumeral={false} />
            {/* justify-between here used to make sense when a docked 3D
                phone occupied the section's right side; with that
                removed, pinning the CTA to the far edge just left a
                large empty gap on wide screens. justify-start + an
                explicit gap keeps the button a natural distance from
                the text instead. */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-start lg:gap-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-ink shadow-sm border border-line">
                  <Icon name="capsule" width={16} height={16} className="text-accent" />
                  <span className="font-spec text-[11px] font-normal uppercase tracking-wide">{pharma.eyebrow}</span>
                </div>
                <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  {pharma.heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">{pharma.intro}</p>
              </div>

              <a
                href={whatsappLink(siteMeta.whatsapp, pharma.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper shadow-lg transition-all duration-300 hover:scale-105 hover:bg-accent"
              >
                <span>{pharma.ctaLabel}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>

          {/* Trust strip — reuses already-true claims, not new promises */}
          <Reveal className="mt-10 flex flex-wrap gap-3" delay={0.05}>
            {pharma.trustPoints.map((point) => (
              <span
                key={point}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs font-semibold text-ink-soft"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {point}
              </span>
            ))}
          </Reveal>

          {/* Case study cards — animated directly (not via Reveal) so the
              per-breakpoint scroll-reveal above owns these elements
              without fighting Reveal over the same autoAlpha/y transform. */}
          {/* items-start: see the matching note in PortfolioGrid.tsx — without
              it, a short/no-description "wide"-aspect card (e.g. Globiomed)
              sharing a row with a taller "portrait"-aspect card gets
              stretched to match, and the empty space lands entirely in its
              text body before the footer row. */}
          <div ref={gridRef} className="mt-10 grid items-start gap-6 animate-[labelFade_0.4s_ease] sm:grid-cols-2 lg:grid-cols-3">
            {pharmaCaseStudies.map((item) => (
              <div
                key={item.slug}
                // `h-full` (100% of the grid area) used to fight the
                // `items-start` above — a percentage height still resolves
                // against the row track even when the item isn't stretched,
                // so it silently reproduced the exact dead-space bug
                // items-start was added to fix. Dropped: the card should
                // simply size to its own content.
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_-16px_rgba(29,29,31,0.3)]"
              >
                <CornerBrackets className="pointer-events-none absolute inset-0 z-10" />
                {/* Unified aspect ratio across every card (was a per-item
                    wide/portrait split) so titles/tags/footers all land on
                    the same horizontal baseline across a row. */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-paper-raised">
                  {/* object-contain — object-cover was cropping the tops/
                      bottoms off real cartons (confirmed via screenshot),
                      severe on a section whose whole point is showing the
                      full physical packaging. */}
                  <Image
                    src={item.src}
                    alt={`${item.title} — ${item.tags.join(", ")}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">{item.title}</p>
                    <p className="mt-1.5 text-xs text-ink-soft">{item.tags.join(" · ")}</p>
                    {item.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                    ) : null}
                  </div>
                  <p className="mt-4 border-t border-line/60 pt-3 text-xs font-semibold text-accent">{item.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
