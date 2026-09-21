import Link from "next/link";
import { hero } from "@/lib/constants/site-copy";
import { KineticWordmark } from "./KineticWordmark";
import { HeroPoster } from "./HeroPoster";
import { CMYKSwatch } from "@/components/motifs/CMYKSwatch";



// Client names grounding the featured-clients strip
const featuredClients = ["Medween", "Kenheal", "Lil'Aura", "Madburgs", "Globiomed"];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-6 sm:pb-8">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 pt-0 sm:gap-12 sm:px-8 sm:pt-2 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2.5 font-spec text-[11px] font-normal tracking-widest text-ink-soft uppercase sm:gap-3 sm:text-xs">
            <CMYKSwatch />
            {hero.eyebrow}
          </span>

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
          <div className="rounded-2xl p-3 sm:p-4">
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
