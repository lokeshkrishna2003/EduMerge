import React, { useState, useRef, useEffect } from "react";
import PlaylistCard from "./PlaylistCard"; // Ensure correct path
import { IoPersonCircle, IoLogOut, IoSettingsSharp } from "react-icons/io5";
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init();

const UserDashboard = () => {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef();

  // Greeting function
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Sample playlist data
  const playlists = [
    { id: 1, name: "Chill Vibes",videoCount:'10' },
    { id: 2, name: "Workout Hits",videoCount:'7' },
    { id: 3, name: "Study Tunes",videoCount:'15' },
    { id: 4, name: "Party Mix" ,videoCount:'9'},
    { id: 5, name: "Old Classics",videoCount:'4' },
  ];

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsRef]);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      {/* Navbar */}
      <nav className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <IoPersonCircle
            size={30}
            className="mr-2 hover:rotate-12 transition-transform duration-300"
          />
          <span className="hover:scale-105 transition-transform duration-300">
            User Name
          </span>
        </div>
        <div className="flex gap-10 relative" ref={settingsRef}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center text-white hover:text-gray-300 transition duration-300"
          >
            <IoSettingsSharp size={20} className="mr-2" />
            Settings
          </button>
          {showSettings && (
            <div className="absolute right-[6rem] mt-12 py-5 w-48 border-1 bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl transition-all ease-in-out duration-300"
            >
            <ul>
                <li className="block px-4 py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-500">
                    Change Password
                </li>
                <li className="block px-4 py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-500">
                    Change Username
                </li>
                <li className="block px-4 py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-500">
                    Change Email
                </li>
                <li className="block px-4 py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-500">
                    Delete Account
                </li>
            </ul>
        </div>
        
          )}
          <button className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            <IoLogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
      </nav>

      {/* Greeting */}
      <div className="text-center mt-10">
        <h1 className="text-4xl">{`${getGreeting()}, User!`}</h1>
      </div>

      {/* Playlist Section */}
      <div className="mt-10 p-4">
        <h2 className="text-2xl mb-4">Your Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} name={playlist.name} videoCount={playlist.videoCount} />
          ))}
        </div>

        {/* Create Playlist Button */}
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Create Playlist
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;