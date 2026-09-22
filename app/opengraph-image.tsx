import { ImageResponse } from "next/og";

export const alt =
  "Amee Patel — Graphic Designer. Print-ready packaging, pharmaceutical packaging, brand identity & brochures. Ahmedabad, India · Worldwide.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1d1d1f";
const PAPER = "#fcfcfa";
const ACCENT = "#f5471c";
const CYAN = "#00a3e0";
const MAGENTA = "#ec008c";
const YELLOW = "#ffd100";

// Vercel's documented next/og recipe for pulling a real Google Font into
// an ImageResponse — falls back to the default Satori font if the fetch
// fails (e.g. no network at build time), so this never breaks the build.
async function loadGoogleFont(font: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (match) {
    const res = await fetch(match[1]);
    if (res.ok) return res.arrayBuffer();
  }
  throw new Error("font fetch failed");
}

export default async function Image() {
  const headline = "AMEE PATEL.";
  const tagline = "Creative Design. Print-Ready Perfection.";
  const text = `${headline}${tagline}GRAPHIC DESIGNER · AHMEDABAD, INDIA · WORLDWIDE`;

  let fonts: { name: string; data: ArrayBuffer; weight: 400 | 700 | 800; style: "normal" }[] = [];
  try {
    const [bold, medium] = await Promise.all([
      loadGoogleFont("Bricolage+Grotesque", 800, text),
      loadGoogleFont("Space+Mono", 400, text),
    ]);
    fonts = [
      { name: "Bricolage Grotesque", data: bold, weight: 800, style: "normal" },
      { name: "Space Mono", data: medium, weight: 400, style: "normal" },
    ];
  } catch {
    fonts = [];
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "72px 80px",
          fontFamily: fonts.length ? "Bricolage Grotesque" : undefined,
        }}
      >
        {/* Top row: CMYK registration dots + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {[CYAN, MAGENTA, YELLOW, INK].map((c) => (
              <div
                key={c}
                style={{ width: 14, height: 14, borderRadius: 999, background: c }}
              />
            ))}
          </div>
          <div
            style={{
              fontFamily: fonts.length ? "Space Mono" : undefined,
              fontSize: 22,
              letterSpacing: 4,
              color: INK,
              opacity: 0.6,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Freelance Graphic Designer · 10+ Years
          </div>
        </div>

        {/* Main wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              lineHeight: 1,
              color: INK,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            AMEE PATEL
            <span style={{ color: ACCENT }}>.</span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              fontWeight: 800,
              color: ACCENT,
              display: "flex",
            }}
          >
            Creative Design. Print-Ready Perfection.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${INK}1f`,
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontFamily: fonts.length ? "Space Mono" : undefined,
              fontSize: 24,
              letterSpacing: 2,
              color: INK,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Graphic Designer · Ahmedabad, India · Worldwide
          </div>
          <div
            style={{
              fontFamily: fonts.length ? "Space Mono" : undefined,
              fontSize: 24,
              color: INK,
              opacity: 0.55,
              display: "flex",
            }}
          >
            ameepatel.co.in
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
