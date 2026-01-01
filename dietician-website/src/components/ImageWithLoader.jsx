import React, { useState } from 'react';

const ImageWithLoader = ({ src, alt, className, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <div className="w-8 h-8 border-4 border-[var(--color-green)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="text-gray-400 text-sm">Image not available</div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
};

export default ImageWithLoader;

