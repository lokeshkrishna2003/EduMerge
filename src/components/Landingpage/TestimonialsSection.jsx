import React from 'react';

const TestimonialCard = ({ quote, author }) => (
  <div className="text-center p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
    <blockquote className="text-gray-300 italic mb-4">"{quote}"</blockquote>
    <cite className="text-gray-400 not-italic">- {author}</cite>
  </div>
);

const TestimonialsSection = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold" data-aos="fade-up">
            What People Say About Us
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="zoom-in-up" data-aos-delay="400">
          {/* Example Testimonials */}
          <TestimonialCard 
            quote="EduMerge Studio has revolutionized our learning experience. Highly recommend!"
            author="Jane Doe"
          />
          <TestimonialCard 
            quote="The interactive tools provided are unmatched. Truly a game-changer in education."
            author="John Smith"
          />
          <TestimonialCard 
            quote="A fantastic platform that has brought creativity back into classrooms."
            author="Emma Wilson"
          />
          {/* Add more TestimonialCard components as needed */}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
