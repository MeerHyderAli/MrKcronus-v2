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
2. Gateway — the crossing from the Hero into the Collection  dark → ivory
3. Collection — Manifest / Sequence / Board
4. Philosophy (Brand Statement)
5. Archive Teaser
6. Editorial / Craft
7. Journal
8. About
9. Join the Archive
10. Footer

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
- **Movement B — Sequence:** an approved scroll-linked cinematic
  sequence presenting each design as an object, with a distinct per-design
  mask personality. One sequence, six entries — not six chapters.

  **DURATION CORRECTED.** This previously read "an approved 360vh". The shipped
  runway is `400vh` on desktop and `300vh` on compact viewports, and 360 was
  never what the component used. The measured behaviour is now correct at every
  breakpoint, so the number in the prose was the thing that was wrong:
  `CollectionSequence.tsx` has never rendered a 360vh track. Treat the two
  figures above as the specification.
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

## Delivery Phases

**RECORDED IN PHASE 1.1 AT CLIENT INSTRUCTION.** This sequence was approved in
conversation and had never been written into the repository. It is recorded here
so future work does not re-derive it.

- **Phase 0** — Universe data model and canon.
  `src/components/universe/universe.ts`.
- **Phase 0.1** — Integrity-gate corrections. `npm run check:universe`.
- **Phase 1** — ACT II, the Gateway. `src/components/home/sections/Gateway.tsx`.
- **Phase 1.1** — Gateway coverage and handoff correction.
  **COMPLETE, MEASURED.** See the acceptance criteria and the measured results
  below. Its changes are in the working tree and remain **uncommitted**; no
  commit has been made on their behalf.
- **Phase 2** — ACT III. Relabel the Collection as Level 01 and pair each garment
  with its corresponding character artwork.

### Phase 1.1 acceptance criteria

1. At least 99% viewport coverage at handoff.
2. Portal at least 99% of viewport width and height at handoff.
3. No blank tail during the transition.
4. No additional pinned track. The Hero and Movement B keep both.
5. No horizontal overflow and no console errors.
6. Universe integrity **59/59**, typecheck, lint and build clean, all routes 200.

### Phase 1.1 measured results

Verified against a **production build** (`next build` then `next start`), not the
dev server. Viewports 1024x768 and 390x844 were rendered inside same-origin
iframes so that `svh` and the media queries resolved against those exact
viewports.

| Criterion | 912x670 | 1024x768 | 390x844 | Result |
|---|---|---|---|---|
| 1 — coverage at handoff | 100% | 100% | 100% | pass |
| 2 — portal width x height | 100% x 100% | 100% x 112% | 100% x 100% | pass |
| 3 — blank interval | 0 px | 0 px | 0 px | pass |
| 5 — horizontal overflow | 0 px | 0 px | 0 px | pass |
| Universe integrity | — | — | — | 59 passed, 0 failed |
| typecheck / lint / build | — | — | — | clean / clean / clean |
| All four routes | — | — | — | 200, zero console errors |

**Criterion 4 holds.** The Gateway is still unpinned; the Hero and Movement B
remain the page's only two pinned tracks. No pin was added to close the blank
interval — it was closed by rescheduling the section's own content.

### What actually caused the blank interval, for the record

It was **not** the scroll offset and **not** the stage height. Those had already
been corrected and were verified correct: with `offset: ["start end","start
start"]` and a `100svh` stage, coverage ramps linearly 0 to 100% and reaches
100% exactly at p 1.

The blank was a collision **between three timings inside the section**:

1. `portalOpacity` resolved at p 0.68 while `portalZ` resolved at p 0.90. A
   plane inside `perspective: 1100px` shrinks as z goes negative, so for 147px
   of scroll the ivory was fully opaque but only 725x542 — an opaque white
   rectangle floating in black, not a floor arriving.
2. `typeFade` resolved at p 0.62-0.80, so at p 0.68 the chapter was still at
   67% opacity, **in ivory, on an opaque ivory plane**. Measured, not inferred.
3. From p 0.90 to p 1.00, and on through the Manifest's `md:py-28`, nothing at
   all was on screen. Measured content-free interval: **179 px**.

The fix keeps the geometry and changes only the schedule: the type clears before
the ivory can wash it, opacity and arrival now resolve together at p 0.90, and
the chapter is re-set **in ink** as the floor lands and travels up with it into
the Collection. The handoff now ends with the chapter name handing to the
Manifest instead of an empty frame.

### Phase 2 constraints

- Preserve the six-entry canonical order.
- **Never present a character plate as a garment.** Garment and character art are
  distinct registers even when they depict the same entity.
- The Sigil has no character artwork and must not be given any.
- No phase beyond Phase 2 is defined here.

---

## Colourway Canon

**ADDED WITH THE DROP 1 APPROVAL.** This section amends "Current Product Scope"
and the Collection section above in one narrow, explicitly bounded respect. It
authorises colourway *presentation* and local *selection* on the landing page
only. **It does not authorise ecommerce.**

### What this section permits

- Drop 1 membership for all six designs.
- Catalogue codes `001` to `006`.
- Presentation of the five intended colour options per design.
- A local, accessible colour selector in Movement A.
- Standardized customer-facing colour names as the primary label.
- Verified source-provided poetic names and printed colourway labels, shown
  **secondarily only**.
- The `Drop 1 - Six designs` label in the Collection header.

### What this section continues to prohibit

Until a **separately approved ecommerce phase**, the following remain forbidden
and are **not** authorised by this exception:

- Prices and discounts.
- Cart and checkout.
- Payment processing.
- Inventory management and stock status or availability claims.
- Purchase confirmation.
- Any complete ecommerce implementation.

No variant identifier is a printed brand SKU, a stock keeping unit, or a promise
that a colour is purchasable. Selecting a colour names a colour; it does not
complete a purchase.

### Drop 1

All six designs belong to **Drop 1**. Drop membership, catalogue code and
colourway identity are three separate things and are modelled separately. Do not
build a generalized multi-drop system unless the architecture requires it.

| Design | Code |
|---|---|
| THE ARCHITECT | `001` |
| THE SIGIL | `002` |
| THE WITNESS | `003` |
| THE FRACTURE | `004` |
| THE ENEMY | `005` |
| THE UNKNOWN | `006` |

### The five house colours

Black, Deep Olive, Dark Chocolate Brown, Midnight Navy, Stone Beige.

These standardized names are always the primary customer-facing label. A poetic
name is never promoted to primary. UI swatch tokens in `globals.css` are
**representative interface colours only**, not measured garment specifications.

### Artwork canon

The supplied colourway PDFs are final and authoritative for Drop 1. Preserve the
supplied designs without reinterpretation, redesign, or AI-generated replacement.

- THE ARCHITECT `001` - crescent moon and star, front; cathedral corridor, back.
- THE SIGIL `002` - wordmark, front; gold compass sigil, back.
- THE WITNESS `003` - eye artwork, front; illustrated character, back.
- THE FRACTURE `004` - wordmark, front; shattered clock and city, back.
- THE ENEMY `005` - wordmark, front; beaked-mask figure, back.
- THE UNKNOWN `006` - crescent moon and star, front; hooded figure and moon, back.

**The cracked-clock attribution to The Architect is obsolete.** The clock belongs
to **The Fracture**.

### Known asset discrepancy — The Architect (recorded, deliberately unresolved)

The colourway PDF is authoritative for 001 and has been verified sheet by sheet.
**Two shipped assets do not match it, and have deliberately not been altered:**

- `public/brand/collection-board.png`, cell (0,0), depicts THE ARCHITECT with a
  cracked clock face, a hooded figure and a ruined city.
- `public/brand/artifact-architect.png` depicts the same obsolete artwork and is
  rendered as the Hero brand visual.

Replacing, redrawing, regenerating or cropping approved artwork is prohibited,
and the colourway PDF is a reference that is never cropped into a production
asset — so an accurate render of 001 does not exist in the corpus and cannot be
manufactured from what is here. Producing one is a **brand-supply action**, not a
code action.

Until it is reissued, the following rule holds and is enforced by
`scripts/check-universe.mjs`:

- The **data** records what 001 *is*: crescent moon and star, front; cathedral
  corridor, back.
- The **Hero alt text describes the pixels and names no design**, so the render
  is described accurately while the accessible name stays silent on canon the
  corpus cannot support.
- The **`/archive` plate alt may still mention a clock.** `The Architect.jpg` is
  Archive plate artwork, not the 001 print, and it genuinely contains an intact
  cracked clock with a hooded figure framed inside it. The rule above governs the
  *garment*, not the plate.

Do not "fix" the plate alt by removing the clock. Do not "fix" the board by
regenerating it.

### Source exceptions, preserved rather than normalised

- **THE ARCHITECT** - its sheets carry an unnumbered cover plus C1, C4, C5 and C6.
  **C2 and C3 are unverified and are not represented.** Its C4 is dark chocolate
  brown where C4 on every other design is midnight navy. These labels are
  reproduced as supplied and are never forced into a universal sequence.
- **THE ENEMY** - the sheets print `ORIGINAL COLOUR: BLACK` on all five pages
  while the garments visibly render other colours. That is a **defect in the
  source document** and must not override the colour data. It carries no poetic
  name, because the source prints none.
- **THE UNKNOWN** - its five sheets print **no** colourway name, number, or
  original-colour label. Its five colours are established by **visual inspection
  only**, and that provenance must be preserved. Missing source fields stay
  absent; never substitute an invented value.

### Numbering stays separate

Drop 1, catalogue codes `001` to `006`, colourway labels printed in the PDFs,
Archive `LEVEL 00-03`, Universe `Level 01`, and `TIMELINE 01 : COLLAPSED`.

These are six distinct schemes. Do not merge them and do not invent a hierarchy
between them.

### Assets

The composite colourway PDF pages are **references, not production assets**. They
are never cropped into production files, exactly as `collection-board.png` is
never cropped. No per-colourway production imagery exists, so the selector must
never imply that the board image depicts the selected garment colour.

### Garments are not character plates

A character illustration printed on a garment does not make the garment a
standalone character artwork plate. Collection garment designs remain
conceptually distinct from the Archive's character plates.

### Intended sequence

The landing page is completed first. Ecommerce follows only after a separately
approved phase.

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
