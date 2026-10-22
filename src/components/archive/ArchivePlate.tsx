import Image from "next/image";
import type { ArchivePlateData } from "@/components/archive/archiveData";

/**
 * ARCHIVE PLATE
 *
 * The one presentational primitive for the eight supplied plates. Server
 * component, no client JavaScript.
 *
 * ASPECT
 * `ratio` controls the frame, and it exists because one plate in the set is
 * square and the other seven are 4:5 portraits. Dropping the square Enemy into
 * a 4:5 frame costs roughly ten per cent off each side, so:
 *
 *   - "portrait" (default) - aspect-[4/5] with object-cover. The seven
 *     portraits crop by under one per cent, which is invisible, and this is
 *     the /archive presentation, preserved exactly.
 *   - "square" - a true 1:1 frame. THE ENEMY is natively 1254x1254, so this
 *     crops nothing at all and the wide dark margins inside the artwork are
 *     preserved as the negative space they are.
 *
 * Either way the image is never scaled anisotropically, never recoloured and
 * never filtered. The frame is a fixed aspect box, so the intrinsic
 * width/height below reserve the correct space before the bytes arrive and the
 * box cannot shift when the plate loads.
 *
 * The hairline comes from the Build 7 .image-frame primitive, which draws a
 * pseudo-element border and therefore never alters the image box.
 */
export type ArchivePlateRatio = "portrait" | "square";

export default function ArchivePlate({
  plate,
  ratio = "portrait",
  sizes,
  preload = false,
  className = "",
}: {
  plate: ArchivePlateData;
  ratio?: ArchivePlateRatio;
  /** Required. Next Image will not guess a viewport width for these plates. */
  sizes: string;
  /** Set only for the opening plate, which is visible at the top of /archive. */
  preload?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`image-frame overflow-hidden ${
        ratio === "square" ? "aspect-square" : "aspect-[4/5]"
      } ${className}`}
    >
      <Image
        src={plate.src}
        alt={plate.alt}
        width={plate.width}
        height={plate.height}
        sizes={sizes}
        preload={preload}
        className="h-full w-full object-cover"
      />
    </div>
  );
}