import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiUser } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const VideoPlayer = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/playlist/${playlistId}`);
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

  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const playNextVideo = () => {
    const newIndex = currentVideoIndex + 1 < playlist.links.length ? currentVideoIndex + 1 : 0;
    setCurrentVideoIndex(newIndex);
  };

  const playPreviousVideo = () => {
    const newIndex = currentVideoIndex > 0 ? currentVideoIndex - 1 : playlist.links.length - 1;
    setCurrentVideoIndex(newIndex);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white p-4">
      <div className="text-center">
        <FiUser className="inline mr-2" />
        <span>{userName}</span>
      </div>

      <div className="video-player-container">
        {playlist && playlist.links.length > 0 && (
          <iframe
            id="ytplayer"
            type="text/html"
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${getYoutubeVideoId(playlist.links[currentVideoIndex].url)}?autoplay=1`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}

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
      </div>
    </div>
  );
};

export default VideoPlayer;
