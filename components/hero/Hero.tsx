import Image from "next/image";
import Link from "next/link";
import { hero } from "@/lib/constants/site-copy";
import { portfolioItems } from "@/lib/constants/portfolio";
import { KineticWordmark } from "./KineticWordmark";
import { HeroParallaxCollage } from "./HeroParallaxCollage";

const collage = [
  { item: portfolioItems.find((i) => i.slug === "lilaura-lavender")!, rotate: "-rotate-3", cls: "top-0 right-2 w-[46%]", depth: 1.4 },
  { item: portfolioItems.find((i) => i.slug === "madburgs-burger-box")!, rotate: "rotate-2", cls: "bottom-2 -right-2 w-[54%]", depth: 0.8 },
  { item: portfolioItems.find((i) => i.slug === "medween-pharma-box")!, rotate: "rotate-3", cls: "top-8 left-2 w-[38%] hidden xl:block", zoom: true, depth: 1.9 },
];

// Compact 2-image stack for phones/tablets — the full desktop collage is
// `hidden` below `lg`, which previously left mobile visitors with zero
// portfolio imagery above the fold.
const mobileCollage = [
  { item: portfolioItems.find((i) => i.slug === "littlegrow-baby-cereal")!, rotate: "-rotate-3", cls: "left-1/2 -translate-x-[62%]" },
  { item: portfolioItems.find((i) => i.slug === "siriza-herbal-soap")!, rotate: "rotate-2", cls: "left-1/2 translate-x-[2%]" },
];

// Real client names, pulled from the actual portfolio data below (not
// invented) — grounds the empty space under the CTAs with quick proof
// rather than a decorative claim we can't back up.
const featuredClients = ["Medween", "Lil'Aura", "Madburgs", "Globiomed"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-20 pb-28 sm:px-8 sm:pt-28 sm:pb-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-paper-raised px-4 py-1.5 text-xs font-medium text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {hero.eyebrow}
          </span>

          <div className="mt-7">
            <KineticWordmark lines={hero.heading.split("\n")} accentLine={1} />
          </div>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">{hero.body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={hero.ctaPrimary.href}
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-all duration-300 hover:scale-[1.03] hover:bg-accent"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="group inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-paper-raised"
            >
              {hero.ctaSecondary.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
            <span className="font-spec text-[11px] font-semibold tracking-wider text-ink-faint uppercase">
              Featured Clients
            </span>
            <p className="text-xs font-semibold text-ink-soft">{featuredClients.join(" · ")}</p>
          </div>

          <div className="relative mt-12 h-48 sm:h-56 lg:hidden">
            {mobileCollage.map(({ item, rotate, cls }) => (
              <div
                key={item.slug}
                className={`absolute top-0 w-36 overflow-hidden rounded-2xl shadow-[0_25px_50px_-20px_rgba(0,0,0,0.3)] sm:w-40 ${rotate} ${cls}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={160}
                  height={200}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Floating sticker badge — a print-house "quality control" stamp,
              tilted like it was slapped on by hand rather than laid out in a
              grid. Perched clear of the collage's own corner so it doesn't
              overlap/obscure the artwork underneath. Real, sourced claims
              only (10+ Years, Print-Ready). */}
          <div
            className="absolute -top-10 right-2 z-20 hidden -rotate-6 items-center gap-2 rounded-full border-2 border-ink bg-yellow px-4 py-2 shadow-[4px_4px_0_0_var(--color-ink)] sm:flex lg:top-[-2.5rem] lg:right-6"
            aria-hidden
          >
            <span className="h-2 w-2 rounded-full bg-ink" />
            <span className="font-spec text-[11px] font-bold tracking-wide text-ink uppercase">
              Print-Ready Certified · 10+ Yrs
            </span>
          </div>

          <HeroParallaxCollage collage={collage} />
        </div>
      </div>
    </section>
  );
}
