import React, { useEffect, useRef, useState } from "react";
import { RotatingCards, type RotatingCardItem } from "@/components/ui/RotatingCards";
import { Sparkles, ArrowRight } from "lucide-react";

const COMPLEMENTARY_CARDS = [
  {
    title: "Zero-Downtime Regulated Migrations",
    subtitle: "Turnpike Insight",
    badge: "COMPLIANCE & INTEGRITY",
    metric: "99.999% FIDELITY",
    body: "Mission-critical content repositories cannot tolerate corruptions or service halts. Our automated migration orchestrators maintain continuous business continuity.",
  },
  {
    title: "Autonomous ECM & AI Synergy",
    subtitle: "Turnpike Insight",
    badge: "COGNITIVE ARCHITECTURE",
    metric: "ZERO-TRUST AGENTS",
    body: "Modern document workflows require cognitive classification, self-healing audit trails, and deterministic LLM query engines that keep institutional data private.",
  },
];

const BADGES = [
  "ENGINEERING PRAGMATISM",
  "ARCHITECTURAL INTEGRITY",
  "MODULAR ELASTICITY",
  "COMPLIANCE & INTEGRITY",
  "COGNITIVE ARCHITECTURE",
];

const METRICS = [
  "40% FASTER TTM",
  "100% TRANSPARENCY",
  "100K+ CONCURRENCY",
  "99.999% FIDELITY",
  "ZERO-TRUST AGENTS",
];

// IT / software imagery for the differentiator cards (cycled).
const CARD_IMAGES = [
  "/images/engineering.png",
  "/images/ai.png",
  "/images/cloud.png",
  "/images/cybersecurity.png",
  "/images/dynamic_data_streams.png",
];

export interface WhyChooseProps {
  items: readonly { title: string; body: string }[];
  heading?: { eyebrow?: string; title?: string; description?: string };
  ctaLabel?: string;
  onCta?: () => void;
}

export function WhyChoose({ items, heading, ctaLabel, onCta }: WhyChooseProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Combine items to form 5 cards for the circular arch
  const allItems = React.useMemo(() => {
    const list = [...items];
    if (list.length === 3) {
      list.push(
        { title: COMPLEMENTARY_CARDS[0].title, body: COMPLEMENTARY_CARDS[0].body },
        { title: COMPLEMENTARY_CARDS[1].title, body: COMPLEMENTARY_CARDS[1].body }
      );
    }
    return list;
  }, [items]);

  const cards: RotatingCardItem[] = React.useMemo(() => {
    return allItems.map((item, i) => ({
      id: `diff-card-${i}`,
      number: i + 1,
      title: item.title,
      subtitle: "Turnpike Insight",
      body: item.body,
      badge: BADGES[i % BADGES.length],
      metric: METRICS[i % METRICS.length],
      image: CARD_IMAGES[i % CARD_IMAGES.length],
    }));
  }, [allItems]);

  // Track page scroll through the sticky runway:
  // Scroll down -> cards rotate smoothly from LEFT to RIGHT across the circular arch!
  // Scroll up   -> cards rotate smoothly back from RIGHT to LEFT!
  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    const measure = () => {
      const rect = runway.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScrollable = rect.height - vh;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      progressRef.current = progress;
    };

    const onScroll = () => measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    measure();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [cards.length]);

  const activeCard = cards[activeIndex] || cards[0];

  return (
    <div
      ref={runwayRef}
      id="why-choose"
      className="relative w-full bg-transparent text-foreground select-none overflow-visible"
      style={{
        // Generous sticky scroll runway so all cards rotate completely before moving to the next section
        height: `${(1 + cards.length * 0.6) * 100}vh`,
      }}
    >
      {/* Sticky Viewport Stage: Clean, theme-aware, NO forced black background! */}
      <div className="sticky top-0 left-0 w-full h-screen h-[100lvh] overflow-hidden flex flex-col justify-between py-6 sm:py-8 px-4 z-10">
        
        {/* Subtle ambient spotlight glow behind the arch */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[340px] bg-teal-500/10 dark:bg-teal-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* ── Section Header (Top) ── */}
        <div className="relative z-20 text-center max-w-3xl mx-auto pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary mb-2 shadow-xs">
            <Sparkles className="size-3 text-primary animate-pulse" />
            {heading?.eyebrow || "Core Architectural Differentiators"}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground uppercase leading-tight">
            {heading?.title ? (
              heading.title
            ) : (
              <>
                What Makes Us{" "}
                <span className="text-primary underline decoration-dashed decoration-primary/40 underline-offset-8">
                  Different
                </span>
              </>
            )}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed hidden sm:block">
            {heading?.description ||
              "The constraints are different. Budget is finite. Time to market matters. We find the exact right balance between pragmatic velocity and bulletproof enterprise scale."}
          </p>
        </div>

        {/* ── Rotating Cards Arch (Matching React Bits Reference Screenshot!) ── */}
        <div className="relative z-20 w-full max-w-5xl mx-auto my-auto py-2">
          <RotatingCards
            cards={cards}
            scrollProgressRef={progressRef}
            angleStep={22.5}
            onActiveChange={setActiveIndex}
            onCardClick={() => {
              if (onCta) onCta();
            }}
          />
        </div>

        {/* ── Active Differentiator Spotlight Details (Below the arch) ── */}
        <div className="relative z-20 max-w-2xl mx-auto w-full text-center px-4 pb-4 sm:pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-card/80 border border-border/70 text-foreground backdrop-blur-md shadow-xs mb-2.5">
            <span className="text-teal-400 font-bold">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="text-muted-foreground/40">•</span>
            <span>{activeCard?.badge}</span>
            {activeCard?.metric && (
              <>
                <span className="text-muted-foreground/40">•</span>
                <span className="text-primary font-bold">{activeCard.metric}</span>
              </>
            )}
          </div>

          <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight leading-snug mb-2">
            {activeCard?.title}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto line-clamp-2 sm:line-clamp-3">
            "{activeCard?.body}"
          </p>

          <div className="mt-3 flex items-center justify-center">
            <button
              type="button"
              onClick={onCta}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer group"
            >
              <span>{ctaLabel || "Explore architectural capability"}</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default WhyChoose;