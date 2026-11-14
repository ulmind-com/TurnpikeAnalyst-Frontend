import { cn } from "@turnpike/shared/lib/utils";

/** Infinite, hover-pausing marquee of platform names rendered as themed chips. */
export function LogoMarquee({
  items,
  reverse = false,
  duration = 48,
  className,
}: {
  items: readonly string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max items-center gap-4 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-x ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/50 bg-white/50 px-5 py-2.5",
              "text-sm font-medium text-foreground/80 backdrop-blur-xl transition-all duration-300",
              "hover:-translate-y-1 hover:border-primary/40 hover:text-primary",
              "shadow-[0_12px_30px_-22px_color-mix(in_oklab,var(--primary)_60%,transparent)]",
            )}
          >
            <span
              aria-hidden
              className="size-2 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))]"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
