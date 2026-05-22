
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// Define Appointment type for TypeScript
interface Appointment {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  doctor: string;
  user_id?: string | null;
}

const AppointmentTab = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctor, setDoctor] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Function to fetch appointments from Supabase
  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setAppointments(data as Appointment[]);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Failed to load appointments",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to book an appointment
  const handleBookAppointment = async () => {
    if (!name || !email || !date || !time || !doctor) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to book your appointment.",
        variant: "destructive",
      });
      return;
    }

    const newAppointment = {
      id: uuidv4(),
      name,
      email,
      date,
      time,
      doctor
    };

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([newAppointment]);
      
      if (error) {
        throw error;
      }

      // Add new appointment to state
      setAppointments([newAppointment, ...appointments]);
      
      toast({
        title: "Appointment Booked!",
        description: `Your appointment with Dr. ${doctor} is scheduled for ${date} at ${time}.`,
      });
      
      // Reset form
      setName("");
      setEmail("");
      setDate("");
      setTime("");
      setDoctor("");

      // Refresh appointments
      fetchAppointments();
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Failed to book appointment",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  // Function to cancel an appointment
  const handleCancelAppointment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Remove appointment from state
      setAppointments(appointments.filter(a => a.id !== id));
      
      toast({ 
        title: "Appointment cancelled",
        description: "The appointment has been cancelled successfully"
      });
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast({
        title: "Failed to cancel appointment",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-5">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="bg-gray-700">
            <CardTitle className="text-cyan-400">Book an Appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Your Name</label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                placeholder="johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Date</label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">Time</label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="doctor" className="text-sm font-medium">Select Doctor</label>
              <Select value={doctor} onValueChange={setDoctor}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Smith">Dr. Smith - General Physician</SelectItem>
                  <SelectItem value="Johnson">Dr. Johnson - Cardiologist</SelectItem>
                  <SelectItem value="Williams">Dr. Williams - Pediatrician</SelectItem>
                  <SelectItem value="Brown">Dr. Brown - Dermatologist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleBookAppointment} 
              className="w-full bg-cyan-600 hover:bg-cyan-700"
              disabled={isLoading}
            >
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-7">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="bg-gray-700">
            <CardTitle className="text-cyan-400">Your Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"></div>
              </div>
            ) : appointments.length === 0 ? (
              <p className="text-center py-8 text-gray-400">No appointments scheduled yet.</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Dr. {appointment.doctor}</p>
                          <p className="text-sm text-gray-300">{appointment.date} at {appointment.time}</p>
                          <p className="text-xs text-gray-400">{appointment.name} • {appointment.email}</p>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentTab;
