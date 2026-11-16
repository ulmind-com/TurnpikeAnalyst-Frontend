import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@turnpike/shared/lib/utils";

/** CTA with an arrow that slides on hover. */
export function ArrowLink({
  children,
  onClick,
  href,
  variant = "solid",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const classes = cn(
    "group/arrow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
    variant === "solid"
      ? "bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] text-primary-foreground hover:brightness-105 hover:shadow-[0_18px_40px_-18px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
      : "border border-border/60 bg-card/40 text-foreground backdrop-blur hover:border-primary/40 hover:text-primary",
    className,
  );

  const content = (
    <>
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover/arrow:translate-x-1" />
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
