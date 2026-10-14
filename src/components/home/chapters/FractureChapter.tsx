import ArchivePlate from "@/components/archive/ArchivePlate";
import { getArchivePlate } from "@/components/archive/archiveData";
import {
  ChapterEdgeLabel,
  ChapterMeta,
} from "@/components/home/chapters/chapterParts";
import ChapterMotion from "@/components/home/chapters/ChapterMotion";

/**
 * CHAPTER 3 / THE FRACTURE  -  DISRUPTION
 *
 * The first deliberate break in the sequence. Every chapter before it is
 * either centred or weighted right; this one throws the plate to the left and
 * sends the filing metadata hard to the opposite margin, so the eye crosses the
 * frame instead of reading straight down it.
 *
 * THE ROTATION
 * A 1.75deg tilt, applied to the plate's own wrapper and never to the image
 * element. That distinction matters: a transform on the container rotates the
 * frame in the page plane and leaves the artwork untouched, while a transform
 * on the image would resample and shear the supplied pixels. No crop, no scale,
 * no filter, no colour change - the artwork is exactly as supplied.
 *
 * MOTION (Build 11C) - fluid
 * Plate left, metadata right, so the counter-travel widens the gap that
 * already exists between them: the plate crosses 120px - the widest travel in
 * the set, because disruption should read as the largest movement - while the
 * metadata moves 34px the other way.
 *
 * The rotation rides on the wrapper, so it rotates the plate as it travels and
 * the two read as one object rather than a tilt applied to a moving image.
 *
 * SIZE: 500px from lg up, giving a 625px plate and a chapter near 97svh.
 * Server component; motion lives in the shared wrapper.
 *
 * No Fracture lore.
 */
export default function FractureChapter() {
  const plate = getArchivePlate("the-fracture");

  return (
    <section
      aria-labelledby="chapter-fracture-heading"
      data-surface="stone"
      data-intensity="archive"
      className="relative mx-auto w-full max-w-[104rem] px-5 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20"
    >
      <ChapterEdgeLabel>Archive</ChapterEdgeLabel>

      <ChapterMotion
        parallax={120}
        counter={-34}
        scaleFrom={0.93}
        poolPeak={null}
        gridClassName="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-8"
        /* Thrown left: columns 1-6 of twelve, and the rotation lives here so it
           travels with the plate. */
        plateClassName="-rotate-[1.75deg] lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:w-[500px]"
        /* Metadata against the opposite margin; centred on mobile, the one
           centred variation in the mobile sequence. */
        metaClassName="text-center sm:text-right lg:col-span-3 lg:col-start-10 lg:row-start-1"
        plate={
          <ArchivePlate
            plate={plate}
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 500px"
          />
        }
        meta={
          <ChapterMeta name={plate.name} headingId="chapter-fracture-heading" />
        }
      />
    </section>
  );
}