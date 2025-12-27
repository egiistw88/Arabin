/**
 * Utility untuk menangani Text-to-Speech Bahasa Arab.
 * Menggunakan Web Speech API native browser sebagai fallback cerdas.
 */

export const playArabicAudio = (text: string, audioUrl?: string, onEnd?: () => void): () => void => {
  // 1. Coba Audio URL jika valid (bukan dummy example.com)
  if (audioUrl && !audioUrl.includes('example.com') && !audioUrl.includes('placeholder')) {
    const audio = new Audio(audioUrl);
    
    const handleEnd = () => {
      if (onEnd) onEnd();
    };

    const handleError = () => {
        // Fallback ke TTS jika file audio gagal load
        console.warn("Audio file unreachable, falling back to Native TTS");
        speakNative(text, onEnd);
    };

    audio.addEventListener('ended', handleEnd);
    audio.addEventListener('error', handleError);
    
    // Play with promise handling
    audio.play().catch(e => {
        console.warn("Autoplay blocked or failed, falling back to TTS", e);
        // Jika autoplay diblokir browser atau error lain, fallback ke TTS
        speakNative(text, onEnd);
    });

    // Return cleanup function to stop audio
    return () => {
        audio.pause();
        audio.removeEventListener('ended', handleEnd);
        audio.removeEventListener('error', handleError);
    };
  } 
  
  // 2. Jika tidak ada file audio, langsung gunakan Native TTS
  return speakNative(text, onEnd);
};

// Helper untuk Native TTS
const speakNative = (text: string, onEnd?: () => void): () => void => {
    if (!('speechSynthesis' in window)) {
        console.error("Browser tidak mendukung Speech Synthesis");
        if (onEnd) onEnd();
        return () => {};
    }

    // Cancel antrian suara sebelumnya agar tidak tumpang tindih
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA'; // Kode bahasa Arab Saudi
    utterance.rate = 0.85; // Sedikit diperlambat agar cocok untuk pembelajar (default 1)
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