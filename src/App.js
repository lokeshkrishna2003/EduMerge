import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";




import VideoSubmission from "./components/VideoSubmission";
import LandingPage from "./components/Landingpage/LandingPage";
import AuthForm from "./components/AuthForm";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/submit-video" element={<VideoSubmission />} />
      </Routes>
    </Router>
  );
};

export default App;
