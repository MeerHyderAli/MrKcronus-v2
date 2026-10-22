import Image from "next/image";
import Link from "next/link";
import Flow from "@/components/motion/Flow";

import Section from "./Section";

/**
 * ARCHIVE TEASER — THE TONAL HINGE
 *
 * The dark chamber between the ivory Philosophy statement and the ivory
 * Editorial / Craft pause. Its CTA leads into /archive; this section introduces
 * that destination without replaying its chapters.
 *
 * ONE PLATE, NOT EIGHT
 * The eight Archive artworks and chapter components belong to /archive. This
 * section discovers the Archive without reproducing the index or previewing
 * the chapters.
 *
 * THE ARCHIVE PLATE
 * The Archive.jpg is the strongest of the eight by measured median luminance
 * (14) and by composition: a hooded crowned figure holding an open book, which
 * states what the Archive is without a caption. It has an opaque near-black
 * ground and no alpha, so it sits inside a .vitrine tile like every other
 * approved image in the corpus.
 *
 * THE COPY
 * "The Archive Is Open" is the approved statement this site has carried since
 * the retired Hero. The supporting line is a factual condensation of the
 * existing About copy, not new lore.
 *
 * THE ROUTE
 * The CTA points to /archive, the editorial index of the eight plates.
 */
export default function ArchiveTeaser() {
  return (
    <Section
      id="archive"
      surface="dark"
      labelledBy="archive-heading"
      className="py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[104rem] grid-cols-1 items-center gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-14 lg:px-14">
        {/* ---- Type and invitation ------------------------------------- */}
        <Flow rise={18} className="lg:col-span-5">
          <p className="meta meta-stone">EIGHT PLATES</p>

          <h2
            id="archive-heading"
            className="title-statement mt-6 text-left text-ivory md:text-left"
          >
            The Archive Is Open
          </h2>

          <p className="prose-archive mt-8" style={{ maxWidth: "34ch" }}>
            These artworks and records inform the collection’s geometry.
          </p>

          <div aria-hidden="true" className="mt-8 h-px w-24 bg-[--rule]" />

          <Link href="/archive" className="cta-solid mt-8">
            Enter the Archive
          </Link>
        </Flow>

        {/* ---- The plate -----------------------------------------------
            Text and CTA come first in the DOM, so the single-column layout
            stays copy-first. At lg, the grid places the plate to the right. */}
        <Flow
          rise={-18}
          className="vitrine image-frame lg:col-span-6 lg:col-start-7"
        >
          <Image
            src="/assets/archive/The Archive.jpg"
            alt="The Archive: a hooded, crowned figure in white holding an open book, rendered in ink and wash."
            width={825}
            height={1024}
            sizes="(max-width: 1023px) 86vw, 46vw"
            className="h-auto w-full object-contain"
          />
        </Flow>
      </div>
    </Section>
  );
}
