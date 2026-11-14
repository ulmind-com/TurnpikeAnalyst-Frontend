import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { ArrowLink } from "@/components/site/arrow-link";
import { cn } from "@turnpike/shared/lib/utils";

/** Rotating claim strip mirroring the flagship hero slider. */
export function RotatingClaims({
  items,
  onCta,
}: {
  items: readonly { title: string; body: string }[];
  onCta?: () => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((prev) => (prev + 1) % items.length), 6500);
    return () => window.clearInterval(timer);
  }, [items.length]);

  const active = items[index];

  return (
    <div className="rounded-[2rem] border border-border/50 bg-card/45 p-2 backdrop-blur-xl shadow-[0_20px_55px_-28px_color-mix(in_oklab,var(--primary)_50%,transparent)]">
      <div className="relative overflow-hidden rounded-[1.6rem] border border-border/40 bg-card/60 px-6 py-12 text-center backdrop-blur-2xl lg:px-12 lg:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 6% 4%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 60%), radial-gradient(110% 100% at 96% 98%, color-mix(in oklab, var(--brand-cyan) 22%, transparent), transparent 58%)",
          }}
        />
        <div className="relative min-h-[16rem] sm:min-h-[13rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-balance text-2xl font-semibold tracking-tight sm:text-4xl">
                {active.title}
              </h2>
              <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                {active.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-6 flex flex-wrap items-center gap-4">
          <ArrowLink onClick={onCta}>Details</ArrowLink>
          <div className="flex gap-2">
            {items.map((item, dotIndex) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Show slide ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  dotIndex === index ? "w-8 bg-primary" : "w-2 bg-border",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
