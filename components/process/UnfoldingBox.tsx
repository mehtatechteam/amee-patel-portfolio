"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FOLDING_STAGES = [
  {
    step: "01",
    title: "1. Flat CAD Dieline",
    badge: "Vector Drafting",
    desc: "Mathematical mapping of all 4 panels, glue tabs, and tuck closures with exact 3mm bleed bounds.",
    detail: "Cutting edge (solid red) + Score lines (dashed green) + Bleed margin (dotted cyan).",
  },
  {
    step: "02",
    title: "2. Score & Crease Matrix",
    badge: "Paperboard Engineering",
    desc: "Precision scoring compresses the paperboard fibers so cartons fold crisp without cracking ink surfaces.",
    detail: "Calculated bend allowances for SBS 300–350 GSM board stocks.",
  },
  {
    step: "03",
    title: "3. Panel Fold & Glue Tab",
    badge: "Prepress Geometry",
    desc: "The 4 panels form the square body while the glue tab seals the side seam with calibrated adhesive margins.",
    detail: "Straight-tuck alignment ensures automatic high-speed erecting on production lines.",
  },
  {
    step: "04",
    title: "4. Assembled Retail Carton",
    badge: "Shelf Perfection",
    desc: "Tuck flaps lock securely into place, creating a rigid, protective, and visually flawless commercial pack.",
    detail: "100% printer-ready vector artwork with accurate CMYK color separations.",
  },
];

export function UnfoldingBox() {
  const [activeStage, setActiveStage] = useState(3); // default to final assembled carton

  const current = FOLDING_STAGES[activeStage];

  return (
    <div className="mt-12 rounded-3xl border border-line bg-paper-raised p-6 sm:p-10 shadow-xs">
      {/* Header bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line/80 pb-5">
        <div>
          <span className="font-spec text-[11px] font-bold tracking-widest text-accent uppercase">
            Interactive Production Lab
          </span>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            From Flat Dieline to Flawless Carton
          </h3>
        </div>

        {/* Stage selection buttons */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-ink/10 bg-paper p-1 shadow-xs">
          {FOLDING_STAGES.map((s, i) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStage(i)}
              aria-pressed={activeStage === i}
              className={cn(
                "rounded-full px-3 py-1.5 font-spec text-xs font-semibold transition-all",
                activeStage === i
                  ? "bg-ink text-paper shadow-sm"
                  : "text-ink-soft hover:text-ink hover:bg-paper-raised",
              )}
            >
              Stage {s.step}
            </button>
          ))}
        </div>
      </div>

      {/* Main Display Area */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {/* Visual Stage Container */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-line/80 bg-paper p-4 flex items-center justify-center">
          {/* STAGE 1: Flat CAD Dieline */}
          {activeStage === 0 && (
            <div className="h-full w-full p-2">
              <svg viewBox="0 0 320 220" className="h-full w-full select-none" role="img" aria-label="Stage 1 Dieline">
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
            <div className="h-full w-full p-3 flex flex-col items-center justify-center">
              <svg viewBox="0 0 300 200" className="h-full w-full select-none" role="img" aria-label="Stage 2 Score Matrix">
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
            <div className="h-full w-full p-3 flex items-center justify-center">
              <div
                className="relative h-48 w-44 rounded-lg border-2 border-emerald-500/50 bg-[#ede9dd] p-3 shadow-lg"
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
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="relative h-48 w-48 sm:h-56 sm:w-56">
                <Image
                  src="/portfolio/packaging/medween-pharma-box.png"
                  alt="Medween pharma bottle box, assembled"
                  fill
                  className="object-contain p-2 drop-shadow-xl"
                  sizes="(min-width: 1024px) 500px, 100vw"
                />
              </div>
            </div>
          )}
        </div>

        {/* Narrative & Technical Callout */}
        <div className="flex flex-col gap-3">
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

          <div className="rounded-xl border border-line bg-paper p-3.5 mt-2">
            <span className="block font-spec text-[10px] font-bold tracking-wider text-ink-soft uppercase">
              Prepress Verification
            </span>
            <p className="mt-1 font-spec text-xs text-ink">
              {current.detail}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-line bg-paper px-3 py-1 font-spec text-[11px] font-medium text-ink-soft">
              Exact Bleeds (3mm)
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
