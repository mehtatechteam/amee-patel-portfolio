import { CMYKSwatch } from "@/components/motifs/CMYKSwatch";
import { RegistrationMark } from "@/components/motifs/RegistrationMark";

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
      {/* simulated ruler ticks along the left edge */}
      <div
        className="hidden w-4 shrink-0 sm:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--color-ink-faint) 0 1px, transparent 1px 8px)",
          backgroundPosition: "left center",
          backgroundSize: "8px 8px",
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
            <span className="font-spec text-[9px] leading-tight font-bold text-ink-soft uppercase">
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
      </div>
    </div>
  );
}
