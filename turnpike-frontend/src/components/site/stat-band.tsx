import { motion } from "motion/react";

import { CountUp } from "@turnpike/shared/components/premium/count-up";
import { cn } from "@turnpike/shared/lib/utils";

export function CounterBand({
  items,
  className,
}: {
  items: readonly { label: string; value: number; suffix?: string }[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="rounded-[2rem] border border-border/50 bg-card/45 p-2 backdrop-blur-xl shadow-[0_18px_50px_-24px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
        >
          <div className="rounded-[1.6rem] border border-border/40 bg-card/60 p-7 text-center backdrop-blur-2xl">
            <p className="font-display text-4xl font-semibold tracking-tight text-primary">
              <CountUp value={item.value} />
              {item.suffix ?? ""}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function StatBand({
  items,
  className,
}: {
  items: readonly { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid divide-y divide-border/50 rounded-[2rem] border border-border/50 bg-card/45 backdrop-blur-xl sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="px-6 py-8 text-center transition-colors hover:bg-card/40">
          <p className="font-display text-3xl font-semibold tracking-tight text-primary">{item.value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export function ConnectedStatBand({
  items,
  className,
}: {
  items: readonly { label: string; value: number; suffix?: string; icon?: any }[];
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto mt-16 w-full max-w-5xl", className)}>
      <div className="absolute left-[10%] right-[10%] top-8 hidden h-[2px] overflow-hidden sm:block">
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full w-full border-b-[3px] border-dashed border-primary/30"
        />
      </div>

      <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-4 sm:gap-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] shadow-[0_12px_24px_-10px_color-mix(in_oklab,var(--primary)_50%,transparent)] transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_20px_35px_-12px_color-mix(in_oklab,var(--brand-cyan)_60%,transparent)]">
                {Icon ? <Icon className="size-7 text-primary-foreground" /> : <div className="size-3 rounded-full bg-background" />}
              </div>
              
              <p className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground">
                <CountUp value={item.value} />
                {item.suffix ?? ""}
              </p>
              
              <p className="mt-2 text-[15px] font-medium text-muted-foreground max-w-[140px] mx-auto leading-tight">
                {item.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
