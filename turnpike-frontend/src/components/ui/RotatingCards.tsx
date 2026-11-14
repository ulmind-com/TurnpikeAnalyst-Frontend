import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@turnpike/shared/lib/utils";

export interface RotatingCardItem {
  id: string | number;
  number?: string | number;
  title: string;
  subtitle?: string;
  body: string;
  badge?: string;
  metric?: string;
  gradient?: string;
  image?: string;
}

export interface RotatingCardsProps {
  cards: RotatingCardItem[];
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  angleStep?: number;
  scrollProgress?: number; // 0 to 1
  scrollProgressRef?: React.MutableRefObject<number>; // 0 to 1, read every frame (no re-render)
  draggable?: boolean;
  className?: string;
  onCardClick?: (card: RotatingCardItem, index: number) => void;
  onActiveChange?: (index: number) => void;
}

/**
 * Geometric Card Graphic matching the React Bits Pro reference design:
 * - Card 0 / 5: Sharp diagonal split between radiant orange-red and midnight navy
 * - Card 1 / 6: Hot neon magenta / raspberry with faceted angular shard
 * - Card 2 / 7: Stepped horizontal notch divider (hot pink top, electric royal blue bottom)
 * - Card 3 / 8: Crystalline origami polygon facets in coral, pink, and violet
 * - Card 4 / 9: Deep ultraviolet with vivid red circular cutout
 * Plus a bold, high-contrast white numeral in the center.
 */
export function CardGraphic({
  index,
  number,
  image,
}: {
  index: number;
  number: string | number;
  image?: string;
}) {
  const design = index % 5;

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center select-none">
      {/* ── DESIGN 0: Diagonal split orange-red and midnight violet ── */}
      {design === 0 && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C0A36] via-[#120524] to-[#080112]" />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#FF4500] via-[#FF2600] to-[#E61B00]"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                "linear-gradient(135deg, transparent 48%, rgba(255,120,60,0.6) 50%, transparent 52%)",
            }}
          />
        </>
      )}

      {/* ── DESIGN 1: Hot neon magenta with faceted angular shard ── */}
      {design === 1 && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF006E] via-[#E60060] to-[#C70051]" />
          <div
            className="absolute inset-0 bg-gradient-to-bl from-[#FF2B85] to-[#B80048]"
            style={{ clipPath: "polygon(42% 0, 100% 0, 100% 100%, 72% 100%)" }}
          />
          <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_70%_20%,white,transparent_60%)]" />
        </>
      )}

      {/* ── DESIGN 2: Stepped notch divider (Hot Pink top, Electric Blue bottom) ── */}
      {design === 2 && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#3D0DB8] via-[#2D0794] to-[#1B0361]" />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#FF0077] via-[#FF1493] to-[#D60062]"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 43%, 45% 43%, 45% 56%, 0 56%)",
            }}
          />
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_45%_50%,rgba(255,255,255,0.7),transparent_35%)]" />
        </>
      )}

      {/* ── DESIGN 3: Crystalline origami polygon facets ── */}
      {design === 3 && (
        <>
          <div className="absolute inset-0 bg-[#1A0538]" />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#FF453A] to-[#FF2D55]"
            style={{ clipPath: "polygon(0 0, 72% 0, 26% 66%, 0 46%)" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-bl from-[#FF007F] to-[#B30059]"
            style={{ clipPath: "polygon(72% 0, 100% 0, 100% 56%, 26% 66%)" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-tr from-[#3D0B78] to-[#1F0440]"
            style={{ clipPath: "polygon(0 46%, 26% 66%, 66% 100%, 0 100%)" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-tl from-[#990047] to-[#540026]"
            style={{
              clipPath: "polygon(26% 66%, 100% 56%, 100% 100%, 66% 100%)",
            }}
          />
        </>
      )}

      {/* ── DESIGN 4: Ultraviolet with Vivid Red Circle Cutout ── */}
      {design === 4 && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#290B5C] via-[#1B0542] to-[#0F0228]" />
          <div
            className="absolute rounded-full bg-gradient-to-br from-[#FF3B30] via-[#FF2600] to-[#D91A24]"
            style={{
              width: "74%",
              height: "74%",
              right: "-12%",
              bottom: "-15%",
            }}
          />
          <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_30%_30%,white,transparent_55%)]" />
        </>
      )}

      {/* ── Photo cover (IT / software) over the gradient, with a scrim so the number stays legible ── */}
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
        </>
      )}
    </div>
  );
}

export function RotatingCards({
  cards,
  radius: userRadius,
  cardWidth: userWidth,
  cardHeight: userHeight,
  angleStep: userAngleStep,
  scrollProgress,
  scrollProgressRef,
  draggable = true,
  className,
  onCardClick,
  onActiveChange,
}: RotatingCardsProps) {
  const count = cards.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const cardNodesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Responsive dimensions matching the arched wheel
  const [radius, setRadius] = useState(userRadius || 450);
  const [cardWidth, setCardWidth] = useState(userWidth || 200);
  const [cardHeight, setCardHeight] = useState(userHeight || 235);
  const [angleStep, setAngleStep] = useState(userAngleStep || 22.5);
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation refs
  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Sweep calculation:
  // Initial rot = 0: Card 0 is at apex (theta = 0)
  // As user scrolls down: rot sweeps across so each card reaches apex, ending at Card count-1
  // Total rotation sweep = (count - 1) * angleStep
  const totalSweep = Math.max(angleStep, (count - 1) * angleStep);
  const sweepRef = useRef(totalSweep);
  sweepRef.current = totalSweep;

  // Responsive radius & card dimensions
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (vw < 640) {
        setRadius(userRadius || 290);
        setCardWidth(userWidth || 135);
        setCardHeight(userHeight || 160);
        setAngleStep(userAngleStep || 21);
      } else if (vw < 1024) {
        setRadius(userRadius || 380);
        setCardWidth(userWidth || 165);
        setCardHeight(userHeight || 195);
        setAngleStep(userAngleStep || 22);
      } else {
        setRadius(userRadius || Math.min(480, Math.max(420, vh * 0.52)));
        setCardWidth(userWidth || 200);
        setCardHeight(userHeight || 235);
        setAngleStep(userAngleStep || 22.5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [userRadius, userWidth, userHeight, userAngleStep]);

  // Sync scrollProgress to target rotation (Left-to-Right rotation on scroll down)
  useEffect(() => {
    if (scrollProgress === undefined || isDraggingRef.current) return;
    targetRotationRef.current = scrollProgress * totalSweep;
  }, [scrollProgress, totalSweep]);

  // Update card DOM transforms directly inside requestAnimationFrame for 120 FPS hardware acceleration
  const applyTransforms = useCallback(
    (rot: number) => {
      let closestIdx = 0;
      let minApexDist = Infinity;

      for (let i = 0; i < count; i++) {
        const el = cardNodesRef.current[i];
        if (!el) continue;

        // Angle formula:
        // - At rot = 0: card 0 is at apex (theta = 0), card 1 is at -angleStep (left), etc.
        // - As rot increases (scrolling down): cards move clockwise (LEFT to RIGHT)!
        //   Card 0 moves to the right (+angleStep), Card 1 reaches apex (0 deg), etc.
        const theta = -i * angleStep + rot;
        const absTheta = Math.abs(theta);

        if (absTheta < minApexDist) {
          minApexDist = absTheta;
          closestIdx = i;
        }

        const isApex = absTheta < angleStep * 0.45;

        // Visual fade and scale based on angle away from apex
        // Cards beyond 60 degrees smoothly vanish
        if (absTheta > 60) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          el.style.visibility = "hidden";
        } else {
          el.style.visibility = "visible";
          const opacity = Math.max(0, 1 - Math.pow(absTheta / 56, 2));
          const scale = Math.max(0.85, 1.06 - absTheta * 0.0045);
          const zIndex = Math.round(100 - absTheta);

          el.style.opacity = opacity.toFixed(3);
          el.style.transformOrigin = `50% calc(50% + ${radius}px)`;
          el.style.transform = `rotate(${theta.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          el.style.zIndex = String(zIndex);
          el.style.pointerEvents = opacity > 0.35 ? "auto" : "none";

          if (isApex) {
            el.setAttribute("data-apex", "true");
          } else {
            el.removeAttribute("data-apex");
          }
        }
      }

      setActiveIndex((prev) => {
        if (prev !== closestIdx) {
          onActiveChange?.(closestIdx);
          return closestIdx;
        }
        return prev;
      });
    },
    [count, angleStep, radius, onActiveChange]
  );

  // Buttery smooth lerp loop
  useEffect(() => {
    let alive = true;

    const tick = () => {
      if (!alive) return;

      if (!isDraggingRef.current) {
        if (scrollProgressRef) {
          targetRotationRef.current = scrollProgressRef.current * sweepRef.current;
        }
        const diff = targetRotationRef.current - currentRotationRef.current;
        if (Math.abs(diff) > 0.0008) {
          currentRotationRef.current += diff * 0.2;
          applyTransforms(currentRotationRef.current);
        } else if (currentRotationRef.current !== targetRotationRef.current) {
          currentRotationRef.current = targetRotationRef.current;
          applyTransforms(currentRotationRef.current);
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      alive = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [applyTransforms]);

  // Pointer drag controls (Mouse / Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - lastXRef.current;
    lastXRef.current = currentX;

    // Drag right -> increases rotation (cards move left to right)
    const deltaAngle = deltaX * 0.12;
    currentRotationRef.current += deltaAngle;
    targetRotationRef.current = currentRotationRef.current;
    velocityRef.current = deltaAngle;
    applyTransforms(currentRotationRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}

    // Snap to nearest card apex position
    const projectedRot = currentRotationRef.current + velocityRef.current * 4;
    const nearestIdx = Math.max(0, Math.min(count - 1, Math.round(projectedRot / angleStep)));
    targetRotationRef.current = nearestIdx * angleStep;
  };

  // Click card to bring it to apex
  const snapToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(count - 1, index));
      targetRotationRef.current = clamped * angleStep;
    },
    [count, angleStep]
  );

  // Compute stage height so the arch fits naturally
  const stageHeight = Math.round(cardHeight + radius * (1 - Math.cos((45 * Math.PI) / 180)) + 20);

  return (
    <div
      className={cn(
        "relative w-full select-none flex flex-col items-center justify-center overflow-visible",
        className
      )}
    >
      {/* ── Circular Arch Stage (Symmetrical rainbow dome) ── */}
      <div
        ref={stageRef}
        className="relative w-full flex items-start justify-center overflow-visible cursor-grab active:cursor-grabbing"
        style={{
          height: stageHeight,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {cards.map((card, i) => (
          <div
            key={card.id || i}
            ref={(el) => {
              cardNodesRef.current[i] = el;
            }}
            onClick={() => {
              if (Math.abs(velocityRef.current) < 0.2) {
                if (i === activeIndex) {
                  onCardClick?.(card, i);
                } else {
                  snapToIndex(i);
                }
              }
            }}
            className={cn(
              "absolute rounded-[24px] sm:rounded-[28px] overflow-hidden",
              "border border-white/20 dark:border-white/15",
              "shadow-[0_20px_50px_rgba(0,0,0,0.45)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)]",
              "transition-shadow duration-300",
              "data-[apex=true]:ring-2 data-[apex=true]:ring-white/90 data-[apex=true]:shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
            )}
            style={{
              width: cardWidth,
              height: cardHeight,
              left: "50%",
              top: "0px",
              marginLeft: -cardWidth / 2,
              transformOrigin: `50% calc(50% + ${radius}px)`,
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Exact Geometric Artwork & Bold Centered Number */}
            <CardGraphic
              index={i}
              number={card.number !== undefined ? card.number : i + 1}
              image={card.image}
            />
          </div>
        ))}
      </div>

      {/* ── Minimalist Clean Pill Indicators ── */}
      <div className="relative z-20 mt-4 flex items-center justify-center gap-2 px-4">
        {cards.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => snapToIndex(idx)}
            aria-label={`Go to differentiator ${idx + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              activeIndex === idx
                ? "w-8 bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.5)]"
                : "w-2 bg-neutral-600/50 hover:bg-neutral-500"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default RotatingCards;