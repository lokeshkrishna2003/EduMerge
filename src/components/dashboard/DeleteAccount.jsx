import React, { useState } from 'react';
import { FaUserCircle, FaEnvelope, FaTrash } from 'react-icons/fa';

const DeleteAccount = () => {
  const dummyUserData = { username: 'JohnDoe', email: 'johndoe@example.com' };
  const [userData] = useState(dummyUserData);

  const handleDelete = () => {
    console.log('Delete Account Initiated for:', userData);
    // Handle account deletion logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-12 rounded-xl shadow-2xl max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <FaUserCircle className="text-8xl text-purple-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">{userData.username}</h2>
          <p className="text-lg text-gray-400">{userData.email}</p>
        </div>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition duration-300 flex items-center justify-center w-full text-lg"
        >
          <FaTrash className="mr-3" />
          Delete Account
        </button>
        <p className="text-red-300 text-md text-center mt-5">
          Warning: This action cannot be undone.
        </p>
      </div>
    </div>
  );
};

export default DeleteAccount;
