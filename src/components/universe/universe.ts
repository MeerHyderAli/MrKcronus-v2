/**
 * THE UNIVERSE MODEL
 *
 * A typed, ordered registry of narrative levels and their entries, so that
 * future levels and identities are added as DATA rather than by editing a
 * component. This file declares no visual behaviour and renders nothing.
 *
 * WHAT THIS IS NOT
 *
 * This is not a third copy of the Collection, and it is not a re-index of the
 * Archive. Three registers exist in this repository and they stay separate:
 *
 *   1. COLLECTION DESIGN   - six garments, collection-board.png cells.
 *                            src/components/collection/collectionData.ts
 *   2. UNIVERSE ENTRY      - six ordered Level 01 narrative entries.
 *                            this file
 *   3. ARCHIVE PLATE       - eight editorial plates, including lore that is
 *                            not an entry. src/components/archive/archiveData.ts
 *
 * An entry REFERENCES registers 1 and 3 by key. It never copies their fields.
 * The canonical datasets stay authoritative for names, order, masks, cells,
 * dimensions and alt text; if the board or the Archive is corrected, the
 * universe model follows automatically.
 *
 * WHY REFERENCES ARE OPTIONAL
 *
 * `designSlug` and `plateId` are independently optional because the registers
 * genuinely do not line up one-to-one:
 *
 *   - THE SIGIL is a symbol and has NO character artwork. It carries a garment
 *     reference and deliberately carries no plate reference. Nothing is invented
 *     to fill the gap.
 *   - THE ENEMY exists as two approved representations of ONE entity: the
 *     armoured garment on the collection board, and the beaked-mask plate in
 *     the Archive. Both are attached to the same single entry id, and the two
 *     representations remain distinct registers.
 *
 * An entry with no garment, no artwork, or neither, is therefore a valid state
 * and must be renderable without a special case.
 *
 * NO LORE IS INVENTED HERE
 *
 * Every string in this file is either a structural identifier, a kind, or a
 * name already approved elsewhere in the repository. Entry `kind` is a
 * structural classification for presentation logic, not characterisation. No
 * origin, motive, behaviour, event or fate is described.
 *
 * NUMBERING IS INDEPENDENT
 *
 * `UniverseLevel.order` is the narrative chapter number and is deliberately
 * NOT tied to the Archive's LEVEL 00-03 classification labels, which are a
 * separate archival scheme and are preserved unchanged.
 *
 * NOTHING HERE ASSUMES SIX
 *
 * No level declares a length. Levels are ordered lists of ordered entries, and
 * a level with three entries or nine is equally valid with no code change
 * outside this file.
 */

import { COLLECTION } from "@/components/collection/collectionData";
import { ARCHIVE_PLATES } from "@/components/archive/archiveData";
import type { ArchivePlateData } from "@/components/archive/archiveData";

/**
 * What an entry IS, structurally.
 *
 * - `character` an identity that is depicted
 * - `symbol`    an identity expressed as a mark rather than a figure
 * - `event`     an entry that is neither a figure nor a mark
 *
 * A level may mix kinds. THE SIGIL is a `symbol`; presenting it as a character
 * is a category error, not a styling choice.
 */
export type UniverseEntryKind = "character" | "symbol" | "event";

/**
 * The complete set of valid kinds.
 *
 * Declared once and used by `assertUniverseIntegrity()` so a new kind cannot be
 * introduced in the data without being declared here. This is a within-register
 * check: kinds are validated against kinds, never against another register's
 * identifiers.
 */
export const UNIVERSE_ENTRY_KINDS: readonly UniverseEntryKind[] = [
  "character",
  "symbol",
  "event",
] as const;

export type UniverseEntry = {
  /**
   * Stable key. Also the DOM anchor and deep-link id for the entry, so it must
   * survive renumbering of levels.
   */
  id: string;
  /**
   * Canonical identity, in the house's sentence-case register. Declared here
   * because an entry is a third register: designs are uppercase, plates are
   * title case. `assertUniverseIntegrity()` proves this never drifts from the
   * canonical sources it is bound to.
   */
  name: string;
  /** Canonical ordinal within its level. Not an index into any array. */
  order: string;
  kind: UniverseEntryKind;
  /** Key into COLLECTION. Absent when the entry has no approved garment. */
  designSlug?: string;
  /** Key into ARCHIVE_PLATES. Absent when the entry has no approved artwork. */
  plateId?: string;
};

export type UniverseLevel = {
  /** Stable key. Anchor id for the level. */
  id: string;
  /** Narrative chapter number. Independent of Archive LEVEL 00-03. */
  order: number;
  /** Display label for the level. Structural, not lore. */
  label: string;
  /**
   * Entry ids IN ORDER. Length is data, never an assumption: the sequence
   * choreography iterates this array and must not special-case six.
   */
  entryIds: readonly string[];
};

/**
 * The six ordered Level 01 entries.
 *
 * Ordering is explicit and duplicated in the level below deliberately:
 * `assertUniverseIntegrity()` requires the declared `order` values and the
 * level's array order to agree, so neither can be edited in isolation.
 */
export const UNIVERSE_ENTRIES: readonly UniverseEntry[] = [
  {
    id: "the-architect",
    name: "The Architect",
    order: "01",
    kind: "character",
    designSlug: "architect",
    plateId: "the-architect",
  },
  {
    id: "the-sigil",
    name: "The Sigil",
    order: "02",
    kind: "symbol",
    designSlug: "sigil",
    // No plateId. THE SIGIL IS THE SYMBOL. There is no approved character
    // artwork for it and none may be fabricated to fill this field.
  },
  {
    id: "the-witness",
    name: "The Witness",
    order: "03",
    kind: "character",
    designSlug: "witness",
    plateId: "the-witness",
  },
  {
    id: "the-fracture",
    name: "The Fracture",
    order: "04",
    kind: "character",
    designSlug: "fracture",
    plateId: "the-fracture",
  },
  {
    id: "the-enemy",
    name: "The Enemy",
    order: "05",
    kind: "character",
    // One entry. Two approved representations of the same canonical entity.
    designSlug: "enemy",
    plateId: "the-enemy",
  },
  {
    id: "the-unknown",
    name: "The Unknown",
    order: "06",
    kind: "character",
    designSlug: "unknown",
    plateId: "the-unknown",
  },
] as const;

export const UNIVERSE_LEVELS: readonly UniverseLevel[] = [
  {
    id: "level-01",
    order: 1,
    label: "Level 01",
    entryIds: [
      "the-architect",
      "the-sigil",
      "the-witness",
      "the-fracture",
      "the-enemy",
      "the-unknown",
    ],
  },
] as const;

/**
 * Archive plates that no entry OF ANY LEVEL claims.
 *
 * Membership is decided by LEVEL MEMBERSHIP, not by whether some entry
 * anywhere in the registry happens to carry the plate reference. An entry
 * declared but not assigned to a level therefore does NOT hide its plate: that
 * plate remains Archive-only, which is the truthful classification.
 *
 * Derived, never declared, so that adding an entry cannot accidentally
 * reclassify Archive-only lore. Today this is The Archive, The Gods and
 * The War: editorial plates that are not Level 01 identities and must not be
 * presented as characters.
 *
 * The datasets are injectable only so the integrity check can exercise this
 * rule against controlled fixtures. Callers use the canonical data.
 */
export function getArchiveOnlyPlates(
  entries: readonly UniverseEntry[] = UNIVERSE_ENTRIES,
  levels: readonly UniverseLevel[] = UNIVERSE_LEVELS,
): readonly ArchivePlateData[] {
  const inALevel = new Set(levels.flatMap((level) => level.entryIds));
  const claimed = new Set(
    entries
      .filter((entry) => inALevel.has(entry.id))
      .map((entry) => entry.plateId)
      .filter((id): id is string => Boolean(id)),
  );
  return ARCHIVE_PLATES.filter((plate) => !claimed.has(plate.id));
}

/**
 * Lookup by id. Throws rather than returning undefined, because a missing entry
 * is a build error, not a runtime state to handle. Mirrors
 * `getCollectionDesign` and `getArchivePlate`.
 */
export function getUniverseEntry(id: string): UniverseEntry {
  const found = UNIVERSE_ENTRIES.find((entry) => entry.id === id);
  if (!found) {
    throw new Error(`Unknown universe entry id: ${id}`);
  }
  return found;
}

/** Lookup by id. Throws, for the same reason as `getUniverseEntry`. */
export function getUniverseLevel(id: string): UniverseLevel {
  const found = UNIVERSE_LEVELS.find((level) => level.id === id);
  if (!found) {
    throw new Error(`Unknown universe level id: ${id}`);
  }
  return found;
}

/**
 * Resolve a level's entries in declared order.
 *
 * Throws on any dangling id rather than dropping it, because a silently
 * shorter sequence is exactly the failure this model exists to prevent.
 */
export function getLevelEntries(levelId: string): readonly UniverseEntry[] {
  return getUniverseLevel(levelId).entryIds.map(getUniverseEntry);
}

/**
 * Reverse lookups. These are legitimately nullable: an entry may have no
 * garment or no artwork, so "no entry for this design" is a valid answer.
 */
export function getEntryForDesign(
  slug: string,
): UniverseEntry | undefined {
  return UNIVERSE_ENTRIES.find((entry) => entry.designSlug === slug);
}

export function getEntryForPlate(plateId: string): UniverseEntry | undefined {
  return UNIVERSE_ENTRIES.find((entry) => entry.plateId === plateId);
}

/**
 * Optional data override for the integrity check.
 *
 * This exists so the check can be exercised against controlled fixtures that
 * deliberately violate an invariant. It never modifies the canonical datasets:
 * `COLLECTION` and `ARCHIVE_PLATES` remain fixed references, and fixtures are
 * validated against the real canonical keys.
 */
export type UniverseIntegrityInput = {
  entries?: readonly UniverseEntry[];
  levels?: readonly UniverseLevel[];
};

/**
 * Parse an ordinal such as "01" into a positive integer.
 *
 * Returns null for anything that is not a plain positive integer literal.
 * Zero and negative values are rejected: an ordinal is a position, not a
 * quantity that may be zero or below.
 */
function parseOrdinal(raw: string): number | null {
  if (!/^\d+$/.test(raw)) {
    return null;
  }
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < 1) {
    return null;
  }
  return value;
}

/**
 * Integrity gate for the relationship between this model and the canonical
 * datasets it references.
 *
 * EXPORTED, NOT RUN ON IMPORT. Keeping the module side-effect free matters: an
 * unconditional throw here would take down every route that touches the data.
 * Run it via `npm run check:universe`.
 *
 * It validates relationships only. It never edits, repairs or coerces the
 * canonical Collection or Archive datasets to make the model fit.
 *
 * SCOPE: every check below is WITHIN a single register - entries against
 * entries, levels against levels, and references against the register they
 * point at. Identifiers from different registers are never compared to one
 * another, because equality between an entry id and a plate id is a naming
 * coincidence, not evidence of a relationship.
 */
export function assertUniverseIntegrity(input: UniverseIntegrityInput = {}): void {
  const entries = input.entries ?? UNIVERSE_ENTRIES;
  const levels = input.levels ?? UNIVERSE_LEVELS;
  const problems: string[] = [];

  const requireUnique = (label: string, values: readonly string[]) => {
    const seen = new Set<string>();
    for (const value of values) {
      if (seen.has(value)) {
        problems.push(`duplicate ${label}: "${value}"`);
      }
      seen.add(value);
    }
  };

  requireUnique(
    "entry id",
    entries.map((entry) => entry.id),
  );
  requireUnique(
    "level id",
    levels.map((level) => level.id),
  );
  // Two levels sharing a chapter number would make the numbering ambiguous.
  requireUnique(
    "level order",
    levels.map((level) => String(level.order)),
  );

  const collectionSlugs = new Set(COLLECTION.map((design) => design.slug));
  const plateIds = new Set(ARCHIVE_PLATES.map((plate) => plate.id));

  const claimedDesigns = new Set<string>();
  const claimedPlates = new Set<string>();

  for (const entry of entries) {
    if (!UNIVERSE_ENTRY_KINDS.includes(entry.kind)) {
      problems.push(
        `entry "${entry.id}" has unknown kind "${entry.kind}" ` +
          `(expected one of: ${UNIVERSE_ENTRY_KINDS.join(", ")})`,
      );
    }

    if (entry.designSlug) {
      if (!collectionSlugs.has(entry.designSlug)) {
        problems.push(
          `entry "${entry.id}" references unknown collection design "${entry.designSlug}"`,
        );
      }
      if (claimedDesigns.has(entry.designSlug)) {
        problems.push(
          `collection design "${entry.designSlug}" is claimed by more than one entry`,
        );
      }
      claimedDesigns.add(entry.designSlug);

      // Drift guard. `name` is narrative-owned (see AGENTS.md), so it is not
      // derived; this proves it still names the same entity as what it binds to.
      const design = COLLECTION.find((d) => d.slug === entry.designSlug);
      if (design && design.name.toLowerCase() !== entry.name.toLowerCase()) {
        problems.push(
          `entry "${entry.id}" is named "${entry.name}" but its design is "${design.name}"`,
        );
      }
    }

    if (entry.plateId) {
      if (!plateIds.has(entry.plateId)) {
        problems.push(
          `entry "${entry.id}" references unknown archive plate "${entry.plateId}"`,
        );
      }
      if (claimedPlates.has(entry.plateId)) {
        problems.push(
          `archive plate "${entry.plateId}" is claimed by more than one entry`,
        );
      }
      claimedPlates.add(entry.plateId);

      const plate = ARCHIVE_PLATES.find((p) => p.id === entry.plateId);
      if (plate && plate.name.toLowerCase() !== entry.name.toLowerCase()) {
        problems.push(
          `entry "${entry.id}" is named "${entry.name}" but its plate is "${plate.name}"`,
        );
      }
    }
  }

  // Every entry must actually be placed in a level. An entry that belongs to no
  // level is invisible to every consumer, so it is a defect rather than a
  // permitted staging state.
  const placedInALevel = new Set(levels.flatMap((level) => level.entryIds));
  for (const entry of entries) {
    if (!placedInALevel.has(entry.id)) {
      problems.push(`entry "${entry.id}" belongs to no level`);
    }
  }

  for (const level of levels) {
    if (level.entryIds.length === 0) {
      problems.push(`level "${level.id}" declares no entries`);
    }
    requireUnique(
      `entry id in level "${level.id}"`,
      level.entryIds,
    );

    const resolved: UniverseEntry[] = [];
    for (const id of level.entryIds) {
      const entry = entries.find((e) => e.id === id);
      if (!entry) {
        problems.push(`level "${level.id}" references unknown entry "${id}"`);
        continue;
      }
      resolved.push(entry);
    }

    // Ordinals are compared NUMERICALLY. "2" precedes "10", which lexicographic
    // comparison gets wrong. The ordinal format is validated first so a
    // malformed value is reported as such rather than silently ordering.
    let previous: { entry: UniverseEntry; value: number } | null = null;
    for (const entry of resolved) {
      const value = parseOrdinal(entry.order);
      if (value === null) {
        problems.push(
          `entry "${entry.id}" has an invalid order "${entry.order}" ` +
            `(expected a positive integer literal)`,
        );
        continue;
      }
      if (previous && previous.value >= value) {
        problems.push(
          `level "${level.id}" order is not ascending at "${entry.id}" ` +
            `("${previous.entry.order}" then "${entry.order}")`,
        );
      }
      previous = { entry, value };
    }
  }

  if (problems.length > 0) {
    throw new Error(
      `Universe integrity check failed:\n  - ${problems.join("\n  - ")}`,
    );
  }
}