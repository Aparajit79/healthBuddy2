
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, VolumeX, Mic, MicOff } from "lucide-react";
import { speechSynthesisService } from "@/services/speechSynthesisService";

interface VoiceControlsProps {
  isListening: boolean;
  toggleListening: () => void;
}

const VoiceControls = ({ isListening, toggleListening }: VoiceControlsProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [volume, setVolume] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  useEffect(() => {
    // Initial voice loading
    const loadVoices = () => {
      const availableVoices = speechSynthesisService.getAvailableVoices();
      setVoices(availableVoices);
    };
    
    loadVoices();
    
    // Set up voice changed event listener
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const handleVoiceChange = (value: string) => {
    setSelectedVoice(value);
    speechSynthesisService.setVoiceByName(value);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    speechSynthesisService.setVoiceSettings({ volume: newVolume });
    
    if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
    } else if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleRateChange = (value: number[]) => {
    const newRate = value[0];
    setRate(newRate);
    speechSynthesisService.setVoiceSettings({ rate: newRate });
  };

  const handlePitchChange = (value: number[]) => {
    const newPitch = value[0];
    setPitch(newPitch);
    speechSynthesisService.setVoiceSettings({ pitch: newPitch });
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      speechSynthesisService.setVoiceSettings({ volume });
    } else {
      setIsMuted(true);
      speechSynthesisService.setVoiceSettings({ volume: 0 });
    }
  };

  const testVoice = () => {
    speechSynthesisService.speak("Hello, I am your health assistant. How can I help you today?");
  };

  return (
    <div className="p-4 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-cyan-500/30 space-y-4">
      <h3 className="text-lg font-semibold text-cyan-300 mb-3">Voice Assistant Settings</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-300">Voice</label>
          <div className="w-2/3">
            <Select value={selectedVoice} onValueChange={handleVoiceChange}>
              <SelectTrigger className="w-full bg-gray-700 border-cyan-600/50">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-cyan-600/50">
                {voices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMute}
            className="bg-gray-700 hover:bg-gray-600 text-white border-cyan-500 shadow-md"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          
          <div className="flex-grow">
            <Slider 
              value={[volume]} 
              min={0} 
              max={1} 
              step={0.01} 
              onValueChange={handleVolumeChange} 
              className="py-2"
            />
          </div>
          <span className="text-sm text-gray-300 w-12 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-300">Speed</label>
            <span className="text-sm text-gray-300 w-12 text-right">
              {rate.toFixed(1)}x
            </span>
          </div>
          <Slider 
            value={[rate]} 
            min={0.5} 
            max={2} 
            step={0.1} 
            onValueChange={handleRateChange} 
          />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-300">Pitch</label>
            <span className="text-sm text-gray-300 w-12 text-right">
              {pitch.toFixed(1)}
            </span>
          </div>
          <Slider 
            value={[pitch]} 
            min={0.5} 
            max={2} 
            step={0.1} 
            onValueChange={handlePitchChange} 
          />
        </div>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button 
          variant="default" 
          size="sm" 
          onClick={testVoice}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-90"
        >
          Test Voice
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={toggleListening}
          className={isListening 
            ? "bg-red-500 text-white hover:bg-red-600 border-red-400" 
            : "bg-cyan-700 hover:bg-cyan-600 text-white border-cyan-500"}
        >
          {isListening ? (
            <>
              <MicOff className="h-4 w-4 mr-2" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 mr-2" />
              Start Listening
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default VoiceControls;
