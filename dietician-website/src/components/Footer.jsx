import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[var(--color-green)]">Sehat by Disha</h3>
            <p className="text-gray-400">Your trusted partner in achieving optimal health through personalized nutrition and lifestyle guidance.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">Services</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">Personalized Diet Plans</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">Weight Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">Sports Nutrition</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">Medical Nutrition Therapy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">Meal Planning</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-[var(--color-green)] mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Health Street, Nutrition City, 560001</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-[var(--color-green)]" />
                <a href="tel:+911234567890" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">+91 12345 67890</a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-[var(--color-green)]" />
                <a href="mailto:info@sehatbydisha.com" className="text-gray-400 hover:text-[var(--color-green)] transition-colors">info@sehatbydisha.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-500 text-sm"> {currentYear} Sehat by Disha. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-[var(--color-green)] text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-[var(--color-green)] text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-[var(--color-green)] text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
