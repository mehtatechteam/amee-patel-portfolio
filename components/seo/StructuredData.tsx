import { siteMeta, about } from "@/lib/constants/site-copy";
import { services } from "@/lib/constants/services";
import { SITE_URL } from "@/lib/constants/site";

/**
 * JSON-LD structured data — every field here is sourced from
 * lib/constants/site-copy.ts / services.ts, i.e. facts already published
 * elsewhere on this page. Nothing here is invented: no fabricated review
 * counts, no unconfirmed certifications, no price range (pricing isn't
 * actually published on-site — see docs/client-requirements.md). Same
 * anti-fabrication discipline as the rest of this project's content.
 */
export function StructuredData() {
  const personId = `${SITE_URL}/#person`;
  const businessId = `${SITE_URL}/#business`;
  const websiteId = `${SITE_URL}/#website`;

  const person = {
    "@type": "Person",
    "@id": personId,
    name: siteMeta.name,
    jobTitle: siteMeta.title,
    description: about.paragraphs[0],
    image: `${SITE_URL}/about/amee-headshot.jpg`,
    url: SITE_URL,
    email: `mailto:${siteMeta.email}`,
    telephone: `+${siteMeta.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteMeta.officeAddress.line1}, ${siteMeta.officeAddress.line2}`,
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382424",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Sheth C.N. College of Fine Arts",
    },
    worksFor: { "@id": businessId },
  };

  const business = {
    "@type": "ProfessionalService",
    "@id": businessId,
    name: `${siteMeta.name} — Graphic Designer`,
    description:
      "Freelance graphic designer specializing in pharmaceutical & print-ready packaging, brand identity, brochures, and local business branding. Based in Ahmedabad, India — working with clients worldwide.",
    image: `${SITE_URL}/about/amee-headshot.jpg`,
    // A real, deployed brand mark (the same monogram used as the site's
    // favicon/apple-icon) — schema.org's own convention for a business's
    // logo vs. its `image` (a photo).
    logo: `${SITE_URL}/icons/icon-512.png`,
    url: SITE_URL,
    email: `mailto:${siteMeta.email}`,
    telephone: `+${siteMeta.whatsapp}`,
    founder: { "@id": personId },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteMeta.officeAddress.line1}, ${siteMeta.officeAddress.line2}`,
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382424",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide (remote)" },
    ],
    serviceType: services.map((s) => s.title),
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE_URL,
    name: `${siteMeta.name} — Graphic Designer`,
    inLanguage: "en-IN",
    publisher: { "@id": businessId },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, business, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
