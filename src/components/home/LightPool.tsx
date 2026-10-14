/**
 * Light pool.
 *
 * The supplied artwork is extremely low key: A05 sits at a median luminance
 * of 4 and 96%+ of its pixels fall below luminance 40. Dropped onto Obsidian
 * it reads as a black rectangle. The page must therefore supply the light.
 *
 * A single radial gradient, no blur, no filter. Rendered once per stage.
 */
export default function LightPool({
  className,
  color = "245, 245, 240",
  peak = 0.34,
}: {
  className?: string;
  /** "r, g, b" triplet. */
  color?: string;
  /** Peak alpha at the centre of the falloff, as a percentage. */
  peak?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        background: `radial-gradient(circle at 50% 50%, rgba(${color}, ${peak}) 0%, rgba(${color}, ${(
          peak * 0.45
        ).toFixed(3)}) 34%, rgba(${color}, 0.08) 62%, rgba(${color}, 0) 78%)`,
      }}
    />
  );
}