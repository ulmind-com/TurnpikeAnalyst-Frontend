import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Info, Clock, CheckCircle2, Search, Mail, Calendar, LayoutDashboard } from "lucide-react";
import { PremiumCardSkeleton } from "@/components/site/premium-card";

// A faint decorative background pattern matching the screenshot
const MandalaPattern = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className}>
    <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="4" opacity="0.1" strokeDasharray="10 10" />
    <circle cx="100" cy="100" r="70" stroke="white" strokeWidth="2" opacity="0.1" />
    <circle cx="100" cy="100" r="50" fill="white" opacity="0.05" />
    <path d="M100 20 Q120 50 150 50 Q150 80 180 100 Q150 120 150 150 Q120 150 100 180 Q80 150 50 150 Q50 120 20 100 Q50 80 50 50 Q80 50 100 20 Z" stroke="white" strokeWidth="4" opacity="0.1" strokeLinejoin="round" />
  </svg>
);

export function OnboardingBlogCards({
  blogs,
  loading,
  heading,
}: {
  blogs: any[];
  loading?: boolean;
  heading?: { eyebrow?: string; title?: string; description?: string };
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto w-full relative z-10 px-6 py-24">
        {Array.from({ length: 4 }).map((_, i) => <PremiumCardSkeleton key={i} />)}
      </div>
    );
  }

  // Ensure exactly 4 cards are shown
  const cards = blogs.slice(0, 4);
  
  // Nothing to show → render nothing (no tall empty block between reviews and footer).
  if (cards.length === 0) {
    return null;
  }

  const icons = [LayoutDashboard, Mail, Calendar, Search];

  return (
    <div className="relative w-full overflow-hidden bg-[#38b292] dark:bg-muted/20 py-24 isolate">
      
      {/* Background Decorative Patterns */}
      <MandalaPattern className="absolute -top-40 -left-20 w-[500px] h-[500px] pointer-events-none" />
      <MandalaPattern className="absolute -bottom-40 -right-20 w-[600px] h-[600px] pointer-events-none rotate-45" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="w-12 h-12 bg-white dark:bg-card rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#38b292]/50 dark:shadow-none dark:border dark:border-border">
            <Info className="size-5 text-[#38b292] fill-[#38b292] dark:text-primary dark:fill-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white dark:text-foreground mb-4 tracking-tight">
            {heading?.title || "Field Notes & Insights"}
          </h2>
          <p className="text-white/80 dark:text-muted-foreground font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            {heading?.description ||
              "Editorial published through the Turnpike Analyst content pipeline, introducing the main features and insights before you start using it."}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 items-center pt-8 pb-10">
          {cards.map((post, i) => {
            const IconComponent = icons[i % icons.length];
            
            return (
              <motion.div 
                key={post.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-card border border-transparent dark:border-border rounded-[2.5rem] p-7 flex flex-col h-full min-h-[500px] shadow-2xl shadow-black/10 group relative"
              >
                
                {/* Floating Graphic Area */}
                <div className="h-48 relative flex items-center justify-center mt-2 mb-6 w-full">
                  {/* Faint background circle */}
                  <div className="absolute w-32 h-32 bg-[#e8f6f2] dark:bg-primary/10 rounded-full transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Main central icon */}
                  <div className="relative z-10 w-16 h-16 bg-background rounded-2xl shadow-lg flex items-center justify-center border border-[#e8f6f2] dark:border-border group-hover:-translate-y-2 transition-transform duration-500">
                    <IconComponent className="size-8 text-[#38b292]" />
                  </div>

                  {/* Little floating accent circles like the screenshot */}
                  <motion.div 
                    animate={{ y: [0, -5, 0] }} 
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className="absolute top-8 left-6 w-8 h-8 bg-[#38b292] rounded-full shadow-md flex items-center justify-center text-white"
                  >
                     <CheckCircle2 className="size-4" />
                  </motion.div>
                  
                  <motion.div 
                    animate={{ y: [0, 5, 0] }} 
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                    className="absolute bottom-6 right-4 w-10 h-10 bg-[#38b292] rounded-full shadow-md flex items-center justify-center text-white"
                  >
                     <Clock className="size-5" />
                  </motion.div>
                </div>

                <h3 className="font-display font-bold text-[1.15rem] text-foreground text-center mb-3 leading-snug px-2">
                  {post.title}
                </h3>
                
                <p className="text-xs text-muted-foreground mb-8 line-clamp-3 text-center px-4 leading-relaxed font-medium">
                  {post.summary}
                </p>

                {/* Decorative Dots Navigation */}
                <div className="flex justify-center gap-1.5 mb-8 mt-auto">
                   <div className="w-4 h-1.5 rounded-full bg-[#38b292]" />
                   <div className="w-1.5 h-1.5 rounded-full bg-[#e8f6f2]" />
                   <div className="w-1.5 h-1.5 rounded-full bg-[#e8f6f2]" />
                </div>

                {/* Simulated Modal Buttons */}
                <div className="flex flex-col gap-3">
                  <div className="w-full py-3.5 bg-transparent border-2 border-border text-muted-foreground text-sm font-bold rounded-[1rem] text-center transition-colors hover:bg-muted/50 hover:text-foreground cursor-default">
                    Bookmark
                  </div>
                  <Link 
                    to="/blog/$slug" 
                    params={{ slug: post.slug }}
                    className="w-full py-3.5 bg-[#38b292] hover:bg-[#2d9e7d] text-white text-sm font-bold rounded-[1rem] text-center shadow-[0_8px_20px_-6px_rgba(56,178,146,0.5)] transition-all hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Read article
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
