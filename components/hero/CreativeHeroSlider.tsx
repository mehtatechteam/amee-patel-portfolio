"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface SlideData {
  id: string;
  badge: string;
  headingLines: string[];
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  theme: string;
}

const slides: SlideData[] = [
  {
    id: "creativity-growth",
    badge: "10+ Years · Graphic & Packaging Designer",
    headingLines: ["CREATIVITY", "POWERED", "GROWTH"],
    description:
      "Transforming concepts into high-impact packaging, regulatory pharmaceutical cartons, and brand identities with studio-grade precision.",
    ctaText: "Discover More",
    ctaHref: "#portfolio",
    secondaryCtaText: "Let's Talk",
    secondaryCtaHref: "#contact",
    theme: "creative-growth",
  },
  {
    id: "big-ideas-wins",
    badge: "Brand Identity · Print Literature",
    headingLines: ["TURN BIG IDEAS", "INTO BIG WINS"],
    description:
      "From herbal retail boxes and medical syrup packaging to luxury real estate brochures — engineered to captivate and sell.",
    ctaText: "View Packaging Range",
    ctaHref: "#portfolio",
    secondaryCtaText: "About Me",
    secondaryCtaHref: "#about",
    theme: "big-wins",
  },
  {
    id: "print-ready",
    badge: "Technical Precision · Production Ready",
    headingLines: ["PRINT-READY", "PERFECTION"],
    description:
      "Zero headache for your printer. Every file is delivered with exact dielines, proper bleeds, CMYK profiles, and vector-sharp accuracy.",
    ctaText: "Explore Portfolio",
    ctaHref: "#portfolio",
    secondaryCtaText: "Our Process",
    secondaryCtaHref: "#process",
    theme: "print-perfection",
  },
];

export function CreativeHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPaused, reducedMotion, nextSlide]);

  // Interactive mouse parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const slide = slides[currentSlide];

  return (
    <div
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsPaused(false);
      }}
      onMouseEnter={() => setIsPaused(true)}
      className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] w-full overflow-hidden bg-[#faf8f5] border-b border-line/40 select-none flex flex-col justify-between"
    >
      {/* 1. Graph Paper Grid / Notebook Texture Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Left red notebook margin rule */}
      <div
        className="absolute top-0 bottom-0 left-8 sm:left-16 w-[1.5px] bg-red-400/25 pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Hand-Drawn Animated Background Doodle Sketches (Light gray blueprint lines) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
          {/* Laptop sketch top-left */}
          <path d="M120,120 L210,120 L210,180 L120,180 Z M100,180 L230,180 L240,195 L90,195 Z" />
          <path d="M150,140 L180,140 M165,150 L180,150" strokeDasharray="3 3" />

          {/* Lightbulb sketch */}
          <g transform="translate(680, 80) scale(0.9)">
            <path d="M30,10 C15,10 5,22 5,35 C5,45 15,55 18,65 L42,65 C45,55 55,45 55,35 C55,22 45,10 30,10 Z" />
            <path d="M20,68 L40,68 M22,74 L38,74 M25,80 L35,80" />
            <path d="M30,0 L30,6 M5,20 L0,17 M55,20 L60,17 M45,3 L48,0 M15,3 L12,0" />
            {/* Filament */}
            <path d="M24,40 L28,28 L32,40 L36,28" />
          </g>

          {/* Gears / Idea Cogwheels */}
          <g transform="translate(60, 240) scale(0.8)">
            <circle cx="40" cy="40" r="20" />
            <path d="M40,10 L40,16 M40,64 L40,70 M10,40 L16,40 M64,40 L70,40 M19,19 L23,23 M57,57 L61,61 M19,61 L23,57 M57,19 L61,23" strokeWidth="2.5" />
          </g>

          {/* Coffee Mug & Steam */}
          <g transform="translate(940, 150) scale(0.85)">
            <path d="M20,30 L20,70 C20,80 35,85 50,85 C65,85 80,80 80,70 L80,30 Z" />
            <path d="M80,40 C95,40 95,65 80,65" />
            <path d="M35,22 C32,15 38,10 35,2 M50,22 C47,15 53,10 50,2 M65,22 C62,15 68,10 65,2" />
          </g>

          {/* Rocket Blueprint Trail (top-right to mid) */}
          <g transform="translate(1080, 220) scale(0.9)">
            <path d="M0,80 Q40,40 100,0" strokeDasharray="6 6" strokeWidth="2" />
            <path d="M90,30 L100,0 L70,10" />
          </g>

          {/* Target Bullseye / Arrow */}
          <g transform="translate(540, 420) scale(0.8)">
            <circle cx="40" cy="40" r="30" />
            <circle cx="40" cy="40" r="20" />
            <circle cx="40" cy="40" r="8" fill="currentColor" opacity="0.4" />
          </g>

          {/* Flowchart Boxes */}
          <g transform="translate(140, 480) scale(0.85)">
            <rect x="0" y="0" width="70" height="35" rx="6" />
            <path d="M70,18 L110,18 M105,13 L110,18 L105,23" />
            <rect x="110" y="0" width="70" height="35" rx="6" />
            <path d="M145,35 L145,70 M140,65 L145,70 L150,65" />
            <rect x="110" y="70" width="70" height="35" rx="6" />
          </g>

          {/* Sparkles / Starbursts */}
          <g transform="translate(850, 480)">
            <path d="M20,0 L20,40 M0,20 L40,20 M6,6 L34,34 M6,34 L34,6" strokeWidth="1.2" />
          </g>
        </g>
      </svg>

      {/* 3. Main Slide Content & Floating Animated Objects */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 pt-16 sm:pt-24 pb-12 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Bold Typography & CTAs */}
          <div className="lg:col-span-7 z-20">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-1.5 text-xs font-semibold tracking-wide text-ink shadow-sm border border-line">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              {slide.badge}
            </div>

            {/* Huge Bold Headline (Matching Brainwaves style) */}
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-ink text-4xl sm:text-6xl lg:text-[4.25rem] leading-[1.08]">
              {slide.headingLines.map((line, i) => (
                <span
                  key={i}
                  className={cn(
                    "block transition-all duration-500",
                    i === 0 ? "text-ink" : "",
                    i === 1 && slide.theme === "creative-growth" ? "text-ink" : "",
                    i === 2 ? "text-accent" : ""
                  )}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-ink-soft">
              {slide.description}
            </p>

            {/* Action Links / Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={slide.ctaHref}
                className="group relative inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-body text-sm font-bold text-paper shadow-lg transition-all duration-300 hover:scale-105 hover:bg-accent"
              >
                <span>{slide.ctaText}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href={slide.secondaryCtaHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-paper/80 px-7 py-4 text-sm font-semibold text-ink backdrop-blur-sm transition-all duration-300 hover:border-ink hover:bg-paper"
              >
                <span>{slide.secondaryCtaText}</span>
              </Link>
            </div>

            {/* Sub-features ticker / Trust markers */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-line/60 pt-6 text-xs text-ink-faint">
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink">✓</span> 100% Print-Ready Guarantee
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink">✓</span> Precision Packaging Dielines
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink">✓</span> Quick WhatsApp Collaboration
              </div>
            </div>
          </div>

          {/* Right Column: Creative Animated 3D Floating Illustrations */}
          <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] flex items-center justify-center">
            {/* SLIDE 1: Pencil Rocket + Binder Clip + Yellow Crumpled Note + Shavings */}
            {slide.theme === "creative-growth" && (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 1. Floating Binder Clip (Left) */}
                <div
                  className="absolute left-0 top-12 sm:left-4 z-20 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * -25}px, ${mousePos.y * -25}px, 0)`,
                  }}
                >
                  <div className="animate-float">
                    <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-[0_20px_25px_rgba(0,0,0,0.25)]">
                      {/* Chrome wire arms */}
                      <path d="M35,15 L35,45 M65,15 L65,45" stroke="#71717a" strokeWidth="5" strokeLinecap="round" />
                      <path d="M35,15 Q50,5 65,15" stroke="#a1a1aa" strokeWidth="5" fill="none" strokeLinecap="round" />
                      {/* Black triangular body */}
                      <polygon points="20,45 80,45 60,85 40,85" fill="#18181b" />
                      {/* Shiny bevel highlights */}
                      <line x1="22" y1="47" x2="78" y2="47" stroke="#3f3f46" strokeWidth="2" />
                      <polygon points="40,85 60,85 50,88" fill="#09090b" />
                    </svg>
                  </div>
                </div>

                {/* 2. Rocket Pencil Blasting Off (Center-Right) */}
                <div
                  className="relative z-30 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 35}px, 0) rotate(-25deg)`,
                  }}
                >
                  <div className="animate-float-slow flex flex-col items-center">
                    {/* Hand-drawn rocket nozzle flame & smoke trail */}
                    <div className="relative mb-2">
                      <svg width="220" height="300" viewBox="0 0 160 260" className="drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)]">
                        {/* Drawn rocket trail fins */}
                        <path d="M30,180 Q80,240 80,260 Q80,240 130,180" fill="none" stroke="#e4e4e7" strokeWidth="3" strokeDasharray="4 4" />
                        <path d="M20,130 L45,160 L45,110 Z" fill="#ef4444" opacity="0.9" />
                        <path d="M140,130 L115,160 L115,110 Z" fill="#ef4444" opacity="0.9" />

                        {/* Yellow Wooden Pencil Body */}
                        <rect x="45" y="30" width="70" height="130" fill="#facc15" rx="3" />
                        <rect x="68" y="30" width="24" height="130" fill="#eab308" />
                        <line x1="45" y1="30" x2="45" y2="160" stroke="#ca8a04" strokeWidth="2" />
                        <line x1="115" y1="30" x2="115" y2="160" stroke="#ca8a04" strokeWidth="2" />

                        {/* Sharpened Wood Cone & Graphite Lead Tip */}
                        <polygon points="45,30 115,30 80,-15" fill="#fde68a" />
                        <polygon points="70,5 90,5 80,-15" fill="#18181b" />

                        {/* Metal Ferrule & Pink Eraser at bottom */}
                        <rect x="45" y="160" width="70" height="20" fill="#a1a1aa" />
                        <line x1="45" y1="168" x2="115" y2="168" stroke="#71717a" strokeWidth="2" />
                        <path d="M45,180 L115,180 C115,200 45,200 45,180 Z" fill="#f472b6" />

                        {/* Flame blast particles */}
                        <circle cx="80" cy="215" r="8" fill="#f97316" className="animate-ping" />
                        <circle cx="70" cy="235" r="6" fill="#facc15" />
                        <circle cx="90" cy="230" r="5" fill="#facc15" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 3. Floating Yellow Crumpled Paper Note (Bottom-Left) */}
                <div
                  className="absolute left-6 bottom-4 sm:left-12 sm:bottom-6 z-20 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, 0) rotate(12deg)`,
                  }}
                >
                  <div className="animate-float-delayed">
                    <svg width="90" height="90" viewBox="0 0 100 100" className="drop-shadow-[0_15px_20px_rgba(0,0,0,0.18)]">
                      {/* Crumpled Sticky Note */}
                      <path
                        d="M20,20 Q35,10 60,15 Q85,20 80,45 Q75,70 60,80 Q45,90 25,80 Q10,70 15,45 Z"
                        fill="#fde047"
                      />
                      <path d="M25,25 L45,45 L70,30 M30,55 L55,60 L75,70" stroke="#ca8a04" strokeWidth="2" fill="none" opacity="0.6" />
                      <polygon points="35,35 60,40 50,60" fill="#facc15" opacity="0.8" />
                    </svg>
                  </div>
                </div>

                {/* 4. Floating Pencil Shavings (Top-Right) */}
                <div
                  className="absolute right-4 top-2 sm:right-10 z-10 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0) rotate(-15deg)`,
                  }}
                >
                  <svg width="70" height="70" viewBox="0 0 80 80" className="drop-shadow-md opacity-80">
                    <path d="M10,40 Q40,10 70,40 Q40,70 10,40" fill="#fed7aa" stroke="#ca8a04" strokeWidth="1.5" />
                    <path d="M20,40 Q40,20 60,40" fill="#fdba74" />
                    <path d="M10,40 Q25,25 35,40" fill="#78350f" />
                  </svg>
                </div>
              </div>
            )}

            {/* SLIDE 2: Leaping Cheetah / Creative Mascot + Golden Portal + Earphones + Botanical Leaf */}
            {slide.theme === "big-wins" && (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 1. Golden Gateway Arch Portal with Leaping Mascot */}
                <div
                  className="relative z-20 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0)`,
                  }}
                >
                  <div className="animate-float relative">
                    {/* Golden Door Frame */}
                    <svg width="240" height="280" viewBox="0 0 160 220" className="drop-shadow-[0_25px_40px_rgba(0,0,0,0.3)]">
                      {/* Door outer molding */}
                      <rect x="20" y="20" width="120" height="190" fill="#fff" stroke="#d97706" strokeWidth="6" rx="4" />
                      <rect x="28" y="28" width="104" height="174" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
                      {/* Open Door Perspective Panel */}
                      <polygon points="28,28 85,10 85,200 28,202" fill="#d97706" />
                      <polygon points="35,35 80,18 80,192 35,195" fill="#f59e0b" />
                      {/* Door Handle */}
                      <circle cx="75" cy="110" r="4" fill="#78350f" />
                    </svg>

                    {/* Leaping dynamic cheetah/creative animal badge */}
                    <div className="absolute top-10 -left-8 sm:-left-12 z-30 w-44 sm:w-52 transform -rotate-12 drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)]">
                      <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 p-4 text-white shadow-xl flex items-center gap-3">
                        <span className="text-3xl">🐆</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-amber-100">Bold & Dynamic</p>
                          <p className="text-sm font-extrabold">Creative Impact</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Floating Botanical Green Leaf (Organic Packaging symbol) */}
                <div
                  className="absolute left-2 top-8 sm:left-4 z-30 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * -35}px, ${mousePos.y * -35}px, 0) rotate(24deg)`,
                  }}
                >
                  <div className="animate-float">
                    <svg width="75" height="75" viewBox="0 0 100 100" className="drop-shadow-[0_15px_20px_rgba(16,185,129,0.3)]">
                      <path
                        d="M20,80 Q30,30 80,20 Q70,70 20,80 Z"
                        fill="#10b981"
                      />
                      <path d="M20,80 Q50,50 80,20" stroke="#047857" strokeWidth="3" fill="none" />
                      <path d="M35,65 Q50,60 55,68 M50,50 Q65,45 70,53" stroke="#047857" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>

                {/* 3. Floating Coiled Studio Earphones (Bottom-Left) */}
                <div
                  className="absolute left-4 bottom-2 sm:left-8 sm:bottom-4 z-20 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)`,
                  }}
                >
                  <svg width="110" height="110" viewBox="0 0 120 120" className="drop-shadow-lg opacity-90">
                    <circle cx="60" cy="60" r="45" stroke="#e4e4e7" strokeWidth="4" fill="none" />
                    <circle cx="60" cy="60" r="35" stroke="#d4d4d8" strokeWidth="4" fill="none" />
                    {/* Earphone earbuds */}
                    <circle cx="35" cy="40" r="8" fill="#ffffff" stroke="#71717a" strokeWidth="2" />
                    <circle cx="75" cy="35" r="8" fill="#ffffff" stroke="#71717a" strokeWidth="2" />
                    <rect x="56" y="85" width="8" height="18" rx="2" fill="#71717a" />
                  </svg>
                </div>

                {/* 4. Luxury Fountain Pen (Top-Right) */}
                <div
                  className="absolute right-2 top-4 sm:right-6 z-20 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 30}px, 0) rotate(45deg)`,
                  }}
                >
                  <svg width="60" height="130" viewBox="0 0 40 120" className="drop-shadow-xl">
                    <rect x="12" y="30" width="16" height="70" rx="3" fill="#09090b" stroke="#f59e0b" strokeWidth="1.5" />
                    <polygon points="12,30 28,30 20,5" fill="#f59e0b" />
                    <line x1="20" y1="5" x2="20" y2="25" stroke="#78350f" strokeWidth="1.5" />
                    <circle cx="20" cy="20" r="1.5" fill="#78350f" />
                  </svg>
                </div>
              </div>
            )}

            {/* SLIDE 3: Print-Ready 3D Packaging Showcases + Dieline Guides */}
            {slide.theme === "print-perfection" && (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 1. Organic Amla Box Floating (Left) */}
                <div
                  className="absolute left-2 top-8 sm:left-4 z-20 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * -25}px, ${mousePos.y * -25}px, 0) rotate(-6deg)`,
                  }}
                >
                  <div className="animate-float">
                    <div className="relative w-36 sm:w-44 aspect-[2/3] overflow-hidden rounded-2xl bg-paper shadow-[0_25px_40px_rgba(0,0,0,0.25)] border-2 border-emerald-600/30">
                      <Image
                        src="/portfolio/packaging/organic-amla-powder-box.png"
                        alt="Organic Amla Box"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 150px, 180px"
                      />
                      <span className="absolute bottom-2 left-2 rounded-full bg-emerald-950/80 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur">
                        Herbal Box
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Paracetamol Tablets IP 500mg Box Floating (Center-Right) */}
                <div
                  className="relative z-30 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 30}px, 0) rotate(4deg)`,
                  }}
                >
                  <div className="animate-float-slow">
                    <div className="relative w-48 sm:w-60 aspect-[5/4] overflow-hidden rounded-2xl bg-paper shadow-[0_30px_50px_rgba(0,0,0,0.3)] border-2 border-sky-600/30">
                      <Image
                        src="/portfolio/packaging/paracetamol-tablets-blue-box.png"
                        alt="Paracetamol Tablets IP 500 mg Box"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 200px, 240px"
                      />
                      <span className="absolute bottom-2 left-2 rounded-full bg-sky-950/80 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur">
                        Pharma Range
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. CMYK Swatch & Precision Dieline Badge */}
                <div
                  className="absolute right-4 bottom-2 sm:right-8 sm:bottom-6 z-40 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`,
                  }}
                >
                  <div className="rounded-2xl bg-paper/95 p-3.5 shadow-xl border border-line backdrop-blur flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-[#00e5ff]" title="Cyan" />
                      <span className="h-3 w-3 rounded-full bg-[#ff007f]" title="Magenta" />
                      <span className="h-3 w-3 rounded-full bg-[#ffee00]" title="Yellow" />
                      <span className="h-3 w-3 rounded-full bg-[#111111]" title="Key Black" />
                      <span className="ml-2 font-mono text-[10px] font-bold text-ink">CMYK 300 DPI</span>
                    </div>
                    <div className="font-spec text-[9px] text-ink-faint uppercase tracking-wider">
                      Exact Bleeds & Creases
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Slider Controls (Circular Prev & Next Buttons matching Brainwaves) */}
      <button
        type="button"
        aria-label="Previous Slide"
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-paper/90 text-ink shadow-xl backdrop-blur-md border border-line/50 transition-all duration-300 hover:scale-110 hover:bg-ink hover:text-paper active:scale-95"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next Slide"
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-paper/90 text-ink shadow-xl backdrop-blur-md border border-line/50 transition-all duration-300 hover:scale-110 hover:bg-ink hover:text-paper active:scale-95"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* 5. Bottom Slide Progress Dots */}
      <div className="relative z-30 pb-6 flex items-center justify-center gap-2">
        {slides.map((s, index) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to slide ${index + 1}: ${s.headingLines.join(" ")}`}
            aria-current={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              index === currentSlide ? "w-10 bg-ink" : "w-2.5 bg-ink/20 hover:bg-ink/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
