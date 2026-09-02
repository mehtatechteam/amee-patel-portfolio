"use client";

import Link from "next/link";
import Image from "next/image";
import { hero } from "@/lib/constants/site-copy";
import { KineticWordmark } from "./KineticWordmark";
import { HeroCardRail } from "./HeroCardRail";
import { RegistrationMark } from "@/components/motifs/RegistrationMark";
import { InkTrailCanvas } from "./InkTrailCanvas";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { portfolioItems } from "@/lib/constants/portfolio";

// Real client names, pulled from the actual portfolio data below (not
// invented) — grounds the empty space under the CTAs with quick proof
// rather than a decorative claim we can't back up.
const featuredClients = ["Medween", "Kenheal", "Lil'Aura", "Madburgs", "Globiomed"];

const reducedMotionPreview = portfolioItems.find((i) => i.slug === "medween-pharma-box")!;

export function Hero() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    // Reduced motion gets the plain, fully static light layout — no
    // WebGL, no overlay/scrim legibility concerns, just the real headline
    // content followed by a simple product shot. Simpler and safer than
    // trying to make the dark-stage overlay treatment work without any
    // animation to carry it.
    return (
      <section id="home" className="relative overflow-hidden px-5 pt-24 pb-16 sm:px-8 sm:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-paper-raised px-4 py-1.5 text-xs font-medium text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {hero.eyebrow}
            </span>
            <div className="mt-5">
              <KineticWordmark lines={hero.heading.split("\n")} accentLine={1} />
            </div>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">{hero.body}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href={hero.ctaPrimary.href}
                className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
              >
                {hero.ctaPrimary.label}
              </Link>
              <Link
                href={hero.ctaSecondary.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                {hero.ctaSecondary.label} ↗
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
              <span className="font-spec text-[11px] font-semibold tracking-wider text-ink-faint uppercase">Featured Clients</span>
              <p className="text-xs font-semibold text-ink-soft">{featuredClients.join(" · ")}</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-paper-raised">
            <Image src={reducedMotionPreview.src} alt={reducedMotionPreview.title} fill sizes="50vw" className="object-cover" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* The 3D card arc is the section's actual background now — text and
          CTAs sit on top of it, not stacked above/below it in a separate
          light block. That's what makes this read as one considered scene
          instead of "a text section, then a 3D section." */}
      <div className="absolute inset-0 z-0">
        <HeroCardRail />
      </div>

      {/* Legibility scrim — a left-to-right dark gradient, independent of
          whatever the arc happens to be doing behind it, so the headline
          stays readable at every drag position/rotation rather than
          betting on the scene never passing a bright card under the text. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-ink/90 via-ink/55 to-transparent sm:via-40% sm:to-70%"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-ink/70 to-transparent" />

      <InkTrailCanvas />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-between px-5 pt-24 pb-10 sm:px-8 sm:pt-28 sm:pb-14">
        <div className="max-w-xl">
          <RegistrationMark className="absolute top-0 left-0 hidden text-paper/25 lg:block" />
          <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/10 px-4 py-1.5 text-xs font-medium text-paper/85 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {hero.eyebrow}
          </span>

          <div className="mt-5">
            <KineticWordmark lines={hero.heading.split("\n")} accentLine={1} variant="dark" />
          </div>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/70 sm:text-lg">{hero.body}</p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href={hero.ctaPrimary.href}
              className="rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:scale-[1.03] hover:bg-accent hover:text-paper"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="group inline-flex items-center gap-1.5 rounded-full border border-paper/25 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              {hero.ctaSecondary.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/15 pt-5">
          <RegistrationMark className="hidden text-paper/25 lg:block" />
          <span className="font-spec text-[11px] font-semibold tracking-wider text-paper/50 uppercase">Featured Clients</span>
          <p className="text-xs font-semibold text-paper/70">{featuredClients.join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}
