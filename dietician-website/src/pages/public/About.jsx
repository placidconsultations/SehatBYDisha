import React from 'react';
import { FaLeaf, FaHeartbeat, FaUserMd, FaAward, FaUsers } from 'react-icons/fa';
import { GiFruitBowl, GiMeal } from 'react-icons/gi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Background from '../../components/Background';

const About = () => {
  const stats = [
    { icon: <FaUserMd className="text-3xl text-[var(--color-green)]" />, number: '10+', label: 'Years Experience' },
    { icon: <FaUsers className="text-3xl text-[var(--color-green)]" />, number: '5k+', label: 'Happy Clients' },
    { icon: <FaAward className="text-3xl text-[var(--color-green)]" />, number: '15+', label: 'Awards Won' },
    { icon: <FaHeartbeat className="text-3xl text-[var(--color-green)]" />, label: 'Personalized Plans' }
  ];

  const features = [
    {
      icon: <FaLeaf className="text-3xl text-[var(--color-green)]" />,
      title: 'Holistic Approach',
      description: 'We consider all aspects of your lifestyle for complete wellness.'
    },
    {
      icon: <GiFruitBowl className="text-3xl text-[var(--color-green)]" />,
      title: 'Nutrition Plans',
      description: 'Customized meal plans tailored to your unique needs and goals.'
    },
    {
      icon: <GiMeal className="text-3xl text-[var(--color-green)]" />,
      title: 'Lifestyle Coaching',
      description: 'Guidance to help you make sustainable, healthy lifestyle changes.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Background>
        <Navbar />
        <main className="flex-grow mb-16">
          {/* Hero Section */}
          <section className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  About <span className="text-[var(--color-green)]">Us</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Empowering your health journey with personalized nutrition and lifestyle solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                <div className="mb-10 lg:mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Founded in 2015, our practice has been dedicated to helping individuals achieve their health and wellness goals through evidence-based nutrition guidance.
                    </p>
                    <p>
                      What started as a small clinic has grown into a comprehensive wellness center, but our commitment to personalized care remains unchanged.
                    </p>
                    <p>
                      We believe in a holistic approach that considers not just what you eat, but your entire lifestyle, stress levels, sleep patterns, and physical activity.
                    </p>
                  </div>
                </div>
                <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-green)] to-[var(--color-darkGreen)] opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">Our Team</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div key={index} className="p-6 bg-white rounded-xl shadow-sm">
                    <div className="flex justify-center mb-3">
                      {stat.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</h3>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  We combine the latest nutritional science with practical, sustainable strategies for long-term success.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 flex items-center justify-center bg-green-50 rounded-full mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Our certified nutritionists and dietitians are dedicated to your health and wellness journey.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((member) => (
                  <div key={member} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Team Member {member}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900">Dr. Jane Smith</h3>
                      <p className="text-[var(--color-green)]">Lead Dietician</p>
                      <p className="mt-2 text-sm text-gray-600">
                        Specializing in weight management and sports nutrition with 10+ years of experience.
                      </p>
                    </div>
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
