import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlansCard = ({ plan, onClick }) => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[var(--color-green)] group"
        >
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
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
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



                {/* Original Price */}
                <div className="flex items-end gap-2 mb-2">
                    {plan.originalPrice && (
                        <span className="text-sm line-through text-gray-400">
                            ₹{plan.originalPrice}
                        </span>
                    )}
                </div>
                {/* Current Price */}
                <div className="mb-4 ">
                    <span className="text-2xl font-bold text-gray-900">
                        ₹{plan.price}
                    </span>
                    {plan.originalPrice && (
                        <span className="block text-sm line-through text-gray-400">
                            ₹{plan.originalPrice}
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-auto flex flex-row gap-2">
                    <button
                    onClick={() => onClick(plan)}
                        className="w-full px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-[var(--color-green)] text-white rounded-lg 
                       hover:bg-white hover:text-[var(--color-green)] 
                       border-2 border-transparent hover:border-[var(--color-green)] 
                       transition-all duration-200 font-medium cursor-pointer"
                    >
                        View Details
                    </button>
                    <button
                    onClick={() => navigate(`/booking?plan=${plan.id}`)}
                        className="w-full px-2 py-1.5 sm:px-4 sm:py-2 bg-white text-[var(--color-green)] border-[var(--color-green)] border-2 rounded-lg 
                       hover:bg-[var(--color-green)] hover:text-white 
                       transition-all duration-200 text-xs sm:text-sm font-medium cursor-pointer"
                    >
                        Book This Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlansCard;
