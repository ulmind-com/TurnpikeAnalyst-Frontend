import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";

import { CountUp } from "@turnpike/shared/components/premium/count-up";
import { cn } from "@turnpike/shared/lib/utils";

type Stat = { label: string; value: number; suffix?: string };

function StatTile({ stat, index }: { stat: Stat; index: number }) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 180, damping: 18 });

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
    >
      <div
        className={reduced ? undefined : "float-y"}
        style={
          reduced
            ? undefined
            : { animationDelay: `${index * 0.5}s`, animationDuration: `${5 + index}s` }
        }
      >
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "group relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/70 p-8 text-center backdrop-blur-xl",
          "shadow-[0_20px_50px_-28px_color-mix(in_oklab,var(--primary)_60%,transparent)]",
          "transition-shadow duration-500 hover:shadow-[0_34px_70px_-26px_color-mix(in_oklab,var(--primary)_70%,transparent)]",
        )}
      >

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(110% 90% at 10% 0%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 60%), radial-gradient(110% 100% at 95% 100%, color-mix(in oklab, var(--brand-cyan) 18%, transparent), transparent 60%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-24 -top-24 h-40 rotate-12 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,white_85%,transparent),transparent)] opacity-0 transition-all duration-700 group-hover:translate-y-[22rem] group-hover:opacity-90"
        />
        <p className="font-display relative text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          <CountUp value={stat.value} />
          {stat.suffix ?? ""}
        </p>
        <p className="relative mt-2 text-sm text-muted-foreground">{stat.label}</p>
        <span
          aria-hidden
          className="relative mx-auto mt-4 block h-0.5 w-10 origin-center scale-x-0 rounded-full bg-[linear-gradient(90deg,var(--primary),var(--brand-cyan))] transition-transform duration-500 group-hover:scale-x-100"
        />
      </motion.div>
      </div>
    </motion.div>

  );
}

export function AnimatedStatBand({ items, className }: { items: Stat[]; className?: string }) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-3", className)}>
      {items.map((stat, index) => (
        <StatTile key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  );
}
