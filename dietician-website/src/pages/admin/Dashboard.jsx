import React, { useState, useEffect } from 'react';
import {
  FaBlog,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaCalendarAlt,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaFileAlt,
  FaChartBar,
  FaQuoteRight,
  FaStar,
  FaUser,
  FaShoppingCart,
  FaCogs,
  FaStethoscope
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getBlogs, deleteBlog } from '../../firebase/blogService';
import { getTestimonials, deleteTestimonial, getTransformations, deleteTransformation } from '../../firebase/testimonialService';
import { toast } from 'react-toastify';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import ImageWithLoader from '../../components/ImageWithLoader';
import { deletePlan, getPlans, getServices } from '../../firebase/planServices';

const Dashboard = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [transformations, setTransformations] = useState([]);
  const [plans, setPlans] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    recentBlogs: 0,
    thisMonth: 0,
    lastMonth: 0,
    totalTestimonials: 0,
    recentTestimonials: 0,
    totalTransformations: 0,
    recentTransformations: 0,
    recentOrders: 0,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [blogsData, testimonialsData, transformationsData, plansData, servicesData] = await Promise.all([
          getBlogs(),
          getTestimonials(),
          getTransformations(),
          getPlans(),
          getServices()
        ]);

        setBlogs(blogsData);
        setTestimonials(testimonialsData);
        setTransformations(transformationsData);
        setPlans(plansData);
        setServices(servicesData);

        // Calculate statistics
        const now = new Date();
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

        // Blog stats
        const thisMonthBlogs = blogsData.filter(blog => {
          const blogDate = new Date(blog.createdAt);
          return blogDate >= thisMonth;
        });

        const lastMonthBlogs = blogsData.filter(blog => {
          const blogDate = new Date(blog.createdAt);
          return blogDate >= lastMonth && blogDate <= lastMonthEnd;
        });

        const recentBlogs = blogsData.filter(blog => {
          const blogDate = new Date(blog.createdAt);
          const daysDiff = (now - blogDate) / (1000 * 60 * 60 * 24);
          return daysDiff <= 7;
        });

        // Testimonial stats
        const recentTestimonials = testimonialsData.filter(item => {
          const itemDate = new Date(item.createdAt);
          const daysDiff = (now - itemDate) / (1000 * 60 * 60 * 24);
          return daysDiff <= 7;
        });

        // Plan stats
        const recentPlans = plansData.filter(item => {
          const itemDate = new Date(item.createdAt);
          const daysDiff = (now - itemDate) / (1000 * 60 * 60 * 24);
          return daysDiff <= 7;
        });

        // Transformation stats
        const recentTransformations = transformationsData.filter(item => {
          const itemDate = new Date(item.createdAt);
          const daysDiff = (now - itemDate) / (1000 * 60 * 60 * 24);
          return daysDiff <= 7;
        });

        setStats({
          totalBlogs: blogsData.length,
          recentBlogs: recentBlogs.length,
          thisMonth: thisMonthBlogs.length,
          lastMonth: lastMonthBlogs.length,
          totalTestimonials: testimonialsData.length,
          recentTestimonials: recentTestimonials.length,
          totalTransformations: transformationsData.length,
          recentTransformations: recentTransformations.length,
          totalPlans: plansData.length,
          recentPlans: recentPlans.length,
          totalServices: servicesData.length
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const getMonthChange = () => {
    if (stats.lastMonth === 0) return { value: stats.thisMonth > 0 ? '100%' : '0%', type: 'increase' };
    const change = ((stats.thisMonth - stats.lastMonth) / stats.lastMonth) * 100;
    return {
      value: `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`,
      type: change >= 0 ? 'increase' : 'decrease'
    };
  };

  const monthChange = getMonthChange();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDelete = async (id, title, type) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      if (type === 'blog') {
        await deleteBlog(id);
        setBlogs(blogs.filter(item => item.id !== id));
        toast.success('Blog post deleted successfully');
      } else if (type === 'testimonial') {
        await deleteTestimonial(id);
        setTestimonials(testimonials.filter(item => item.id !== id));
        toast.success('Testimonial deleted successfully');
      } else if (type === 'transformation') {
        await deleteTransformation(id);
        setTransformations(transformations.filter(item => item.id !== id));
        toast.success('Transformation deleted successfully');
      } else if (type === 'plan') {
        await deletePlan(id);
        setPlans(plans.filter(item => item.id !== id));
        toast.success('Plan deleted successfully');
      }

      // Recalculate stats
      const now = new Date();
      const updatedBlogs = type === 'blog' ? blogs.filter(item => item.id !== id) : blogs;
      const updatedTestimonials = type === 'testimonial' ? testimonials.filter(item => item.id !== id) : testimonials;
      const updatedTransformations = type === 'transformation' ? transformations.filter(item => item.id !== id) : transformations;
      const updatedPlans = type === 'plan' ? plans.filter(item => item.id !== id) : plans;

      const recentBlogs = updatedBlogs.filter(blog => {
        const blogDate = new Date(blog.createdAt);
        const daysDiff = (now - blogDate) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      });

      const recentTestimonials = updatedTestimonials.filter(item => {
        const itemDate = new Date(item.createdAt);
        const daysDiff = (now - itemDate) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      });

      const recentTransformations = updatedTransformations.filter(item => {
        const itemDate = new Date(item.createdAt);
        const daysDiff = (now - itemDate) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      });

      const recentPlans = updatedPlans.filter(item => {
        const itemDate = new Date(item.createdAt);
        const daysDiff = (now - itemDate) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      });

      setStats(prev => ({
        ...prev,
        totalBlogs: updatedBlogs.length,
        recentBlogs: recentBlogs.length,
        totalTestimonials: updatedTestimonials.length,
        recentTestimonials: recentTestimonials.length,
        totalTransformations: updatedTransformations.length,
        recentTransformations: recentTransformations.length,
        totalPlans: updatedPlans.length,
        recentPlans: recentPlans.length
      }));
    } catch (err) {
      console.error('Error deleting:', err);
      toast.error(`Failed to delete ${type}. Please try again.`);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <Background>
        <Navbar />
        <div className="min-h-screen bg-transparent pt-24">
          <Loader fullScreen text="Loading dashboard..." />
        </div>
      </Background>
    );
  }

  const recentBlogs = blogs.slice(0, 5);
  const recentTestimonialsData = testimonials.slice(0, 3);
  const recentTransformationsData = transformations.slice(0, 3);
  const totalContent = stats.totalBlogs + stats.totalTestimonials + stats.totalTransformations;

  return (
    <Background>
      <Navbar />
      <div className="min-h-screen bg-transparent pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[var(--color-darkGray)] mb-2">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Welcome back! Here's what's happening with your content.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-8">
            {/* Total Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[var(--color-green)] hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Content</p>
                  <p className=" text-3xl font-bold text-[var(--color-darkGray)]">{totalContent}</p>
                  <p className="text-xs text-gray-500 mt-1">All items</p>
                </div>
                <div className="bg-[var(--color-green)]/10 p-4 rounded-full">
                  <FaFileAlt className=" w-8 h-8 text-[var(--color-green)]" />
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Blog Posts</p>
                  <p className="text-3xl font-bold text-[var(--color-darkGray)]">{stats.totalBlogs}</p>
                  <p className="text-xs text-gray-500 mt-1">{stats.recentBlogs} this week</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaBlog className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Testimonials</p>
                  <p className="text-3xl font-bold text-[var(--color-darkGray)]">{stats.totalTestimonials}</p>
                  <p className="text-xs text-gray-500 mt-1">{stats.recentTestimonials} this week</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-full">
                  <FaQuoteRight className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Transformations */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Transformations</p>
                  <p className="text-3xl font-bold text-[var(--color-darkGray)]">{stats.totalTransformations}</p>
                  <p className="text-xs text-gray-500 mt-1">{stats.recentTransformations} this week</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-full">
                  <FaChartBar className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Plans */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Plans</p>
                  <p className="text-3xl font-bold text-[var(--color-darkGray)]">{stats.totalPlans || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">{stats.recentPlans || 0} this week</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-full">
                  <FaShoppingCart className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Plans */}
            

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div>
              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-[var(--color-darkGray)] mb-4 flex items-center">
                    <FaFileAlt className="mr-2 text-[var(--color-green)]" />
                    Quick Actions
                  </h2>
                  <div className="space-y-3">
                    {/* Blog Post - Primary Action */}
                    <Link
                      to="/admin/posts/new"
                      className="flex items-center justify-between w-full px-4 py-3 bg-[var(--color-green)] text-white rounded-lg hover:bg-white hover:text-[var(--color-green)] transition-all duration-200 shadow-md hover:shadow-lg group border-2 border-transparent hover:border-[var(--color-green)]"
                    >
                      <div className="flex items-center">
                        <FaPlus className="mr-2" />
                        <span className="text-sm sm:text-base font-medium">Add New Blog</span>
                      </div>
                      <FaArrowUp className="transform rotate-45 group-hover:rotate-0 transition-transform" />
                    </Link>

                    {/* Testimonials Management */}
                    <Link
                      to="/admin/testimonials"
                      className="flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-gray-100 text-gray-700 rounded-lg hover:border-purple-500 hover:text-purple-600 transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <FaQuoteRight className="mr-2 text-purple-500" />
                        <span className="text-sm sm:text-base font-medium">Manage Testimonials</span>
                      </div>
                      <FaArrowUp className="transform rotate-45" />
                    </Link>

                    {/* Transformations Management */}
                    <Link
                      to="/admin/testimonials"
                      className="flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-gray-100 text-gray-700 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <FaChartBar className="mr-2 text-orange-500" />
                        <span className="text-sm sm:text-base font-medium">Manage Transformations</span>
                      </div>
                      <FaArrowUp className="transform rotate-45" />
                    </Link>

                    {/* Mini Stats Footer */}
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-3">Content Overview</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-blue-100 p-2 rounded text-center">
                          <span className="block text-xs text-gray-500">Blogs</span>
                          <span className="font-bold text-blue-600">{stats.totalBlogs}</span>
                        </div>
                        <div className="bg-purple-100 p-2 rounded text-center">
                          <span className="block text-xs text-gray-500">Reviews</span>
                          <span className="font-bold text-purple-600">{stats.totalTestimonials}</span>
                        </div>
                        <div className="bg-orange-100 p-2 rounded text-center">
                          <span className="block text-xs text-gray-500">Stories</span>
                          <span className="font-bold text-orange-600">{stats.totalTransformations}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manage Plans & Services */}
              <div className="lg:col-span-1 mt-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--color-darkGray)] mb-4 flex items-center">
                    <span className="mr-2">
                      <FaShoppingCart className="text-yellow-600" />
                    </span>
                    Manage Plans &amp; Services
                  </h2>
                  <div className="space-y-4">
                    {/* Manage Plans */}

                    <Link
                      to="/admin/plans"
                      className="flex items-center justify-between w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-white hover:text-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg group border-2 border-transparent hover:border-yellow-600"
                    >
                      <div className="flex items-center">
                        <FaPlus className="mr-2" />
                        <span className="text-sm sm:text-base font-medium">Plans</span>
                      </div>
                      <FaArrowUp className="transform rotate-45 group-hover:rotate-0 transition-transform" />
                    </Link>

                    {/* Manage Services */}
                    <Link
                      to="/admin/plans"
                      className="flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-gray-100 text-gray-700 rounded-lg hover:border-pink-500 hover:text-pink-600 transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <FaStethoscope className="mr-2 text-pink-600" />
                        <span className="text-sm sm:text-base font-medium">Services</span>
                      </div>
                      <FaArrowUp className="transform rotate-45 " />
                    </Link>
                  </div>
                  {/* Stats for plans/services, if available */}
                  <div className="pt-4 border-t border-gray-200 mt-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-3">Plans &amp; Services Overview</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-yellow-100 p-2 rounded text-center">
                        <span className="block text-xs text-gray-500">Total Plans</span>
                        <span className="font-bold text-yellow-600">{plans?.length ?? '--'}</span>
                      </div>
                      <div className="bg-pink-100 p-2 rounded text-center">
                        <span className="block text-xs text-gray-500">Total Services</span>
                        <span className="font-bold text-pink-600">{services?.length ?? '--'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plans Details */}

              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-md sm:text-lg md:text-2xl font-bold text-[var(--color-darkGray)] flex items-center">
                    <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-2 text-yellow-600" />
                    Plans
                  </h2>
                  <Link
                    to="/admin/plans"
                    className="text-xs sm:text-sm text-yellow-600 hover:underline font-medium"
                  >
                    View All
                  </Link>
                </div>

                {plans?.length === 0 ? (
                  <div className="text-center py-8">
                    <FaBlog className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm mb-3">No plan added yet</p>
                    <Link
                      to="/admin/plans"
                      className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Create First plan
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => navigate('/admin/plans')}
                        className="block p-3 border cursor-pointer border-gray-200 rounded-lg hover:border-yellow-500 hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex gap-3">
                          {plan.icon && (
                            <div className="overflow-hidden bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center">
                                {plan.icon}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h3 className="text-base font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-1">
                                {plan.title}
                              </h3>
                              <div className="ml-2 flex items-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation();
                                    handleDelete(plan.id, plan.title, 'plan');
                                  }}
                                  disabled={deletingId === plan.id}
                                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all disabled:opacity-50"
                                  title="Delete"
                                >
                                  {deletingId === plan.id ? (
                                    <svg className="animate-spin w-3.5 h-3.5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                  ) : (
                                    <FaTrash className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                              {plan.description || (plan.content ? plan.content.replace(/<[^>]*>/g, '').substring(0, 80) + '...' : '')}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                              <span className="flex items-center">
                                <FaCalendarAlt className="mr-1" />
                                {formatDate(plan.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>


            </div>



            {/* Recent Content - Tabbed View */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Blog Posts */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-md sm:text-lg md:text-2xl font-bold text-[var(--color-darkGray)] flex items-center">
                    <FaBlog className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-2 text-blue-600" />
                    Recent Blog Posts
                  </h2>
                  <Link
                    to="/blogs"
                    className="text-xs sm:text-sm text-blue-600 hover:underline font-medium"
                  >
                    View All
                  </Link>
                </div>

                {recentBlogs.length === 0 ? (
                  <div className="text-center py-8">
                    <FaBlog className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm mb-3">No blog posts yet</p>
                    <Link
                      to="/admin/posts/new"
                      className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Create First Post
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentBlogs.map((blog) => (
                      <div
                        key={blog.id}
                        onClick={() => navigate(`/blogs/${blog.id}`)}
                        className="block p-3 border cursor-pointer border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex gap-3">
                          {blog.imageUrl && (
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                              <ImageWithLoader
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                {blog.title}
                              </h3>
                              <div className="ml-2 flex items-center gap-1">
                                <Link
                                  to={`/admin/posts/edit/${blog.id}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
                                  title="Edit"
                                >
                                  <FaEdit className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDelete(blog.id, blog.title, 'blog');
                                  }}
                                  disabled={deletingId === blog.id}
                                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all disabled:opacity-50"
                                  title="Delete"
                                >
                                  {deletingId === blog.id ? (
                                    <svg className="animate-spin w-3.5 h-3.5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                  ) : (
                                    <FaTrash className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                              {blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 80) + '...' : '')}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                              <span className="flex items-center">
                                <FaCalendarAlt className="mr-1" />
                                {formatDate(blog.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Testimonials */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-md sm:text-lg md:text-2xl font-bold text-[var(--color-darkGray)] flex items-center">
                    <FaQuoteRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-2 text-purple-600" />
                    Recent Testimonials
                  </h2>
                  <Link
                    to="/admin/testimonials"
                    className="text-xs sm:text-sm text-purple-600 hover:underline font-medium"
                  >
                    View All
                  </Link>
                </div>

                {recentTestimonialsData.length === 0 ? (
                  <div className="text-center py-8">
                    <FaQuoteRight className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm mb-3">No testimonials yet</p>
                    <Link
                      to="/admin/testimonials"
                      className="inline-flex items-center px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Add First Testimonial
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentTestimonialsData.map((testimonial) => (
                      <div
                        key={testimonial.id}
                        onClick={() => navigate(`/admin/testimonials`)}
                        className="block p-3 border cursor-pointer border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex gap-3">
                          {testimonial.image && (
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                              <ImageWithLoader
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                                {testimonial.name}
                              </h3>
                              <div className="ml-2 flex items-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDelete(testimonial.id, testimonial.name, 'testimonial');
                                  }}
                                  disabled={deletingId === testimonial.id}
                                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all disabled:opacity-50"
                                  title="Delete"
                                >
                                  {deletingId === testimonial.id ? (
                                    <svg className="animate-spin w-3.5 h-3.5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                  ) : (
                                    <FaTrash className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                              {testimonial.content}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                              <span className="flex items-center">
                                <FaCalendarAlt className="mr-1" />
                                {formatDate(testimonial.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Transformations */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm sm:text-lg md:text-2xl font-bold text-[var(--color-darkGray)] flex items-center">
                    <FaChartBar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-2 text-orange-600" />
                    Recent Transformations
                  </h2>
                  <Link
                    to="/admin/transformations"
                    className="text-xs sm:text-sm text-orange-600 hover:underline font-medium"
                  >
                    View All
                  </Link>
                </div>

                {recentTransformationsData.length === 0 ? (
                  <div className="text-center py-8">
                    <FaChartBar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm mb-3">No transformations yet</p>
                    <Link
                      to="/admin/transformations"
                      className="inline-flex items-center px-3 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Add First Transformation
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentTransformationsData.map((transformation) => (
                      <div
                        key={transformation.id}
                        onClick={() => navigate(`/admin/transformations`)}
                        className="block p-3 border cursor-pointer border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex gap-3">
                          {transformation.image && (
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                              <ImageWithLoader
                                src={transformation.image}
                                alt={transformation.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h3 className="text-base font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                                {transformation.name}
                              </h3>

                              <div className="ml-2 flex items-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDelete(transformation.id, transformation.name, 'transformation');
                                  }}
                                  disabled={deletingId === transformation.id}
                                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all disabled:opacity-50"
                                  title="Delete"
                                >
                                  {deletingId === transformation.id ? (
                                    <svg className="animate-spin w-3.5 h-3.5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                  ) : (
                                    <FaTrash className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                              Lost {transformation.lostWeight} kg in {transformation.duration}.
                            </p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                              <span className="flex items-center">
                                <FaCalendarAlt className="mr-1" />
                                {formatDate(transformation.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Dashboard;