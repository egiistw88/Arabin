/**
 * Utility untuk menangani Text-to-Speech Bahasa Arab.
 * Menggunakan Web Speech API native browser sebagai fallback cerdas.
 * Menerapkan Singleton Pattern untuk mencegah suara tumpang tindih.
 */

// Global variable to track the currently playing audio instance
let currentAudio: HTMLAudioElement | null = null;

export const playArabicAudio = (text: string, audioUrl?: string, onEnd?: () => void): () => void => {
  // 1. Cleanup: Hentikan audio atau TTS yang sedang berjalan
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  window.speechSynthesis.cancel();

  // 2. Coba Audio URL jika valid (bukan dummy example.com)
  if (audioUrl && !audioUrl.includes('example.com') && !audioUrl.includes('placeholder')) {
    const audio = new Audio(audioUrl);
    currentAudio = audio; // Track this instance
    
    const handleEnd = () => {
      currentAudio = null;
      if (onEnd) onEnd();
    };

    const handleError = () => {
        // Fallback ke TTS jika file audio gagal load
        console.warn("Audio file unreachable, falling back to Native TTS");
        currentAudio = null;
        speakNative(text, onEnd);
    };

    audio.addEventListener('ended', handleEnd);
    audio.addEventListener('error', handleError);
    
    // Play with promise handling
    audio.play().catch(e => {
        console.warn("Autoplay blocked or failed, falling back to TTS", e);
        // Jika autoplay diblokir browser atau error lain, fallback ke TTS
        currentAudio = null;
        speakNative(text, onEnd);
    });

    // Return cleanup function to stop audio explicitly
    return () => {
        if (currentAudio === audio) {
            audio.pause();
            currentAudio = null;
        }
        audio.removeEventListener('ended', handleEnd);
        audio.removeEventListener('error', handleError);
    };
  } 
  
  // 3. Jika tidak ada file audio, langsung gunakan Native TTS
  return speakNative(text, onEnd);
};

// Helper untuk Native TTS
const speakNative = (text: string, onEnd?: () => void): () => void => {
    if (!('speechSynthesis' in window)) {
        console.error("Browser tidak mendukung Speech Synthesis");
        if (onEnd) onEnd();
        return () => {};
    }

    // Cancel antrian suara sebelumnya (Double check)
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA'; // Kode bahasa Arab Saudi
    utterance.rate = 0.85; // Sedikit diperlambat agar cocok untuk pembelajar
    utterance.pitch = 1;

    // Upaya mendapatkan suara terbaik yang tersedia di perangkat user
    // Chrome memuat voices secara async, jadi kita coba ambil langsung
    const voices = window.speechSynthesis.getVoices();
    // Prioritaskan suara spesifik jika ada (misal Google Arabic atau Maged Apple)
    const arabicVoice = voices.find(v => v.lang.includes('ar'));
    
    if (arabicVoice) {
        utterance.voice = arabicVoice;
    }

    utterance.onend = () => {
        if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
        console.error("TTS Error", e);
        if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);

    // Return cleanup function
    return () => window.speechSynthesis.cancel();
}