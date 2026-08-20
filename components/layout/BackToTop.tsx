"use client";

import { useLenis } from "lenis/react";

export function BackToTop() {
  const lenis = useLenis();

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/15 text-paper transition-colors hover:bg-paper/10"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
