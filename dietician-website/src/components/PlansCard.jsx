import React from 'react';
import { handleBuyPlan } from '../utils/paymentHandler';

const PlansCard = ({ plan, onClick, isPurchased, onPaymentSuccess , setPaymentLoading}) => {
    
    
    const handleBookClick = (e) => {
        e.stopPropagation(); 
        
        if (!isPurchased) {
            handleBuyPlan(plan, onPaymentSuccess, setPaymentLoading);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[var(--color-green)] group flex flex-col h-full">
            <div className="p-6 flex flex-col h-full">

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{plan.icon || '🥗'}</span>
                    {plan.popular && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                            Popular
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
                    {plan.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-grow">
                    {plan.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                    {plan.features?.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start text-sm text-gray-700">
                            <span className="w-4 h-4 mr-2 mt-0.5 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center text-[10px]">
                                ✓
                            </span>
                            <span className="leading-snug">{feature}</span>
                        </div>
                    ))}

                    {plan.features?.length > 4 && (
                        <div className="text-xs text-[var(--color-green)] font-medium">
                            +{plan.features.length - 4} more features
                        </div>
                    )}
                </div>

                {plan.recommended && (
                    <div className="mb-4 px-3 py-2 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p className="text-xs text-yellow-800 font-medium">
                            Recommended for: {plan.recommended}
                        </p>
                    </div>
                )}

                {/* Price Section */}
                <div className="mt-auto">
                    <div className="flex items-end gap-2 mb-1">
                        {plan.originalPrice && (
                            <span className="text-sm line-through text-gray-400">
                                ₹{plan.originalPrice}
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <span className="text-2xl font-bold text-gray-900">
                            ₹{plan.price}
                        </span>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    {/* View Details Button */}
                    <button
                        onClick={() => onClick(plan)}
                        className="px-2 py-2 text-xs sm:text-sm bg-[var(--color-green)] text-white rounded-lg 
                       hover:bg-white hover:text-[var(--color-green)] 
                       border-2 border-transparent hover:border-[var(--color-green)] 
                       transition-all duration-200 font-medium cursor-pointer"
                    >
                        View Details
                    </button>

                    {/* Book Now / Active Button */}
                    <button
                        onClick={handleBookClick}
                        disabled={isPurchased}
                        className={`px-2 py-2 text-xs sm:text-sm border-2 rounded-lg transition-all duration-200 font-medium cursor-pointer
                            ${isPurchased 
                                ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed' 
                                : 'bg-white text-[var(--color-green)] border-[var(--color-green)] hover:bg-[var(--color-green)] hover:text-white'
                            }`}
                    >
                        {isPurchased ? 'Active' : 'Book Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlansCard;