import type { ReactNode } from "react";
import type { ArchivePlateData } from "@/components/archive/archiveData";
import ArchivePlate, {
  type ArchivePlateRatio,
} from "@/components/archive/ArchivePlate";
import LightPool from "@/components/home/LightPool";

/**
 * CHAPTER SHELL PIECES
 *
 * Shared by the eight homepage archive chapters. Two small pieces only, because
 * the eight chapters deliberately do NOT share a layout: Archive is
 * near-centred, Architect is right-weighted, Fracture is broken left, Witness
 * is a small off-centre pause, Gods is axial, War is edge-driven, Enemy is
 * square and opposite-sided, Unknown is calm and left-weighted. Forcing those
 * into one grid is what produces the "eight identical plates" failure. Only the
 * metadata block and the lit plate are common.
 *
 * All of this is server-renderable. The three chapters that animate
 * (Fracture, War, Enemy) are client components in their own files and import
 * these same pieces.
 */

/**
 * THE FILING METADATA
 *
 * Deliberately small. Every one of the eight plates has its own name set into
 * its own composition, so an HTML title at display size competes with the
 * artwork's own lettering. These are filing records, not headlines, and the
 * artwork stays the dominant object in every chapter.
 *
 * `name` renders as the h2 that labels the chapter section.
 */
export function ChapterMeta({
  name,
  headingId,
  level,
  className = "",
}: {
  name: string;
  headingId: string;
  /** Approved identifier only. Never a new level number. */
  level?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="meta meta-stone">{level ?? "Archive"}</p>
      <h2
        id={headingId}
        className="display mt-3 text-[clamp(1.25rem,2.6vw,1.625rem)] leading-tight text-[--surface-ink]"
      >
        {name}
      </h2>
      <div aria-hidden="true" className="mt-5 h-px w-12 bg-[--surface-rule]" />
    </div>
  );
}

/**
 * THE PLATE, WITH ITS ATMOSPHERE
 *
 * Wraps ArchivePlate in the page-supplied light the artwork needs, and nothing
 * else.
 *
 * All eight plates are opaque 24bpp RGB with no alpha channel, so light placed
 * behind the image cannot shine through it. LightPool therefore sits BEHIND an
 * oversized frame and reads as an ambient field in the surrounding void - it
 * lifts the space the plate occupies, exactly as the locked Hero does, and the
 * plate's own highlights provide its interior light. No wash is laid over the
 * artwork, so nothing is brightened, veiled or glowed.
 *
 * LIT PLATE IS FOR THE TWO STILL CHAPTERS ONLY
 * Witness and Unknown do not animate, so they cannot use ChapterMotion, which
 * supplies its own travelling light field. They use LitPlate for a static one.
 * The six animated chapters pass their lightPeak straight to ChapterMotion -
 * using both would stack two light fields.
 *
 * `peak` is NOT hardcoded here. It comes from the plate's own measured median
 * luminance via archiveData.lightPeak, because a universal value would blow
 * out the brighter plates and lose the darker ones entirely. The Unknown
 * (median 6) and The Enemy (median 7) carry the highest values precisely
 * because they are the two that would otherwise disappear.
 */
export function LitPlate({
  plate,
  ratio = "portrait",
  sizes,
  className = "",
  poolClassName = "h-[86%] w-[86%]",
  poolPeak = plate.lightPeak,
}: {
  plate: ArchivePlateData;
  ratio?: ArchivePlateRatio;
  sizes: string;
  className?: string;
  /** Size of the ambient field relative to the plate. Oversized by default. */
  poolClassName?: string;
  /**
   * Build 12B: pass null on a LIGHT surface. LightPool paints an IVORY glow,
   * which is invisible on ivory or stone and would be wasted DOM. On a light
   * ground the plate is a near-black rectangle and already separates from the
   * surface without help, so the field is omitted rather than inverted.
   */
  poolPeak?: number | null;
}) {
  return (
    <div className={`relative ${className}`}>
      {poolPeak === null ? null : (
        <div className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${poolClassName}`}>
          <LightPool className="h-full w-full" peak={poolPeak} />
        </div>
      )}
      <ArchivePlate
        plate={plate}
        ratio={ratio}
        sizes={sizes}
        className="relative"
      />
    </div>
  );
}

/** A rotated copy of the plate's own alt text, for edge filing labels. */
export function ChapterEdgeLabel({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-5 hidden items-center lg:flex">
      <span className="meta-vertical meta-vertical--stone">{children}</span>
    </div>
  );
}