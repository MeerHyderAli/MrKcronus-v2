/**
 * PERMANENT UNIVERSE INTEGRITY CHECK
 *
 *   npm run check:universe
 *
 * Zero dependencies. `tsc` (already a devDependency) compiles the universe
 * model and the two canonical datasets it references into .next/universe-check
 * via scripts/tsconfig.check.json, then this runner loads them and exercises
 * the integrity gate.
 *
 * The model is compiled rather than imported directly because Node does not
 * resolve the project's "@/*" TypeScript path alias. The alias is mapped onto
 * the compiled tree below.
 *
 * Exits non-zero if any assertion fails.
 *
 * NOTHING HERE MUTATES CANONICAL DATA. The positive tests read the real
 * datasets. The negative tests pass controlled fixture arrays into
 * assertUniverseIntegrity(), which accepts an optional override precisely so
 * that a deliberately broken model can be checked without editing the real one.
 */

import { createRequire } from "node:module";
import Module from "node:module";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const compiled = path.join(root, ".next", "universe-check", "src");

// Map the project's "@/*" alias onto the compiled output tree.
const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  if (request.startsWith("@/")) {
    return resolveFilename.call(this, path.join(compiled, request.slice(2)), ...rest);
  }
  return resolveFilename.call(this, request, ...rest);
};

let universe;
try {
  universe = require(path.join(compiled, "components", "universe", "universe.js"));
} catch (error) {
  console.error(
    "FATAL: could not load the compiled universe model.\n" +
      "       Run `npx tsc -p scripts/tsconfig.check.json` first.\n" +
      "       " + error.message,
  );
  process.exit(1);
}
const collection = require(path.join(compiled, "components", "collection", "collectionData.js"));
const archive = require(path.join(compiled, "components", "archive", "archiveData.js"));

let failed = 0;
let passed = 0;

function check(name, condition, detail = "") {
  if (condition) {
    passed += 1;
    console.log(`  PASS  ${name}`);
  } else {
    failed += 1;
    console.log(`  FAIL  ${name}${detail ? " -> " + detail : ""}`);
  }
}

/** Assert that a fixture is REJECTED, and that the message names the defect. */
function expectRejection(name, input, expectedFragment) {
  let message = null;
  try {
    universe.assertUniverseIntegrity(input);
  } catch (error) {
    message = error.message;
  }
  if (message === null) {
    failed += 1;
    console.log(`  FAIL  ${name} -> integrity check ACCEPTED a broken model`);
    return;
  }
  if (!message.includes(expectedFragment)) {
    failed += 1;
    console.log(
      `  FAIL  ${name} -> rejected, but message did not mention "${expectedFragment}"\n        ${message.split("\n").join("\n        ")}`,
    );
    return;
  }
  passed += 1;
  console.log(`  PASS  ${name}`);
}

/** Fixture builders. Optional fields are omitted entirely, not set to null. */
const entry = (id, order, extra = {}) => ({
  id,
  name: extra.name ?? id,
  order,
  kind: extra.kind ?? "character",
  ...(extra.designSlug ? { designSlug: extra.designSlug } : {}),
  ...(extra.plateId ? { plateId: extra.plateId } : {}),
});
const level = (id, order, entryIds) => ({ id, order, label: id, entryIds });

console.log("\nMR.KCRONUS - universe integrity check\n");

console.log("CANONICAL DATA (positive)");
check("canonical model passes the integrity gate", (() => {
  try {
    universe.assertUniverseIntegrity();
    return true;
  } catch (error) {
    console.log("        " + error.message.split("\n").join("\n        "));
    return false;
  }
})());

const level01 = universe.getLevelEntries("level-01");
check(
  "Level 01 has the six entries in explicit order 01..06",
  level01.length === 6 && level01.map((e) => e.order).join(",") === "01,02,03,04,05,06",
  level01.map((e) => e.order + " " + e.name).join(" / "),
);
check(
  "Level 01 names are The Architect..The Unknown in order",
  level01.map((e) => e.name).join("|") ===
    "The Architect|The Sigil|The Witness|The Fracture|The Enemy|The Unknown",
);

const sigil = universe.getUniverseEntry("the-sigil");
check("The Sigil is a symbol, not a character", sigil.kind === "symbol", sigil.kind);
check("The Sigil carries no plateId", sigil.plateId === undefined);
check(
  "no character artwork exists for The Sigil",
  !archive.ARCHIVE_PLATES.some((p) => p.id === "the-sigil") &&
    universe.getEntryForPlate("the-sigil") === undefined,
);
check("The Sigil does have its garment", sigil.designSlug === "sigil", sigil.designSlug);

check(
  "The Enemy: garment and beaked-mask art resolve to ONE entry",
  universe.getEntryForDesign("enemy")?.id === "the-enemy" &&
    universe.getEntryForPlate("the-enemy")?.id === "the-enemy",
);
check(
  "The Enemy garment is board cell row 2, col 0",
  collection.getCollectionDesign("enemy").cell.row === 2 &&
    collection.getCollectionDesign("enemy").cell.col === 0,
);
check(
  "The Enemy artwork is the beaked-mask plate",
  archive.getArchivePlate("the-enemy").src === "/assets/archive/TheEnemy.png",
  archive.getArchivePlate("the-enemy").src,
);

const archiveOnly = universe.getArchiveOnlyPlates().map((p) => p.id);
check(
  "Archive-only lore is exactly the-archive, the-gods, the-war",
  archiveOnly.join(",") === "the-archive,the-gods,the-war",
  archiveOnly.join(","),
);
check(
  "all six collection designs and all eight archive plates are intact",
  collection.COLLECTION.length === 6 && archive.ARCHIVE_PLATES.length === 8,
);

console.log("\nD4 - ordinals compare numerically, not lexicographically");
check(
  'REGRESSION: order "2" before "10" is accepted (string compare would reject)',
  (() => {
    try {
      universe.assertUniverseIntegrity({
        entries: [entry("a", "2"), entry("b", "10")],
        levels: [level("l1", 1, ["a", "b"])],
      });
      return true;
    } catch {
      return false;
    }
  })(),
);

console.log("\nD1 - Archive-only status follows LEVEL MEMBERSHIP");
check(
  "an entry in no level does NOT hide its plate from Archive-only",
  universe
    .getArchiveOnlyPlates([entry("ghost", "01", { name: "The Archive", plateId: "the-archive" })], [])
    .some((p) => p.id === "the-archive"),
);
check(
  "once placed in a level, the same plate IS claimed",
  !universe
    .getArchiveOnlyPlates(
      [entry("real", "01", { name: "The Archive", plateId: "the-archive" })],
      [level("l1", 1, ["real"])],
    )
    .some((p) => p.id === "the-archive"),
);

console.log("\nEXTENSIBILITY - levels may hold any number of entries");
check(
  "a one-entry level is valid",
  (() => {
    try {
      universe.assertUniverseIntegrity({
        entries: [entry("only", "01")],
        levels: [level("l1", 1, ["only"])],
      });
      return true;
    } catch {
      return false;
    }
  })(),
);
check(
  "a nine-entry level is valid",
  (() => {
    try {
      universe.assertUniverseIntegrity({
        entries: Array.from({ length: 9 }, (_, i) => entry(`e${i}`, String(i + 1))),
        levels: [level("l1", 1, Array.from({ length: 9 }, (_, i) => `e${i}`))],
      });
      return true;
    } catch {
      return false;
    }
  })(),
);

console.log("\nNEGATIVE FIXTURES - each must be rejected");
expectRejection(
  "duplicate entry id",
  { entries: [entry("a", "01"), entry("a", "02")], levels: [level("l1", 1, ["a", "a"])] },
  "duplicate entry id",
);
expectRejection(
  "duplicate level id",
  { entries: [entry("a", "01")], levels: [level("l1", 1, ["a"]), level("l1", 2, ["a"])] },
  "duplicate level id",
);
expectRejection(
  "D3: duplicate level order",
  {
    entries: [entry("a", "01"), entry("b", "01")],
    levels: [level("l1", 1, ["a"]), level("l2", 1, ["b"])],
  },
  'duplicate level order: "1"',
);
expectRejection(
  "D5: orphaned entry belongs to no level",
  { entries: [entry("lost", "01")], levels: [level("l1", 1, ["other"])] },
  'entry "lost" belongs to no level',
);
expectRejection(
  "dangling level entry id",
  { entries: [entry("a", "01")], levels: [level("l1", 1, ["a", "ghost"])] },
  'references unknown entry "ghost"',
);
expectRejection(
  "dangling designSlug",
  { entries: [entry("a", "01", { designSlug: "no-such-design" })], levels: [level("l1", 1, ["a"])] },
  "references unknown collection design",
);
expectRejection(
  "dangling plateId",
  { entries: [entry("a", "01", { plateId: "no-such-plate" })], levels: [level("l1", 1, ["a"])] },
  "references unknown archive plate",
);
expectRejection(
  "non-ascending order (10 then 2)",
  { entries: [entry("a", "10"), entry("b", "2")], levels: [level("l1", 1, ["a", "b"])] },
  "order is not ascending",
);
expectRejection(
  "D4: non-numeric ordinal rejected",
  { entries: [entry("a", "x1"), entry("b", "02")], levels: [level("l1", 1, ["a", "b"])] },
  'invalid order "x1"',
);
expectRejection(
  "D4: zero ordinal rejected",
  { entries: [entry("a", "0")], levels: [level("l1", 1, ["a"])] },
  'invalid order "0"',
);
expectRejection(
  "D4: negative ordinal rejected",
  { entries: [entry("a", "-1")], levels: [level("l1", 1, ["a"])] },
  'invalid order "-1"',
);
expectRejection(
  "two entries claim the same collection design",
  {
    entries: [entry("a", "01", { name: "The Enemy", designSlug: "enemy" }), entry("b", "02", { name: "The Enemy", designSlug: "enemy" })],
    levels: [level("l1", 1, ["a", "b"])],
  },
  "claimed by more than one entry",
);
expectRejection(
  "two entries claim the same archive plate",
  {
    entries: [entry("a", "01", { name: "The Enemy", plateId: "the-enemy" }), entry("b", "02", { name: "The Enemy", plateId: "the-enemy" })],
    levels: [level("l1", 1, ["a", "b"])],
  },
  "claimed by more than one entry",
);
expectRejection(
  "entry name drifts from the design it binds to",
  { entries: [entry("a", "01", { name: "The Architect", designSlug: "enemy" })], levels: [level("l1", 1, ["a"])] },
  "but its design is",
);
expectRejection(
  "entry name drifts from the plate it binds to",
  { entries: [entry("a", "01", { name: "The Omen", plateId: "the-enemy" })], levels: [level("l1", 1, ["a"])] },
  "but its plate is",
);
expectRejection(
  "D2: unknown entry kind rejected",
  { entries: [entry("a", "01", { kind: "villain" })], levels: [level("l1", 1, ["a"])] },
  "has unknown kind",
);
expectRejection(
  "empty level rejected",
  { entries: [entry("a", "01")], levels: [level("l1", 1, [])] },
  "declares no entries",
);
expectRejection(
  "duplicate entry id within one level",
  { entries: [entry("a", "01"), entry("b", "02")], levels: [level("l1", 1, ["a", "b", "b"])] },
  "duplicate entry id in level",
);

console.log("\nDROP 1 CANON + COLOURWAYS");
const designs = collection.COLLECTION;
const HOUSE = ["black", "deep-olive", "dark-chocolate-brown", "midnight-navy", "stone-beige"];

check("six designs", designs.length === 6, String(designs.length));
check(
  "six unique design slugs",
  new Set(designs.map((d) => d.slug)).size === 6
);
check(
  "six unique catalogue codes 001-006",
  new Set(designs.map((d) => d.code)).size === 6 &&
    designs.every((d) => /^00[1-6]$/.test(d.code)),
  designs.map((d) => d.code).join(",")
);
check(
  "all six designs are Drop 1",
  designs.every((d) => d.drop === collection.DROP_1),
  collection.DROP_1
);

const variantIds = [];
let everyDesignHasFive = true;
let everyColourPresent = true;
for (const d of designs) {
  const vs = collection.getDesignColourways(d.slug);
  if (vs.length !== 5) everyDesignHasFive = false;
  if (!HOUSE.every((c) => vs.some((v) => v.colour === c))) everyColourPresent = false;
  vs.forEach((v) => variantIds.push(v.id));
}
check("exactly five variants per design", everyDesignHasFive);
check("all five normalized house colours present per design", everyColourPresent);
check(
  "variant ids unique and deterministic (<slug>--<colour>)",
  new Set(variantIds).size === 30 &&
    variantIds.every((id) => {
      const [slug, colour] = id.split("--");
      return designs.some((d) => d.slug === slug) && HOUSE.includes(colour);
    }),
  variantIds.length + " ids"
);

const architect = designs.find((d) => d.slug === "architect");
const architectOlive = collection.getColourway("architect", "deep-olive");
check(
  "ARCHITECT EXCEPTION: unnumbered cover has no sourceLabel",
  architectOlive.sourceName === "FORGOTTEN GROVE" && architectOlive.sourceLabel === undefined,
  architectOlive.sourceName + " / label=" + String(architectOlive.sourceLabel)
);
check(
  /* The sheet prints "COLOUR 04", not "COLOUR 4". Reproduced as printed. */
  "ARCHITECT EXCEPTION: C4 is chocolate, not navy",
  collection.getColourway("architect", "dark-chocolate-brown").sourceLabel === "COLOUR 04" &&
    collection.getColourway("architect", "midnight-navy").sourceLabel === "COLOUR 5"
);
check(
  "ARCHITECT EXCEPTION: C2/C3 never exposed as verified variants",
  architect.variants.length === 5 &&
    !architect.variants.some((v) => v.sourceLabel === "COLOUR 2" || v.sourceLabel === "COLOUR 3")
);

const unknown = designs.find((d) => d.slug === "unknown");
check(
  "UNKNOWN: no sourceName and no sourceLabel anywhere",
  unknown.variants.every((v) => v.sourceName === undefined && v.sourceLabel === undefined)
);
const enemy = designs.find((d) => d.slug === "enemy");
check(
  "ENEMY: defective ORIGINAL COLOUR label does not override colour data",
  enemy.variants.every((v) => v.sourceName === undefined) &&
    HOUSE.every((c) => enemy.variants.some((v) => v.colour === c))
);
check(
  "no variant carries a fabricated image reference",
  designs.every((d) => d.variants.every((v) => v.image === undefined))
);

const archArt = architect.artwork;
const fracArt = designs.find((d) => d.slug === "fracture").artwork;
check(
  "ARCHITECT artwork no longer mentions the cracked clock",
  !/clock/i.test(archArt.front) && !/clock/i.test(archArt.back),
  archArt.front + " / " + archArt.back
);
check(
  "FRACTURE owns the shattered clock artwork",
  /clock/i.test(fracArt.back),
  fracArt.front + " / " + fracArt.back
);

/* ---------------------------------------------------------------------------
   ARTWORK CANON — VERIFIED AGAINST THE APPROVED PDF

   Every one of these assertions encodes something read directly off
   "reference-materials/colourways/THE ARCHITECT COLOURWAY 001.pdf". All five
   sheets were extracted and inspected: the front is a crescent moon and star
   above the MR.KCRONUS wordmark, the back is a cathedral corridor, on every
   sheet and in every colourway.

   The previous pair of checks above could only catch the word "clock". They
   could not catch an Architect front that quietly became "a hooded figure", or
   an archive plate alt that drifted back into describing garment artwork as
   though it were plate artwork. These checks are deliberately specific, because
   a check that only greps one word is not a gate.
--------------------------------------------------------------------------- */

/* 1. The Architect's garment artwork is stated positively, not merely
   negatively. A negative check passes on an empty string. */
check(
  "ARCHITECT garment front is the crescent moon and star from the PDF",
  /crescent/i.test(archArt.front) && /star/i.test(archArt.front),
  archArt.front
);
check(
  "ARCHITECT garment back is the cathedral corridor from the PDF",
  /cathedral/i.test(archArt.back) && /corridor/i.test(archArt.back),
  archArt.back
);

/* 2. No other garment may claim the Architect's motifs. The moon-and-star front
   is shared with THE UNKNOWN, which is canonical, so only the back is
   exclusive. The corridor must be the Architect's alone. */
const othersClaimCorridor = designs
  .filter((d) => d.slug !== "architect")
  .filter((d) => /corridor/i.test(d.artwork.back))
  .map((d) => d.slug);
check(
  "cathedral corridor is not claimed by another design",
  othersClaimCorridor.length === 0,
  othersClaimCorridor.join(", ") || "none"
);

/* 3. The obsolete motifs may not reappear on the Architect's GARMENT. This is
   the regression that actually happened once: a front described as a hooded
   figure. */
check(
  "ARCHITECT garment does not claim a hooded figure or a ruined city",
  !/hooded/i.test(archArt.front) &&
    !/hooded/i.test(archArt.back) &&
    !/ruined city/i.test(archArt.front) &&
    !/ruined city/i.test(archArt.back),
  archArt.front + " / " + archArt.back
);

/* 4. THE ARCHITECT'S ARCHIVE PLATE IS NOT THE GARMENT.

   This is the distinction that was previously invisible. `The Architect.jpg`
   really does contain a cracked clock face - it is Archive plate artwork, not
   the 001 print. The plate alt must therefore be allowed to mention the clock;
   what it must not do is describe the plate as though the figure stands beneath
   the clock, which is how the two plates were conflated. */
const archPlate = archive.getArchivePlate("the-architect");
const fracPlate = archive.getArchivePlate("the-fracture");
check(
  "ARCHITECT archive plate alt frames the figure INSIDE the clock face",
  /inside|within/i.test(archPlate.alt) &&
    !/standing on a wet road below/i.test(archPlate.alt),
  archPlate.alt
);
check(
  "FRACTURE archive plate alt describes the clock breaking apart",
  /shatter|break|fragment/i.test(fracPlate.alt),
  fracPlate.alt
);

/* 5. The two plates share a ruined city and a lone figure, so their alts were
   near-identical and a screen-reader user heard the same sentence twice. Any
   substantial shared clause is a regression. */
const architectOnly = archPlate.alt
  .split(/[,;.]/)
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);
const fractureOnly = fracPlate.alt
  .split(/[,;.]/)
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);
const overlap = architectOnly.filter((c) =>
  fractureOnly.some((f) => f === c && c.length > 18),
);
check(
  "ARCHITECT and FRACTURE plate alts do not share a clause verbatim",
  overlap.length === 0,
  overlap.length ? overlap.join(" | ") : "distinct"
);

/* 6. Source labels are reproduced exactly as printed, including the source's
   own inconsistent zero padding. "COLOUR 4" is a transcription error; the
   sheet reads "COLOUR 04". */
const architectVariants = architect.variants;
const byLabel = (label) => architectVariants.find((v) => v.sourceLabel === label);
check(
  "ARCHITECT C4 is reproduced as printed, COLOUR 04",
  byLabel("COLOUR 04")?.colour === "dark-chocolate-brown",
  "COLOUR 04 -> " + (byLabel("COLOUR 04")?.colour ?? "absent")
);
check(
  "ARCHITECT source labels use the printed zero padding, never COLOUR 4",
  !architectVariants.some((v) => v.sourceLabel === "COLOUR 4"),
  architectVariants.map((v) => v.sourceLabel ?? "-").join(" / ")
);

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log("UNIVERSE INTEGRITY CHECK FAILED");
  process.exit(1);
}
console.log("UNIVERSE INTEGRITY CHECK PASSED");