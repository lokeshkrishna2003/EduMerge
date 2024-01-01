// ProgressBar.js
import React, { useState, useEffect } from 'react';

const ProgressBar = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(30); // Initial progress when loading starts
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 90) {
            clearInterval(timer);
            return 100;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
      return () => clearInterval(timer);
    } else {
      setProgress(100); // Complete the progress when loading ends
      const timer = setTimeout(() => setProgress(0), 100); // Reset after some delay
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div 
      className="fixed top-1 left-0 z-50 h-[8px] bg-[#6D27D9] transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}>
    </div>
  );
};

export default ProgressBar;
