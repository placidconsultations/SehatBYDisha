import React, { useState, useEffect } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaStar,
  FaDollarSign,
  FaCalendarAlt,
  FaListUl,
  FaTags,
  FaSort,
  FaRupeeSign
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import { getPlans, addPlan, updatePlan, deletePlan, getServices, addService, updateService, deleteService } from '../../firebase/planServices';

const ManagePlans = () => {
  const [activeTab, setActiveTab] = useState('plans'); // 'plans' or 'services'
  const [plans, setPlans] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    // Plan fields
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    duration: '',
    category: 'personalized',
    icon: '🥗',
    features: [''],
    popular: false,
    recommended: '',
    sortOrder: 0,
    // Service fields
    serviceTitle: '',
    serviceDescription: '',
    serviceIcon: '🩺',
    serviceSortOrder: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [plansData, servicesData] = await Promise.all([
        getPlans(),
        getServices()
      ]);
      
      // Sort plans by sortOrder first, then by createdAt
      const sortedPlans = plansData.sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) {
          return a.sortOrder - b.sortOrder;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      // Sort services by sortOrder first, then by createdAt
      const sortedServices = servicesData.sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) {
          return a.sortOrder - b.sortOrder;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setPlans(sortedPlans);
      setServices(sortedServices);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Failed to load plans and services');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? Number(value) : value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ 
      ...prev, 
      features: [...prev.features, ''] 
    }));
  };

  const removeFeature = (index) => {
    if (formData.features.length === 1) return;
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      duration: '',
      category: 'personalized',
      icon: '🥗',
      features: [''],
      popular: false,
      recommended: '',
      sortOrder: 0,
      serviceTitle: '',
      serviceDescription: '',
      serviceIcon: '🩺',
      serviceSortOrder: 0
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    if (activeTab === 'plans') {
      setFormData({
        title: item.title || '',
        description: item.description || '',
        price: item.price || '',
        originalPrice: item.originalPrice || '',
        duration: item.duration || '',
        category: item.category || 'personalized',
        icon: item.icon || '🥗',
        features: item.features || [],
        popular: item.popular || false,
        recommended: item.recommended || '',
        sortOrder: item.sortOrder || 0,
        serviceTitle: '',
        serviceDescription: '',
        serviceIcon: '🩺',
        serviceSortOrder: 0
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        duration: '',
        category: 'personalized',
        icon: '🥗',
        features: [],
        popular: false,
        recommended: '',
        sortOrder: 0,
        serviceTitle: item.title || '',
        serviceDescription: item.description || '',
        serviceIcon: item.icon || '🩺',
        serviceSortOrder: item.sortOrder || 0
      });
    }
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (activeTab === 'plans') {
        const planData = {
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
          duration: formData.duration,
          category: formData.category,
          icon: formData.icon,
          features: formData.features.filter(f => f.trim() !== ''),
          popular: formData.popular,
          recommended: formData.recommended,
          sortOrder: formData.sortOrder
        };

        if (editingId) {
          await updatePlan(editingId, planData);
          toast.success('Plan updated successfully');
        } else {
          await addPlan(planData);
          toast.success('Plan added successfully');
        }
      } else {
        const serviceData = {
          title: formData.serviceTitle,
          description: formData.serviceDescription,
          icon: formData.serviceIcon,
          sortOrder: formData.serviceSortOrder
        };

        if (editingId) {
          await updateService(editingId, serviceData);
          toast.success('Service updated successfully');
        } else {
          await addService(serviceData);
          toast.success('Service added successfully');
        }
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.error('Error saving:', err);
      toast.error(`Failed to ${editingId ? 'update' : 'add'} ${activeTab === 'plans' ? 'plan' : 'service'}`);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      if (activeTab === 'plans') {
        await deletePlan(id);
        toast.success('Plan deleted successfully');
      } else {
        await deleteService(id);
        toast.success('Service deleted successfully');
      }
      fetchData();
    } catch (err) {
      console.error('Error deleting:', err);
      toast.error('Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const currentItems = activeTab === 'plans' ? plans : services;

  const planIcons = ['🥗', '💚', '⚡', '🎯', '🌟'];
  const serviceIcons = ['🩺', '🏥', '💊', '🧠', '❤️', '🦴', '🌿', '⚕️'];
  const categories = ['personalized', 'condition', 'quick'];

  if (loading) {
    return (
      <Background>
        <Navbar />
        <div className="min-h-screen bg-transparent pt-24 flex items-center justify-center">
          <Loader fullScreen text="Loading plans..." />
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <Navbar />
      <div className="min-h-screen bg-transparent pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-[var(--color-darkGray)] mb-2">
              Manage Plans & Services
            </h1>
            <p className="text-xs sm:text-md md:text-lg text-gray-600">Manage your diet plans and nutrition services</p>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-16 sm:space-x-8">
              <button
                onClick={() => {
                  setActiveTab('plans');
                  resetForm();
                }}
                className={`py-4
                   px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors ${
                  activeTab === 'plans'
                    ? 'border-[var(--color-green)] text-[var(--color-green)]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Diet Plans ({plans.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('services');
                  resetForm();
                }}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors ${
                  activeTab === 'services'
                    ? 'border-[var(--color-green)] text-[var(--color-green)]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Services ({services.length})
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
              Add {activeTab === 'plans' ? 'Plan' : 'Service'}
            </button>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-black/20 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingId ? 'Edit' : 'Add New'} {activeTab === 'plans' ? 'Plan' : 'Service'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600 text-3xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Plan Form Fields */}
                  {activeTab === 'plans' && (
                    <>
                      {/* Title */}
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Plan Title *
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                          placeholder="e.g., 1-Month Personalised Plan"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                          placeholder="Describe the plan..."
                        />
                      </div>

                      {/* Price Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Price (₹) *
                          </label>
                          <div className="relative">
                            <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="number"
                              id="price"
                              name="price"
                              value={formData.price}
                              onChange={handleInputChange}
                              required
                              min="0"
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                              placeholder="3500"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                            Original Price (₹)
                          </label>
                          <div className="relative">
                            <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="number"
                              id="originalPrice"
                              name="originalPrice"
                              value={formData.originalPrice}
                              onChange={handleInputChange}
                              min="0"
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                              placeholder="5000"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Duration and Category */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                              placeholder="e.g., 1 Month"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category *
                          </label>
                          <div className="relative">
                            <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                              id="category"
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                            >
                              {categories.map(cat => (
                                <option key={cat} value={cat}>
                                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Icon Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Icon
                        </label>
                        <div className="flex gap-2 flex-wrap">
                          {planIcons.map(icon => (
                            <button
                              key={icon}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, icon }))}
                              className={`w-10 h-10 rounded-lg border-2 transition-colors text-xl ${
                                formData.icon === icon
                                  ? 'border-[var(--color-green)] bg-green-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {icon}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Features
                        </label>
                        <div className="space-y-2">
                          {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                                placeholder="Enter feature..."
                              />
                              {formData.features.length > 1 && <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <FaTrash />
                              </button>}
                              
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={addFeature}
                            className="px-4 py-2 text-[var(--color-green)] hover:bg-green-50 rounded-lg transition-colors border border-[var(--color-green)]"
                          >
                            <FaPlus className="inline mr-2" />
                            Add Feature
                          </button>
                        </div>
                      </div>

                      {/* Popular and Recommended */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="popular"
                            name="popular"
                            checked={formData.popular}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <label htmlFor="popular" className="text-sm font-medium text-gray-700">
                            Popular Plan
                          </label>
                        </div>

                        <div>
                          <label htmlFor="recommended" className="block text-sm font-medium text-gray-700 mb-1">
                            Recommended For
                          </label>
                          <input
                            type="text"
                            id="recommended"
                            name="recommended"
                            value={formData.recommended}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                            placeholder="e.g., PCOD, thyroid, gut health"
                          />
                        </div>
                      </div>

                      {/* Sort Order */}
                      <div>
                        <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-1">
                          Sort Order
                        </label>
                        <div className="relative">
                          <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            id="sortOrder"
                            name="sortOrder"
                            value={formData.sortOrder}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                            placeholder="0 (shows first)"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Service Form Fields */}
                  {activeTab === 'services' && (
                    <>
                      {/* Service Title */}
                      <div>
                        <label htmlFor="serviceTitle" className="block text-sm font-medium text-gray-700 mb-1">
                          Service Title *
                        </label>
                        <input
                          type="text"
                          id="serviceTitle"
                          name="serviceTitle"
                          value={formData.serviceTitle}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                          placeholder="e.g., PCOD/PCOS Nutrition Support"
                        />
                      </div>

                      {/* Service Description */}
                      <div>
                        <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          id="serviceDescription"
                          name="serviceDescription"
                          value={formData.serviceDescription}
                          onChange={handleInputChange}
                          required
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                          placeholder="Describe the service..."
                        />
                      </div>

                      {/* Service Icon */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Icon
                        </label>
                        <div className="flex gap-2 flex-wrap">
                          {serviceIcons.map(icon => (
                            <button
                              key={icon}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, serviceIcon: icon }))}
                              className={`w-10 h-10 rounded-lg border-2 transition-colors text-xl ${
                                formData.serviceIcon === icon
                                  ? 'border-[var(--color-green)] bg-green-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {icon}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Service Sort Order */}
                      <div>
                        <label htmlFor="serviceSortOrder" className="block text-sm font-medium text-gray-700 mb-1">
                          Sort Order
                        </label>
                        <div className="relative">
                          <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            id="serviceSortOrder"
                            name="serviceSortOrder"
                            value={formData.serviceSortOrder}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent"
                            placeholder="0 (shows first)"
                          />
                        </div>
                      </div>
                    </>
                  )}

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
                      className="px-4 py-2 bg-[var(--color-green)] text-white rounded-lg hover:bg-white hover:text-[var(--color-green)] transition-all duration-200 shadow-md hover:shadow-lg group border-2 border-transparent hover:border-[var(--color-green)]"
                    >
                      {editingId ? 'Update' : 'Add'} {activeTab === 'plans' ? 'Plan' : 'Service'}
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
                  className="inline-flex items-center px-4 py-2 bg-[var(--color-green)] text-white rounded-lg hover:bg-white hover:text-[var(--color-green)] transition-all duration-200 shadow-md hover:shadow-lg group border-2 border-transparent hover:border-[var(--color-green)]"
                >
                  <FaPlus className="mr-2" />
                  Add Your First {activeTab === 'plans' ? 'Plan' : 'Service'}
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-green)]">
                {currentItems.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 hidden sm:block w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-2xl sm:text-3xl">
                        {activeTab === 'plans' ? (item.icon || '🥗') : (item.icon || '🩺')}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-gray-900">{item.title}</h3>
                            {activeTab === 'plans' ? (
                              <>
                                <p className="text-[10px] sm:text-sm text-gray-600 mt-1">{item.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-[10px] xs:text-sm sm:text-sm text-gray-600">
                                  <span className="flex items-center">
                                    <FaRupeeSign className="mr-1" />
                                    {item.price}
                                    {item.originalPrice && (
                                      <span className="ml-1 line-through text-gray-400">
                                        {item.originalPrice}
                                      </span>
                                    )}
                                  </span>
                                  <span className="flex items-center whitespace-nowrap">
                                    <FaCalendarAlt className="mr-1" />
                                    {item.duration}
                                  </span>
                                  <span className="flex items-center">
                                    <FaTags className="mr-1" />
                                    {item.category}
                                  </span>
                                </div>
                                {item.popular && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-yellow-100 text-yellow-800 mt-2">
                                    <FaStar className="mr-1" />
                                    Popular
                                  </span>
                                )}
                                {item.recommended && (
                                  <p className="text-[11px] text-gray-500 mt-1">
                                    Recommended: {item.recommended}
                                  </p>
                                )}
                                {item.features && item.features.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-500 mb-1">Features:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {item.features.slice(0, 3).map((feature, idx) => (
                                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-[10px] bg-gray-100 text-gray-700">
                                          <FaListUl className="mr-1" />
                                          {feature}
                                        </span>
                                      ))}
                                      {item.features.length > 3 && (
                                        <span className="inline-flex items-center px-2 py-1 font-bold rounded text-[10px] bg-[var(--color-green)]/40 text-gray-700">
                                          +{item.features.length - 3} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.description}</p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1 sm:gap-2 ml-4">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1 text-gray-400 hover:text-[var(--color-green)] hover:bg-green-50 rounded cursor-pointer transition-all"
                              title="Edit"
                            >
                              <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id, item.title)}
                              disabled={deletingId === item.id}
                              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete"
                            >
                              {deletingId === item.id ? (
                                <svg className="animate-spin w-3 h-3 sm:w-4 sm:h-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
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
      </div>      </div>
    </Background>
  );
};


export default ManagePlans;
