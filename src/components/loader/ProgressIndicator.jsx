import React from "react";
import "./loader.css";

const ProgressIndicator = () => {
  return (
    <div className="flex justify-center w-full bg-transparent items-center">
      <div className="loader ease-linear bg-transparent  border-4 border-t-4 h-12 w-12 mb-4"></div>
    </div>
  );
};

export default ProgressIndicator;
