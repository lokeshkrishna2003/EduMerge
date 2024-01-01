// RouteChangeListener.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteChangeListener = ({ setLoading }) => {
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return null; // This component doesn't render anything
};

export default RouteChangeListener;
