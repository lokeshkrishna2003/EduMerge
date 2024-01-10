import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiUser } from 'react-icons/fi';

AOS.init();

const VideoPlayer = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [customPlaybackRate, setCustomPlaybackRate] = useState(1);
  const [userName, setUserName] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/playlists/${playlistId}`);
        setPlaylist(response.data);
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

  const handlePlaybackRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    if (newRate && newRate > 0 && newRate <= 16) {
      setCustomPlaybackRate(newRate);
      if (videoRef.current) {
        videoRef.current.playbackRate = newRate;
      }
    }
  };

  const playNextVideo = () => {
    if (playlist && currentVideoIndex < playlist.links.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const playPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white p-4">
      <div className="text-center">
        <FiUser className="inline mr-2" />
        <span>{userName}</span>
      </div>

      <div className="video-player-container">
        <video
          ref={videoRef}
          src={playlist?.links[currentVideoIndex].url}
          controls
          className="w-full max-w-xl mx-auto my-4 rounded-lg shadow-lg"
        />

        <div className="flex justify-between items-center my-4">
          <button onClick={playPreviousVideo} className="p-2">
            <FiSkipBack />
          </button>

          <button onClick={playNextVideo} className="p-2">
            <FiSkipForward />
          </button>
        </div>

        <div className="text-center mb-4">
          <strong>Now Playing:</strong> {playlist?.links[currentVideoIndex].name}
        </div>

        <div className="flex justify-center items-center mb-4">
          <input
            type="number"
            min="0.1"
            max="16"
            step="0.1"
            value={customPlaybackRate}
            onChange={handlePlaybackRateChange}
            className="text-black p-2 w-20"
          />
          <span className="ml-2">x Playback Speed</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
