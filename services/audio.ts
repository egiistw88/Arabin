
/**
 * Professional Audio Engine for Hybrid/PWA
 * Architecture: Singleton Service with Global State Protection
 */

class AudioService {
  private static instance: AudioService;
  
  // STATE
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioContext: AudioContext | null = null;
  private currentAudioFile: HTMLAudioElement | null = null;

  // GC PROTECTION (Android Fix)
  // We keep a registry of active utterances so the browser doesn't delete them while playing
  private activeUtterances: Set<SpeechSynthesisUtterance> = new Set();

  private constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
      this.initVoiceLoading();
    }
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  /**
   * 1. VOICE LOADING STRATEGY
   * Handles the async nature of getVoices() across browsers
   */
  private initVoiceLoading() {
    if (!this.synth) return;

    // Immediate attempt
    this.populateVoices();

    // Event listener for async loading (Chrome/Android)
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.populateVoices();
    }

    // Polling fallback (Safari/Firefox sometimes misses the event)
    let attempts = 0;
    const poller = setInterval(() => {
      if (this.voices.length > 0 || attempts > 10) {
        clearInterval(poller);
      } else {
        this.populateVoices();
        attempts++;
      }
    }, 200);
  }

  private populateVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices.length > 0) {
      this.voices = voices;
      this.selectArabicVoice();
    }
  }

  private selectArabicVoice() {
    // Heuristic Priority for Arabic
    this.preferredVoice = 
      this.voices.find(v => v.lang === 'ar-SA' && v.name.includes('Google')) || // Android Best
      this.voices.find(v => v.name.includes('Maged')) || // iOS Best
      this.voices.find(v => v.lang === 'ar-SA') ||
      this.voices.find(v => v.lang.startsWith('ar')) ||
      null;
  }

  /**
   * 2. IOS AUDIO CONTEXT UNLOCK
   * Call this on the FIRST user interaction anywhere in the app
   */
  public unlockAudioContext() {
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    }

    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().then(() => {
        // Play a silent buffer to fully unlock iOS audio subsystem
        const buffer = this.audioContext!.createBuffer(1, 1, 22050);
        const source = this.audioContext!.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext!.destination);
        source.start(0);
        // console.log("Audio Context Unlocked");
      });
    }
  }

  /**
   * 3. MAIN PLAYBACK INTERFACE
   */
  public play(text: string, audioUrl?: string, onEnd?: () => void): () => void {
    // A. Stop everything first (The "Hard Reset")
    this.stopAll();

    // B. Strategy: Audio File (High Fidelity)
    const isValidUrl = audioUrl && audioUrl.length > 5 && !audioUrl.includes('placeholder');
    if (isValidUrl) {
      return this.playFile(audioUrl!, text, onEnd);
    }

    // C. Strategy: TTS (Fallback)
    return this.speakNative(text, onEnd);
  }

  private playFile(url: string, fallbackText: string, onEnd?: () => void): () => void {
    const audio = new Audio(url);
    this.currentAudioFile = audio;

    const cleanup = () => {
      audio.pause();
      audio.src = '';
      this.currentAudioFile = null;
    };

    audio.onended = () => {
      cleanup();
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      // console.warn("Audio file failed, switching to TTS fallback");
      cleanup();
      this.speakNative(fallbackText, onEnd);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked or network error -> Fallback
        audio.onerror!(new Event('error'));
      });
    }

    return () => cleanup();
  }

  private speakNative(text: string, onEnd?: () => void): () => void {
    if (!this.synth) {
      if (onEnd) onEnd();
      return () => {};
    }

    // Ensure voices are loaded (last ditch attempt)
    if (!this.preferredVoice) this.populateVoices();

    // Cancel current queue to prevent overlap
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Config
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
      utterance.lang = this.preferredVoice.lang;
    } else {
      utterance.lang = 'ar';
    }

    // GC PROTECTION: Add to Set
    this.activeUtterances.add(utterance);
    this.currentUtterance = utterance;

    utterance.onend = () => {
      this.activeUtterances.delete(utterance); // Safe to GC now
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      // console.error("TTS Error", e);
      this.activeUtterances.delete(utterance);
      this.currentUtterance = null;
      
      // On iOS, 'interrupted' or 'canceled' are treated as errors sometimes. 
      // We only callback if it wasn't a manual stop.
      if (e.error !== 'interrupted' && e.error !== 'canceled' && onEnd) {
        onEnd();
      }
    };

    // Small delay to ensure 'cancel' signal propagated completely
    setTimeout(() => {
       if(this.synth) this.synth.speak(utterance);
    }, 10);

    return () => {
      this.stopAll();
    };
  }

  public stopAll() {
    if (this.currentAudioFile) {
      this.currentAudioFile.pause();
      this.currentAudioFile.src = '';
      this.currentAudioFile = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
    this.activeUtterances.clear();
    this.currentUtterance = null;
  }
}

// Export Singleton Wrapper for Compatibility
export const audioService = AudioService.getInstance();

export const playArabicAudio = (text: string, audioUrl?: string, onEnd?: () => void) => {
  return audioService.play(text, audioUrl, onEnd);
};