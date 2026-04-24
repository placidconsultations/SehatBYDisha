import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 sm:pt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/SehatByDisha-Logo.jpeg" alt="Sehat By Disha Logo" className="h-12 w-12 object-contain" />
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
              <a href="https://www.linkedin.com/company/sehatbydisha" target='_blank' rel='noopener noreferrer' className="text-gray-400 hover:text-[#0077B5] transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://youtube.com/@sehatbydisha" target='_blank' rel='noopener noreferrer' className="text-gray-400 hover:text-[#FF0033] transition-colors">
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
              <li className="mb-2 sm:mb-1"><Link to={'/services?category=all'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">🚀 All Plans</Link></li>
              <li className="mb-2 sm:mb-1"><Link to={'/services?category=personalized'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">🥗 Personalized Plans</Link></li>
              <li className="mb-2 sm:mb-1"><Link to={'/services?category=condition'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">🩺 Condition-Specific</Link></li>
              <li className="mb-2 sm:mb-1"><Link to={'/services?category=quick'} className="text-gray-400 hover:text-[var(--color-green)] transition-colors text-sm sm:text-base">⚡ Quick Plans</Link></li>
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
        <div className="w-full flex flex-col items-center">
  {/* Bottom Row */}
  <div className="w-full flex flex-col md:flex-row justify-between items-center">
    
    {/* Copyright */}
    <p className="text-gray-400 text-xs text-center md:text-left order-2 md:order-1">
      © {currentYear} Sehat by Disha | All rights reserved.
    </p>

    {/* Center Links */}
    <div className="flex flex-wrap justify-center items-center gap-x-3 text-gray-400 text-[10px] sm:text-xs uppercase tracking-[0.15em] order-1 md:order-2">
      <a href="/privacy-policy" className="hover:text-[var(--color-green)] transition-colors">Privacy</a>
      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
      <a href="/terms-of-service" className="hover:text-[var(--color-green)] transition-colors">Terms</a>
      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
      <a href="/sitemap" className="hover:text-[var(--color-green)] transition-colors">Sitemap</a>
    </div>

    {/* Portfolio Link */}
    <a 
      href="https://my-portfolio-theta-one-67.vercel.app" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-400 text-xs group order-3"
    >
      Built with 
      <span className="inline-block mx-1 group-hover:scale-125 transition-transform duration-300 text-red-500">
        ❤
      </span> 
      by 
      <span className="ml-1 text-gray-600 group-hover:text-[var(--color-green)] font-medium transition-colors">
        Yugank
      </span>
    </a>
    
  </div>
</div>
      </div>
    </footer>
  );
};

export default Footer;
