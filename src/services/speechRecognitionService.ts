
type SpeechRecognitionCallback = (transcript: string) => void;

class SpeechRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      if (this.recognition) {
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.isInitialized = true;
      }
    }
  }

  public isAvailable(): boolean {
    return this.isInitialized;
  }

  public startListening(language: string, onResult: SpeechRecognitionCallback, onError: () => void): void {
    if (!this.recognition) return;

    this.recognition.lang = language;
    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    this.recognition.onerror = onError;
    this.recognition.start();
  }

  public stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

export const speechRecognitionService = new SpeechRecognitionService();
