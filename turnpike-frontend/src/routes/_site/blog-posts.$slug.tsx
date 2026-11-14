import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { API_BASE_URL, API_PREFIX } from '@turnpike/shared/constants/config';

export const Route = createFileRoute('/_site/blog-posts/$slug')({
  component: BlogPostDetail,
});

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image_url: string;
  content: string;
}

function BlogPostDetail() {
  const { slug } = Route.useParams();

  const { data: blog, isLoading, error } = useQuery<BlogPost>({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}${API_PREFIX}/content/blogs/${slug}`);
      if (!res.ok) throw new Error('Failed to fetch blog post');
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafbfc]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#10B981] border-solid"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafbfc]">
        <p className="text-xl text-red-500 mb-4">Failed to load blog post.</p>
        <Link to="/blog-posts" className="text-[#10B981] hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white relative pb-24 overflow-hidden">
      {/* Hero Header */}
      <div className="relative w-full h-[50vh] min-h-[400px] flex items-end justify-center pb-16 bg-gray-50">
        <div className="absolute inset-0 z-0">
           <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover opacity-20" />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
             <div className="text-sm font-bold text-[#10B981] tracking-widest uppercase mb-4 flex items-center justify-center space-x-3">
                <span>{blog.date}</span>
                <span>&bull;</span>
                <span>By {blog.author}</span>
             </div>
             <h1 className="text-3xl md:text-5xl font-extrabold text-[#1e2330] leading-tight">
                {blog.title}
             </h1>
           </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-100"
         >
            {/* Feature Image */}
            <div className="mb-10 w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-inner flex items-center justify-center bg-gray-50">
               <img src={blog.image_url} alt="Featured" className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Prose Content Markdown */}
            <div className="prose prose-lg max-w-none prose-headings:text-[#1e2330] prose-a:text-[#10B981] prose-a:font-semibold hover:prose-a:text-[#059669] prose-img:rounded-xl">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            {/* Back Button Footer */}
            <div className="mt-16 pt-8 border-t border-gray-100">
              <Link 
                to="/blog-posts" 
                className="inline-flex items-center text-[#10B981] font-semibold hover:text-[#059669] transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                Back to all posts
              </Link>
            </div>
         </motion.div>
      </div>
    </main>
  );
}
