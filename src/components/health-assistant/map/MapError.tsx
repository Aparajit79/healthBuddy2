
import React from "react";

interface MapErrorProps {
  errorMessage: string;
  onRetry: () => void;
}

const MapError = ({ errorMessage, onRetry }: MapErrorProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/80 z-10 rounded-b-lg">
      <div className="text-center p-6">
        <div className="text-red-400 mb-4">{errorMessage}</div>
        <button 
          onClick={onRetry} 
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default MapError;
