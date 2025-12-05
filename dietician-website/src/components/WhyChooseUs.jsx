import React from 'react';
import nutrition from '../assets/icons/nutrition.png';
import goal from '../assets/icons/goal.png'
import lifestyle from '../assets/icons/lifestyle.png'
import flex from '../assets/icons/flexibleSchedule.png'



// --- Custom SVG Icons for Nutrition Website ---

// Icon for Personalized Nutrition
const NutritionIcon = (props) => (
  <img
    {...props}
    src={nutrition}
    alt="Nutrition icon"
    className={`${props.className} object-contain`}
  />
);


// Icon for Goal Tracking
  const GoalTrackIcon = (props) => (
    <img
      {...props}
      src={goal}
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
    src={flex}
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
  <div className={`${bg} p-8 rounded-xl shadow-sm ${spanClass} flex flex-col`}>
    <div className={`flex ${isLarge ? 'items-center space-x-4' : 'flex-col items-start'}`}>
      <div className={`p-3 rounded-full ${isLarge ? 'bg-white' : 'bg-transparent border border-gray-300'}`}>
        <Icon className={`w-6 h-6 ${isLarge ? 'text-gray-800' : 'text-gray-500'}`} />
      </div>

      <h2 className={`font-semibold ${isLarge ? 'text-2xl mt-0' : 'text-xl mt-4'}`}>
        {title}
      </h2>
    </div>

    <p className={`mt-3 text-gray-600 ${isLarge ? 'text-base mt-5' : 'text-sm'} leading-relaxed`}>
      {description}
    </p>
  </div>
);


// --- Dark Card Component (Tall Card) ---
const DarkFeatureCard = () => (
  <div className="bg-[var(--color-green)] p-8 rounded-xl shadow-lg lg:col-span-1 flex flex-col justify-between text-white h-full">
    <div>
      <div className="p-3 bg-white bg-opacity-20 rounded-lg w-fit">
        <CheckInIcon className="w-6 h-6 text-[var(--color-green)]" />
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
      hover:bg-[var(--color-green)] hover:text-[var(--color-green)]
    ">
      View Plans →
    </button>
  </div>
);


// --- Main Component ---
export function WhyChooseUs() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center lg:text-left mb-12">
          <p className="text-gray-500 font-semibold text-sm tracking-widest">WHY CHOOSE US</p>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2 leading-tight">
            Why <span className="text-[var(--color-green)]">Sehat by Disha</span> Is the Right Choice for You
          </h1>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min">

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
