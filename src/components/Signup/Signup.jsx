import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import heroImage from '../../images/image2.png';

const Signup = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', userData);
      console.log('successful signup', response.data);
      // Additional success handling
    } catch (error) {
      console.log('signup error', error);
      // Additional error handling
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8 rounded-lg shadow-xl max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up for EduMerge Studio</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-300">
          Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
