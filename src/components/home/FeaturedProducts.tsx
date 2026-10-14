import Image from "next/image";

/**
 * FEATURED DESIGNS
 *
 * Establishes the visual architecture for future commerce. It is not a shop.
 *
 * There is no cart, no checkout, no inventory, no variant selection, no
 * filtering, no price. Two of those are not merely unimplemented, they are
 * FORBIDDEN by content safety: no authoritative price, specification, stock
 * state or shipping claim exists for any design, so none is shown.
 *
 * WHY TWO CARDS AND ONE EMPTY SLOT
 * Exactly two approved single-garment renders exist in the project:
 * artifact-architect.png and artifact-enemy.png. collection-board.png is a
 * six-design board, and cropping a cell out of it to fake a product photograph
 * is explicitly forbidden. So the grid is three columns - two real designs and
 * one slot that is visibly and deliberately awaiting approved product
 * photography. The slot is not filler and not a broken image; it is a
 * catalogue record with an empty image field, which is what it honestly is.
 *
 * THE CARDS ARE NOT LINKS
 * /shop and /product do not exist. There is nowhere for a card to go, and a
 * link that pretends otherwise is worse than no link. Each card is a <figure>.
 *
 * WHY THE PLATES ARE NOT ONE ASPECT RATIO
 * The two approved renders have genuinely different proportions - Architect
 * 0.713, Enemy 0.399. Build 9 dropped both into a shared aspect-[4/5] box with
 * object-contain, which measured as two identical 403x504 frames while the
 * painted artwork inside them was 359px wide and 201px wide respectively. The
 * Enemy card was half empty and the hairline frame no longer described the
 * plate it was framing, so the three cards did not read as a set.
 *
 * Instead every plate is now given the same HEIGHT and keeps its own natural
 * width, and .image-frame hugs the artwork rather than the grid cell. The
 * Architect frame is wide, the Enemy frame is tall and narrow, and the pending
 * record is a third width between them. The difference is the real proportion
 * of the two garments, presented as an editorial choice instead of hidden
 * behind a letterbox.
 *
 * Because the frame hugs the artwork, the frame carries the hover transform
 * rather than the image. Scaling the image alone would push the artwork past
 * a hairline that stayed put.
 *
 * NO SCROLL MOTION HERE, ON PURPOSE
 * The intensity curve runs cinematic -> fashion -> archival -> restrained.
 * This section is the point where the page stops moving and starts
 * functioning. The only motion is a CSS hover affordance, which the global
 * reduced-motion rule already neutralises.
 *
 * Motif used: .image-frame. Both source renders have very different aspect
 * ratios (Architect 0.713, Enemy 0.399) against a shared card box, so they are
 * contained rather than cropped, and the hairline frame makes the containment
 * edge an intentional archival plate instead of a visible seam.
 *
 * SERVER COMPONENT, BUILD 11B
 * This carried a "use client" directive it never needed. Its only interaction
 * is a CSS hover on a group class; there is no state, no hook, no handler and
 * no browser API. Dropping the directive removes this section from the client
 * bundle and from hydration while changing nothing about how it renders.
 */

/** The two designs that have approved standalone renders. */
const AVAILABLE = [
  {
    n: "01",
    name: "The Architect",
    src: "/brand/artifact-architect.png",
    width: 730,
    height: 1024,
    alt:
      "MR.KCRONUS The Architect, level 01: a dark garment presented frontally, " +
      "printed with a hooded figure inside a numeral clock face. The words " +
      "printed on the garment are part of the artwork.",
  },
  {
    n: "05",
    name: "The Enemy",
    src: "/brand/artifact-enemy.png",
    width: 500,
    height: 1254,
    alt:
      "MR.KCRONUS The Enemy, level 05: a dark full-length hooded garment " +
      "presented frontally, printed with crosshair and compass geometry. The " +
      "words printed on the garment are part of the artwork.",
  },
];

const META_NUMBER =
  "font-meta text-[0.625rem] font-medium tabular-nums uppercase tracking-[0.18em] text-[--surface-muted] lg:text-[0.6875rem]";
const META_NAME =
  "font-meta text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[--surface-ink] lg:text-[0.6875rem] lg:tracking-[0.24em]";

export default function FeaturedProducts() {
  return (
    <section
      aria-labelledby="featured-designs-heading"
      data-surface="ivory"
      data-intensity="shop"
      className="mx-auto w-full max-w-[104rem] px-5 py-24 md:px-10 md:py-32 lg:px-14"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="meta meta-stone">Selected</p>
          <h2
            id="featured-designs-heading"
            className="display mt-5 text-[clamp(1.75rem,3.6vw,2.8rem)] text-[--surface-ink]"
          >
            Featured Designs
          </h2>
        </div>
        <div aria-hidden="true" className="h-px w-16 bg-[--surface-rule]" />
      </div>

      <div className="mt-12 grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {AVAILABLE.map((d) => (
          <figure key={d.n} className="group">
            <div className="image-frame w-fit max-w-full transition-transform duration-700 ease-archive group-hover:scale-[1.03]">
              <Image
                src={d.src}
                alt={d.alt}
                width={d.width}
                height={d.height}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                className="h-[52svh] w-auto max-w-full object-contain md:h-[58svh] lg:h-[62svh]"
              />
            </div>
            <figcaption className="mt-5 flex items-baseline gap-3 border-t border-[--surface-rule] pt-4">
              <span className={META_NUMBER}>{d.n}</span>
              <span className={META_NAME}>{d.name}</span>
            </figcaption>
          </figure>
        ))}

        {/* An empty record, stated as one. No placeholder image is drawn and
            no product name is invented for it. It carries the same height as
            the two real plates and a width between them, so the three read as
            one row rather than two cards and a gap. */}
        <figure>
          <div
            aria-hidden="true"
            className="archival-border flex h-[52svh] w-[min(100%,17rem)] flex-col items-center justify-center gap-4 px-6 text-center md:h-[58svh] lg:h-[62svh]"
          >
            <div className="h-px w-10 bg-[--surface-rule]" />
            <span className="meta meta-stone">Image Pending</span>
            <div className="h-px w-10 bg-[--surface-rule]" />
          </div>
          <figcaption className="mt-5 flex items-baseline gap-3 border-t border-[--surface-rule] pt-4">
            <span className={META_NUMBER}>—</span>
            <span className={META_NAME}>Awaiting Approved Imagery</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
