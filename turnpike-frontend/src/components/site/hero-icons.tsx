/* Inline SVG artwork for the light hero. No raster assets. */

type IconProps = { className?: string };

export function IconMail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#0EA5E9" />
      <path d="M24 2a22 22 0 0 1 0 44Z" fill="#0284C7" />
      <rect x="12" y="16" width="24" height="17" rx="3" fill="#FFFFFF" />
      <path d="m13.5 18.5 10.5 8 10.5-8" stroke="#0EA5E9" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m33 12 2.2 4.6L40 18.8l-4.8 2.2L33 25.6l-2.2-4.6L26 18.8l4.8-2.2Z" fill="#34D399" />
    </svg>
  );
}

export function IconReport({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="4" y="4" width="40" height="40" rx="9" fill="#0EA5E9" />
      <rect x="10" y="10" width="28" height="28" rx="5" fill="#F0FDFA" />
      <rect x="14" y="15" width="14" height="2.6" rx="1.3" fill="#0EA5E9" />
      <rect x="14" y="21" width="20" height="2.6" rx="1.3" fill="#34D399" />
      <rect x="14" y="27" width="11" height="2.6" rx="1.3" fill="#0EA5E9" />
    </svg>
  );
}

export function IconTarget({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="#0EA5E9" />
      <circle cx="24" cy="24" r="14" fill="#FFFFFF" />
      <circle cx="24" cy="24" r="9" fill="#0EA5E9" />
      <circle cx="24" cy="24" r="4" fill="#FFFFFF" />
      <path d="M24 24 40 8" stroke="#0B2B33" strokeWidth="3" strokeLinecap="round" />
      <path d="m36 4 8 8-6 1-3-3Z" fill="#34D399" />
    </svg>
  );
}

export function IconRocket({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#0EA5E9" />
      <path d="M24 2a22 22 0 0 1 0 44Z" fill="#0284C7" />
      <path d="M31 13c-7 1-12 6-14 12l6 6c6-2 11-7 12-14Z" fill="#FFFFFF" />
      <circle cx="27" cy="21" r="3" fill="#0EA5E9" />
      <path d="m17 31-3 6 6-3Z" fill="#34D399" />
    </svg>
  );
}

export function IconGear({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="21" fill="#ECFDF5" />
      <path
        d="M24 6a18 18 0 0 1 15 8l-6 3A11 11 0 0 0 24 13Z"
        fill="#10B981"
      />
      <path d="M39 14a18 18 0 0 1-6 25l-3-6a11 11 0 0 0 3-16Z" fill="#0EA5E9" />
      <path d="M30 39a18 18 0 0 1-21-9l6-3a11 11 0 0 0 12 6Z" fill="#34D399" />
      <path d="M9 30A18 18 0 0 1 24 6v7a11 11 0 0 0-9 14Z" fill="#0EA5E9" />
      <circle cx="24" cy="24" r="6" fill="#FFFFFF" />
    </svg>
  );
}

export function IconDoc({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="7" y="5" width="34" height="38" rx="6" fill="#34D399" />
      <rect x="12" y="10" width="24" height="28" rx="4" fill="#FFFFFF" />
      <rect x="16" y="15" width="16" height="2.4" rx="1.2" fill="#0B2B33" opacity=".7" />
      <rect x="16" y="20" width="10" height="2.4" rx="1.2" fill="#0EA5E9" />
      <rect x="16" y="25" width="14" height="2.4" rx="1.2" fill="#0EA5E9" />
      <circle cx="33" cy="33" r="6" fill="#10B981" />
      <path d="m30.5 33 1.8 1.8 3.4-3.4" stroke="#FFF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMedal({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="m16 28-6 14 8-3 5 6 4-14Z" fill="#10B981" />
      <path d="m32 28 6 14-8-3-5 6-4-14Z" fill="#0EA5E9" />
      <circle cx="24" cy="18" r="15" fill="#34D399" />
      <circle cx="24" cy="18" r="11" fill="#059669" />
      <path d="m24 11 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7Z" fill="#FFFFFF" />
    </svg>
  );
}

/* Neutral brand marks for the "Trusted By" row. */
export function MarkG({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M21.6 12.2c0-.7-.1-1.3-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4Z" fill="#4285F4" />
      <path d="M12 22c2.7 0 4.9-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" fill="#34A853" />
      <path d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2Z" fill="#FBBC05" />
      <path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1Z" fill="#EA4335" />
    </svg>
  );
}

export function MarkS({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M15.6 4.6c-.3 0-.6.1-.9.2-.5-1.1-1.3-1.6-2.2-1.6-1.9 0-3.4 2.4-4 4.6l-2 .6c-.6.2-.7.2-.8.8L4 20.6 14.1 22l4-1-2-15.9c-.2-.4-.3-.5-.5-.5Zm-4.1 2.1-1.9.6c.4-1.4 1.1-2.6 1.9-3-.1.7-.1 1.6 0 2.4Z" fill="#95BF47" />
      <path d="M15.6 4.6 14.1 22l4-1-2-15.9c-.2-.4-.3-.5-.5-.5Z" fill="#5E8E3E" />
    </svg>
  );
}

export function MarkM({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3" y="3" width="8.4" height="8.4" fill="#F25022" />
      <rect x="12.6" y="3" width="8.4" height="8.4" fill="#7FBA00" />
      <rect x="3" y="12.6" width="8.4" height="8.4" fill="#00A4EF" />
      <rect x="12.6" y="12.6" width="8.4" height="8.4" fill="#FFB900" />
    </svg>
  );
}

export function MarkSlack({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 14.7a2.1 2.1 0 1 1-2.1-2.1H6Zm1 0a2.1 2.1 0 1 1 4.2 0v5.2a2.1 2.1 0 1 1-4.2 0Z" fill="#E01E5A" />
      <path d="M9.1 6a2.1 2.1 0 1 1 2.1-2.1V6Zm0 1a2.1 2.1 0 1 1 0 4.2H3.9a2.1 2.1 0 1 1 0-4.2Z" fill="#36C5F0" />
      <path d="M17.9 9.1a2.1 2.1 0 1 1 2.1 2.1h-2.1Zm-1 0a2.1 2.1 0 1 1-4.2 0V3.9a2.1 2.1 0 1 1 4.2 0Z" fill="#2EB67D" />
      <path d="M14.8 17.9a2.1 2.1 0 1 1-2.1 2.1v-2.1Zm0-1a2.1 2.1 0 1 1 0-4.2h5.2a2.1 2.1 0 1 1 0 4.2Z" fill="#ECB22E" />
    </svg>
  );
}
