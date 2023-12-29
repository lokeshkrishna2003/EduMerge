import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white py-12">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-aos="fade-up">
          Ready to Join the Revolution in Education?
        </h2>
        <p className="text-lg text-gray-300 mb-8" data-aos="fade-up" data-aos-delay="200">
          Explore our platform and take the first step towards a new era of learning.
        </p>
        <Link to="/signup" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1" data-aos="zoom-in" data-aos-delay="400">
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default CallToActionSection;
