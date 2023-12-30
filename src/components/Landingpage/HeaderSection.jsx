import React from 'react';
import { Link } from 'react-router-dom';


const HeaderSection = () => {
  return (
    <header className="bg-gradient-to-r  from-gray-800 to-black shadow-xl" data-aos="zoom-out-down" data-aos-duration="1000">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold text-white" data-aos="fade-right" data-aos-delay="500">
          <Link to="/" className="hover:underline decoration-2 underline-offset-4 transition duration-500 ease-in-out">
            EduMerge Studio
          </Link>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6" data-aos="fade-left" data-aos-delay="500">
          <Link to="/auth?mode=login" className="text-white bg-transparent border border-white hover:bg-white hover:text-gray-800 px-4 py-2 rounded-lg shadow transition duration-500 ease-in-out transform hover:scale-110 hover:shadow-lg">
            Login
          </Link>
          <Link to="/auth?mode=signup" className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow transition duration-500 ease-in-out hover:-rotate-2 hover:shadow-xl">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderSection;
