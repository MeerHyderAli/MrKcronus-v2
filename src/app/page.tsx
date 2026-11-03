import Hero from "@/components/home/Hero";
import Gateway from "@/components/home/sections/Gateway";
import JoinArchive from "@/components/home/JoinArchive";
import LevelOne from "@/components/home/sections/LevelOne";
import TheCollection from "@/components/home/sections/TheCollection";
import TheMark from "@/components/home/sections/TheMark";
import ArchiveDrops from "@/components/home/sections/ArchiveDrops";
import Chronicle from "@/components/home/sections/Chronicle";
import Philosophy from "@/components/home/sections/Philosophy";

export const metadata = {
  description:
    "MR.KCRONUS. A world built through symbols, architecture and form.",
};

/**
 * HOMEPAGE — THE FASHION-HOUSE FRONT DOOR
 *
 * Rewritten in Build 13. AGENTS.md was amended in the same build to record this
 * architecture, because the previous "Homepage Narrative" section described a
 * different page.
 *
 * WHAT CHANGED AND WHY
 *
 * The previous homepage rendered fourteen sections, of which ten were one
 * continuous mythological crawl. Measured live, Hero plus that crawl occupied
 * 18,010px of a 21,251px page: 87%. Commerce, journal and community began only
 * after roughly nine viewport-heights of scrolling, so a visitor could not
 * learn whether MR.KCRONUS sells clothes without committing to the mythology.
 * It read as "enter the archive", not "enter the fashion house".
 *
 * The homepage now presents and introduces. The narrative belongs to /story.
 *
 * RENDERED ORDER
 *
 *   1  Hero                 the eclipse               dark   not pinned
 *   2  Chronicle            six perspectives          dark   not pinned
 *   3  LevelOne             THE TIMELINE              dark   one pinned track
 *   -  Gateway              THE CROSSING   dark->ivory (added in Phase 1)
 *   4  TheCollection        Drop 1, per colour        follows the chosen colour
 *   5  Philosophy           THE CREED                 dark
 *   -  TheMark              the symbol, taken apart   dark
 *   6  ArchiveDrops         the drops, as doors       DARK
 *   7  JoinArchive          the last door, inert form dark
 *   -  Footer
 *
 * MOVEMENT A — THE MANIFEST IS NO LONGER RENDERED HERE
 * CollectionManifest used to sit between the Gateway and the Sequence. It was
 * removed from this page's composition at the client's instruction; its file,
 * CollectionColourways.tsx and every colourway definition in collectionData.ts
 * are untouched, as is the archive route that still uses them. Nothing
 * downstream on this page needs the Manifest, and no replacement colour section
 * was introduced to fill its place — the page simply moves from the Gateway
 * straight into the Sequence.
 *
 * The `id="collection"` anchor the Hero's CTA points at lived on the Manifest's
 * <section>. It now sits on a plain wrapper around the Sequence; the removed
 * whole-board presentation is not part of the homepage composition.
 *
 * THE TONE ARC
 * dark -> dark -> CROSSING -> stone -> ivory -> DARK -> ivory -> ivory ->
 * ivory -> dark -> dark. Dark is reserved for three deliberate moments:
 * the Archive hinge, Join and the Footer (plus The World that opens
 * the page). The Archive section is dark precisely so that /archive reads as
 * entering another room rather than continuing the same page.
 *
 * THE GATEWAY IS A CROSSING, NOT A SECTION
 * Phase 1 added Gateway between the Hero and the Collection because the two
 * used to meet at a hard tonal cut: obsidian resolved, then ivory began, with
 * nothing carrying the visitor between them. The Gateway carries the Hero's own
 * construction field forward through depth, names Level 01, and approaches
 * --surface-ivory until it fills the frame, so the page arrives at the
 * Collection from light rather than from a cut. The Sequence that follows opens
 * on stone by design — that first step down from ivory is what marks the
 * Collection as its own room. It is NOT pinned - the Hero and Movement B already
 * own both of this page's pinned tracks - and it enumerates no entry, because
 * the Collection owns the ordered index.
 *
 * UNRENDERED, NOT DELETED
 *
 * Ten approved components were removed from this page's composition in Build 13.
 * Their files are untouched and remain available to /story and to future
 * cinematic work, as recorded in AGENTS.md:
 *
 *   ArchiveChapter            ArchitectSection      SigilSection
 *   ArchitectArchiveChapter   FractureChapter       WitnessChapter
 *   GodsChapter               WarChapter            EnemyChapter
 *   UnknownChapter
 *
 * Gateway no longer names Level 01. LevelOne owns that name now, and the crossing
 * leads from the story into the Collection, so it names the Collection.
 *
 * EditorialCraft, StoryFragment and AboutSection left this page on 2026-11-01 with
 * the approved section order, which ends Archive, Join, footer. Their files are
 * preserved and unrendered. /story and /about are reached from the navigation.
 *
 * BrandIntroduction is superseded by TheWorld, which is superseded by Chronicle. The
 * particle Threshold is superseded by Hero and kept as ThresholdHero. All three files
 * are preserved and unrendered (2026-11-03, at client instruction).
 *
 * CollectionManifest was unrendered from this page separately, at the client's
 * instruction. CollectionColourways.tsx is unreferenced for the same reason: it
 * was rendered only by the Manifest. Both it and the Manifest's own colourway
 * definitions in collectionData.ts are preserved intact, and the archive route —
 * which has its own colourway presentation — is untouched. Nothing was deleted
 * and no replacement colour section was introduced elsewhere on this page.
 *
 * ArchitectSection and SigilSection in particular were reconstructed from
 * compiled output at real cost in Build 12A. They are preserved deliberately,
 * not discarded, and must not be silently re-inserted here.
 *
 * FeaturedProducts is also unrendered. It is superseded by the Collection
 * movements, which present all six canonical designs rather than two, and
 * which never imply a product route. The file is preserved.
 *
 * THE COLLECTION ON THE HOMEPAGE
 * TheCollection replaced Movement B here on 2026-11-01, which took the homepage
 * back to three pinned tracks. CollectionSequence.tsx is preserved and unrendered,
 * and the rest of this note describes that earlier arrangement.
 * Movement B, the pinned Sequence, was the homepage's collection section.
 * Movement C — the whole-board presentation headed "Six designs, one collection"
 * — is intentionally not rendered here. The canonical board asset and its
 * component remain untouched; the six designs are still examined in the Sequence.
 *
 * A NOTE ON THE PREVIOUS "THE ENEMY" DUPLICATION
 * The retired page comment claimed artifact-enemy.png was a garment and that
 * its two appearances were an intentional double role. That was wrong.
 * artifact-enemy.png is a portrait crop of the archive plate TheEnemy.png — the
 * same hooded, beaked-mask figure — and is character artwork, not a garment
 * render. The corpus holds exactly ONE genuine standalone garment render,
 * artifact-architect.png. The Threshold used it as a hero / brand visual; since
 * 2026-11-03 nothing on this page renders it.
 *
 * NOTHING HERE ADVERTISES COMMERCE
 * There are no prices, sizes, colourways, stock states, buy buttons or product
 * links, and no /shop, /product or /cart route. The six designs are presented
 * as the collection they are, and none of them is a link, because none of them
 * leads anywhere yet.
 */
export default function HomePage() {
  return (
    <>
      {/* ---- 1. The eclipse --------------------------------------------- */}
      <Hero />

      {/* ---- 2. The Chronicle: six perspectives, one truth --------------- */}
      <Chronicle />

      {/* ---- 3. Level 01: the timeline, plate and garment ---------------- */}
      <LevelOne />

      {/* ---- The gateway: dark to ivory, story into the Collection -------- */}
      <Gateway />

      {/* ---- 4. The Collection: Drop 1, per colour ---------------------- */}
      <TheCollection />

      {/* ---- 5. What MR.KCRONUS is -------------------------------------- */}
      <Philosophy />

      {/* ---- The mark the Creed left, examined part by part -------------- */}
      <TheMark />

      {/* ---- 6. The Archive: drops by category ---------------------------- */}
      <ArchiveDrops />

      {/* ---- 7. The last door --------------------------------------------- */}
      <JoinArchive />
    </>
  );
}
