import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import { WhyChooseUs } from '../../components/WhyChooseUs';
import Footer from '../../components/Footer';
import TestimonialTicker from '../../components/TestimonialTicker';
import Blogs from './Blogs';
import Contact from './Contact';
import ImageWithLoader from '../../components/ImageWithLoader';
import TransformationTicker from '../../components/Transformation';
const Home = () => {
  return (
    <Background>
      <Navbar />
      <section className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Column - Text Content */}
            <div className="w-full md:w-1/2 md:pr-8">
              <h1 className="text-3xl font-bold text-[var(--color-darkGray)] mb-2 sm:text-4xl md:text-5xl transition-default"> Sehat By Disha </h1>
              <p className="text-sm md:text-base text-[var(--color-darkGrayish)] mb-4 sm:text-md transition-default">
                <span className="text-[var(--color-green)] font-bold">Personalized nutrition for your unique wellness journey.</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 mt-2.5 mr-3 rounded-full bg-[var(--color-green)]"></span>
                  <span className="text-[var(--color-darkGray)]">Personalized Diet Plans</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 mt-2.5 mr-3 rounded-full bg-[var(--color-green)]">
                  </span>
                  <span className="text-[var(--color-darkGray)]">Regular Follow-ups</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 mt-2.5 mr-3 rounded-full bg-[var(--color-green)]"></span>
                  <span className="text-[var(--color-darkGray)]">Holistic Wellness Support</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 mt-2.5 mr-3 rounded-full bg-[var(--color-green)]"></span>
                  <span className="text-[var(--color-darkGray)]">Nutrition that fits your Lifestyle</span>
                </li>
              </ul>
              {/* Mobile Image - Only shows on mobile */}
              <div className="md:hidden w-full flex justify-center my-8">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                  <div className="absolute inset-0 bg-[var(--color-green)] rounded-full opacity-20 blur-lg -z-10 transition-default">
                  </div>
                  <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-white shadow-2xl">
                    <ImageWithLoader src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Happy client" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                {/* Primary Button */}
                <Link
                  to="/services"
                  className=" inline-flex justify-center items-center px-6 py-3 relative z-30 rounded-md font-medium text-white text-base bg-[var(--color-green)] border-2 border-[var(--color-green)] transition-all duration-700 overflow-hidden [text-shadow:3px_5px_2px_rgba(0,0,0,0.25)] hover:[text-shadow:2px_2px_2px_rgba(0,0,0,0.20)] after:content-[''] after:absolute after:left-5 after:bottom-0 after:h-1 after:w-1 after:bg-transparent after:rounded-md after:-z-20 after:translate-y-full after:transition-all after:duration-700 hover:after:scale-[300] hover:bg-transparent hover:text-[var(--color-green)] " >
                  View Plans
                </Link>
                {/* Secondary Button */}
                <a
                  href="https://wa.me/917898654510?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" inline-flex justify-center items-center px-6 py-3 relative z-30 rounded-md font-medium text-base text-[var(--color-green)] border-2 border-[var(--color-green)] transition-all duration-700 overflow-hidden [text-shadow:3px_5px_2px_rgba(0,0,0,0.25)] hover:[text-shadow:2px_2px_2px_rgba(0,0,0,0.20)] after:content-[''] after:absolute after:left-5 after:bottom-0 after:h-1 after:w-1 after:bg-[var(--color-green)] after:rounded-md after:-z-20 after:translate-y-full after:transition-all after:duration-700 hover:after:scale-[300] hover:bg-[var(--color-green)] hover:text-white " >
                  Chat With Disha
                </a>
              </div>
            </div>
            {/* Right Column - Desktop Image */}
            <div className="hidden md:block w-full max-w-md md:max-w-none md:w-1/2">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto">
                <div className="absolute inset-0 bg-[var(--color-green)] rounded-full opacity-20 blur-lg -z-10 transition-default">
                </div>
                <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-white shadow-2xl">
                  <ImageWithLoader src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Happy client"
                    className="w-full h-full object-cover"
                    loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* About Me Section */}
        <section className="mt-10 py-16 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Image Column */}
              <div className="w-full md:w-5/12 lg:w-1/3 mb-10 md:mb-0 md:pr-12">
                <div className="relative w-64 h-80 sm:w-80 sm:h-96 mx-auto">
                  <div className="absolute inset-0 bg-[var(--color-green)] rounded-2xl opacity-40 -z-10 transform rotate-4">
                  </div>
                  <div className="relative w-full h-full overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                    <ImageWithLoader src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Disha - Your Dietitian"
                      className="w-full h-full object-cover"
                      loading="lazy" />
                  </div>
                </div>
              </div>
              {/* Content Column */}
              <div className="w-full md:w-7/12 lg:w-2/3">
                <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4 sm:text-3xl md:text-4xl">
                  About
                  <span className="text-[var(--color-green)]">Me</span>
                </h2>
                <div className="h-1 w-20 bg-[var(--color-green)] mb-6"></div>
                <p className="text-[var(--color-darkGrayish)] mb-6 leading-relaxed">
                  Hi, I’m <b>Disha Bhojwani</b>, a qualified Dietician with over <b>5+ years</b> of experience in helping people heal, not just lose weight. I hold a Bachelor’s <b>degree in Food and Nutrition(Bsc)</b> and have completed my clinical internship at CK Birla Hospital, Jaipur, where I worked closely with patients, including those in the ICU.  </p> <p className="text-[var(--color-darkGrayish)] mb-6 leading-relaxed"> Over the years, I have guided 100+ clients in managing conditions such as <b>PCOD/PCOS, thyroid disorders, autoimmune issues, skin conditions, heart health, and sustainable fat loss</b>. My approach focuses on root-cause healing, lifestyle correction, and long-term results rather than calorie counting. Within a month, clients often experience improved energy, fat loss, menstrual balance, and reduced pain. I believe in intuitive, bio-individual nutrition and provide <b>empathetic, science-backed, personalized care </b> that fits real-life routines and builds a healthy, lasting relationship with food.  </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-green)] mr-3"></span>
                    <span className="text-[var(--color-darkGray)]">Certified Dietitian</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-green)] mr-3"></span>
                    <span className="text-[var(--color-darkGray)]">5+ Years Experience</span>
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
                  className=" inline-flex justify-center items-center px-6 py-3 relative z-30 rounded-md font-medium text-white text-base bg-[var(--color-green)] border-2 border-[var(--color-green)] transition-all duration-700 overflow-hidden [text-shadow:3px_5px_2px_rgba(0,0,0,0.25)] hover:[text-shadow:2px_2px_2px_rgba(0,0,0,0.20)] after:content-[''] after:absolute after:left-5 after:bottom-0 after:h-1 after:w-1 after:bg-transparent after:rounded-md after:-z-20 after:translate-y-full after:transition-all after:duration-700 hover:after:scale-[300] hover:bg-transparent hover:text-[var(--color-green)] " >
                  More About Me
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Youtube Video */}
        <section className="py-16 bg-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] sm:text-3xl md:text-4xl">Watch Our <span className="text-[var(--color-green)]">Video</span>
              </h2>
              <div className="h-1 w-16 bg-[var(--color-green)] rounded-lg mx-auto mb-3"></div>
              <p className="text-sm text-[var(--color-darkGrayish)] sm:text-base md:text-base max-w-2xl mx-auto"> Learn more about our approach to nutrition and wellness</p>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl">
              <iframe className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/p9J9cS1upRw"
                title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </section>
        {/* Why to choose us */}
        <section className="mt-10 py-16 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WhyChooseUs />
          </div>
        </section>
        {/* Services */}
        <section className="py-8 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block">
                <h2 className="text-3xl font-bold text-black sm:text-4xl">
                  Our <span className='text-[var(--color-green)]'>Services</span>
                </h2>
                <div className="h-1 w-24 bg-black rounded-lg ml-auto mt-2 mb-6"></div>
              </div>
              <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto"> Professional nutrition services tailored to your individual needs and goals </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Service Card 1 */}
              <div className="bg-[var(--color-green)]/30 rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Diet Plans</h3>
                  <p className="text-gray-600 flex-grow"> Customized nutrition plans designed specifically for your body type, lifestyle, and health goals.  </p>
                </div>
                <Link
                  to="/services"
                  className="px-6 py-4 bg-gray-50 text-blue-600 hover:text-blue-800 font-medium inline-block" > Learn more → </Link>
              </div>
              {/* Service Card 2 */}
              <div className="bg-[var(--color-green)]/40 rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Weight Management</h3>
                  <p className="text-gray-600 flex-grow"> Sustainable weight loss or gain programs with personalized guidance and continuous support.
                  </p>
                </div>
                <Link to="/services" className="px-6 py-4 bg-gray-50 text-blue-600 hover:text-blue-800 font-medium inline-block" > Learn more → </Link>
              </div>
              {/* Service Card 3 */}
              <div className="bg-[var(--color-green)]/35 rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Medical Nutrition Therapy</h3>
                  <p className="text-gray-600 flex-grow"> Specialized nutrition therapy for managing medical conditions like diabetes, PCOS, and more.
                  </p>
                </div>
                <Link to="/services" className="px-6 py-4 bg-gray-50 text-blue-600 hover:text-blue-800 font-medium inline-block" > Learn more → </Link>
              </div>
              {/* Service Card 4 */}
              <div className="bg-[var(--color-green)]/50 rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Corporate Wellness</h3>
                  <p className="text-gray-600 flex-grow"> Comprehensive workplace wellness programs to improve employee health and productivity.
                  </p>
                </div>
                <Link to="/services" className="px-6 py-4 bg-gray-50 text-blue-600 hover:text-blue-800 font-medium inline-block" > Learn more → </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section id='testimonials' className="py-10">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8"></div>
          <TestimonialTicker />
          <TransformationTicker />
        </section>
        {/* Blogs */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl"> Latest <span className="text-[var(--color-green)]">Blogs</span> </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500"> Check out our latest articles on nutrition, health, and wellness </p>
            </div>
            <Blogs limit={3} />
            <div className="mt-10 text-center">
              <Link to="/blogs" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[var(--color-green)] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"

              >
                View All Blogs
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className=" py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Contact />
          </div>
        </section>
      </section>
      {/* Footer */}
      <Footer />
    </Background>
  );
};

export default Home;