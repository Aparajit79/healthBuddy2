import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Search, Bell, MapPin, Activity, Stethoscope } from "lucide-react";

// Import custom components
import Header from "@/components/health-assistant/Header";
import TabsListChanged from "@/components/health-assistant/TabsListChanged";
import AppointmentTab from "@/components/health-assistant/AppointmentTab";
import HealthInfoTab from "@/components/health-assistant/HealthInfoTab";
import MapView from "@/components/health-assistant/MapView";
import ChatTab from "@/components/health-assistant/ChatTab";
import HealthTips from "@/components/health-assistant/HealthTips";
import { useHealthAssistant } from "@/components/health-assistant/useHealthAssistant";

// Main Health Assistant component that organizes the application structure
const HealthAssistant = () => {
  const {
    message,
    setMessage,
    chatHistory,
    language,
    isListening,
    setIsListening,
    isProcessing,
    isLoadingHealth,
    isSpeaking,
    handleLanguageChange,
    handleSendMessage,
  } = useHealthAssistant();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-cyan-900 to-blue-900 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNDIzNDYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC00aDR2MWgtNHYtMXptMC00aDR2MWgtNHYtMXptMC00aDR2MWgtNHYtMXptMC00aDR2MWgtNHYtMXptMC00aDR2MWgtNHYtMXptLTE3IDE3aDR2MWgtNHYtMXptMC00aDR2MWgtNHYtMXptMC00aDR2MWgtNHYtMXptMC00aDR2MWgtNHYtMXptMC00aDR2MWgtNHYtMXptMC00aDR2MWgtNHYtMXptOS0xaDR2MWgtNHYtMXptOCAwaDR2MWgtNHYtMXptLTQtNGg0djFoLTR2LTF6bTQgMGg0djFoLTR2LTF6bS00IDhoNHYxaC00di0xem00IDBoNHYxaC00di0xem0tNCAxNmg0djFoLTR2LTF6bTQgMGg0djFoLTR2LTF6bS00LThsNC0uMDAyVjI2aC00di0uMDAyem00IDBoNC0uMDAyVjI2aC00di0uMDAyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 -z-10" />
      <Header language={language} handleLanguageChange={handleLanguageChange} />

      <div className="container mx-auto py-6 px-4">
        <div className="mb-4 flex items-center">
          <Activity className="h-6 w-6 text-cyan-400 mr-2" />
          <h2 className="text-2xl font-bold text-white">Your Health Dashboard</h2>
          {isSpeaking && (
            <div className="flex items-center ml-4 bg-cyan-500/20 px-3 py-1 rounded-full animate-pulse">
              <span className="h-2 w-2 bg-cyan-400 rounded-full mr-2"></span>
              <span className="text-sm text-cyan-300">Speaking...</span>
            </div>
          )}
        </div>

        {/* Health Tips Section - Always visible at the top */}
        <div className="mb-6">
          <HealthTips />
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsListChanged>
            <TabsTrigger value="chat" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white flex items-center">
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="appointment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white flex items-center">
              <Search className="mr-2 h-4 w-4" />
              Health Info
            </TabsTrigger>
            <TabsTrigger value="hospitals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Hospitals
            </TabsTrigger>
            <TabsTrigger value="wellness" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white flex items-center">
              <Stethoscope className="mr-2 h-4 w-4" />
              Wellness
            </TabsTrigger>
          </TabsListChanged>

          <TabsContent value="chat" className="mt-6">
            <ChatTab 
              chatHistory={chatHistory}
              message={message}
              setMessage={setMessage}
              isListening={isListening}
              setIsListening={setIsListening}
              isProcessing={isProcessing}
              language={language}
              handleSendMessage={handleSendMessage}
            />
          </TabsContent>

          <TabsContent value="appointment" className="mt-6">
            <AppointmentTab />
          </TabsContent>

          <TabsContent value="health" className="mt-6">
            <HealthInfoTab isLoading={isLoadingHealth} />
          </TabsContent>
          
          <TabsContent value="hospitals" className="mt-6">
            <MapView />
          </TabsContent>
          
          <TabsContent value="wellness" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <HealthTips />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HealthAssistant;
