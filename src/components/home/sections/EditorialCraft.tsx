import Image from "next/image";
import Flow from "@/components/motion/Flow";
import Reveal from "@/components/motion/Reveal";
import Symbol from "@/components/brand/Symbol";
import Section from "./Section";

/**
 * EDITORIAL / CRAFT
 *
 * The editorial pause between the dark Archive chamber and the closing ivory
 * record. It occupies the function a Lookbook would.
 *
 * THE PLACEHOLDER IS GONE
 * Build 13 shipped this section with a framed empty box captioned "Reserved /
 * Campaign photography" and a paragraph explaining that no such photography
 * exists. That is internal production language and it does not belong on a
 * finished page. It has been removed rather than filled, because filling it
 * would have meant fabricating campaign imagery, which is not permitted and
 * would not be true.
 *
 * WHAT REPLACED IT
 * A typographic and technical composition rather than an empty frame, because
 * a reserved frame carries no information. The section now states the five
 * terms the house actually works in - craft, construction, symbol, form,
 * material - as a set index, and sets the canonical symbol beside them as
 * geometry. Every element is either approved artwork or type.
 *
 * WHAT THIS SECTION IS NOT
 * It is not a Lookbook, and it does not pretend to be one. There is no
 * campaign, model, lookbook or garment-detail photography anywhere in the
 * approved corpus, and this section makes no gesture toward imagery it does not
 * have. archive-plate-full.png is a real design document - the canonical symbol
 * taken apart into its annotated components with a symbol-meaning legend - so
 * it is shown as exactly that: a diagram of the brand's own geometry.
 *
 * No Archive artwork is presented as a garment. No synthetic garment is
 * generated. No CSS gradient stands in for stone or marble architecture.
 */
const TERMS = ["Craft", "Construction", "Symbol", "Form", "Material"] as const;

export default function EditorialCraft() {
  return (
    <Section
      id="craft"
      surface="ivory"
      labelledBy="craft-heading"
      className="py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-[104rem] grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-14 lg:px-14">
        {/* ---- The plate: the geometry, taken apart --------------------- */}
        <Flow rise={-22} className="lg:col-span-7">
          <Reveal pattern="depth">
            <figure className="vitrine image-frame">
              <Image
                src="/brand/archive-plate-full.png"
                alt="MR.KCRONUS archive plate, exploded view: the canonical symbol taken apart into its annotated components, with a symbol-meaning legend. The component names and descriptions are part of the artwork."
                width={1254}
                height={1254}
                sizes="(max-width: 1023px) 92vw, 980px"
                className="h-auto w-full object-contain"
              />
            </figure>
          </Reveal>
        </Flow>

        {/* ---- Type, the set index, and the mark as geometry ------------- */}
        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal pattern="rise">
            <p className="meta meta-stone">Construction</p>
          </Reveal>

          <Reveal pattern="rise" delay={0.12}>
            <h2 id="craft-heading" className="display-editorial mt-5">
              The Craft
            </h2>
          </Reveal>

          <Reveal pattern="rise" delay={0.24} className="mt-8">
            <p className="prose-archive text-[--surface-ink-soft]">
              Every design in the collection is built from the same canonical
              geometry. The plate is that geometry taken apart and annotated:
              the symbol the house is named for, component by component.
            </p>
          </Reveal>

          {/* THE SET INDEX. Five terms the house works in, each on its own
              hairline. This is a designed list rather than a filler list: it
              is the only vocabulary the approved corpus actually supports,
              and it replaces a frame that carried nothing at all. */}
          <Reveal pattern="rise" delay={0.36} className="mt-12">
            {/* THIS WAS A <dl> WITH NO <dd>, AND IS NOW AN <ol>.

               A definition list asserts term/description pairs. Each entry here
               is a single index term with no description at all, so five bare
               <dt>s and zero <dd>s told assistive technology a definition list
               existed and then supplied no definitions. AboutSection.tsx fixed
               exactly this mistake in its own index; the same fix had not been
               applied here.

               These are an ordered INDEX of vocabulary, not definitions, so an
               ordered list is the honest structure. */}
            <ol className="border-b border-[--surface-rule]">
              {TERMS.map((term) => (
                <li
                  key={term}
                  className="border-t border-[--surface-rule] py-4"
                >
                  <span className="meta text-ink">{term}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal pattern="rise" delay={0.48} className="mt-12">
            <div className="flex items-center gap-6">
              <Symbol height={54} color="var(--ink)" className="shrink-0" />
              <span className="meta meta-stone">
                One symbol. Six designs. One archive.
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}