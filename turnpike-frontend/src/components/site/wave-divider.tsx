import { cn } from "@turnpike/shared/lib/utils";

type Variant = "wave" | "layered" | "curve" | "peaks" | "ribbon";

const PATHS: Record<Variant, string[]> = {
  wave: [
    "M0,64 C240,128 480,0 720,32 C960,64 1200,160 1440,96 L1440,160 L0,160 Z",
  ],
  layered: [
    "M0,96 C220,32 420,144 720,96 C1020,48 1240,128 1440,72 L1440,160 L0,160 Z",
    "M0,120 C260,72 480,160 760,120 C1040,80 1260,152 1440,112 L1440,160 L0,160 Z",
  ],
  curve: ["M0,160 C360,32 1080,32 1440,160 L1440,160 L0,160 Z"],
  peaks: [
    "M0,160 L240,64 L480,128 L720,40 L960,120 L1200,56 L1440,160 Z",
  ],
  ribbon: [
    "M0,80 C300,160 500,0 720,64 C940,128 1160,16 1440,88 L1440,160 L0,160 Z",
    "M0,128 C300,64 560,168 800,112 C1040,56 1240,140 1440,104 L1440,160 L0,160 Z",
  ],
};

/** Decorative SVG section transition using brand gradients. */
export function WaveDivider({
  variant = "wave",
  flip = false,
  className,
}: {
  variant?: Variant;
  flip?: boolean;
  className?: string;
}) {
  const paths = PATHS[variant];
  const id = `wave-${variant}-${flip ? "f" : "n"}`;

  return (
    <div aria-hidden className={cn("pointer-events-none -mt-px w-full", flip && "rotate-180", className)}>
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="block h-6 w-full sm:h-8 lg:h-10">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
            <stop offset="55%" stopColor="var(--brand-cyan)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        {paths.map((d, index) => (
          <path
            key={d}
            d={d}
            fill={index === paths.length - 1 ? "var(--background)" : `url(#${id})`}
            opacity={index === paths.length - 1 ? 1 : 0.6}
          />
        ))}
      </svg>
    </div>
  );
}
