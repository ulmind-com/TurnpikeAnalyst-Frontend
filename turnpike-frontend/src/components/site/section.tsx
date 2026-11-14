import type { ReactNode } from "react";

import { cn } from "@turnpike/shared/lib/utils";
import { Reveal } from "@/components/site/parallax";
import { motion } from "motion/react";
import React from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-8", align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary backdrop-blur">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Section({
  children,
  className,
  id,
  title,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  title?: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative px-5 py-10 sm:px-8 lg:py-14", className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function HighlightWord({ word }: { word: string }) {
  const corners = [
    { top: -5, left: -5 },
    { top: -5, right: -5 },
    { bottom: -5, left: -5 },
    { bottom: -5, right: -5 },
  ] as const;

  return (
    <span className="relative inline-block px-3 py-0.5 text-primary">
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-[1.5px] border-dashed border-primary"
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      {corners.map((pos, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + index * 0.05, type: "spring", stiffness: 320, damping: 15 }}
          className="pointer-events-none absolute size-[9px] border-[1.5px] border-primary bg-white"
          style={pos}
        />
      ))}
      <span className="relative font-bold">{word}</span>
    </span>
  );
}
