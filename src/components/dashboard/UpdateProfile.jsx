import React, { useState } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';

const UpdateProfile = () => {
  const dummyUserData = { username: 'JohnDoe', email: 'johndoe@example.com' };
  const [userData, setUserData] = useState(dummyUserData);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updated Data:', userData);
    // Here you would handle form submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black" data-aos='zoom-out'>
      <div className="p-8 rounded-lg shadow-xl max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="group relative border-b-2 border-gray-300 focus-within:border-purple-500">
            <FaUser className="absolute left-0 top-2 text-gray-400 group-focus-within:text-purple-500" />
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Username"
              className="pl-8 pr-4 py-2 w-full bg-transparent border-none text-white focus:outline-none"
            />
          </div>
          <div className="group relative border-b-2 border-gray-300 focus-within:border-purple-500">
            <FaEnvelope className="absolute left-0 top-2 text-gray-400 group-focus-within:text-purple-500" />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              className="pl-8 pr-4 py-2 w-full bg-transparent border-none text-white focus:outline-none"
            />
          </div>
          {error && <div className="text-red-500 mt-3 mb-4 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
          >
            Update
          </button>
        </form>
        {/* Additional content can go here */}
      </div>
    </div>
  );
};

export default UpdateProfile;
