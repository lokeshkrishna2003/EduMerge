import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiSkipBack, FiSkipForward, FiUser, FiLink } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

let player;

const VideoPlayer = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState({ links: [] });
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [userName, setUserName] = useState('');
    const [playbackRate, setPlaybackRate] = useState(1);
    const playerRef = React.createRef();
  
    // Fetch playlist and user data on component mount
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
              const response = await axios.get(`http://localhost:3001/user/playlist/${playlistId}`);
              // Ensure that the response contains the links and that they all have URLs
              if (response.data && response.data.links && response.data.links.every(link => link.url)) {
                setPlaylist(response.data);
              } else {
                console.error('Invalid playlist data:', response.data);
              }
            } catch (error) {
              console.error('Error fetching playlist', error);
            }
          };
  
      const fetchUserData = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
          try {
            const response = await axios.get(`http://localhost:3001/user/${userId}`);
            setUserName(response.data.username);
          } catch (error) {
            console.error('Error fetching user data', error);
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
    console.error('No playlist or playlist links are defined.');
    return;
  }

  // Get the current video URL, and check if it is defined.
  const currentVideoUrl = playlist.links[currentVideoIndex]?.url;
  if (!currentVideoUrl) {
    console.error(`The video URL at index ${currentVideoIndex} is undefined.`);
    return;
  }

  // Get the YouTube video ID from the URL.
  const videoId = getYoutubeVideoId(currentVideoUrl);
  if (!videoId) {
    console.error(`The YouTube video ID could not be extracted from the URL: ${currentVideoUrl}`);
    return;
  }
        
        // Everything is defined, so create the YouTube player.
  if (window.YT) {
    player = new window.YT.Player('player-container', {
      height: '360',
      width: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        origin: window.location.origin // Important for CORS
      },
      events: {
        onReady: (event) => {
          event.target.setPlaybackRate(playbackRate);
        },
      },
    });
  }
  
        // Update the global player reference
        window.player = player;
      };
  
      // Load the YouTube Iframe API if it hasn't been loaded yet
      if (!window.YT) { // Check if the API script is already loaded
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
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
    }, [playlist, currentVideoIndex, playbackRate]);
  
    const getYoutubeVideoId = (url) => {
        if (!url) return null; // Return null if the URL is undefined or invalid
      
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
      };
  
    const changeVideo = (index) => {
      setCurrentVideoIndex(index);
      if (window.player && window.player.loadVideoById) {
        const videoId = getYoutubeVideoId(playlist.links[index].url);
        window.player.loadVideoById({videoId: videoId});
      }
    };
  
    const changePlaybackRate = (rate) => {
      setPlaybackRate(rate);
      if (window.player && window.player.setPlaybackRate) {
        window.player.setPlaybackRate(rate);
      }
    };



    return (
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white p-4">
        <div className="text-center">
            <FiUser className="inline mr-2" />
            <span>{userName}</span>
        </div>

        <div className="video-player-container mx-auto max-w-4xl">
            <div id="player-container" ref={playerRef} className="w-full my-4 rounded-lg shadow-lg">
                {/* YouTube Player will be injected here by the YouTube Iframe API */}
            </div>

            <div className="flex justify-center gap-4 my-4">
                <button onClick={() => changeVideo(currentVideoIndex - 1 < 0 ? playlist.links.length - 1 : currentVideoIndex - 1)}
                    className="p-2 text-violet-500 hover:text-violet-700 transition duration-300">
                    <FiSkipBack size={24} />
                </button>
                <button onClick={() => changeVideo(currentVideoIndex + 1 >= playlist.links.length ? 0 : currentVideoIndex + 1)}
                    className="p-2 text-violet-500 hover:text-violet-700 transition duration-300">
                    <FiSkipForward size={24} />
                </button>
            </div>

            <div className="text-center mb-4">
                <strong>Now Playing:</strong> {playlist?.links[currentVideoIndex]?.name}
            </div>

            <div className="flex justify-center items-center mb-6">
                <input
                    type="range"
                    min="0.25"
                    max="2"
                    step="0.25"
                    value={playbackRate}
                    onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                    className="range range-primary w-1/2"
                />
                <span className="ml-2">{playbackRate.toFixed(2)}x Speed</span>
            </div>

            <div className="playlist-container bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl text-center font-semibold mb-5">Playlist</h3>
                <ul className="space-y-3">
                    {playlist?.links.map((link, index) => (
                        <li key={index}  className={`p-2 rounded-md hover:bg-gray-600 transition duration-300 ${index === currentVideoIndex ? 'bg-gray-800' : ''}`}
                            onClick={() => changeVideo(index)}>
                            <span className="font-semibold">{link.name}</span>
                            <span className="text-gray-400 text-sm ml-2">
                                <FiLink className="inline mr-1" />
                                {link.url}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    )

                    }

export default VideoPlayer;
