# Client Requirements — Amee Patel Portfolio Website

**Date logged:** 2026-08-20
**Source:** WhatsApp brief from "Gurav Intership Company" (project intermediary)

## Client
- **Name:** Amee J. Patel
- **Role:** Freelance Graphic Designer, 10+ years experience (2001–2012 at Parth Offset, 2012–present freelance)
- **Contact:** amiptl4@gmail.com (resume) / 9512155717 (WhatsApp/price list)
- **Location:** India, available for remote work
- **Education:** Commercial Fine Arts with Multimedia, Sheth C.N. College of Fine Arts
- **Tools:** CorelDRAW, Photoshop, Canva
- **Specialization:** Pharmaceutical & packaging design, banners/hoardings, brochures, pamphlets, literature design — i.e. **print-first, production-ready design**, not a typical "UI/UX portfolio" designer.

Assets saved: `assets/client/amee-resume.png`, `assets/client/price-list.png`

## Project Ask
- **One-page (single-page) portfolio website.**
- Must visually reflect a "graphic designer" vibe — not a generic dev/SaaS template.
- **Theme: light, colorful, and professional** (explicit client instruction).
- Client reviewed 6 competitor/inspiration portfolio sites and reacted positively to one in particular — see `references.md`. That reference should be the primary visual direction, adapted (not copied) to Amee's brand and content.

## Site copy (client-provided, verbatim source)
Full extracted text saved to `docs/Website Matter.docx` (original) — key sections:

### Hero / Intro
> Creative Design. Print-Ready Perfection.
> With over a decade of hands-on design experience, I help brands and local businesses grow through striking, functional visuals. From regulatory medicine boxes to eye-catching retail packaging and local marketing materials, I handle everything from concept to final print-ready file. Let's bring your vision to life!

### Services (4 groups — use as the "Services" section structure)
1. **📦 All Types of Packaging Design**
   - Pharmaceutical & Medical: Medicine boxes, healthcare packaging, compliant labels
   - Food & Snack Packaging: food boxes, spice packets, burger boxes
   - Cosmetics & Personal Care: perfume boxes, soap boxes, beauty packaging
   - Luxury & Rigid Boxes: high-end rigid box design for premium products/gifting
2. **📰 Brand Literature & Print Marketing**
   - Brochures & Pamphlets (multi-fold)
   - Flyers & Catalogs
   - Full-Booklet Layouts (covers + inner pages)
   - Company Literature (technical/medical literature, corporate booklets)
3. **🚀 Local Business Branding & Advertising**
   - Logo Design
   - Billboards & Posters
   - Banners & Signage
4. **💻 Digital & Social Media**
   - Social Media Posts
5. **✨ Celebrations & Custom Design on Demand**
   - Invitation Cards
   - Custom Designing on Demand

### Why partner with me (differentiators / trust section)
- 10+ Years of Expertise
- Print-Ready Guarantee (exact dimensions, bleeds, color profiles)
- Creative & Approachable (no corporate jargon)

### About Me
> Hi, I'm Amee Patel — Your Go-To Creative Graphic Designer! 👋
> I am a passionate, independent graphic designer based in India, working with clients locally and remotely all over the world. With over a decade of hands-on experience under my belt, my mission is simple: to make your brand look unforgettable and ensure your print materials turn out absolutely flawless.
> My journey started in design studios handling complex print and visual communication layouts, and today, I run my own freelancing practice. Over the years, I've specialized in the technical, high-precision world of packaging—designing everything from regulatory pharmaceutical boxes to eye-catching retail food packs and luxury boxes.
> I don't believe in stiff corporate jargon. I love keeping things friendly, collaborative, and simple. Whether you need a standout logo, scroll-stopping social media graphics, or a production-ready package layout that your printer will love, I am here to bring your ideas to life on time and with top-tier quality.
> Let's team up and create something amazing for your business!

## Pricing (DECIDED: publish on-site — see below)
See `assets/client/price-list.png` for full table. Summary (INR):
- Branding & Identity (logo, business card, letterhead, envelope, brand guidelines): ₹2500
- Brochure / Flyer / Pamphlet design: ₹1000 each; Catalogue main page ₹1500, other pages ₹800
- Poster ₹1000, Banner ₹1000, Billboard/Hoarding ₹1500
- Packaging: Box ₹1000, Label ₹500, Rigid box ₹1500, Pouch ₹700
- Digital: Social post / Ad / Web banner ₹500 each
- Marketing materials: Company profile ₹1000/page, Menu card ₹500–3500, Invitation card ₹500–3500
- Terms: 50% advance, up to 3 revisions included, quotation valid till Diwali

## Portfolio work to feature
All source images saved under `assets/portfolio/`, organized by category:
- `packaging/` — Madburgs burger box, Lil'Aura car fresheners (Lavender + Oudh Wood), PeptidesDepot research powder box, Aqua water filter 3-box set, Siriza herbal soap box, Jalaram Gota food box, Medween pharma bottle box, TSD World Type-C cable box
- `brochures-catalogs/` — Globiomed Life Science pharma "visual book," Dholera Exotica II real-estate trifold brochure, NP's Makeover bridal beautician catalog spread
- `logos/` — logo grid (Rich Valley nuts & dry fruits ×3 variants, The North Star, Frapito, Masala Roads ×2, Kesar, Rayos, Livklean)
- `baby-products/` — LittleGrow baby cereal box, generic baby Cerelac-style box

**Sections implied by this asset mix:** Packaging Design, Brochures & Catalogs, Logo Design, Branding — these should map to filterable/grouped portfolio categories on the one-pager, matching the services list above.

## Explicit build directives from the intermediary (Gurav)
1. Research premium graphic-designer portfolio sites — aim for genuinely "super premium," not a template.
2. Build an in-depth plan before building ("ultraplan") — theme, components, references, all researched.
3. Tech stack (mandatory): **Next.js, Tailwind CSS, GSAP, Motion (Framer Motion), Lenis (smooth scroll), Three.js**, and other modern tooling as warranted.
4. Be highly creative — **must not look like a generic "AI-generated" template site.**
5. Include an "awesome" loading screen / intro sequence.
6. Custom cursor: **avoid the cliché blob/dot custom cursor.** Only acceptable if it's a proper *design-tool-style* cursor (e.g. Figma/Photoshop-style crosshair, pen-tool, or tool cursor) — cursor should reinforce the "graphic designer" identity, not just be a generic novelty.
7. One page, but rich/deep in content and motion — not literally shallow.

## Open questions to confirm with client/intermediary before or during build
- Final domain/hosting target and deployment platform.
- Real portfolio image assets — current ones are reference/mockup screenshots from chat; need final high-res files for production images (transparent backgrounds / print mockups) and permission to feature client names (Madburgs, Lil'Aura, etc.) publicly.
- Logo/brand color for Amee's own personal brand (none supplied yet — to be derived from chosen reference direction + "colorful but professional" brief).
- Contact form destination (email/WhatsApp) — client's WhatsApp number 9512155717 and email amiptl4@gmail.com available.
