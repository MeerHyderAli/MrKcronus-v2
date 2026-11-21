/**
 * LEVEL 01 — THE SIX RECORDS
 *
 * Added 2026-11-21 at client instruction, from their Level 01 reference,
 * reference-materials/level-01/MR_KCRONUS_LEVEL_01_COMPLETE_WEBSITE.html. Every word
 * and image here is copied from that file. Do not add to them.
 *
 * Keyed by Collection slug, because a record opens its design's collection. The
 * record is the story register and the garment stays the Collection's: the image is
 * the record's artwork and is never shown as the garment in a colour.
 */
export type LevelOneRecord = {
  /** Printed above the name, as in the reference. */
  kicker: string;
  /** The three words under the name. */
  words: string;
  /** The record's paragraph, from the reference's open record. */
  story: string;
  image: { src: string; alt: string; width: number; height: number };
};

const record = (
  slug: string,
  kicker: string,
  words: string,
  story: string,
  alt: string,
): [string, LevelOneRecord] => [
  slug,
  { kicker, words, story, image: { src: `/brand/level-01/${slug}.webp`, alt, width: 1200, height: 1696 } },
];

export const LEVEL_ONE_RECORDS: Readonly<Record<string, LevelOneRecord>> = Object.fromEntries([
  record(
    "architect",
    "I / VI · The Builder",
    "Design · Order · Creation",
    "The one who builds. A vision beyond time, between order and chaos. The Architect discovers that the world was never designed as it appears.",
    "The Architect tee, front and back, with details of its prints.",
  ),
  record(
    "sigil",
    "II / VI · The Connector",
    "Power · Control · Balance",
    "The symbol is not decoration. It is a key. The Sigil discovers the hidden connections between the six records, and the existence of a seventh mark.",
    "A gold compass sigil on black, under the MR.KCRONUS name. Control the time. Control the game.",
  ),
  record(
    "witness",
    "III / VI · The Observer",
    "Observe · Remember · Record",
    "The one who remembers. The Witness saw the timeline break, saw it rewritten, and chose to record what everyone else forgot.",
    "A hooded figure in profile with one lit eye, before a ruined city. I saw the timeline break.",
  ),
  record(
    "fracture",
    "IV / VI · The Collapse",
    "Break · Rebuild · Evolve",
    "The moment reality split. The Fracture reveals that more than one version of the world exists, and that the damage can become a passage.",
    "A shattered clock face over a city in ruins, a lone figure below. Timeline 01: Collapsed.",
  ),
  record(
    "enemy",
    "V / VI · The Controller",
    "Destroy · Consume · Rise",
    "Order at any cost. The Enemy tried to remove uncertainty by rewriting the timeline. He believes control is the only way to protect the world.",
    "A hooded figure in a beaked mask under a crescent, on black.",
  ),
  record(
    "unknown",
    "VI / VI · The Unseen",
    "Hide · Seek · Transcend",
    "Not everything that disappears is lost. The Unknown exists between timelines and knows the Archive was never meant to contain only one.",
    "The Unknown tee, front and back, with details of its prints.",
  ),
]);

export function getLevelOneRecord(slug: string): LevelOneRecord {
  const found = LEVEL_ONE_RECORDS[slug];
  if (!found) throw new Error(`No Level 01 record for ${slug}`);
  return found;
}
