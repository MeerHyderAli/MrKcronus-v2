import Hero from "@/components/home/Hero";
import Gateway from "@/components/home/sections/Gateway";
import JoinArchive from "@/components/home/JoinArchive";
import StoryFragment from "@/components/home/StoryFragment";
import AboutSection from "@/components/home/sections/AboutSection";
import ArchiveTeaser from "@/components/home/sections/ArchiveTeaser";
import CollectionBoard from "@/components/home/sections/CollectionBoard";
import CollectionManifest from "@/components/home/sections/CollectionManifest";
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
 *   2  Gateway              THE CROSSING   dark->ivory (added in Phase 1)
 *   3  CollectionManifest   MOVEMENT A — the order    ivory
 *   4  CollectionSequence   MOVEMENT B — the exam     ivory   one pinned track
 *   5  CollectionBoard      MOVEMENT C — the whole    ivory
 *   6  Philosophy           the brand sentence        ivory
 *   7  ArchiveTeaser        the tonal hinge           DARK
 *   8  EditorialCraft       craft / reserved slot     ivory
 *   9  StoryFragment        JOURNAL — unchanged       ivory
 *   10  AboutSection         identity                  ivory
 *  11  JoinArchive          honest invitation, inert  dark
 *   -  Footer                                          (locked, Build 1)
 *
 * THE TONE ARC
 * dark -> CROSSING -> ivory -> ivory -> ivory -> DARK -> ivory -> ivory ->
 * dark -> dark. Dark is reserved for three deliberate moments: the Archive
 * hinge, Join and the Footer. The archive teaser is dark precisely so that
 * /archive reads as entering another room rather than continuing the same page.
 *
 * THE GATEWAY IS A CROSSING, NOT A SECTION
 * Phase 1 added Gateway between the Hero and the Collection because the two
 * used to meet at a hard tonal cut: obsidian resolved, then ivory began, with
 * nothing carrying the visitor between them. The Gateway carries the Hero's own
 * construction field forward through depth, names Level 01, and approaches the
 * Collection's exact --surface-ivory until it fills the frame. It is NOT pinned
 * - the Hero and Movement B already own both of this page's pinned tracks - and
 * it enumerates no entry, because the Manifest owns the ordered index.
 *
 * UNRENDERED, NOT DELETED
 *
 * Ten approved components were removed from this page's composition only. Their
 * files are untouched and remain available to /archive and to future cinematic
 * work, as recorded in AGENTS.md:
 *
 *   ArchiveChapter            ArchitectSection      SigilSection
 *   ArchitectArchiveChapter   FractureChapter       WitnessChapter
 *   GodsChapter               WarChapter            EnemyChapter
 *   UnknownChapter
 *
 * ArchitectSection and SigilSection in particular were reconstructed from
 * compiled output at real cost in Build 12A. They are preserved deliberately,
 * not discarded, and must not be silently re-inserted here.
 *
 * FeaturedProducts is also unrendered. It is superseded by the three Collection
 * movements, which present all six canonical designs rather than two, and
 * which never imply a product route. The file is preserved.
 *
 * THE COLLECTION IS ONE EXPERIENCE
 * Manifest, Sequence and Board are three movements of a single idea, not three
 * sections and emphatically not six chapters. They share one ivory ground, one
 * type scale and one motion dialect.
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

      {/* ---- 2. The gateway: dark to ivory, Hero into the Collection ----- */}
      <Gateway />

      {/* ---- 3-5. The Collection: one experience, three movements -------- */}
      <CollectionManifest />
      <CollectionSequence />
      <CollectionBoard />

      {/* ---- 6. What MR.KCRONUS is -------------------------------------- */}
      <Philosophy />

      {/* ---- 7. The tonal hinge into the Archive ------------------------- */}
      <ArchiveTeaser />

      {/* ---- 8. Craft and the reserved campaign slot --------------------- */}
      <EditorialCraft />

      {/* ---- 9-11. Record, identity, invitation -------------------------- */}
      <StoryFragment />
      <AboutSection />
      <JoinArchive />
    </>
  );
}
