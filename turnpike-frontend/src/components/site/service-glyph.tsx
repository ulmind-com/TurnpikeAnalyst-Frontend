/** Line-art SVG glyphs (Fortmindz-style) keyed by service discipline. */
const PATHS: Record<string, string[]> = {
  DIGITAL_CONTENT_MIGRATION: ["M6 12h20", "M20 6l6 6-6 6", "M6 22h12"],
  DIGITAL_CONTENT_CAPTURE: ["M5 9h22v16H5z", "M9 5h14v4H9z", "M16 14a4 4 0 100 8 4 4 0 000-8z"],
  MANAGED_SERVICES: ["M16 5v22", "M5 16h22", "M9 9l14 14", "M23 9L9 23"],
  SOFTWARE_SUPPORT: ["M11 7l-6 9 6 9", "M21 7l6 9-6 9", "M18 6l-4 20"],
  BPM_RPA: ["M6 8h9v7H6z", "M17 17h9v7h-9z", "M15 11h6v6", "M11 15v6h6"],
  CRM_ERP_INTEGRATION: ["M8 6h16v7H8z", "M8 19h16v7H8z", "M16 13v6"],
  SEO_MARKETING: ["M14 6a8 8 0 100 16 8 8 0 000-16z", "M20 20l6 6"],
  CUSTOM_ENGINEERING: ["M6 20l8-8 4 4 8-8", "M6 26h20"],
};

const FALLBACK = ["M6 6h20v20H6z", "M6 13h20", "M13 13v13"];

export function ServiceGlyph({ seed, className }: { seed?: string; className?: string }) {
  const paths = (seed && PATHS[seed]) || FALLBACK;

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className ?? "size-9"}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
