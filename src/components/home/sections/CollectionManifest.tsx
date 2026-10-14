"use client";

import { motion } from "motion/react";
import { COLLECTION } from "@/components/collection/collectionData";
import { DUR, EASE, STAGGER } from "@/components/motion/vocabulary";
import Flow from "@/components/motion/Flow";
import Section from "./Section";

/**
 * MOVEMENT A — THE MANIFEST
 *
 * The ordered index of the six designs. Movement B examines them and Movement C
 * shows the whole collection, so this movement deliberately carries NO imagery:
 * it establishes order, and nothing else.
 *
 * WHY IT IS A PRINTED INDEX AND NOT A NAVIGATION
 * A row of six names with hover states looks like a menu. These are not
 * products and there is no /shop, /product or /cart route, so giving them
 * hover affordance or a pointer cursor would advertise a destination that does
 * not exist. The rows are static type. The motion comes from the entrance and
 * from the sequence below.
 *
 * WHY NO CODE COLUMN
 * See collectionData.ts. Five of the six garments carry a legible code inside
 * the board artwork and one does not, so a code column would be either half
 * empty or filled with an invented value. The codes stay where they are
 * legible.
 *
 * THE STAGGER IS SANCTIONED
 * Six rows at 60ms apart is one of exactly four staggered groups permitted in
 * the whole build (see vocabulary.ts). An ordered index revealing in sequence is
 * the single most legitimate case for it: the order is the message. It fires
 * once and never replays.
 *
 * THE NUMERAL IS NOT GOLD
 * Gold measures 2.42:1 on ivory and cannot carry either body text or a large
 * numeral. The ordinals are set in ink-muted and the names in ink, which
 * measures 5.67:1 and 16.58:1. Gold appears nowhere in this section.
 */
export default function CollectionManifest() {
  return (
    <Section
      id="collection"
      surface="ivory"
      labelledBy="collection-heading"
      className="py-20 md:py-28"
    >
      <Flow fade={false} rise={16} className="mx-auto max-w-[104rem] px-5 md:px-10 lg:px-14">
        <motion.p
          className="meta meta-stone"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: DUR.reveal, ease: EASE.archive }}
        >
          Six designs
        </motion.p>

        <motion.h2
          id="collection-heading"
          className="display-editorial mt-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: DUR.type, delay: STAGGER.manifest, ease: EASE.editorial }}
        >
          The Collection
        </motion.h2>

        <ol className="mt-14 border-b border-[--surface-rule] md:mt-20 [&>li:last-child]:border-b">
          {COLLECTION.map((design, index) => (
            <motion.li
              key={design.slug}
              className="grid grid-cols-12 items-baseline gap-x-4 border-t border-[--surface-rule] py-5 md:gap-x-6 md:py-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: DUR.reveal,
                delay: index * STAGGER.manifest,
                ease: EASE.archive,
              }}
            >
              <span className="display col-span-3 text-[length:var(--type-numeral)] leading-none text-ink-muted md:col-span-2">
                {design.order}
              </span>
              <span className="display col-span-9 text-[clamp(1.05rem,1.7vw,1.55rem)] leading-tight text-ink md:col-span-10">
                {design.name}
              </span>
            </motion.li>
          ))}
        </ol>
      </Flow>
    </Section>
  );
}