/**
 * Construction field.
 *
 * Hairline architectural scaffolding drawn around the canonical mark:
 * a vertical axis, an inscribed circle, a horizontal datum and four
 * diamond markers. This is site architecture, not the symbol itself.
 *
 * Pure inline SVG. No filters, no blur, no layout cost, crisp at any scale.
 */
export default function ConstructionField({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* vertical axis */}
      <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.15" />
      {/* horizontal datum */}
      <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.15" opacity="0.5" />
      {/* inscribed circle */}
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.15" />
      {/* inner datum */}
      <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.15" opacity="0.45" />

      {/* diamond markers at the cardinal points */}
      <path d="M50 8.6 51.4 10 50 11.4 48.6 10Z" fill="currentColor" />
      <path d="M50 88.6 51.4 90 50 91.4 48.6 90Z" fill="currentColor" />
      <path d="M8.6 50 10 48.6 11.4 50 10 51.4Z" fill="currentColor" />
      <path d="M88.6 50 90 48.6 91.4 50 90 51.4Z" fill="currentColor" />
    </svg>
  );
}