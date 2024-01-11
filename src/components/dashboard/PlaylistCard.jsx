import React, { useState } from "react";
import { FiEdit, FiPlay, FiTrash } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const PlaylistCard = ({
  name,
  videoCount,
  onEdit,
  onDelete,
  onClickPlaylist,
}) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      data-aos="zoom-in"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClickPlaylist}
      className="relative rounded-lg overflow-hidden cursor-pointer shadow-lg bg-gray-800 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={onEdit}
          className="text-white rounded-full p-1 hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-110"
        >
          <FiEdit className="text-purple-500 hover:text-white" size={15} />
        </button>
        <button
          onClick={onDelete}
          className="text-white rounded-full p-1 hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-110"
        >
          <FiTrash className="text-purple-500  hover:text-white" size={15} />
        </button>
      </div>

      <div className="px-6 py-4">
        {hover ? (
          <div className="flex justify-start items-center">
            <FiPlay
              size={20}
              className="mr-2 mb-2 text-purple-500"
              data-aos="zoom-in"
            />
            <div className="font-bold text-xl mb-2">{name}</div>
          </div>
        ) : (
          <div className="font-bold text-xl mb-2">{name}</div>
        )}
        <div className="text-sm text-gray-400">{videoCount} videos</div>
      </div>
    </div>
  );
};

export default PlaylistCard;
