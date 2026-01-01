import React from 'react';

// Skeleton for blog cards
export const BlogCardSkeleton = () => {
  return (
    <div className="bg-white shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

// Skeleton for blog details
export const BlogDetailsSkeleton = () => {
  return (
    <div className="bg-white shadow-sm overflow-hidden animate-pulse">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 h-[400px] lg:h-[calc(100vh-8rem)] bg-gray-300"></div>
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12">
          <div className="space-y-4 mb-6">
            <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
            <div className="flex space-x-6">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton for service cards
export const ServiceCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-16 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-4"></div>
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
          <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

// Generic skeleton for text content
export const TextSkeleton = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-300 rounded animate-pulse ${
            index === lines - 1 ? 'w-5/6' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
};

// Skeleton for form inputs
export const FormSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
        <div className="h-10 w-full bg-gray-300 rounded"></div>
      </div>
      <div>
        <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
        <div className="h-10 w-full bg-gray-300 rounded"></div>
      </div>
      <div>
        <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
        <div className="h-32 w-full bg-gray-300 rounded"></div>
      </div>
      <div className="h-10 w-32 bg-gray-300 rounded"></div>
    </div>
  );
};

