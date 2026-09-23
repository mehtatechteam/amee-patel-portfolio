/**
 * Single source of truth for the production domain — was previously
 * hardcoded independently in app/layout.tsx, app/robots.ts, app/sitemap.ts,
 * and components/seo/StructuredData.tsx, a real drift risk if the domain
 * ever changes (it already did once, see git history: ameepatel.design →
 * ameepatel.co.in).
 */
// www is the primary host — Vercel 308-redirects the bare domain to it, so
// canonical/sitemap/robots must point at www or Google sees redirecting URLs.
export const SITE_URL = "https://www.ameepatel.co.in";

/** Bump this manually when the page's real content changes — not derived
 * from `new Date()` at request time, which Google explicitly discourages
 * (a `lastmod` that's always "just now" erodes trust in the signal). */
export const SITE_LAST_MODIFIED = "2026-09-22";

/** Apps Script web-app URL that appends contact clicks to the shared
 * "Amee Patel — Website Contact Clicks" Google Sheet. Empty = sheet logging
 * off (GA events still fire). See components/analytics/ContactClickLogger. */
export const CLICK_LOG_URL =
  "https://script.google.com/macros/s/AKfycbzoH4NPeJL88KsZ9kCqWem4vtQY70opjkXbkjQcKq6Tdv9YsE_tIM0s3P4PbGnysdHT/exec";
