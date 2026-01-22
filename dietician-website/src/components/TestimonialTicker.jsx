// components/TestimonialTicker.jsx
import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import Ticker from './Ticker';
import { getTestimonials } from '../firebase/testimonialService';
import Loader from './Loader';

const TestimonialTicker = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials()
      .then(data => setTestimonials(data))
      .catch(err => console.error('Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading testimonials..." />;
  if (testimonials.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className='inline-block'>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              What <span className='text-[var(--color-green)]'>Our Clients</span> Say
            </h2>
            <div className="h-1 w-24 bg-black rounded-lg ml-auto mt-2 mb-6"></div>
          </div>
          <p className="mt-2 sm:mt-3 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-500">
            Join thousands of satisfied clients who transformed their health with us
          </p>
        </div>
        <Ticker items={testimonials} duration={50} cardComponent={TestimonialCard} />
      </div>
    </section>
  );
};

export default TestimonialTicker;