// components/TransformationTicker.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Ticker from './Ticker';
import { getTransformations } from '../firebase/testimonialService';
import Loader from './Loader';

const TransformationCard = ({ image, name, lostWeight, duration }) => (
  <motion.div
    className="relative w-64 sm:w-72 md:w-80 lg:w-72 xl:w-80 bg-gray-50 border-6 border-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{
      scale: 1.01,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }}
  >
    <div className="relative aspect-1 w-full overflow-hidden">
      <motion.img
        src={image}
        alt={`${name}'s transformation`}
        className="w-full h-full object-cover"
        loading="lazy"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-green)]/40 to-transparent" />
      <div className="p-3 sm:p-4 md:p-5 flex-1 flex items-center">
        <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">
          Our beloved client <span className="font-semibold text-gray-900">{name}</span> lost
          <span className="text-green-600 font-bold"> {lostWeight}kg </span>
          in just <span className="font-medium">{duration}</span>.
        </p>
      </div>
    </div>
  </motion.div>
);

const TransformationTicker = () => {
  const [transformations, setTransformations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransformations()
      .then(data => setTransformations(data))
      .catch(err => console.error('Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading transformations..." />;
  if (transformations.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Real <span className='text-[var(--color-green)]'>Success Stories</span>
          </h2>
          <p className="mt-2 sm:mt-3 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-500">
            See the incredible transformations our clients have achieved
          </p>
        </div>
        <Ticker 
          items={[...transformations].reverse()} 
          duration={60} 
          reverse 
          cardComponent={TransformationCard}
          /* This adds the gap ONLY to this ticker */
          itemClassName="px-4 sm:px-6 md:px-8" 
        />
      </div>
    </section>
  );
};

export default TransformationTicker;