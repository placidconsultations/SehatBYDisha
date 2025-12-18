// src/pages/PricingPage.jsx

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import Navbar from '../../components/Navbar';
import Background from '../../components/Background';
import PricingCard from '../../components/PricingCard';
import { pricingTiers } from '../../data';
import Footer from '../../components/Footer';

// Custom arrow components
const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} !w-8 !h-8 sm:!w-12 sm:!h-12 !flex !items-center !justify-center !rounded-full !bg-[#25c00a] hover:!bg-[#1fa008] !shadow-lg transition-all duration-300 before:!content-none z-10`}
      onClick={onClick}
      style={{
        left: '-45px',
      }}
    >
      <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} !w-8 !h-8 sm:!w-12 sm:!h-12 !flex !items-center !justify-center !rounded-full !bg-[#25c00a] hover:!bg-[#1fa008] !shadow-lg transition-all duration-300 before:!content-none z-10`}
      onClick={onClick}
      style={{
        right: '-45px',
      }}
    >
      <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

const PricingPage = () => {
  const location = useLocation();
  const isPlansRoute = location.pathname === '/plans';
  const [isAnnual, setIsAnnual] = useState(true);

  // Slider settings with mobile-first approach
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,  // 3 seconds between slides
    speed: 800,           // Animation speed (ms)
    easing: 'ease-in-out', // Smooth easing
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)', // Custom easing
    fade: false,          // Set to true for fade effect
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    centerMode: false,
    adaptiveHeight: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    swipeToSlide: true,   // Better touch support
    draggable: true,      // Enable dragging on desktop
    swipe: true,          // Enable swiping
    touchMove: true,      // Enable touch move
    responsive: [
      {
        breakpoint: 640, // Small mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows on very small screens
        }
      },
      {
        breakpoint: 768, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 1024, // Desktop
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 1280, // Large desktop
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 9999, // Extra large
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true
        }
      }
    ]
  };

  const content = (
    <div className={`${isPlansRoute ? 'min-h-screen' : ''} bg-transparent flex flex-col items-center relative px-4 sm:px-8 lg:px-8`}>

      {/* Main container with mobile-first padding */}
      <div className="w-full max-w-7xl py-6 sm:py-8 md:py-10 mt-6 sm:mt-8 md:mt-10">

        {/* Title Section - Mobile optimized */}
        <div className="text-center mt-8 mb-6">
          <div className="inline-block">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              Our <span className='text-[var(--color-green)]'>Pricing</span>
            </h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-black rounded-lg ml-auto mt-2 mb-4"></div>
          </div>
        </div>

        {/* Annual/Monthly Toggle - Mobile optimized */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
          <div className="bg-gray-200 p-1 rounded-full flex shadow-inner w-full max-w-xs sm:max-w-sm">

            {/* Annual Button */}
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex-1 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition duration-300 ${isAnnual
                ? 'bg-black text-white shadow-md'
                : 'text-gray-800 hover:text-black/80 cursor-pointer'
                }`}
            >
              Annual
            </button>

            {/* Monthly Button */}
            <button
              onClick={() => setIsAnnual(false)}
              className={`flex-1 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition duration-300 ${!isAnnual
                ? 'bg-black text-white shadow-md'
                : 'text-gray-800 hover:text-black/80 cursor-pointer'
                }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards Carousel - Mobile optimized */}
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="pricing-slider-container">
            <Slider {...settings}>
              {pricingTiers.map((tier) => (
                <div key={tier.id} className="px-2 sm:px-3 py-4 sm:py-6 md:py-8">
                  <PricingCard
                    tier={tier}
                    isAnnual={isAnnual}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Optional: Help text for mobile users */}
        <div className="text-center mt-8 sm:hidden">
          <p className="text-xs text-gray-500">
            Swipe to see more plans →
          </p>
        </div>
      </div>
    </div>
  );

  if (isPlansRoute) {
    return (
      <Background>
        <Navbar />
        {content}
        <Footer/>
      </Background>
    );
  }

  return content;
};

export default PricingPage;