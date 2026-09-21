/**
 * All copy on this site is sourced verbatim from docs/client-requirements.md
 * (original: Website Matter.docx). Do not invent new marketing copy here —
 * extend docs/client-requirements.md first, then reflect it here.
 */

export const siteMeta = {
  name: "Amee Patel",
  title: "Graphic Designer",
  tagline: "Creative Design. Print-Ready Perfection.",
  location: "Remote Worldwide · Studio in Ahmedabad, India",
  workMode: "100% Remote Available Worldwide · Physical Design Studio in Ahmedabad",
  officeAddress: {
    line1: "FF-12, OMKAR LOTUS",
    line2: "Opp. SMVS Swaminarayan Temple, Motera to Chandkheda Road",
    area: "Chandkheda, Ahmedabad — 382424, Gujarat, India",
    full: "FF-12, OMKAR LOTUS, Opp. SMVS Swaminarayan Temple, Motera to Chandkheda Road, Chandkheda, Ahmedabad — 382424",
  },
  googleMapsUrl:
    "https://maps.google.com/?q=FF-12+OMKAR+LOTUS+Opposite+SMVS+Swaminarayan+Temple+Motera+to+Chandkheda+Road+Chandkheda+Ahmedabad+382424",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=FF-12+OMKAR+LOTUS+Opposite+SMVS+Swaminarayan+Temple+Motera+to+Chandkheda+Road+Chandkheda+Ahmedabad+382424&t=&z=15&ie=UTF8&iwloc=&output=embed",
  email: "amiptl4@gmail.com",
  whatsapp: "919512155717",
  whatsappDisplay: "+91 95121 55717",
  whatsappMessage: "Hi Amee, I'm interested in discussing a graphic design project.",
};

export const hero = {
  eyebrow: "Freelance Graphic Designer · 10+ Years",
  heading: "Creative Design.\nPrint-Ready Perfection.",
  body: "With over a decade of hands-on design experience, I help brands and local businesses grow through striking, functional visuals. From regulatory medicine boxes to eye-catching retail packaging and local marketing materials, I handle everything from concept to final print-ready file. Let's bring your vision to life!",
  ctaPrimary: { label: "See the work", href: "#work" },
  ctaSecondary: { label: "Let's talk", href: "#contact" },
};

export const about = {
  heading: "About Me",
  greeting: "Hi, I'm Amee Patel — Your Go-To Creative Graphic Designer! 👋",
  paragraphs: [
    "I am an independent graphic designer based in India, creating sharp, print-ready packaging, brand identity, brochures, catalogs, and social media graphics. With over a decade of studio and freelance experience, I keep the process friendly, precise, and production-ready.",
  ],
  closing: "Let's team up and create something amazing for your business!",
  credentials: [
    { label: "Education", value: "Commercial Fine Arts w/ Multimedia — Sheth C.N. College of Fine Arts" },
    { label: "Tools", value: "CorelDRAW · Photoshop" },
    { label: "Experience", value: "2001–2012 Parth Offset · 2012–Present Freelance" },
  ],
};

export const whyPartner = {
  heading: "Why Partner With Me?",
  items: [
    {
      title: "Over a Decade of Expertise",
      body: "Over a decade of professional freelance and studio experience at your service.",
    },
    {
      title: "Print-Ready Guarantee",
      body: "Zero headache for your printer. Every file is delivered with exact dimensions, bleed, and color profiles.",
    },
    {
      title: "Creative & Approachable",
      body: "No stiff corporate jargon — just friendly collaboration focused on making your business shine.",
    },
  ],
  // Real, sourced facts only — no fabricated testimonials/client counts.
  // See docs/client-requirements.md "Open questions" — testimonials are a
  // known content gap until the client supplies them.
  stats: [
    { value: "10+", label: "Years in design" },
    { value: "3", label: "Revisions included per project" },
    { value: "50%", label: "Advance to start, rest on delivery" },
  ],
};

// Sourced from docs/client-requirements.md → "Addendum — 2026-08-31:
// Pharmaceutical & healthcare packaging repositioning". Derived from facts
// already established elsewhere in that doc — no new claims. Per the
// 2026-09-09 addendum, Amee confirmed she does NOT design to CDSCO/ISO
// 15378/GMP specifically (those certify the manufacturer/factory, not the
// artwork) — regulatory-body language stays out permanently, not just
// pending confirmation. No fabricated testimonials or stats.
export const pharma = {
  eyebrow: "Specialization",
  heading: "Pharmaceutical & Healthcare Packaging",
  intro:
    "Pharmaceutical and healthcare packaging demands more precision than most categories — exact dielines, accurate label copy, and print files your manufacturer can run without back-and-forth. It's a specialization within my packaging practice, built on the same print-ready guarantee I bring to every project.",
  ctaLabel: "Discuss a pharma packaging project",
  whatsappMessage: "Hi Amee, I'd like to discuss a pharmaceutical/healthcare packaging project.",
  trustPoints: [
    "Exact dielines & bleed",
    "Accurate, print-checked label copy",
    "Print-ready files your manufacturer can run as-is",
  ],
};

export const contact = {
  heading: "Let's create something amazing.",
  body: "Have a project in mind? Message me on WhatsApp or drop an email — I usually reply within a day.",
};
