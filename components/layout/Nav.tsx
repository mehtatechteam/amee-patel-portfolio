"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteMeta } from "@/lib/constants/site-copy";
import { cn } from "@/lib/utils";
import { AvailabilityBadge } from "@/components/motifs/AvailabilityBadge";
import { gsap } from "@/lib/gsap";

const links = [
  { href: "#home", id: "home", label: "HOME" },
  { href: "#about", id: "about", label: "ABOUT" },
  { href: "#services", id: "services", label: "SERVICES" },
  { href: "#pharma", id: "pharma", label: "PHARMA" },
  { href: "#portfolio", id: "portfolio", label: "PORTFOLIO" },
  { href: "#process", id: "process", label: "PROCESS" },
  { href: "#trust", id: "trust", label: "TRUST" },
  { href: "#contact", id: "contact", label: "CONTACT" },
];

/**
 * One pill of the nav capsule — a circle scales in from wherever the
 * pointer entered (GSAP, already the codebase's animation library) and
 * the label swaps to the inverse color while it's filled. The active
 * section gets a persistent filled state instead, independent of hover.
 */
function NavPill({
  href,
  label,
  isActive,
  onNavigate,
  linkRef,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
  linkRef?: (el: HTMLAnchorElement | null) => void;
}) {
  const fillRef = useRef<HTMLSpanElement>(null);

  // clip-path (not a scaled absolutely-positioned circle) so the fill is
  // guaranteed to stay within the pill's own rounded-rect bounds at any
  // size — a fixed-size circle span relying on the pill's own
  // overflow-hidden to crop it produced a visibly uneven/bled edge where
  // the circle's curve met the pill's corner radius.
  function pointerPercent(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  }
  function onEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    const { x, y } = pointerPercent(e);
    gsap.set(fillRef.current, { clipPath: `circle(0% at ${x}% ${y}%)` });
    gsap.to(fillRef.current, { clipPath: `circle(140% at ${x}% ${y}%)`, duration: 0.5, ease: "power2.out" });
  }
  function onLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    const { x, y } = pointerPercent(e);
    gsap.to(fillRef.current, { clipPath: `circle(0% at ${x}% ${y}%)`, duration: 0.4, ease: "power2.in" });
  }

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={onNavigate}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        "group relative isolate overflow-hidden rounded-full px-4 py-2 font-body text-xs font-semibold tracking-wide uppercase transition-colors duration-300 xl:px-5",
        isActive ? "bg-ink text-paper" : "text-ink-soft",
      )}
    >
      <span
        ref={fillRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-ink"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />
      <span className={cn("relative z-10", !isActive && "group-hover:text-paper")}>{label}</span>
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const sectionElements = links
        .map((l) => document.getElementById(l.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPos = window.scrollY + 200;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el.offsetTop <= scrollPos) {
          setActiveSection(el.id);
          break;
        }
      }
    };

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
        "sticky top-0 z-40 border-b bg-paper/90 backdrop-blur-md transition-shadow duration-200",
        scrolled ? "border-ink/10 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]" : "border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          id="site-logo"
          href="#home"
          className="flex shrink-0 items-center gap-1.5 font-display text-xl font-bold tracking-tight whitespace-nowrap text-ink"
        >
          <span>{siteMeta.name}</span>
          <span className="h-2 w-2 rounded-full bg-accent" />
        </Link>

        {/* Pill-capsule nav — each link is its own pill with a
            pointer-tracked circle-fill hover (see NavPill above). */}
        <nav className="hidden shrink-0 items-center gap-1.5 lg:flex">
          {links.map((link) => (
            <NavPill
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={activeSection === link.id}
              linkRef={(el) => {
                linkRefs.current[link.id] = el;
              }}
            />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <AvailabilityBadge className="hidden shrink-0 bg-paper-raised text-ink-soft whitespace-nowrap 2xl:inline-flex" />
          <Link
            href="#contact"
            className="hidden rounded-full bg-ink px-5 py-2.5 font-body text-xs lg:text-sm font-semibold uppercase tracking-wider text-paper transition-transform hover:-translate-y-0.5 hover:bg-accent sm:inline-block"
          >
            Let&apos;s talk
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper-raised lg:hidden"
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
          "overflow-hidden border-t border-ink/10 bg-paper transition-[grid-template-rows] duration-300 lg:hidden",
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
                className="rounded-xl px-3 py-3 font-body text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-paper-raised"
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
