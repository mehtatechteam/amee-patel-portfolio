import { CMYKSwatch } from "@/components/motifs/CMYKSwatch";
import { RegistrationMark } from "@/components/motifs/RegistrationMark";
import { CurvedLoop } from "@/components/motifs/CurvedLoop";
import { Icon } from "@/lib/icons";

const tools = ["CorelDRAW", "Photoshop", "Canva"];

/**
 * "Designer's Desk" spec card — stands in for a real headshot (none
 * supplied yet, see docs/client-requirements.md). Styled as a clean
 * Swiss-precision studio spec sheet (the washi tape / punched-binder
 * "scrapbook" treatment was removed per explicit user choice, to match
 * the cleaner cards elsewhere on the site) rather than an empty
 * placeholder box. The "SCFA" seal is a designed monogram badge, not a
 * reproduction of Sheth C.N. College of Fine Arts' actual crest — we
 * don't have rights to that.
 */
// A small fanned stack of Pantone-style swatch chips peeking out from
// A fanned stack of authentic prepress CMYK swatch chips peeking out from
// behind the card — realistic print-shop tools on a designer's desk.
function PantoneFan() {
  const chips = [
    { bg: "bg-[#00a3e0]", label: "CYAN", rotate: -18, text: "text-white" },
    { bg: "bg-[#ec008c]", label: "MAGENTA", rotate: -8, text: "text-white" },
    { bg: "bg-[#ffd100]", label: "YELLOW", rotate: 2, text: "text-ink" },
    { bg: "bg-[#1d1d1f]", label: "BLACK", rotate: 12, text: "text-white" },
  ];
  return (
    <div className="pointer-events-none absolute -bottom-5 left-7 -z-10 flex scale-90 sm:scale-100 origin-bottom-left items-end sm:-bottom-7 sm:-left-7" aria-hidden>
      {chips.map((chip, i) => (
        <div
          key={i}
          className={`flex flex-col justify-between h-16 w-9 sm:h-20 sm:w-11 rounded-sm border border-ink/20 bg-paper p-1 shadow-md ${chip.bg}`}
          style={{ transform: `rotate(${chip.rotate}deg)`, transformOrigin: "bottom left", marginLeft: i === 0 ? 0 : -8 }}
        >
          <div className="flex-1" />
          <div className="bg-paper/90 px-1 py-0.5 rounded-[1px]">
            <span className="block font-spec text-[6px] sm:text-[7px] font-bold text-ink leading-none">
              {chip.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DesignerSpecCard() {
  return (
    <div className="relative sticky top-24 flex w-full max-w-sm">
      <PantoneFan />

      <div className="relative flex-1 rounded-[2rem] border-2 border-ink bg-paper-raised p-7">
        <RegistrationMark className="absolute top-5 right-5" />

        <p className="font-spec text-[10px] tracking-widest text-ink-soft uppercase">
          Amee J. Patel · Studio Spec Sheet
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <CurvedLoop text="AMEE J. PATEL · SINCE 2012" size={96} className="absolute inset-0" />
            <div className="flex h-16 w-16 -rotate-3 items-center justify-center rounded-full border-2 border-dashed border-ink/40 bg-paper-raised">
              <span className="font-spec text-[9px] leading-tight font-normal tracking-wide text-ink-soft uppercase">
                SCFA
                <br />
                Alum
              </span>
            </div>
          </div>
          <CMYKSwatch size="md" />
        </div>

        <p className="mt-6 text-xs font-semibold tracking-wide text-ink-soft uppercase">Tool Kit</p>
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
          <span className="max-w-[8rem] text-right font-spec text-[10px] tracking-wide text-ink-soft uppercase">
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
