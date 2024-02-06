import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import "./visitorstats.css";

const VisitorStatsSection = () => {
  const [visitorCount, setVisitorCount] = useState(12345); // Mock visitor count
  const [registrationCount, setRegistrationCount] = useState(678); // Mock registration count

  useEffect(() => {
    // Simulate fetching data from an API
    fetch('https://edumerge-studio-backend.onrender.com/users').then(response=>{
      if(!response.ok){
        throw Error(response.statusText);
        return response.json();
      }
    }).then(data=>{
      setRegistrationCount(data.length);
    setVisitorCount(data.length+17);

    })
    // Replace the following with actual API calls
    
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white text-center py-4 flex justify-around items-center">
      <div className="animate-scoreboard">
        <h3>Total Website Visitors</h3>
        <CountUp end={visitorCount} duration={2.5} separator="," />
      </div>
      <div className="animate-scoreboard">
        <h3>Total Registrations</h3>
        <CountUp end={registrationCount} duration={2.5} separator="," />
      </div>
    </div>
  );
};

export default VisitorStatsSection;
