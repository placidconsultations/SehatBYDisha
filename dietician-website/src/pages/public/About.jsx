import React from 'react';
import { FaHeartbeat, FaStethoscope, FaBriefcase, FaClipboardList, FaSearch, FaHandHoldingHeart, FaBrain } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Background from '../../components/Background';
import ImageWithLoader from '../../components/ImageWithLoader';

const About = () => {
  const stats = [
    { icon: <FaBriefcase className="text-3xl text-[var(--color-green)]" />, number: '5+', label: 'Years Experience' },
    { icon: <FaHeartbeat className="text-3xl text-[var(--color-green)]" />, number: '500+', label: 'Happy Clients' },
    { icon: <FaStethoscope className="text-3xl text-[var(--color-green)]" />, number: '100+', label: 'Health Conditions Treated' },
    { icon: <FaClipboardList className="text-3xl text-[var(--color-green)]" />,number: '100+', label: 'Personalized Plans' }
  ];

  const features = [
    {
      icon: <FaSearch className="text-3xl text-[var(--color-green)]" />,
      title: 'Root-Cause Healing',
      description: `Our approach isn't just about counting calories, but identifying and addressing the underlying causes of your health concerns.`
    },
    {
      icon: <FaHandHoldingHeart className="text-3xl text-[var(--color-green)]" />,
      title: 'Bio-Individual Approach',
      description: 'Personalized plans that respect your unique body, lifestyle, and health goals.'
    },
    {
      icon: <FaBrain className="text-3xl text-[var(--color-green)]" />,
      title: 'Intuitive Eating',
      description: 'Empowering a healthier relationship with food through understanding, evidence-based insights, and sustainable lifestyle adjustments.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Background>
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center ">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  My <span className="text-[var(--color-green)]">Healing</span> Journey
                </h1>
                <div className="h-1 w-34 sm:w-48 bg-[var(--color-green)] rounded-lg mx-auto mb-3"></div>
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                  From personal struggle to professional passion - my journey of healing and transformation.
                </p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                <div className="mb-10 lg:mb-0">
                  <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">
                    <p>
                      In 2019, I was diagnosed with <span className="text-[var(--color-green)] font-bold">alopecia areata</span>. Medicines didn't work, and watching my hair fall was emotionally exhausting. I felt <span className="text-[var(--color-green)] font-bold">scared, helpless, and constantly anxious</span> about what was happening to my body.
                    </p>
                    <p>
                      That's when I decided to <span className="text-[var(--color-green)] font-bold">listen to my body instead of fighting it</span>. I focused on healing through food, lifestyle changes, and mindset work. I identified my food intolerances, worked on my daily habits, and practiced visualisation and self-healing. Slowly, my body began to respond.
                    </p>
                    <p>
                      Within <span className="text-[var(--color-green)] font-bold">six months</span>, I saw real change not just in my hair, but in my confidence and mental strength. That journey taught me that <span className="text-[var(--color-green)] font-bold">healing is possible when we support the body the right way</span>.
                    </p>
                    <p>
                      Today, I'm <span className="text-[var(--color-green)] font-bold">healthier, stronger, and deeply connected</span> to the work I do because I don't just guide people professionally, I understand healing personally.
                    </p>
                  </div>
                </div>
                <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-xl shadow-black/40 p-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-green)] to-[var(--color-darkGreen)] opacity-40"></div>
                  <ImageWithLoader 
                    src="/AboutMe-Disha.jpeg"
                    alt="Disha-Your Dietitian" 
                    loading="lazy"
                    className="h-full w-full object-cover rounded-sm border-4 border-white rotate-4 bg-[var(--color-darkGreen)]/40"
                    />
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
                {stats.map((stat, index) => (
                  <div key={index} className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
                    <div className="flex justify-center mb-3">
                      {stat.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.number}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
                <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                  We combine the latest nutritional science with practical, sustainable strategies for long-term success.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-green-50 rounded-full mb-3 sm:mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </Background>
    </div>
  );
};

export default About;
