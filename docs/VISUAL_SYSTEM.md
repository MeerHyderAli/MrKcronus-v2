# MR.KCRONUS — Visual System

Status: active. Establishes the vocabulary for **future** pages.
Introduced in Build 7. Nothing in this document has been retrofitted into the
approved Hero, Architect or Sigil sections.

---

## 0. Authority and precedence

This document is subordinate to the following, which always win:

1. **The canonical logo** (`/brand/mrkcronus-symbol*.png`, wordmark). Never
   redrawn, traced, approximated, distorted or regenerated.
2. **The approved source corpus** — the only permitted production imagery.
3. **The four palette values and two typefaces** — frozen. See §9.

Where the client reference board and the corpus disagree, **the corpus wins on
content and the reference wins on art direction.** The reference is a 12-panel
presentation board for the brand's wider system; it is not a source of
artwork, and nothing in it may be cropped, extracted or used as a production
asset.

The reference board spells the wordmark **MR.KRONUS**. MR.KCRONUS is
authoritative. Do not "correct" toward the reference.

---

## 1. Client visual direction

> **70% luxury fashion · 20% mysterious archive · 10% futuristic interaction**

The identity is *a luxury fashion house that discovered an ancient classified
archive.* Fashion supplies the discipline and the negative space; the archive
supplies the numbering, the hairlines and the coldness; "futuristic" is a
whisper, never a light source.

Explicitly not: gaming, cyberpunk, neon, HUD, glassmorphism, SaaS dashboard,
generic streetwear template, WebGL showcase, AI landing page.

---

## 2. Ground and atmosphere

The ground is **dense near-black, never flat `#000`**. Obsidian `#050505` is the
page; photographic and archival surfaces sit slightly above it so that edges
and divisions remain legible. This is the single most important rule in the
document — a flat black page reads as broken, not luxurious.

- Midtone detail must survive. If an image crushes to pure black, it is too dark.
- Atmospheric variation should be *warm/cool mixed*, not a single grey ramp:
  warm bronze in the highlights, cool neutral in the shadows.
- Atmosphere is supplied by the **page**, never by filtering the artwork.
  Low-opacity CSS gradient planes behind or in front of a subject; no
  `filter: brightness()`, no `contrast()` on production imagery.
- `--surface` (`#0b0b0b`) exists for panel grounds that must separate from the page.

## 3. Lighting model

Light is **page-supplied, directional, and always implied rather than shown.**

| Plane | Role | Where |
|---|---|---|
| Chamber | ambient falloff, whole room | behind everything, very low alpha |
| Backlight / pool | silhouette separation | behind an opaque subject, elliptical |
| Raking | surface modelling | directional, low alpha, one side only |
| Vignette | holds the frame | in front, weak, only the outer margin |

Rules:

- **A backlight only works behind a subject whose ground is at or below the
  page colour.** Against an opaque subject with a *lighter* ground, a backlight
  is completely hidden. Choose the plane by measuring the subject.
- Vignettes in front of artwork must stay weak (peak alpha ≈ 0.5 or less) or
  they lay a veil over the print. The vignette holds the corners, not the image.
- No lens flare, no bloom, no neon glow, no `backdrop-filter`.
- Light may *move* with scroll. That movement is what sells examination as a
  camera moving rather than an object being resized.

## 4. Silhouette language

The reference's figure language — and MR.KCRONUS's own, visible in
`artifact-enemy.png` and `artifact-architect.png` — is:

- **Hooded or masked.** The face is obscured, turned, or lost in shadow. Never
  a legible portrait; identity comes from posture and garment, not face.
- **Weight and stillness.** Broad shoulder line, arms low or crossed, no action
  pose. The figure occupies space rather than performing in it.
- **Three-quarter or profile**, never square-on flat and never fully profile.
- Backlit or edge-lit so the silhouette separates from the ground.
- Tall crop. Figures run large in frame and are frequently cut by the frame
  edge — a crop implies continuation beyond the viewport.

## 5. Surface and material language

Dark, tactile, physical. Stone, oxidised metal, weathered concrete, fog, wet
fabric. Distress is *photographic* — it belongs in the artwork, never added as
a CSS grain overlay. Keep fabric texture visible in midtones; a garment that
reads as a flat black shape has lost its tactility.

## 6. Composition rules

- **Asymmetry is the default.** Off-centre, unequal, weighted to one mass.
- **One dominant mass per view.** A single large artefact or figure.
- **Negative space is structural.** It is not leftover room; it is what makes
  the mass legible. Do not fill it because it exists.
- **Type sits at an edge**, not centred over the subject, unless the statement
  is the subject.
- **Precise alignment.** Metadata edges must land on a shared vertical axis.
  Rounding a position to "about right" is visible.
- Editorial crop devices the reference uses, available to us: full-bleed
  imagery, type/image splits, 4-up category strips, feature rows, thin-bordered
  image grids, large photographic crops.

## 7. Typography hierarchy

Two families, permanently.

| Role | Face | Treatment |
|---|---|---|
| Display | **Bodoni Moda** 500–600 | large, often uppercase, leading ≥ 1.0, generous |
| Interface / metadata | **Inter** | uppercase, 0.28em tracking, 11px, tabular numerals |

- `.display` and `.meta` / `.meta-stone` are the existing primitives. Do not
  create a third type treatment.
- Display is used **as composition** — it may be the largest thing on screen.
- Metadata is **never** used as a heading substitute, and never justified.
- Never below 1.5rem for display, never above 11px-equivalent for metadata.
- Bodoni's hairlines vanish on Obsidian below weight 500. Do not go lighter.

## 8. Image treatment

- Never brighten or recolour production artwork. Reveal it with light (§3).
- `next/image` with explicit `width`/`height`, `sizes`, and lazy loading below
  the fold. Always.
- **Do not upscale raster beyond source.** Artwork carries ~11px strokes and
  softens visibly.
- Deep blacks, controlled midtones, controlled highlight rolloff.
- Honour the natural aspect ratio. No stretching, no `object-fit` tricks that
  crop a garment's silhouette mid-edge without intent.

## 9. Spacing principles

- Base unit `--space-unit: 0.5rem`. All spacing is a multiple.
- Section rhythm is vertical and generous: a level gets room to be examined.
- Two-column splits are asymmetric — never 50/50.
- Negative space scales with viewport; gaps widen on larger screens rather than
  centring.

## 10. Responsive principles

- **Mobile-first.** Narrow viewports get their own composition, not a shrink.
- Reduce on mobile: depth, rotation, parallax, motif count, scroll track length.
- Preserve on mobile: hierarchy, negative space, artefact authority, pacing.
- **No horizontal overflow, ever.** Test 375 / 390 / 768 / 1024 / 1280 / 1440.
- Large touch targets, minimum 44px.
- Rotated metadata must fall back to horizontal below 48rem — see
  `.meta-vertical` in `globals.css`.
- No cinematic gate before commerce. The homepage may be cinematic; the route
  to a product must never be locked behind a scroll sequence.

---

## 11. Motif inventory — what already exists

Audited. **Do not duplicate these.** Every motif below is already implemented
and, where noted, already in use on approved sections.

| Motif | Existing primitive | In use |
|---|---|---|
| Registration marks, crosshair, compass/circle geometry, cardinal datum, diamonds | `ConstructionField.tsx` | Hero |
| Page-supplied radial light | `LightPool.tsx` (`peak`) | Hero |
| Structural hairline token | `--rule` | everywhere |
| Semantic horizontal rule | `.rule` (used on `<hr>`) | Footer |
| Vertical bay hairlines | inline `inset-y-0 … w-px bg-[--rule]` | Sigil |
| Drifting architectural datum | inline `h-px … bg-[--rule]` | Architect |
| Compact uppercase metadata | `.meta`, `.meta-stone` | everywhere |
| Oversized editorial serif | `.display` | everywhere |
| Final statement + invitation | `.title-statement`, `.cta-invitation` | Hero |
| Restrained bronze accent | `h-1.5 w-1.5 rotate-45 bg-gold` diamond | Hero |
| Chamber / backlight / vignette planes | per-section gradient constants | Architect, Sigil |

`.rule` (a horizontal divider) and `.archival-border` (a bounding box) are
**different primitives**. Do not merge them.

## 12. Motif primitives added in Build 7

Future-facing. **Nothing currently consumes them.** Deliberately not applied to
Hero, Architect or Sigil.

### `.archival-border`
Hairline bounding box for an archival panel, record or document.
`.archival-border--datum` adds an inset inner rule — the double-frame of a
classified file.

### `.meta-vertical`
Rotated editorial metadata via `writing-mode`, **not** `transform: rotate()` —
so it stays semantically correct, screen-reader safe, and cannot collide with a
Motion transform. Falls back to horizontal below 48rem.
`.meta-vertical--accent` is the only sanctioned use of Antique Gold here, and
only where the gold carries meaning (a live/active state, a rank).

### `.image-frame`
Hairline over an image edge, drawn with a pseudo-element so it does not alter
the image box. `.image-frame--outset` places the line just outside the image.
No fill, no radius, no shadow, no card appearance.

## 13. Motif usage caps

> **Designed, not decorated.** The existence of a motif is not a licence to use it.

| Motif | Cap |
|---|---|
| Registration / crosshair / compass | **One per view.** Compositional justification only. Never as decoration or behind body copy. |
| Circular geometry | Only when a circle is the subject. Never a background flourish. |
| Vertical metadata | Editorial and archive contexts only. Never in commerce UI. |
| Archival border | Image and archive contexts. Never on an interactive control. |
| Image framing line | Selected hero, editorial or artefact imagery. Never every image. |
| Antique Gold | **One focal use per view.** Actions and meaning only. Never decoration, never on a whole section, never on all six index numerals. |
| Hairlines | Structural — boundaries, axes, divisions. Never filler between arbitrary items. |
| Numbered records | Real cataloguing only. Never decorative counters. |

Adding a motif to a view that already uses two of the same family is the
signal to stop.

---

## 14. Interaction intensity

One variable set, selected by `data-intensity` on a page or section root.
Values are multipliers where **1 is maximum presence**. Nothing currently
consumes them; they state intent for future pages.

| Tier | `data-intensity` | imagery | atmosphere | motion | motif | type | space | transition |
|---|---|---|---|---|---|---|---|---|
| Most cinematic | `home` | 1.00 | 1.00 | 1.00 | 0.85 | 1.00 | 1.00 | 1.00 |
| Most mysterious | `archive` | 0.95 | 1.00 | 0.85 | **1.00** | 0.95 | 1.00 | 1.00 |
| Most photographic | `lookbook` | 1.00 | 0.70 | 0.70 | 0.35 | 0.90 | 0.85 | 0.80 |
| Most functional | `shop` | 0.80 | 0.35 | 0.45 | 0.25 | 0.80 | 0.70 | 0.55 |
| Functional + premium | `product` | 0.95 | 0.45 | 0.40 | 0.25 | 0.85 | 0.75 | 0.55 |
| Most archival | `story` | 0.85 | 0.75 | 0.55 | 0.55 | 0.90 | 0.95 | 0.75 |
| Most restrained | `about` | 0.70 | 0.55 | 0.40 | 0.30 | 0.85 | 1.00 | 0.65 |
| Most trustworthy | `cart` | 0.55 | 0.30 | 0.30 | **0.15** | 0.80 | 0.70 | **0.45** |

What each dimension governs:

- **imagery** — how large and how present an image may be.
- **atmosphere** — strength of gradient/light planes.
- **motion** — scroll amplitude and travel distance.
- **motif** — how many motif instances a view may carry.
- **type** — display scale ceiling.
- **space** — negative-space multiplier.
- **transition** — duration of UI transitions; shorter is more functional.

Interaction **frequency** (how many affordances a view offers) is deliberately
*not* a token. It is an authoring decision, not a scalar.

**Constraint:** these tokens must never be used to reduce text contrast. Where
`atmosphere` is low, legibility must be maintained by contrast, not by
brightening the ground.

---

## 15. Asset dependencies — the photography gap

**This is a content gap. No amount of CSS can close it.**

The client reference is built on dark hooded/masked editorial *figure*
photography. The approved corpus contains almost none of that class:

| Needed class | Available |
|---|---|
| Hooded/masked editorial figure photography | **One** — `artifact-enemy.png` |
| Garment flat / catalogue | `artifact-architect.png`, `collection-board.png`, A06, A08 |
| Dedicated Witness (L03) | **None** — exists only as a cell in the six-design boards |
| Dedicated Fracture (L04) | **None** — board cell only |
| Dedicated Unknown (L06) | **None** — board cell only |
| Detail / texture macro | **None** |

Consequences to accept, not to paper over:

- Even with all six levels built, the site reads as **garment photography**,
  not figure photography.
- Hero is typographic (the A05 plate), not photographic. That is a locked
  decision; the photographic weight therefore falls entirely to the levels.
- Do **not** generate substitutes. Do **not** use the client reference as
  photography. Do **not** extract a level from the six-design boards without
  explicit owner authorisation — a board is a multi-design artefact, and
  isolating a cell fabricates a product render.

Requested from the brand: dedicated Witness, Fracture and Unknown renders;
hooded editorial figure photography as a class; texture/detail macros.

See `docs/WITNESS_ART_DIRECTION.md` for the Witness direction that will govern
the eventual asset.

---

## 16. Known defect — do not adopt `--rule-stone`

`--rule-stone: rgba(95, 95, 200, 0.28)` is **defined but never used**, and its
value is **blue** (95, 95, **200**) — almost certainly a typo for Stone
(`#5F5F5A` = 95, 95, **90**). It contradicts the palette and the "no blue"
constraint.

Left untouched deliberately: the palette is frozen by Build 7's scope.
**It must not be used.** Correcting or removing it needs owner sign-off in a
later build.

---

## 17. Scope note

Build 7 added vocabulary only. It did not redesign Hero, Architect, Sigil,
Navigation or Footer; did not change any palette or typography value; did not
add a page, a route, a dependency, or any artwork.
