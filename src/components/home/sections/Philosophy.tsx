import Flow from "@/components/motion/Flow";
import Reveal from "@/components/motion/Reveal";

import Symbol from "@/components/brand/Symbol";
import Section from "./Section";

/**
 * PHILOSOPHY — THE BRAND STATEMENT
 *
 * The one moment on the homepage that says what MR.KCRONUS is, without lore.
 * The Build 13 homepage previously had no brand articulation at all: the only
 * approved brand sentence in the repository lived in /about and in the layout
 * metadata and never reached the front page.
 *
 * THE SENTENCE
 *   "A world built through symbols, architecture and form."
 *
 * That is the approved copy, used unchanged. It is not paraphrased, not
 * extended, and not improved. It is the only approved brand sentence in the
 * corpus, and it appears here and nowhere else on the page - the Hero
 * deliberately carries no tagline rather than a second version of this one.
 *
 * TYPOGRAPHY IS THE OBJECT
 * This is a type-led section on an ivory ground with no imagery at all. The
 * statement is set large in Bodoni and drifts slowly as the section passes,
 * which is the treatment the brand voice calls for: the sentence is the object
 * being examined, and nothing competes with it.
 *
 * The drift uses the SLOW rate deliberately. This is not a garment being turned
 * in a light, and it must not move like one.
 */
export default function Philosophy() {
  return (
    <Section
      id="philosophy"
      surface="ivory"
      labelledBy="philosophy-heading"
      className="py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-[104rem] grid-cols-1 items-center gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-10 lg:px-14">
        <div className="lg:col-span-7">
        <Reveal pattern="rise">
          <p className="meta meta-stone">Philosophy</p>
        </Reveal>

        <Flow rise={30} className="mt-8 md:mt-12">
          <h2
            id="philosophy-heading"
            className="display-editorial max-w-[24ch] text-ink md:max-w-[22ch]"
          >
            A world built through symbols, architecture and form.
          </h2>
        </Flow>

        <Reveal pattern="rise" delay={0.12} className="mt-8 md:mt-10">
          <div aria-hidden="true" className="h-px w-24 bg-[--surface-rule]" />
        </Reveal>
        </div>

        {/* The canonical symbol as a counterweight.

            The statement alone left the entire right half of a 1664px canvas
            empty, which on a wide screen is what made the section read as a
            draft rather than a composition. The mark is the brand's own
            geometry - not decoration and not an invented graphic - set large
            enough to hold the right column and light enough to stay secondary
            to the words. Never transformed: no scale, no rotation, no skew. */}
        <div className="flex justify-center lg:col-span-4 lg:col-start-9">
          <Symbol height={320} color="var(--ink)" className="max-w-[46vw] opacity-[0.07]" />
        </div>
      </div>
    </Section>
  );
}