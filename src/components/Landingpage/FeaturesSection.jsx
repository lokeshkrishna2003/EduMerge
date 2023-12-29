import React from 'react';

const FeatureCard = ({ title, description, icon }) => (
  <div className="text-center bg-gradient-to-r from-gray-900 to-black p-4 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition duration-500 ease-in-out">
    <div className="text-4xl text-violet-600 mb-4">
      <i className={icon}></i> {/* Icon placeholder */}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold" data-aos="fade-up">
            Our Features
          </h2>
          <p className="mt-4 text-gray-400" data-aos="fade-up" data-aos-delay="200">
            Innovative Solutions for Modern Education
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="zoom-in-up" data-aos-delay="400">
          {/* Replace with actual features and icons */}
          <FeatureCard 
            icon="example-icon-class"
            title="Interactive Learning"
            description="Engage with dynamic, interactive content that makes learning a joy."
          />
          <FeatureCard 
            icon="example-icon-class"
            title="Cutting-Edge Technology"
            description="Utilize the latest in technology to enhance educational experiences."
          />
          <FeatureCard 
            icon="example-icon-class"
            title="Accessible Anywhere"
            description="Learn and teach from anywhere in the world, at any time."
          />
          {/* Add more FeatureCard components as needed */}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
