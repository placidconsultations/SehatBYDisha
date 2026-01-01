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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-4xl w-full mx-4 bg-white p-6 rounded-lg shadow-md">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error || 'Blog post not found'}</span>
            <Link to="/blogs" className="mt-2 inline-flex items-center text-[var(--color-green)] hover:underline">
              <FaArrowLeft className="mr-1" /> Back to all posts
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              to="/blogs"
              className="inline-flex items-center text-[var(--color-green)] hover:text-[var(--color-darkGreen)] mb-6 mt-4 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to all posts
            </Link>
            <div className="bg-white shadow-sm overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Image Section - Left - Sticky */}
                {blog.imageUrl && (
                  <div className="lg:w-1/2 lg:sticky lg:top-16 h-[400px] lg:h-[calc(100vh-8rem)] overflow-hidden">
                    <ImageWithLoader
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content Section - Right - Scrollable */}
                <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 max-h-[calc(100vh-12rem)]">
                  <div className="space-y-2 mb-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                      {blog.title}
                    </h1>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 pt-2">
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-[var(--color-green)]" />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center">
                        <FaUser className="mr-2 text-[var(--color-green)]" />
                        {blog.author || 'Admin'}
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-lg overflow-y-auto max-h-[calc(100vh-20rem)] max-w-none text-gray-600">
                    {blog.content ? (
                      <div
                        className="break-words"
                        dangerouslySetInnerHTML={{
                          __html: blog.content.replace(/<p>/g, '<p class="mb-4 last:mb-0">')
                        }}
                      />
                    ) : (
                      <p className="text-gray-500">No content available for this post.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">More Articles</h2>
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
