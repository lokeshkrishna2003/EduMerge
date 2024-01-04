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
      <div className="bg-gray-800 p-12 rounded-xl shadow-2xl max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative border-b-2 border-gray-300 focus-within:border-purple-500">
            <FaUser className="absolute left-0 top-3 text-gray-400 group-focus-within:text-purple-500 text-xl" />
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Username"
              className="pl-10 pr-4 py-3 w-full bg-transparent border-none text-white focus:outline-none text-lg"
            />
          </div>
          <div className="group relative border-b-2 border-gray-300 focus-within:border-purple-500">
            <FaEnvelope className="absolute left-0 top-3 text-gray-400 group-focus-within:text-purple-500 text-xl" />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              className="pl-10 pr-4 py-3 w-full bg-transparent border-none text-white focus:outline-none text-lg"
            />
          </div>
          {error && <div className="text-red-500 mt-4 mb-6 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-8 py-4 rounded-full hover:bg-purple-600 transition duration-300 flex items-center justify-center w-full text-lg"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
