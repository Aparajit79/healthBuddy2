
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, LoaderCircle, Sparkles } from "lucide-react";

interface ChatInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  toggleListening: () => void;
  isListening: boolean;
  isProcessing: boolean;
}

const ChatInput = ({ 
  message, 
  setMessage, 
  handleSendMessage, 
  toggleListening, 
  isListening,
  isProcessing
}: ChatInputProps) => {
  return (
    <div className="flex w-full items-center space-x-2 bg-gray-800/70 p-3 rounded-b-lg backdrop-blur-sm">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleListening}
        disabled={isProcessing}
        className={isListening 
          ? "bg-red-500 text-white hover:bg-red-600 border-red-400 animate-pulse shadow-md shadow-red-500/20" 
          : "bg-cyan-700 hover:bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-500/20"}
      >
        <Mic className="h-5 w-5" />
      </Button>
      <div className="relative flex-grow">
        <Input
          placeholder="Type your symptoms or questions..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={isProcessing}
          className="bg-gray-700/90 border-cyan-600/50 text-white focus:border-cyan-400 placeholder-gray-400 pl-10 pr-10 py-6 text-base shadow-inner rounded-lg"
        />
        <Sparkles className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
      </div>
      <Button 
        onClick={handleSendMessage} 
        variant="default" 
        disabled={isProcessing || !message.trim()}
        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-90 text-white shadow-md shadow-cyan-500/20 px-6 py-6"
      >
        {isProcessing ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default ChatInput;
