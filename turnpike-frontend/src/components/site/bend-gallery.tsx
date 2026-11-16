import { useEffect, useRef } from "react";
import { cn } from "@turnpike/shared/lib/utils";

export interface BendGalleryItem {
  title: string;
  body: string;
}

// Portrait photos for the gallery cards (one per award, cycled).
const IMAGES = [
  "/services/ecm-content-migration.jpg",
  "/services/agent-p8-operations.jpg",
  "/services/cognitive-document-capture.jpg",
  "/services/zero-trust-cybersecurity.jpg",
];

/**
 * A single vertical column of portrait image cards that bends away as the page
 * scrolls: the card crossing the viewport centre faces you flat, while the cards
 * above and below tilt steeply back (top/bottom receding) around a shared
 * perspective — a cylinder you scroll through. Scroll down and a card rises from
 * the bottom, straightens, then bends away at the top; scroll up reverses it.
 *
 * Driven straight off each card's live position every frame (refs, no React
 * state, so scrolling never re-renders).
 */
export function BendGallery({
  items,
  className,
}: {
  items: readonly BendGalleryItem[];
  className?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let rafId = 0;
    let running = false;

    const apply = () => {
      const vh = window.innerHeight;
      const mid = vh / 2;

      cardsRef.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        // -1 (above) .. 0 (centre, flat) .. 1 (below). Ramps fast so an
        // adjacent card is already steeply bent, like the reference.
        let d = (center - mid) / (vh * 0.5);
        d = Math.max(-1, Math.min(1, d));
        const a = Math.abs(d);

        const rotateX = -d * 62; // steep bend away at top and bottom
        const translateZ = -a * 300; // recede into the curve
        const scale = 1 - a * 0.26;
        const opacity = Math.max(0.08, 1 - a * 0.7);

        el.style.transform = `translateZ(${translateZ.toFixed(1)}px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(100 - Math.round(a * 100));
      });
    };

    const loop = () => {
      apply();
      rafId = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible && !running) {
          running = true;
          rafId = requestAnimationFrame(loop);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(stage);
    apply();

    return () => {
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [items.length]);

  return (
    <div
      ref={stageRef}
      className={cn("relative w-full", className)}
      style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }}
    >
      <div
        className="mx-auto flex w-full max-w-[360px] flex-col items-center gap-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-200 shadow-[0_30px_70px_-28px_rgba(0,0,0,0.6)] dark:bg-neutral-800"
            style={{
              transformOrigin: "center center",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src={IMAGES[i % IMAGES.length]}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            {/* Caption scrim + award title over the image */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-14">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                Award &amp; Certification
              </span>
              <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-white">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BendGallery;
