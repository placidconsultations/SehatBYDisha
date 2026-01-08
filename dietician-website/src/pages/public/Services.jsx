import React, { useState, useEffect } from 'react';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import PlansCard from '../../components/PlansCard';
import ServicesCard from '../../components/ServicesCard';
import { getPlans, getServices } from '../../firebase/planServices';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';
import { handleBuyPlan } from '../../utils/paymentHandler.js';

const Services = () => {
  const [plans, setPlans] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [purchasedPlanIds, setPurchasedPlanIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansData, servicesData] = await Promise.all([
          getPlans(),
          getServices()
        ]);
  
        const sortedPlans = plansData.sort((a, b) => {
          if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
  
        const sortedServices = servicesData.sort((a, b) => {
          if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
  
        setPlans(sortedPlans);
        setServices(sortedServices);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load services and plans');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  
    // -------------------------------
    // 🔥 AUTO-REMOVE EXPIRED PLANS
    // -------------------------------
  
    const getPlanDurationInDays = (durationString) => {
      if (!durationString) return 30;  // fallback
  
      const parts = durationString.split(" ");
      const value = parseInt(parts[0]);
      const unit = parts[1]?.toLowerCase();
  
      if (unit.includes("day")) return value;
      if (unit.includes("month")) return value * 30;
  
      return 30;
    };
  
    const storedData = localStorage.getItem('myPlans');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const now = new Date();
  
        // Clean & regenerate expiry if missing
        const cleanedPlans = parsedData
          .map(plan => {
            // If no expiry stored (older data), regenerate expiry
            if (!plan.expiresAt) {
              const purchasedAt = new Date(plan.purchasedAt);
              const durationDays = getPlanDurationInDays(plan.duration || "30 Days");
  
              const expiresAt = new Date(
                purchasedAt.getTime() + durationDays * 24 * 60 * 60 * 1000
              );
  
              return { ...plan, expiresAt: expiresAt.toISOString() };
            }
            return plan;
          })
          .filter(plan => new Date(plan.expiresAt) > now); // keep only non-expired plans
  
        // Update purchasedPlanIds
        const ids = cleanedPlans.map(item => item.planId);
        setPurchasedPlanIds(ids);
  
        // Save cleaned plans back to localStorage
        localStorage.setItem("myPlans", JSON.stringify(cleanedPlans));
      } catch (e) {
        console.error("Error reading plans from local storage", e);
      }
    }
  }, []);
  

  const categories = [
    { id: 'all', name: 'All Plans', icon: '🚀' },
    { id: 'personalized', name: 'Personalized Plans', icon: '🥗' },
    { id: 'condition', name: 'Condition-Specific', icon: '🩺' },
    { id: 'quick', name: 'Quick Plans', icon: '⚡' }
  ];

  const filteredPlans =
    selectedCategory === 'all'
      ? plans
      : plans.filter(plan => plan.category === selectedCategory);

  const searchedPlans = filteredPlans.filter(plan => {
    const q = searchQuery.toLowerCase();
    return (
      plan.title?.toLowerCase().includes(q) ||
      plan.description?.toLowerCase().includes(q) ||
      plan.category?.toLowerCase().includes(q) ||
      plan.features?.some(f => f.toLowerCase().includes(q)) ||
      plan.recommended?.toLowerCase().includes(q)
    );
  });

  const searchedServices = services.filter(service => {
    const q = searchQuery.toLowerCase();
    return (
      service.title?.toLowerCase().includes(q) ||
      service.description?.toLowerCase().includes(q)
    );
  });

  // ✅ visible data (FIXED LOGIC)
  const visiblePlans = searchedPlans;
  const visibleServices =
    selectedCategory === 'all' || selectedCategory === 'condition'
      ? searchedServices
      : [];

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setShowPlanDetails(true);
  };

  const closePlanDetails = () => {
    setSelectedPlan(null);
    setShowPlanDetails(false);
  };

  // check if plan is owned
  const isPlanPurchased = (planId) => purchasedPlanIds.includes(planId);

  // Handle successful payment
  const onPaymentSuccess = (planId) => {
    setPurchasedPlanIds(prev => [...prev, planId]);
    toast.success('Plan purchased successfully!');
    closePlanDetails();
  };

  if (loading) {
    return (
      <Background>
        <Navbar />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <Loader fullScreen text="Loading services..." />
        </div>
        <Footer />
      </Background>
    );
  }

  return (
    <Background>
      <Navbar />

      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HERO */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              My Diet & <span className="text-[var(--color-green)]">Wellness Programs</span>
            </h1>
            <div className="w-36 h-1 bg-black mx-auto mb-2"></div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Transform your health with personalized nutrition plans designed for your unique body and lifestyle
            </p>
          </div>

          {/* CATEGORY FILTER */}
          <div className="mb-6 flex justify-center">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-1 rounded-full bg-gray-50 w-full max-w-4xl">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  aria-pressed={selectedCategory === category.id}
                  className={`flex items-center justify-center tracking-tight px-2 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-200 
                    ${selectedCategory === category.id
                      ? 'bg-[var(--color-green)] font-bold text-white shadow-sm border border-black '
                      : 'text-gray-600 hover:text-[var(--color-green)] font-medium border border-[var(--color-green)] hover:bg-gray-100 hover:scale-105 hover:shadow-md cursor-pointer'}`}
                >
                  {category.icon}{category.name}
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH */}
          <div className="mb-8 flex justify-center">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plans, services, features, or conditions..."
              className="w-full max-w-2xl px-4 py-2 border-2 border-gray-400 rounded-xl focus:border-[var(--color-green)] focus:outline-none transition-colors duration-200 shadow-sm hover:shadow-md hover:border-[var(--color-green)]"
            />
          </div>

          {/* RESULT COUNT */}
          {searchQuery && (
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">
                Found {visiblePlans.length + visibleServices.length} results for "{searchQuery}"
              </p>
            </div>
          )}

          {/* SECTION HEADING */}
          {selectedCategory !== 'all' ? (
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold mb-2">
                {selectedCategory === 'personalized' && '🥗 Personalised Nutrition Plans'}
                {selectedCategory === 'quick' && '⚡ Quick Health Programs'}
                {selectedCategory === 'condition' && '🩺 Condition-Specific Programs'}
              </h3>
            </div>
          ) : (
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold mb-2">
                🚀 All Services & Plans
              </h3>
            </div>
          )}

          {/* PLANS */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${selectedCategory === 'condition' ? 'mb-0' : 'mb-16'}`}>
            {visiblePlans.map(plan => (
              <PlansCard
                key={plan.id}
                plan={plan}
                onClick={handlePlanClick}
                isPurchased={isPlanPurchased(plan.id)}
                onPaymentSuccess={onPaymentSuccess}
                setPaymentLoading={setPaymentLoading}
              />
            ))}
          </div>

          {/* SERVICES */}
          {(selectedCategory === 'all' || selectedCategory === 'condition') && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {visibleServices.map(service => (
                <ServicesCard key={service.id} service={service} />
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Plan Details Modal */}
      {showPlanDetails && selectedPlan && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--color-green)] to-[var(--color-green)]/70 p-4 sm:p-6 text-white sticky top-0 z-10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold leading-snug mb-1"> {selectedPlan.title} </h3>
                  {/* Price */}
                  <div className="flex items-end gap-2">
                    <span className="text-2xl sm:text-3xl font-bold"> ₹{selectedPlan.price} </span>
                    {selectedPlan.originalPrice && (
                      <span className="text-xs sm:text-sm line-through opacity-80">
                        ₹{selectedPlan.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                {/* Close */}
                <button
                  onClick={closePlanDetails}
                  className="p-2 rounded-full hover:bg-black/20 transition-colors cursor-pointer"
                  aria-label="Close modal" >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Body */}
            <div className="p-4 sm:p-6 pb-28 sm:pb-6">
              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 mb-5 leading-relaxed"> {selectedPlan.description} </p>
              {/* Features */}
              <div className="mb-6 sm:mb-8">
                <h4 className="font-semibold text-base sm:text-lg text-[var(--color-darkGray)] mb-3 sm:mb-4"> What You will get </h4>
                <div className="space-y-3">
                  {selectedPlan.features?.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <span className="w-5 h-5 mt-1 mr-3 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center text-xs"> ✓ </span>
                      <span className="text-sm sm:text-base text-gray-700"> {feature} </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Recommended */}
              {selectedPlan.recommended && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-6">
                  <p className="text-xs sm:text-sm text-yellow-800 font-medium"> ⭐ Recommended for: {selectedPlan.recommended} </p>
                </div>
              )}
            </div>
            {/* Mobile Sticky CTA */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
              <button
                className="block w-full px-6 py-3 bg-[var(--color-green)] text-white rounded-lg text-center font-medium hover:bg-white hover:text-[var(--color-green)] border-2 border-transparent hover:border-[var(--color-green)] transition-all"
                onClick={() => {
                  if (!isPlanPurchased(selectedPlan.id)) {
                    handleBuyPlan(selectedPlan, onPaymentSuccess, setPaymentLoading);
                  }
                }}
                disabled={isPlanPurchased(selectedPlan.id)}
              >
                {isPlanPurchased(selectedPlan.id) ? 'Plan Active (Purchased)' : 'Book This Plan'}\
              </button>
            </div>
            {/* Desktop Actions */}
            <div className="hidden sm:flex gap-4 px-6 pb-6">
              <button
                className="flex-1 px-6 py-3 bg-[var(--color-green)] text-white rounded-lg hover:bg-white hover:text-[var(--color-green)] border-2 border-transparent hover:border-[var(--color-green)] transition-all font-medium text-center cursor-pointer"
                onClick={() => {
                  if (!isPlanPurchased(selectedPlan.id)) {
                    handleBuyPlan(selectedPlan, onPaymentSuccess, setPaymentLoading);
                  }
                }}
                disabled={isPlanPurchased(selectedPlan.id)}
              >
                {isPlanPurchased(selectedPlan.id) ? 'Plan Active (Purchased)' : 'Book This Plan'}
              </button>
              <button onClick={closePlanDetails} className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-red-300 transition-colors font-medium cursor-pointer" > Close </button>
            </div>
          </div>
        </div>)}

      <Footer />
      {paymentLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <Loader fullScreen={false} text="Preparing payment..." />
        </div>
      )}

    </Background>
  );
};

export default Services;
