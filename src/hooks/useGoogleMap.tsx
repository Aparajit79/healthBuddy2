
import { useState, useEffect, useRef, MutableRefObject } from "react";
import { Hospital } from "@/types/hospital";
import { 
  loadGoogleMapsScript, 
  getUserLocation, 
  createHospitalMarkers, 
  showHospitalInfoWindow,
  mapStyles,
  findNearbyHospitals
} from "@/utils/google-maps/mapUtils";

interface UseGoogleMapProps {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  mapRef: MutableRefObject<HTMLDivElement | null>;
  onHospitalsFound?: (hospitals: Hospital[]) => void;
}

export const useGoogleMap = ({ hospitals, selectedHospital, mapRef, onHospitalsFound }: UseGoogleMapProps) => {
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any | null>(null);

  const initMap = async () => {
    if (!mapRef.current) return;
    
    try {
      setIsLoading(true);
      console.log("Initializing map...");
      
      // Load Google Maps script
      await loadGoogleMapsScript();
      console.log("Google Maps script loaded");
      
      // Get user's location
      const center = await getUserLocation();
      console.log("User location:", center);
      
      // Automatically find nearby hospitals based on user location
      if (onHospitalsFound) {
        console.log("Finding nearby hospitals...");
        const nearbyHospitals = findNearbyHospitals(center);
        onHospitalsFound(nearbyHospitals);
        console.log("Updated hospitals list with nearby hospitals");
      }
      
      // Check if Google Maps is available
      if (!window.google || !window.google.maps) {
        throw new Error("Google Maps failed to load properly");
      }
      
      // Create the map
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: mapStyles
      });
      
      console.log("Map created successfully");
      mapInstanceRef.current = map;
      
      // Clear any previous errors
      setMapError(null);
      setIsLoading(false);
      
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(`Failed to load Google Maps: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  };
  
  // Handle retry
  const handleRetry = () => {
    setMapError(null);
    initMap();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      initMap();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup markers
      if (markersRef.current) {
        markersRef.current.forEach((marker: any) => {
          if (marker && marker.setMap) {
            marker.setMap(null);
          }
        });
      }
      
      // Cleanup info window
      if (infoWindowRef.current && infoWindowRef.current.close) {
        infoWindowRef.current.close();
      }
    };
  }, []);

  // Update markers when hospitals change
  useEffect(() => {
    if (mapInstanceRef.current && hospitals.length > 0) {
      // Clear existing markers
      if (markersRef.current) {
        markersRef.current.forEach((marker: any) => {
          if (marker && marker.setMap) {
            marker.setMap(null);
          }
        });
      }
      
      // Add new markers
      markersRef.current = createHospitalMarkers(mapInstanceRef.current, hospitals);
      console.log("Hospital markers updated:", markersRef.current.length);
    }
  }, [hospitals]);

  // Update info window when selected hospital changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      // Close existing info window
      if (infoWindowRef.current && infoWindowRef.current.close) {
        infoWindowRef.current.close();
      }
      
      // Show new info window if hospital is selected
      if (selectedHospital) {
        infoWindowRef.current = showHospitalInfoWindow(mapInstanceRef.current, selectedHospital);
      }
    }
  }, [selectedHospital]);

  return {
    mapError,
    handleRetry,
    isLoading
  };
};
