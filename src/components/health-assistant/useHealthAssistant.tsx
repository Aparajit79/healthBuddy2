import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getAIResponse, INITIAL_GREETING, Message } from "@/services/symptomService";
import { speechSynthesisService } from "@/services/speechSynthesisService";

// Bug fixes:
//   1. Role mismatch fixed — was "system" for bot messages, ChatMessage checked "bot"
//      Now uses "assistant" (API standard) and ChatMessage renders by role === "assistant"
//   2. Removed dependency on broken singleton symptomService
//   3. Full message history passed to AI for context-aware replies
//   4. processMessage now async, no fake setTimeout

export const useHealthAssistant = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");

  // FIX 1: Initial greeting stored as role "assistant" (not "system")
  // FIX 2: chatHistory is the source of truth for API messages too
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: INITIAL_GREETING },
  ]);

  // Separate API message history (user + assistant only, no display-only entries)
  const [apiMessages, setApiMessages] = useState<Message[]>([
    { role: "assistant", content: INITIAL_GREETING },
  ]);

  const [language, setLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingHealth, setIsLoadingHealth] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      const handleSpeakStart = () => setIsSpeaking(true);
      const handleSpeakEnd = () => setIsSpeaking(false);

      window.speechSynthesis.addEventListener("start", handleSpeakStart);
      window.speechSynthesis.addEventListener("end", handleSpeakEnd);
      window.speechSynthesis.addEventListener("pause", handleSpeakEnd);
      window.speechSynthesis.addEventListener("cancel", handleSpeakEnd);

      return () => {
        window.speechSynthesis.removeEventListener("start", handleSpeakStart);
        window.speechSynthesis.removeEventListener("end", handleSpeakEnd);
        window.speechSynthesis.removeEventListener("pause", handleSpeakEnd);
        window.speechSynthesis.removeEventListener("cancel", handleSpeakEnd);
      };
    }
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    const greeting = speechSynthesisService.getGreeting(value);
    speechSynthesisService.speak(greeting, value);
  };

  const addBotMessage = (text: string) => {
    // FIX 1: role is "assistant", not "system"
    setChatHistory((prev) => [...prev, { role: "assistant", content: text }]);
    setApiMessages((prev) => [...prev, { role: "assistant", content: text }]);
    if (!isSpeaking) {
      speechSynthesisService.speak(text, language);
    }
  };

  const handleSendMessage = async (text = message) => {
    if (!text.trim() || isProcessing) return;

    const userText = text.trim();
    setChatHistory((prev) => [...prev, { role: "user", content: userText }]);
    const updatedApiMessages: Message[] = [
      ...apiMessages,
      { role: "user", content: userText },
    ];
    setApiMessages(updatedApiMessages);
    setMessage("");
    setIsProcessing(true);

    try {
      // FIX 3: Send full conversation history to AI for context-aware replies
      const reply = await getAIResponse(updatedApiMessages);
      addBotMessage(reply);
    } catch (err) {
      addBotMessage(
        "I'm sorry, I couldn't connect right now. Please check your internet connection and try again."
      );
      toast({
        title: "Connection error",
        description: "Could not reach the AI service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const checkHeartRate = () => {
    setIsLoadingHealth(true);
    setTimeout(() => {
      const randomRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
      let healthStatus = "normal";
      if (randomRate < 60) healthStatus = "below normal";
      if (randomRate > 100) healthStatus = "above normal";
      addBotMessage(
        `Your simulated heart rate is ${randomRate} BPM, which is ${healthStatus}. A normal resting heart rate for adults ranges from 60 to 100 beats per minute. For an accurate reading, please use a medical device or see a healthcare provider.`
      );
      setIsLoadingHealth(false);
    }, 2000);
  };

  return {
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
  };
};
