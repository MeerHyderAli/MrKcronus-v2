import Image from "next/image";
import { COLLECTION } from "@/components/collection/collectionData";
import Reveal from "@/components/motion/Reveal";
import Flow from "@/components/motion/Flow";
import Section from "./Section";

/**
 * MOVEMENT C — THE BOARD
 *
 * collection-board.png shown WHOLE: six genuine garment renders, the canonical
 * ordered collection, presented as the single editorial object it is.
 *
 * WHY THE WHOLE BOARD IS ALSO SHOWN
 * Movement B examines the six one at a time through 512px cell viewports. This
 * movement exists so the visitor is never left with only our selection: the
 * complete collection is presented once, unmodified, at its native 1024px. Two
 * presentations of the same object, on purpose - examined, then whole.
 *
 * THE BOARD IS NEVER CROPPED TO DISK
 * No derived file is produced from this asset anywhere in Build 13. The cell
 * viewports in Movement B are CSS offsets into this same unmodified file, and
 * here the file is shown intact.
 *
 * NO CAPTION PER DESIGN
 * Each panel in the board already carries its own printed ordinal and name -
 * "01. THE ARCHITECT" and so on. Restating them beside the image would be
 * duplication of text that is genuinely present in the artwork, and would imply
 * a caption layer the asset does not have.
 */
export default function CollectionBoard() {
  return (
    <Section
      id="collection-board"
      surface="ivory"
      labelledBy="collection-board-heading"
      className="pb-20 md:pb-28"
    >
      <Flow fade={false} rise={16} className="mx-auto max-w-[104rem] px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <Reveal pattern="rise" className="lg:col-span-6">
            <h2 id="collection-board-heading" className="display-editorial">
              Six designs, one collection
            </h2>
          </Reveal>

          <Reveal
            pattern="slide-left"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9"
          >
            <p className="meta meta-stone">
              {COLLECTION.length} designs · presented in order
            </p>
          </Reveal>
        </div>

        {/* The board itself. depth, because an image arriving flat reads as a
            pasted graphic rather than an object being set down. */}
        <Reveal pattern="depth" className="mt-12 md:mt-16">
          <figure className="vitrine image-frame mx-auto w-full max-w-[1024px]">
            <Image
              src="/brand/collection-board.png"
              alt="The MR.KCRONUS collection board: six black short-sleeve tees in a three-by-two grid, numbered 01 The Architect, 02 The Sigil, 03 The Witness, 04 The Fracture, 05 The Enemy and 06 The Unknown, each printed with its design."
              width={1024}
              height={1536}
              sizes="(max-width: 639px) 92vw, (max-width: 1023px) 92vw, 1024px"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>
      </Flow>
    </Section>
  );
}