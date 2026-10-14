# THE WITNESS — Art-Direction Brief

**Status: ASSET DEPENDENCY. No production artwork exists.**

Nothing in this document is an asset, a spec sheet, or a claim that an image
exists. It is direction for artwork that has **not** been supplied. It governs
the asset if and when the brand produces one.

The same dependency applies to **THE FRACTURE (L04)** and **THE UNKNOWN (L06)**
— both exist only as cells inside the six-design boards and have no dedicated
artwork.

---

## 1. What is not decided here

No biography, origin, mythology, date, location, founder, material list,
technical specification or quote. The Witness carries the identifier and
nothing else. Interpretation belongs to the viewer.

`19·07` is a graphic motif and is never a date.

---

## 2. Role in the archive

| | |
|---|---|
| Position | **LEVEL 03**, between THE SIGIL and THE FRACTURE |
| Function | *observation*, not display |
| Contrast to | THE ARCHITECT (constructed object) · THE SIGIL (symbol) · THE WITNESS (a presence) |

The Architect is examined as a manufactured thing. The Sigil is examined as a
symbol. **The Witness is observed.** It should feel like something that is
already present and aware, rather than an object on a plinth. That is a
difference in staging, not in content.

---

## 3. Silhouette

- **Hooded, or the head turned away.** The face is never legible. Not obscured
  by a mask gimmick — obscured by posture, hood depth and falloff.
- Broad shoulder line, arms low. No action pose, no contrapposto flourish.
- Three-quarter or away-facing. Never square-on.
- The figure should occupy the frame generously and may be cut by the frame
  edge. A crop implies the scene continues past the viewport.
- Dark garment, matte surface, no shine. Fabric texture must survive in the
  midtones.

**Grounding in real MR.KCRONUS work:** `artifact-enemy.png` is the only
approved image of a hooded figure in the collection and is the correct tonal
precedent — high-contrast studio light, face lost, crosshair geometry present
in the print. `artifact-architect.png` carries a hooded figure inside a clock
face. The Witness should read as a sibling of those, not a departure.

**Grounding in the client reference:** the reference's masked/hooded figures
define the *photographic* register — dark, editorial, tactile, stone
environments. They are art direction only and must never be cropped or used as
artwork.

---

## 4. Framing

- Vertical figure, tall crop, generous headroom or a deliberate cut at the
  crown.
- Full-bleed or near-full-bleed for editorial use; a framed, inset
  presentation is appropriate for archive/catalogue use.
- Asymmetric placement. The figure is off-axis; the empty side carries the
  metadata.
- When framed, use `.image-frame` or `.archival-border`. Never a card.

---

## 5. Posture and presence

Stillness, weight, slight forward inclination or a slow turn caught mid-motion.
The figure reads as *having arrived* rather than *about to move*. Hands
obscured or at rest. Nothing gestural.

---

## 6. Lighting

Page-supplied and directional — see `VISUAL_SYSTEM.md` §3.

- Single dominant source, high and to one side. **Raking**, to reveal fabric
  texture and the shoulder line.
- Edge or rim light to separate the silhouette from the ground.
- Deep shadow across the face. Faces are not lit.
- Midtones preserved; the frame must not crush to flat black.
- One restrained warm bronze highlight maximum. Warm light against cool shadow.
- No fill light, no beauty lighting, no neon, no practical lamps.

If the artwork's own ground is lighter than the page, a backlight will be
invisible — measure before choosing the plane. `artifact-enemy.png` is a dark
figure on a dark ground; **raking front light, not backlight**.

---

## 7. Environment

Stone, concrete, oxidised metal, wet surface, fog. Architectural: thresholds,
stairs, walls, apertures. Ruins and weather only where the actual image
supports it — never a pasted-on texture implying a location.

The environment frames the figure and supplies atmosphere. It never competes.
Where a room is implied, it should be sparse and unresolved.

---

## 8. Surface treatment

Dark tactile material. Weathered, oxidised, damp. Distress is photographic and
belongs in the asset — **never** added as a CSS grain or noise overlay. Keep
low-frequency material variation; avoid uniform noise.

---

## 9. Recurring motifs

Draw from the existing MR.KCRONUS vocabulary. Do not invent a new geometric
language for this level.

| Motif | Source |
|---|---|
| Circular / compass / rose geometry | `ConstructionField`, and prints on A03/A04 |
| Crosshair / registration reticle | same |
| Thin architectural rules | `--rule`, `.archival-border` |
| Numbered records | `LEVEL 0n` metadata convention |
| Restrained bronze accent | gold, rare and meaningful |

Usage is capped at one motif instance per view — see `VISUAL_SYSTEM.md` §13.
**Designed, not decorated.**

---

## 10. Relationship to MR.KCRONUS branding

- The canonical symbol is the only permitted mark. Never redrawn, never
  restyled, never recoloured for this asset.
- Bronze/gold is rare and meaningful; it is not the subject's colour scheme.
- Any wordmark or printed type must use supplied brand typography only
  (Bodoni Moda display, Inter metadata). No third face.
- If a garment print is depicted, its graphic must be consistent with the
  existing collection prints — circular geometry, thin rules, crosshair,
  a single short line of set type.

---

## 11. Social and Instagram

If this asset is used or adapted for Instagram, the aspect crop must not
destroy the composition. Preferred crops, in order:

1. **4:5 portrait** — the figure with headroom. Primary.
2. **1:1** — figure centred, generous margin.
3. **9:16** — only if the source allows it without cutting the silhouette at
   an awkward joint.

Never crop so the face lands on a third. Never add text, borders or badges into
the image — treat any as a separate layer and keep them off the figure.

---

## 12. Intended use

| Surface | Treatment | Intensity |
|---|---|---|
| Home (LEVEL 03) | Full-bleed or large framed, asymmetric, page-supplied light | `home` tier |
| Archive | Framed, numbered, minimal — the record reading | `archive` tier |
| Story / Journal | Large crop, editorial, generous negative space | `story` tier |
| Lookbook | Photographic grid, no framing line, let it run | `lookbook` tier |
| Product (if ever) | Clear, front-on, well lit, legible | `product` tier — the one context where mystery yields to clarity |

The Witness is not required to appear in every context. Absence is acceptable;
a weak substitute is not.

---

## 13. Acceptance criteria for the eventual asset

1. Face is not legible.
2. Silhouette separates from the ground without a glow.
3. Fabric texture is visible in the midtones.
4. Midtones survive — nothing crushes to pure black.
5. No more than one warm bronze highlight.
6. Aspect ratio documented, and it survives a 4:5 crop.
7. No invented lore, date, place or name appears in the asset.
8. Consistent with A03/A04 tonal precedent.
9. Single dominant light source, raking.
10. Registered against MR.KCRONUS brand rules above.

---

## 14. Status

**Blocked on asset.** Levels 03 (Witness), 04 (Fracture) and 06 (Unknown) have
no dedicated production artwork. The homepage currently ends at LEVEL 02.

No substitute has been generated, and none should be. See
`VISUAL_SYSTEM.md` §15.
