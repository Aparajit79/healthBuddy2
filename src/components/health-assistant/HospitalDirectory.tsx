
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Hospital } from "@/types/hospital";

interface HospitalDirectoryProps {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  onSelectHospital: (hospital: Hospital) => void;
}

const HospitalDirectory = ({ hospitals, selectedHospital, onSelectHospital }: HospitalDirectoryProps) => {
  return (
    <div className="p-4 space-y-2">
      <h3 className="text-lg font-medium text-cyan-300">Hospital Directory</h3>
      <div className="space-y-2">
        {hospitals.map(hospital => (
          <Button
            key={hospital.id}
            variant="outline"
            className={`w-full justify-start text-left h-auto py-2 ${
              selectedHospital?.id === hospital.id 
                ? "bg-cyan-700/30 border-cyan-500" 
                : "bg-gray-700/30 hover:bg-gray-700/50"
            }`}
            onClick={() => onSelectHospital(hospital)}
          >
            <div>
              <div className="font-medium flex items-center">
                <MapPin className="h-3 w-3 mr-1 text-cyan-400" />
                {hospital.name}
              </div>
              <div className="text-xs text-gray-400 mt-1">{hospital.address}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default HospitalDirectory;
