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





const App = () => {
  const [isLoading, setLoading] = useState(false);

  
  useEffect(() => {
    AOS.init();
  }, []);

 


  return (
    <Router>
      <RouteChangeListener setLoading={setLoading} />
      <ScrollProgress />


<ProgressBar isLoading={isLoading} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/submit-video" element={<VideoSubmission />} />
      </Routes>
    </Router>
  );
};

export default App;
