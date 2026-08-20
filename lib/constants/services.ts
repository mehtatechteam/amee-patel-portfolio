import type { IconName } from "@/lib/icons";

export type ServiceAccent = "accent" | "cyan" | "magenta" | "yellow";

export type ServiceGroup = {
  id: string;
  icon: IconName;
  accent: ServiceAccent;
  title: string;
  intro: string;
  items: string[];
  hasPortfolioProof: boolean;
  featured?: boolean;
};

/**
 * Verbatim from docs/client-requirements.md → "Services". Groups without
 * matching portfolio imagery (hasPortfolioProof: false) render icon/type-led
 * rather than image-led — see docs/client-requirements.md content gaps.
 * `accent` differentiates each category using the site's CMYK-derived
 * secondary palette (see app/globals.css) — not arbitrary color choices.
 */
export const services: ServiceGroup[] = [
  {
    id: "packaging",
    icon: "box",
    accent: "accent",
    featured: true,
    title: "All Types of Packaging Design",
    intro:
      "Your packaging tells your brand's story on the shelf. I design highly professional, scale-accurate, and production-ready packaging structures for diverse industries.",
    items: [
      "Pharmaceutical & Medical — medicine boxes, healthcare packaging, compliant labels",
      "Food & Snack Packaging — food boxes, spice packets, burger boxes",
      "Cosmetics & Personal Care — perfume boxes, soap boxes, beauty packaging",
      "Luxury & Rigid Boxes — high-end rigid box design for premium products & gifting",
    ],
    hasPortfolioProof: true,
  },
  {
    id: "literature",
    icon: "document",
    accent: "cyan",
    title: "Brand Literature & Print Marketing",
    intro:
      "Turn complex information into beautifully organized, easy-to-read marketing materials that drive sales.",
    items: [
      "Brochures & Pamphlets — multi-fold brochures, informative pamphlets",
      "Flyers & Catalogs — promotional flyers, complete product catalogs",
      "Full-Booklet Layouts — striking covers, clean inner pages",
      "Company Literature — technical/medical literature, corporate booklets",
    ],
    hasPortfolioProof: true,
  },
  {
    id: "branding",
    icon: "megaphone",
    accent: "yellow",
    title: "Local Business Branding & Advertising",
    intro:
      "Boost your local presence and get noticed in your community with high-impact advertising assets.",
    items: [
      "Logo Design — unique, memorable logos for your business identity",
      "Billboards & Posters — large-format outdoor billboards, hoardings, posters",
      "Banners & Signage — eye-catching banners to draw foot traffic",
    ],
    hasPortfolioProof: true,
  },
  {
    id: "digital",
    icon: "monitor",
    accent: "magenta",
    title: "Digital & Social Media",
    intro: "Keep your online presence looking sharp, modern, and engaging.",
    items: ["Social Media Posts — creative, scroll-stopping graphic posts"],
    hasPortfolioProof: false,
  },
  {
    id: "custom",
    icon: "sparkle",
    accent: "cyan",
    title: "Celebrations & Custom Design on Demand",
    intro: "",
    items: [
      "Invitation Cards — custom-themed designs for weddings, corporate events, milestones",
      "Custom Designing on Demand — if you can dream it, I can design it",
    ],
    hasPortfolioProof: false,
  },
];
