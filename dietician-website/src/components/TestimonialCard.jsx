import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';


const TestimonialCard = ({ name, role, content, rating, image, index }) => {
  // Staggered animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Generate stars based on rating
  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <motion.div
      className="relative h-full p-4 sm:p-6 rounded-2xl bg-white shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      custom={index % 3}
    >
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Quote icon */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-200 text-3xl sm:text-5xl opacity-20">
          <FaQuoteLeft />
        </div>

        {/* Rating */}
        <div className="flex justify-center sm:justify-start mb-3 sm:mb-4">
          {renderStars()}
        </div>

        {/* Testimonial text */}
        <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed flex-grow">
          {content}
        </p>

        {/* Author info */}
        <div className="flex flex-col sm:flex-row sm:items-center mt-auto">
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{name}</h4>
            <p className="text-xs sm:text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-yellow-100 opacity-70 "></div>
      {image ? (
        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
          <img
            src={image}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 opacity-70"></div>
      )}
    </motion.div>
  );
};

TestimonialCard.defaultProps = {
  name: 'John Doe',
  role: 'Client',
  content: 'This is a sample testimonial. The service was amazing and I would definitely recommend it to others!',
  rating: 5,
  index: 0
};

export default TestimonialCard;