# AI headshot generation — prompt for Antigravity (v2)

Client (Amee) has no existing professional headshot and has agreed to an AI-generated one, built from her own reference photos. Reference photos are saved locally (gitignored, not committed) at:

- `assets/client/amee-headshot-ref-front.png` — front-facing
- `assets/client/amee-headshot-ref-side.png` — 3/4 side angle

Attach both as image references in Antigravity so it generates *from her actual likeness*, not a generic face.

## Why v2 exists

Round 1 (`amee-headshot-front.jpg` / `amee-headshot-side.jpg`, still in `assets/client/` for comparison) missed on three specific points — fix these, don't just re-roll the same prompt:

1. **Likeness drifted toward a generic face.** The reference photos show a rounder, fuller face shape, fuller cheeks, and a side-swept voluminous hairstyle. Round 1 came back with a visibly narrower face and straight center-parted hair — reads as "a professional South Asian businesswoman," not specifically her. If Antigravity's tool exposes an identity-strength / reference-weight / face-fidelity slider, max it out. If it doesn't, say so explicitly in the prompt (below) and consider generating at lower creative variance.
2. **The "3/4 angle" version wasn't actually turned.** Both outputs came back nearly identical, close to front-facing. The angle instruction needs to be unmissable, not a bracketed aside.
3. **Wardrobe didn't match between the two.** Round 1 had a white top under the blazer in one and a dark top in the other. v2 locks this to one exact garment description used verbatim in both runs.

## Prompt

```
Generate a professional editorial headshot of the woman in the attached
reference photo. Match her facial identity as closely as possible: the
reference shows a rounded, fuller face shape with full cheeks, a warm
tan skin tone, dark brown eyes, and a side-swept, voluminous hairstyle
with loose waves falling past the shoulders. Preserve these specific
features — do not generate a narrower face shape, straight hair, or a
generic interpretation. This must be recognizable as the same specific
individual, not an average or idealized version of her.

If a reference-image-strength, identity-preservation, or face-fidelity
control is available, set it to maximum / strongest setting.

Context: headshot for a freelance graphic designer's portfolio site.
Site's visual identity is a Swiss-precision print/pharma-packaging studio
aesthetic — clean, restrained, editorial, not corporate-stock-photo glossy.

Wardrobe (use this exact description in every generation, do not vary it
between shots): a solid charcoal-grey tailored blazer over a plain
off-white round-neck top. No patterns, no logos, no visible jewelry.

Background: plain, seamless studio backdrop in warm off-white/paper tone
(#fcfcfa) — must read as clean and uncluttered so it composites cleanly
into a small circular/rounded frame on a light card.

Lighting: soft, directional studio light with gentle shadow falloff —
photographically real, not the flat shadowless "AI headshot" look. One
soft catchlight in the eyes, natural skin texture retained (do not
airbrush to a waxy/plastic finish — that is the single most obvious AI
headshot tell and must be avoided).

Framing: head-and-shoulders portrait. THE HEAD AND SHOULDERS MUST BE
ROTATED [FRONT: 0°, facing the camera directly / SIDE: 35-40°, a clear
three-quarter turn — noticeably more shoulder and one side of the face
foreshortened than in a straight-on shot]. This rotation is required,
not optional — do not return a near-frontal pose for the side version.

Expression: warm, confident, approachable — matching the natural smile
in the reference photos, not a stiff corporate grin.

Do not add text, watermarks, logos, or graphic overlays. Do not change
her age, ethnicity, face shape, or any identifying feature from the
reference photo. Output at high resolution, portrait orientation.
```

Run it twice, swapping only the bracketed `[FRONT: ... / SIDE: ...]` rotation line — everything else, including the wardrobe paragraph, must stay byte-identical between the two runs so the pair actually matches as a set.

## After generating

Save the outputs as `assets/client/amee-headshot-front-v2.jpg` / `amee-headshot-side-v2.jpg` (keep the `-v2` suffix so round 1 stays around for comparison, don't overwrite it). Bring both back here — I'll look at them against the reference photos directly before anything gets wired into `DesignerSpecCard.tsx`. Don't rely on a self-generated review doc; a direct look at the images is the actual check.

## v3 — quality refinement, not a re-roll

"Photo not looking good" — the specific issue turned out to be **skin tone: the generated photo reads slightly darker than her actual skin tone** in the reference photos. Compare `assets/client/amee-headshot-ref-front.png`/`-ref-side.png` (real, correct tone) against `amee-headshot-front-v2.jpg` (generated, currently too dark) side by side before running this — that comparison is the actual target, not a vague "make it look better."

Rather than regenerate from scratch — which risks losing the likeness Amee already confirmed on v2 — this is a **refinement pass**: keep everything about v2 (identity, wardrobe, pose, background) and correct the skin tone specifically, plus the same realism polish as before.

Pass `assets/client/amee-headshot-front-v2.jpg` itself as the base image (image-to-image / refine, not text-to-image from scratch), plus the two original reference photos for identity *and skin-tone* grounding, if the tool supports multiple reference images with different roles.

```
Refine this headshot. Keep everything about the composition exactly
as-is: the same person, the same pose, the same charcoal blazer over an
off-white top, the same plain warm off-white background, the same
framing. Do not change her face shape, features, or identity — this must
still read as the same specific person as the base image.

Skin tone — the main fix needed: the base image's skin tone is visibly
darker than her real skin tone shown in the attached reference photos.
Correct it to match the reference photos' actual warm tan tone exactly —
do not darken, do not add an orange/bronze cast. Match the reference,
not a generic "warm skin" default.

Other realism fixes, same pass:

Skin texture: replace any smoothed/airbrushed/plastic-looking texture
with real skin detail — visible pores, natural tonal variation, a little
asymmetry. Waxy-smooth skin is the single biggest tell that a headshot
is AI-generated.

Eyes: sharpen specifically. Clear, natural catchlight and crisp iris
detail — soft/mushy eye rendering reads as artificial fast.

Lighting: real dimensionality — a clear light direction with soft but
visible falloff and shadow, not flat/shadowless studio lighting.

Sharpness: increase overall micro-detail (hair strands, fabric weave,
skin texture) without oversharpening into haloing or artifacts.

Do not: change her pose, wardrobe, background, crop, or facial identity.
This is a correction + polish pass, not a new generation.
```

Save the result as `assets/client/amee-headshot-front-v3.jpg` (don't overwrite v2 — same reasoning as before, keep the prior round around for comparison). Bring it back here before it goes anywhere near the component.

## v4 — forceful skin-tone correction

v3 maintained the deeper bronze tone due to visual conditioning from the v2 base image. For v4, the instruction explicitly forced a 3–4 shade lighter shift to directly match the light-to-medium warm wheatish tone of the original reference photos (`amee-headshot-ref-front.png` / `-ref-side.png`).

```
CRITICAL MANDATORY CORRECTION — SKIN TONE MUST BE SIGNIFICANTLY LIGHTER:
The base headshot (third image) is far too dark and deeply bronze-tanned. That is incorrect.
The first two attached reference photos show her true complexion: a noticeably lighter, fair-to-medium warm wheatish Indian skin tone (soft golden-beige / light warm undertones).
You MUST lighten her facial, neck, and chest skin tone by 3 to 4 shades so it accurately reflects her real, lighter complexion from the reference photos. Do not generate dark or bronze skin. Her skin must be visibly lighter, luminous, and natural.

Preserve everything else from the base composition:
- Identity & Likeness: Keep her exact facial structure, bone shape, round face with full cheeks, dark brown eyes, and friendly natural smile.
- Hair & Wardrobe: Keep the dark wavy hair falling past the shoulders, and the tailored solid charcoal-grey blazer over a plain off-white round-neck top.
- Background & Lighting: Plain seamless studio paper backdrop in warm off-white (#fcfcfa). Soft, directional studio lighting with gentle falloff.
- Realism: Realistic, sharp micro-detail — crisp iris with clear natural catchlight, authentic skin texture with visible pores and natural tone variations (avoid any waxy, airbrushed, or plastic AI look). High resolution editorial portrait.
```

Saved as `assets/client/amee-headshot-front-v4.jpg`.

## v5 — attire reads as cheap, fix the fabric and tailoring specifically

Feedback on v4 (skin tone now correct, confirmed): the blazer reads as cheap. "Cheap-looking" in an AI-generated garment is almost always one or both of: (1) a flat, slightly plasticky/synthetic-looking fabric sheen instead of real woven-cloth texture, and (2) a boxy, generic-fit cut instead of an actually tailored line (structured shoulder, clean lapel roll, fabric that drapes rather than sits stiff). Naming "charcoal-grey blazer" alone leaves the model to fill in that detail with its own default, which is what produced the cheap read — same lesson as the skin-tone rounds: describe the specific target, don't rely on the model inferring quality from a generic noun.

Base image: `assets/client/amee-headshot-front-v4.jpg` (keep skin tone and everything else from v4 — this pass only targets the blazer).

```
Refine only the blazer in this headshot. Everything else — her face,
skin tone, hair, expression, the off-white top underneath, the
background, the lighting, the crop — must stay exactly as it is in the
base image. Do not regenerate the person, only refine the garment.

The current blazer reads as cheap: flat synthetic-looking fabric sheen,
a boxy/generic cut with no real tailoring line. Replace it with a
visibly premium, well-tailored blazer:

Fabric: a fine wool or wool-blend suiting fabric with real woven texture
visible up close (a subtle herringbone or twill weave, not a flat solid
color-fill) — matte to soft-satin finish, never glossy or plastic-looking.
Charcoal grey, same tone as the base image.

Tailoring: structured, fitted shoulders (not sloped or boxy), a clean
lapel that rolls naturally rather than sitting flat, visible but subtle
stitching detail at the lapel edge and cuffs, and a fit that follows her
shoulder line rather than hanging loose. This should read as a
tailored, expensive garment — think an editorial business portrait, not
a stock-photo polyester blazer.

Drape: the fabric should fold and crease naturally with her pose (soft
shadow in the folds), not sit stiff and flat like a rendered/plastic
surface.

Do not change the color, the off-white top underneath, or add any
pattern, logo, pin, or accessory not already present.
```

Save as `assets/client/amee-headshot-front-v5.jpg` (keep v4 for comparison). Bring it back here — same as every round, I'll compare directly against v4 before anything changes in the component.
