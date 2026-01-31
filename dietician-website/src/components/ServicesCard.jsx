import React, { useState } from 'react';

const ServicesCard = ({ service }) => {
  const [showPopup, setShowPopup] = useState(false);
  const message = `Hello Disha, I want to consult about the ${service.title}.`;
  const encodedMessage = encodeURIComponent(message);

  const whatsappURL = `https://wa.me/917898654510?text=${encodedMessage}`;

  // Description clamp length for 'Read more'
  const DESCRIPTION_CLAMP_LENGTH = 120;
  const descriptionTooLong = service.description && service.description.length > DESCRIPTION_CLAMP_LENGTH;
  const shortDescription = descriptionTooLong
    ? service.description.slice(0, DESCRIPTION_CLAMP_LENGTH) + '...'
    : service.description;

  return (
    <>
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
          <p className="text-sm text-gray-600 mb-2 leading-relaxed">
            {shortDescription}
            {descriptionTooLong && (
              <>
                <button
                  onClick={() => setShowPopup(true)}
                  className="ml-2 text-[var(--color-green)] cursor-pointer underline text-xs hover:opacity-80">
                  Read more
                </button>
              </>
            )}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Condition-specific support
            </span>
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1.5 sm:px-4 sm:py-2 bg-[var(--color-green)] text-white rounded-lg 
                         hover:bg-white hover:text-[var(--color-green)] 
                         border-2 border-transparent hover:border-[var(--color-green)] 
                         transition-all duration-200 text-xs sm:text-sm font-medium cursor-pointer"
            >
              Chat With Disha
            </a>
          </div>
        </div>
      </div>
      {/* Popup for full description */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowPopup(false)}>
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{service.title}</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line mb-6">{service.description}</p>
            <div className="flex justify-end">
              <a
                href={whatsappURL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1.5 sm:px-4 sm:py-2 bg-[var(--color-green)] text-white rounded-lg 
                           hover:bg-white hover:text-[var(--color-green)] 
                           border-2 border-transparent hover:border-[var(--color-green)] 
                           transition-all duration-200 text-xs sm:text-sm font-medium cursor-pointer"
              >
                Chat With Disha
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesCard;
