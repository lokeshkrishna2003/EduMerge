import React, { useState } from 'react';
import { FiPlus, FiSave, FiX, FiLink, FiYoutube } from 'react-icons/fi'; // Correct React icons
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init();

const CreatePlaylist = () => {
    const [playlistName, setPlaylistName] = useState('');
    const [linkName, setLinkName] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');
    const [links, setLinks] = useState([]);

    const handleAddLink = () => {
        if (youtubeLink && linkName) {
            setLinks([...links, { id: uuidv4(), name: linkName, url: youtubeLink }]);
            setLinkName('');
            setYoutubeLink('');
        }
    };

    const handleRemoveLink = (id) => {
        setLinks(links.filter(link => link.id !== id));
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(links);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setLinks(items);
    };

    const handleSavePlaylist = () => {
        // Logic to save the playlist
        console.log('Saving playlist:', playlistName, links);
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white p-4">
            <div className="container mx-auto" data-aos="fade-up">
                <h1 className="text-4xl font-bold mb-4 flex items-center">
                    <FiPlus className="mr-2"/> Create Your Playlist
                </h1>
                <div className="mb-6">
                    <input 
                        type="text" 
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        placeholder="Playlist Name" 
                        className="w-full p-3 rounded bg-gray-800 focus:outline-none focus-within:border-purple-500 transition ease-in-out duration-300"
                    />
                </div>
                <div className="mb-6 flex items-center">
                    <FiLink className="text-purple-500 mr-2"/>
                    <input 
                        type="text" 
                        value={linkName}
                        onChange={(e) => setLinkName(e.target.value)}
                        placeholder="Link Name" 
                        className="flex-grow p-3 rounded-l bg-gray-800 focus:outline-none focus-within:border-purple-500 transition ease-in-out duration-300"
                    />
                    <FiYoutube className="text-red-600 mr-2"/>
                    <input 
                        type="text" 
                        value={youtubeLink}
                        onChange={(e) => setYoutubeLink(e.target.value)}
                        placeholder="YouTube Link" 
                        className="flex-grow p-3 bg-gray-800 focus:outline-none focus-within:border-purple-500 transition ease-in-out duration-300"
                    />
                    <button 
                        onClick={handleAddLink}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold p-3 rounded-r transition ease-in-out duration-300"
                    >
                        <FiPlus />
                    </button>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable-links">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="mb-6">
                                {links.map((link, index) => (
                                    <Draggable key={link.id} draggableId={`draggable-${link.id}`} index={index}>
                                        {(provided) => (
                                            <div 
                                                ref={provided.innerRef} 
                                                {...provided.draggableProps} 
                                                {...provided.dragHandleProps}
                                                className="flex justify-between items-center bg-gray-800 p-3 rounded mb-2 hover:bg-gray-700 transition ease-in-out duration-300"
                                            >
                                                <span className="font-bold mr-2">{index + 1}.</span>
                                                <span className="flex-grow">{link.name} - {link.url}</span>
                                                <button onClick={() => handleRemoveLink(link.id)} className="ml-2">
                                                    <FiX className="text-red-500 hover:text-red-700" />
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <button 
                    onClick={handleSavePlaylist}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300 mt-4"
                >
                    <FiSave className="mr-2" /> Save Playlist
                </button>
            </div>
        </div>
    );
};

export default CreatePlaylist;
