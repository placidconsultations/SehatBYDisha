import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserAlt } from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    {name: 'Plans', path: '/plans'},
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blogs' },
    { name: 'Contact', path: '/contact' },

  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg py-2' 
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="bg-[var(--color-green)] p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                <FaBowlFood className="h-6 w-6 md:h-7 md:w-7 text-white" />
              </div>
              <span className="ml-3 text-xl md:text-2xl font-bold text-[var(--color-darkGray)]">
                Sehat<span className="text-[var(--color-green)]">By</span>Disha
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium relative group overflow-hidden transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-[var(--color-green)] font-semibold'
                      : 'text-[var(--color-darkGray)] hover:text-[var(--color-green)]'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-green)] transition-all duration-300 group-hover:w-full ${
                    location.pathname === link.path ? 'w-full' : ''
                  }`}></span>
                </Link>
              ))}
              {/* <Link
                to="/appointment"
                className="ml-4 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[var(--color-green)] hover:bg-[var(--color-darkGreen)] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[var(--color-green)]/20"
              >
                <div className="flex items-center">
                  <span>Book Appointment</span>
                </div>
              </Link> */}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
                isOpen 
                  ? 'bg-[var(--color-green)] text-white' 
                  : 'bg-transparent/20 text-[var(--color-darkGray)] hover:bg-[var(--color-green)] hover:text-white'
              }`}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with smooth animation */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white/95 backdrop-blur-sm shadow-xl rounded-b-2xl mx-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'bg-[var(--color-green)]/10 text-[var(--color-green)] font-semibold'
                  : 'text-[var(--color-darkGray)] hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* <Link
            to="/appointment"
            className="mt-2 block w-full px-4 py-3 text-center rounded-lg text-base font-medium text-white bg-[var(--color-green)] hover:bg-[var(--color-darkGreen)] transition-all duration-300 shadow-md"
          >
            Book Appointment
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
