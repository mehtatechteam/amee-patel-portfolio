import Link from "next/link";
import Image from "next/image";
import { hero } from "@/lib/constants/site-copy";
import { KineticWordmark } from "./KineticWordmark";
import { HeroPoster } from "./HeroPoster";
import { RegistrationMark } from "@/components/motifs/RegistrationMark";
import { CMYKSwatch } from "@/components/motifs/CMYKSwatch";
import { InkTrailCanvas } from "./InkTrailCanvas";
import { HeroAtelierProps } from "./HeroAtelierProps";
import { ShinyText } from "@/components/motifs/ShinyText";

// Real client names, pulled from the actual portfolio data below (not
// invented) — grounds the empty space under the CTAs with quick proof
// rather than a decorative claim we can't back up.
const featuredClients = ["Medween", "Kenheal", "Lil'Aura", "Madburgs", "Globiomed"];

// Literal print color bar — the calibration strip printed along the edge
// of a real press sheet. Plain flat color, no blur/gradient: the previous
// hero used a soft CMYK-derived pastel wash as its only nod to the site's
// print-craft identity, and at a glance it read as generic template
// decoration rather than anything specifically about print production.
// This is the opposite move — small, flat, unmistakably a printer's mark.
function PressColorBar({ className }: { className?: string }) {
  const inks = ["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink"];
  return (
    <div aria-hidden className={className}>
      {inks.map((c) => (
        <span key={c} className={`${c} flex-1`} />
      ))}
    </div>
  );
}

// Faint repeating paper-grain noise — the mount below dropped its filled
// background (a solid card behind the product photo just doubled up on
// the photo's own studio backdrop and read as two nested gray panels), so
// this is what gives the paper underneath a little tactility instead of
// reading as flat digital white. Same feTurbulence technique InkBleedRule
// already uses elsewhere, at a much lower opacity than a section border.
const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 sm:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]" style={{ backgroundImage: `url("${GRAIN_URL}")` }} />
      <PressColorBar className="flex h-1.5 w-full sm:h-2" />
      <InkTrailCanvas />
      <HeroAtelierProps />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 pt-12 sm:gap-12 sm:px-8 sm:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2.5 font-spec text-[11px] font-normal tracking-widest text-ink-soft uppercase sm:gap-3 sm:text-xs">
            <CMYKSwatch />
            <ShinyText text={hero.eyebrow} speed={3.5} />
          </span>

          {/* spot-uv-light: same varnish-sweep-on-hover effect already used
              on the secondary CTA border, here standing in for the "spot UV
              over the headline" print-finish flourish. */}
          <div className="spot-uv-light mt-3 sm:mt-5">
            <KineticWordmark lines={hero.heading.split("\n")} accentLine={1} />
          </div>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft sm:mt-5 sm:text-base lg:text-lg">{hero.body}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4">
            <Link
              href={hero.ctaPrimary.href}
              className="spot-uv-dark rounded-full bg-ink px-6 py-3 text-xs font-semibold text-paper transition-all duration-300 hover:scale-[1.03] hover:bg-accent sm:px-7 sm:py-3.5 sm:text-sm"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="group inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-6 py-3 text-xs font-semibold text-ink transition-colors hover:border-ink hover:bg-paper-raised sm:px-7 sm:py-3.5 sm:text-sm"
            >
              {hero.ctaSecondary.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 pt-4 sm:mt-8 sm:gap-x-6 sm:gap-y-3 sm:pt-5">
            <span className="font-spec text-[10px] font-semibold tracking-wider text-ink-soft uppercase sm:text-[11px]">Featured Clients</span>
            <p className="text-xs font-semibold text-ink-soft">{featuredClients.join(" · ")}</p>
          </div>
        </div>

        <div className="relative">
          {/* Steel binder clip physically pinning the specimen sheet — sits
              mostly above the card's top border so it pinches the edge
              rather than overlapping the "Drag to browse" label beneath it
              (measured live: the original -top-3 placement covered about
              half of that text). */}
          <div
            aria-hidden
            className="absolute -top-8 right-6 z-20 hidden w-11 drop-shadow-[0_8px_16px_rgba(0,0,0,0.22)] sm:block"
            style={{ transform: "rotate(4deg)" }}
          >
            <Image src="/hero/binder-clip.png" alt="" width={128} height={128} className="h-auto w-full select-none" />
          </div>

          <PressColorBar className="absolute top-6 -bottom-6 -left-3 hidden w-1.5 flex-col overflow-hidden rounded-full sm:flex" />
          <RegistrationMark className="absolute -top-3 -left-3 hidden h-6 w-6 text-ink/35 sm:block" />
          <RegistrationMark className="absolute -right-3 -bottom-3 hidden h-6 w-6 text-ink/35 sm:block" />
          <div className="rounded-2xl border border-ink/15 bg-paper/60 backdrop-blur-[2px] p-3 sm:p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between border-b border-line pb-2.5">
              <span className="font-spec text-[10px] tracking-widest text-ink-soft uppercase">Portfolio Specimen</span>
              <span className="font-spec text-[10px] tracking-widest text-ink-soft uppercase">Drag to browse</span>
            </div>
            <HeroPoster />
          </div>
        </div>
      </div>
    </section>
  );
}
