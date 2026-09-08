import { portfolioItems } from "./portfolio";

// Restricted to products with a real CorelDRAW (.cdr) production dieline —
// verified by opening each file rather than trusted from filenames alone
// (see docs/client-requirements.md's anti-fabrication discipline). All 7
// slugs below have both a real front photo AND a real .cdr-sourced dieline
// (portfolio.ts's dielineSrc field). Everything else in the catalog stays
// out of the Hero carousel by request — including "prince-pipes-puja-kit",
// added from a client-supplied photo with no .cdr source, so it has no
// dielineSrc and correctly falls back to the generic illustrative diagram.
export const HERO_SHOWCASE_SLUGS = [
  "medween-pharma-box",
  "madburgs-burger-box",
  "siriza-herbal-soap",
  "jalaram-gota",
  "tsd-world-cable",
  "taj-wood-paint-tin",
  "kdm-gugal-dhoop-cup",
];

export const heroShowcaseItems = HERO_SHOWCASE_SLUGS.map((slug) => portfolioItems.find((i) => i.slug === slug)!).filter(Boolean);
