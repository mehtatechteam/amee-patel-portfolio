import Link from "next/link";
import { hero } from "@/lib/constants/site-copy";
import { KineticWordmark } from "./KineticWordmark";
import { HeroCardRail } from "./HeroCardRail";
import { RegistrationMark } from "@/components/motifs/RegistrationMark";
import { InkTrailCanvas } from "./InkTrailCanvas";

// Real client names, pulled from the actual portfolio data below (not
// invented) — grounds the empty space under the CTAs with quick proof
// rather than a decorative claim we can't back up.
const featuredClients = ["Medween", "Kenheal", "Lil'Aura", "Madburgs", "Globiomed"];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center gap-8 overflow-hidden pt-24 pb-10 sm:gap-10 sm:pt-28 sm:pb-14"
    >
      {/* Soft CMYK-derived gradient wash — a restrained two-blob version
          (down from four) confined to the top band, so it reads as a
          quiet warmth behind the headline rather than competing with the
          card arc's own grid-floor depth cue lower in the section, closer
          to the reference's negative-space restraint. Purely decorative/
          aria-hidden, sits behind all real content at z-0. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60svh]"
        style={{
          background:
            "radial-gradient(50% 60% at 15% 0%, var(--color-cyan-soft) 0%, transparent 62%), " +
            "radial-gradient(45% 55% at 85% 5%, var(--color-magenta-soft) 0%, transparent 62%), " +
            "var(--color-paper)",
        }}
      />
      <RegistrationMark className="absolute top-6 left-6 hidden lg:block" />
      <RegistrationMark className="absolute right-6 bottom-10 hidden lg:block" />
      <InkTrailCanvas />

      {/* Compact band — a lead-gen business site still needs a visible,
          real headline/CTA (unlike jesperlandberg.com's near-textless,
          sr-only-headline approach, which fits a self-promo portfolio but
          not a client's conversion goals), kept slim so the card rail below
          carries the section's visual weight. */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-paper-raised px-4 py-1.5 text-xs font-medium text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {hero.eyebrow}
        </span>

        <div className="mt-5">
          <KineticWordmark lines={hero.heading.split("\n")} accentLine={1} />
        </div>

        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">{hero.body}</p>

          <div className="flex flex-wrap items-center gap-4">
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
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
          <span className="font-spec text-[11px] font-semibold tracking-wider text-ink-faint uppercase">
            Featured Clients
          </span>
          <p className="text-xs font-semibold text-ink-soft">{featuredClients.join(" · ")}</p>
        </div>
      </div>

      {/* Full-bleed draggable rail — no horizontal padding of its own
          container, since HeroCardRail bakes in its own edge padding. */}
      <div className="relative z-10">
        <HeroCardRail />
      </div>
    </section>
  );
}
