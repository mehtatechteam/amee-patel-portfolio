"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { whatsappLink } from "@/lib/utils";
import { siteMeta } from "@/lib/constants/site-copy";
import type { PortfolioItem } from "@/lib/constants/portfolio";

// True, general claims backed by the site's own "Print-Ready Guarantee"
// copy (site-copy.ts) — deliberately NOT per-project fabricated numbers
// like "300 DPI" or "Fogra39" certification, which we have no data for.
const specChips = ["Print-Ready File", "Exact Bleeds & Dimensions", "Production-Ready Structure"];

const categoryLabel: Record<PortfolioItem["category"], string> = {
  packaging: "Packaging Design",
  "brand-literature": "Brand Literature",
  logos: "Logo Design",
};

/**
 * Full-screen project detail view — uncropped artwork + real metadata only
 * (no fabricated print specs like "CMYK / 300 DPI / dieline" — we don't
 * have that data per piece, and inventing it would misrepresent the work).
 * Pauses Lenis and traps focus while open, matching the pattern already
 * established in LoadingScreen.tsx / Nav.tsx's mobile drawer.
 */
export function ProjectModal({ item, onClose }: { item: PortfolioItem | null; onClose: () => void }) {
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

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
  }, [item, onClose]);

  useGSAP(
    () => {
      if (!item || reducedMotion || !dialogRef.current) return;
      gsap.fromTo(
        dialogRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    },
    { dependencies: [item], scope: dialogRef },
  );

  if (!item) return null;

  const message = `Hi Amee, I saw "${item.title}" on your portfolio and I'm interested in a similar ${categoryLabel[item.category].toLowerCase()} project.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label="Close project details"
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        className="relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-y-auto rounded-[2rem] bg-paper shadow-2xl sm:grid-cols-2"
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-ink hover:text-paper"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative aspect-square sm:aspect-auto">
          <Image
            src={item.src}
            alt={`${item.title} — ${item.tags.join(", ")}`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-contain bg-paper-raised p-6"
          />
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-10">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {categoryLabel[item.category]}
          </span>
          <h3 id="project-modal-title" className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-ink-faint">Client: {item.client}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-paper-raised px-3 py-1 text-xs font-medium text-ink-soft">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
            {specChips.map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-ink/15 bg-paper px-3 py-1 font-spec text-[10px] tracking-wide text-ink-faint uppercase"
              >
                {spec}
              </span>
            ))}
          </div>

          <a
            href={whatsappLink(siteMeta.whatsapp, message)}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            Inquire about a similar project
          </a>
        </div>
      </div>
    </div>
  );
}
