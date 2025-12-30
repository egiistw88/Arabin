
/**
 * Professional Audio Engine for Arabic TTS
 * 
 * ARCHITECTURE NOTES:
 * 1. Hybrid Strategy: Prioritizes static Audio Files (High Quality) -> Fallbacks to Native TTS (Reliability).
 * 2. Memory Management: Fixes Chrome/Android Garbage Collection bug where audio cuts off.
 * 3. iOS Compatibility: Ensures 'voiceschanged' is handled correctly for Safari.
 * 4. Error Handling: Replaces timeout-based fallbacks with event-driven fallbacks (onerror).
 */

// --- STATE MANAGEMENT ---
// Global references to prevent Garbage Collection (CRITICAL for TTS stability)
const state = {
  currentAudioObj: null as HTMLAudioElement | null,
  activeUtterance: null as SpeechSynthesisUtterance | null,
  voices: [] as SpeechSynthesisVoice[],
  preferredVoice: null as SpeechSynthesisVoice | null,
  voicesLoaded: false
};

// --- VOICE LOADER ENGINE ---
const loadVoices = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  const allVoices = window.speechSynthesis.getVoices();
  
  if (allVoices.length > 0) {
    state.voices = allVoices;
    state.voicesLoaded = true;

    // HEURISTIC: Find the best Arabic voice
    // Priority: 
    // 1. Google Arabic (Natural sounding on Android)
    // 2. Maged (High quality on iOS)
    // 3. Any region-specific Arabic (ar-SA, ar-EG)
    // 4. Any generic Arabic (ar)
    state.preferredVoice = 
      allVoices.find(v => v.lang === 'ar-SA' && v.name.includes('Google')) ||
      allVoices.find(v => v.name.includes('Maged')) || 
      allVoices.find(v => v.lang === 'ar-SA') ||
      allVoices.find(v => v.lang.startsWith('ar-')) ||
      allVoices.find(v => v.lang === 'ar') ||
      null;

    // console.log("Audio Engine: Voices Loaded.", state.preferredVoice ? `Selected: ${state.preferredVoice.name}` : "No Arabic Voice Found");
  }
};

// Initialize voice loading immediately and listen for async updates
if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices();
  // Chrome/Android loads voices asynchronously
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

// --- PUBLIC API ---

export const playArabicAudio = (text: string, audioUrl?: string, onEnd?: () => void): () => void => {
  // 1. HARD RESET: Stop everything currently playing
  stopAllAudio();

  // 2. STRATEGY A: AUDIO FILE (High Fidelity)
  // We utilize Event-Driven Fallback instead of setTimeout to prevent race conditions.
  const isValidUrl = audioUrl && audioUrl.length > 5 && !audioUrl.includes('placeholder');

  if (isValidUrl) {
    // console.log("Audio Engine: Attempting File Playback", audioUrl);
    const audio = new Audio(audioUrl);
    state.currentAudioObj = audio;

    const handleFileEnd = () => {
      cleanupAudioFile();
      if (onEnd) onEnd();
    };

    const handleFileError = (e: Event | string) => {
      // console.warn("Audio Engine: File failed, switching to TTS fallback.", e);
      cleanupAudioFile();
      // IMMEDIATE FALLBACK to TTS
      speakNative(text, onEnd);
    };

    audio.onended = handleFileEnd;
    audio.onerror = handleFileError;
    
    // Attempt play. If autoplay policy blocks it, catch and fallback.
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // console.warn("Audio Engine: Autoplay blocked or interrupted.", error);
        handleFileError(error.message);
      });
    }

    // Return canceller
    return () => {
      cleanupAudioFile();
    };
  } 
  
  // 3. STRATEGY B: NATIVE TTS (Reliable Fallback)
  // console.log("Audio Engine: Using Native TTS");
  return speakNative(text, onEnd);
};

// --- INTERNAL HELPERS ---

const stopAllAudio = () => {
  // Stop File Audio
  cleanupAudioFile();

  // Stop TTS
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    state.activeUtterance = null;
  }
};

const cleanupAudioFile = () => {
  if (state.currentAudioObj) {
    state.currentAudioObj.pause();
    state.currentAudioObj.src = ""; // Release memory
    state.currentAudioObj.onerror = null;
    state.currentAudioObj.onended = null;
    state.currentAudioObj = null;
  }
};

const speakNative = (text: string, onEnd?: () => void): () => void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return () => {};
  }

  // Ensure queue is clear for immediate response
  window.speechSynthesis.cancel();

  // Retry loading voices if they weren't ready yet (Common in Safari on first load)
  if (!state.voicesLoaded) loadVoices();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // CRITICAL: Assign to global state to prevent Garbage Collection during playback
  state.activeUtterance = utterance;

  // Configuration
  utterance.rate = 0.85; // Slightly slower for educational purposes
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  utterance.lang = 'ar-SA'; // Default hint

  if (state.preferredVoice) {
    utterance.voice = state.preferredVoice;
  }

  // Events
  utterance.onend = () => {
    state.activeUtterance = null; // Release memory reference
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    // console.error("TTS Error Event:", e);
    state.activeUtterance = null;
    if (onEnd) onEnd();
  };

  // Speak
  window.speechSynthesis.speak(utterance);

  // Return canceller
  return () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    state.activeUtterance = null;
  };
};
