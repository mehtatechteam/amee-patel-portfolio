"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePointerType } from "@/hooks/usePointerType";
import { whatsappLink } from "@/lib/utils";
import { siteMeta } from "@/lib/constants/site-copy";
import type { PortfolioItem } from "@/lib/constants/portfolio";
import { DielineDiagram } from "@/components/pharma/DielineDiagram";
import { Product3DBox } from "./Product3DBox";

const emptySubscribe = () => () => {};

const specChips = ["Print-Ready Vector / Raster", "Production Bleed & Dieline", "High-Resolution Output"];

const categoryLabel: Record<PortfolioItem["category"], string> = {
  packaging: "Packaging Design",
  "brand-literature": "Brand Literature",
  logos: "Logo & Branding",
};

export function ProjectModal({
  item,
  items,
  onClose,
  onSelect,
  initialViewMode = "photo",
}: {
  item: PortfolioItem | null;
  items?: PortfolioItem[];
  onClose: () => void;
  onSelect?: (item: PortfolioItem) => void;
  initialViewMode?: "photo" | "box" | "dieline";
}) {
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();
  const { isFinePointer } = usePointerType();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [loupe, setLoupe] = useState<{ x: number; y: number } | null>(null);
  const [finish, setFinish] = useState<"none" | "matte" | "spot-uv" | "foil">("none");
  // "dieline" shows the item's real production dieline when one has been
  // independently extracted and verified from the client's own source file
  // (item.dielineSrc — see docs/client-requirements.md's addendum on the
  // .cdr extraction pipeline), otherwise DielineDiagram falls back to one
  // generic illustrative CAD blueprint. Never an invented per-product
  // schematic. See docs/client-requirements.md's anti-fabrication rule.
  const [viewMode, setViewMode] = useState<"photo" | "box" | "dieline">(initialViewMode);
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Prepress inspection loupe — a real magnifying glass over the actual
  // photography (2.5x, tracking the cursor), not a claim about any
  // specific print spec. Desktop-only (fine pointer) and only in the
  // resting (non-zoomed) view, since the zoomed view already has its own
  // pan/zoom interaction and the two would fight over mouse position.
  const LOUPE_SIZE = 180;
  const LOUPE_ZOOM = 2.5;
  function onImageMouseMove(e: React.MouseEvent) {
    if (!isFinePointer || zoomed || !imageWrapRef.current) return;
    const rect = imageWrapRef.current.getBoundingClientRect();
    setLoupe({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }
  function onImageMouseLeave() {
    setLoupe(null);
  }

  // Reset zoom and viewMode when item changes
  const [prevItem, setPrevItem] = useState(item);
  if (item !== prevItem) {
    setPrevItem(item);
    setZoomed(false);
    setViewMode(initialViewMode);
  }

  const currentIndex = items && item ? items.findIndex((i) => i.slug === item.slug) : -1;
  const hasPrev = items && currentIndex > 0;
  const hasNext = items && currentIndex < items.length - 1;

  const goToPrev = useCallback(() => {
    if (items && hasPrev && onSelect) {
      onSelect(items[currentIndex - 1]);
    }
  }, [items, hasPrev, currentIndex, onSelect]);

  const goToNext = useCallback(() => {
    if (items && hasNext && onSelect) {
      onSelect(items[currentIndex + 1]);
    }
  }, [items, hasNext, currentIndex, onSelect]);

  useEffect(() => {
    if (!item) return;
    triggerRef.current = document.activeElement as HTMLElement;
    lenis?.stop();
    document.documentElement.classList.add("overflow-hidden");
    closeButtonRef.current?.focus();

    return () => {
      lenis?.start();
      document.documentElement.classList.remove("overflow-hidden");
      triggerRef.current?.focus();
    };
  }, [item, lenis]);

  useEffect(() => {
    if (!item) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        goToPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        goToNext();
        return;
      }

      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [item, onClose, goToPrev, goToNext]);

  useGSAP(
    () => {
      if (!item || reducedMotion || !dialogRef.current) return;
      gsap.fromTo(
        dialogRef.current,
        { autoAlpha: 0, scale: 0.96, y: 14 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" },
      );
    },
    { dependencies: [item], scope: dialogRef },
  );

  if (!isMounted || !item) return null;

  const message = `Hi Amee, I saw "${item.title}" on your portfolio and I'd like to discuss a similar ${categoryLabel[item.category].toLowerCase()} project.`;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 md:p-10"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-ink/75 backdrop-blur-md transition-opacity"
      />

      {/* Navigation Arrows for Next / Prev */}
      {hasPrev && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={goToPrev}
          className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-paper/90 p-3 text-ink shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-ink hover:text-paper sm:flex sm:left-4 md:left-6"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          aria-label="Next image"
          onClick={goToNext}
          className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-paper/90 p-3 text-ink shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-ink hover:text-paper sm:flex sm:right-4 md:right-6"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Modal Dialog Content */}
      <div
        ref={dialogRef}
        className="relative grid max-h-[92vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-[2rem] bg-paper shadow-2xl lg:grid-cols-[1.25fr_1fr]"
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          {/* Zoom toggle — meaningless on the static dieline diagram, so
              hidden in that mode rather than left active with no effect. */}
          {viewMode === "photo" && (
            <button
              type="button"
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              onClick={() => setZoomed(!zoomed)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink shadow-md backdrop-blur transition-all hover:bg-ink hover:text-paper"
              title={zoomed ? "Zoom out" : "Zoom in"}
            >
              {zoomed ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              )}
            </button>
          )}

          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink shadow-md backdrop-blur transition-all hover:bg-ink hover:text-paper"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Image Preview Container */}
        <div className="relative flex min-h-[300px] sm:min-h-[420px] lg:min-h-[550px] items-center justify-center overflow-auto bg-paper-raised/80 p-4 sm:p-8">
          {/* Studio Photo / 3D Box / Prepress Dieline toggle. The 3D Box
              is the real, unaltered photo on the front face of a real
              3D-transformed box (same technique already shipped in the
              Hero's "Folded Carton" mode) — not an AI-guessed model of
              faces no source photo shows. The dieline is one generic
              illustrative diagram shared across every item (same
              component the Pharma section uses), never a per-product
              schematic invented for this specific piece. */}
          <div className="absolute top-4 left-4 z-30 inline-flex items-center gap-1 rounded-full border border-ink/10 bg-paper/90 p-1 text-xs font-semibold shadow-md backdrop-blur">
            {(["photo", "box", "dieline"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setViewMode(v)}
                aria-pressed={viewMode === v}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  viewMode === v ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                }`}
              >
                {v === "photo" ? "Studio Photo" : v === "box" ? "3D Studio Inspector" : "Prepress Dieline"}
              </button>
            ))}
          </div>

          {viewMode === "dieline" ? (
            <div className="w-full max-w-xl">
              <DielineDiagram realSrc={item.dielineSrc} productTitle={item.title} />
            </div>
          ) : viewMode === "box" ? (
            <Product3DBox src={item.src} title={item.title} />
          ) : (
          <div
            ref={imageWrapRef}
            className={`spot-uv-light relative transition-all duration-300 ${
              zoomed
                ? "h-[140%] w-[140%] cursor-zoom-out"
                : "h-full w-full cursor-zoom-in"
            }`}
            onClick={() => setZoomed(!zoomed)}
            onMouseMove={onImageMouseMove}
            onMouseLeave={onImageMouseLeave}
          >
            <Image
              src={item.src}
              alt={`${item.title} — ${item.tags.join(", ")}`}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
              className={`object-contain drop-shadow-md transition-all duration-300 ${
                finish === "matte" ? "saturate-[0.82] contrast-[0.94] brightness-[0.98]" : ""
              }`}
            />

            {/* Finish Preview overlays — an illustrative simulation of how
                a print finish would read across this artwork, not a claim
                that this specific product actually has this finish (see
                the caption below the toggle). Pure CSS sheens on top of
                the same real, unaltered photo underneath. */}
            {finish === "spot-uv" && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.55) 52%, transparent 70%)",
                  mixBlendMode: "overlay",
                }}
              />
            )}
            {finish === "foil" && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(120deg, transparent 35%, rgba(212,175,55,0.65) 50%, transparent 65%)",
                  mixBlendMode: "color-dodge",
                }}
              />
            )}

            {loupe && (
              <div
                aria-hidden
                className="pointer-events-none absolute rounded-full border-2 border-ink/20 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                style={{
                  left: loupe.x - LOUPE_SIZE / 2,
                  top: loupe.y - LOUPE_SIZE / 2,
                  width: LOUPE_SIZE,
                  height: LOUPE_SIZE,
                  backgroundImage: `url(${item.src})`,
                  backgroundSize: `${LOUPE_ZOOM * 100}% ${LOUPE_ZOOM * 100}%`,
                  backgroundPosition: `${-(loupe.x * LOUPE_ZOOM - LOUPE_SIZE / 2)}px ${-(loupe.y * LOUPE_ZOOM - LOUPE_SIZE / 2)}px`,
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
          </div>
          )}

          {items && (
            <div className="absolute bottom-3 left-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-paper backdrop-blur">
              {currentIndex + 1} / {items.length}
            </div>
          )}
        </div>

        {/* Project Details Sidebar */}
        <div className="flex flex-col justify-between overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {categoryLabel[item.category]}
              </span>
              {item.isFlagship && (
                <span className="rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-bold text-paper">
                  FEATURED
                </span>
              )}
              {item.isConcept && (
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-paper">
                  CONCEPT PROJECT
                </span>
              )}
            </div>

            <h3 id="project-modal-title" className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-ink-soft">
              Client / Brand: {item.client}
              {item.isConcept ? " (self-directed concept, no live client brief)" : ""}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-paper-raised px-3 py-1 text-xs font-medium text-ink-soft">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <p className="font-spec text-[11px] font-normal tracking-wider text-ink-soft uppercase">
                Production Standards
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {specChips.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full border border-ink/15 bg-paper px-3 py-1 font-spec text-[10px] tracking-wide text-ink-soft uppercase"
                  >
                    {spec}
                  </span>
                ))}
              </div>

            </div>

            {/* Finish Preview — an illustrative CSS simulation of common
                print finishes, applied on top of this real photo. Labeled
                explicitly as a preview, not a claim that this particular
                product was actually finished this way (that's unconfirmed
                per product — see docs/client-requirements.md). Hidden in
                dieline mode since it has no real photo to apply to. */}
            {viewMode === "photo" && (
            <div className="mt-6 border-t border-line pt-5">
              <p className="font-spec text-[11px] font-normal tracking-wider text-ink-soft uppercase">
                Finish Preview <span className="normal-case text-ink-soft">(illustrative)</span>
              </p>
              <div className="mt-3 inline-flex flex-wrap items-center gap-1 rounded-full border border-ink/10 bg-paper-raised p-1 text-xs font-semibold">
                {(["none", "matte", "spot-uv", "foil"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFinish(f)}
                    aria-pressed={finish === f}
                    className={`rounded-full px-3 py-1.5 capitalize transition-colors ${
                      finish === f ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {f === "none" ? "Raw" : f === "spot-uv" ? "Spot UV" : f}
                  </button>
                ))}
              </div>
            </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6">
            <a
              href={whatsappLink(siteMeta.whatsapp, message)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-paper shadow-md transition-all hover:scale-[1.02] hover:bg-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Inquire about this on WhatsApp
            </a>

            <a
              href={item.src}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-ink/15 px-6 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-ink hover:bg-paper-raised"
            >
              Open Full Resolution in New Tab
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
