import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import isAuthenticated from "../../auth";
const UpdateProfile = () => {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's ID from local storage
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Fetch existing user data from the backend
      axios
        .get(`http://localhost:3001/user/${userId}`)
        .then((response) => {
          setUserData({
            username: response.data.username,
            email: response.data.email,
          });
        })
        .catch((error) => {
          setError("Failed to fetch user data");
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:3001/user/update-profile/${userId}`,
        userData
      );
      setSuccess("Profile updated successfully");
      //navigating user to dashboard after succesful updation of profile
      setTimeout(() => {
        if (isAuthenticated()) {
          navigate("/user/dashboard");
        }
      }, 1200);
    } catch (error) {
      setError("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"
      data-aos="zoom-out"
    >
      <div className="bg-gray-800 p-12 rounded-xl shadow-2xl max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Update Profile
        </h2>
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
          <div className=" flex justify-center items-center w-[100%] h-[5vh]  text-center">
            {error && (
              <div className="text-red-500  " data-aos="zoom-in">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-500 " data-aos="zoom-in">
                {success}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-8 py-4 rounded-full hover:bg-purple-600 transition duration-300 flex items-center justify-center text-lg"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
