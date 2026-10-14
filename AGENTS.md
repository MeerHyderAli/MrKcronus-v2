# MR.KCRONUS v2 — Project Instructions

## Project Identity

MR.KCRONUS is a premium, cinematic, story-driven streetwear brand experience.

The website should feel:

- ancient
- futuristic
- architectural
- mysterious
- premium
- minimal
- editorial
- cinematic
- experimental
- precise

It must not feel like:

- a Shopify template
- generic ecommerce
- SaaS
- gaming UI
- cyberpunk
- anime
- generic WebGL demo
- generic AI landing page
- excessive glitch/neon design

The experience should feel like entering an archive or examining artifacts.

---

## Current Product Scope

Current phase is BRAND EXPERIENCE ONLY.

Build:

- Homepage
- Archive
- Story
- About

Do NOT implement ecommerce yet.

Future ecommerce may include:

- products
- product detail
- variants
- cart
- checkout
- payments
- inventory
- orders
- accounts
- admin
- commerce database

Do not introduce those systems prematurely.

---

## Canonical Assets

The canonical MR.KCRONUS logo is the absolute visual source of truth.

Never:

- redraw it
- reinterpret it
- replace it
- distort it
- simplify its geometry
- invent alternate geometry
- AI-generate a replacement

The supplied exploded symbol artwork is also a source-of-truth reference.

Never assume that visual pieces in a flat raster image are independently available layers.

Inspect actual asset formats before designing decomposition or animation systems.

---

## Design Language

Primary colors:

Obsidian:
#050505

Ivory:
#F5F5F0

Stone:
#5F5F5A

Antique Gold:
#A89B7A

Gold must be extremely restrained.

Typography:

- one high-fashion editorial serif
- one modern sans-serif
- maximum two font families

Avoid unnecessary font proliferation.

---

## Motion Language

Motion should feel:

- slow
- weighted
- fluid
- deliberate
- precise
- cinematic
- premium

Avoid:

- bouncing
- playful springs
- random floating
- constant motion
- excessive particles
- rapid camera movement
- excessive blur
- glitch effects
- neon effects

Prefer:

- transforms
- opacity
- CSS perspective
- Motion
- masks
- clip-path
- 2.5D depth
- scroll progress
- IntersectionObserver

Use WebGL/Three.js only when it provides a clearly demonstrated benefit.

---

## Homepage Narrative

**BUILD 13 SUPERSEDES ALL PREVIOUS HOMEPAGE NARRATIVE DIRECTION.**

The retired narrative was:

VOID
→ MR.KCRONUS
→ CANONICAL SYMBOL
→ SYMBOL ASSEMBLY
→ SYMBOL ACTIVATION
→ EXPLODED / EXPLORED SYMBOL
→ ARCHIVE ANALYSIS
→ SYMBOL RECONSTRUCTION
→ THE ARCHITECT
→ THE SIGIL
→ THE COLLECTION
→ THE ENEMY
→ THE ARCHIVE
→ THE ARCHIVE IS OPEN

That narrative is **retired**. It is superseded by the architecture below.

### `/` is the MR.KCRONUS fashion-house front door

`/` must read as **entering a fashion house**, not entering the archive and
progressing through a mythology. Commerce must appear early. The homepage
presents and introduces; it does not contain the full narrative.

Approved homepage order:

1. Hero
2. Collection — Manifest / Sequence / Board
3. Philosophy (Brand Statement)
4. Archive Teaser
5. Editorial / Craft
6. Journal
7. About
8. Join the Archive
9. Footer

### Division of responsibility

- The homepage's **primary collection experience is the six-design Collection.**
- The **full mythology and cinematic narrative belong to `/archive`.**
- `/archive` is the destination for the eight Archive artworks, the eight
  Archive chapter components, `ArchitectSection` and `SigilSection`.

### The six-design Collection is one unified sequence

The Collection is a **single unified homepage experience**. It must NOT
become six separate Archive chapters, and must NOT return to the old
archive-crawl structure.

### Rich cinematic motion is permitted and expected

The homepage may use rich, cinematic, fluid motion — typography choreography,
image depth, controlled parallax, mask reveals, section transitions and
scroll-linked sequences — **without returning to the old archive crawl.**

Motion quality comes from choreography, not from vertical length. Do not
lengthen the page merely to create animation.

Use controlled scroll-linked motion where it materially improves the
experience. Do not pin every section. The scroll should feel like
controlling a cinematic camera.

---

## Hero

Approximately 100–120svh desktop, 85–100svh mobile.

**REVISED IN BUILD 13 PHASE 17, AT CLIENT INSTRUCTION.**

The Hero's **symbol choreography is restored and must not be removed again.**
An earlier Build 13 phase replaced it with a static split, on the reading that
the homepage should simply be calmer. That was wrong, and the client corrected
it: this is the signature motion of the house.

The Hero carries the full logo scroll animation:

    0.00-0.10  VOID        the construction field resolves out of nothing
    0.08-0.22  MR.KCRONUS  the wordmark masks in from the left
    0.20-0.40  THE SYMBOL  the canonical mark arrives out of the depth
    0.30-0.72  ASSEMBLY    the field expands and turns to frame it
    0.40-0.68  LIGHT       the page supplies the light the mark needs
    0.46-0.66  ACTIVATION  the single gold cast
    0.62-0.94  RECEDING    the mark returns to depth as a watermark while
                           the front door resolves over it

The Hero is pinned for **one viewport** of scroll, not the retired seven. All
seven beats are preserved, resolved across a 140svh runway.

Still retired, and still correct:

- The **exploded archive plate** beat - it belongs to the Archive Teaser.
- The **THE ARCHIVE IS OPEN** statement - it belongs to the Archive Teaser.
- The **760svh** duration - seven beats across 660svh was the archive crawl in
  miniature.

The Hero now establishes:

Antique Gold appears exactly once in the Hero: the activation cast. It is a
cast OVER the ivory mark, never a replacement, so the canonical geometry is never
recoloured and the fused core is never split.

The Hero now establishes:

- identity
- atmosphere
- fashion
- visual confidence
- brand positioning
- one clear action

It uses the highest-resolution approved standalone visual as a hero / brand
visual. This is **not** a canonical collection product specification.

The CTA must be a real interactive HTML element.

Never bake interactive text into an image.

The Hero is the strongest motion moment on the page: typography choreography,
image depth, atmospheric movement, CTA entrance and a controlled scroll
transition into the Collection.

---

## The Architect

Use the supplied Architect artwork as a cinematic artifact.

Suggested labeling:

LEVEL 01
THE ARCHITECT

Use:

- depth
- parallax
- framing
- controlled lighting
- masking
- layered composition

Do not invent extensive lore.

**Placement note:** `ArchitectSection.tsx` remains a preserved, approved
component. Under Build 13 it is **not rendered on `/`**. It remains available
for `/archive` and future cinematic work. Do not delete it. Do not silently
violate this by re-inserting it into the homepage.

---

## The Sigil

Treat the canonical symbol as an important artifact.

The section should feel like examining the symbol rather than browsing a
product.

**Placement note:** `SigilSection.tsx` remains a preserved, approved
component. Under Build 13 it is **not rendered on `/`**. It remains available
for `/archive` and future cinematic work. Do not delete it. Do not silently
violate this by re-inserting it into the homepage.

---

## Collection

Six designs:

01 — THE ARCHITECT
02 — THE SIGIL
03 — THE WITNESS
04 — THE FRACTURE
05 — THE ENEMY
06 — THE UNKNOWN

`public/brand/collection-board.png` is the **canonical ordered collection
reference** and is authoritative for the six-design set.

Do not blend competing design variants into one canonical print. Do not
reconcile them. Where variants exist, the Collection board governs.

Approved structure — three movements, one experience:

- **Movement A — Manifest:** an ordered typographic index of the six
  designs with numerals, names and codes.
- **Movement B — Sequence:** an approved 360vh scroll-linked cinematic
  sequence presenting each design as an object, with a distinct per-design
  mask personality. One sequence, six entries — not six chapters.
- **Movement C — Board:** the complete `collection-board.png` shown whole.
  Never crop the board into new production files. Never derive assets from
  external documents.

Present these editorially.

Do not introduce:

- prices
- stock
- cart
- buy buttons
- ecommerce specifications
- sizes
- colourways
- product links
- fake product renders

Designs shown in the Collection are **not links**. Do not imply a product
route that does not exist.

---

## Universe

**PHASE 0. AUTHORITATIVE CANON.** The rules below govern the universe model in
`src/components/universe/universe.ts` and supersede any earlier inference about
what the Collection, the Archive and the narrative entries have in common.

### Level 01 is the current story chapter

Level 01 is the current narrative chapter. It contains **six ordered entries**.
Do not assume every entry is a character: an entry may be a **character**, a
**symbol**, or an **event**, and a level may mix these kinds.

The six current entries, in order:

01 — THE ARCHITECT
02 — THE SIGIL
03 — THE WITNESS
04 — THE FRACTURE
05 — THE ENEMY
06 — THE UNKNOWN

### The Sigil is the symbol, not a character

THE SIGIL is **the symbol**. Preserve its identity as a symbol. Do not invent
character artwork for it, do not assign it a body, a face, a role or a
behaviour, and do not render it as a depicted figure. If a future entry has no
artwork, that absence is the correct state — it is never filled with a
substitute.

### The Enemy is one entry with two representations

The armoured garment representation and the beaked-mask character artwork
depict **the same canonical entity**. They are one Level 01 entry, not two.

Keep the two **registers** distinct while associating them with that single
entity: a garment is a product rendering, character artwork is an editorial
plate. They are not interchangeable, and one is not a substitute for the other.

### The three registers are not one list

The following are **distinct data registers** and must never be merged into a
single list:

1. **Collection designs** — six garments, the canonical set.
2. **Level 01 narrative entries** — the six ordered entries above.
3. **Archive-only lore** — Archive plates that are not Level 01 entries.

They do not line up one-to-one. An entry references a garment and/or character
artwork **by key**, and never copies the garment or artwork fields — masks,
cells, dimensions, alt text and light remain owned by the Collection and the
Archive. Neither canonical dataset is edited to make the model fit.

An entry's `name` and `order` are **narrative-owned and deliberately not
derived**. They describe the Level 01 entry in the narrative's own register,
which is independent of the Collection's uppercase design labels and of the
Archive's level classification. Because they are declared rather than derived,
they are **validated against** whatever the entry binds to, so a mismatch is
reported rather than inherited.

### Universe numbering is independent of Archive numbering

The universe's narrative numbering is a **separate scheme** from the Archive's
`LEVEL 00 – CLASSIFIED / LEVEL 01 – THE ARCHITECT / LEVEL 02 — UNKNOWN /
LEVEL 03 — CLASSIFIED` classification in the Archive section below.

Preserve all existing Archive numbering and its meaning **unchanged**. Where
both schemes use the words "Level" and "01", they are not the same thing, and
they must never be reconciled, aliased or renumbered against each other.

### Nothing assumes six

No level declares a length. Future levels and future entries are added **as
data**, in this one file, without editing a component. Do not hard-code a count
of six anywhere downstream.

### This model renders nothing

The universe model is a typed registry with strict resolvers. It contains no
visual behaviour. Adding an entry does not add a reveal, a page, or a route.

---

## The Enemy

Treat The Enemy as mysterious and classified.

Do not turn it into:

- gaming UI
- HUD
- character stats
- combat interface
- fantasy character card

---

## Archive

`/archive` is the home of the full mythology and cinematic narrative.

The following must **NOT** be rendered on `/`:

- ArchiveChapter
- ArchitectArchiveChapter
- FractureChapter
- WitnessChapter
- GodsChapter
- WarChapter
- EnemyChapter
- UnknownChapter
- ArchitectSection
- SigilSection

Their files must be **preserved**, not deleted. They remain available for
`/archive` and future cinematic work. The homepage discovers the Archive; it
does not reproduce it.

Initial structure:

LEVEL 00 — CLASSIFIED
LEVEL 01 — THE ARCHITECT
LEVEL 02 — UNKNOWN
LEVEL 03 — CLASSIFIED

Do not fabricate extensive lore.

---

## Story

Story is visual-first.

Use:

- large imagery
- typography
- controlled scrolling
- editorial composition
- minimal copy

Do not build a conventional blog.

---

## About

Keep About minimal.

Do not invent:

- founder history
- dates
- locations
- manufacturing claims
- sustainability claims
- fake press
- testimonials
- achievements

Only use information actually supplied by the brand.

---

## Navigation

Desktop:

[SYMBOL] MR.KCRONUS

ARCHIVE
STORY
ABOUT
ENTER

Mobile:

[SYMBOL] MR.KCRONUS
MENU

Navigation should remain minimal and restrained.

---

## Accessibility

Every implementation must consider:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible controls
- meaningful alt text
- sufficient contrast
- reduced motion

Reduced-motion mode should provide a deliberately simplified experience.

---

## Performance

Performance is a design constraint.

Avoid:

- huge DOM trees
- excessive React state during scroll
- giant particle systems
- expensive continuous blur
- giant background videos
- unnecessary WebGL
- multiple simultaneous 3D scenes

Prefer GPU-friendly properties:

- transform
- opacity

Use lazy loading and responsive image strategies.

Target:

LCP < 2.5s
INP < 200ms
CLS < 0.1

---

## Engineering Rules

Use Server Components by default.

Use Client Components only when interactivity or browser APIs require them.

Keep animation logic close to the visual component that owns it.

Do not create generic abstraction layers prematurely.

Do not create a design system for hypothetical future requirements.

Do not install dependencies without a concrete reason.

Do not modify unrelated files.

Do not rewrite working infrastructure unnecessarily.

---

## Verification

After implementation changes:

1. Run lint.
2. Run TypeScript checking.
3. Run production build.
4. Inspect the changed UI.
5. Check desktop and mobile.
6. Check reduced-motion behavior when relevant.

Never claim a task is complete without verification.

---

## Working Style

Before making substantial changes:

- inspect existing code
- inspect relevant assets
- understand dependencies
- identify risks
- make the smallest coherent change

When uncertain, investigate rather than invent.

When a requested visual effect cannot be achieved accurately with the supplied assets, say so explicitly.

Do not silently substitute an approximate visual.

---

## Git Safety

Do not reset, force-push, delete branches, or destroy user work unless explicitly instructed.

Do not modify unrelated work.

Keep commits logically scoped when commits are requested.

---

## MR.KCRONUS Principle

The website should feel designed, not generated.

Every animation, transition, frame, and element must have a reason to exist.

Restraint is part of the design.