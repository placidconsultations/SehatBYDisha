import React from 'react';
import calendar from '../assets/icons/calendar.svg'
import target from '../assets/icons/target.svg'
import lifestyle from '../assets/icons/lifestyle.png'
import check from '../assets/icons/check-square.svg'

// Icon for Personalized Nutrition
const NutritionIcon = (props) => (
  <img
    {...props}
    src={calendar}
    alt="Nutrition icon"
    className={`${props.className} object-contain`}
  />
);


// Icon for Goal Tracking
  const GoalTrackIcon = (props) => (
    <img
      {...props}
      src={target}
      alt="Goal icon"
      className={`${props.className} object-contain`}
    />
  );

// Icon for Sustainable Lifestyle Coaching
const CoachingIcon = (props) => (
  <img
    {...props}
    src={lifestyle}
    alt="lifestyle icon"
    className={`${props.className} object-contain`}
  />
);

// Icon for Weekly Check-ins (Laptop-like)
const CheckInIcon = (props) => (
  <img
    {...props}
    src={check}
    alt="flex icon"
    className={`${props.className} object-contain`}
  />
);


// --- FEATURES CONTENT (CONVERTED TO NUTRITION) ---

const features = [
  {
    icon: NutritionIcon,
    title: "Personalized Nutrition Plans",
    description:
      "Every body is different. Receive diet plans fully customized to your lifestyle, goals, medical conditions, and food preferences — no generic templates.",
    bg: 'bg-gray-100',
    spanClass: 'lg:col-span-1',
  },

  {
    icon: GoalTrackIcon,
    title: "Weekly Progress Tracking",
    description:
      "Stay accountable with structured progress reviews, habit tracking, weight insights, and routine adjustments to ensure you improve week after week.",
    bg: 'bg-gray-100',
    spanClass: 'lg:col-span-1',
  },

  {
    icon: CoachingIcon,
    title: "Sustainable Lifestyle Approach",
    description:
      "We help you build healthy habits that last — not restrictive diets. Learn how to eat well, stay energetic, and maintain long-term health with ease.",
    bg: 'bg-gray-100',
    spanClass: 'lg:col-span-2',
    isLarge: true,
  },
];


// --- Light Card Component ---
const LightFeatureCard = ({ icon: Icon, title, description, bg, spanClass, isLarge }) => (
  <div className={`
    ${bg} 
    p-8 
    rounded-xl 
    ${spanClass} 
    flex 
    flex-col 
    backdrop-blur-md
    bg-white/70 
    border 
    border-white/20 
    shadow-sm 
    hover:shadow-md 
    transition-all 
    duration-300
  `}>
    <div className={`flex ${isLarge ? 'items-center space-x-4' : 'flex-col items-start'}`}>
      <div className={`
        p-3 
        rounded-full 
        ${isLarge ? 'bg-green-100' : 'bg-white/70 border border-white/30'}
        backdrop-blur-sm
      `}>
        <Icon className={`w-6 h-6 ${isLarge ? 'text-gray-800' : 'text-gray-700'}`} />
      </div>
      <h2 className={`font-semibold ${isLarge ? 'text-2xl mt-0' : 'text-xl mt-4'}`}>
        {title}
      </h2>
    </div>
    <p className={`mt-3 text-gray-700 ${isLarge ? 'text-base mt-5' : 'text-sm'} leading-relaxed`}>
      {description}
    </p>
  </div>
);


// --- Dark Card Component (Tall Card) ---
const DarkFeatureCard = () => (
  <div className="bg-[var(--color-green)] p-8 rounded-xl shadow-lg lg:col-span-1 flex flex-col justify-between text-white h-full">
    <div>
      <div className="p-3 bg-white rounded-lg w-fit">
        <CheckInIcon className="w-6 h-6 " />
      </div>

      <h2 className="font-semibold text-2xl mt-4">Flexible Check-in Schedules</h2>

      <p className="mt-4 text-white/80 text-sm leading-relaxed">
        Whether you're a student, working professional, or homemaker — our plans adapt to your timings. Check in at your convenience and progress at your pace.
      </p>

      <p className="mt-4 text-white/80 text-sm leading-relaxed">
        You stay consistent without feeling overwhelmed or restricted.
      </p>
    </div>

    <button className="
      inline-flex justify-center items-center w-40
      px-6 py-3 relative z-30 rounded-md font-medium text-base
      text-white border-2 border-white
      transition-all duration-700 overflow-hidden
      [text-shadow:3px_5px_2px_rgba(0,0,0,0.25)]
      hover:[text-shadow:2px_2px_2px_rgba(0,0,0,0.20)]
      after:content-[''] after:absolute after:left-5 after:bottom-0
      after:h-1 after:w-1 after:bg-white
      after:rounded-md after:-z-20 after:translate-y-full
      after:transition-all after:duration-700 hover:after:scale-[300]
      hover:bg-[var(--color-green)] hover:text-[var(--color-green)] cursor-pointer
    ">
      View Plans →
    </button>
  </div>
);


// --- Main Component ---
export function WhyChooseUs() {
  return (
    <div className="relative overflow-hidden bg-white py-20">
      {/* Background Circle - Top Left */}
<div className="absolute 
  -top-6 -left-6 w-[250px] h-[350px] blur-2xl
  xs:-top-8 xs:-left-8 xs:w-[200px] xs:h-[200px]
  sm:-top-10 sm:-left-10 sm:w-[300px] sm:h-[300px] sm:blur-3xl
  md:-top-12 md:-left-12 md:w-[400px] md:h-[400px]
  lg:-top-14 lg:-left-14 lg:w-[500px] lg:h-[500px]
  xl:-top-16 xl:-left-16 xl:w-[600px] xl:h-[600px]
  2xl:-top-20 2xl:-left-20 2xl:w-[700px] 2xl:h-[700px]
  rounded-full bg-[var(--color-green)]/40 backdrop-blur-3xl -z-0"></div>      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center lg:text-left mb-12">
          <p className="text-gray-500 font-semibold text-sm tracking-widest">WHY CHOOSE US</p>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2 leading-tight">
            Why <span className="text-[var(--color-green)]">Sehat by Disha</span> Is the Right Choice for You
          </h1>
        </div>

        {/* GRID */}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min relative z-10">

          {/* First Two Cards */}
          {features.slice(0, 2).map((feature) => (
            <LightFeatureCard key={feature.title} {...feature} />
          ))}

          {/* Tall Dark Card */}
          <div className="lg:row-span-2">
            <DarkFeatureCard />
          </div>

          {/* Large Wide Card */}
          <LightFeatureCard key={features[2].title} {...features[2]} spanClass="lg:col-span-2" />
        </div>

      </div>
    </div>
  );
}
