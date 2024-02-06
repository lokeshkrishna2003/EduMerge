import React from "react";
import Login from "./login/Login";
import Signup from "./Signup/Signup";
import "./Signup/auth.css";
import heroImageLogin from "../images/image3.png"; // Image for Login
import heroImageSignup from "../images/image2.png"; // Image for Signup
import { useLocation } from "react-router-dom";

const AuthForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isLogin = searchParams.get("mode") === "login";

  return (
    <div className="flex bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen md:flex-row">
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <img
          src={isLogin ? heroImageLogin : heroImageSignup}
          className="image-animation w-full h-full rounded-[40vw]"
          alt="heroimagealt"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-5xl font-bold">
            {isLogin ? "Welcome Back!" : "Join Us!"}
          </p>
        </div>
      </div>
      <div className="md:hidden absolute inset-0 z-0">
        <img
          src={isLogin ? heroImageLogin : heroImageSignup}
          className="w-full h-full object-cover opacity-50"
          alt="Background"
        />
      </div>
      <div className="md:w-1/2 w-full h-full flex items-center justify-center min-h-screen z-10">
        <div className={`w-full ${isLogin ? 'px-5' : 'px-10'} py-8 md:py-0`}>
          {isLogin ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
