import Hero from "@/components/home/Hero";
import BrandIntroduction from "@/components/home/sections/BrandIntroduction";
import Gateway from "@/components/home/sections/Gateway";
import JoinArchive from "@/components/home/JoinArchive";
import StoryFragment from "@/components/home/StoryFragment";
import AboutSection from "@/components/home/sections/AboutSection";
import ArchiveTeaser from "@/components/home/sections/ArchiveTeaser";
import CollectionSequence from "@/components/home/sections/CollectionSequence";
import EditorialCraft from "@/components/home/sections/EditorialCraft";
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
 * The homepage now presents and introduces. The narrative belongs to /archive.
 *
 * RENDERED ORDER
 *
 *   1  Hero                 threshold                 (rebuilt in Build 13 P3)
 *   2  BrandIntroduction    the house, before         (uncommitted, not ours)
 *   3  Gateway              THE CROSSING   dark->ivory (added in Phase 1)
 *   4  CollectionSequence   MOVEMENT B — the exam     stone  one pinned track
 *   5  Philosophy           the brand sentence        ivory
 *   6  ArchiveTeaser        the tonal hinge           DARK
 *   7  EditorialCraft       craft / reserved slot     ivory
 *   8  StoryFragment        JOURNAL — unchanged       ivory
 *   9  AboutSection         identity                  ivory
 *  10  JoinArchive          honest invitation, inert  dark
 *   -  Footer                                          (locked, Build 1)
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
 * the Archive hinge, Join and the Footer (plus the BrandIntroduction that opens
 * the page). The archive teaser is dark precisely so that /archive reads as
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
 * Their files are untouched and remain available to /archive and to future
 * cinematic work, as recorded in AGENTS.md:
 *
 *   ArchiveChapter            ArchitectSection      SigilSection
 *   ArchitectArchiveChapter   FractureChapter       WitnessChapter
 *   GodsChapter               WarChapter            EnemyChapter
 *   UnknownChapter
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
 * Movement B, the pinned Sequence, remains the homepage's collection section.
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
 * artifact-architect.png, which the Hero now uses as a hero / brand visual
 * rather than as a canonical collection product specification.
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
      {/* ---- 1. The threshold ------------------------------------------- */}
      <Hero />

      {/* ---- 2. Brand introduction: the house, before the Collection ------ */}
      <BrandIntroduction />

      {/* ---- 3. The gateway: dark to ivory, Hero into the Collection ----- */}
      <Gateway />

      {/* ---- 4. The Collection: Movement B, the Sequence ---------------- */}
      {/* Keep the Hero's CTA target on the remaining collection section. */}
      <div id="collection">
        <CollectionSequence />
      </div>

      {/* ---- 5. What MR.KCRONUS is -------------------------------------- */}
      <Philosophy />

      {/* ---- 6. The tonal hinge into the Archive ------------------------- */}
      <ArchiveTeaser />

      {/* ---- 7. Craft and the reserved campaign slot --------------------- */}
      <EditorialCraft />

      {/* ---- 8-10. Record, identity, invitation -------------------------- */}
      <StoryFragment />
      <AboutSection />
      <JoinArchive />
    </>
  );
}
