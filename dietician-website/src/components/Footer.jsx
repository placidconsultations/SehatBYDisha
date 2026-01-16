import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import {Link} from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 sm:pt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/src/assets/SehatByDisha-Logo.jpeg" alt="Sehat By Disha Logo" className="h-12 w-12 object-contain" />
              <h3 className="text-2xl font-bold text-[var(--color-green)]">Sehat By Disha</h3>
            </div>
            <p className="text-gray-400">Your trusted partner in achieving optimal health through personalized nutrition and lifestyle guidance.</p>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                <FaFacebook size={20} />
              </a> */}
              <a href="https://www.instagram.com/sehatbydisha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                <FaInstagram size={20} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaXTwitter size={20} />
              </a> */}
              <a href="#"  className="text-gray-400 hover:text-[#0077B5] transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#"  className="text-gray-400 hover:text-[#FF0033] transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li className="mb-2 sm:mb-1"><Link to={'/'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">Home</Link></li>
              <li className="mb-2 sm:mb-1"><Link to={'/about'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">About Me</Link></li>
              <li className="mb-2 sm:mb-1"><Link to={'/services'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">Services</Link></li>
              <li className="mb-2 sm:mb-1"><Link to={'/blogs'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">Blogs</Link></li>
              <li><Link to={'/contact'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="mb-2 sm:mb-1"><Link to={'/services#personalized-diet-plans'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">Personalized Diet Plans</Link></li>
              <li className="mb-2 sm:mb-1"><Link to={'/services#weight-management'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">Weight Management</Link></li>
              <li className="mb-2 sm:mb-1"><Link to={'/services#sports-nutrition'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">Sports Nutrition</Link></li>
              <li className="mb-2 sm:mb-1"><Link to={'/services#medical-nutrition-therapy'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">Medical Nutrition Therapy</Link></li>
              <li><Link to={'/services#meal-planning'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">Meal Planning</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              {/* <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Health Street, Nutrition City, 560001</span>
              </div> */}
              <div className="flex items-center space-x-3">
                <FaPhoneAlt />
                <a href="tel:+91 7898654510" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">+91 7898654510</a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope />
                <a href="mailto:info@sehatbydisha.com" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">placid.consultations@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6 sm:my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-500 text-xs sm:text-sm">© {currentYear} Sehat by Disha. All rights reserved.</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 mt-4 md:mt-0">
            <a href="/privacy-policy" className="text-gray-500 hover:text-[var(--color-green)] text-xs sm:text-sm transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-500 hover:text-[var(--color-green)] text-xs sm:text-sm transition-colors">Terms of Service</a>
            <a href="/sitemap" className="text-gray-500 hover:text-[var(--color-green)] text-xs sm:text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
