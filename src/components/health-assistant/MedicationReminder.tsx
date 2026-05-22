
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Plus, Trash2, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Medication {
  id: string;
  name: string;
  time: string;
  dosage: string;
}

const MedicationReminder: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>(() => {
    const saved = localStorage.getItem("medications");
    return saved ? JSON.parse(saved) : [];
  });
  const [newMedication, setNewMedication] = useState({
    name: "",
    time: "",
    dosage: ""
  });
  const { toast } = useToast();

  // Save medications to localStorage when updated
  useEffect(() => {
    localStorage.setItem("medications", JSON.stringify(medications));
  }, [medications]);

  // Check for medication reminders
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      });
      
      medications.forEach(med => {
        if (med.time === currentTime) {
          toast({
            title: "Medication Reminder",
            description: `Time to take ${med.name} - ${med.dosage}`,
            duration: 10000,
          });
        }
      });
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [medications, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMedication({
      ...newMedication,
      [e.target.name]: e.target.value
    });
  };

  const addMedication = () => {
    if (newMedication.name && newMedication.time) {
      const newMed = {
        id: Date.now().toString(),
        ...newMedication
      };
      setMedications([...medications, newMed]);
      setNewMedication({ name: "", time: "", dosage: "" });
      toast({
        title: "Medication Added",
        description: `${newMedication.name} has been added to your reminders`,
      });
    }
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    toast({
      title: "Medication Removed",
      description: "The medication reminder has been removed",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-cyan-500/30 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-cyan-700 via-blue-700 to-cyan-700">
        <CardTitle className="text-white flex items-center text-lg">
          <Bell className="mr-2 h-5 w-5 text-cyan-300" />
          Medication Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4">
            <Input
              placeholder="Medication Name"
              name="name"
              value={newMedication.name}
              onChange={handleInputChange}
              className="bg-gray-700/90 border-cyan-600/50 text-white focus:border-cyan-400 placeholder-gray-400"
            />
          </div>
          <div className="col-span-4">
            <Input
              type="time"
              name="time"
              value={newMedication.time}
              onChange={handleInputChange}
              className="bg-gray-700/90 border-cyan-600/50 text-white focus:border-cyan-400 placeholder-gray-400"
            />
          </div>
          <div className="col-span-3">
            <Input
              placeholder="Dosage"
              name="dosage"
              value={newMedication.dosage}
              onChange={handleInputChange}
              className="bg-gray-700/90 border-cyan-600/50 text-white focus:border-cyan-400 placeholder-gray-400"
            />
          </div>
          <div className="col-span-1">
            <Button 
              onClick={addMedication}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-90 w-full h-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {medications.length === 0 ? (
          <div className="text-center py-4 text-gray-400">
            No medications added yet
          </div>
        ) : (
          <div className="space-y-2 mt-4">
            {medications.map((med) => (
              <div key={med.id} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-md border border-gray-700">
                <div>
                  <h4 className="font-medium text-white">{med.name}</h4>
                  <div className="text-sm text-gray-400">
                    {med.dosage && `${med.dosage} • `}
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 inline" /> {med.time}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => deleteMedication(med.id)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicationReminder;
