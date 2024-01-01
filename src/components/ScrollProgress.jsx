// ScrollProgress.js
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ScrollProgress = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    AOS.init();

    const onScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollPercent(Math.round((currentScroll / scrollTotal) * 100));
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-[90%] left-[95%] z-20 -translate-x-1/2 -translate-y-1/2 w-20 h-20">
      <svg className="transform -rotate-90" width="80" height="80" viewBox="0 0 80 80">
        <circle className="text-gray-300" strokeWidth="5" stroke="currentColor" fill="transparent" r="35" cx="40" cy="40" />
        <circle className="text-violet-500" strokeWidth="5" strokeDasharray="219.91" strokeDashoffset={`${219.91 - (219.91 * scrollPercent) / 100}`} strokeLinecap="round" stroke="currentColor" fill="transparent" r="35" cx="40" cy="40" />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-violet-500 text-xl">
        {scrollPercent}%
      </div>
    </div>
  );
};

export default ScrollProgress;
