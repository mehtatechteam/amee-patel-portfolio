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

const pharmaCaseStudies = portfolioItems.filter((item) => item.tags.includes("Pharmaceutical"));

export function PharmaSpecializationSection() {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Scoped to this section only (per the build plan — not a site-wide motion
  // rework). Desktop (lg+): the intro/trust-strip fades in as usual via
  // Reveal, then the whole intro+grid block pins briefly while the
  // case-study cards stagger in on scrub, before releasing and scrolling
  // away normally. Below lg, and under prefers-reduced-motion, the cards
  // fall back to a plain per-card fade-up that mirrors Reveal's own
  // defaults — no pin, no scrub. Fully inert under reduced motion.
  useGSAP(
    () => {
      if (reducedMotion || !sequenceRef.current || !gridRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const grid = gridRef.current;
        if (!grid) return undefined;
        const cards = gsap.utils.toArray<HTMLElement>(grid.children);
        if (!cards.length) return undefined;

        gsap.set(cards, { autoAlpha: 0, y: 36 });

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
        tl.to(cards, { autoAlpha: 1, y: 0, stagger: 0.45, ease: "power2.out" });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
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
    <section id="pharma" className="scroll-mt-24 bg-paper-raised px-5 py-28 sm:scroll-mt-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div ref={sequenceRef}>
          <Reveal>
            <SectionIndex index="03" label="PHARMA" meta={pharma.eyebrow.toUpperCase()} />
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
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
              lg+ pinned/staggered sequence above and the mobile fallback
              can each own these elements without fighting over the same
              autoAlpha/y transform. */}
          <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pharmaCaseStudies.map((item) => (
              <div
                key={item.slug}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`relative w-full overflow-hidden bg-paper-raised ${item.cardAspect === "wide" ? "aspect-4/3" : "aspect-4/5"}`}>
                  <Image
                    src={item.src}
                    alt={`${item.title} — ${item.tags.join(", ")}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">{item.title}</p>
                    <p className="mt-1.5 text-xs text-ink-faint">{item.tags.join(" · ")}</p>
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
