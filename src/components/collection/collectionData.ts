/**
 * THE CANONICAL COLLECTION
 *
 * Single source of truth for the six-design collection, in the order established
 * by the client's collection document and confirmed in AGENTS.md:
 *
 *   01  THE ARCHITECT
 *   02  THE SIGIL
 *   03  THE WITNESS
 *   04  THE FRACTURE
 *   05  THE ENEMY
 *   06  THE UNKNOWN
 *
 * WHAT IS AUTHORITATIVE
 * public/brand/collection-board.png is the canonical ordered collection
 * reference. It holds six genuine garment renders - all six designs are the
 * same short-sleeve black tee - and it is shown WHOLE on Movement C so the
 * visitor always sees the complete collection rather than our selection of it.
 *
 * THE COMPETING VARIANTS ARE NOT MERGED
 * Three different print designs exist for THE ARCHITECT alone: the board's
 * cracked clock face, the collection document's small chest sigil and corridor,
 * and the standalone artifact-architect.png hero render. They are deliberately
 * left unreconciled. Where a print is ambiguous the board governs; the
 * standalone render is a HERO / BRAND VISUAL and is never presented as the
 * canonical product specification.
 *
 * NO CODES ARE INVENTED
 * The garments carry codes (KCR-02, WITNESS 003, KCR-04, ENEMY 005, KCR-06)
 * inside the board artwork, but no code is legible for 01, so no code column
 * exists here. A column that was half empty, or filled with a guessed "KCR-01",
 * would be worse than no column. The codes remain legible where they belong:
 * inside the board.
 *
 * THE SIX ARE NOT PRODUCTS
 * There are no prices, sizes, colourways, stock states or buy buttons, and no
 * /shop, /product or /cart route. These six are presented as the collection
 * they are and none of them is a link.
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

export type CollectionDesign = {
  /** Canonical ordinal. Not editorial invention. */
  order: string;
  name: string;
  /** Stable key. */
  slug: string;
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
   * The character's own entrance, in plain language, so the sequence's
   * choreography is declared as data rather than hard-coded inside the
   * component. Nothing here is inventory or lore.
   */
  entrance: string;
};

export const COLLECTION: readonly CollectionDesign[] = [
  {
    order: "01",
    name: "THE ARCHITECT",
    slug: "architect",
    mask: "mask-up",
    cell: { row: 0, col: 0 },
    entrance: "rises from the bottom edge, monumental",
  },
  {
    order: "02",
    name: "THE SIGIL",
    slug: "sigil",
    mask: "mask-horizontal",
    cell: { row: 0, col: 1 },
    entrance: "opens from the centre outward, symmetric",
  },
  {
    order: "03",
    name: "THE WITNESS",
    slug: "witness",
    mask: "mask-left",
    cell: { row: 1, col: 0 },
    entrance: "wipes laterally, drifting in from the left",
  },
  {
    order: "04",
    name: "THE FRACTURE",
    slug: "fracture",
    mask: "mask-vertical",
    cell: { row: 1, col: 1 },
    entrance: "splits open from the centre",
  },
  {
    order: "05",
    name: "THE ENEMY",
    slug: "enemy",
    mask: "fade-through",
    cell: { row: 2, col: 0 },
    entrance: "dissolves through black",
  },
  {
    order: "06",
    name: "THE UNKNOWN",
    slug: "unknown",
    mask: "iris",
    cell: { row: 2, col: 1 },
    entrance: "irises open from the centre",
  },
] as const;

export function getCollectionDesign(slug: string): CollectionDesign {
  const design = COLLECTION.find((entry) => entry.slug === slug);
  if (!design) {
    throw new Error(`Unknown collection design: ${slug}`);
  }
  return design;
}