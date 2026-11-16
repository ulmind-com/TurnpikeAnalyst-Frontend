import { motion } from "motion/react";
import { ArrowRight, Bookmark, Layers } from "lucide-react";

import type { ServiceResponse } from "@turnpike/shared/types/api";
import { cn } from "@turnpike/shared/lib/utils";

const humanise = (value?: string) =>
  (value ?? "")
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 flex-1 px-3 text-center first:pl-0 last:pr-0">
      <p className="truncate text-sm font-semibold text-foreground">{value}</p>
      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

export function ServiceCard({
  service,
  className,
  onAction,
}: {
  service: ServiceResponse;
  className?: string;
  onAction?: (service: ServiceResponse) => void;
}) {
  const platforms = service.supported_platforms?.length ?? 0;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group flex h-full flex-col rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur-xl",
        "shadow-[0_1px_2px_color-mix(in_oklab,var(--foreground)_6%,transparent)] transition-colors duration-300",
        "hover:border-primary/50 hover:shadow-float",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary ring-1 ring-primary/20">
          <Layers className="size-5" />
        </div>
        <button
          type="button"
          aria-label="Save service"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Bookmark className="size-4" />
        </button>
      </div>

      <h3 className="mt-5 line-clamp-2 text-lg font-semibold leading-snug tracking-tight">
        {service.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {service.short_description}
      </p>

      <div className="mt-5 flex-1" />

      <div className="flex items-stretch divide-x divide-border/60 border-y border-border/60 py-3">
        <Meta label="Practice" value={humanise(service.parent_category)} />
        <Meta label="Discipline" value={humanise(service.sub_service_type)} />
        <Meta label="Platforms" value={platforms ? String(platforms) : "—"} />
      </div>

      <button
        type="button"
        onClick={() => onAction?.(service)}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-95 hover:gap-3"
      >
        View service
        <ArrowRight className="size-4" />
      </button>
    </motion.article>
  );
}

export function ServiceCardSkeleton() {
  return <div className="h-[19rem] animate-pulse rounded-3xl border border-border/40 bg-card/30" />;
}
