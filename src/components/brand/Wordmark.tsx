import type { CSSProperties } from "react";

/**
 * MR.KCRONUS canonical wordmark.
 *
 * Source of truth: /brand/mrkcronus-wordmark.png
 * (lossless crop of A02_mrkcronus_logo.png, verified pixel-exact).
 *
 * The wordmark is artwork, not a typeface. It is never set in Bodoni Moda,
 * Inter, or any other font, and it is never recreated in CSS.
 *
 * Rendering note: as with the symbol, the master is opaque black ink on a
 * white ground, so neither luminance masking nor plain alpha masking can
 * render it, and filter: invert() is prohibited. The render asset is the
 * alpha matte /brand/mrkcronus-wordmark-mask.png - the same pixels with
 * A = 255 - luminance and RGB = 0, verified alpha-exact against the master.
 * Ink colour is set in CSS via background-color. No filter is applied.
 *
 * Resolution ceiling: the asset is 635 x 70 px - a 39 px cap height. It is
 * a downscale-only asset. Rendering it larger than native is prohibited, and
 * that ceiling is enforced here.
 */

const SRC = "/brand/mrkcronus-wordmark-mask.png";
const NATIVE_WIDTH = 635;
const NATIVE_HEIGHT = 70;

/** Native pixel width. Never exceed this. */
export const WORDMARK_MAX_WIDTH = 635;

type WordmarkProps = {
  /** Rendered width. Height is derived from the artwork's aspect ratio. */
  width?: number | string;
  /** Rendered height. Width is derived from the artwork's aspect ratio. */
  height?: number | string;
  /** Ink colour. Defaults to Ivory. */
  color?: string;
  /**
   * When true the wordmark is hidden from assistive technology. Use whenever
   * adjacent link text already spells out "MR.KCRONUS".
   */
  decorative?: boolean;
  /** Accessible name when not decorative. */
  label?: string;
  className?: string;
  style?: CSSProperties;
};

export default function Wordmark({
  width,
  height,
  color = "var(--ivory)",
  decorative = true,
  label = "MR.KCRONUS",
  className,
  style,
}: WordmarkProps) {
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      className={className}
      style={
        {
          display: "block",
          flexShrink: 0,
          aspectRatio: `${NATIVE_WIDTH} / ${NATIVE_HEIGHT}`,
          ...(height !== undefined ? { height } : null),
          ...(width !== undefined ? { width } : null),
          maxWidth: WORDMARK_MAX_WIDTH,
          backgroundColor: color,
          WebkitMaskImage: `url(${SRC})`,
          WebkitMaskMode: "alpha",
          maskImage: `url(${SRC})`,
          maskMode: "alpha",
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          ...style,
        } as CSSProperties
      }
    />
  );
}