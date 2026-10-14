import Image from "next/image";
import Link from "next/link";
import Flow from "@/components/motion/Flow";
import Reveal from "@/components/motion/Reveal";

import Section from "./Section";

/**
 * ARCHIVE TEASER — THE TONAL HINGE
 *
 * The first sustained dark chamber on a page that is otherwise ivory, and it
 * sits immediately before the route that carries the mythology. Coming out of a
 * dark room into a dark archive is not a transition; coming out of ivory into
 * dark, then into /archive, reads as walking through a door.
 *
 * ONE PLATE, NOT EIGHT
 * The eight Archive artworks, the eight chapter components, ArchitectSection and
 * SigilSection all belong to /archive, which Build 13 made their home. This
 * section discovers the Archive. It does not reproduce it, and it does not
 * preview the chapters.
 *
 * THE ARCHIVE PLATE
 * The Archive.jpg is the strongest of the eight by measured median luminance
 * (14) and by composition: a hooded crowned figure holding an open book, which
 * states what the Archive is without a caption. It has an opaque near-black
 * ground and no alpha, so it sits inside a .vitrine tile like every other
 * approved image in the corpus.
 *
 * THE COPY IS EXISTING COPY
 * "The Archive Is Open" is the approved statement this site has carried since
 * the retired Hero. It has been moved here rather than written, because the
 * tonal hinge is where it belongs and the new Hero does not need it.
 *
 * THE ROUTE IS REAL
 * /archive exists and returns 200. This is the only CTA on the page that
 * promises somewhere to go, and it goes somewhere.
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
        {/* ---- Type ------------------------------------------------- */}
        <Flow rise={26} className="lg:col-span-5">
          <Reveal pattern="rise">
            <p className="meta meta-stone">Archive</p>
          </Reveal>

          <Reveal pattern="mask" delay={0.12}>
            <h2
              id="archive-heading"
              className="title-statement mt-6 text-left text-ivory md:text-left"
            >
              The Archive Is Open
            </h2>
          </Reveal>

          <Reveal pattern="rise" delay={0.24} className="mt-10">
            <div aria-hidden="true" className="h-px w-24 origin-left bg-[--rule]" />
          </Reveal>

          <Reveal pattern="rise" delay={0.36} className="mt-10">
            <Link href="/archive" className="cta-solid">
              Enter the Archive
            </Link>
          </Reveal>
        </Flow>

        {/* ---- The plate --------------------------------------------
            Artwork first in the DOM so that below lg, where the grid is a
            single column, the image lands above the type. The lg:col-start
            classes then place it right for wide screens. */}
        <Flow
          rise={-26}
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