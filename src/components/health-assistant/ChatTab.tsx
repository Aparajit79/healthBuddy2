import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MessageCircle, Settings } from "lucide-react";
import ChatBox from "@/components/health-assistant/ChatBox";
import ChatInput from "@/components/health-assistant/ChatInput";
import { speechRecognitionService } from "@/services/speechRecognitionService";
import { useToast } from "@/hooks/use-toast";
import VoiceControls from "@/components/health-assistant/VoiceControls";
import { Button } from "@/components/ui/button";

interface ChatTabProps {
  chatHistory: { role: string; content: string }[];
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  isProcessing: boolean;
  language: string;
  handleSendMessage: (text?: string) => void;
}

// Fix: pass isProcessing down to ChatBox so typing indicator renders correctly
const ChatTab = ({
  chatHistory,
  message,
  setMessage,
  isListening,
  setIsListening,
  isProcessing,
  language,
  handleSendMessage,
}: ChatTabProps) => {
  const { toast } = useToast();
  const [showVoiceControls, setShowVoiceControls] = useState(false);

  const toggleListening = () => {
    if (isListening) {
      speechRecognitionService.stopListening();
      setIsListening(false);
    } else {
      if (speechRecognitionService.isAvailable()) {
        speechRecognitionService.startListening(
          language,
          (transcript) => {
            setMessage(transcript);
            handleSendMessage(transcript);
            setIsListening(false);
          },
          () => {
            setIsListening(false);
            toast({
              title: "Speech recognition error",
              description: "Unable to recognize speech. Please try again or type your message.",
              variant: "destructive",
            });
          }
        );
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak now. I'm ready to hear your query.",
        });
      } else {
        toast({
          title: "Speech recognition not available",
          description: "Your browser doesn't support speech recognition. Please type your message instead.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-cyan-500/30 border shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-cyan-700 via-blue-700 to-cyan-700 rounded-t-lg flex flex-row justify-between items-center">
            <CardTitle className="text-white flex items-center text-lg">
              <MessageCircle className="mr-2 h-5 w-5 text-cyan-300" />
              Chat with Health Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVoiceControls(!showVoiceControls)}
              className="text-white hover:bg-cyan-600/20"
            >
              <Settings className="h-4 w-4 mr-1" />
              Voice Settings
            </Button>
          </CardHeader>

          {showVoiceControls && (
            <div className="border-b border-cyan-800/30">
              <VoiceControls isListening={isListening} toggleListening={toggleListening} />
            </div>
          )}

          <CardContent className="p-0">
            {/* Fix: isProcessing passed so typing indicator renders */}
            <ChatBox chatHistory={chatHistory} isProcessing={isProcessing} />
          </CardContent>
          <CardFooter className="border-t border-cyan-800/30 p-3 bg-gray-900/80 backdrop-blur-sm">
            <ChatInput
              message={message}
              setMessage={setMessage}
              handleSendMessage={() => handleSendMessage()}
              toggleListening={toggleListening}
              isListening={isListening}
              isProcessing={isProcessing}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChatTab;
