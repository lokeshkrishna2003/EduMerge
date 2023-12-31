import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // New state for error messages

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); //Reset error message on new submission or Clears any existing error messages
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        credentials
      );
      navigate("/submit-video");
      console.log("successful login:", response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data); // Set the error message from response
      } else {
        setError("An error occurred during login."); // Fallback error message
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" data-aos='zoom-out'>
      <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8 rounded-lg shadow-xl max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login to EduMerge Studio
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username or Email"
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
          >
            Login
          </button>
          <div className="w-full mt-3 h-4">
            {error && (
              <div className="text-red-500 mb-4 text-center" data-aos="zoom-in">
                {error}
              </div>
            )}{" "}
            {/* Error message display */}
          </div>
        </form>
        <p className="mt-6 text-sm text-center text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/auth?mode=signup"
            className="text-purple-400 hover:text-purple-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
