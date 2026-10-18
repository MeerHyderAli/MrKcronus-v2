/**
 * THE CANONICAL COLLECTION
 *
 * Single source of truth for the six-design collection, in the order established
 * by the client's collection document and confirmed in AGENTS.md:
 *
 *   01  THE ARCHITECT   code 001
 *   02  THE SIGIL       code 002
 *   03  THE WITNESS     code 003
 *   04  THE FRACTURE    code 004
 *   05  THE ENEMY       code 005
 *   06  THE UNKNOWN     code 006
 *
 * THE THREE IDENTITIES ARE SEPARATE AND MUST STAY SEPARATE
 *
 *   drop      - release membership. All six designs belong to Drop 1.
 *   code      - the printed catalogue code identifying the design itself.
 *   variants  - the five intended colour options belonging to that design.
 *
 * A variant `id` is an INTERNAL technical key, not a printed brand SKU. It is
 * never rendered. Do not present it as a product code.
 *
 * WHAT IS AUTHORITATIVE
 * public/brand/collection-board.png is the canonical ordered collection
 * reference. It holds six genuine garment renders and it is shown WHOLE on
 * Movement C so the visitor always sees the complete collection rather than our
 * selection of it.
 *
 * THE COLOURWAY PDFs ARE REFERENCES, NOT PRODUCTION ASSETS
 * The six files in reference-materials/colourways/ were audited across all
 * thirty pages. Every page is a full-page JPEG: the PDFs contain no extractable
 * text, and each page composes a garment mockup, typography and four detail
 * panels into one marketing sheet. They were used to establish names, labels
 * and colour facts. They are NEVER cropped into production files, exactly as the
 * board is never cropped. No per-colourway production imagery exists, and
 * `variants[].image` is therefore omitted throughout: presenting a board cell as
 * a photograph of a particular colourway would be a fabrication.
 *
 * THE FIVE HOUSE COLOURS
 * Every design is intended in the same five colours. The customer-facing name is
 * always the standardized one below. The poetic name printed on a source sheet is
 * retained as SECONDARY metadata only, and only where it was actually verified.
 * A poetic name is never promoted to the primary label.
 *
 * SOURCE EXCEPTIONS - PRESERVED, NOT NORMALISED
 *
 *   THE ARCHITECT  Its sheets are numbered unnumbered-cover plus C1, C4, C5 and
 *                  C6. C2 and C3 are absent and are NOT represented here. Its C4
 *                  is dark chocolate brown where C4 on every other design is
 *                  midnight navy. These labels are reproduced exactly as supplied.
 *   THE ENEMY      The sheets print `ORIGINAL COLOUR: BLACK` on all five pages
 *                  while the garments plainly render olive, brown, navy and
 *                  beige. That label is a DEFECT IN THE SOURCE DOCUMENT and does
 *                  not override the colour data below. Its variants carry no
 *                  poetic name, because the source prints none.
 *   THE UNKNOWN    Its five sheets print no colourway name, no colourway number
 *                  and no original-colour label at all. Its five colours are
 *                  established by VISUAL INSPECTION ONLY. sourceName and
 *                  sourceLabel are deliberately absent - never substituted.
 *
 * THE COMPETING VARIANTS ARE NOT MERGED
 * Three different print descriptions for THE ARCHITECT once existed in this
 * file: the board's cracked clock face, a small chest sigil and corridor, and a
 * standalone hero render. The cracked clock is OBSOLETE. Per AGENTS.md the
 * supplied colourway PDF is final for The Architect: crescent moon and star on
 * the front, cathedral corridor on the back. The shattered clock belongs to THE
 * FRACTURE and is now recorded against it.
 *
 * KNOWN ASSET DISCREPANCY - REPORTED, NOT PAPERED OVER
 *
 * The DATA above is correct and matches the approved PDF. Two SHIPPED ASSETS do
 * not, and they were deliberately left untouched rather than quietly corrected:
 *
 *   public/brand/collection-board.png  cell (0,0) depicts the Architect with a
 *                                      cracked clock face and a hooded figure.
 *   public/brand/artifact-architect.png depicts the same obsolete artwork and is
 *                                      rendered as the Hero brand visual.
 *
 * AGENTS.md forbids replacing, redrawing, regenerating or cropping approved
 * artwork, and the colourway PDF is a reference and never a production asset, so
 * the correct render of 001 does not exist in the corpus. The two assets above
 * are also flagged in AGENTS.md as known drift. Producing an accurate 001 render
 * is a brand-supply action, not a code action: this file records what 001 IS,
 * the assets record what was last produced, and the discrepancy stays visible
 * until the brand reissues them.
 *
 * NO CODES ARE INVENTED
 * The garments carry codes inside the board artwork. The colourway PDFs supply
 * the full set 001-006 and the two sheets that print one visibly confirm
 * `WITNESS 003` and `KCR-04`, so a code column is now complete and is not
 * inferred. The Enemy's reviewed cover prints no code; its 005 comes from the
 * supplied filename, not from the artwork.
 *
 * NOTHING HERE IS ECOMMERCE
 * There are no prices, discounts, sizes, availability claims, stock states,
 * purchase buttons or buy buttons, no cart, no checkout and no /shop, /product or
 * /cart route. The six designs are presented as the collection they are, and none
 * of them is a link. A colourway variant describes a colour choice, nothing more.
 */

export type SequenceMask =
  /** The clip box grows from the bottom edge upward. */
  | "mask-up"
  /** Centre outward, horizontally: symmetric geometry. */
  | "mask-horizontal"
  /** A lateral wipe, for a portrait subject. */
  | "mask-left"
  /** Centre outward, vertically: something fracturing open. */
  | "mask-vertical"
  /** Dissolves through black. Reserved for the darkest plate. */
  | "fade-through"
  /** A circular iris from the centre, borrowing the ritual-circle motif. */
  | "iris";

/**
 * The five normalized house colours. This is the ONLY customer-facing colour
 * vocabulary in the product.
 */
export type HouseColour =
  | "black"
  | "deep-olive"
  | "dark-chocolate-brown"
  | "midnight-navy"
  | "stone-beige";

/**
 * One intended colour option belonging to a design.
 *
 * This is NOT a purchasable SKU and carries no commercial claim. It records a
 * colour choice so the visitor can name it.
 */
export type ColourwayVariant = {
  /**
   * Deterministic internal identifier, built as `<slug>--<colour>`.
   * Stable under reordering, never rendered, never a printed brand code.
   */
  id: string;
  colour: HouseColour;
  /** Standardized customer-facing name. Always the primary visible label. */
  name: string;
  /**
   * The poetic name printed on the source sheet, where verified.
   * Secondary information only. Absent where the source prints none.
   */
  sourceName?: string;
  /**
   * The colourway label exactly as printed, where verified.
   * Absent where the sheet prints none, or where the label is anomalous.
   */
  sourceLabel?: string;
  /**
   * Omitted throughout: no per-colourway production asset exists. A board cell
   * must never be presented as a photograph of one colour.
   */
  image?: { src: string; width: number; height: number; alt: string };
};

/** The single release every design currently belongs to. */
export const DROP_1 = "drop-1" as const;
export type Drop = typeof DROP_1;

export type CollectionDesign = {
  /** Canonical ordinal. Not editorial invention. */
  order: string;
  name: string;
  /** Stable key. */
  slug: string;
  /** Printed catalogue code identifying the design. Never a variant id. */
  code: string;
  /** Release membership. Not a variant, and not a level. */
  drop: Drop;
  /** How this design enters the stage. Part of the motion language. */
  mask: SequenceMask;
  /**
   * Where this design sits inside collection-board.png.
   *
   * The board is a 3-row, 2-column grid, so every cell is square and a cell is
   * exactly 50% of the board's width. Movement B shows each cell through a CSS
   * viewport of that cell's own size, which is why each design can be
   * presented at its native 512px and never upscaled.
   *
   * THE BOARD IS NEVER RE-ENCODED OR WRITTEN TO DISK. These coordinates are a
   * view onto the unmodified approved file, and Movement C always presents the
   * whole thing.
   */
  cell: { row: number; col: number };
  /**
   * The design's own entrance, in plain language, so the sequence's
   * choreography is declared as data rather than hard-coded inside the
   * component. Nothing here is inventory or lore.
   */
  entrance: string;
  /** Final canonical artwork description, as supplied. */
  artwork: { front: string; back: string };
  /** Exactly five intended colour options. */
  variants: readonly ColourwayVariant[];
};

/* -- THE FIVE HOUSE COLOURS, named once ------------------------------------ */

const BLACK: Pick<ColourwayVariant, "colour" | "name"> = {
  colour: "black",
  name: "Black",
};
const OLIVE: Pick<ColourwayVariant, "colour" | "name"> = {
  colour: "deep-olive",
  name: "Deep Olive",
};
const CHOCOLATE: Pick<ColourwayVariant, "colour" | "name"> = {
  colour: "dark-chocolate-brown",
  name: "Dark Chocolate Brown",
};
const NAVY: Pick<ColourwayVariant, "colour" | "name"> = {
  colour: "midnight-navy",
  name: "Midnight Navy",
};
const SAND: Pick<ColourwayVariant, "colour" | "name"> = {
  colour: "stone-beige",
  name: "Stone Beige",
};

export const COLLECTION: readonly CollectionDesign[] = [
  {
    order: "01",
    name: "THE ARCHITECT",
    slug: "architect",
    code: "001",
    drop: DROP_1,
    mask: "mask-up",
    cell: { row: 0, col: 0 },
    entrance: "rises from the bottom edge, monumental",
    artwork: {
      front: "crescent moon and star",
      back: "cathedral corridor",
    },
    /* Source labels reproduced exactly: an unnumbered cover plus C1, C4, C5
       and C6. C2 and C3 are absent from the supplied sheets and are not
       represented. Its C4 is dark chocolate brown, not midnight navy.

       VERIFIED AGAINST THE APPROVED PDF. All five sheets of
       "THE ARCHITECT COLOURWAY 001.pdf" were extracted and inspected: the
       front is a crescent moon and star above the MR.KCRONUS wordmark and the
       back is a cathedral corridor, on EVERY sheet. The labels below are
       transcribed exactly as printed, including the source's inconsistent zero
       padding - "COLOUR 04", "COLOUR 1", "COLOUR 5", "COLOUR 6" - which is
       preserved rather than normalised. */
    variants: [
      { ...BLACK, id: "architect--black", sourceName: "OBSIDIAN VOID", sourceLabel: "COLOUR 1" },
      { ...OLIVE, id: "architect--deep-olive", sourceName: "FORGOTTEN GROVE" },
      { ...CHOCOLATE, id: "architect--dark-chocolate-brown", sourceName: "EMBER EARTH", sourceLabel: "COLOUR 04" },
      { ...NAVY, id: "architect--midnight-navy", sourceName: "MIDNIGHT CHAMBER", sourceLabel: "COLOUR 5" },
      { ...SAND, id: "architect--stone-beige", sourceName: "ANCIENT SAND", sourceLabel: "COLOUR 6" },
    ],
  },
  {
    order: "02",
    name: "THE SIGIL",
    slug: "sigil",
    code: "002",
    drop: DROP_1,
    mask: "mask-horizontal",
    cell: { row: 0, col: 1 },
    entrance: "opens from the centre outward, symmetric",
    artwork: {
      front: "wordmark",
      back: "gold compass sigil",
    },
    variants: [
      { ...BLACK, id: "sigil--black", sourceName: "OBSIDIAN REALM", sourceLabel: "COLOUR 1" },
      { ...OLIVE, id: "sigil--deep-olive", sourceName: "VERDANT SANCTUM", sourceLabel: "COLOUR 2" },
      { ...CHOCOLATE, id: "sigil--dark-chocolate-brown", sourceName: "CHOCOLATE CITADEL", sourceLabel: "COLOUR 3" },
      { ...NAVY, id: "sigil--midnight-navy", sourceName: "MIDNIGHT CHAMBER", sourceLabel: "COLOUR 4" },
      { ...SAND, id: "sigil--stone-beige", sourceName: "STONE BEIGE", sourceLabel: "COLOUR 5" },
    ],
  },
  {
    order: "03",
    name: "THE WITNESS",
    slug: "witness",
    code: "003",
    drop: DROP_1,
    mask: "mask-left",
    cell: { row: 1, col: 0 },
    entrance: "wipes laterally, drifting in from the left",
    artwork: {
      front: "eye artwork",
      back: "illustrated character",
    },
    variants: [
      { ...BLACK, id: "witness--black", sourceName: "OBSIDIAN VEIL", sourceLabel: "COLOUR 1" },
      { ...OLIVE, id: "witness--deep-olive", sourceName: "VERDANT SEER", sourceLabel: "COLOUR 2" },
      { ...CHOCOLATE, id: "witness--dark-chocolate-brown", sourceName: "UMBER CHRONICLE", sourceLabel: "COLOUR 3" },
      { ...NAVY, id: "witness--midnight-navy", sourceName: "NOCTURNAL OBSERVATORY", sourceLabel: "COLOUR 4" },
      { ...SAND, id: "witness--stone-beige", sourceName: "PALE SANCTUARY", sourceLabel: "COLOUR 5" },
    ],
  },
  {
    order: "04",
    name: "THE FRACTURE",
    slug: "fracture",
    code: "004",
    drop: DROP_1,
    mask: "mask-vertical",
    cell: { row: 1, col: 1 },
    entrance: "splits open from the centre",
    artwork: {
      front: "wordmark",
      back: "shattered clock and city artwork",
    },
    variants: [
      { ...BLACK, id: "fracture--black", sourceName: "OBSIDIAN REALM", sourceLabel: "COLOUR 1" },
      { ...OLIVE, id: "fracture--deep-olive", sourceName: "VERDANT SEER", sourceLabel: "COLOUR 2" },
      { ...CHOCOLATE, id: "fracture--dark-chocolate-brown", sourceName: "UMBER CHRONICLE", sourceLabel: "COLOUR 3" },
      { ...NAVY, id: "fracture--midnight-navy", sourceName: "NOCTURNAL OBSERVATORY", sourceLabel: "COLOUR 4" },
      { ...SAND, id: "fracture--stone-beige", sourceName: "STONE BEIGE", sourceLabel: "COLOUR 5" },
    ],
  },
  {
    order: "05",
    name: "THE ENEMY",
    slug: "enemy",
    code: "005",
    drop: DROP_1,
    mask: "fade-through",
    cell: { row: 2, col: 0 },
    entrance: "dissolves through black",
    artwork: {
      front: "wordmark",
      back: "beaked-mask figure",
    },
    /* No poetic names: the source prints none. The sheets' printed
       `ORIGINAL COLOUR: BLACK` is a defect in the source document and does not
       override these colours. */
    variants: [
      { ...BLACK, id: "enemy--black" },
      { ...OLIVE, id: "enemy--deep-olive" },
      { ...CHOCOLATE, id: "enemy--dark-chocolate-brown" },
      { ...NAVY, id: "enemy--midnight-navy" },
      { ...SAND, id: "enemy--stone-beige" },
    ],
  },
  {
    order: "06",
    name: "THE UNKNOWN",
    slug: "unknown",
    code: "006",
    drop: DROP_1,
    mask: "iris",
    cell: { row: 2, col: 1 },
    entrance: "irises open from the centre",
    artwork: {
      front: "crescent moon and star",
      back: "hooded figure and moon",
    },
    /* No sourceName, no sourceLabel anywhere: the five sheets print none.
       These five colours are established by visual inspection only. */
    variants: [
      { ...BLACK, id: "unknown--black" },
      { ...OLIVE, id: "unknown--deep-olive" },
      { ...CHOCOLATE, id: "unknown--dark-chocolate-brown" },
      { ...NAVY, id: "unknown--midnight-navy" },
      { ...SAND, id: "unknown--stone-beige" },
    ],
  },
] as const;

export function getCollectionDesign(slug: string): CollectionDesign {
  const design = COLLECTION.find((entry) => entry.slug === slug);
  if (!design) {
    throw new Error(`Unknown collection design: ${slug}`);
  }
  return design;
}

/** The five intended colour options for one design, in house-colour order. */
export function getDesignColourways(slug: string): readonly ColourwayVariant[] {
  return getCollectionDesign(slug).variants;
}

/**
 * One colour option. Throws rather than returning undefined: an unknown colour
 * is a build error, not a runtime state to handle.
 */
export function getColourway(
  slug: string,
  colour: HouseColour,
): ColourwayVariant {
  const found = getDesignColourways(slug).find((v) => v.colour === colour);
  if (!found) {
    throw new Error(`Unknown colourway: ${slug} / ${colour}`);
  }
  return found;
}