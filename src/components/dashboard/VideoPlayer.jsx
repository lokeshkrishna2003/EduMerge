import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FiSkipBack,
  FiSkipForward,
  FiUser,
  FiLink,
  FiHome,
} from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import isAuthenticated from "../../auth";
import ProgressIndicator from "../loader/ProgressIndicator";

AOS.init();

let player;

const VideoPlayer = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState({ links: [] });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loading, setLoading] = useState(false);
  const playerRef = React.createRef();

  // Fetch playlist and user data on component mount
  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://edumerge-studio-backend.onrender.com/user/playlist/${playlistId}`
        );
        // Ensure that the response contains the links and that they all have URLs
        if (
          response.data &&
          response.data.links &&
          response.data.links.every((link) => link.url)
        ) {
          setPlaylist(response.data);
          console.log(response.data);
        } else {
          console.error("Invalid playlist data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching playlist", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(
            `https://edumerge-studio-backend.onrender.com/user/${userId}`
          );
          setUserName(response.data.username);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };

    fetchPlaylist();
    fetchUserData();
  }, [playlistId]);

  // This effect manages the loading of the YouTube Iframe API and the player initialization
  useEffect(() => {
    // Function to initialize the YouTube player
    const initializePlayer = () => {
      if (!window.YT) return;

      // Check if the playlist is defined and has links.
      if (!playlist || !playlist.links || !playlist.links.length) {
        console.error("No playlist or playlist links are defined.");
        return;
      }

      // Get the current video URL, and check if it is defined.
      const currentVideoUrl = playlist.links[currentVideoIndex]?.url;
      if (!currentVideoUrl) {
        console.error(
          `The video URL at index ${currentVideoIndex} is undefined.`
        );
        return;
      }

      // Get the YouTube video ID from the URL.
      const videoId = getYoutubeVideoId(currentVideoUrl);
      if (!videoId) {
        console.error(
          `The YouTube video ID could not be extracted from the URL: ${currentVideoUrl}`
        );
        return;
      }

      // Everything is defined, so create the YouTube player.
      if (window.YT) {
        player = new window.YT.Player("player-container", {
          height: "500",
          width: "100%",
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            origin: window.location.origin, // Important for CORS
          },
          events: {
            onReady: (event) => {
              event.target.setPlaybackRate(playbackRate);
            },
            onStateChange: onPlayerStateChange,
          },
        });
      }

      // Update the global player reference
      window.player = player;
    };

    // Load the YouTube Iframe API if it hasn't been loaded yet
    if (!window.YT) {
      // Check if the API script is already loaded
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      // If the script is already loaded, we can just initialize the player
      initializePlayer();
    }

    // Cleanup function to destroy player on unmount
    return () => {
      if (window.player) {
        window.player.destroy();
      }
    };
  }, [playlist, currentVideoIndex]);

  const getYoutubeVideoId = (url) => {
    if (!url) return null; // Return null if the URL is undefined or invalid

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const changeVideo = (index) => {
    setCurrentVideoIndex(index);
    if (window.player && window.player.loadVideoById) {
      const videoId = getYoutubeVideoId(playlist.links[index].url);
      window.player.loadVideoById({ videoId: videoId });
    }
  };

  const changePlaybackRate = (rate) => {
    console.log(`Changing playback rate to: ${rate}`); // Add this line
    setPlaybackRate(rate);
    if (window.player && window.player.setPlaybackRate) {
      window.player.setPlaybackRate(rate);
    }
  };

  // Function to handle video end and play the next video
  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      let newIndex = currentVideoIndex + 1;
      if (newIndex >= playlist.links.length) {
        newIndex = 0; // Loop back to the first video
      }
      changeVideo(newIndex);
    }
  };

  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (isAuthenticated()) {
      setTimeout(() => {
        navigate("/user/dashboard"); // routing to our dashboard
      }, 1000);
    } else {
      setTimeout(() => {
        navigate("/auth?mode=login"); // routing to our landing page
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-900 to-black min-h-screen">
      {/* Navbar at the top */}
      <nav className="bg-gradient-to-br from-gray-900 to-black p-4 text-white fixed w-full z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side - Logo/Brand Name */}
          <div className="flex items-center">
            <span
              onClick={handleDashboardClick}
              className="text-xl font-semibold hover:text-purple-300 transition duration-300 ease-in-out cursor-pointer"
            >
              EduMerge Studio
            </span>
          </div>

          {/* User Info */}
          <div className="flex items-center hover:text-purple-400  transition duration-300 ease-in-out">
            <FiUser className="text-lg text-purple-400 mr-2 hover:rotate-12" />
            <span className="hover:scale-110 transition duration-0">
              {userName}
            </span>
          </div>

          <div className="flex items-center">
            {/* Dashboard Button */}
            <button
              onClick={handleDashboardClick}
              className="flex items-center  bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 hover:scale-105 hover:rotate-1 transition duration-300 cursor-pointer"
            >
              <FiHome className="text-lg text-grey-400 mr-1" />
              <span className="hover">Dashboard</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow pt-16">
        {" "}
        {/* pt-16 to push the content below the fixed navbar */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            {/* Video Player and Controls Container */}
            <div className="lg:flex-grow mb-4 lg:mb-0">
              {/* Video Player */}
              <div
                id="player-container"
                ref={playerRef}
                className="aspect-video w-full rounded-lg shadow-lg"
              >
                {/* YouTube Player will be injected here by the YouTube Iframe API */}
              </div>

              <div className="text-center my-4">
                <strong className="text-xl text-white">Now Playing:</strong>
                <span className="text-xl text-gray-400 ml-2">
                  {playlist?.links[currentVideoIndex]?.name}
                </span>
              </div>

              {/* Playback Controls */}
              <div className="flex justify-center lg:justify-start gap-5 mt-4">
                <button
                  onClick={() =>
                    changeVideo(
                      currentVideoIndex - 1 < 0
                        ? playlist.links.length - 1
                        : currentVideoIndex - 1
                    )
                  }
                  className="bg-purple-600 hover:bg-purple-800 p-2 rounded-full transition duration-300 ease-in-out"
                >
                  <FiSkipBack size={24} className="text-white" />
                </button>
                <button
                  onClick={() =>
                    changeVideo(
                      currentVideoIndex + 1 >= playlist.links.length
                        ? 0
                        : currentVideoIndex + 1
                    )
                  }
                  className="bg-purple-600 hover:bg-purple-800 p-2 rounded-full transition duration-300 ease-in-out"
                >
                  <FiSkipForward size={24} className="text-white" />
                </button>
              </div>

              <div className="mb-4 flex justify-center mt-3">
                <label
                  htmlFor="speed-control"
                  className="text-white font-medium mr-2"
                >
                  Speed:
                </label>
                <input
                  id="speed-control"
                  type="range"
                  min="0.25"
                  max="2"
                  step="0.01"
                  value={playbackRate}
                  onChange={(e) =>
                    changePlaybackRate(parseFloat(e.target.value))
                  }
                  className="range purple"
                />
                <span className="ml-2 text-white">
                  {playbackRate.toFixed(2)}x
                </span>
              </div>
            </div>

            {/* Playlist */}

            {loading ? (
              <ProgressIndicator />
            ) : (
              <>
                <div className="lg:max-w-md bg-gray-800 p-4 rounded-lg overflow-y-auto">
                  <h3 className="text-xl text-white font-semibold mb-5">
                    {playlist?.playlistName || "Playlist"}
                  </h3>
                  <ul className="space-y-3">
                    {playlist?.links.map((link, index) => (
                      <li
                        key={index}
                        className={`p-2 rounded-m bg-gray-700 hover:bg-gray-600 rounded-md cursor-pointer transition duration-300 ease-in-out ${
                          index === currentVideoIndex ? "bg-gray-900" : ""
                        }`}
                        onClick={() => changeVideo(index)}
                        
                      >
                        <span className="font-semibold text-white">
                          {link.name} -{" "}
                        </span>
                        <span className="text-gray-400 text-sm ml-2">
                          <FiLink className="inline mr-1 text-purple-500" />
                          {link.url}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
