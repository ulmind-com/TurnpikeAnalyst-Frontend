import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { ArrowLink } from "@/components/site/arrow-link";
import { Parallax, Reveal } from "@/components/site/parallax";
import { cn } from "@turnpike/shared/lib/utils";

/** Alternating image/content flagship product block. */
export function FeatureSpotlight({
  eyebrow,
  title,
  body,
  bullets,
  cta,
  onCta,
  visual,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: readonly string[];
  cta: string;
  onCta?: () => void;
  visual: ReactNode;
  reverse?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = title.split(" ");

  return (
    <div className={cn("group/spot grid items-center gap-10 lg:grid-cols-2 lg:gap-16")}>
      <Reveal className={cn(reverse && "lg:order-2")}>
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur"
        >
          <span className="text-shimmer">{eyebrow}</span>
        </motion.span>

        <h3 className="font-display mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="inline-block"
              initial={reduced ? undefined : { opacity: 0, y: "0.55em", filter: "blur(8px)" }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
              {index < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </h3>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground"
        >
          {body}
        </motion.p>

        <ul className="mt-6 space-y-3">
          {bullets.map((bullet, index) => (
            <motion.li
              key={bullet}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 6 }}
              className="group/bullet flex cursor-default items-start gap-3 text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] text-primary-foreground transition-transform duration-300 group-hover/bullet:scale-125 group-hover/bullet:rotate-12">
                <Check className="size-3" />
              </span>
              {bullet}
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          whileHover={{ x: 4 }}
        >
          <ArrowLink onClick={onCta}>{cta}</ArrowLink>
        </motion.div>
      </Reveal>

      <Parallax distance={34} className={cn(reverse && "lg:order-1")}>
        <div className={reduced ? undefined : reverse ? "float-card-slow" : "float-card"}>
          <motion.div
            whileHover={{ y: -10, rotateX: 2, rotateY: reverse ? -2.5 : 2.5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="group relative rounded-[2rem] border border-border/50 bg-card/45 p-2 backdrop-blur-xl shadow-[0_24px_60px_-28px_color-mix(in_oklab,var(--primary)_55%,transparent)] transition-shadow duration-500 hover:shadow-[0_36px_80px_-26px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
          >
            <div className="relative overflow-hidden rounded-[1.6rem] border border-border/40 bg-card/60 p-8 backdrop-blur-2xl">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                style={{
                  background:
                    "radial-gradient(120% 90% at 10% 5%, color-mix(in oklab, var(--primary) 26%, transparent), transparent 62%), radial-gradient(110% 100% at 94% 95%, color-mix(in oklab, var(--brand-cyan) 28%, transparent), transparent 60%)",
                }}
              />
              <span aria-hidden className="sheen" />
              <div className="relative">{visual}</div>
            </div>
          </motion.div>
        </div>
      </Parallax>
    </div>
  );
}
