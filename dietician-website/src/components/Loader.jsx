import React from 'react';

const Loader = ({ size = 'md', fullScreen = false, text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-t-2 border-b-2',
    lg: 'h-16 w-16 border-t-2 border-b-2',
    xl: 'h-24 w-24 border-t-2 border-b-2'
  };

  const containerClasses = fullScreen 
    ? 'min-h-screen flex flex-col items-center justify-center' 
    : 'flex flex-col items-center justify-center py-8';

  return (
    <div className={containerClasses}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-[var(--color-green)]`}></div>
      {text && (
        <p className="mt-4 text-gray-600 text-sm sm:text-base">{text}</p>
      )}
    </div>
  );
};

export default Loader;
