import Link from "next/link";
import { COLLECTION } from "@/components/collection/collectionData";
import Reveal from "@/components/motion/Reveal";
import Section from "./Section";

/**
 * ABOUT — THE IDENTITY BLOCK
 *
 * Build 13 gave this section an h2 and a paragraph. That was not enough
 * presence for a section the brief requires to be a real part of the homepage,
 * and on a wide screen it read as a gap between Craft and Join.
 *
 * WHAT IS CLAIMED HERE, AND WHY IT IS ALL OF IT
 *
 * Nothing is invented. There is no founder biography, no founding date, no
 * location, no manufacturing or sustainability claim, no press, no testimonial
 * and no award, because none of that exists in the approved corpus and writing
 * any of it would be fabricating a brand's past - the most damaging thing this
 * project could do while looking, at a glance, like good copywriting.
 *
 * The only copy is structural fact, and every clause of it is verifiable in the
 * repository:
 *
 *   a fashion house            six named designs exist in collectionData.ts
 *   a single canonical symbol  public/brand/mrkcronus-symbol-mask.png
 *   the collection is six      AGENTS.md, Collection section
 *   an archive of artworks     public/assets/archive, eight plates
 *
 * /about itself contains the approved statement plus a line reading "Supporting
 * material follows in a later phase", which is internal production language and
 * has deliberately NOT been copied here. The /about route is unchanged.
 *
 * The six names come straight from the canonical collection data, so this block
 * also does quiet structural work: it puts the six designs in front of the
 * reader immediately before the closing sections, reinforcing that this is a
 * fashion house with an archive behind it rather than an archive with a
 * collection attached.
 */
export default function AboutSection() {
  return (
    <Section
      id="about"
      surface="ivory"
      labelledBy="about-heading"
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-[104rem] px-5 md:px-10 lg:px-14">
        <p className="meta meta-stone">About</p>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ---- Identity, at display scale --------------------------- */}
          <Reveal pattern="mask" className="lg:col-span-6">
            <h2 id="about-heading" className="display-editorial text-ink">
              The house
            </h2>
          </Reveal>

          {/* ---- Structural fact, and the six designs ------------------ */}
          <Reveal
            pattern="rise"
            delay={0.12}
            className="lg:col-span-5 lg:col-start-8"
          >
            <p className="prose-archive text-[--surface-ink-soft]">
              MR.KCRONUS is a fashion house built on a single canonical
              symbol. The collection is six designs. Behind them is an archive
              of artworks and records that the collection draws its geometry
              from.
            </p>

            {/* ORDERED LIST, NOT A DEFINITION LIST.

                  This was a <dl> whose children were <div> wrappers holding a
                  bare <span> plus a lone <dt> — no <dd> anywhere. A definition
                  list asserts term/description pairs, and this data has no
                  description to pair: COLLECTION carries only `order`, `name`
                  and `slug`. There is nothing being defined.

                  What it actually is, and what it now says: the six designs in
                  canonical order. `order` ("01".."06") is a real ordinal that
                  the Universe canon owns rather than derives, so <ol> states
                  the sequence instead of implying a taxonomy that does not
                  exist. Layout is untouched — the grid sits on the <ol>, the
                  row classes on the <li>, and Tailwind's preflight already
                  neutralises list markers and default padding, exactly as it
                  did for the <dl>. */}
            <div className="mt-10">
              <ol className="grid grid-cols-2 gap-x-6 border-y border-[--surface-rule] sm:grid-cols-3">
                {COLLECTION.map((design) => (
                  <li
                    key={design.slug}
                    className="flex items-baseline gap-2 border-t border-[--surface-rule] py-3"
                  >
                    <span className="display text-[0.95rem] leading-none text-ink-muted">
                      {design.order}
                    </span>
                    <span className="meta text-ink">{design.name}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href="/about" className="cta-solid">
                  About MR.KCRONUS
                </Link>
                <Link href="/archive" className="cta-invitation">
                  The Archive
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}