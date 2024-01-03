import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";




import AOS from "aos";
import "aos/dist/aos.css";

import VideoSubmission from "./components/VideoSubmission";
import LandingPage from "./components/Landingpage/LandingPage";
import AuthForm from "./components/AuthForm";


import ProgressBar from "./components/ProgressBar";
import RouteChangeListener from "./RouteChangeListener";
import ScrollProgress from "./components/ScrollProgress";
import ScrollIndicator from "./components/ScrollIndicator";
import UserDashboard from "./components/dashboard/UserDashboard";





const App = () => {
  const [isLoading, setLoading] = useState(false);

  
  useEffect(() => {
    AOS.init();
  }, []);

 


  return (
    <Router>
      <RouteChangeListener setLoading={setLoading} />
      <ScrollProgress />
      <ScrollIndicator />

<ProgressBar isLoading={isLoading} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthForm />} />
        {/* <Route path="/submit-video" element={<VideoSubmission />} /> */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
