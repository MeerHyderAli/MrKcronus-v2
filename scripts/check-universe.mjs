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

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log("UNIVERSE INTEGRITY CHECK FAILED");
  process.exit(1);
}
console.log("UNIVERSE INTEGRITY CHECK PASSED");