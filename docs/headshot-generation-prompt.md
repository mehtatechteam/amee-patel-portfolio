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
