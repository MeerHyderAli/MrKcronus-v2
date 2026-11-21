import Image from "next/image";
import Link from "next/link";
import { COLLECTION } from "@/components/collection/collectionData";
import { getLevelOneRecord } from "@/components/collection/levelOneRecords";
import Reveal from "@/components/motion/Reveal";
import Section from "./Section";

/**
 * LEVEL 01 — THE SIX
 *
 * Revised 2026-11-21 at client instruction, from their reference
 * reference-materials/level-01/MR_KCRONUS_LEVEL_01_COMPLETE_WEBSITE.html. It replaces
 * the pinned sideways timeline, preserved unrendered as LevelOneTimeline.tsx.
 *
 * Six records in a grid, two across on a phone and three from md. Each opens its
 * design's collection at /collection/<slug>, where the colour control and the room
 * that changes with it now live. The words and images are the client's.
 *
 * Not pinned, and a server component: the grid needs no script.
 */
export default function LevelOne() {
  return (
    <Section id="level-01" surface="ivory" labelledBy="level-01-heading" className="six">
      <div className="mx-auto w-full max-w-[104rem] px-5 md:px-10 lg:px-14">
        <Reveal pattern="rise" className="six-head">
          <p className="six-kicker">Level 01 — The Beginning</p>
          <h2 id="level-01-heading" className="six-title">
            Six identities.
            <br />
            One broken timeline.
          </h2>
          <p className="six-intro">
            Meet the six perspectives at the centre of the Archive. Select a record to enter its
            world.
          </p>
        </Reveal>

        <ol className="six-grid">
          {COLLECTION.map((design) => {
            const record = getLevelOneRecord(design.slug);
            return (
              <li key={design.slug}>
                <Reveal pattern="rise" className="h-full">
                  <Link href={`/collection/${design.slug}`} className="six-card">
                    <Image
                      src={record.image.src}
                      alt={record.image.alt}
                      fill
                      sizes="(min-width: 64rem) 31vw, (min-width: 48rem) 31vw, 47vw"
                      className="six-card-img"
                    />
                    <span aria-hidden="true" className="six-card-open">
                      <svg viewBox="0 0 12 12">
                        <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </span>
                    <span className="six-card-meta">
                      <span className="six-card-kicker">{record.kicker}</span>
                      <span className="six-card-name">{design.name}</span>
                      <span className="six-card-words">{record.words}</span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <p className="six-foot">
          <span>Level 01 — The Beginning</span>
          <span>Six perspectives. One truth.</span>
        </p>
      </div>
    </Section>
  );
}
