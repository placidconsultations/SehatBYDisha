import React, { useState, useEffect } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaStar,
  FaImage,
  FaUser,
  FaWeight,
  FaCalendarAlt
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import ImageWithLoader from '../../components/ImageWithLoader';
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTransformations,
  addTransformation,
  updateTransformation,
  deleteTransformation
} from '../../firebase/testimonialService';

const ManageTestimonials = () => {
  const [activeTab, setActiveTab] = useState('testimonials'); // 'testimonials' or 'transformations'
  const [testimonials, setTestimonials] = useState([]);
  const [transformations, setTransformations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    // Testimonial fields
    name: '',
    role: '',
    content: '',
    rating: 5,
    image: '',
    // Transformation fields
    lostWeight: '',
    duration: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [testimonialsData, transformationsData] = await Promise.all([
        getTestimonials(),
        getTransformations()
      ]);
      setTestimonials(testimonialsData);
      setTransformations(transformationsData);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Failed to load testimonials and transformations');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      content: '',
      rating: 5,
      image: '',
      lostWeight: '',
      duration: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name || '',
      role: item.role || '',
      content: item.content || '',
      rating: item.rating || 5,
      image: item.image || '',
      lostWeight: item.lostWeight || '',
      duration: item.duration || ''
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (activeTab === 'testimonials') {
        const testimonialData = {
          name: formData.name,
          role: formData.role,
          content: formData.content,
          rating: formData.rating,
          image: formData.image || null
        };

        if (editingId) {
          await updateTestimonial(editingId, testimonialData);
          toast.success('Testimonial updated successfully');
        } else {
          await addTestimonial(testimonialData);
          toast.success('Testimonial added successfully');
        }
      } else {
        const transformationData = {
          name: formData.name,
          image: formData.image,
          lostWeight: formData.lostWeight,
          duration: formData.duration
        };

        if (editingId) {
          await updateTransformation(editingId, transformationData);
          toast.success('Transformation updated successfully');
        } else {
          await addTransformation(transformationData);
          toast.success('Transformation added successfully');
        }
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.error('Error saving:', err);
      toast.error(`Failed to ${editingId ? 'update' : 'add'} ${activeTab === 'testimonials' ? 'testimonial' : 'transformation'}`);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      if (activeTab === 'testimonials') {
        await deleteTestimonial(id);
        toast.success('Testimonial deleted successfully');
      } else {
        await deleteTransformation(id);
        toast.success('Transformation deleted successfully');
      }
      fetchData();
    } catch (err) {
      console.error('Error deleting:', err);
      toast.error('Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <Background>
        <Navbar />
        <div className="min-h-screen bg-transparent pt-24">
          <Loader fullScreen text="Loading testimonials..." />
        </div>
      </Background>
    );
  }

  const currentItems = activeTab === 'testimonials' ? testimonials : transformations;

  return (
    <Background>
      <Navbar />
      <div className="min-h-screen bg-transparent pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className=" text-xl sm:text-3xl font-bold text-[var(--color-darkGray)] mb-2">
              Manage Testimonials & Transformations
            </h1>
            <p className="text-xs sm:text-lg text-gray-600">Add, edit, or delete client testimonials and success stories</p>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-16 sm:space-x-8">
              <button
                onClick={() => {
                  setActiveTab('testimonials');
                  resetForm();
                }}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors ${
                  activeTab === 'testimonials'
                    ? 'border-[var(--color-green)] text-[var(--color-green)]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Testimonials ({testimonials.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('transformations');
                  resetForm();
                }}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors ${
                  activeTab === 'transformations'
                    ? 'border-[var(--color-green)] text-[var(--color-green)]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Transformations ({transformations.length})
              </button>
            </div>
          </div>

          {/* Add Button */}
          <div className="mb-6">
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}

              className="inline-flex text-xs sm:text-sm items-center px-2 sm:px-4 py-1 sm:py-2 bg-[var(--color-green)] text-white rounded-lg hover:bg-white hover:text-[var(--color-green)] transition-all duration-200 shadow-md hover:shadow-lg group border-2 border-transparent hover:border-[var(--color-green)]"
            >
              <FaPlus className="mr-2" />
              Add {activeTab === 'testimonials' ? 'Testimonial' : 'Transformation'}
            </button>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingId ? 'Edit' : 'Add New'} {activeTab === 'testimonials' ? 'Testimonial' : 'Transformation'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Name - Common field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                        placeholder="Client name"
                      />
                    </div>
                  </div>

                  {/* Testimonial specific fields */}
                  {activeTab === 'testimonials' && (
                    <>
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                          Role/Title *
                        </label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                          placeholder="e.g., Fitness Enthusiast, Working Professional"
                        />
                      </div>

                      <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                          Testimonial Content *
                        </label>
                        <textarea
                          id="content"
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          required
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                          placeholder="What did the client say about your services?"
                        />
                      </div>

                      <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                          Rating *
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            id="rating"
                            name="rating"
                            min="1"
                            max="5"
                            value={formData.rating}
                            onChange={handleInputChange}
                            className="flex-1"
                          />
                          <div className="flex items-center gap-1">
                            {Array(5).fill(0).map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-5 h-5 ${i < formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                            <span className="ml-2 text-sm font-medium">{formData.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Transformation specific fields */}
                  {activeTab === 'transformations' && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="lostWeight" className="block text-sm font-medium text-gray-700 mb-1">
                            Weight Lost (kg) *
                          </label>
                          <div className="relative">
                            <FaWeight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="number"
                              id="lostWeight"
                              name="lostWeight"
                              value={formData.lostWeight}
                              onChange={handleInputChange}
                              required
                              min="0"
                              step="0.1"
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                              placeholder="e.g., 10"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                            Duration *
                          </label>
                          <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              id="duration"
                              name="duration"
                              value={formData.duration}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                              placeholder="e.g., 3 months"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Image URL - Common field */}
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <div className="relative">
                      <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    {formData.image && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                          <ImageWithLoader
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-red-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[var(--color-green)] text-white bg-[var(--color-green)] text-white rounded-lg hover:bg-white hover:text-[var(--color-green)] transition-all duration-200 shadow-md hover:shadow-lg group border-2 border-transparent hover:border-[var(--color-green)]"
                    >
                      {editingId ? 'Update' : 'Add'} {activeTab === 'testimonials' ? 'Testimonial' : 'Transformation'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="bg-white shadow-lg overflow-hidden">
            {currentItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No {activeTab} yet</p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="inline-flex items-center px-4 py-2 bg-[var(--color-green)] text-white bg-[var(--color-green)] text-white rounded-lg hover:bg-white hover:text-[var(--color-green)] transition-all duration-200 shadow-md hover:shadow-lg group border-2 border-transparent hover:border-[var(--color-green)]"
                >
                  <FaPlus className="mr-2" />
                  Add Your First {activeTab === 'testimonials' ? 'Testimonial' : 'Transformation'}
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-green)]">
                {currentItems.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-4">
                      {/* Image */}
                      {item.image && (
                        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden">
                          <ImageWithLoader
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm sm:text-lg font-semibold text-gray-900">{item.name}</h3>
                            {activeTab === 'testimonials' ? (
                              <>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.role}</p>
                                <p className="text-xs sm:text-sm text-gray-700 mt-2 line-clamp-2">{item.content}</p>
                                <div className="flex items-center gap-1 mt-2">
                                  {Array(5).fill(0).map((_, i) => (
                                    <FaStar
                                      key={i}
                                      className={`w-3 h-3 sm:w-4 sm:h-4 ${i < (item.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </>
                            ) : (
                              <div className="flex-col items-center gap-4 mt-2 text-xs sm:text-sm text-gray-600">
                                <span className="flex items-center mb-1">
                                  <FaWeight className="mr-1 flex" />
                                  Lost {item.lostWeight}kg
                                </span>
                                <span className="flex items-center">
                                  <FaCalendarAlt className="mr-1" />
                                  {item.duration}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1 sm:gap-2 ml-4">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1 text-gray-400 hover:text-[var(--color-green)] hover:bg-green-50 rounded transition-all"
                              title="Edit"
                            >
                              <FaEdit className="w-3 h- 3 sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id, item.name)}
                              disabled={deletingId === item.id}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete"
                            >
                              {deletingId === item.id ? (
                                <svg className="animate-spin w-4 h-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <FaTrash className="w-3 h- 3 sm:w-4 sm:h-4" />
                              )}
                            </button>
                          </div>
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
    </Background>
  );
};

export default ManageTestimonials;
