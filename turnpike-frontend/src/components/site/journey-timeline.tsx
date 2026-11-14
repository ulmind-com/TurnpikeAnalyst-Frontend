import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Sticky stacked cards journey timeline with 3D scale effect. */
export function JourneyTimeline({
  items,
}: {
  items: readonly { year: string; title: string; body: string }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through the entire timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    // The container needs enough height to scroll through all items.
    // Adding mb-[50vh] gives room for the last card to stick before scrolling away.
    <div ref={containerRef} className="relative mx-auto max-w-4xl pb-[10vh] mt-10">
      {items.map((item, index) => {
        // Calculate dynamic top offset for the sticky stacking effect
        const topOffset = 100 + index * 30;
        
        // Define the scroll range where THIS card starts scaling down.
        // It starts scaling when the NEXT card begins overlapping it.
        const startProgress = index / items.length;
        const endProgress = (index + 1) / items.length;
        
        const isLast = index === items.length - 1;

        // The card scales down to 0.95 as the next one covers it (except the last card)
        const scale = useTransform(
          scrollYProgress,
          [startProgress, endProgress],
          [1, isLast ? 1 : 0.95]
        );
        
        // It also dims slightly for extra depth (except the last card)
        const opacity = useTransform(
          scrollYProgress,
          [startProgress, endProgress],
          [1, isLast ? 1 : 0.5]
        );

        return (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky flex flex-col md:flex-row items-center justify-between gap-8 rounded-[2rem] border border-border/50 bg-card/60 p-8 md:p-12 backdrop-blur-xl shadow-[0_18px_50px_-26px_color-mix(in_oklab,var(--primary)_45%,transparent)] mb-[15vh] overflow-hidden group origin-top"
            style={{
              top: `${topOffset}px`,
              zIndex: index,
              scale,
              opacity,
            }}
          >
            {/* Background Gradient Accents */}
            <div className="absolute -top-24 -right-24 size-64 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none z-0" />

            <div className="flex-1 relative z-10">
              <span className="font-display text-xl font-bold tracking-widest text-brand-cyan/80 uppercase">
                {item.year}
              </span>
              <h3 className="font-display mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground font-medium">
                {item.body}
              </p>
            </div>

            {/* Circular Graphic */}
            <div className="relative z-10 hidden md:grid size-40 place-items-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] shadow-lg transition-transform duration-500 group-hover:scale-105">
              <div className="grid size-[8.5rem] place-items-center rounded-full bg-background/90 backdrop-blur-sm">
                <span className="font-display text-4xl font-bold text-transparent bg-clip-text bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))]">
                  '{item.year.slice(-2)}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
