/**
 * THE EIGHT ARCHIVE PLATES - SINGLE SOURCE OF TRUTH
 *
 * Build 11B. Before this, the eight filenames, dimensions and alt strings were
 * declared once inside ArchiveIndex.tsx. The homepage chapters now need the
 * same eight plates, and duplicating that table would guarantee the two
 * surfaces drift apart on the next asset revision. So the data lives here and
 * both surfaces import it.
 *
 * The source files are never modified, re-encoded or re-derived. The strings
 * below are the ONLY place the eight filenames appear in the codebase.
 *
 * LIGHT PEAK
 * Every one of these plates is extremely dark. Measured median luminance and
 * share of pixels below L40, sampled off the actual files:
 *
 *   The Archive    median 14   78.7% < L40
 *   The Architect  median 15   81.7% < L40
 *   The Fracture   median 14   81.3% < L40
 *   The Witness    median 12   91.8% < L40
 *   The Gods       median 10   91.7% < L40
 *   The War        median 10   94.8% < L40
 *   The Enemy       median  7   97.5% < L40
 *   The Unknown     median  6   91.2% < L40
 *
 * For reference the two production garment renders already in the site sit at
 * median 10 and median 7, so these plates are exactly as dark as the imagery
 * the site already handles - which is why they all need page-supplied
 * atmosphere and why none of them can be treated as self-lit.
 *
 * `lightPeak` is therefore NOT a constant. It inverts the plate's luminance:
 * the brighter the artwork, the less light the page adds. A universal peak
 * would blow out The Fracture, The Architect and The Archive while leaving The
 * Unknown and The Enemy as black rectangles. Values are kept low and
 * atmospheric by design - these are editorial plates, not light sources.
 */

export type ArchivePlateData = {
  /** Stable anchor id. Used by /archive for deep links and scroll targets. */
  id: string;
  /** Canonical identity. The only text approved for display beside a plate. */
  name: string;
  /** Pre-encoded path. The filenames contain spaces; %20 is explicit. */
  src: string;
  /** Intrinsic pixel dimensions, as supplied. Never altered. */
  width: number;
  height: number;
  /** Descriptive of what is visible. Carries no lore. */
  alt: string;
  /** Ambient light centre alpha, scaled to this plate's measured luminance. */
  lightPeak: number;
};

/**
 * Canonical order: THE ARCHIVE is the opening identity, then the seven
 * identities in the order the brand supplied them.
 */
export const ARCHIVE_PLATES: readonly ArchivePlateData[] = [
  {
    id: "the-archive",
    name: "The Archive",
    src: "/assets/archive/The%20Archive.jpg",
    width: 825,
    height: 1024,
    alt:
      "Archive plate: a hooded crowned figure holding an open book inside a " +
      "gothic library, loose pages scattered around it, with circular compass " +
      "geometry behind the head.",
    lightPeak: 0.1,
  },
  {
    id: "the-architect",
    name: "The Architect",
    src: "/assets/archive/The%20Architect.jpg",
    width: 825,
    height: 1024,
    /* NOT the garment. The house wordmark and the words THE ARCHITECT sit
       above an intact but cracked numeral clock face, and a hooded figure is
       framed INSIDE that face rather than beneath it. That intact framing is
       what separates this plate from The Fracture below, and it is stated
       first because the two plates share a ruined city and a lone figure and
       were previously described in near-identical words.

       The cracked clock here is ARCHIVE PLATE imagery, not garment canon. The
       001 colourway is a crescent moon and star on the front and a cathedral
       corridor on the back - see collectionData.ts and AGENTS.md, Artwork
       canon. Do not read this plate's clock across into the garment. */
    alt:
      "Archive plate: the house wordmark above an intact but cracked numeral " +
      "clock face, with a hooded figure framed inside the face and a ruined " +
      "city beneath it.",
    lightPeak: 0.1,
  },
  {
    id: "the-fracture",
    name: "The Fracture",
    src: "/assets/archive/The%20Fracture.jpg",
    width: 825,
    height: 1024,
    /* The clock here is SHATTERING - broken into separate fragments thrown
       outward - where The Architect's clock stays whole inside its rim. That
       single distinction is what these two plates turn on. */
    alt:
      "Archive plate: a numeral clock face breaking apart into scattered " +
      "fragments above a ruined city, with a lone figure standing on a wet " +
      "road below.",
    lightPeak: 0.11,
  },
  {
    id: "the-witness",
    name: "The Witness",
    src: "/assets/archive/The%20witness.jpg",
    width: 825,
    height: 1024,
    alt:
      "Archive plate: a figure in profile with a lit eye and a high-collared " +
      "coat against a night city, with a circular halo behind the head.",
    lightPeak: 0.13,
  },
  {
    id: "the-gods",
    name: "The Gods",
    src: "/assets/archive/The%20Gods.jpg",
    width: 825,
    height: 1024,
    alt:
      "Archive plate: a crowned figure in draped robes looking upward, beneath " +
      "an eight-pointed star and orbital circles.",
    lightPeak: 0.16,
  },
  {
    id: "the-war",
    name: "The War",
    src: "/assets/archive/The%20War.jpg",
    width: 825,
    height: 1024,
    alt:
      "Archive plate: an armoured figure in profile in layered plate armour, " +
      "beneath a vertical axis and circular compass geometry.",
    lightPeak: 0.16,
  },
  {
    id: "the-enemy",
    name: "The Enemy",
    src: "/assets/archive/TheEnemy.png",
    width: 1254,
    height: 1254,
    alt:
      "Archive plate: a hooded figure wearing a beaked mask, with crosshair " +
      "and circular geometry and a vertical sigil axis.",
    lightPeak: 0.2,
  },
  {
    id: "the-unknown",
    name: "The Unknown",
    src: "/assets/archive/The%20Unknown.jpg",
    width: 825,
    height: 1024,
    alt:
      "Archive plate: a shrouded hooded figure with three glowing points, " +
      "surrounded by concentric orbital circles and constellation lines.",
    lightPeak: 0.22,
  },
];

/**
 * Lookup by anchor id. Throws rather than returning undefined, because a
 * missing plate is a build error, not a runtime state to handle.
 */
export function getArchivePlate(id: string): ArchivePlateData {
  const found = ARCHIVE_PLATES.find((p) => p.id === id);
  if (!found) {
    throw new Error(`Unknown archive plate id: ${id}`);
  }
  return found;
}