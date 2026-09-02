import Link from "next/link";
import { hero } from "@/lib/constants/site-copy";
import { KineticWordmark } from "./KineticWordmark";
import { HeroPoster } from "./HeroPoster";
import { RegistrationMark } from "@/components/motifs/RegistrationMark";
import { InkTrailCanvas } from "./InkTrailCanvas";

// Real client names, pulled from the actual portfolio data below (not
// invented) — grounds the empty space under the CTAs with quick proof
// rather than a decorative claim we can't back up.
const featuredClients = ["Medween", "Kenheal", "Lil'Aura", "Madburgs", "Globiomed"];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-5 pt-24 pb-16 sm:px-8 sm:pt-28 sm:pb-20">
      {/* Soft CMYK-derived gradient wash — decorative background warmth,
          not a full dark stage. Purely aria-hidden, sits behind everything. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 55% at 12% 10%, var(--color-cyan-soft) 0%, transparent 62%), " +
            "radial-gradient(45% 50% at 88% 8%, var(--color-magenta-soft) 0%, transparent 62%), " +
            "radial-gradient(45% 45% at 15% 90%, var(--color-yellow-soft) 0%, transparent 60%), " +
            "var(--color-paper)",
        }}
      />
      <RegistrationMark className="absolute top-6 left-6 hidden text-ink/25 lg:block" />
      <RegistrationMark className="absolute right-6 bottom-6 hidden text-ink/25 lg:block" />
      <InkTrailCanvas />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
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

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
            <span className="font-spec text-[11px] font-semibold tracking-wider text-ink-faint uppercase">Featured Clients</span>
            <p className="text-xs font-semibold text-ink-soft">{featuredClients.join(" · ")}</p>
          </div>
        </div>

        <HeroPoster />
      </div>
    </section>
  );
}
