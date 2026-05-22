
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import GoogleMap from "@/components/health-assistant/GoogleMap";
import HospitalDirectory from "@/components/health-assistant/HospitalDirectory";
import { useHospitals } from "@/hooks/useHospitals";

const MapView = () => {
  const { hospitals, selectedHospital, setSelectedHospital, isLoading, updateHospitals } = useHospitals();

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500 border shadow-lg h-full">
      <CardHeader className="bg-gradient-to-r from-cyan-700 to-blue-800 rounded-t-lg">
        <CardTitle className="text-white flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Nearby Hospitals
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative">
        <GoogleMap 
          hospitals={hospitals} 
          selectedHospital={selectedHospital}
          onHospitalsFound={updateHospitals}
        />
        <HospitalDirectory 
          hospitals={hospitals} 
          selectedHospital={selectedHospital} 
          onSelectHospital={setSelectedHospital} 
        />
      </CardContent>
    </Card>
  );
};

export default MapView;
