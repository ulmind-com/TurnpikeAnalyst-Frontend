import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Calendar, User, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { Reveal } from "@/components/site/parallax";
import { humanise } from "@/components/site/premium-card";
import { WaveDivider } from "@/components/site/wave-divider";
import { usePublicBlog, usePublicBlogs } from "@turnpike/shared/hooks/use-public-api";

export const Route = createFileRoute("/_site/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Insight — Turnpike Analyst field notes" },
      {
        name: "description",
        content:
          "Field notes from live enterprise content migration and automation engagements, published by Turnpike Analyst.",
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: "Insight — Turnpike Analyst" },
      {
        property: "og:description",
        content: "Field notes from live migration and automation engagements.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const post = usePublicBlog(slug);
  const all = usePublicBlogs();

  const related = (all.data ?? []).filter((item) => item.slug !== slug).slice(0, 3);

  if (post.isLoading) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center pt-20">
        <div className="h-64 w-full max-w-4xl mx-auto animate-pulse rounded-[2rem] bg-card/60 backdrop-blur-xl" />
      </div>
    );
  }

  if (!post.data) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center pt-20">
        <p className="mt-10 text-lg text-muted-foreground">This article is no longer available.</p>
      </div>
    );
  }

  // Clean up any rogue wrapping HTML tags from the backend before markdown parsing
  let cleanMarkdown = post.data.content_html
    .replace(/<\/?p[^>]*>/gi, '\n\n') // replace paragraphs with markdown newlines
    .replace(/<br\s*\/?>/gi, '\n');
    
  // Strip the redundant # Title at the beginning of the markdown if it exists
  // because we already display the title beautifully in the hero header.
  cleanMarkdown = cleanMarkdown.replace(/^\s*#\s+[^\n]+\n+/i, '').trim();

  return (
    <main className="min-h-screen bg-muted/40 relative pb-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Immersive Hero Header with Primary Theme Color */}
      <div className="relative w-full min-h-[60vh] flex flex-col justify-end pb-24 pt-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 bg-primary">
           {(post.data as any).image_url && (
             <img src={(post.data as any).image_url} alt={post.data.title} className="w-full h-full object-cover opacity-20 mix-blend-multiply" />
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-primary/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto w-full">
           <nav className="flex items-center flex-wrap gap-2 text-sm text-primary-foreground/80 transition-colors mb-8 font-semibold uppercase tracking-wider">
             <Link to="/" className="hover:text-white transition-colors">Home</Link>
             <ChevronRight className="w-4 h-4 opacity-50" />
             <Link to="/blog" className="hover:text-white transition-colors">Blogs</Link>
             <ChevronRight className="w-4 h-4 opacity-50" />
             <span className="text-white truncate max-w-[200px] sm:max-w-md">{post.data.title}</span>
           </nav>
           
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           >
             <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-lg mb-6">
               <BookOpen className="size-4" />
               {humanise(post.data.category)}
             </span>
             
             <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-8 drop-shadow-xl text-balance">
               {post.data.title}
             </h1>
             
             <div className="flex flex-wrap items-center gap-6 text-white text-sm font-medium">
               <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-inner">
                 <User className="w-4 h-4 text-white/80" />
                 <span>{post.data.author}</span>
               </div>
               {post.data.published_at && (
                 <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-inner">
                   <Calendar className="w-4 h-4 text-white/80" />
                   <span>{new Date(post.data.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                 </div>
               )}
             </div>
           </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
         <Reveal className="bg-card/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-border p-8 sm:p-12 md:p-16 relative">
            
            {post.data.summary && (
              <div className="relative text-xl md:text-2xl font-medium text-foreground/80 leading-relaxed mb-12 pb-12 border-b border-border/60">
                <div className="absolute left-0 top-2 bottom-14 w-1.5 bg-gradient-to-b from-primary via-brand-cyan to-secondary rounded-full -ml-8 sm:-ml-12 opacity-80" />
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-slate-700 to-slate-500">
                  {post.data.summary}
                </span>
              </div>
            )}

            <div className="prose prose-lg md:prose-xl max-w-none text-muted-foreground prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-primary prose-h3:text-secondary prose-h4:text-brand-blue prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-a:font-semibold prose-a:transition-colors prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-border prose-strong:text-foreground prose-strong:font-semibold prose-ul:marker:text-primary prose-ol:marker:text-primary">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{cleanMarkdown}</ReactMarkdown>
            </div>

            
            {post.data.tags?.length ? (
              <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-2">
                {post.data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-muted/40 px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-border hover:text-foreground transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
         </Reveal>
      </div>

      {/* Keep Reading Section */}
      {related.length ? (
        <div className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">More Insights</h2>
            <Link to="/blog" className="text-primary font-semibold hover:text-primary/80 flex items-center gap-2 group">
              View all <ArrowLeft className="w-4 h-4 rotate-180 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.1}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: item.slug }}
                  className="group block h-full rounded-3xl border border-border bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/20"
                >
                  <div className="flex flex-col h-full">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary mb-4">{humanise(item.category)}</span>
                    <h3 className="font-display text-xl font-bold leading-snug text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="line-clamp-3 text-muted-foreground mb-6 flex-grow">{item.summary}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      Read article <ArrowLeft className="w-4 h-4 rotate-180 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
      
      <div className="mt-20">
        <WaveDivider variant="ribbon" />
      </div>
    </main>
  );
}

