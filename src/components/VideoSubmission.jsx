import React, { useState } from 'react';

const VideoSubmission = () => {
  const [videoLink, setVideoLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send the link to the backend will go here
    console.log('Submitted Link:', videoLink);
    // Reset the input field after submission
    setVideoLink('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Submit Your Video Link</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <input 
          type="text" 
          value={videoLink} 
          onChange={(e) => setVideoLink(e.target.value)} 
          placeholder="Enter video link here"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" 
        />
        <button 
          type="submit" 
          className="mt-4 w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VideoSubmission;
