// src/components/PricingCard.jsx

import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PricingCard = ({ tier, isAnnual }) => {
  const { 
    title, 
    subtitle, 
    monthlyPrice, 
    annualPrice, 
    features, 
    ctaText, 
    highlight, 
    savePercentage, 
    popular, 
    active 
  } = tier;

  // Determine the price and billing cycle based on the toggle state
  const displayPrice = isAnnual ? annualPrice : monthlyPrice;
  
  // Mobile-first conditional styling
  const cardClasses = `
    relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl 
    transition duration-300 flex flex-col w-full h-full
    ${highlight 
      ? 'bg-gray-900 text-white shadow-xl ring-2 ring-yellow-400 z-10 scale-100 sm:scale-105' 
      : 'bg-white text-gray-800 shadow-md hover:shadow-lg hover:scale-[1.01]'}
  `;

  const buttonClasses = `
    mt-3 sm:mt-4 md:mt-5 w-full py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm 
    font-semibold transition duration-300 transform hover:scale-[1.02] 
    focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95
    ${highlight 
      ? 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-yellow-400' 
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300'}
  `;

  return (
    <div className={cardClasses}>
      {/* Highlight Tags - Mobile optimized */}
      {highlight && (
        <span className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-bl-lg sm:rounded-bl-xl rounded-tr-xl">
          Save {savePercentage}%
        </span>
      )}
      {popular && !highlight && (
        <span className="absolute top-2 sm:top-3 right-2 sm:right-3 text-[10px] sm:text-xs font-medium text-yellow-500">
          Popular
        </span>
      )}
      {active && !highlight && (
        <span className="absolute top-2 sm:top-3 right-2 sm:right-3 text-[10px] sm:text-xs font-medium text-yellow-500">
          Active
        </span>
      )}

      {/* Price and Title Section - Mobile optimized */}
      <div className="mb-2 sm:mb-3">
        <h3 className="text-base sm:text-sm md:text-md lg:text-lg font-bold leading-tight">
          {title}
        </h3>
        <p className={`text-xs sm:text-[12.2px] mt-1 leading-tight ${
          highlight ? 'opacity-80' : 'text-gray-500'
        }`}>
          {subtitle}
        </p>
      </div>

      {/* Price Display - Mobile optimized */}
      <div className="my-1 sm:my-1.5">
        <div className="flex items-baseline">
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
            ${displayPrice}
          </span>
          <span className={`ml-1 sm:ml-2 text-base sm:text-md md:text-lg ${
            highlight ? 'text-gray-300' : 'text-gray-600'
          }`}>
            /month
          </span>
        </div>
        {isAnnual && (
          <p className={`text-xs lg:text-sm mt-1 ${
            highlight ? 'text-gray-300' : 'text-gray-500'
          }`}>
            Billed annually (${annualPrice * 12})
          </p>
        )}
      </div>
      
      {/* Savings Badge */}
      {isAnnual && monthlyPrice > 0 && (
        <p className="text-xs lg:text-sm text-green-500 font-medium mb-1 lg:mb-2">
          Save {Math.round(((monthlyPrice * 12 - annualPrice * 12) / (monthlyPrice * 12)) * 100)}% vs monthly
        </p>
      )}
      
      {/* Feature List - Mobile optimized */}
      <ul className="space-y-2 sm:space-y-1 flex-grow border-t border-opacity-20 pt-3 sm:pt-4 my-2 sm:my-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span 
              className={`mt-0.5 mr-2 sm:mr-2 flex-shrink-0 ${
                feature.included 
                  ? highlight ? 'text-yellow-400' : 'text-green-500' 
                  : 'text-red-500'
              }`}
            >
              {feature.included ? (
                <FaCheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 md:w-5" />
              ) : (
                <FaTimesCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 md:w-5" />
              )}
            </span>
            <span 
              className={`text-xs sm:text-md md:text-normal lg:text-base leading-tight sm:leading-relaxed ${
                highlight 
                  ? feature.included ? 'opacity-90' : 'opacity-60' 
                  : feature.included ? 'text-gray-700' : 'text-gray-400'
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      
      {/* CTA Button */}
      <button className={buttonClasses}>
        {ctaText}
      </button>
    </div>
  );
};

export default PricingCard;