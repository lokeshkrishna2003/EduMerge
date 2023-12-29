import React from 'react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    
    <footer className="bg-gradient-to-r from-gray-900 to-gray-950 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold">
              EduMerge Studio
            </Link>
          </div>
          <div className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-start space-x-6">
              <li><Link to="/about" className="hover:text-gray-400 transition duration-300">About</Link></li>
              <li><Link to="/services" className="hover:text-gray-400 transition duration-300">Services</Link></li>
              <li><Link to="/contact" className="hover:text-gray-400 transition duration-300">Contact</Link></li>
              {/* Add more links as needed */}
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8">
          © {new Date().getFullYear()} EduMerge Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
