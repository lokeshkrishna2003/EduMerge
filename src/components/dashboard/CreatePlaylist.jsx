import React, { useState } from 'react';
import { FiPlus, FiSave } from 'react-icons/fi'; // Icons
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init();

const CreatePlaylist = () => {
    const [playlistName, setPlaylistName] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');
    const [links, setLinks] = useState([]);

    const handleAddLink = () => {
        if (youtubeLink) {
            setLinks([...links, youtubeLink]);
            setYoutubeLink('');
        }
    };

    const handleSavePlaylist = () => {
        // Logic to save the playlist will go here
        console.log('Saving playlist:', playlistName, links);
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white p-4">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-4">Create Playlist</h1>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium">Playlist Name</label>
                    <input 
                        type="text" 
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        placeholder="Enter playlist name" 
                        className="w-full p-2 rounded"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium">YouTube Link</label>
                    <div className="flex">
                        <input 
                            type="text" 
                            value={youtubeLink}
                            onChange={(e) => setYoutubeLink(e.target.value)}
                            placeholder="Add YouTube link" 
                            className="w-full p-2 rounded-l"
                        />
                        <button 
                            onClick={handleAddLink}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-r transition duration-300"
                        >
                            <FiPlus />
                        </button>
                    </div>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-3">Playlist Preview</h2>
                    <ul>
                        {links.map((link, index) => (
                            <li key={index} className="mb-2">
                                {link} {/* You can enhance this part to show a more detailed preview */}
                            </li>
                        ))}
                    </ul>
                </div>
                <button 
                    onClick={handleSavePlaylist}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    <FiSave className="mr-2" />
                    Save Playlist
                </button>
            </div>
        </div>
    );
};

export default CreatePlaylist;
