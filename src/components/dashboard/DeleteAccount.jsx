import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEnvelope, FaTrash } from 'react-icons/fa';
import { useNavigate} from 'react-router-dom';

import axios from 'axios';
import isAuthenticated from '../../auth';

const DeleteAccount = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/'); // Redirect to landing page if not authenticated
    } else {
      const fetchUserData = async () => {
        try {
          const userId = localStorage.getItem('userId');
          const response = await axios.get(`http://localhost:3001/user/${userId}`);
          setUserData(response.data);
        } catch (error) {
          setError('Failed to fetch user data. ' + (error.response?.data || ''));
        }
      };

      fetchUserData();
    }
  }, [navigate]);


  const handleDelete = async () => {
    setError('');
    setSuccess('');

    try {
      const userId = localStorage.getItem('userId');
      await axios.delete(`http://localhost:3001/user/delete-account/${userId}`, { data: { userId } });

      setSuccess('Account deleted successfully.');
      // Clear local storage and redirect as needed
      localStorage.removeItem('userId');
      // Redirect to the login page or landing page
      navigate('/');
    } catch (error) {
      setError('Failed to delete account. ' + (error.response?.data || ''));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-12 rounded-xl shadow-2xl max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <FaUserCircle className="text-8xl text-purple-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">{userData.username}</h2>
          <p className="text-lg text-gray-400">{userData.email}</p>
        </div>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-500 mb-4 text-center">{success}</div>}
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
