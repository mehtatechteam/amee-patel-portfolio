import Image from "next/image";
import { CMYKSwatch } from "@/components/motifs/CMYKSwatch";
import { CurvedLoop } from "@/components/motifs/CurvedLoop";
import { Icon, IconName } from "@/lib/icons";

const tools: { label: string; icon: IconName }[] = [
  { label: "CorelDRAW", icon: "coreldraw" },
  { label: "Photoshop", icon: "photoshop" },
  { label: "Canva", icon: "canva" },
];

/**
 * "Designer's Desk" spec card. Styled as a clean Swiss-precision studio
 * spec sheet (the washi tape / punched-binder "scrapbook" treatment was
 * removed per explicit user choice, to match the cleaner cards elsewhere
 * on the site) rather than an empty placeholder box.
 *
 * Portrait: AI-generated from the client's own reference photos (see
 * docs/headshot-generation-prompt.md — round 2/"v2" prompt, after round 1
 * drifted off her actual likeness; Amee confirmed the likeness). Full-bleed
 * now (was a small circular avatar that cropped her face awkwardly) — the
 * card's own aspect ratio is tuned close to the source photo's, and
 * object-top keeps the crop coming off the bottom (shoulders/blazer)
 * rather than the top (face) when the two ratios don't match exactly.
 * All the spec-sheet text lives in one frosted panel at the bottom instead
 * of scattered chips over the photo — reads as a vellum/proof-sheet
 * overlay (a real print-production device, not a decorative glass card),
 * and keeps the photo itself uncluttered.
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

      <div className="relative flex-1 overflow-hidden rounded-[2rem] border-2 border-ink">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src="/about/amee-headshot.jpg"
            alt="Amee J. Patel"
            fill
            priority
            sizes="(min-width: 640px) 24rem, 100vw"
            className="object-cover object-top"
          />
        </div>

        {/* Studio seal — the same circular text-loop that used to wrap a
            small avatar now works as a corner stamp on the photo itself,
            like a proof mark on a print sheet. Moved down off the very top
            edge so it doesn't crowd the card's rounded corner. The other
            floating corner accent (a registration-mark crosshair) was cut
            entirely -- redundant with the CMYK swatch already carrying the
            same print-motif, and one less thing floating over her face. */}
        <div className="absolute top-10 left-4 flex h-16 w-16 items-center justify-center rounded-full bg-paper/85 shadow-sm backdrop-blur-sm">
          <CurvedLoop text="AMEE J. PATEL · SINCE 2012" size={64} />
        </div>

        <div className="absolute inset-x-0 bottom-0 overflow-hidden rounded-b-[1.6rem]">
          {/* A masked-gradient version of this (fading the blur radius
              itself via mask-image) rendered a visible seam line across
              the photo where the mask transitioned -- a real Chromium
              rendering artifact when backdrop-filter is combined with a
              mask, not something worth fighting. This gets the same
              "gradually frosting" read from the color wash alone (a plain
              gradient, no masking) under one uniform, artifact-free blur. */}
          <div className="absolute inset-0 backdrop-blur-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/65 via-50% to-paper/20" />

          <div className="relative p-5 pt-7 sm:p-6 sm:pt-8">
            <div className="flex items-center justify-between">
              <p className="font-spec text-[10px] tracking-widest text-ink-soft uppercase">
                Amee J. Patel · Studio Spec Sheet
              </p>
              <CMYKSwatch size="sm" />
            </div>

            <p className="mt-4 text-xs font-semibold tracking-wide text-ink-soft uppercase">Tool Kit</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-xs font-semibold text-ink"
                >
                  <Icon name={tool.icon} className="shrink-0 text-ink-soft" />
                  {tool.label}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
              <span className="font-display text-3xl font-semibold text-ink">10+</span>
              <span className="max-w-[8rem] text-right font-spec text-[10px] tracking-wide text-ink-soft uppercase">
                Years — Print-Ready Every Time
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
