
/**
 * Professional Audio Engine for Hybrid/PWA
 * 
 * CORE FIXES:
 * 1. Garbage Collection Defense: Maintains a global registry of active utterances.
 * 2. iOS Autoplay Compliance: execution is strictly synchronous to user gestures.
 * 3. Voice Heuristics: Robust fallback for Arabic voices across OSs.
 */

class AudioService {
  private static instance: AudioService;
  
  // STATE
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private preferredVoice: SpeechSynthesisVoice | null = null;
  
  // Audio File State
  private currentAudioFile: HTMLAudioElement | null = null;

  // GC PROTECTION (Critical for Android)
  // We keep a set of active utterances to prevent the browser from garbage collecting 
  // the speech object while it is still talking.
  private activeUtterances: Set<SpeechSynthesisUtterance> = new Set();

  // Shared AudioContext (for SFX)
  private audioContext: AudioContext | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
      this.initVoiceLoading();
      this.initAudioContext();
    }
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  public getAudioContext(): AudioContext | null {
    return this.audioContext;
  }

  private initAudioContext() {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    } catch (e) {
      console.warn("Web Audio API not supported");
    }
  }

  /**
   * VOICE LOADING STRATEGY
   * Chrome loads voices asynchronously (requires onvoiceschanged).
   * Safari loads synchronously (available immediately).
   * We handle both.
   */
  private initVoiceLoading() {
    if (!this.synth) return;

    // 1. Try immediate load (Safari)
    this.populateVoices();

    // 2. Listen for async load (Chrome/Android)
    // We bind explicitly to ensure 'this' context
    this.synth.onvoiceschanged = this.populateVoices.bind(this);

    // 3. Fallback Polling (Firefox/Older devices)
    // Sometimes the event doesn't fire, so we check a few times.
    let attempts = 0;
    const poller = setInterval(() => {
      if (this.voices.length > 0 || attempts > 10) {
        clearInterval(poller);
      } else {
        this.populateVoices();
        attempts++;
      }
    }, 250);
  }

  private populateVoices() {
    if (!this.synth) return;
    
    const availableVoices = this.synth.getVoices();
    
    // Only update if we actually found voices
    if (availableVoices.length > 0) {
      this.voices = availableVoices;
      this.selectArabicVoice();
    }
  }

  private selectArabicVoice() {
    // Priority List:
    // 1. "Google" Arabic (High quality on Android/Chrome)
    // 2. "Maged" (High quality on iOS)
    // 3. "Tarik" (Standard on many Apple devices)
    // 4. Any "ar-SA" (Saudi Arabic)
    // 5. Any "ar" (Generic Arabic)
    
    this.preferredVoice = 
      this.voices.find(v => v.lang === 'ar-SA' && v.name.includes('Google')) || 
      this.voices.find(v => v.name.includes('Maged')) || 
      this.voices.find(v => v.name.includes('Tarik')) || 
      this.voices.find(v => v.lang === 'ar-SA') ||
      this.voices.find(v => v.lang.startsWith('ar')) ||
      null;
      
    // Debugging (Optional)
    // if (this.preferredVoice) console.log("Selected Voice:", this.preferredVoice.name);
  }

  /**
   * UNLOCK AUDIO (iOS Requirement)
   * Must be called on the very first "Click" anywhere in the app.
   */
  public unlockAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().then(() => {
        // Play a silent buffer to fully warm up the hardware
        const buffer = this.audioContext!.createBuffer(1, 1, 22050);
        const source = this.audioContext!.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext!.destination);
        source.start(0);
      }).catch(() => {});
    }
  }

  /**
   * MAIN PLAY FUNCTION
   */
  public play(text: string, audioUrl?: string, onEnd?: () => void): () => void {
    // 1. Hard Stop: Cancel any currently speaking audio to prevent overlap
    this.stopAll();

    // 2. Strategy A: Play Audio File (if provided and valid)
    // Used for Quran verses or specific sound bites
    if (audioUrl && audioUrl.length > 5 && !audioUrl.includes('placeholder')) {
      return this.playFile(audioUrl, text, onEnd);
    }

    // 3. Strategy B: Native TTS
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

    // If file fails (404, CORS, Format), fallback to TTS immediately
    audio.onerror = () => {
      cleanup();
      this.speakNative(fallbackText, onEnd);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked? Fallback to TTS.
        cleanup();
        this.speakNative(fallbackText, onEnd);
      });
    }

    return () => cleanup();
  }

  private speakNative(text: string, onEnd?: () => void): () => void {
    if (!this.synth) {
      if (onEnd) onEnd();
      return () => {};
    }

    // Refresh voices if empty (last resort)
    if (this.voices.length === 0) this.populateVoices();

    // CANCEL IS MANDATORY
    // On iOS, if you don't cancel the previous (even finished) utterance, 
    // the queue gets stuck.
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Voice Config
    utterance.rate = 0.85; // Slightly slower for learning
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
      utterance.lang = this.preferredVoice.lang;
    } else {
      // Robust Fallback: Android/iOS usually handle 'ar' well automatically
      utterance.lang = 'ar';
    }

    // GC REGISTRY ADDITION
    this.activeUtterances.add(utterance);

    // Event Handlers
    utterance.onend = () => {
      this.activeUtterances.delete(utterance); // Release memory
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.activeUtterances.delete(utterance);
      // 'interrupted' and 'canceled' are not real errors in our flow
      if (e.error !== 'interrupted' && e.error !== 'canceled' && onEnd) {
        onEnd();
      }
    };

    // SYNCHRONOUS EXECUTION
    // Do not put setTimeout here. It breaks iOS.
    try {
      this.synth.speak(utterance);
      
      // Android Wake-Lock Hack
      // If the engine is idle, pausing and resuming wakes it up.
      if (navigator.userAgent.toLowerCase().includes('android')) {
        this.synth.pause();
        this.synth.resume();
      }
    } catch (e) {
      console.error("TTS Critical Error", e);
      if (onEnd) onEnd();
    }

    // Return a cleanup function for React useEffects
    return () => {
      this.stopAll();
    };
  }

  public stopAll() {
    // Stop File Audio
    if (this.currentAudioFile) {
      this.currentAudioFile.pause();
      this.currentAudioFile.src = '';
      this.currentAudioFile = null;
    }

    // Stop TTS
    if (this.synth) {
      this.synth.cancel();
    }
    
    // Clear Registry
    this.activeUtterances.clear();
  }
}

export const audioService = AudioService.getInstance();

export const playArabicAudio = (text: string, audioUrl?: string, onEnd?: () => void) => {
  return audioService.play(text, audioUrl, onEnd);
};
