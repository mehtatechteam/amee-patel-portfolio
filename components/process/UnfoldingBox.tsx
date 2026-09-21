"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FOLDING_STAGES = [
  {
    step: "01",
    title: "1. Flat CAD Dieline",
    navLabel: "Dieline",
    badge: "Vector Drafting",
    desc: "Mathematical mapping of all 4 panels, glue tabs, and tuck closures with exact 3mm bleed bounds.",
    detail: "Cutting edge (solid red) + Score lines (dashed green) + Bleed margin (dotted cyan).",
  },
  {
    step: "02",
    title: "2. Score & Crease Matrix",
    navLabel: "Crease",
    badge: "Paperboard Engineering",
    desc: "Precision scoring compresses the paperboard fibers so cartons fold crisply without cracking ink surfaces.",
    detail: "Calculated bend allowances for SBS 300–350 GSM board stocks.",
  },
  {
    step: "03",
    title: "3. Panel Fold & Glue Tab",
    navLabel: "Fold",
    badge: "Prepress Geometry",
    desc: "The 4 panels form the square body while the glue tab seals the side seam with calibrated adhesive margins.",
    detail: "Straight-tuck alignment ensures automatic high-speed erecting on production lines.",
  },
  {
    step: "04",
    title: "4. Assembled Retail Carton",
    navLabel: "Carton",
    badge: "Shelf Perfection",
    desc: "Tuck flaps lock securely into place, creating a rigid, protective, and visually flawless commercial pack.",
    detail: "100% printer-ready vector artwork with accurate CMYK color separations.",
  },
];

export function UnfoldingBox() {
  const [activeStage, setActiveStage] = useState(3); // default to final assembled carton

  const current = FOLDING_STAGES[activeStage];

  return (
    <div className="mt-12 overflow-hidden rounded-[2rem] border border-line bg-paper-raised shadow-xs">
      {/* Header bar */}
      <div className="border-b border-line/80 p-5 sm:p-7 lg:p-8">
        <div>
          <span className="font-spec text-[11px] font-bold tracking-widest text-accent uppercase">
            Interactive Production Lab
          </span>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            From Flat Dieline to Flawless Carton
          </h3>
        </div>

        {/* Stage selection buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {FOLDING_STAGES.map((s, i) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStage(i)}
              aria-pressed={activeStage === i}
              className={cn(
                "group rounded-2xl border p-3 text-left transition-all duration-200 active:scale-[0.98]",
                activeStage === i
                  ? "border-ink bg-ink text-paper shadow-[0_14px_28px_-20px_rgba(29,29,31,0.65)]"
                  : "border-line bg-paper text-ink-soft hover:border-ink/25 hover:text-ink",
              )}
            >
              <span className="font-spec text-[10px] font-bold tracking-widest uppercase opacity-70">Stage {s.step}</span>
              <span className="mt-1 block font-display text-base font-semibold tracking-tight">{s.navLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Display Area */}
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.75fr)]">
        {/* Visual Stage Container */}
        <div className="relative flex min-h-[24rem] items-center justify-center overflow-hidden border-b border-line/80 bg-paper p-5 sm:min-h-[31rem] sm:p-8 lg:min-h-[34rem] lg:border-r lg:border-b-0">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(245,71,28,0.08),transparent_34%),linear-gradient(#efece6_1px,transparent_1px),linear-gradient(90deg,#efece6_1px,transparent_1px)] bg-[length:100%_100%,28px_28px,28px_28px] opacity-55" />
          {/* STAGE 1: Flat CAD Dieline */}
          {activeStage === 0 && (
            <div className="relative z-10 w-full max-w-3xl">
              <svg viewBox="0 0 320 220" className="aspect-[16/11] w-full select-none drop-shadow-sm" role="img" aria-label="Stage 1 Dieline">
                <defs>
                  <pattern id="grid-stage-1" width="12" height="12" patternUnits="userSpaceOnUse">
                    <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#ebe7db" strokeWidth="0.75" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-stage-1)" />

                {/* Bleed outline */}
                <rect x="25" y="15" width="270" height="190" fill="none" stroke="#00a3e0" strokeWidth="1" strokeDasharray="3 3" />

                {/* 4 Panels */}
                <rect x="40" y="40" width="50" height="140" fill="#f5f3ec" stroke="#f5471c" strokeWidth="1.2" />
                <rect x="90" y="40" width="65" height="140" fill="rgba(245,71,28,0.06)" stroke="#f5471c" strokeWidth="1.2" />
                <rect x="155" y="40" width="50" height="140" fill="#f5f3ec" stroke="#f5471c" strokeWidth="1.2" />
                <rect x="205" y="40" width="60" height="140" fill="#f5f3ec" stroke="#f5471c" strokeWidth="1.2" />

                {/* Vertical crease lines */}
                <line x1="90" y1="40" x2="90" y2="180" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="155" y1="40" x2="155" y2="180" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="205" y1="40" x2="205" y2="180" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 2" />

                {/* Horizontal Creases */}
                <line x1="40" y1="40" x2="265" y2="40" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="40" y1="180" x2="265" y2="180" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 2" />

                {/* Tuck Flaps */}
                <path d="M 90 40 L 98 20 Q 122.5 15 147 20 L 155 40 Z" fill="none" stroke="#f5471c" strokeWidth="1.2" />
                <path d="M 90 180 L 98 200 Q 122.5 205 147 200 L 155 180 Z" fill="none" stroke="#f5471c" strokeWidth="1.2" />

                {/* Text Markers */}
                <text x="122.5" y="115" textAnchor="middle" fill="#f5471c" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  FRONT
                </text>
                <text x="65" y="115" textAnchor="middle" fill="#86868b" fontSize="8" fontFamily="monospace">
                  SIDE
                </text>
                <text x="180" y="115" textAnchor="middle" fill="#86868b" fontSize="8" fontFamily="monospace">
                  SIDE
                </text>
                <text x="235" y="115" textAnchor="middle" fill="#86868b" fontSize="8" fontFamily="monospace">
                  BACK
                </text>
              </svg>
            </div>
          )}

          {/* STAGE 2: Score & Crease Matrix */}
          {activeStage === 1 && (
            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center justify-center">
              <svg viewBox="0 0 300 200" className="aspect-[3/2] w-full select-none drop-shadow-sm" role="img" aria-label="Stage 2 Score Matrix">
                {/* Visualizing micro-crease indentation on board fibers */}
                <rect x="20" y="30" width="260" height="140" rx="8" fill="#f4f1ea" stroke="#d5d0c3" strokeWidth="1.5" />

                {/* Embossed Crease Indentation Lines */}
                <line x1="85" y1="30" x2="85" y2="170" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 2" />
                <line x1="150" y1="30" x2="150" y2="170" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 2" />
                <line x1="215" y1="30" x2="215" y2="170" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 2" />

                {/* Crease Annotation Callouts */}
                <circle cx="150" cy="100" r="16" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
                <text x="150" y="104" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  CREASE
                </text>

                <text x="150" y="145" textAnchor="middle" fill="#1d1d1f" fontSize="10" fontFamily="monospace">
                  Pre-Scored Folding Channel
                </text>
                <text x="150" y="160" textAnchor="middle" fill="#86868b" fontSize="8" fontFamily="monospace">
                  Zero fiber burst under high-speed pressure
                </text>
              </svg>
            </div>
          )}

          {/* STAGE 3: Panel Fold & Glue Tab */}
          {activeStage === 2 && (
            <div className="relative z-10 flex h-full w-full items-center justify-center [perspective:900px]">
              <div
                className="relative h-72 w-64 rounded-xl border-2 border-emerald-500/50 bg-[#ede9dd] p-4 shadow-[0_28px_70px_-34px_rgba(29,29,31,0.55)] sm:h-80 sm:w-72"
                style={{
                  transform: "rotateY(-25deg) rotateX(10deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex h-full flex-col justify-between border border-dashed border-ink/20 p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-spec text-[9px] text-emerald-700 font-bold">90° FOLD ANGLE</span>
                    <span className="font-spec text-[8px] text-ink-soft">GLUE TAB APPLIED</span>
                  </div>
                  <div className="my-auto text-center">
                    <p className="font-display text-sm font-semibold text-ink">Body Panel Alignment</p>
                    <p className="font-spec text-[10px] text-ink-soft mt-1">Calibrated Squareness</p>
                  </div>
                  <div className="h-2 w-full bg-emerald-500/20 rounded-xs flex items-center justify-center">
                    <span className="font-spec text-[7px] text-emerald-800 font-bold">ADHESIVE SEAM</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 4: Assembled Retail Carton */}
          {activeStage === 3 && (
            <div className="relative z-10 flex h-full w-full items-center justify-center">
              <div aria-hidden className="absolute bottom-[14%] h-16 w-[52%] rounded-full bg-ink/10 blur-2xl" />
              <div className="relative h-[22rem] w-[72%] max-w-[26rem] sm:h-[28rem] sm:w-[65%] lg:h-[30rem]">
                <Image
                  src="/portfolio/packaging/medween-pharma-box.webp"
                  alt="Medween pharma bottle box, assembled"
                  fill
                  className="object-contain drop-shadow-[0_32px_55px_rgba(29,29,31,0.22)]"
                  sizes="(min-width: 1024px) 420px, 70vw"
                />
              </div>
            </div>
          )}
        </div>

        {/* Narrative & Technical Callout */}
        <div className="flex flex-col justify-center gap-3 p-5 sm:p-7 lg:p-8">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-spec text-[10px] font-bold text-accent">
              {current.badge}
            </span>
            <span className="font-spec text-xs font-semibold text-ink-soft">
              Stage {current.step} of 04
            </span>
          </div>

          <h4 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {current.title}
          </h4>

          <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
            {current.desc}
          </p>

          <div className="mt-2 rounded-xl border border-line bg-paper p-3.5">
            <span className="block font-spec text-[10px] font-bold tracking-wider text-ink-soft uppercase">
              Prepress Verification
            </span>
            <p className="mt-1 font-spec text-xs text-ink">
              {current.detail}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-line bg-paper px-3 py-1 font-spec text-[11px] font-medium text-ink-soft">
              Exact Bleed (3mm)
            </span>
            <span className="rounded-full border border-line bg-paper px-3 py-1 font-spec text-[11px] font-medium text-ink-soft">
              Score & Crease Mapped
            </span>
            <span className="rounded-full border border-line bg-paper px-3 py-1 font-spec text-[11px] font-medium text-ink-soft">
              Zero Printer Rejection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
