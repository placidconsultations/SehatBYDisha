import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import { WhyChooseUs } from '../../components/WhyChooseUs';
import Footer from '../../components/Footer';

const Home = () => {
  return (
    <Background>
      <Navbar />
      <section className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Column - Text Content */}
            <div className="w-full md:w-1/2 md:pr-8">
              <h1 className="text-3xl font-bold text-[var(--color-darkGray)] mb-2 sm:text-4xl md:text-5xl transition-default">
                Sehat By Disha
              </h1>
              <p className="text-base text-[var(--color-darkGrayish)] mb-4 sm:text-md transition-default">
                <span className="text-[var(--color-green)] font-bold">Personalized nutrition for your unique wellness journey.</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 mt-2.5 mr-3 rounded-full bg-[var(--color-green)]"></span>
                  <span className="text-[var(--color-darkGray)]">Personalized Diet Plans</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 mt-2.5 mr-3 rounded-full bg-[var(--color-green)]"></span>
                  <span className="text-[var(--color-darkGray)]">Regular Follow-ups</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 mt-2.5 mr-3 rounded-full bg-[var(--color-green)]"></span>
                  <span className="text-[var(--color-darkGray)]">Weight & Wellness Tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 mt-2.5 mr-3 rounded-full bg-[var(--color-green)]"></span>
                  <span className="text-[var(--color-darkGray)]">Sustainable Lifestyle Coaching</span>
                </li>
              </ul>

              {/* Mobile Image - Only shows on mobile */}
              <div className="md:hidden w-full flex justify-center my-8">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                  <div className="absolute inset-0 bg-[var(--color-green)] rounded-full opacity-20 blur-lg -z-10 transition-default"></div>
                  <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-white shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Happy client"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">

                {/* Primary Button */}
                <Link
                  to="/appointment"
                  className="
      inline-flex justify-center items-center
      px-6 py-3 relative z-30 rounded-md font-medium text-white text-base
      bg-[var(--color-green)] border-2 border-[var(--color-green)]
      transition-all duration-700 overflow-hidden
      [text-shadow:3px_5px_2px_rgba(0,0,0,0.25)]
      hover:[text-shadow:2px_2px_2px_rgba(0,0,0,0.20)]
      after:content-[''] after:absolute after:left-5 after:bottom-0
      after:h-1 after:w-1 after:bg-transparent
      after:rounded-md after:-z-20 after:translate-y-full
      after:transition-all after:duration-700 hover:after:scale-[300]
      hover:bg-transparent hover:text-[var(--color-green)]
    "
                >
                  View Plans
                </Link>

                {/* Secondary Button */}
                <Link
                  to="/services"
                  className="
      inline-flex justify-center items-center
      px-6 py-3 relative z-30 rounded-md font-medium text-base
      text-[var(--color-green)] border-2 border-[var(--color-green)]
      transition-all duration-700 overflow-hidden
      [text-shadow:3px_5px_2px_rgba(0,0,0,0.25)]
      hover:[text-shadow:2px_2px_2px_rgba(0,0,0,0.20)]
      after:content-[''] after:absolute after:left-5 after:bottom-0
      after:h-1 after:w-1 after:bg-[var(--color-green)]
      after:rounded-md after:-z-20 after:translate-y-full
      after:transition-all after:duration-700 hover:after:scale-[300]
      hover:bg-[var(--color-green)] hover:text-white
    "
                >
                  Message
                </Link>

              </div>

            </div>

            {/* Right Column - Desktop Image */}
            <div className="hidden md:block w-full max-w-md md:max-w-none md:w-1/2">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto">
                <div className="absolute inset-0 bg-[var(--color-green)] rounded-full opacity-20 blur-lg -z-10 transition-default"></div>
                <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-white shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Happy client"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <section className="mt-10 py-16 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              {/* Image Column */}
              <div className="w-full md:w-5/12 lg:w-1/3 mb-10 md:mb-0 md:pr-12">
                <div className="relative w-64 h-80 sm:w-80 sm:h-96 mx-auto">
                  <div className="absolute inset-0 bg-[var(--color-green)] rounded-2xl opacity-40 -z-10 transform rotate-4"></div>
                  <div className="relative w-full h-full overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Disha - Your Dietitian"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full md:w-7/12 lg:w-2/3">
                <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4 sm:text-3xl md:text-4xl">
                  About <span className="text-[var(--color-green)]">Me</span>
                </h2>
                <div className="h-1 w-20 bg-[var(--color-green)] mb-6"></div>

                <p className="text-[var(--color-darkGrayish)] mb-6 leading-relaxed">
                  Hello! I'm Disha, a certified dietitian and nutritionist with over 8 years of experience in helping people achieve their health and wellness goals through personalized nutrition plans and lifestyle modifications.
                </p>

                <p className="text-[var(--color-darkGrayish)] mb-6 leading-relaxed">
                  My approach focuses on creating sustainable, science-backed nutrition plans that fit your unique lifestyle, preferences, and health needs. I believe in nourishing the body with whole, nutrient-dense foods while still allowing for flexibility and enjoyment.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-green)] mr-3"></span>
                    <span className="text-[var(--color-darkGray)]">Certified Dietitian</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-green)] mr-3"></span>
                    <span className="text-[var(--color-darkGray)]">8+ Years Experience</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-green)] mr-3"></span>
                    <span className="text-[var(--color-darkGray)]">Personalized Approach</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-green)] mr-3"></span>
                    <span className="text-[var(--color-darkGray)]">Evidence-Based</span>
                  </div>
                </div>

                <Link
                  to="/about"
                  className="
                  inline-flex items-center
                  px-6 py-3 relative z-30 rounded-md font-medium text-base
                  text-white bg-[var(--color-green)]
                  transition-all duration-300 hover:bg-[var(--color-darkGreen)]
                  hover:shadow-lg hover:shadow-[var(--color-green)]/20
                "
                >
                  Learn More About Me
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why to choose us */}

        <section className="mt-10 py-16 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WhyChooseUs />
          </div>
          </section>

      </section>
      {/* Footer */}
      <Footer />
    </Background>
  );
};

export default Home;