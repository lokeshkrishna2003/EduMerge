import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Signup = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', userData);
      // Handle successful signup (e.g., display success message, redirect to login)
      console.log('successful signup')
      console.log(response.data);
    } catch (error) {
      // Handle errors (e.g., display error message)
      console.log('error')
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-10 text-gray-700">Sign Up for EduMerge Studio</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          <button type="submit" className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200">Sign Up</button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-400">Already have an account? <Link to="/login" className="text-indigo-500 hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
