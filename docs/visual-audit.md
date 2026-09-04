# Visual Audit — September 4, 2026 (14:55 IST)

## Top 5 priority fixes (ranked, most impactful first)

1. **Persistent 3D phone docking obliterates body text & cards across 5 sections (Desktop)**
   - **What was seen:** In `#about`, `#services`, `#pharma`, `#portfolio`, and `#process`, the traveling 3D phone docks directly over top of primary text columns and portfolio cards (covering paragraphs in About, card 1 and 3 in Services, the Kenheal card in Pharma, the section header in Portfolio, and step 01 in Process). Simultaneously, the phone is clipped in half by the viewport edges (overflowing right on About/Pharma/Portfolio/Trust, and overflowing left on Services/Process).
   - **Why it fails:** `PhoneDockAnchor` instances have arbitrary absolute positioning (`right-1` / `left-1`) outside the responsive grid, and the phone's projected world-space scale (`SIDE_DOCK_SCALE = 0.42` with 3.2-unit phone height) has a wide bounding box that violently collides with the 1280px/1440px content containers. It looks like an unconstrained 3D bug rather than intentional choreography.
   - **Fix:** Either restrict phone docking strictly to sections designed with dedicated empty columns/gutters for it, or dock it into reserved negative margins outside the `max-w-7xl` container. Alternatively, set opacity to 0 / scale to 0 when scrolling between hero and dedicated showcase anchors, rather than letting a 3D chassis trample over readable text.

2. **Hero 3D phone sizing, severe clipping, and covered navigation (Desktop)**
   - **What was seen:** At 1440×900, the hero phone is scaled so large (`scale = 1.0`, phone height 3.2 units inside a FOV 32 frustum) that its right edge completely clips out of the browser window (~100px past right margin). It completely covers and blocks the "Next design" arrow button (`x: 1223.5px`), and bursts out of its framed "PORTFOLIO SPECIMEN" card border.
   - **Why it fails:** The unprojected camera target and scale assume a much larger viewport or a centered dock. The phone fails to sit within its dedicated UI frame, breaking the card illusion and making forward carousel navigation impossible with a mouse.
   - **Fix:** In `lib/three/dockConfig.ts`, reduce `getDockScale("hero")` from `1.0` to `~0.78–0.82`. Recalibrate `PhoneDockAnchor` in `HeroPhoneShowcase.tsx` so the unprojected center places the phone squarely between the Prev and Next arrow buttons with at least 48px clearance on either side.

3. **Hero 3D phone material, lighting, camera notch, and screen flatness**
   - **What was seen:** The phone chassis reads as a dull, matte dark-gray plastic block with muddy, blown-out specular hotspots on the left rim. The camera lens at the top is a crude, flat black circle (`circleGeometry args={[0.042, 24]}`) stuck on top of the glass plane like an unaligned sticker. The screen itself is rendered with unlit `meshBasicMaterial` with `toneMapped={false}`, making it completely matte and disconnected from the 3D lighting environment. Furthermore, the contact shadow (`ContactShadows`) is floating high above any ground plane at `y = -1.75` and is completely invisible.
   - **Why it fails:** Studio mockup renders (Spline/Blender commercial grade) rely on crisp edge highlights, subtle metallic bevels, realistic anisotropic reflections, directional studio softboxes, and a grounded contact shadow. Currently, the phone looks like a low-poly placeholder geometry with an unlit JPEG pasted on it.
   - **Fix:** 
     - Body material: Shift from dull `#1d1d1f` with flat roughness to an anodized dark titanium/aluminum finish (`roughness: 0.18`, `metalness: 0.82`, `clearcoat: 0.8`, `clearcoatRoughness: 0.12`).
     - Lighting: Replace generic studio preset + flat lights with a three-point studio setup: key light at `[4, 6, 4]` (intensity 1.8), rim kicker at `[-5, 2, -2]` (intensity 0.9, cool-white) to catch the opposite bevel, and a soft warm bounce from `[0, -3, 2]`.
     - Screen: Add a subtle glass reflection overlay mesh immediately above the screen plane (`z + 0.001`) with `roughness: 0.05`, `transmission: 0.9`, `reflectivity: 0.5`, with an angled linear gradient specular sheen.
     - Contact shadow: Drop `ContactShadows` down to immediately beneath the phone bottom plane or render a grounded radial shadow plate. Replace the flat circle camera with an authentic pill/dynamic island cutout or bezel notch.

4. **Product artwork aspect ratio distortion and harsh texture popping**
   - **What was seen:** Packaging designs (such as the Organic Amla Powder box and Madburgs box) are aggressively cropped to fit the phone's 9:18 portrait aspect ratio. On Organic Amla Powder, the left column text ("ANIC", "OWDER", Arabic script) is sliced off by the bezel. When navigating between designs via arrows or drag, the texture swaps instantly (`key={screen.src}`) with a raw flash/pop and zero transition.
   - **Why it fails:** A packaging designer's primary deliverable is the integrity of typography, branding, and dielines. Displaying cropped text where brand names are cut in half defeats the portfolio's core message of "Print-Ready Perfection". The instant texture pop feels unpolished and abrupt.
   - **Fix:** Implement a 2-texture cross-dissolve shader in `ScreenPlane` with a 350ms easing transition upon slide change. For the imagery, adjust the crop/fit strategy: either scale packaging artworks to contain within the screen bounds with a complementary studio background color, or craft phone-tailored mockups where the packaging artwork is fully contained and legible.

5. **Sticky WhatsApp floating button & sticky header collisions (Mobile & Desktop)**
   - **What was seen:** On mobile (390px), the fixed header (height ~74px) clips the top 20–30px of every section index header (`[ 01 // ABOUT ]`, `[ 02 // SERVICES ]`, `[ 03 // PHARMA ]`, `[ 04 // PORTFOLIO ]`, `[ 05 // PROCESS ]`, `[ 06 // TRUST ]`) whenever scrolled or jumped via anchor. Simultaneously, the green circular WhatsApp button (`StickyWhatsApp`) floats in the lower-right corner and directly occludes key UI elements across every section: the hero design caption, credentials in About, card text in Services, CTA links in Pharma, and the back-to-top button in the footer.
   - **Why it fails:** Fixed floating buttons without collision avoidance destroy layout balance and obscure readability. Section headers clipping under sticky navbars looks like an unadjusted scroll-margin bug.
   - **Fix:** Increase `scroll-mt` on all sections to `scroll-mt-28` or `scroll-mt-32` and add `pt-6` padding to the top of section containers. For `StickyWhatsApp`, reduce its diameter on mobile (from 56px to 46px), tuck it tighter into the bottom-right corner, and add a blur backdrop pill or dock it into the bottom navigation bar on mobile.

---

## Hero — 3D phone

**Working:**
- The concept of showcasing packaging designs dynamically inside a 3D device mockup is ambitious and immediately elevates the hero above standard static agency sites.
- GSAP `quickTo` cursor tracking creates responsive mouse-tilt interactivity with smooth deceleration.
- The 9:18 phone geometry with rounded corners (`RoundedBox`) is structurally sound and avoids heavy GLTF asset downloads.

**Not working:**
- **Severe viewport clipping & overlap:** At 1440px desktop width, the phone is pushed so far to the right that ~100px of its right body is sheared off by the browser window edge. It completely covers the "Next design" arrow button, making forward navigation inaccessible with mouse clicks.
- **Detached from container:** The hero features a crisp "PORTFOLIO SPECIMEN" card with registration marks and a top metadata bar, but the 3D phone completely ignores this boundary, floating 60px outside it on the right.
- **Materials lack realism:** The phone body uses `#1d1d1f` with `roughness: 0.32` and `metalness: 0.55`. It reads as a matte rubberized bumper or cheap plastic case rather than anodized aluminum or aerospace glass.
- **Unlit screen material:** The screen uses `meshBasicMaterial` with `toneMapped={false}`. It does not react to scene lighting, casting no specular sheen or reflection. It looks like an unlit digital bitmap floating in a cutout.
- **Camera lens looks like a hole punch:** The camera lens is a flat circle (`args={[0.042, 24]}`) placed at `[0, PHONE.height / 2 - 0.2, PHONE.depth / 2 + 0.022]`. It has no lens housing, no glass reflection, and no bezel integration—it reads like a dead pixel or an amateur hole punch.
- **Absence of contact shadow:** `ContactShadows` is positioned at `[0, -1.75, 0]` with opacity 0.32, which sits below the bottom of the hero section. The phone appears completely suspended in zero gravity without grounding.
- **Packaging artwork cropping:** Because the screen plane uses `cover` aspect logic, wide packaging items (like Organic Amla Powder and Madburgs) have their side panels and typography clipped by the screen bezels.
- **Rigid brick swipe interaction:** Dragging on the phone rotates the entire 3D phone body along Z (`swipeRotZ`) and X (`swipeX`). The phone feels like a stiff wobbling block. The actual screen image does not slide or respond to touch drag—only when released does the image abruptly pop to the next slide with zero fade.

**Fix direction:**
- Scale the hero phone down: set `getDockScale("hero")` to `0.80`. Center the anchor within the "PORTFOLIO SPECIMEN" card frame so the left and right navigation buttons have at least 48px of clear whitespace on both sides.
- Upgrade `PhoneModel.tsx` materials:
  - Phone rim: `roughness: 0.16`, `metalness: 0.85`, `clearcoat: 0.9`, `clearcoatRoughness: 0.1`.
  - Phone screen: Replace `meshBasicMaterial` with `meshStandardMaterial` or overlay a subtle transparent glass plane (`roughness: 0.08`, `transmission: 0.85`, `clearcoat: 1.0`) that catches the studio lights.
- Redesign the camera assembly: Replace the solitary black circle with an authentic pill cutout or subtle recessed speaker bar with a micro-lens reflection dot.
- Grounding: Reposition `ContactShadows` to `position={[0, -PHONE.height / 2 - 0.05, 0]}` with `opacity={0.55}`, `blur={1.8}`, and `scale={3.5}` so a soft, diffuse contact shadow forms directly beneath the bottom curve of the phone.
- Carousel motion: Add a smooth cross-fade shader or sliding plane animation in Three.js so transitioning between designs glides smoothly instead of hard-cutting.

---

## Hero — layout/copy (excluding the phone)

**Working:**
- The typography of the main heading ("Creative Design. Print-Ready Perfection.") is commanding, with excellent weight in the primary ink font.
- The `PressColorBar` (cyan, magenta, yellow, black strip) at the top of the section immediately signals genuine print production.
- Eyebrow line with `CMYKSwatch` dots and "FREELANCE GRAPHIC DESIGNER · 10+ YEARS" establishes instant credibility.
- The dual CTA buttons ("See the work" in solid ink-dark and "Let's talk ↗" in outlined paper-raised) have distinct visual hierarchy and responsive hover states.
- Featured clients strip ("Medween · Kenheal · Lil'Aura · Madburgs · Globiomed") provides immediate social proof directly beneath the copy.

**Not working:**
- The top `PressColorBar` is 6px tall and sits directly flush against the bottom border of the navbar, looking trapped and slightly accidental rather than like a deliberate sheet trim.
- The right column container card ("PORTFOLIO SPECIMEN") has an orphaned top bar with "PORTFOLIO SPECIMEN" on the left and "DRAG TO BROWSE" on the right, but the space beneath it is empty because the 3D phone renders in a fixed global canvas on top of it rather than inside it.
- On desktop, the featured clients text at the bottom has a top border rule (`border-t border-line pt-5`), but below it lies a massive 120px gap of empty whitespace before the marquee section.

**Fix direction:**
- Add a 12px vertical breathing margin above the `PressColorBar` or integrate it as a subtle 3px bleed accent along the header trim.
- Give the "PORTFOLIO SPECIMEN" card a subtle shaded background tint (`bg-paper-raised/50`) and an inset contact shadow bed where the phone rests, tying the HTML card and the 3D canvas together.
- Adjust vertical padding on the hero container from `pt-8 pb-16` to `pt-12 pb-12` to balance the spacing between the client list and the marquee ticker.

---

## Marquee

**Working:**
- The continuous ticker ("EXACT BLEEDS & DIELINES ✦ BRAND IDENTITY & LOGOS ✦ ...") creates purposeful dynamic motion and introduces print-specific terminology early.
- The paper-tear / deckled edge SVG filter adds organic, tactile print texture to what would otherwise be a generic CSS marquee.
- Coral star glyphs (`✦`) create clean rhythmic punctuation between terms.

**Not working:**
- The section is bracketed by both a solid 1px border line AND the torn paper edge SVG filter. The double line causes visual moiré/vibration, especially at high DPI.
- On mobile (390px), the vertical padding (`py-3`) feels cramped, with the descenders of letters coming within 4px of the torn edge.

**Fix direction:**
- Remove the redundant solid 1px border rules and let the deckled paper-tear filter serve as the sole organic separator between the hero and about sections.
- Increase vertical padding on mobile from `py-3` to `py-4.5` to give letter ascenders and descenders adequate breathing room.

---

## About

**Working:**
- The "Studio Spec Sheet" card on the left is one of the visual highlights of the entire website: the binder ring perforations down the left spine, the circular dashed "SCFA ALUM" stamp, and the technical specification layout look authentically designed for print.
- Section index header `[ 01 // ABOUT ]` with ghosted "01" watermark in the background sets a clean editorial magazine tone.
- Metadata credentials list at the bottom (`EDUCATION`, `TOOLS`, `EXPERIENCE`) has clear definition-term (`dt`) and definition-data (`dd`) hierarchy.

**Not working:**
- **Severe 3D phone collision (Desktop):** The 3D phone docks at the right edge of this section (`PhoneDockAnchor id="about"`), floating directly on top of the right paragraph lines ("experience", "flawless", "world of packaging", "luxury boxes"). It makes several sentences unreadable.
- In the "Studio Spec Sheet" card, listing "Canva" alongside CorelDRAW and Photoshop slightly dilutes the elite packaging engineer / prepress authority established by the rest of the spec sheet.
- The hand-drawn wave icon next to "Hi, I'm Amee Patel" is styled in bright coral and sits at an awkward baseline height relative to the font-display headline.

**Fix direction:**
- Eliminate the phone dock from the About section entirely, or place the anchor between the spec card and the text column only if a dedicated 3-column grid is provided. Body copy must never be obstructed by decorative 3D objects.
- Adjust the alignment of the wave icon to `align-middle inline-block -mt-1`.
- Consider replacing "Canva" with "Illustrator" or "InDesign" in the primary tools list to better align with the print dieline / CMYK packaging positioning.

---

## Services

**Working:**
- The 5-card grid structure breaks services into logical packaging and branding categories.
- The monospace calibration footer on each card ("DELIVERED PRINT-READY, MATCHED TO YOUR EXACT SPECS") reinforces technical competence.
- The subtle pill tags ("Pharmaceutical & Medical", "Cosmetics & Personal Care", "Luxury & Rigid Boxes") give prospective clients immediate confirmation of scope.

**Not working:**
- **3D phone collision (Desktop):** The phone docks on the left side (`left-1`), sitting directly over the left half of Card 1 ("All Types of Packaging Design") and Card 3 ("Local Business Branding & Advertising"). It covers tag pills and card text.
- **Generic SaaS icon containers:** The icon boxes use rounded pastel squares (soft coral, soft blue, soft yellow) with generic line icons. This styling feels like a modern SaaS dashboard or B2B tech template rather than high-end packaging design.
- The "By request" badges on the bottom two cards are styled in pale gray pills that look like disabled states.

**Fix direction:**
- Remove the phone docking anchor from the left margin of Services.
- Replace the pastel SaaS-style icon badges with technical print-inspired iconography: dieline knife icons, registration mark corners, swatch palettes, or embossing stamp glyphs rendered in crisp ink lineart.
- Restyle the "By request" badges into a distinct editorial tag (e.g. bordered monospace pill `border border-ink/20 text-ink-soft text-[10px] uppercase`).

---

## Pharma Specialization

**Working:**
- Dedicating an entire major section to pharmaceutical packaging is the site's strongest competitive differentiator.
- The warm raised background (`bg-paper-raised`) subtly distinguishes this section from adjacent white sections.
- The three bullet pill highlights ("Exact dielines & bleeds", "Accurate, print-checked label copy", "Print-ready files your manufacturer can run as-is") hit enterprise client pain points immediately.
- The 6 product cards showcase authentic pharmaceutical client work (Paracetamol syrup pediatric carton, 500mg tablet blister box, Kenheal wellness booklet, Medween bottle box).

**Not working:**
- **3D phone collision (Desktop):** The phone docks on the right side of Pharma, hovering directly over Card 3 ("Kenheal Healthcare — Clinical Nutrition & Wellness Portfolio") and completely obscuring its descriptive text.
- **Uneven card bottoms:** Card 1 (Paracetamol Syrup) has a tall vertical portrait box, while Card 2 (Paracetamol Tablets) has an oblong landscape box. The resulting image heights differ, making the card footer lines and "Pharmaceutical Range" labels misalign across the row.
- The "Discuss a pharma packaging project ->" CTA button in the header is pushed far to the right, floating disconnected from the introductory copy.

**Fix direction:**
- Deactivate the phone dock in Pharma or move the anchor into a dedicated banner breakout below the cards.
- Standardize the card mockup image aspect ratios (e.g. `aspect-[4/3]` with unified background padding) so all card titles, tags, and footers align on a consistent horizontal baseline.
- Group the "Discuss a pharma packaging project" CTA directly beneath the bullet pills on desktop to create a coherent reading path from problem statement to action.

---

## Portfolio

**Working:**
- The category filter pills ("All Work", "Packaging", "Brand Literature", "Logos & Branding", "Pharma & Healthcare") allow instant switching between specializations.
- The view toggle between Carousel and Grid gives visitors immediate control over density.
- In Carousel mode, cards slide cleanly with indicator dots and arrow buttons.
- The technical metadata bar ("PORTFOLIO SHEET" / "20 SPECIMENS" with hairline rule and registration crosshairs) is a standout print-craft detail.

**Not working:**
- **3D phone clashing with header:** The phone docks into the top-right corner of the section, cutting right through the ghosted "04" watermark, the registration crosshair, and the right margin of the filter pills.
- In Carousel mode on desktop, the 3rd visible card is cut off at the right screen edge, and the "Next project" button floats on top of the card's product photography.
- In Grid mode, when all 20 projects are rendered, the page length balloons dramatically to over 18,000px on mobile and 13,000px on desktop without a "Load More" or pagination break.

**Fix direction:**
- Remove the phone anchor from the Portfolio section header.
- In Carousel mode, add `px-12` gutter padding to the carousel track so the Next and Prev navigation buttons sit in clean margins outside the project cards rather than floating over the photography.
- In Grid mode, default to showing the top 9 projects with an editorial "Load More Specimens (+11)" button to preserve scroll ergonomics.

---

## Process

**Working:**
- The 4-step sequence (01 Brief & Specs → 02 Concept & Design → 03 Refinement → 04 Print-Ready Delivery) is concise, professional, and transparent.
- Registration crosshairs on the corner of each step card maintain the technical drafting aesthetic.
- The interactive `UnfoldingBox` component below the steps is brilliant in concept: demonstrating the transition from a 2D flat dieline to a 3D folded pharma carton directly proves the designer's technical mastery.

**Not working:**
- **3D phone collision:** The phone docks on the left margin, covering the text of Step 01 ("Brief & Specs").
- **UnfoldingBox lacks interaction cue:** In resting state, the Medween box in the UnfoldingBox container is already folded. The caption says "Every carton starts as a flat, print-ready dieline before it's cut, creased, and folded into the finished box", but there is no obvious play button, drag handle, or scrubber inviting the user to interact with the folding sequence.
- The large gray container card surrounding the UnfoldingBox has generous padding, but the white inner square on which the 3D box rests has flat white lighting that washes out against the cream background.

**Fix direction:**
- Remove the phone dock from the left side of Process.
- Add an interactive slider or step scrubber beneath `UnfoldingBox` labeled `[ 01: Flat Dieline → 02: Creased → 03: 3D Folded Carton ]` with an animated pulse indicator prompting interaction.
- Add subtle shadow ambient occlusion to the UnfoldingBox stage so the box appears grounded on a real proofing table.

---

## Why Partner / Testimonials

**Working:**
- The 3 metric cards at the top ("10+ Years of Expertise", "Print-Ready Guarantee", "Creative & Approachable") address client anxiety with hard facts (revisions, advance policy, press history).
- The client testimonials include verified client tags, project references (e.g. "Dholera Smart City Trifold Brochure"), and professional titles.
- The "Write a Review" button opens an accessible modal dialog, and "Studio Location" provides physical credibility.

**Not working:**
- **3D phone collision:** The phone docks on the right edge, covering the "Studio Location" button and obscuring the rightmost testimonial card.
- **Palette inconsistency:** The "★ 5.0 GOOGLE RATING · VERIFIED STUDIO" badge uses a warm yellow/amber pill background (`#FEF3C7` / text `#92400E`) that looks like standard Bootstrap/Tailwind defaults rather than staying within the CMYK + coral print palette.
- The carousel navigation arrow on the right overlaps the edge of the testimonial card text.

**Fix direction:**
- Remove the phone dock from the right margin of Trust.
- Restyle the Google Rating badge into the CMYK print system: use an ink-bordered pill with a solid coral star (`text-accent`) and monospace tracking.
- Position testimonial carousel arrow controls in a dedicated header bar next to the "Write a Review" button rather than floating over the cards.

---

## Contact

**Working:**
- The dark ink card (`bg-ink`) creates a dramatic, high-contrast visual anchor that clearly signals the final conversion area of the page.
- The live status pill ("Available for new projects" with pulsating emerald green dot) conveys immediate availability.
- Corner registration marks on the dark card preserve the print-craft visual grammar.
- The "Visit the Studio" card below includes an embedded, interactive Google Map with custom markers for Omkar Lotus, Chandkheda, providing authentic local presence.

**Not working:**
- The "WHAT CAN I HELP YOU DESIGN? (optional)" chips (Packaging, Brand Literature, Local Branding, Digital & Social, Custom Design) look like interactive filter buttons, but selecting them does not dynamically update the WhatsApp message link or form state.
- In the "Visit the Studio" card, the "Book an Appointment" button has an identical outline weight to the text box above it, lacking clear interactive affordance.
- On desktop at 1440px, the section layout is well-balanced, but on ultra-wide screens (1920px+), the phone dock anchor (`2xl:block`) re-activates and creates right-margin clipping.

**Fix direction:**
- Connect the category pills to the WhatsApp button URL: clicking a chip should toggle its active state (e.g. coral outline and fill) and append `?text=Hi%20Amee,%20I'm%20interested%20in%20[Category]` to the WhatsApp link.
- Give "Book an Appointment" a distinct hover background (`hover:bg-ink hover:text-paper transition-colors`).
- Remove the `contact` dock anchor completely to maintain the clean focus of the dark CTA card.

---

## Footer

**Working:**
- Clean 4-column layout on desktop: Brand + live local clock, Studio address, Navigation links, and Direct contact.
- Live clock ("AHMEDABAD, INDIA · 02:38 PM IST") adds dynamic craft and international client clarity.
- Subtle copyright line and smooth Back-to-Top circular arrow button.

**Not working:**
- **Collision with floating WhatsApp:** The Back-to-Top button sits in the bottom-right corner, directly adjacent to the persistent green WhatsApp floating button. On viewports between 1024px and 1280px, they overlap or crowd each other into an awkward cluster of round buttons.
- The text contrast of the secondary links in the navigation column (`text-ink-soft` on `#111318`) is slightly dark (~3.2:1 contrast ratio), failing WCAG AA guidelines for small text.

**Fix direction:**
- Lighten footer secondary navigation text to `text-paper/65` to guarantee crisp readability on dark ink backgrounds.
- Dock the Back-to-Top button with a fixed margin offset of 80px from the bottom or combine it into a clean floating utility group with WhatsApp.

---

## Mobile-specific issues (390px width)

1. **Section index headers clipped by sticky navbar:**
   - On mobile, tapping any navigation link or scrolling down positions the section index line (`[ 01 // ABOUT ]`, `[ 02 // SERVICES ]`, etc.) directly under the 74px sticky header. The top half of the text and CMYK dots are sheared off.
   - **Fix:** Add `scroll-mt-24` and `pt-8` to all section container elements.

2. **Hero phone is pushed below the fold & oversized:**
   - At 390×844, the hero heading, paragraph, CTAs, and client list push the 3D phone completely below the initial screen fold. Only the top 20px of the phone's bezel peeks into view.
   - When scrolled to, the phone occupies 100% of the mobile viewport width, nearly touching the screen edges with zero margin.
   - **Fix:** On mobile screens (`< sm`), reduce the hero headline font clamp to `text-3xl`, decrease paragraph line count or spacing, and scale the phone anchor to `max-w-[16rem]` with an explicit aspect ratio so the phone is visible above the 800px fold.

3. **Missing touch drag feedback on mobile hero phone:**
   - Swiping the phone on mobile tilts the entire 3D chassis along the Z axis, but does not drag the packaging design. Visitors expect a horizontal card swipe.
   - **Fix:** Bind touch drag directly to a sliding card transition or provide prominent mobile-optimized carousel chevron pills.

4. **Floating WhatsApp button obscures mobile content:**
   - The 56px WhatsApp floating button sits at `bottom-6 right-6`. On a 390px viewport, this button sits directly on top of:
     - The bottom-right badges of the hero phone artwork.
     - The "Ahmedabad Studio · 100% REMOTE" badge in About.
     - The "View Details ->" CTA in Portfolio cards.
     - The copyright and back-to-top button in the Footer.
   - **Fix:** On viewports under 640px, reduce the WhatsApp button to 44px diameter, move it to `bottom-4 right-4`, or integrate a persistent WhatsApp sticky bottom bar.

5. **Disappearance of the 3D phone after hero on mobile:**
   - All non-hero phone dock anchors have `hidden xl:block`. Consequently, as soon as the user scrolls past the hero, the phone drifts upward into negative coordinate space and vanishes completely for the rest of the mobile experience. While this prevents text collisions, the promised 3D portfolio experience is completely absent on mobile devices beyond the hero.
   - **Fix:** Rather than an all-or-nothing approach, render lightweight 2D interactive mockups for secondary sections on mobile, or provide a single dedicated mobile 3D showcase section in Portfolio.
