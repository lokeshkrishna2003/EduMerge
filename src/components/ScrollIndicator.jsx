// ScrollIndicator.js
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ScrollIndicator = () => {
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    AOS.init();

    const checkScrollable = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrollable(scrollTotal > 0);
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);

    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  if (!isScrollable) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-20" data-aos="fade-up">
      <div className="animate-bounce">
        {/* Your scroll indicator icon or text here */}
        <span className="text-2xl text-white">↓ Scroll</span>
      </div>
    </div>
  );
};

export default ScrollIndicator;
