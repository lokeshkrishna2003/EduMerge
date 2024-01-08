import React, { useState } from "react";
import {
  FiEdit2,
  FiLink,
  FiExternalLink,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { CiBoxList,CiSquareCheck } from "react-icons/ci";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdOutlineDragIndicator } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [links, setLinks] = useState([]);

  const addLink = () => {
    if (linkName && linkUrl) {
      const newLink = { id: uuidv4(), name: linkName, url: linkUrl };
      setLinks([...links, newLink]);
      setLinkName("");
      setLinkUrl("");
    }
  };

  const deleteLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLinks(items);
  };

  const createPlaylist = () => {
    console.log("Playlist Name:", playlistName);
    console.log("Links:", links);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="md:w-1/2 p-8 space-y-6" data-aos="fade-right">
        <h2 className="text-4xl font-bold flex justify-center items-center space-x-2">
          <CiBoxList
            size={30}
            color="rgb(168 85 247 / var(--tw-text-opacity))"
            className="text-lg"
          />
          <span>Create Playlist</span>
        </h2>
        <div className="flex items-center space-x-2 border-b-2 border-gray-600 focus-within:border-purple-500">
          <FiEdit2
            className={`text-lg ${
              playlistName ? "text-purple-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Playlist Name"
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center space-x-2 border-b-2 border-gray-600 focus-within:border-purple-500">
          <FiLink
            className={`text-lg ${
              linkName ? "text-purple-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
            placeholder="Link Name"
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center space-x-2 border-b-2 border-gray-600 focus-within:border-purple-500">
          <FiExternalLink
            className={`text-lg ${
              linkUrl ? "text-purple-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Link URL"
            className="w-full p-2 bg-transparent focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            onClick={addLink}
            className="flex items-center justify-center w-[50%] px-4 py-2 text-center bg-purple-500 rounded hover:bg-purple-700 transition duration-300"
          >
            <FiPlus className="mr-2" />
            Add Link
          </button>
        </div>

        <button
          onClick={createPlaylist}
          className="flex items-center justify-center w-full px-4 py-2 text-center bg-purple-500 rounded hover:bg-purple-700 transition duration-300"
        >
          <CiSquareCheck size={30} className="mr-2" />
          Create Playlist
        </button>
      </div>
      <div
        className="hidden md:block absolute inset-y-0 left-1/2 w-0.5 bg-gray-500"
        aria-hidden="true"
      ></div>
<div className="w-full md:w-1/2 xl:w-1/2 2xl:w-1/2 ml-auto p-8 overflow-y-auto">
  <h1 className="text-3xl h-6 text-center text-gray-400 font-bold mb-11" data-aos="zoom-in">
    {playlistName}
  </h1>

  <h2 className="text-xl font-bold mb-4">Links:</h2>
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable-links">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
          {links.length > 0 ? (
            links.map((link, index) => (
              <Draggable key={link.id} draggableId={`draggable-${link.id}`} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center justify-between p-2 bg-gray-700 rounded"
                    data-aos="zoom-in"
                  >
                    <span className="text-lg">{index + 1}.</span>
                    <MdOutlineDragIndicator className="text-gray-400 mr-2" />
                    <div className="flex-grow">
                      <span className="text-lg font-semibold">{link.name}</span> -
                      <span className="ml-2 text-sm text-gray-400">{link.url}</span>
                    </div>
                    <button onClick={() => deleteLink(link.id)} className="ml-2">
                      <FiTrash2 className="text-red-500 hover:text-red-700" />
                    </button>
                  </div>
                )}
              </Draggable>
            ))
          ) : (
            <div className="text-center text-gray-400" data-aos="fade-in">
              Add the Links
            </div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
</div>

    </div>
  );
};

export default CreatePlaylist;
