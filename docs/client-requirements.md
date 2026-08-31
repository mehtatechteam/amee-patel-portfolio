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

## Addendum — 2026-08-31: Pharmaceutical & healthcare packaging repositioning

**Source:** direct instruction from Aman (project owner), relayed goal from the client — reposition the site to attract more pharmaceutical packaging companies as clients, on top of the existing "make it Awwwards-level" brief (see "Explicit build directives" above, item 1 — largely still the mandate).

Amee already has real pharmaceutical/healthcare packaging work in the portfolio (see "Portfolio work to feature" above): Paracetamol Syrup (Pediatric Formula), Paracetamol Tablets IP 500mg, Medween pharma bottle box, PeptidesDepot research powder box, and Kenheal Healthcare's clinical nutrition & wellness brand-literature piece. This addendum sources copy for a **new standalone "Pharmaceutical & Healthcare Packaging" section** (elevated out of the existing Services → Packaging → "Pharmaceutical & Medical" bullet, which stays as-is) using only facts already established elsewhere in this document — no new claims.

### New section copy (source of truth for `lib/constants/site-copy.ts` → `pharma`)
- **Eyebrow:** "Specialization"
- **Heading:** "Pharmaceutical & Healthcare Packaging"
- **Intro:** "Regulatory medicine boxes and clinical/wellness literature are where precision matters most — exact dielines, accurate label copy, and print files your manufacturer can run without a single back-and-forth. It's a specialty within my packaging practice, built on the same print-ready guarantee as everything else I design." (Derived directly from the existing Hero copy's "From regulatory medicine boxes..." line and the existing Why-Partner "Print-Ready Guarantee" claim — not a new promise.)
- **CTA:** "Discuss a pharma packaging project" → WhatsApp, reusing `siteMeta.whatsapp` / a pharma-specific prefilled message: "Hi Amee, I'd like to discuss a pharmaceutical/healthcare packaging project."
- **Case studies shown:** the 5 portfolio items tagged `"Pharmaceutical"` (Paracetamol Syrup, Paracetamol Tablets, Medween, PeptidesDepot, Kenheal Healthcare) — captions reuse each item's existing `title`/`tags`, no invented outcome metrics.

### Explicitly NOT added (content gaps — do not fabricate)
- **No regulatory-body language** (CDSCO, ISO 15378, GMP, cGMP, etc.). Two competitor sites researched for this repositioning (thedesignpeople.in, designerpeople.com) both cite specific standards, but that's only honest if Amee actually designs to them — **unconfirmed**. Ask Amee directly before ever adding this; until then the copy above stays scoped to "dielines, label accuracy, print-ready files," which is already true per the existing Why-Partner section.
- **No pharma client testimonial** — none of the 4 testimonials in `lib/constants/testimonials.ts` are from a pharma client. Ask Amee for one from Kenheal Healthcare, Medween, or PeptidesDepot before claiming one in this section; ship with an honest "testimonials coming soon" state or omit the slot entirely until supplied.
- **No new/inflated stats** ("X pharma clients served," "Y% compliance rate," etc.) — none exist in source material.

### SEO
Update the homepage `<title>`/description (`app/layout.tsx`) to explicitly name "pharmaceutical packaging design" — real buyer search intent per this session's research — not just "print-ready packaging." Description already mentions "pharmaceutical & food packaging"; title currently doesn't and should.

### Hero slider — slide 3 copy sharpening
`components/hero/CreativeHeroSlider.tsx` slide 3 ("print-ready" theme) already leans pharma-technical but doesn't name pharma explicitly. Sharpen, no new claims:
- **Badge:** "Pharma & Healthcare Packaging · Production Ready" (was: "Technical Precision · Production Ready")
- **Heading lines:** unchanged ("PRINT-READY" / "PERFECTION")
- **Description:** "Zero headache for your printer. Every pharmaceutical and healthcare box ships with exact dielines, proper bleeds, CMYK profiles, and vector-sharp accuracy." (was: "Zero headache for your printer. Every file is delivered with exact dielines, proper bleeds, CMYK profiles, and vector-sharp accuracy." — same underlying claim, just names the audience. Deliberately avoids implying regulatory-review expertise — see "Explicitly NOT added" above.)

### Pharma case-study card descriptions (source of truth for `lib/constants/portfolio.ts` → the 5 `"Pharmaceutical"`-tagged items' `description` field)
Each description is 2–3 sentences framed as "what the piece needed → what was designed," sourced only from that item's existing `title`/`tags`/`category` plus facts already established elsewhere in this document (the Services section's "compliant labels" line, the Why-Partner "Print-Ready Guarantee" bleeds/dimensions/color-profile claim, and the "Full-Booklet Layouts"/"Company Literature" service line). No outcome metrics, client quotes, or regulatory claims — see "Explicitly NOT added" above, which still applies.

- **`paracetamol-syrup-pediatric`** ("Paracetamol Syrup — Pediatric Formula"): A pediatric paracetamol syrup carton needed dosage and usage information to read clearly at a glance, plus a friendlier, more approachable visual tone than a typical adult medicine box. The design keeps that label hierarchy simple and legible while working within the exact dieline and print-ready specs the format requires.
- **`paracetamol-tablets-blue`** ("Paracetamol Tablets IP 500 mg — Blue Wave Box"): A 10x10 tablet strip carton needed to read clearly as a standard pharmaceutical pack — accurate strength and count labeling — built to the exact dieline the printer runs against. The blue wave graphic gives the pack a distinct shelf identity within an otherwise text-heavy, regulated layout.
- **`medween-pharma-box`** ("Medween — Pharma Bottle Box"): A pharma bottle carton for Medween needed to present accurate, compliant product labeling within a compact bottle-box dieline. It was finished to the same print-ready standard — exact bleeds and color profiles — used across the rest of the packaging practice.
- **`peptidesdepot-research-powder`** ("PeptidesDepot — Research Powder Box"): A research powder carton for PeptidesDepot needed clear product identification suited to a laboratory/research-use product, distinct in tone from a retail medicine box. It was built to the same precise dieline and print-ready file standard as the rest of the packaging work.
- **`kenheal-healthcare-wellness`** ("Kenheal Healthcare — Clinical Nutrition & Wellness Portfolio"): Kenheal Healthcare needed a full-booklet visual book — cover through inner pages — that presents its clinical nutrition and wellness brand with a consistent, professional layout. It follows the same company-literature format used for other technical/medical literature in this practice.

### Hero slider — slide 4 copy (source of truth for `components/hero/CreativeHeroSlider.tsx` → the 4th `slides` entry, theme `"software-craft"`)
Adds a 4th slide about the craft/process behind the work (vector drawing, layering, color separation). Deliberately does **not** name specific software brands (CorelDRAW/Photoshop/Canva are real per "Tools" above, but naming them reads as a software-mastery claim this project hasn't decided to make as marketing copy) — stays scoped to the craft itself, consistent with the "Explicitly NOT added" discipline above.
- **Badge:** "Design Tools & Craft · Vector to Print"
- **Heading lines:** "EVERY TOOL." / "EVERY LAYER." / "PERFECTED."
- **Description:** "From first sketch to final color separation, every curve, layer, and swatch is refined by hand before a single file reaches the printer." (Consistent with the existing "Print-Ready Guarantee" claim and the vector/dieline precision language used in slide 3 — no new claims.)
- **Primary CTA:** "See My Process" → `#process`
- **Secondary CTA:** "Get In Touch" → `#contact`
