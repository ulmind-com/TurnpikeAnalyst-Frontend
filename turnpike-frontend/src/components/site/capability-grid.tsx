import {
  ArrowUpRight,
  Braces,
  Briefcase,
  FlaskConical,
  Megaphone,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

const ICONS: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  code: Braces,
  search: Search,
  users: Users,
  megaphone: Megaphone,
  flask: FlaskConical,
};

export function CapabilityGrid({
  items,
}: {
  items: readonly { icon: string; title: string; body: string }[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = ICONS[item.icon] ?? Briefcase;
        return (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group relative rounded-[2rem] border border-border/50 bg-card/45 p-2 backdrop-blur-xl shadow-[0_18px_50px_-26px_color-mix(in_oklab,var(--primary)_45%,transparent)] transition-shadow hover:shadow-[0_26px_60px_-22px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border/40 bg-card/60 p-7 backdrop-blur-2xl">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(110% 90% at 12% 4%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 62%), radial-gradient(110% 100% at 92% 96%, color-mix(in oklab, var(--brand-cyan) 24%, transparent), transparent 60%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(160deg, color-mix(in oklab, var(--primary) 14%, var(--background)), color-mix(in oklab, var(--brand-cyan) 16%, var(--background)))",
                }}
              />
              <span aria-hidden className="sheen" />

              <div className="relative flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-full bg-card/60 p-1.5 ring-1 ring-border/60">
                  <span className="grid size-full place-items-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] text-primary-foreground transition-transform duration-300 group-hover:rotate-6">
                    <Icon className="size-5" />
                  </span>
                </span>
                <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <h3 className="font-display relative mt-5 text-xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
