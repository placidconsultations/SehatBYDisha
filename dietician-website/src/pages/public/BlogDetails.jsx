import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogById } from '../../firebase/blogService.js';
import Navbar from '../../components/Navbar';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import { FaArrowLeft, FaCalendarAlt, FaUser } from 'react-icons/fa';
import Blogs from './Blogs.jsx';
import { BlogDetailsSkeleton } from '../../components/SkeletonLoader';
import ImageWithLoader from '../../components/ImageWithLoader';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(id);
        setBlog(blogData);
      } catch (err) {
        setError('Failed to load blog post. It may have been removed or the URL is incorrect.');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Background>
          <Navbar />
          <main className="flex-grow pt-16 mb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <BlogDetailsSkeleton />
            </div>
          </main>
          <Footer />
        </Background>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
        <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="bg-red-50 text-red-600 px-4 py-4 rounded-xl relative" role="alert">
            <strong className="font-bold block mb-1">Something went wrong</strong>
            <span className="block text-sm text-gray-600 mb-4">{error || 'Blog post not found'}</span>
            <Link to="/blogs" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[var(--color-green)] hover:text-[var(--color-darkGreen)] transition-colors">
              <FaArrowLeft size={12} /> Back to all posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Background>
        <Navbar />
        <main className="flex-grow pt-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            
            {/* Back Button */}
            <Link
              to="/blogs"
              className="inline-flex items-center text-sm font-medium text-[var(--color-green)] hover:text-[var(--color-darkGreen)] mb-6 mt-2 transition-colors group"
            >
              <FaArrowLeft className="mr-2 transform group-hover:-translate-x-0.5 transition-transform" />
              Back to all posts
            </Link>

            {/* Main Split Layout Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                
                {/* Left Side: Image Section (Sticky on desktop, natural flow on mobile) */}
                {blog.imageUrl && (
                  <div className="w-full lg:w-1/2 lg:sticky lg:top-20 h-[280px] sm:h-[380px] lg:h-[calc(100vh-11rem)] overflow-hidden bg-gray-50">
                    <ImageWithLoader
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Right Side: Content Section (Scrolls beautifully on desktop, expands fully on mobile) */}
                <div className="w-full lg:w-1/2 p-5 sm:p-8 lg:p-12 flex flex-col justify-between lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto style-scrollbar">
                  <div>
                    {/* Header Details */}
                    <div className="space-y-3 mb-6">
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                        {blog.title}
                      </h1>

                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-500 pt-1">
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-[var(--color-green)] shrink-0" />
                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <span className="flex items-center">
                          <FaUser className="mr-2 text-[var(--color-green)] shrink-0" />
                          {blog.author || 'Admin'}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content Grid (Full text visibility guaranteed) */}
                    <div className="prose prose-gray max-w-none text-gray-600 text-sm sm:text-base leading-relaxed">
                      {blog.content ? (
                        <div
                          className="break-words space-y-4"
                          dangerouslySetInnerHTML={{
                            __html: blog.content.replace(/<p>/g, '<p class="mb-4 last:mb-0">')
                          }}
                        />
                      ) : (
                        <p className="text-gray-400 italic">No content available for this post.</p>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Suggestions Section */}
            <div className="mt-12 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">More Articles</h2>
              <Blogs limit={3} />
            </div>

          </div>
        </main>
        <Footer className="mt-auto" />
      </Background>
    </div>
  );
};

export default BlogDetails;