import type { IconName } from "@/lib/icons";

export type PricingGroup = {
  title: string;
  icon: IconName;
  note?: string;
  rows: { label: string; price: string }[];
  mostPopular?: boolean;
};

/**
 * Sourced from assets/client/price-list.png (verbatim). Published on-site
 * per client decision — see docs/client-requirements.md.
 *
 * Ordered by row count (largest first), not source order — a strict
 * 2-column grid pairs items adjacent in this array, and pairing the
 * 1-row "Branding & Identity" next to the 8-row "Print Design" left a
 * huge dead-space gap under the short card. Sorting this way pairs
 * similarly-sized groups together; the shortest card ends up alone in
 * the final row, where PricingSection.tsx gives it a full-width
 * horizontal treatment instead of a sparse half-width box.
 */
export const pricingGroups: PricingGroup[] = [
  {
    title: "Print Design",
    icon: "printer",
    rows: [
      { label: "Brochure design (per page)", price: "₹1,000" },
      { label: "Flyer design (front-back)", price: "₹1,000" },
      { label: "Pamphlet design", price: "₹1,000" },
      { label: "Catalogue — main page", price: "₹1,500" },
      { label: "Catalogue — other pages", price: "₹800" },
      { label: "Poster design", price: "₹1,000" },
      { label: "Banner design", price: "₹1,000" },
      { label: "Billboard / hoarding design", price: "₹1,500" },
    ],
  },
  {
    title: "Packing Design",
    icon: "box",
    rows: [
      { label: "Box design", price: "₹1,000" },
      { label: "Label design", price: "₹500" },
      { label: "Rigid box design", price: "₹1,500" },
      { label: "Pouch design", price: "₹700" },
    ],
  },
  {
    title: "Digital Design",
    icon: "monitor",
    rows: [
      { label: "Social media post design", price: "₹500" },
      { label: "Instagram / Facebook ads", price: "₹500" },
      { label: "Web banner design", price: "₹500" },
    ],
  },
  {
    title: "Marketing Materials",
    icon: "megaphone",
    rows: [
      { label: "Company profile (per page)", price: "₹1,000" },
      { label: "Menu card design", price: "₹500 – 3,500" },
      { label: "Invitation card design", price: "₹500 – 3,500" },
    ],
  },
  {
    title: "Branding & Identity",
    icon: "pen",
    note: "Includes logo, business card, letterhead, envelope, brand guidelines",
    rows: [{ label: "Full package", price: "₹2,500" }],
    mostPopular: true,
  },
];

export const pricingTerms = [
  "50% advance payment required. Final files delivered after full payment.",
  "Up to 3 revisions included. Additional revisions charged separately.",
  "Quoted rates subject to periodic update — confirm current pricing before booking.",
];

export type EstimatorItem = { id: string; label: string; price: number };

/**
 * A curated subset of pricingGroups' fixed-price rows, for the interactive
 * estimator in ProjectEstimator.tsx. Deliberately excludes range-priced
 * rows (Menu card / Invitation card design: "₹500 – 3,500") — summing a
 * range into a single number would misrepresent the estimate rather than
 * inform it.
 */
export const estimatorItems: EstimatorItem[] = [
  { id: "branding", label: "Branding & Identity — full package", price: 2500 },
  { id: "box", label: "Packaging box design", price: 1000 },
  { id: "rigid-box", label: "Rigid box design", price: 1500 },
  { id: "brochure", label: "Brochure design (per page)", price: 1000 },
  { id: "poster", label: "Poster design", price: 1000 },
  { id: "label", label: "Label design", price: 500 },
  { id: "social", label: "Social media post design", price: 500 },
  { id: "web-banner", label: "Web banner design", price: 500 },
];
