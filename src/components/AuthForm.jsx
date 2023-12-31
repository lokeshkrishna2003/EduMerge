import React, { useState } from 'react';
import Login from './login/Login';
import Signup from './Signup/Signup';
import './Signup/auth.css'
import heroImageLogin from '../images/image3.png'; // Image for Login
import heroImageSignup from '../images/image2.png'; // Image for Signup
import { useLocation } from 'react-router-dom';

const AuthForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isLogin = searchParams.get('mode') === 'login';



  return (
<div className="flex bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen">
      <div className="w-1/2 relative overflow-hidden" data-aos='zoom-in'>
<img src={isLogin?heroImageLogin:heroImageSignup} className='image-animation w-full h-full rounded-[40vw]' alt="heroimagealt" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-5xl font-bold">{isLogin ? 'Welcome Back!' : 'Join Us!'}</p>
        </div>
      </div>
      <div className="w-1/2 bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center" data-aos='fade-left'>
        {isLogin ? <Login  /> : <Signup  />}
      </div>
    </div>
  );
};

export default AuthForm;
