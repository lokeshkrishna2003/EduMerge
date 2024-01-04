import React, { useState } from 'react';

const UpdateProfile = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // API call to update user details
    // On success or error, update state accordingly
    setIsLoading(false);
  };

  return (
    <div className="update-profile-form bg-gray-800 p-6 rounded-lg">
      <h2 className="text-white text-2xl mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 rounded mb-4"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 rounded mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
