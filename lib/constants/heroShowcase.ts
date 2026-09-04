import { portfolioItems } from "./portfolio";

// Curated, flagship-first spread across categories — real product shots,
// shared between the flat-image fallback (HeroPoster) and the 3D phone
// showcase (HeroPhoneShowcase) so both experiences show the exact same set
// and never drift out of sync with each other.
export const HERO_SHOWCASE_SLUGS = [
  "organic-amla-powder",
  "madburgs-burger-box",
  "lilaura-lavender",
  "shri-hanuman-realty-dholera",
  "medween-pharma-box",
  "prio-technology-logo",
  "paracetamol-tablets-blue",
  "kenheal-healthcare-wellness",
  "littlegrow-baby-cereal",
  "npmakeover-bridal-catalog",
];

export const heroShowcaseItems = HERO_SHOWCASE_SLUGS.map((slug) => portfolioItems.find((i) => i.slug === slug)!).filter(Boolean);
