import { motion } from "motion/react";
import { ChevronRight, BookOpen, Lightbulb, Rocket } from "lucide-react";
import { cn } from "@turnpike/shared/lib/utils";
import { Link } from "@tanstack/react-router";
import { PremiumCardSkeleton } from "@/components/site/premium-card";

export function AnimatedBlogCards({ blogs, loading }: { blogs: any[], loading?: boolean }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto w-full">
        {Array.from({ length: 3 }).map((_, i) => <PremiumCardSkeleton key={i} />)}
      </div>
    );
  }

  const cards = blogs.slice(0, 3);
  
  if (cards.length === 0) {
    return <p className="text-sm text-muted-foreground text-center w-full">Insights are publishing soon.</p>;
  }

  const visualConfig = [
    { 
      icon: <BookOpen className="size-12 text-slate-800" />, 
      ribbonY: "top-1/4", 
      ribbonRotate: "-rotate-12",
      floatingShape: "bg-blue-400/30",
    },
    { 
      icon: <Lightbulb className="size-12 text-slate-800" />, 
      ribbonY: "top-[30%]", 
      ribbonRotate: "rotate-6",
      floatingShape: "bg-purple-400/30",
    },
    { 
      icon: <Rocket className="size-12 text-slate-800" />, 
      ribbonY: "top-[20%]", 
      ribbonRotate: "-rotate-[15deg]",
      floatingShape: "bg-brand-cyan/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto w-full">
      {cards.map((post, i) => (
        <motion.div 
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative bg-white rounded-[2.5rem] p-8 min-h-[480px] flex flex-col items-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden isolate group"
        >
          {/* Sweeping Ribbon */}
          <div 
            className={cn(
              "absolute left-[-20%] right-[-20%] h-36 bg-[linear-gradient(135deg,var(--primary),var(--brand-cyan))] -z-10 transition-transform duration-700 ease-out group-hover:scale-110",
              visualConfig[i].ribbonY,
              visualConfig[i].ribbonRotate
            )}
          />

          {/* Floating Character / Icon Area */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            className="mt-12 mb-auto z-10 relative"
          >
             {/* Simulating a 3D object container */}
             <div className="w-32 h-32 bg-card/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-border flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500">
               {visualConfig[i].icon}
             </div>
             
             {/* Small floating accents */}
             <motion.div
               animate={{ y: [0, 8, 0], rotate: [0, 15, 0] }}
               transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
               className={cn(
                 "absolute -top-4 -right-4 w-12 h-12 backdrop-blur-md rounded-full border border-white/60 shadow-lg",
                 visualConfig[i].floatingShape
               )}
             />
             <motion.div
               animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
               transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
               className={cn(
                 "absolute -bottom-2 -left-3 w-6 h-6 backdrop-blur-md rounded-lg border border-white/60 shadow-sm",
                 visualConfig[i].floatingShape
               )}
             />
          </motion.div>

          {/* Content & Action */}
          <div className="mt-8 z-10 w-full flex flex-col items-center">
            <h3 className="font-display text-2xl font-bold text-slate-900 leading-snug mb-3">
              {post.title}
            </h3>
            <p className="text-sm text-slate-500 mb-8 line-clamp-2">
              {post.summary}
            </p>
            
            {/* Button */}
            <div className="relative group/btn mt-auto">
              <div className="absolute -inset-2 rounded-[1.4rem] border-[2px] border-slate-100 transition-colors duration-500 group-hover:border-brand-cyan" />
              <Link 
                to="/blog/$slug" 
                params={{ slug: post.slug }}
                className="bg-[#0b0c10] text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-transform active:scale-95 z-10 relative shadow-xl hover:bg-slate-800"
              >
                <ChevronRight className="size-6 transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
