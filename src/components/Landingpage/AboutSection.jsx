import React from 'react';
import image from '../../images/blueshadeedumerge.png'

const AboutSection = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white py-12"> {/* Adjusted to bg-gray-900 for smoother color transition */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold" data-aos="fade-up">
            About EduMerge Studio
          </h2>
          <p className="mt-4 text-gray-400" data-aos="fade-up" data-aos-delay="200">
            Pioneering the Future of Education
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8" data-aos="fade-up" data-aos-delay="400">
          <div className="max-w-md">
            <p className="text-gray-300" data-aos="fade-in" data-aos-delay="600"> {/* Ensured consistency in animation */}
              At EduMerge Studio, we believe in the power of technology to transform learning experiences. Our mission is to create innovative educational solutions that engage, inspire, and empower learners and educators alike.
            </p>
          </div>
          <div className="w-[60vw] md:w-1/2 lg:w-1/3">
  <img src={image} alt="EduMerge Studio" className="rounded-[100vw] shadow-lg mx-auto" style={{ maxWidth: '100%', height: 'auto' }} data-aos="zoom-in" data-aos-delay="800"/>
</div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
