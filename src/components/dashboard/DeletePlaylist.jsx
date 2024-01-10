import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeletePlaylist = () => {
  const [playlistData, setPlaylistData] = useState({ name: '', videoCount: 0 });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { playlistId } = useParams();

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/playlist/${playlistId}`);
        setPlaylistData({
          name: response.data.playlistName,
          videoCount: response.data.links.length,
        });
      } catch (error) {
        setError('Failed to fetch playlist data. ' + (error.response?.data || ''));
      }
    };

    fetchPlaylistData();
  }, [playlistId]);

  const handleDelete = async () => {
    setError('');

    try {
      await axios.delete(`http://localhost:3001/user/delete-playlist/${playlistId}`);
      // Redirect to the user dashboard or appropriate page
      navigate('/user/dashboard');
    } catch (error) {
      setError('Failed to delete playlist. ' + (error.response?.data || ''));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-12 rounded-xl shadow-2xl max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">{playlistData.name}</h2>
          <p className="text-lg text-gray-400">{playlistData.videoCount} videos</p>
        </div>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition duration-300 flex items-center justify-center w-full text-lg"
        >
          <FaTrash className="mr-3" />
          Delete Playlist
        </button>
        <p className="text-red-300 text-md text-center mt-5">
          Warning: This action cannot be undone.
        </p>
      </div>
    </div>
  );
};

export default DeletePlaylist;
