import React, { useState } from 'react';
import { FiEdit, FiPlay } from 'react-icons/fi'; // Importing icons

const PlaylistCard = ({ name, videoCount }) => { // Added videoCount prop
    const [hover, setHover] = useState(false);

    return (
        <div data-aos="fade-up"
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             className="relative rounded-lg overflow-hidden shadow-lg bg-gray-800 hover:bg-gray-700 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">

            <div className="absolute top-2 right-2">
                <button className="text-white rounded-full p-1 hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-110">
                    <FiEdit size={15} /> {/* Edit Icon */}
                </button>
            </div>

            <div className="px-6 py-4">
                {hover ? (
                    <div className="flex items-center">
                        <FiPlay className="mr-2" /> {/* Play Icon */}
                        <div className="font-bold text-xl">Play {name}</div>
                    </div>
                ) : (
                    <div className="font-bold text-xl mb-2">{name}</div>
                )}
                {/* Displaying the number of videos/links */}
                <div className="text-sm text-gray-400">{videoCount} videos</div>
            </div>
        </div>
    );
}

export default PlaylistCard;
