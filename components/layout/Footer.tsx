import Link from "next/link";
import { siteMeta } from "@/lib/constants/site-copy";
import { whatsappLink } from "@/lib/utils";
import { LiveClock } from "@/components/motifs/LiveClock";
import { BackToTop } from "./BackToTop";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#pharma", label: "Pharma" },
  { href: "#portfolio", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

/** CMYK brush-stroke cluster — hand-tuned SVG paths that read as
 *  real paint sweeps, placed absolutely over the dark footer CTA band.
 *  Colors are literal CMYK inks: Cyan, Magenta, Yellow, Key (black). */
function BrushStrokes() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 480 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // -inset-x cancels the CTA band's own gutter (added so its headline
      // aligns with every other section) so this background art keeps
      // bleeding to the band's true edge, same as before that change.
      className="pointer-events-none absolute -inset-x-5 inset-y-0 h-full sm:-inset-x-8"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* A soft gaussian blur turns these paths from flat, hard-edged
          vector blobs into something closer to an actual brush/paint
          sweep — per visual-critic feedback that the crisp circular
          silhouettes and visible overlap seams read as placeholder-grade
          rather than an intentional illustration. */}
      <defs>
        <filter id="footer-brush-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <g filter="url(#footer-brush-soften)">
      {/* Cyan broad diagonal sweep */}
      <path
        d="M 320 -10 Q 390 60 460 40 Q 500 30 510 80 Q 500 130 420 120 Q 340 110 310 50 Z"
        fill="#00a3e0"
        opacity="0.75"
      />
      {/* Magenta thick arc */}
      <path
        d="M 360 60 Q 440 30 490 90 Q 510 140 460 160 Q 400 175 360 130 Q 330 100 360 60 Z"
        fill="#ec008c"
        opacity="0.68"
      />
      {/* Yellow bold slash */}
      <path
        d="M 380 120 Q 450 90 490 150 Q 510 190 470 210 Q 420 228 390 185 Q 365 155 380 120 Z"
        fill="#ffd100"
        opacity="0.80"
      />
      {/* Black/ink bold anchor stroke */}
      <path
        d="M 410 170 Q 470 145 500 200 Q 516 235 488 258 Q 450 278 418 248 Q 388 218 410 170 Z"
        fill="#1d1d1f"
        opacity="0.55"
      />
      {/* Second cyan thin smear */}
      <path
        d="M 340 200 Q 400 180 440 230 Q 460 255 430 275 Q 395 295 360 268 Q 330 244 340 200 Z"
        fill="#00a3e0"
        opacity="0.55"
      />
      </g>
    </svg>
  );
}

export function Footer() {
  return (
    <footer>
      {/* ── Zone A: CTA Band ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-ink px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <BrushStrokes />

        {/* Italic handwriting tagline — top-right on desktop */}
        <p
          aria-hidden
          className="pointer-events-none absolute top-8 right-8 hidden font-display text-sm italic text-paper/50 lg:block"
          style={{ transform: "rotate(-4deg)", letterSpacing: "0.01em" }}
        >
          Good Design.<br />Better Brands.
        </p>

        <div className="relative mx-auto max-w-7xl">
          {/* Main CTA headline */}
          <p className="font-spec text-[11px] font-bold tracking-widest text-paper/70 uppercase">
            Turn your ideas into real products
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.0] tracking-tight text-paper sm:text-5xl lg:text-6xl xl:text-7xl">
            Let&apos;s Create<br />
            Something{" "}
            <span className="text-accent">Amazing.</span>
          </h2>
          <p className="mt-5 max-w-md text-base text-paper/75 sm:text-lg">
            Have a packaging, branding or print project in mind?
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-accent hover:text-paper hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              Start a Project ↗
            </Link>
            <a
              href={whatsappLink(siteMeta.whatsapp, siteMeta.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-[#25D366]/15 px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-[#25D366]/25 hover:border-[#25D366]/50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <p className="mt-6 text-sm text-paper/65">
            Or write to{" "}
            <a
              href={`mailto:${siteMeta.email}`}
              className="font-medium text-paper underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {siteMeta.email}
            </a>
          </p>

          {/* Stats strip */}
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-paper/10 pt-10">
            {[
              { v: "10+", l: "Years in Design" },
              { v: "2001", l: "Print Industry Roots" },
              { v: "100%", l: "Remote-Ready Worldwide" },
            ].map(({ v, l }) => (
              <div key={l}>
                <p className="font-display text-2xl font-bold text-paper">{v}</p>
                <p className="mt-0.5 text-xs text-paper/65 uppercase tracking-wide">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Zone B: Info Strip ───────────────────────────────────────── */}
      <div className="bg-[#141414] px-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 py-8">
          {/* Brand */}
          <div>
            <Link
              href="#home"
              className="font-display text-lg font-semibold text-paper hover:text-accent transition-colors"
            >
              {siteMeta.name}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-0.5 font-spec text-[10px] tracking-widest text-paper/60 uppercase">
              Graphic Designer · Ahmedabad · Worldwide
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-sm text-xs font-medium text-paper/65 uppercase tracking-wide transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social + clock */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${siteMeta.email}`}
              aria-label="Email"
              className="text-paper/60 hover:text-paper transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a
              href={whatsappLink(siteMeta.whatsapp, siteMeta.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="text-paper/60 hover:text-[#25D366] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <span className="font-spec text-[10px] text-paper/55 uppercase tracking-wide">
              <LiveClock />
            </span>
            <BackToTop />
          </div>
        </div>

        {/* Copyright */}
        <div className="-mx-5 border-t border-paper/10 px-5 sm:-mx-8 sm:px-8">
          <p className="mx-auto max-w-7xl py-4 text-[11px] text-paper/50">
            © {new Date().getFullYear()} {siteMeta.name}. All work shown remains the property of its respective brand owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
