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
import UpdateProfile from "./components/dashboard/UpdateProfile";
import ChangePassword from "./components/dashboard/ChangePassword";
import DeleteAccount from "./components/dashboard/DeleteAccount";
import CreatePlaylist from "./components/dashboard/CreatePlaylist";
import EditPlaylist from "./components/dashboard/EditPlaylist";
import DeletePlaylist from "./components/dashboard/DeletePlaylist";





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
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/update-profile" element={<UpdateProfile />} />
        <Route path="/user/change-password" element={<ChangePassword/>} />
        <Route path="/user/delete-account" element={<DeleteAccount/>} />
        <Route path="/user/create-playlist" element={<CreatePlaylist/>} />
        <Route path="/edit-playlist/:playlistId" element={<EditPlaylist/>} />
        <Route path="/delete-playlist/:playlistId" element={<DeletePlaylist/>} />

      </Routes>
    </Router>
  );
};

export default App;
