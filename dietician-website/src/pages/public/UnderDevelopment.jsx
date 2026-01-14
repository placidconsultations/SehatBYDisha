import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Background from '../../components/Background';
import { FaTools } from 'react-icons/fa';

const UnderDevelopment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Background>
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center py-24 px-4">
          <div className="flex flex-col items-center">
            <FaTools className="text-7xl text-[var(--color-green)] mb-6 animate-bounce" />
            <h1 className="text-4xl font-bold mb-4 text-gray-900 text-center">Feature In Development</h1>
            <p className="text-lg text-gray-700 mb-6 max-w-xl text-center">
              We're working hard to bring you this feature! Please check back soon. If you have suggestions or need more info, feel free to contact us.
            </p>
            <span className="inline-block px-4 py-2 rounded-lg bg-yellow-100 text-yellow-800 font-semibold text-md">🚧 Still in Progress 🚧</span>
          </div>
        </main>
        <Footer />
      </Background>
    </div>
  );
};

export default UnderDevelopment;

