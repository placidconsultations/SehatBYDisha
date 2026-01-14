import React from 'react';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Sitemap = () => {
  return (
    <Background>
      <Navbar />
      <div className="min-h-screen bg-transparent pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-darkGray)] mb-4">
              Sitemap
            </h1>
            <div className="w-24 h-1 bg-[var(--color-green)] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Navigate through all pages and sections of our dietician website.
            </p>
          </div>

          {/* Sitemap Content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Main Pages */}
              <div>
                <h2 className="text-xl font-bold text-[var(--color-darkGray)] mb-4 flex items-center">
                  <span className="mr-2">🏠</span>
                  Main Pages
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-[var(--color-green)] hover:text-[var(--color-green)]/80 font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">🏠</span>
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">ℹ️</span>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">🥗</span>
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">📞</span>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Diet Plans */}
              <div>
                <h2 className="text-xl font-bold text-[var(--color-darkGray)] mb-4 flex items-center">
                  <span className="mr-2">🥗</span>
                  Diet Plans
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/services" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">🚀</span>
                      All Plans
                    </a>
                  </li>
                  <li>
                    <a href="/services?category=personalized" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">🥗</span>
                      Personalized Plans
                    </a>
                  </li>
                  <li>
                    <a href="/services?category=condition" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">🩺</span>
                      Condition-Specific Plans
                    </a>
                  </li>
                  <li>
                    <a href="/services?category=quick" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">⚡</span>
                      Quick Plans
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h2 className="text-xl font-bold text-[var(--color-darkGray)] mb-4 flex items-center">
                  <span className="mr-2">📚</span>
                  Resources
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/blogs" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">📝</span>
                      Blog & Articles
                    </a>
                  </li>
                  <li>
                    <a href="/under-development" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">🍳</span>
                      Recipes
                    </a>
                  </li>
                  <li>
                    <a href="/under-development" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">📊</span>
                      Nutrition Guide
                    </a>
                  </li>
                  <li>
                    <a href="/under-development" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">❓</span>
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h2 className="text-xl font-bold text-[var(--color-darkGray)] mb-4 flex items-center">
                  <span className="mr-2">🛞</span>
                  Support
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/contact" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">📅</span>
                      Book Appointment
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">📞</span>
                      Contact Support
                    </a>
                  </li>
                  <li>
                    <a href="/under-development" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">🔧</span>
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h2 className="text-xl font-bold text-[var(--color-darkGray)] mb-4 flex items-center">
                  <span className="mr-2">⚖️</span>
                  Legal
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/privacy-policy" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">🔒</span>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms-of-service" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">📋</span>
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/sitemap" className="text-[var(--color-green)] hover:text-[var(--color-green)]/80 font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">🗺️</span>
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>

              {/* Admin */}
              <div>
                <h2 className="text-xl font-bold text-[var(--color-darkGray)] mb-4 flex items-center">
                  <span className="mr-2">👤</span>
                  Admin
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/admin/login" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">🔑</span>
                      Login
                    </a>
                  </li> 
                  <li>
                    <a href="/admin/dashboard" className="text-gray-700 hover:text-[var(--color-green)] font-medium flex items-center py-2 transition-colors">
                      <span className="mr-2">📊</span>
                      Dashboard
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center text-gray-600">
                <p className="mb-4">
                  <strong>Need help finding something?</strong>
                </p>
                <p className="mb-4">
                  Use our search function or contact our support team for assistance.
                </p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center px-4 py-2 bg-[var(--color-green)] text-white rounded-lg hover:bg-white hover:text-[var(--color-green)] border-2 hover:border-2 hover:border-[var(--color-green)] transition-colors"
                  >
                    <span className="mr-2">📞</span>
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Background>
  );
};

export default Sitemap;
