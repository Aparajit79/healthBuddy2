
import React from "react";
import { LoaderCircle } from "lucide-react";

const MapLoading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/80 z-10 rounded-b-lg">
      <div className="text-center">
        <LoaderCircle className="h-10 w-10 animate-spin mx-auto text-cyan-400 mb-2" />
        <p className="text-cyan-300">Loading map data...</p>
      </div>
    </div>
  );
};

export default MapLoading;
