import ArchivePlate from "@/components/archive/ArchivePlate";
import { ARCHIVE_PLATES } from "@/components/archive/archiveData";

/**
 * THE ARCHIVE  (route: /archive)
 *
 * Eight approved archive plates presented as an editorial INDEX - an
 * exploration surface with contents navigation, anchors and alternation.
 * This is deliberately NOT the homepage narrative shell; the homepage
 * chapters in components/home/chapters use the same data with a different
 * presentation. ArchiveIndex is never rendered on /.
 *
 * Server component: no client JavaScript on this route at all.
 *
 * THE EIGHT PLATES
 * Seven are 825x1024 portrait JPGs. THE ENEMY is a 1254x1254 square PNG. On
 * this route every plate is given the same 4:5 frame so the set reads as one
 * archive; the square Enemy takes a ten per cent crop per side, which its
 * centred figure survives. That index treatment is unchanged in Build 11B -
 * the homepage Enemy chapter uses a true square frame instead.
 *
 * TEXT DISCIPLINE
 * The only text here is the canonical identity of each plate. No invented
 * description, no narrative, no dates, no level numbering. The plates carry
 * slogans, record codes and barcodes inside the artwork itself; none of that
 * is reproduced as HTML.
 *
 * HIERARCHY
 * Every plate carries its own name inside the image, so the HTML title is set
 * as a 24px archival identifier rather than a display headline, and the plate
 * is the dominant object. That hierarchy was established in Build 10 and is
 * preserved here unchanged.
 *
 * PLATE FIRST IN THE DOM
 * The plate leads and the identity follows, so on mobile the artwork arrives
 * before the heading. From lg up the grid columns place the plate and its
 * record on opposite sides, alternating. Both children carry an explicit
 * lg:row-start-1: with auto rows the sparse placement algorithm advances past
 * the plate and drops the metadata into a second row underneath it.
 *
 * MOTION
 * None. An editorial index does not need any, and the global reduced-motion
 * block has nothing to neutralise here.
 *
 * Build 11B: data and plate presentation were extracted to archiveData.ts and
 * ArchivePlate.tsx so the homepage could consume the same eight plates. The
 * rendered result of this route is otherwise unchanged.
 */

/** THE ARCHIVE is the opening identity; the rest are index entries. */
const OPENING = ARCHIVE_PLATES[0];
const ENTRIES = ARCHIVE_PLATES.slice(1);

/* The 8-column plate is about 58-62vw from lg up to the container cap, then
   capped at 1024px inside the 104rem page container. Below lg it fills content. */
const PLATE_SIZES =
  "(max-width: 1023px) 92vw, (max-width: 1663px) 61vw, 1024px";

export default function ArchiveIndex() {
  return (
    <div className="mx-auto w-full max-w-[104rem] px-5 pb-24 md:px-10 md:pb-32 lg:px-14">
      {/* ---- Opening identity -------------------------------------------- */}
      <section
        id={OPENING.id}
        aria-labelledby="archive-heading"
        className="grid grid-cols-1 items-center gap-10 pt-24 md:pt-32 lg:grid-cols-12 lg:gap-8"
      >
        <div className="lg:col-span-3">
          <p className="meta meta-stone">Archive</p>
          <h1
            id="archive-heading"
            className="display mt-5 text-[clamp(2.25rem,5vw,4rem)] text-ivory"
          >
            Archive
          </h1>
          <div aria-hidden="true" className="mt-8 h-px w-16 bg-[--rule]" />
        </div>

        <div className="lg:col-span-8 lg:col-start-5">
          <ArchivePlate plate={OPENING} sizes={PLATE_SIZES} preload />
        </div>
      </section>

      {/* ---- Contents ------------------------------------------------------ */}
      <nav
        aria-label="Archive contents"
        className="mt-24 border-t border-[--rule] pt-10 md:mt-32"
      >
        <p className="meta meta-stone">Contents</p>
        <ol className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4 md:gap-y-4">
          {ARCHIVE_PLATES.map((e) => (
            <li key={e.id}>
              {/* Two fixes on the same anchor.

                  FOCUS: these had hover:text-gold but no focus-visible colour
                  change, so a keyboard user got a global outline and none of
                  the affordance the pointer user sees. focus-visible now gets
                  the same gold treatment as hover, not just the outline.

                  TARGET: the hit area was the text box alone - roughly 18px
                  tall for 10-11px uppercase type. min-h-[44px] plus inline-flex
                  brings it to the 44px floor the rest of the house already
                  meets on .cta-invitation. The underline-on-focus rule keeps
                  the enlarged box visually tied to the label. */}
              <a
                href={`#${e.id}`}
                className="inline-flex min-h-[44px] items-center font-meta text-[0.625rem] font-medium uppercase tracking-[0.14em] text-ivory transition-colors duration-200 ease-archive hover:text-gold focus-visible:text-gold md:text-[0.6875rem] md:tracking-[0.2em]"
              >
                {e.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ---- Entries ------------------------------------------------------- */}
      {ENTRIES.map((e, i) => {
        const flip = i % 2 === 1;
        return (
          <article
            key={e.id}
            id={e.id}
            aria-labelledby={`${e.id}-heading`}
            className="mt-16 grid scroll-mt-28 grid-cols-1 items-center gap-7 border-t border-[--rule] pt-10 md:mt-20 md:pt-14 lg:grid-cols-12 lg:gap-10"
          >
            <div
              className={
                flip
                  ? "lg:col-span-8 lg:col-start-1 lg:row-start-1"
                  : "lg:col-span-8 lg:col-start-5 lg:row-start-1"
              }
            >
              <ArchivePlate plate={e} sizes={PLATE_SIZES} />
            </div>

            <div
              className={
                flip
                  ? "lg:col-span-3 lg:col-start-10 lg:row-start-1"
                  : "lg:col-span-3 lg:col-start-1 lg:row-start-1"
              }
            >
              <p className="meta meta-stone">Archive</p>
              <h2
                id={`${e.id}-heading`}
                className="display mt-4 text-[clamp(1.35rem,4.5vw,1.5rem)] leading-tight text-ivory"
              >
                {e.name}
              </h2>
              <div aria-hidden="true" className="mt-6 h-px w-12 bg-[--rule]" />
            </div>
          </article>
        );
      })}
    </div>
  );
}