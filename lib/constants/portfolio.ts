export type PortfolioCategory = "packaging" | "brand-literature" | "logos";

export type PortfolioItem = {
  slug: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  tags: string[];
  src: string;
  width: number;
  height: number;
  /** Curated for the "reveal the system" case-study treatment (Phase 5). */
  isFlagship?: boolean;
  /** Portrait (default) vs wide — set "wide" for landscape source photos
   * (e.g. multi-product range shots) that a portrait crop would butcher. */
  cardAspect?: "portrait" | "wide";
};

/**
 * Source images: assets/portfolio/** (organized copies in public/portfolio/**).
 * Dimensions read directly from the PNG headers — required for next/image
 * to avoid layout shift. These are chat-shared mockup exports, not final
 * production files — see docs/client-requirements.md Open Risk #2.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    slug: "medween-pharma-box",
    title: "Medween — Pharma Bottle Box",
    client: "Medween",
    category: "packaging",
    tags: ["Pharmaceutical", "Box Design"],
    src: "/portfolio/packaging/medween-pharma-box.png",
    width: 1024,
    height: 1024,
    isFlagship: true,
  },
  {
    slug: "lilaura-lavender",
    title: "Lil'Aura — Lavender Car Freshener",
    client: "Lil'Aura",
    category: "packaging",
    tags: ["Cosmetics", "Box Design"],
    src: "/portfolio/packaging/lilaura-car-freshener-lavender.png",
    width: 1122,
    height: 1402,
    isFlagship: true,
  },
  {
    slug: "lilaura-oudh",
    title: "Lil'Aura — Oudh Wood Car Freshener",
    client: "Lil'Aura",
    category: "packaging",
    tags: ["Cosmetics", "Box Design"],
    src: "/portfolio/packaging/lilaura-car-freshener-oudh-wood.png",
    width: 1122,
    height: 1402,
  },
  {
    slug: "madburgs-burger-box",
    title: "Madburgs — Burger Box",
    client: "Madburgs",
    category: "packaging",
    tags: ["Food & Snack", "Box Design"],
    src: "/portfolio/packaging/madburgs-burger-box.png",
    width: 1402,
    height: 1122,
    isFlagship: true,
  },
  {
    slug: "aqua-water-filter",
    title: "Aqua — Water Filter Packaging Set",
    client: "Aqua",
    category: "packaging",
    tags: ["Health", "Box Design", "Product Range"],
    src: "/portfolio/packaging/aqua-water-filter-packaging-set.png",
    width: 1536,
    height: 1024,
  
    cardAspect: "wide",
  },
  {
    slug: "siriza-herbal-soap",
    title: "Siriza — Premium Herbal Soap Box",
    client: "Siriza",
    category: "packaging",
    tags: ["Cosmetics", "Box Design"],
    src: "/portfolio/packaging/siriza-herbal-soap-box.png",
    width: 1264,
    height: 842,
  },
  {
    slug: "jalaram-gota",
    title: "Jalaram — Gota Instant Mix",
    client: "Jalaram",
    category: "packaging",
    tags: ["Food & Snack", "Box Design"],
    src: "/portfolio/packaging/jalaram-gota-food-box.png",
    width: 1206,
    height: 880,
  },
  {
    slug: "tsd-world-cable",
    title: "TSD World — Type-C Braided Cable",
    client: "TSD World",
    category: "packaging",
    tags: ["Electronics", "Box Design"],
    src: "/portfolio/packaging/tsd-world-cable-box.png",
    width: 1536,
    height: 1024,
  
    cardAspect: "wide",
  },
  {
    slug: "peptidesdepot-research-powder",
    title: "PeptidesDepot — Research Powder Box",
    client: "PeptidesDepot",
    category: "packaging",
    tags: ["Pharmaceutical", "Box Design"],
    src: "/portfolio/packaging/peptidesdepot-research-powder-box.png",
    width: 1536,
    height: 1024,
  
    cardAspect: "wide",
  },
  {
    slug: "taj-wood-paint-tin",
    title: "Taj Wood Paints — Wood Finish Tin Label",
    client: "Taj Wood Paints",
    category: "packaging",
    tags: ["Home Improvement", "Label Design"],
    src: "/portfolio/packaging/taj-wood-paint-tin.png",
    width: 1541,
    height: 1021,
    cardAspect: "wide",
  },
  {
    slug: "littlegrow-baby-cereal",
    title: "LittleGrow — Baby Cereal Box",
    client: "LittleGrow",
    category: "packaging",
    tags: ["Baby Products", "Box Design"],
    src: "/portfolio/baby-products/littlegrow-baby-cereal-box.png",
    width: 718,
    height: 575,
  },
  {
    slug: "baby-cerelac-concept",
    title: "Baby Cerelac — Concept Packaging",
    client: "Concept work",
    category: "packaging",
    tags: ["Baby Products", "Box Design"],
    src: "/portfolio/baby-products/generic-baby-cerelac-box.png",
    width: 575,
    height: 575,
  },
  {
    slug: "globiomed-pharma-book",
    title: "Globiomed Life Science — Pharma Visual Book",
    client: "Globiomed",
    category: "brand-literature",
    tags: ["Pharmaceutical", "Brochure"],
    src: "/portfolio/brochures-catalogs/globiomed-pharma-visual-book.png",
    width: 1536,
    height: 1024,
    isFlagship: true,
  
    cardAspect: "wide",
  },
  {
    slug: "dholera-exotica-trifold",
    title: "Dholera Exotica II — Real Estate Trifold",
    client: "Dholera Exotica II",
    category: "brand-literature",
    tags: ["Real Estate", "Brochure"],
    src: "/portfolio/brochures-catalogs/dholera-exotica-realestate-trifold.png",
    width: 1536,
    height: 1024,
  
    cardAspect: "wide",
  },
  {
    slug: "npmakeover-catalog",
    title: "NP's Makeover — Bridal Beautician Catalog",
    client: "NP's Makeover",
    category: "brand-literature",
    tags: ["Beauty", "Catalog"],
    src: "/portfolio/brochures-catalogs/npmakeover-beautician-catalog.png",
    width: 1402,
    height: 1122,
  
    cardAspect: "wide",
  },
  {
    slug: "logo-design-grid",
    title: "Logo Design — Selected Marks",
    client: "Various clients",
    category: "logos",
    tags: ["Branding", "Logo Design"],
    src: "/portfolio/logos/logo-design-grid.png",
    width: 1600,
    height: 1075,
  },
];

export const portfolioFilters: { label: string; value: "all" | PortfolioCategory }[] = [
  { label: "All Work", value: "all" },
  { label: "Packaging", value: "packaging" },
  { label: "Brand Literature", value: "brand-literature" },
  { label: "Logos & Branding", value: "logos" },
];
