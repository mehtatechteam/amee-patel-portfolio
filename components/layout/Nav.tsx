"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteMeta } from "@/lib/constants/site-copy";
import { cn } from "@/lib/utils";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", menuOpen);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-paper/85 backdrop-blur-md transition-shadow duration-200",
        scrolled ? "border-ink/10 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]" : "border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          id="site-logo"
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          {siteMeta.name}
          <span className="ml-1 text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className="hidden rounded-full bg-ink px-5 py-2.5 font-body text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-accent sm:inline-block"
          >
            Let&apos;s talk
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper-raised md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-ink/10 bg-paper transition-[grid-template-rows] duration-300 md:hidden",
          "grid",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-5 py-4 sm:px-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 font-body text-base font-medium text-ink transition-colors hover:bg-paper-raised"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-ink px-5 py-3 text-center font-body text-sm font-semibold text-paper"
            >
              Let&apos;s talk
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
