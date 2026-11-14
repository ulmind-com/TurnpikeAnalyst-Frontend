import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { 
  Search, Bell, Grid, Folder, Monitor, Users, FileText, Settings, Headphones, 
  Menu, MoreHorizontal, Layout 
} from "lucide-react";
import { PremiumCardSkeleton } from "@/components/site/premium-card";
import { humanise } from "@/components/site/premium-card";
import { useState } from "react";
import { cn } from "@turnpike/shared/lib/utils";

export function DashboardBlogCards({ blogs, loading }: { blogs: any[], loading?: boolean }) {
  if (loading) {
    return (
       <div className="max-w-7xl mx-auto w-full h-[800px] bg-muted/40 rounded-3xl animate-pulse my-24" />
    );
  }

  const cards = blogs.slice(0, 6);
  
  if (cards.length === 0) {
    return <p className="text-sm text-muted-foreground text-center w-full py-24">Insights are publishing soon.</p>;
  }

  return (
    <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 relative z-10 py-16 lg:py-24">
      
      {/* Dashboard Window */}
      <div className="flex bg-[#f8f9fc] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-border/60 min-h-[800px]">
        
        {/* Left Sidebar */}
        <div className="hidden lg:flex w-20 bg-[#6384f5] flex-col items-center py-6 gap-8 text-white/70">
          <Menu className="size-6 text-white mb-4 cursor-pointer hover:text-white transition-colors" />
          <Grid className="size-6 text-white cursor-pointer" />
          <Folder className="size-5 cursor-pointer hover:text-white transition-colors" />
          <Monitor className="size-5 cursor-pointer hover:text-white transition-colors" />
          <Users className="size-5 cursor-pointer hover:text-white transition-colors" />
          <FileText className="size-5 cursor-pointer hover:text-white transition-colors" />
          <Settings className="size-5 mt-auto cursor-pointer hover:text-white transition-colors" />
          <Headphones className="size-5 cursor-pointer hover:text-white transition-colors" />
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Top Navbar */}
          <div className="h-16 bg-card flex items-center justify-between px-6 lg:px-10 border-b border-border shrink-0">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Search className="size-4" />
              <span className="text-sm">Search...</span>
            </div>
            
            <div className="font-display font-bold text-xl text-[#6384f5] tracking-tight">
              {`{ TurnpikeInsights }`}
            </div>
            
            <div className="flex items-center gap-5">
              <div className="relative cursor-pointer">
                <Bell className="size-5 text-muted-foreground" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex items-center gap-3 ml-2 border-l border-border pl-5 cursor-pointer">
                <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-8 h-8 rounded-full bg-slate-200" />
                <span className="text-sm font-medium text-muted-foreground hidden sm:block">Hello, Reader</span>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#6384f5]/10 flex items-center justify-center text-[#6384f5]">
                  <Layout className="size-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Field Notes</h2>
                  <p className="text-sm text-muted-foreground mt-1">Live engagements and editorial published through our pipeline.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="bg-[#83a1fa] hover:bg-[#6384f5] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
                  Add Bookmark
                </button>
                <div className="px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-medium text-muted-foreground hidden sm:block shadow-sm">
                  All Posts 
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {cards.map((post, i) => (
                <DashboardCard key={post.slug} post={post} index={i} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ post, index }: { post: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Alternate badge colors like the screenshot
  const badgeColor = index % 2 === 0 ? "bg-[#83a1fa]" : "bg-[#fcd269]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-card rounded-[1.5rem] p-7 shadow-sm border border-border hover:shadow-xl transition-all duration-300 flex flex-col h-[340px] group cursor-pointer"
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-5">
        <span className={cn("text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-md shadow-sm", badgeColor)}>
          {humanise(post.category)}
        </span>
        <MoreHorizontal className="size-5 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors" />
      </div>

      <h3 className="font-bold text-xl text-foreground leading-snug line-clamp-2">
        {post.title}
      </h3>
      
      <div className="flex items-center gap-3 mt-2.5 text-xs">
        <span className="text-muted-foreground font-medium">{post.author}</span>
        <div className="flex items-center gap-1.5 text-[#5dd996] font-bold uppercase tracking-wider text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5dd996]" />
          PUBLISHED
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-5 line-clamp-3 leading-relaxed flex-1 font-medium">
        {post.summary}
      </p>

      {/* Card Footer (Animated) */}
      <div className="mt-6 pt-5 border-t border-border flex items-center justify-between h-12 relative overflow-hidden">
        
        {/* Default Stats */}
        <motion.div 
          initial={false}
          animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 20 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-5 absolute left-0"
        >
          <div>
            <p className="text-xs font-bold text-foreground/80">5 MIN</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">READ</p>
          </div>
          <div>
            <p className="text-xs font-bold text-foreground/80">1.2K</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">VIEWS</p>
          </div>
        </motion.div>

        {/* Hover Button */}
        <motion.div 
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
          className="absolute left-0"
        >
          <Link 
            to="/blog/$slug" 
            params={{ slug: post.slug }}
            className="bg-[#83a1fa] hover:bg-[#6384f5] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm inline-block"
          >
            OPEN
          </Link>
        </motion.div>

        {/* Avatars */}
        <div className="flex items-center ml-auto">
          <img src={`https://i.pravatar.cc/100?img=${index + 10}`} className="w-8 h-8 rounded-full border-2 border-white -mr-2.5 relative z-30 shadow-sm" />
          <img src={`https://i.pravatar.cc/100?img=${index + 20}`} className="w-8 h-8 rounded-full border-2 border-white -mr-2.5 relative z-20 shadow-sm" />
          <div className="w-8 h-8 rounded-full border-2 border-white bg-[#83a1fa] text-white text-[10px] font-bold flex items-center justify-center relative z-10 shadow-sm">
            +5
          </div>
        </div>

      </div>
    </motion.div>
  );
}
