
import React, { useRef } from "react";
import { Hospital } from "@/types/hospital";
import { useGoogleMap } from "@/hooks/useGoogleMap";
import MapError from "@/components/health-assistant/map/MapError";
import MapLoading from "@/components/health-assistant/map/MapLoading";

interface GoogleMapProps {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  onHospitalsFound?: (hospitals: Hospital[]) => void;
}

const GoogleMap = ({ hospitals, selectedHospital, onHospitalsFound }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { mapError, handleRetry, isLoading } = useGoogleMap({ 
    hospitals, 
    selectedHospital, 
    mapRef,
    onHospitalsFound
  });
  
  return (
    <div className="relative">
      {isLoading && <MapLoading />}
      
      {mapError && (
        <MapError 
          errorMessage={mapError} 
          onRetry={handleRetry} 
        />
      )}
      
      <div 
        ref={mapRef} 
        className="h-[400px] w-full rounded-b-lg bg-gray-200"
        style={{ minHeight: '400px' }}
      />
      
      {!mapError && !isLoading && hospitals.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-b-lg">
          <p className="text-gray-600">No hospitals found in your area</p>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
