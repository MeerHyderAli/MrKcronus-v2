import Image from "next/image";
import Flow from "@/components/motion/Flow";
import Reveal from "@/components/motion/Reveal";
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
 * A typographic and technical composition: the annotated plate centers the
 * canonical symbol, while the text rail explains its relation to the six
 * designs and indexes the five supported house terms.
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
          <figure className="vitrine image-frame">
            <Image
              src="/brand/archive-plate-full.png"
              alt="MR.KCRONUS exploded view: The Archive Breakdown 001, an annotated diagram of the canonical symbol."
              aria-describedby="craft-plate-annotations"
              width={1254}
              height={1254}
              sizes="(max-width: 1023px) 92vw, (max-width: 104rem) 52vw, 55.125rem"
              className="h-auto w-full object-contain"
            />
            <div id="craft-plate-annotations" hidden>
              <p>
                Symbol meaning key: Focus, Direction, Balance, Essence, Origin.
              </p>
              <dl>
                <div>
                  <dt>Top Point</dt>
                  <dd>Focus. Ascendance. The starting point.</dd>
                </div>
                <div>
                  <dt>Circle</dt>
                  <dd>Unity. Cycle. The eternal loop.</dd>
                </div>
                <div>
                  <dt>Horizontal Line</dt>
                  <dd>Balance. Horizon. The line between.</dd>
                </div>
                <div>
                  <dt>Central Axis</dt>
                  <dd>Strength. Alignment. The spine of purpose.</dd>
                </div>
                <div>
                  <dt>Triad Arms</dt>
                  <dd>Creation. Direction. The three paths.</dd>
                </div>
                <div>
                  <dt>Intersection</dt>
                  <dd>Convergence. Where intentions meet.</dd>
                </div>
                <div>
                  <dt>Guardians</dt>
                  <dd>Protection. Boundaries. The silent watchers.</dd>
                </div>
                <div>
                  <dt>Core Diamond</dt>
                  <dd>Essence. Identity. The heart of the archive.</dd>
                </div>
                <div>
                  <dt>Foundation</dt>
                  <dd>Grounding. Origin. Built to endure.</dd>
                </div>
                <div>
                  <dt>Base Point</dt>
                  <dd>Root. Beginning. The mark of existence.</dd>
                </div>
              </dl>
            </div>
          </figure>
        </Flow>

        {/* ---- Type and the set index ----------------------------------- */}
        <Reveal pattern="rise" className="lg:col-span-4 lg:col-start-9">
          <p className="meta meta-stone">Construction</p>

          <h2 id="craft-heading" className="display-editorial mt-5">
            The Symbol, Taken Apart
          </h2>

          <p
            className="prose-archive mt-8"
            style={{ color: "var(--surface-ink-soft)" }}
          >
            Every design in the collection is built from the same canonical
            geometry. This plate shows the house symbol annotated, component by
            component.
          </p>

          {/* THE SET INDEX. Five terms the house works in, each on its own
              hairline. This is a designed list rather than a filler list: it
              is the only vocabulary the approved corpus actually supports,
              and it replaces a frame that carried nothing at all. */}
          <ol className="mt-12 border-b border-[--surface-rule]">
            {TERMS.map((term) => (
              <li
                key={term}
                className="border-t border-[--surface-rule] py-4"
              >
                <span className="meta text-ink">{term}</span>
              </li>
            ))}
          </ol>

          <p className="meta meta-stone mt-12">
            One symbol. Six designs. One archive.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
