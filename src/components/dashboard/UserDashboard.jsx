import React, { useState, useRef, useEffect } from "react";
import PlaylistCard from "./PlaylistCard"; // Ensure correct path


import { IoPersonCircle, IoLogOut, IoSettingsSharp } from "react-icons/io5";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { FiPlus } from "react-icons/fi"; // Importing plus icon

import "aos/dist/aos.css";
import AOS from "aos";

import isAuthenticated from "../../auth";


AOS.init();

const UserDashboard = () => {
    const [userName, setUsername] = useState("");
    
    const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef();
  const [playlists, setPlaylists] = useState([]);

  // Greeting function
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 16) return "Good Afternoon";
    return "Good Evening";
  };

  // Sample playlist data
  // const playlists = [
  //   { id: 1, name: "Chill Vibes", videoCount: "10" },
  //   { id: 2, name: "Workout Hits", videoCount: "7" },
  //   { id: 3, name: "Study Tunes", videoCount: "15" },
  //   { id: 4, name: "Party Mix", videoCount: "9" },
  //   { id: 5, name: "Old Classics", videoCount: "4" },
  // ];

  const handleEditPlaylist = (playlistId) => {
    // Handle the edit action with the specific playlistId
    console.log(`Edit playlist with id ${playlistId}`);
    // You can navigate to the edit page or perform any other action
    navigate(`/edit-playlist/${playlistId}`)
  };

  const handleDeletePlaylist = (playlistId) => {
    navigate(`/delete-playlist/${playlistId}`)
  };

  const handleCreatePlaylist = () => {
//navigating to create playlist page
    navigate('/user/create-playlist');
    
  };

  const handleClickPlaylist =(playlistId)=>{
    navigate(`/video-player/${playlistId}`);
  }

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

  useEffect(() => {
    // Redirect to landing page if not authenticated
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  //useeffect hook for fetching playlists from backend

  useEffect(() => {
   

    const fetchPlaylists = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3001/user/playlists/${userId}`);
          setPlaylists(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching playlists', error);
          // Handle error appropriately
        }
      }
    };

    fetchPlaylists();
  }, []); // Add dependencies if necessary


  const handleLogout = () => {
    // Clear user data from local storage or other session management
    localStorage.removeItem('userId');

    // Navigate to the landing page or login page
    navigate('/');
  };


  // Fetch user details from backend
  useEffect(() => {
    const fetchUserData = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:3001/user/${userId}`);
                setUsername(response.data.username); // Assuming the username field is called 'username'

            } catch (error) {
                console.error('Error fetching user data', error);
                // Handle error appropriately
            }
        }
    };

    fetchUserData();
}, []);

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
            {userName}
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
            <div className="absolute right-[6rem] mt-12 py-5 w-48 border-1 bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl transition-all ease-in-out duration-300">
              <ul>
                <li className="block px-4 py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-500">
                    <Link to='/user/change-password' >

                  Change Password
                    </Link>
                </li>
                <li className="block px-4 py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-500">
                    <Link to='/user/update-profile' >

                  Update Profile
                    </Link>
                </li>
                
            
                <li className="block px-4 py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-500">
                    <Link to='/user/delete-account' >

                  Delete Account
                    </Link>
                

                </li>
              </ul>
            </div>
          )}
          <button onClick={handleLogout} className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            <IoLogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
      </nav>

      {/* Greeting */}
      <div className="text-center mt-10">
        <h1 className="text-4xl">{`${getGreeting()}, ${userName}!`}</h1>
      </div>

      {/* Playlist Section */}
      <div className="mt-10 p-4">
        <h2 className="text-2xl mb-4">Your Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.length !== 0 ?(
            <>
            {playlists.map((playlist) => (
            
            <PlaylistCard
              key={playlist._id}
              name={playlist.playlistName}
              videoCount={playlist.links.length}
              onEdit={() => handleEditPlaylist(playlist._id)}
              onDelete={() => handleDeletePlaylist(playlist._id)}
              onClickPlaylist={()=> handleClickPlaylist(playlist._id)}
            />
            
          ))}
            </>
          ):(
          <div className="flex justify-center items-center w-[100%] h-[5vh]  text-center" >
          <div className=" text-gray-500" data-aos='zoom-in'>No playlists found</div>
          </div>
          )}
        </div>

        {/* Floating Action Button */}
        <button
          onClick={handleCreatePlaylist}
          className="fixed right-8 bottom-8 bg-purple-500 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 "
        
        >

          <FiPlus size={35} className="animate-bounce" />

        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
