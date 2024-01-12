import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../../auth";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userId = localStorage.getItem("userId");

      await axios.put(`http://localhost:3001/user/change-password/${userId}`, {
        userId,
        ...passwordData,
      });

      setSuccess("Password updated successfully.");
      // Clear form fields after successful update
      setPasswordData({ oldPassword: "", newPassword: "" });
      // Redirect to the landingpage after succesful changing of password
      setTimeout(() => {
        navigate("/");
      }, 1200);
      //clearing the local storage after changing the password
      localStorage.clear();
    } catch (error) {
      setError("Failed to update password. " + (error.response?.data || ""));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-12 rounded-xl shadow-2xl max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Change Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative border-b-2 border-gray-300 focus-within:border-purple-500">
            <FaLock className="absolute left-0 top-3 text-gray-400 group-focus-within:text-purple-500 text-xl" />
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handleChange}
              placeholder="Old Password"
              className="pl-10 pr-4 py-3 w-full bg-transparent border-none text-white focus:outline-none text-lg"
            />
          </div>
          <div className="group relative border-b-2 border-gray-300 focus-within:border-purple-500">
            <FaLock className="absolute left-0 top-3 text-gray-400 group-focus-within:text-purple-500 text-xl" />
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="pl-10 pr-4 py-3 w-full bg-transparent border-none text-white focus:outline-none text-lg"
            />
          </div>
          {error && (
            <div
              className="text-red-500 mt-4 w-[100%] mb-6 text-center"
              data-aos="zoom-in"
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="text-green-500 mt-4 mb-6 text-center"
              data-aos="zoom-in"
            >
              {success}
            </div>
          )}
          <button
            type="submit"
            className="bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition duration-300 flex items-center justify-center w-full text-lg"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
