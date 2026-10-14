import type { CSSProperties } from "react";

/**
 * MR.KCRONUS canonical symbol.
 *
 * Source of truth: /brand/mrkcronus-symbol.png
 * (lossless crop of A02_mrkcronus_logo.png, verified pixel-exact).
 *
 * This component never redraws, traces, reconstructs or filters the artwork.
 *
 * Rendering note: the master is opaque black ink on a white ground. CSS
 * luminance masking cannot be used on it, because mask-mode: luminance maps
 * white to visible and black to hidden - the exact inverse of what is needed -
 * and alpha masking cannot be used either, because the master is opaque
 * everywhere. Inverting via filter: invert() is prohibited.
 *
 * So the mark is rendered through an alpha matte,
 * /brand/mrkcronus-symbol-mask.png. That matte is the same pixels with
 * A = 255 - luminance and RGB = 0, verified alpha-exact against the master.
 * Geometry, stroke weight and proportions are bit-identical. Because the
 * mask carries alpha, ink colour is set in CSS via background-color, so a
 * single asset serves every colour with no filters.
 *
 * Resolution ceiling: the asset is 694 x 1198 px with ~11 px strokes.
 * Above roughly 600 CSS px the strokes visibly soften, so that ceiling is
 * enforced here rather than trusted to art direction.
 */

const SRC = "/brand/mrkcronus-symbol-mask.png";
const NATIVE_WIDTH = 694;
const NATIVE_HEIGHT = 1198;

/** Practical maximum rendered width, in CSS pixels. */
export const SYMBOL_MAX_WIDTH = 600;

type SymbolProps = {
  /** Rendered height. Width is derived from the artwork's aspect ratio. */
  height?: number | string;
  /** Rendered width. Height is derived from the artwork's aspect ratio. */
  width?: number | string;
  /** Ink colour. Defaults to Ivory. */
  color?: string;
  /**
   * When true the mark is hidden from assistive technology and the parent
   * is expected to supply the accessible label. Use this whenever an
   * adjacent wordmark or link text already names the brand.
   */
  decorative?: boolean;
  /** Accessible name when not decorative. */
  label?: string;
  className?: string;
  style?: CSSProperties;
};

export default function Symbol({
  height,
  width,
  color = "var(--ivory)",
  decorative = true,
  label = "MR.KCRONUS symbol",
  className,
  style,
}: SymbolProps) {
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
          maxWidth: SYMBOL_MAX_WIDTH,
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