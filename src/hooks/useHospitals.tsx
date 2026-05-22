
import { useState } from "react";
import { Hospital } from "@/types/hospital";

export const useHospitals = () => {
  const [isLoading, setIsLoading] = useState(false);
  // Start with empty array so automatic discovery can populate it
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const updateHospitals = (newHospitals: Hospital[]) => {
    console.log("Updating hospitals with:", newHospitals);
    setHospitals(newHospitals);
    setIsLoading(false);
  };

  return {
    hospitals,
    selectedHospital,
    setSelectedHospital,
    isLoading,
    updateHospitals
  };
};
