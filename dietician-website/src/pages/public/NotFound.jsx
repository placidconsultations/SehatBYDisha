import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-7xl font-bold text-green-600 mb-4">404</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 max-w-md mb-6">
        The page you're looking for doesn’t exist or might have been moved.
        Please check the link or go back to the homepage.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition font-medium"
      >
        <FaArrowLeft /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
