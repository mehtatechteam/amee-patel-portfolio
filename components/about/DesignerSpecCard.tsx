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
 * docs/headshot-generation-prompt.md — round 5/"v5" prompt; round 1 drifted
 * off her likeness, v2 fixed that but ran too dark/bronze, v3's tone fix
 * didn't actually take, v4's forceful correction did, v5 refined the
 * blazer fabric/tailoring after v4's read as cheap. Amee confirmed
 * likeness, skin tone, and attire on this round). Full-bleed
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
        <div className="relative aspect-[3/5] w-full">
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
            like a proof mark on a print sheet. Back in the top-left
            corner (a lower placement put it right over her hair once the
            badge grew to 80px, reading as overlapping her rather than
            sitting beside her) -- a modest inset from the rounded corner
            is enough breathing room without drifting into the portrait.
            Sized at 80px, not the 64px this started at: CurvedLoop fits
            its text to the circle by measuring the string once and
            picking a whole-number repeat count, so at 64px "AMEE J.
            PATEL · SINCE 2012 ✦ " landed almost exactly one loop with
            near-zero slack -- textPath layout doesn't measure pixel-
            identical to the hidden measurement text it's based on, so the
            tail end ("2012") got pushed into the seam and overlapped
            itself into illegibility. 80px gives ~30% slack instead of
            ~0%, which is what actually needed to change, not the text. */}
        <div className="absolute top-5 left-5 flex h-20 w-20 items-center justify-center rounded-full bg-paper/85 shadow-sm backdrop-blur-sm">
          <CurvedLoop text="AMEE J. PATEL · SINCE 2012" size={80} />
        </div>

        <div className="absolute inset-x-0 bottom-0 overflow-hidden rounded-b-[1.6rem]">
          {/* Real progressive (gaussian) blur, not a single masked layer.
              One backdrop-blur layer masked by a gradient is what produced
              the visible seam earlier -- the mask has one transition edge,
              and the browser renders that edge as a hard discontinuity in
              the blurred output even though the mask itself is soft. The
              fix used elsewhere (iOS-style progressive blur) is to stack
              several blur strengths, each masked to start a little later
              than the last, so many soft, overlapping transitions replace
              the one hard one -- no single edge is ever visible. */}
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 35%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 35%)",
            }}
          />
          <div
            className="absolute inset-0 backdrop-blur-[6px]"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 15%, black 50%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 15%, black 50%)",
            }}
          />
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 30%, black 65%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 30%, black 65%)",
            }}
          />
          <div
            className="absolute inset-0 backdrop-blur-xl"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 45%, black 80%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 45%, black 80%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/65 via-50% to-paper/20" />

          <div className="relative p-5 pt-8 sm:p-6 sm:pt-10">
            <div className="flex items-center justify-between">
              <p className="font-spec text-[10px] tracking-widest text-ink uppercase">
                Amee J. Patel · Studio Spec Sheet
              </p>
              <CMYKSwatch size="sm" />
            </div>

            <p className="mt-4 text-xs font-semibold tracking-wide text-ink uppercase">Tool Kit</p>
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
              <span className="max-w-[8rem] text-right font-spec text-[10px] tracking-wide text-ink uppercase">
                Years — Print-Ready Every Time
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
