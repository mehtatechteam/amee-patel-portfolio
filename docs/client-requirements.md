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

## Addendum — 2026-09-08: real per-product dielines extracted from client `.cdr` source files

Client (Amee, via the "Amee patel portfolio website" WhatsApp group with Gurav) sent 7 zip files, each containing exactly one real CorelDRAW (`.cdr`) production file — her actual print-ready source art, not a photo or a spec sheet. This environment has no CorelDRAW/Inkscape, so each was opened via `libcdr`'s `cdr2xhtml` (extracts the real vector geometry as embedded SVG) then rasterized with `rsvg-convert`/`resvg`. This is a lossless-in-content format conversion — no content was generated, edited, or guessed; every path, dimension, and line of text in the output PNGs is exactly what was in the client's own file.

**Verified genuine (opened and visually inspected the actual rendered output, not just the filename) for all 7:**
- `medween-pharma-box` — real FSSAI Licence No. 22126680000095, real marketer "TRUPHR VENTURES LLP, Punjab, India 145001", real dimensions (155.00mm × 55.00mm×2). Batch No./Mfg./Exp./MRP fields are blank template fields (per-batch info, correctly not filled in a reusable print file) — not fabricated placeholder text.
- `madburgs-burger-box` — real MADBURGS logo, "Eat. Drip. Repeat.", "Made to Crave" tagline, Instagram handle.
- `siriza-herbal-soap` — real "SIRIZA Premium Herbal Soap", manufacturer "Siriza Enterprises, New Anand Nagar, Pali (Raj) – 306401", real ingredients list, real customer-care email.
- `jalaram-gota` — real "Jalaram Gota Instant Mix", manufacturer "Jalaram Gruh Udyog, Ahmedabad", real FSSAI licence field (blank template), real nutrition-facts table, Gujarati + English copy.
- `tsd-world-cable` — real "TYPE C Braided Cable" spec sheet: marketed by VYAPKART (Ilkal, Karnataka), real MRP ₹699, cable length/weight/colour specs, `support@tsdworld.in` / `www.tsdworld.com`.
- `taj-wood-paint-tin` — real "TAJ · Premium Quality" wood-finish tin label (embedded photo mispositioned by the extraction tool, vector text/icons render correctly — cosmetic conversion issue, not a content one).
- `kdm-gugal-dhoop-cup` — real "Kapoor Gugal Sambrani Dhoop Cup", manufacturer "Mahadev Enterprises, Balotra, Raj.", marketed by "KDM Group", real MRP ₹299, matches the WhatsApp-supplied product photos for the same item.

These 7 real dielines are wired into `ProjectModal`'s "Prepress Dieline" tab via `portfolio.ts`'s `dielineSrc` field (`components/pharma/DielineDiagram.tsx` shows the real image when present, the existing generic illustrative diagram otherwise). **Do not remove `dielineSrc` from these 7 items on suspicion alone** — the FSSAI/licence numbers etc. visible in them are the client's own real regulatory data, independently verified by opening the source files above, not the fabricated-content pattern this document already warns about elsewhere. If re-verifying, re-open the actual `.cdr`/rendered PNG rather than pattern-matching on "real-looking regulatory number = suspicious."

Two new portfolio items were also added from client-supplied photos (same WhatsApp thread, corroborated by a screenshot showing Amee sending them alongside the KDM Gugal `.cdr` zip) rather than a `.cdr` file: `kdm-gugal-dhoop-cup`'s main photo, and `prince-pipes-puja-kit` (client: Prince Pipes, Ganesh Chaturthi Puja Kit) — at the time of this addendum it had no `.cdr` source; see the 2026-09-09 addendum below, a source file has since arrived.

## Addendum — 2026-09-09: `prince-pipes-puja-kit` real dieline added; a batch of fabricated back-panel images caught and deleted

Client sent the `prince-pipes-puja-kit` `.cdr` production file (single sheet, 40in × 28in, exported the same lossless `cdr2xhtml`/`rsvg-convert` way as the 7 files above — no content generated or guessed). Opened and visually verified the rendered output: real Prince Pipes logo, real "गणेश चतुर्थी पूजा किट" (Ganesh Chaturthi Puja Kit) branding, a real box dieline with fold/glue lines, a matching small "Agarbathi" sub-box dieline, and circular kit-item cutout inserts — consistent with the already-live product photo for this item. Wired into `portfolio.ts` as `dielineSrc: "/portfolio/dielines/prince-pipes-puja-kit.png"`, same convention as the other 7. All 8 packaging items with real client `.cdr` source files now have a genuine dieline; every other portfolio item correctly still falls back to the generic illustrative diagram.

**Separately, same session:** found 7 untracked `*-back.jpg`/`*-side.jpg` files already sitting in `public/portfolio/packaging/` (not committed, not yet wired into any code) — AI-diffusion-generated fake back-panel/side images for `medween-pharma-box`, `paracetamol-syrup-pediatric-box`, `paracetamol-tablets-blue`, `organic-amla-powder-box` (×2), `madburgs-burger-box`, and a Lil'Aura item, apparently staged to feed a "3D model, all sides" feature. Same fabrication pattern as the Round 9/12/14/16 incidents already logged in project memory — fake Schedule H1/H warnings, fake batch/mfg/exp dates, a fake dosage table on the **pediatric** syrup specifically, a false attribution of the Paracetamol Tablets box to the real company **Cadila Pharmaceuticals Ltd**, garbled AI nonsense body copy on Organic Amla, and invented nutrition/certification claims on Madburgs. Deleted all 7 (untracked, unreferenced — a clean removal, not an undo of real work). **Do not regenerate multi-angle/3D-all-sides views for any product without real client-supplied photos or `.cdr` source for each side** — the front-only photo/dieline this project already has is not enough to honestly show a back or side panel.

## Addendum — 2026-09-09: Amee's reply to the "site's live" outreach message, plus follow-on content fixes

Amee replied (via Aman, WhatsApp) to the outreach message that shared the live Vercel URL and asked for photos/permissions/pharma-standard confirmation/quotes. Her answers, numbered per that message:

1. **Headshot** — already sent; handled separately in the headshot v4/v5 commits (`ba165e1`, `ad08708`) preceding this session, not a change made here.
2. **Higher-res portfolio photos** — she asked which pieces need them; Aman still needs to name them. Checked actual on-disk pixel dimensions of every portfolio image: `littlegrow-baby-cereal-box.png` (718×575) is the clear outlier — every other image on the site is 1024px+ on its short side. That's the one to ask Amee for a larger export of. (Moot for the LittleGrow *concept* framing below, but the resolution gap is real regardless.)
3. **Color palette (coral/cyan/magenta/yellow)** — confirmed OK to keep live long-term. No code change needed; palette already live.
4. **Public client-name permission** — confirmed **yes** for all 12 names listed (Madburgs, Lil'Aura, Medween, Organic Amla, KDM Pujan Samagri, Prince Pipes, Kenheal Healthcare, PeptidesDepot, Siriza, Jalaram Gota, TSD World, Taj Wood Paint). Already used as-is sitewide; no change needed.
5. **CDSCO / ISO 15378 / GMP claim** — Amee said **no**, she does not design to those specific standards, and separately supplied a reference explaining why a graphic designer shouldn't claim them anyway (they certify the manufacturer/factory and its process, not the artwork/layout). This finalizes what `site-copy.ts`'s `pharma` comment already flagged as unconfirmed — regulatory-body language stays out of the Pharma section permanently, not just pending confirmation.
6–8. **Pharma client quote, richer per-project detail, customer testimonials** — none supplied yet; Amee said she'll try to get them. Nothing to add until she sends real material — do not draft placeholder quotes/testimonials in the meantime (see the existing anti-fabrication rule and the unresolved testimonials.ts concern noted below).

### Other fixes requested in the same message

- **Lil'Aura product-type tag** — both Lil'Aura cards (`lilaura-lavender`, `lilaura-oudh`) had the tag `"Cosmetics"`, which Amee flagged as wrong; she sent a reference confirming the correct short category name is **car perfume / car diffuser / car hanging** (i.e. car freshener, matching the existing title copy). Tag changed to `"Car Freshener"` on both.
- **Siriza tag reconsidered** — `siriza-herbal-soap`'s `"Cosmetics"` tag was previously judged correct-as-is (it is a soap). Amee later asked for "Cosmetics" removed from this card too; changed to `"Personal Care"` — still accurate for a soap box, without the word she flagged.
- **Jalaram photo swap (round 2)** — Amee sent another new front-of-box photo for `jalaram-gota`; replaced `public/portfolio/packaging/jalaram-gota-food-box.png` in place (same path, new file, 1470×1070) and updated `width`/`height` in `portfolio.ts` to match. The real `.cdr`-derived dieline (`dielineSrc`) is unrelated to this photo and was left untouched.
- **"10+ Years" → "Over a decade"** — the `whyPartner` card title/body in `site-copy.ts` said "10+ Years of Expertise" / "A decade of...", inconsistent with the "over a decade" phrasing used in the hero and about-section copy. Amee asked for it to match; both title and body now say "Over a decade...".
- **Pharma case-study descriptions simplified** — Amee said the `paracetamol-syrup-pediatric` and `paracetamol-tablets-blue` card descriptions in `portfolio.ts` were too long/complex. Shortened both to plainer, simpler sentences with no new claims.
- **Mobile scroll sometimes not working — root cause found and fixed** — the "AMEE J. PATEL · SINCE 2012" spinning stamp (`CurvedLoop`, `components/motifs/CurvedLoop.tsx`) had `touch-action: none` on its SVG so it could be drag-rotated. It sits inside `DesignerSpecCard`'s `sticky` About-section card, so it stays pinned at the same on-screen position while that section scrolls — any touch-scroll gesture starting on that 80px badge was swallowed entirely (`touch-none` blocks all native panning), while everywhere else on the page scrolled fine. Changed to `touch-pan-y`, the same fix already used for `HeroPoster`'s drag zone, so vertical scroll passes through untouched.
- **New portfolio piece** — Amee sent a Pri's Kitchen "Methi Khakhra" box render to add; wired in as a new `packaging` item (`pris-kitchen-methi-khakhra`), same tagging convention as the other food/snack boxes (Jalaram, Madburgs). No `.cdr` source supplied for this one, so no `dielineSrc` — consistent with every other item that lacks one.
- **LittleGrow and Organic Amla marked as concept projects** — Amee confirmed both `littlegrow-baby-cereal` and `organic-amla-powder` are self-directed concept pieces, not real client engagements. Added an `isConcept` flag to `PortfolioItem` (surfaced as a "Concept Project" badge on the card and in the modal, plus a "(self-directed concept, no live client brief)" note next to Client/Brand) and rewrote each item's `description` to say so plainly instead of implying a real client relationship.
  - **Open concern this raises:** `lib/constants/testimonials.ts` has an "authentic" (commit message's word) testimonial from `"Organic Amla Remedies"` / "Dr. K. Sharma, Founder & Product Lead" claiming a real design partnership with Amee ("Google Review", `verified: true`). That is now directly contradicted by Amee confirming Organic Amla is a concept brand with no real client behind it. None of the 4 testimonials in that file have a sourcing note anywhere in this doc (unlike every other piece of content here), and Amee's own reply (items 6–8 above) confirms no testimonials have been supplied yet. Flagged to the user in-session; not resolved as part of this addendum — needs an explicit decision on whether to pull some or all of the 4 seed testimonials before they're trusted further.
- **Pharma section wording** — Amee said the section's descriptive copy read as an improperly-formed sentence that didn't parse on first read. Rewrote `pharma.intro` in `site-copy.ts` for a plainer subject-verb-object structure (no new claims, no wording changes to the trust-point badges or the five pharma case-study card descriptions, which were already clear).
