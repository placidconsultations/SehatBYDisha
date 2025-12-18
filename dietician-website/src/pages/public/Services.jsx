import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';

const services = [
  {
    id: 1,
    title: "Personalized Diet Plans",
    description: "Custom nutrition plans based on lifestyle, preferences, allergies, and health goals",
    icon: "🥗",
    features: [
      "Customized meal planning",
      "Weekly check-ins and modifications",
      "Allergy-friendly options",
      "Lifestyle integration"
    ]
  },
  {
    id: 2,
    title: "Weight Management",
    description: "Sustainable approaches to achieving and maintaining a healthy weight",
    icon: "⚖️",
    features: [
      "Sustainable calorie planning",
      "Fat-loss meal plans",
      "Progress tracking",
      "Behavioral strategies"
    ]
  },
  {
    id: 3,
    title: "Medical Nutrition Therapy",
    description: "Specialized nutrition plans for various health conditions",
    icon: "🏥",
    features: [
      "Diabetes management",
      "PCOS/PCOD nutrition",
      "Thyroid management",
      "Heart health plans",
      "Cholesterol control",
      "Hypertension diet"
    ]
  },
  {
    id: 4,
    title: "Sports & Performance",
    description: "Nutrition plans to enhance athletic performance",
    icon: "🏋️",
    features: [
      "Athlete meal planning",
      "Muscle gain strategies",
      "Workout nutrition timing",
      "Recovery meals"
    ]
  },
  {
    id: 5,
    title: "Child & Teen Nutrition",
    description: "Healthy eating for growth and development",
    icon: "👶",
    features: [
      "Growth-focused diet plans",
      "Balanced meal guidelines",
      "Healthy habits building",
      "School lunch ideas"
    ]
  },
  {
    id: 6,
    title: "Pregnancy & Postpartum",
    description: "Nutrition for mother and baby's health",
    icon: "🤰",
    features: [
      "Pre-natal health plans",
      "Post-delivery recovery",
      "Breastfeeding nutrition",
      "Healthy weight management"
    ]
  },
  {
    id: 7,
    title: "Clinical Diet Counselling",
    description: "Professional guidance for specific health needs",
    icon: "💊",
    features: [
      "One-on-one consultation",
      "Nutrition deficiency guidance",
      "Food intolerance advice",
      "Medical condition support"
    ]
  },
  {
    id: 8,
    title: "Lifestyle Coaching",
    description: "Building sustainable healthy habits",
    icon: "🧠",
    features: [
      "Behavior change strategies",
      "Healthy eating routines",
      "Sleep optimization",
      "Hydration guidance"
    ]
  },
  {
    id: 9,
    title: "Detox & Wellness",
    description: "Programs for body cleansing and immunity",
    icon: "🌿",
    features: [
      "7/14-day detox programs",
      "Immunity boosting diets",
      "Gut health improvement",
      "Energy enhancement"
    ]
  },
  {
    id: 10,
    title: "Corporate Wellness",
    description: "Workplace health and wellness programs",
    icon: "🏢",
    features: [
      "Employee diet workshops",
      "Meal planning guides",
      "Health coaching",
      "Team challenges"
    ]
  }
];

const Services = () => {
  return (
        <Background>
        <Navbar />
    <div className="min-h-screen bg-transparent pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--color-darkGray)] mb-4">
            Our Services
          </h1>
          <div className="w-24 h-1 bg-[var(--color-green)] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive nutrition and wellness services tailored to your unique needs and goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-2 bg-[var(--color-green)] text-white text-4xl text-center">
                {service.icon}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--color-darkGray)] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 mt-2 mr-2 rounded-full bg-[var(--color-green)]"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/appointment"
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-[var(--color-green)] rounded-md hover:bg-[var(--color-darkGreen)] transition-colors"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
            Ready to transform your health?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Schedule a consultation today and take the first step towards a healthier, happier you.
          </p>
          <Link
            to="/appointment"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--color-green)] hover:bg-[var(--color-darkGreen)] transition-colors"
          >
            Book Your Appointment Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
    </Background>
  );
};

export default Services;