
class SpeechSynthesisService {
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private rate: number = 1;
  private pitch: number = 1;
  private volume: number = 1;
  private isSpeaking: boolean = false;
  private onSpeakingChangeListeners: ((speaking: boolean) => void)[] = [];

  constructor() {
    // Initialize and try to set a better voice when the service is created
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.setOptimalVoice();
      };
      // Try to set initial voice (in case voices are already loaded)
      this.setOptimalVoice();

      // Set up speaking status listeners
      this.setupSpeakingListeners();
    }
  }

  private setupSpeakingListeners(): void {
    if ('speechSynthesis' in window) {
      // Check speaking status periodically - necessary because the speechSynthesis API
      // doesn't always fire events reliably across browsers
      setInterval(() => {
        const nowSpeaking = window.speechSynthesis.speaking;
        if (this.isSpeaking !== nowSpeaking) {
          this.isSpeaking = nowSpeaking;
          this.notifySpeakingChange();
        }
      }, 100);
    }
  }

  private notifySpeakingChange(): void {
    this.onSpeakingChangeListeners.forEach(listener => {
      listener(this.isSpeaking);
    });
  }

  public onSpeakingChange(callback: (speaking: boolean) => void): () => void {
    this.onSpeakingChangeListeners.push(callback);
    
    // Return a function to remove this listener
    return () => {
      this.onSpeakingChangeListeners = this.onSpeakingChangeListeners.filter(
        listener => listener !== callback
      );
    };
  }

  private setOptimalVoice(): void {
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      
      // First try to find a premium/enhanced voice that matches the user's language
      const userLang = navigator.language?.split('-')[0] || 'en';
      let foundVoice = voices.find(voice => 
        voice.localService === false && 
        (voice.name.includes('Enhanced') || voice.name.includes('Premium')) &&
        voice.lang.startsWith(userLang)
      );
      
      // If no premium voice in user's language, try any premium voice
      if (!foundVoice) {
        foundVoice = voices.find(voice => 
          voice.localService === false && (voice.name.includes('Enhanced') || voice.name.includes('Premium'))
        );
      }
      
      // If still no premium voice, look for any clear non-local voice
      if (!foundVoice) {
        foundVoice = voices.find(voice => voice.localService === false);
      }
      
      // Fallback to any appropriate voice
      if (!foundVoice && voices.length > 0) {
        foundVoice = voices[0];
      }
      
      if (foundVoice) {
        this.selectedVoice = foundVoice;
        console.log("Selected voice:", foundVoice.name);
      }
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if ('speechSynthesis' in window) {
      return window.speechSynthesis.getVoices();
    }
    return [];
  }

  public setVoiceByName(name: string): boolean {
    const voices = this.getAvailableVoices();
    const voice = voices.find(v => v.name === name);
    if (voice) {
      this.selectedVoice = voice;
      return true;
    }
    return false;
  }

  public getVoiceSettings(): { rate: number; pitch: number; volume: number } {
    return {
      rate: this.rate,
      pitch: this.pitch,
      volume: this.volume
    };
  }

  public setVoiceSettings(settings: { rate?: number; pitch?: number; volume?: number }): void {
    if (settings.rate !== undefined) this.rate = Math.max(0.5, Math.min(settings.rate, 2));
    if (settings.pitch !== undefined) this.pitch = Math.max(0.5, Math.min(settings.pitch, 2));
    if (settings.volume !== undefined) this.volume = Math.max(0, Math.min(settings.volume, 1));
  }

  public isSpeakingNow(): boolean {
    return this.isSpeaking;
  }

  public speak(text: string, language: string = 'en'): void {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance(text);
      
      // Set the voice if one is selected, otherwise use language
      if (this.selectedVoice) {
        speech.voice = this.selectedVoice;
      } else {
        speech.lang = language;
      }
      
      // Apply current settings
      speech.rate = this.rate;
      speech.volume = this.volume;
      speech.pitch = this.pitch;

      // Add event listeners
      speech.onstart = () => {
        this.isSpeaking = true;
        this.notifySpeakingChange();
      };
      
      speech.onend = () => {
        this.isSpeaking = false;
        this.notifySpeakingChange();
      };
      
      speech.onerror = () => {
        this.isSpeaking = false;
        this.notifySpeakingChange();
      };
      
      window.speechSynthesis.speak(speech);
    }
  }

  public stopSpeaking(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.notifySpeakingChange();
    }
  }

  public getGreeting(lang: string): string {
    const greetings: { [key: string]: string } = {
      en: "Hello! I am your Virtual Health Assistant.",
      es: "¡Hola! Soy tu asistente de salud virtual.",
      hi: "नमस्ते! मैं आपका वर्चुअल हेल्थ असिस्टेंट हूं।",
      ta: "வணக்கம்! நான் உங்கள் நல உதவியாளர்.",
      de: "Hallo! Ich bin Ihr virtueller Gesundheitsassistent.",
      fr: "Bonjour! Je suis votre assistant de santé virtuel.",
      zh: "你好！我是您的虚拟健康助手。",
      ja: "こんにちは！私はあなたの仮想ヘルスアシスタントです。",
      pt: "Olá! Eu sou seu assistente virtual de saúde.",
      ru: "Здравствуйте! Я ваш виртуальный ассистент здоровья."
    };
    return greetings[lang] || greetings.en;
  }

  public pause(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  public resume(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }
}

export const speechSynthesisService = new SpeechSynthesisService();
