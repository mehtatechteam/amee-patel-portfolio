# Visual polish audit — Amee Patel portfolio site

Paste everything below this line into any CLI coding agent that has browser/screenshot access (Claude Code, Cursor CLI, Codex CLI, Gemini CLI, etc.). It is a **critique-only** task — the agent must not edit any code.

---

## Your role

You are a harsh, detail-obsessed visual design critic auditing a live website. You are NOT checking whether things "work" (no broken links, no console errors) — assume the site functions. You are judging whether it looks genuinely premium, or like a template/prototype. A working implementation and a convincing one are different bars — grade the second one.

## Context

This is a one-page portfolio site for Amee Patel, a freelance print/packaging graphic designer (pharma boxes, food/cosmetic packaging, brochures, catalogs, logos). Visual language: a "print-craft" system — CMYK-derived colors (cyan/magenta/yellow alongside a coral accent), registration marks, editorial `[ 01 // SECTION ]` index headers, an ink/paper palette. The bar is Awwwards-tier craft, not a generic template.

The hero section was just rebuilt around a real 3D WebGL phone mockup (react-three-fiber) that shows the designer's product-packaging photography on its screen, one at a time, drag/swipe/arrow-navigable. It's meant to look as polished and dramatic as a professional rendered product mockup (think: the kind of glossy, dramatically-lit studio phone renders sold as premade Spline/Blender mockup packs — moody studio lighting, believable metal/glass materials, a real contact shadow, the on-screen content crisp and undistorted) — NOT like a placeholder gray box with a picture stuck on it.

## Method

1. Start the dev server if it isn't already running (`npm run dev` in the project root), then open `http://localhost:3000/`.
2. Screenshot the full page, then go section by section — scroll to each one and screenshot it individually — at **two widths**: desktop (~1440×900) and mobile (390×844).
3. Sections, in order: **Hero (including the 3D phone specifically)** → Marquee ticker → About → Services → Pharma Specialization → Portfolio → Process → Why Partner / Testimonials → Contact → Footer.
4. For the hero phone specifically: also interact with it (drag to change the displayed design, hover to see the tilt effect, use the next/prev arrows) and screenshot mid-interaction, not just the resting state.

## What to actually judge, per section

- **Composition & spacing** — is the whitespace intentional or accidental? Does anything feel cramped, orphaned, or randomly centered?
- **Typographic hierarchy** — is it obvious what to read first? Any weight/size/tracking inconsistencies?
- **Color & contrast** — does it stay disciplined within the CMYK print-craft palette, or does something look like it wandered in from a different design system? Any accessibility-fail contrast?
- **Motion/interaction quality** (where applicable) — smooth and purposeful, or janky/gratuitous?
- **For the hero phone specifically, go deeper:**
  - Do the materials read as real metal/glass, or flat and plasticky? Is the bezel proportion believable, or too thick/thin?
  - Is the lighting dramatic and directional (like a real studio product shot), or flat and shadowless?
  - Is there a real, grounding contact shadow, or does the phone look like it's floating/pasted on?
  - Is the on-screen design crisp, correctly cropped, and undistorted — or stretched/blurry/warped?
  - Does the whole object look intentionally composed (like a premium rendered mockup), or like a rough placeholder that happens to be 3D?

## Hard rules for your output

- **No vague praise or vague complaints.** Never write "looks good" or "needs polish" alone — name the specific visual thing and why. Bad: "the phone needs more polish." Good: "the phone's contact shadow is too small and too dark-edged — it reads as a drop-shadow filter, not light falling on a surface, which is why the phone looks like it's floating a few pixels above the backdrop rather than resting on it."
- **Cite what you actually saw**, not what you'd generically expect a site like this to need.
- Compare the hero phone against the mental bar of a genuinely polished rendered product mockup (dramatic studio lighting, believable materials) and say concretely where it falls short of that bar.
- Do not modify any code. Output only the audit.

## Output format

Markdown, structured like this:

```
# Visual Audit — [date/time]

## Top 5 priority fixes (ranked, most impactful first)
1. ...
2. ...

## Hero — 3D phone
**Working:** ...
**Not working:** ... (specific, with the "why")
**Fix direction:** ... (concrete — e.g. "increase directional light intensity from the upper-left by ~30%, add a second fill light from below-right to separate the phone edge from the background")

## Hero — layout/copy (excluding the phone)
...

## Marquee
...

## About
...

## Services
...

## Pharma Specialization
...

## Portfolio
...

## Process
...

## Why Partner / Testimonials
...

## Contact
...

## Footer
...

## Mobile-specific issues (390px width)
...
```

Save this audit as a markdown file and/or print it in full — it will be handed to a different agent to act on, so it must be self-contained and specific enough to implement from without re-looking at the site.
