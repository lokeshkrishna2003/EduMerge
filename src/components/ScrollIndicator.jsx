// ScrollIndicator.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollIndicator = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Define non-scrollable routes
  const nonScrollableRoutes = ['auth?mode=login', '/sauth?mode=signup' , '/user/update-profile'];

  useEffect(() => {
    const checkScrollable = () => {
      // Disable the indicator on specific non-scrollable routes
      if (nonScrollableRoutes.includes(location.pathname)) {
        setIsVisible(false);
        return;
      }

      // Calculate scrollability
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const isScrollable = scrollHeight > viewportHeight + 60;
      setIsVisible(isScrollable);
    };

    const onScroll = () => {
      const nearTop = window.scrollY < 50;
      setIsVisible(nearTop);
    };

    // Perform the scrollability check with a slight delay for dynamic content
    setTimeout(checkScrollable, 100);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', checkScrollable);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkScrollable);
    };
  }, [location.pathname]); // React to route changes

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-20">
      <div className="animate-ping">
        <span className="text-2xl text-white">↓ Scroll</span>
      </div>
    </div>
  );
};

export default ScrollIndicator;
