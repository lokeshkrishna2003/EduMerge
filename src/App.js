import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import VideoSubmission from "./components/VideoSubmission";
import LandingPage from "./components/Landingpage/LandingPage";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/submit-video" element={<VideoSubmission />} />
      </Routes>
    </Router>
  );
};

export default App;
