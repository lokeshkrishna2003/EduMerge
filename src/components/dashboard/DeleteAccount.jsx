import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaTrashAlt } from 'react-icons/fa';

const DeleteAccount = () => {
  const dummyUserData = { username: 'JohnDoe', email: 'johndoe@example.com' };
  const [userData] = useState(dummyUserData);

  const handleDelete = () => {
    console.log('Delete Account Initiated for:', userData);
    // Here you would handle the account deletion logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black" data-aos='zoom-out'>
      <div className="p-10 rounded-lg shadow-xl max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Delete Account</h2>
        <div className="mb-6">
          <FaUser className="inline-block text-gray-400 text-lg mr-2" />
          <span className="text-white text-lg">{userData.username}</span>
        </div>
        <div className="mb-6">
          <FaEnvelope className="inline-block text-gray-400 text-lg mr-2" />
          <span className="text-white text-lg">{userData.email}</span>
        </div>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-3 rounded-md hover:bg-red-700 transition duration-300 flex items-center justify-center w-full"
        >
          <FaTrashAlt className="mr-2" />
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
