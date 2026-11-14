import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL, API_PREFIX } from '@turnpike/shared/constants/config';

export const Route = createFileRoute('/_site/blog-posts')({
  component: BlogPosts,
});

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image_url: string;
}

function BlogPosts() {
  const { data: blogs, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}${API_PREFIX}/content/blogs`);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      return res.json();
    }
  });

  return (
    <main className="min-h-screen bg-[#fafbfc] relative pb-24 overflow-hidden">
      
      {/* Hero Section with Skewed Green Frame */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center">
        {/* Abstract Skewed Frame Simulation */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute w-[80%] max-w-[900px] h-[300px] md:h-[400px] border-[5px] border-[#10B981] rounded-sm transform -rotate-2 z-0"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center flex flex-col items-center justify-center p-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-[5rem] font-[900] text-[#1e2330] tracking-[0.2em] mb-4 uppercase"
          >
            TURNPIKEANALYST
          </motion.h1>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl font-[800] text-[#10B981] tracking-[0.3em] uppercase"
          >
            BLOG POSTS
          </motion.h2>
        </div>
      </div>

      {/* Blogs Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading && (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#10B981] border-solid"></div>
          </div>
        )}
        
        {error && (
          <div className="text-center py-24 text-red-500">
            <p>Failed to load blogs. Please try again later.</p>
          </div>
        )}

        {blogs && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.article 
                key={blog._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="h-48 w-full bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100 relative overflow-hidden">
                  <img 
                    src={blog.image_url} 
                    alt={blog.title} 
                    className="max-h-full max-w-full object-contain z-10 transition-transform duration-500 hover:scale-105"
                  />
                  {/* Optional decorative background for the image area */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#f0fdf4] to-transparent opacity-50"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs font-semibold text-[#10B981] mb-2 uppercase tracking-wider flex items-center space-x-2">
                    <span>{blog.date}</span>
                    <span>&bull;</span>
                    <span>By {blog.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 hover:text-[#10B981] transition-colors cursor-pointer">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                    {blog.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link 
                      to="/blog-posts/$slug" 
                      params={{ slug: blog.slug }}
                      className="inline-block text-sm font-semibold text-[#10B981] border border-[#10B981] rounded-full px-5 py-2 hover:bg-[#10B981] hover:text-white transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
