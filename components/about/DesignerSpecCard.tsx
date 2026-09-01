import { CMYKSwatch } from "@/components/motifs/CMYKSwatch";
import { RegistrationMark } from "@/components/motifs/RegistrationMark";
import { Icon } from "@/lib/icons";

const tools = ["CorelDRAW", "Photoshop", "Canva"];

/**
 * "Designer's Desk" spec card — stands in for a real headshot (none
 * supplied yet, see docs/client-requirements.md). Styled as a tactile
 * studio reference sheet rather than an empty placeholder box. The
 * "SCFA" seal is a designed monogram badge, not a reproduction of Sheth
 * C.N. College of Fine Arts' actual crest — we don't have rights to that.
 */
export function DesignerSpecCard() {
  return (
    <div className="sticky top-24 flex w-full max-w-sm">
      {/*
       * Spiral-notebook binding along the left edge — a column of punched
       * rings, not the plain repeating-dash ruler ticks this used to be.
       * The dashes read as a half-hearted stand-in for "spiral binding"
       * rather than the real thing; actual rings (two concentric circles —
       * outer as the punched hole, a thin inner ring as the coil catching
       * the light) sell the "Studio Spec Sheet as a real notebook page"
       * conceit properly. Built as one repeating SVG background (not N
       * individual DOM nodes) so the ring count scales with the card's
       * height for free.
       */}
      <div
        className="hidden w-5 shrink-0 sm:block"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='28' viewBox='0 0 20 28'%3E%3Ccircle cx='10' cy='14' r='5' fill='none' stroke='%2386868b' stroke-width='1.25'/%3E%3Ccircle cx='10' cy='14' r='1.6' fill='none' stroke='%2386868b' stroke-width='1' stroke-opacity='0.55'/%3E%3C/svg%3E\")",
          backgroundPosition: "left center",
          backgroundSize: "20px 28px",
          backgroundRepeat: "repeat-y",
        }}
        aria-hidden
      />

      <div className="relative flex-1 rounded-[2rem] border-2 border-ink bg-paper-raised p-7">
        <RegistrationMark className="absolute top-5 right-5" />

        <p className="font-spec text-[10px] tracking-widest text-ink-faint uppercase">
          Amee J. Patel · Studio Spec Sheet
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex h-16 w-16 -rotate-3 items-center justify-center rounded-full border-2 border-dashed border-ink/40">
            <span className="font-spec text-[9px] leading-tight font-normal tracking-wide text-ink-soft uppercase">
              SCFA
              <br />
              Alum
            </span>
          </div>
          <CMYKSwatch size="md" />
        </div>

        <p className="mt-6 text-xs font-semibold tracking-wide text-ink-faint uppercase">Tool Kit</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-xs font-semibold text-ink"
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-baseline justify-between border-t border-line pt-6">
          <span className="font-display text-3xl font-semibold text-ink">10+</span>
          <span className="max-w-[8rem] text-right font-spec text-[10px] tracking-wide text-ink-faint uppercase">
            Years — Print-Ready Every Time
          </span>
        </div>

        <div className="mt-4 rounded-xl bg-paper px-3 py-2 border border-line/60 flex items-center justify-between text-[11px] text-ink-soft">
          <span className="flex items-center gap-1 font-medium text-ink">
            <Icon name="pin" width={13} height={13} className="shrink-0 text-accent" />
            Ahmedabad Studio
          </span>
          <span className="font-spec text-[10px] tracking-wide text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-normal">100% REMOTE</span>
        </div>
      </div>
    </div>
  );
}
