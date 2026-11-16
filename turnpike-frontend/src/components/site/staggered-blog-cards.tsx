import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { PremiumCardSkeleton } from "@/components/site/premium-card";
import { humanise } from "@/components/site/premium-card";

// Reusable animated leaf branch component
const LeafBranch = ({ className, color1, color2 }: { className?: string, color1: string, color2: string }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M0,200 Q 80,150 150,50" stroke={color1} strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M30,180 C 10,130 50,100 80,100 C 60,120 50,160 30,180 Z" fill={color1} />
    <path d="M60,160 C 50,100 90,70 130,80 C 100,90 80,130 60,160 Z" fill={color2} />
    <path d="M10,140 C -10,90 20,60 50,70 C 30,80 10,110 10,140 Z" fill={color2} />
    <path d="M100,120 C 100,70 140,50 170,50 C 150,70 130,100 100,120 Z" fill={color1} />
  </svg>
);

export function StaggeredBlogCards({ blogs, loading }: { blogs: any[], loading?: boolean }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto w-full relative z-10 px-6 py-24">
        {Array.from({ length: 4 }).map((_, i) => <PremiumCardSkeleton key={i} />)}
      </div>
    );
  }

  // Ensure exactly 4 cards are shown
  const cards = blogs.slice(0, 4);
  
  if (cards.length === 0) {
    return <p className="text-sm text-slate-500 text-center w-full relative z-10 py-24">Insights are publishing soon.</p>;
  }

  return (
    <div className="relative w-full overflow-hidden bg-[#eef7f6] py-24 sm:py-32 isolate">
      
      {/* Animated Background Leaves */}
      <motion.div 
        animate={{ rotate: [-2, 2, -2] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 w-80 h-80 opacity-90 origin-bottom-left z-0 pointer-events-none"
      >
        <LeafBranch color1="#90b8d5" color2="#abcce5" />
      </motion.div>

      <motion.div 
        animate={{ rotate: [2, -2, 2] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 w-96 h-96 opacity-90 origin-bottom-right rotate-90 z-0 pointer-events-none"
      >
        <LeafBranch color1="#76c8c4" color2="#9bdad6" />
      </motion.div>

      <motion.div 
        animate={{ rotate: [-3, 3, -3] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-72 h-72 opacity-80 origin-top-right rotate-180 z-0 pointer-events-none"
      >
        <LeafBranch color1="#76c8c4" color2="#9bdad6" />
      </motion.div>
      
      <motion.div 
        animate={{ rotate: [3, -3, 3] }} 
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-16 w-80 h-80 opacity-40 origin-top-left -rotate-90 z-0 pointer-events-none"
      >
        <LeafBranch color1="#9bdad6" color2="#c3e8e6" />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0fa9a3] mb-3">Insights</p>
          <h2 className="font-display text-4xl font-light text-slate-800 mb-4 tracking-tight">
            Field notes from live engagements
          </h2>
          <p className="text-slate-500">
            Editorial published through the Turnpike Analyst content pipeline.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center pt-10 pb-16">
          {cards.map((post, i) => {
            // Arch Stagger: outer cards sit lower, inner cards sit higher (like the screenshot)
            const staggerY = (i === 0 || i === 3) ? 50 : 0;
            
            return (
              <motion.div 
                key={post.slug}
                initial={{ opacity: 0, y: staggerY + 40 }}
                whileInView={{ opacity: 1, y: staggerY }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15, type: "spring", stiffness: 90 }}
                className="h-full"
              >
                {/* Continuous floating animation for each card */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4 + (i % 2), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  className="bg-card rounded-[1.5rem] p-6 sm:p-7 flex flex-col h-full min-h-[420px] shadow-[0_20px_50px_-12px_rgba(0,120,130,0.12)] border border-border hover:shadow-[0_25px_60px_-12px_rgba(0,120,130,0.2)] transition-shadow duration-300"
                >
                  <h3 className="font-display font-medium text-[1.1rem] text-foreground text-center mb-4 leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-8 line-clamp-3 text-center">
                    {post.summary}
                  </p>

                  {/* Simulated Modal Inputs */}
                  <div className="flex justify-between gap-4 mb-8 mt-auto px-1">
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[9px] font-bold text-[#0fa9a3] uppercase tracking-wider mb-2 truncate">Author</p>
                      <div className="text-[13px] font-medium text-muted-foreground border-b border-border/50 pb-1 truncate">{post.author}</div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[9px] font-bold text-[#0fa9a3] uppercase tracking-wider mb-2 truncate">Category</p>
                      <div className="text-[13px] font-medium text-muted-foreground border-b border-border/50 pb-1 truncate">{humanise(post.category)}</div>
                    </div>
                  </div>

                  {/* Simulated Modal Buttons */}
                  <div className="flex gap-2.5 mt-auto">
                    <div className="flex-1 py-3 bg-muted/50 text-foreground text-xs font-semibold rounded-[0.8rem] text-center transition-colors hover:bg-muted/80 cursor-default">
                      Bookmark
                    </div>
                    <Link 
                      to="/blog/$slug" 
                      params={{ slug: post.slug }}
                      className="flex-[1.4] py-3 bg-[#0fa9a3] hover:bg-[#0d948f] text-white text-xs font-semibold rounded-[0.8rem] text-center shadow-[0_6px_16px_0_rgba(15,169,163,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Read article
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
