/**
 * Single source of truth for the production domain — was previously
 * hardcoded independently in app/layout.tsx, app/robots.ts, app/sitemap.ts,
 * and components/seo/StructuredData.tsx, a real drift risk if the domain
 * ever changes (it already did once, see git history: ameepatel.design →
 * ameepatel.co.in).
 */
export const SITE_URL = "https://ameepatel.co.in";

/** Bump this manually when the page's real content changes — not derived
 * from `new Date()` at request time, which Google explicitly discourages
 * (a `lastmod` that's always "just now" erodes trust in the signal). */
export const SITE_LAST_MODIFIED = "2026-09-22";
