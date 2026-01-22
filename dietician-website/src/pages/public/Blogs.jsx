import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, deleteBlog } from '../../firebase/blogService.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
import { BlogCardSkeleton } from '../../components/SkeletonLoader';
import ImageWithLoader from '../../components/ImageWithLoader';

const Blogs = ({ limit }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Check if user is authenticated (admin)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await getBlogs();
        setBlogs(blogsData);
      } catch (err) {
        setError('Failed to load blogs. Please try again later.');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId, blogTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(blogId);
    try {
      await deleteBlog(blogId);
      toast.success('Blog post deleted successfully');
      // Remove the blog from the list
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    } catch (err) {
      console.error('Error deleting blog:', err);
      toast.error('Failed to delete blog post. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    const skeletonCount = limit || 6;
    return (
      <div className={`container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!limit ? 'pt-26 pb-8' : 'py-8'}`}>
        {!limit && (
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="h-10 w-48 bg-gray-300 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-96 bg-gray-300 rounded mx-auto animate-pulse"></div>
          </div>
        )}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${!limit ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8`}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  const content = (
    <div className={`container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!limit ? 'pt-26 pb-8' : 'py-8'}`}>
      {!limit && (
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className='inline-block'>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Our <span className='text-[var(--color-green)]'>Blog</span>
            </h2>

            <div className="h-1 w-24 bg-black rounded-lg ml-auto mt-2 mb-6"></div>
          </div>


          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-500">
            Read our latest blog posts for insights and inspiration on your health and wellness journey
          </p>
        </div>
      )}
      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blog posts available yet. Check back soon!</p>
          {!limit && (
            <Link
              to="/blogs"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[var(--color-green)] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              View All Blogs
            </Link>
          )}
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 ${!limit ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8`}>
          {blogs.slice(0, limit || blogs.length).map((blog) => (
            <div key={blog.id} className="bg-white shadow-md overflow-hidden hover:shadow-sm transition-shadow duration-300 relative">
              {/* Admin Actions - Edit & Delete Icons */}
              {isAdmin && (
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                  <Link
                    to={`/admin/posts/edit/${blog.id}`}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-[var(--color-green)] hover:text-white transition-all duration-200 group"
                    title="Edit blog post"
                  >
                    <FaEdit className="w-4 h-4 text-gray-700 group-hover:text-white" />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id, blog.title)}
                    disabled={deletingId === blog.id}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete blog post"
                  >
                    {deletingId === blog.id ? (
                      <svg className="animate-spin w-4 h-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <FaTrash className="w-4 h-4 text-gray-700 group-hover:text-white" />
                    )}
                  </button>
                </div>
              )}
              {blog.imageUrl && (
                <div className="w-full h-48 overflow-hidden">
                  <ImageWithLoader
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-blue-600">
                    {blog.author || 'Admin'}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                  {blog.excerpt || (blog.content ? blog.content.substring(0, 150) + (blog.content.length > 150 ? '...' : '') : '')}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (limit) {
    return content;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Background>
        <Navbar />
        <main className="flex-grow mb-16">
          {content}
        </main>
        <Footer />
      </Background>
    </div>
  );
};

export default Blogs;
