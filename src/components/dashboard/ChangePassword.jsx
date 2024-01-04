import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Password Data:', passwordData);
    // Here you would handle the password change logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black" data-aos='zoom-out'>
      <div className="p-10 rounded-lg shadow-xl max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative border-b-2 border-gray-300 focus-within:border-purple-500">
            <FaLock className="absolute left-0 top-3 text-gray-400 group-focus-within:text-purple-500" />
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handleChange}
              placeholder="Old Password"
              className="pl-10 pr-4 py-3 w-full bg-transparent border-none text-white focus:outline-none"
            />
          </div>
          <div className="group relative border-b-2 border-gray-300 focus-within:border-purple-500">
            <FaLock className="absolute left-0 top-3 text-gray-400 group-focus-within:text-purple-500" />
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="pl-10 pr-4 py-3 w-full bg-transparent border-none text-white focus:outline-none"
            />
          </div>
          {error && <div className="text-red-500 mt-4 mb-6 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-4 py-3 rounded-md hover:bg-purple-600 transition duration-300"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
