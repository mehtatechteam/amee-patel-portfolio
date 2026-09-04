/**
 * One generic, illustrative carton dieline diagram — the universal
 * cut/crease/bleed color convention (red solid = cut, green dashed =
 * crease/score, cyan dotted = bleed), not a reproduction of any specific
 * real client's actual production file. Deliberately not mapped 1:1 to
 * any of the real named pharma products shown elsewhere in this section —
 * this project's own documented discipline (docs/client-requirements.md)
 * is to never present an unconfirmed technical spec as fact about a real
 * client's real product.
 */
export function DielineDiagram() {
  return (
    <div className="rounded-3xl border border-line bg-paper p-6 sm:p-10 shadow-xs">
      <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-spec text-[11px] font-bold tracking-widest text-ink uppercase">
            CAD Prepress Dieline Architecture
          </span>
        </div>
        <span className="font-spec text-[10px] text-ink-soft tracking-wider uppercase">
          Standard Straight-Tuck Carton (STE)
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-line bg-[#fdfcf9] p-4 sm:p-6">
        <svg
          viewBox="0 0 460 280"
          className="mx-auto w-full max-w-xl select-none"
          role="img"
          aria-label="High-precision illustrative carton dieline blueprint"
        >
          {/* Subtle Drafting Grid */}
          <defs>
            <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ebe8e0" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cad-grid)" />

          {/* Bleed boundary (cyan dotted, offset by 3mm) */}
          <rect
            x="32"
            y="16"
            width="346"
            height="238"
            fill="none"
            stroke="#00a3e0"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />

          {/* Glue tab (left edge) */}
          <path d="M 40 50 L 25 65 L 25 185 L 40 200 Z" fill="#f4f1ea" stroke="#ef4444" strokeWidth="1.5" />
          <line x1="40" y1="50" x2="40" y2="200" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* Main 4 Carton Panels: Side, Front, Side, Back */}
          {/* Panel 1: Left Side (75mm x 150mm) */}
          <rect x="40" y="50" width="75" height="150" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          {/* Panel 2: Front Face (95mm x 150mm) */}
          <rect x="115" y="50" width="95" height="150" fill="rgba(245, 71, 28, 0.02)" stroke="#ef4444" strokeWidth="1.5" />
          {/* Panel 3: Right Side (75mm x 150mm) */}
          <rect x="210" y="50" width="75" height="150" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          {/* Panel 4: Back Face (95mm x 150mm) */}
          <rect x="285" y="50" width="85" height="150" fill="none" stroke="#ef4444" strokeWidth="1.5" />

          {/* Crease/Score fold lines (dashed green) */}
          <line x1="115" y1="50" x2="115" y2="200" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="210" y1="50" x2="210" y2="200" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="285" y1="50" x2="285" y2="200" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* Horizontal crease lines separating body from top/bottom tuck flaps */}
          <line x1="40" y1="50" x2="370" y2="50" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="40" y1="200" x2="370" y2="200" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* Top Main Tuck Flap (over Front Panel) */}
          <path d="M 115 50 L 125 22 Q 162.5 18 200 22 L 210 50 Z" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          {/* Top Dust Flaps (Side Panels) */}
          <path d="M 40 50 L 50 32 L 105 32 L 115 50 Z" fill="none" stroke="#ef4444" strokeWidth="1.2" />
          <path d="M 210 50 L 220 32 L 275 32 L 285 50 Z" fill="none" stroke="#ef4444" strokeWidth="1.2" />

          {/* Bottom Main Tuck Flap */}
          <path d="M 115 200 L 125 228 Q 162.5 232 200 228 L 210 200 Z" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          {/* Bottom Dust Flaps */}
          <path d="M 40 200 L 50 218 L 105 218 L 115 200 Z" fill="none" stroke="#ef4444" strokeWidth="1.2" />
          <path d="M 210 200 L 220 218 L 275 218 L 285 200 Z" fill="none" stroke="#ef4444" strokeWidth="1.2" />

          {/* Dimension Guidelines & Arrows (Swiss Architectural Spec) */}
          {/* Width Dimension */}
          <line x1="115" y1="125" x2="210" y2="125" stroke="#1d1d1f" strokeWidth="0.8" />
          <polygon points="115,125 120,123 120,127" fill="#1d1d1f" />
          <polygon points="210,125 205,123 205,127" fill="#1d1d1f" />
          <text x="162.5" y="120" textAnchor="middle" fill="#1d1d1f" fontSize="9" fontFamily="monospace" fontWeight="600">
            W: 95 mm
          </text>

          {/* Height Dimension */}
          <line x1="162.5" y1="50" x2="162.5" y2="200" stroke="#1d1d1f" strokeWidth="0.8" strokeDasharray="3 2" />
          <polygon points="162.5,50 160.5,55 164.5,55" fill="#1d1d1f" />
          <polygon points="162.5,200 160.5,195 164.5,195" fill="#1d1d1f" />
          <text x="175" y="160" fill="#1d1d1f" fontSize="9" fontFamily="monospace" fontWeight="600">
            H: 150 mm
          </text>

          {/* Panel labels */}
          <text x="77.5" y="95" textAnchor="middle" fill="#86868b" fontSize="8" fontFamily="monospace">SIDE</text>
          <text x="162.5" y="95" textAnchor="middle" fill="#f5471c" fontSize="8" fontFamily="monospace" fontWeight="bold">FRONT</text>
          <text x="247.5" y="95" textAnchor="middle" fill="#86868b" fontSize="8" fontFamily="monospace">SIDE</text>
          <text x="327.5" y="95" textAnchor="middle" fill="#86868b" fontSize="8" fontFamily="monospace">BACK</text>

          {/* Registration marks at top-right & bottom-right */}
          <circle cx="415" cy="40" r="10" fill="none" stroke="#1d1d1f" strokeWidth="0.8" />
          <line x1="415" y1="26" x2="415" y2="54" stroke="#1d1d1f" strokeWidth="0.8" />
          <line x1="401" y1="40" x2="429" y2="40" stroke="#1d1d1f" strokeWidth="0.8" />
          <circle cx="415" cy="220" r="10" fill="none" stroke="#1d1d1f" strokeWidth="0.8" />
          <line x1="415" y1="206" x2="415" y2="234" stroke="#1d1d1f" strokeWidth="0.8" />
          <line x1="401" y1="220" x2="429" y2="220" stroke="#1d1d1f" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 font-spec text-[11px] tracking-wide text-ink uppercase">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[#ef4444]" /> Solid: Die-Cut Edge
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 border-t-2 border-dashed border-[#10b981]" /> Dashed: Score / Fold Crease
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 border-t-2 border-dotted border-[#00a3e0]" /> Dotted: 3mm Bleed Safety Margin
        </span>
      </div>

      <p className="mx-auto mt-4 max-w-lg text-center text-xs leading-relaxed text-ink-soft">
        Prepress standard schematic: every commercial carton is mathematically mapped with exact fold scores,
        tuck clearances, and bleed margins to guarantee zero printer rejection.
      </p>
    </div>
  );
}
