import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Importing images
import image1 from '../../../images/image1.png';
import image2 from '../../../images/image2.png';
import image3 from '../../../images/image3.png';
import image4 from '../../../images/image4.png';
import image5 from '../../../images/image5.png';

const heroImages = [image1, image2, image3, image4, image5];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % heroImages.length);
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black min-h-screen  flex items-center justify-center" data-aos="fade-up" data-aos-duration="1000">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
      <div className="absolute top-4 left-0 w-full h-full z-10">
        {heroImages.map((image, index) => (
          <div 
            key={index}
            style={{ 
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentImage ? 0.3 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
            className="absolute top-0 left-0 w-full h-full">
          </div>
        ))}
      </div>
      <div className="text-center mx-auto p-4 space-y-4 relative z-20" style={{ maxWidth: '600px' }}>
  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up animate-pulse inline-block whitespace-normal">
    Transforming Education
  </h1>
  <p className="text-lg md:text-xl text-gray-300 mb-6 animate-fade-in-down animate-slide-up">
    A New Era of Learning Awaits.
  </p>
  <Link to="/auth?mode=signup" className="inline-block px-6 py-3 bg-violet-600 text-white font-semibold rounded hover:bg-violet-700 transition duration-500 ease-in-out animate-pop-in hover:animate-wiggle">
    Begin Your Journey
  </Link>
</div>
      
    </div>
  );
};

export default HeroSection;
