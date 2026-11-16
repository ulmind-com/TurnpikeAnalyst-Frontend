import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, Layers } from "lucide-react";

import type { ServiceResponse } from "@turnpike/shared/types/api";
import { cn } from "@turnpike/shared/lib/utils";

/** Loosely-typed Link so cards can accept a runtime route string. */
export const AnyLink = Link as unknown as (props: {
  to: string;
  params?: Record<string, string>;
  className?: string;
  children?: ReactNode;
}) => ReactNode;


export const humanise = (value?: string) =>
  (value ?? "")
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export type PremiumCardMeta = { label: string; value: string };

function Meta({ label, value }: PremiumCardMeta) {
  return (
    <div className="min-w-0 flex-1 px-3 first:pl-0 last:pr-0">
      <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 truncate text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

export function PremiumCard({
  icon,
  title,
  description,
  meta,
  action,
  bookmarkable = false,
  accent = "primary",
  compact = false,
  className,
  children,
}: {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  meta?: PremiumCardMeta[];
  action?: { label: string; onClick?: () => void; to?: string; params?: Record<string, string> };
  bookmarkable?: boolean;
  accent?: "primary" | "cyan";
  compact?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const badge =
    accent === "cyan"
      ? "bg-[linear-gradient(150deg,color-mix(in_oklab,var(--brand-cyan)_92%,white),color-mix(in_oklab,var(--primary)_80%,white))]"
      : "bg-[linear-gradient(150deg,color-mix(in_oklab,var(--primary)_92%,white),color-mix(in_oklab,var(--brand-cyan)_80%,white))]";

  const mesh =
    accent === "cyan"
      ? "radial-gradient(120% 90% at 12% 4%, color-mix(in oklab, var(--brand-cyan) 26%, transparent), transparent 62%), radial-gradient(110% 100% at 92% 96%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 60%)"
      : "radial-gradient(120% 90% at 8% 6%, color-mix(in oklab, var(--primary) 28%, transparent), transparent 62%), radial-gradient(110% 100% at 96% 94%, color-mix(in oklab, var(--brand-cyan) 28%, transparent), transparent 60%)";

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group relative h-full rounded-[2rem] border border-border/50 bg-card/45 p-2 backdrop-blur-xl",
        "shadow-[0_18px_50px_-24px_color-mix(in_oklab,var(--primary)_45%,transparent)] transition-shadow duration-300",
        "hover:shadow-[0_26px_60px_-22px_color-mix(in_oklab,var(--primary)_55%,transparent)]",
        className,
      )}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border/40 bg-card/60 p-6 backdrop-blur-2xl">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: mesh }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in oklab, var(--primary) 14%, var(--background)), color-mix(in oklab, var(--brand-cyan) 16%, var(--background)))",
          }}
        />
        <span aria-hidden className="sheen" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,color-mix(in_oklab,white_45%,transparent),transparent)]"
        />

        <div className="relative flex h-full flex-col">
          {icon || bookmarkable ? (
            <div className="flex items-start justify-between gap-3">
              {icon ? (
                <div className="grid size-14 shrink-0 place-items-center rounded-full bg-card/60 p-1.5 shadow-[0_10px_24px_-12px_color-mix(in_oklab,var(--primary)_70%,transparent)] ring-1 ring-border/60">
                  <div
                    className={cn(
                      "grid size-full place-items-center rounded-full text-primary-foreground",
                      badge,
                    )}
                  >
                    {icon}
                  </div>
                </div>
              ) : (
                <span />
              )}
              {bookmarkable ? (
                <button
                  type="button"
                  aria-label="Save item"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-border/60 bg-card/40 text-muted-foreground backdrop-blur transition-colors hover:text-primary"
                >
                  <Bookmark className="size-4" />
                </button>
              ) : null}
            </div>
          ) : null}

          <h3
            className={cn(
              "font-display line-clamp-2 font-semibold leading-snug tracking-tight",
              icon || bookmarkable ? "mt-5" : "",
              compact ? "text-base" : "text-xl",
            )}
          >
            {title}
          </h3>

          {description ? (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
          ) : null}

          {children}

          <div className="mt-5 flex-1" />

          {meta?.length ? (
            <div className="flex items-stretch divide-x divide-border/50 rounded-full border border-border/50 bg-card/45 px-5 py-3 backdrop-blur">
              {meta.map((item) => (
                <Meta key={item.label} {...item} />
              ))}
            </div>
          ) : null}

          {action ? (
            action.to ? (
              <AnyLink
                to={action.to}
                params={action.params}
                className={cn(
                  "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground",
                  "transition-all duration-300 hover:gap-3 hover:brightness-105",
                  badge,
                )}
              >
                {action.label}
                <ArrowRight className="size-4" />
              </AnyLink>
            ) : (
              <button
                type="button"
                onClick={action.onClick}
                className={cn(
                  "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground",
                  "transition-all duration-300 hover:gap-3 hover:brightness-105",
                  badge,
                )}
              >
                {action.label}
                <ArrowRight className="size-4" />
              </button>
            )
          ) : null}

        </div>
      </div>
    </motion.article>
  );
}

export function PremiumCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("h-[19rem] animate-pulse rounded-[2rem] border border-white/50 bg-white/40", className)} />
  );
}


/** Thin wrapper preserving the original service card API. */
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
    <PremiumCard
      className={className}
      icon={<Layers className="size-5" />}
      bookmarkable
      title={service.title}
      description={service.short_description}
      meta={[
        { label: "Practice", value: humanise(service.parent_category) },
        { label: "Discipline", value: humanise(service.sub_service_type) },
        { label: "Platforms", value: platforms ? String(platforms) : "—" },
      ]}
      action={
        onAction
          ? { label: "View service", onClick: () => onAction(service) }
          : { label: "View service", to: "/services/$slug", params: { slug: service.slug } }
      }

    />
  );
}

export const ServiceCardSkeleton = PremiumCardSkeleton;
