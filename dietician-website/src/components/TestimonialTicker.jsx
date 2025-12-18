// components/TestimonialTicker.jsx
import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import before from '../assets/before.jpg'
import after from '../assets/after.jpg'

// Add this new component above TestimonialTicker
const TransformationCard = ({ image, name, lostWeight, duration }) => {
  return (
    <motion.div
      className="relative w-64 sm:w-72 md:w-80 lg:w-72 xl:w-80 bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      whileHover={{
        scale: 1.01,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-1 w-full overflow-hidden">
        <motion.img
          src={image}
          alt={`${name}'s transformation`}
          className="w-full h-full object-cover"
          loading="lazy"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-green)]/40 to-transparent" />
        {/* Content */}
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
};

const Ticker = ({ items, duration = 50, reverse = false, cardComponent: Card }) => {
  const animation = {
    x: reverse ? ['-100%', '0%'] : ['0%', '-100%'],
    transition: {
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop'
    }
  };

  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden pb-4">
      <motion.div
        className="inline-flex items-stretch"
        animate={animation}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="px-1.5 sm:px-2 md:px-3 w-64 sm:w-72 md:w-80 lg:w-72 xl:w-80 flex-shrink-0"
          >
            <Card {...item} index={index % items.length} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const TestimonialTicker = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content: 'The personalized nutrition plan helped me achieve my fitness goals faster than I ever imagined. Highly recommended!',
      rating: 5,
      image: before
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Working Professional',
      content: 'Balanced meals and great support. My energy levels have never been better since I started following the plan.',
      rating: 5,
      image: after
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'Mother of Two',
      content: 'Meal planning used to be so stressful. Now I have healthy, delicious meals for my whole family without the hassle!',
      rating: 4,
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Athlete',
      content: 'The performance nutrition plan helped me optimize my diet for better recovery and results. Game changer!',
      rating: 5,
      image: after
    },
    {
      id: 5,
      name: 'Priya Patel',
      role: 'Busy Professional',
      content: 'The meal prep guide saved me so much time during the week. Healthy eating has never been easier!',
      rating: 4,
      image: before
    }
  ];

  const transformations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      image: before,
      lostWeight: '10',
      duration: '3 months'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      image: after,
      lostWeight: '10',
      duration: '3 months'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      image: before,
      lostWeight: '10',
      duration: '3 months'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      image: after,
      lostWeight: '10',
      duration: '3 months'
    },
    {
      id: 5,
      name: 'Sarah Johnson',
      image: before,
      lostWeight: '10',
      duration: '3 months'
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            What  <span className='text-[var(--color-green)]'>Our Clients</span> Say
          </h2>
          <p className="mt-2 sm:mt-3 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-500">
            Join thousands of satisfied clients who transformed their health with us
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          <Ticker
            items={testimonials}
            duration={50}
            cardComponent={TestimonialCard}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Real <span className='text-[var(--color-green)]'>Success Stories</span>
          </h2>
          <p className="mt-2 sm:mt-3 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-500">
            See the incredible transformations our clients have achieved on their health journey
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          <Ticker
            items={[...transformations].reverse()}
            duration={60}
            reverse
            cardComponent={TransformationCard}
          />
        </div>
      </div>
    </section>



  );
};

export default TestimonialTicker;