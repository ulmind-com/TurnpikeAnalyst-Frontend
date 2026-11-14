import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

import { cn } from "@turnpike/shared/lib/utils";

type Testimonial = { quote: string; name: string; role: string };

function ReviewCard({ item }: { item: Testimonial }) {
  return (
    <article className="group relative w-[19rem] shrink-0 rounded-[2rem] border border-border/50 bg-card/45 p-2 backdrop-blur-xl shadow-[0_22px_60px_-30px_color-mix(in_oklab,var(--primary)_50%,transparent)] transition-transform duration-500 hover:-translate-y-2 sm:w-[24rem]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border/40 bg-card/60 p-6 backdrop-blur-2xl sm:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(110% 90% at 12% 4%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 62%), radial-gradient(110% 100% at 92% 96%, color-mix(in oklab, var(--brand-cyan) 22%, transparent), transparent 60%)",
          }}
        />
        <span aria-hidden className="sheen" />

        <div className="relative flex items-center justify-between">
          <Quote className="size-7 text-primary/70 transition-transform duration-500 group-hover:-rotate-6" />
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-4 fill-primary text-primary" />
            ))}
          </div>
        </div>

        <p className="relative mt-5 text-pretty text-sm leading-relaxed text-foreground/85">
          “{item.quote}”
        </p>

        <div className="relative mt-6 flex items-center gap-3 border-t border-white/50 pt-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] text-sm font-semibold text-primary-foreground">
            {item.name.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{item.name}</p>
            <p className="truncate text-xs text-muted-foreground">{item.role}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function Row({
  items,
  reverse = false,
  duration = 46,
}: {
  items: readonly Testimonial[];
  reverse?: boolean;
  duration?: number;
}) {
  const track = [...items, ...items, ...items, ...items];
  return (
    <div className="group/row relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex w-max gap-5 py-3"
        style={{
          animation: `marquee-x ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((item, index) => (
          <ReviewCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialCarousel({
  items,
  className,
}: {
  items: readonly Testimonial[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("space-y-2", className)}
    >
      <Row items={items} duration={48} />
      <Row items={[...items].reverse()} reverse duration={62} />
    </motion.div>
  );
}
