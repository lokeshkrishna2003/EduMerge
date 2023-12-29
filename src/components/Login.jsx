import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import { Link } from "react-router-dom";

// import axios from

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
const navigate = useNavigate(); // Import the useNavigate hook from react-router-dom


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        credentials
      );
      // Handle response, assuming successful login

      navigate('/submit-video'); // Navigate to VideoSubmission page

      // Handle response, set user session, redirect, etc.
      console.log("successful login :", response.data);
      
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-10 text-gray-700">
          Login to EduMerge Studio
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username or Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
