import { motion } from "motion/react";
import { ServiceGlyph } from "@/components/site/service-glyph";
import { useState } from "react";
import { cn } from "@turnpike/shared/lib/utils";

export function DarkFeatureSpotlight({
  eyebrow,
  title,
  body,
  bullets,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: readonly { title: string; body: string }[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200/60 min-h-[500px]">
      
      {/* Title Pane */}
      <div className="relative z-10 flex flex-col justify-center p-8 lg:p-12 w-full lg:w-[360px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50">
        <div className="relative z-20">
          <span className="inline-flex items-center border border-dashed border-brand-cyan/50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-cyan mb-8 rounded-sm bg-brand-cyan/5">
            {eyebrow}
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold leading-[1.1] mb-6 tracking-tight text-slate-900">{title}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
        </div>
      </div>
      
      {/* Accordion Panes */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {bullets.slice(0, 3).map((bullet, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <motion.div 
              key={index} 
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                flex: isHovered ? 2.5 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative z-10 flex flex-col p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 last:border-0 transition-colors duration-500 overflow-hidden min-h-[250px]",
                isHovered 
                  ? "bg-[linear-gradient(135deg,var(--primary),var(--brand-cyan))] text-white shadow-xl border-transparent" 
                  : "bg-white text-slate-900"
              )}
            >
              <div className="relative z-20 h-full flex flex-col">
                <span className={cn(
                  "mb-auto lg:mb-12 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-all duration-500",
                  isHovered
                    ? "bg-white/20 text-white shadow-sm scale-110"
                    : "bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
                )}>
                  <ServiceGlyph seed={bullet.title} />
                </span>
                
                <h3 className={cn(
                  "text-xl font-bold mt-8 lg:mt-auto mb-4 leading-snug transition-colors",
                  isHovered ? "text-white" : "text-slate-900"
                )}>
                  {bullet.title}
                </h3>
                
                <motion.p 
                  initial={false}
                  animate={{ 
                    opacity: isHovered ? 1 : 0.8,
                  }}
                  className={cn(
                    "text-sm leading-relaxed transition-colors line-clamp-4 lg:line-clamp-none",
                    isHovered ? "text-white/90" : "text-slate-600"
                  )}
                >
                  {bullet.body}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
