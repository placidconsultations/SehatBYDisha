import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../firebase/blogService.js';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Blogs = ({ limit }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Our <span className='text-[var(--color-green)]'>Blog</span>
          </h2>
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
            <div key={blog.id} className="bg-white shadow-md overflow-hidden hover:shadow-sm transition-shadow duration-300">
              {blog.imageUrl && (
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title}  
                  className="w-full h-48 object-cover"
                />
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
