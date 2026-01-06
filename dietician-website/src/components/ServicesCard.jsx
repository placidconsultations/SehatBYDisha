import React from 'react';

const ServicesCard = ({ service }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[var(--color-green)] group"
    >
      <div className="p-6 flex flex-col h-full">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{service.icon || '🩺'}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-3">
          {service.description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Condition-specific support
          </span>

          <button
          onClick={() => console.log('Learn more clicked for', service.title)}
            className="px-2 py-1.5 sm:px-4 sm:py-2 bg-[var(--color-green)] text-white rounded-lg 
                       hover:bg-white hover:text-[var(--color-green)] 
                       border-2 border-transparent hover:border-[var(--color-green)] 
                       transition-all duration-200 text-xs sm:text-sm font-medium cursor-pointer"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
