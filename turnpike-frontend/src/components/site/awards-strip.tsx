import { Award } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function AwardsStrip({ items }: { items: readonly { title: string; body: string }[] }) {
  const reduced = useReducedMotion();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: index * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            whileHover={{ y: -10, rotate: index % 2 ? -0.6 : 0.6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={reduced ? undefined : "float-card"}
            style={reduced ? undefined : { animationDelay: `${index * 0.55}s` }}
          >
            <div className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card/45 p-2 backdrop-blur-xl shadow-[0_18px_50px_-26px_color-mix(in_oklab,var(--primary)_45%,transparent)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-22px_color-mix(in_oklab,var(--primary)_65%,transparent)]">
              <div className="relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border/40 bg-card/60 p-6 backdrop-blur-2xl">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(160deg, color-mix(in oklab, var(--primary) 14%, var(--background)), color-mix(in oklab, var(--brand-cyan) 18%, var(--background)))",
                  }}
                />
                <span aria-hidden className="sheen" />

                <span className="relative grid size-12 place-items-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] text-primary-foreground transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <span
                    aria-hidden
                    className="ring-pulse absolute inset-0 rounded-full ring-2 ring-primary/40"
                    style={{ animationDelay: `${index * 0.4}s` }}
                  />
                  <Award className="size-5" />
                </span>

                <h3 className="font-display underline-grow relative mt-5 inline text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground transition-transform duration-500 group-hover:translate-x-1">
                  {item.body}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
