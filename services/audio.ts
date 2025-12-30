
/**
 * Advanced Text-to-Speech Handler for Arabic
 * Fixes issues with:
 * 1. Garbage Collection killing audio prematurely
 * 2. Race conditions (overlapping audio)
 * 3. Mobile browser delays/blocks
 */

// GLOBAL STATE TRACKERS
let currentAudioObj: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null; // Prevent GC removal
let voicesLoaded = false;
let arabicVoice: SpeechSynthesisVoice | null = null;

// 1. VOICE PRE-LOADING (CRITICAL FOR ANDROID/CHROME)
const loadVoices = () => {
    if (!('speechSynthesis' in window)) return;
    
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        // Prioritas: Google Arabic -> Microsoft Arabic -> Generic Arabic -> Lang ID
        arabicVoice = voices.find(v => v.lang === 'ar-SA' && v.name.includes('Google')) ||
                      voices.find(v => v.lang.includes('ar-SA')) ||
                      voices.find(v => v.lang.includes('ar')) ||
                      null;
        voicesLoaded = true;
    }
};

// Initialize voices immediately
if ('speechSynthesis' in window) {
    loadVoices();
    // Chrome needs this event to load voices async
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

export const playArabicAudio = (text: string, audioUrl?: string, onEnd?: () => void): () => void => {
  // A. HARD RESET (Stop all previous sounds immediately)
  if (currentAudioObj) {
    currentAudioObj.pause();
    currentAudioObj.currentTime = 0;
    currentAudioObj = null;
  }
  
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Clears queue
  }

  // Helper to handle completion safely
  const handleEnd = () => {
      activeUtterance = null; // Release memory
      if (onEnd) onEnd();
  };

  // B. STRATEGY 1: PLAY AUDIO FILE (Only if URL is valid & real)
  // Check if URL is valid and NOT a placeholder/example
  const isValidUrl = audioUrl && 
                     audioUrl.length > 5 && 
                     !audioUrl.includes('example.com') && 
                     !audioUrl.includes('placeholder');

  if (isValidUrl) {
    const audio = new Audio(audioUrl);
    currentAudioObj = audio;
    
    // Safety check: If audio fails to load quickly, fallback to TTS
    const loadTimeout = setTimeout(() => {
        if (currentAudioObj === audio && audio.readyState === 0) {
            console.warn("Audio load timeout, switching to TTS");
            audio.pause();
            speakNative(text, handleEnd);
        }
    }, 2000); 

    audio.onended = () => {
        clearTimeout(loadTimeout);
        handleEnd();
    };

    audio.onerror = () => {
        clearTimeout(loadTimeout);
        console.warn("Audio file error, falling back to TTS");
        speakNative(text, handleEnd);
    };
    
    // Attempt play
    audio.play().catch(e => {
        clearTimeout(loadTimeout);
        console.warn("Autoplay blocked/failed, falling back to TTS", e);
        speakNative(text, handleEnd);
    });

    return () => {
        clearTimeout(loadTimeout);
        audio.pause();
        if (currentAudioObj === audio) currentAudioObj = null;
    };
  } 
  
  // C. STRATEGY 2: NATIVE TTS (Immediate Fallback)
  return speakNative(text, handleEnd);
};

// Internal TTS Logic
const speakNative = (text: string, onEnd: () => void): () => void => {
    if (!('speechSynthesis' in window)) {
        console.error("Browser does not support TTS");
        onEnd();
        return () => {};
    }

    // Double ensure queue is clear
    window.speechSynthesis.cancel();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Keep reference in global scope to prevent Garbage Collection (Fixes audio cutting off)
    activeUtterance = utterance;

    // Config
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8; // Slower for learning
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Apply pre-loaded voice if available
    if (!voicesLoaded) loadVoices(); // Try loading again just in case
    if (arabicVoice) {
        utterance.voice = arabicVoice;
    }

    // Events
    utterance.onend = () => {
        onEnd();
        activeUtterance = null; // Clean ref
    };

    utterance.onerror = (e) => {
        // 'canceled' or 'interrupted' errors are normal when user clicks fast
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
             console.error("TTS Error:", e);
        }
        onEnd();
        activeUtterance = null;
    };

    // SPEAK
    window.speechSynthesis.speak(utterance);

    // Return Cleanup Function
    return () => {
        window.speechSynthesis.cancel();
        activeUtterance = null;
    };
}
