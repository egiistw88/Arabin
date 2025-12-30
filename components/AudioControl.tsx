
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Pause, VolumeX, Loader2 } from 'lucide-react'; 
import { motion as m } from 'framer-motion';
import { playArabicAudio, audioService } from '../services/audio';

const motion = m as any;

interface AudioControlProps {
  text: string;
  audioSrc?: string;
}

export const AudioControl: React.FC<AudioControlProps> = ({ text, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // If text changes (e.g., navigating to next page), hard stop previous audio
    stopAudio();
    setError(false);
    return () => stopAudio();
  }, [text]);

  const stopAudio = () => {
    if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
    }
    audioService.stopAll();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (error) {
        setError(false); // Retry mode
    }

    if (isPlaying) {
      stopAudio();
    } else {
      setIsPlaying(true);
      
      try {
          // Play returns a cleanup function
          cleanupRef.current = playArabicAudio(text, audioSrc, () => {
              setIsPlaying(false);
              cleanupRef.current = null;
          });
      } catch (e) {
          console.error("Audio Playback Failed:", e);
          setIsPlaying(false);
          setError(true);
      }
    }
  };

  return (
    <button 
      onClick={(e) => {
        e.stopPropagation(); 
        togglePlay();
      }}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all shadow-sm select-none
        ${error 
            ? 'bg-red-50 text-red-500 border-red-200' 
            : isPlaying 
                ? 'bg-[#8a1c1c] text-[#fdfbf7] border-[#8a1c1c]' 
                : 'bg-white text-[#8a1c1c] border-[#8a1c1c] hover:bg-[#8a1c1c]/5'
        }
      `}
      title={error ? "Coba lagi" : isPlaying ? "Hentikan" : "Putar suara"}
    >
      {error ? (
          <VolumeX className="w-4 h-4" />
      ) : isPlaying ? (
          <Pause className="w-4 h-4 fill-current" />
      ) : (
          <Volume2 className="w-4 h-4" />
      )}
      
      <span className="text-xs font-serif font-bold uppercase tracking-widest min-w-[3rem] text-center">
        {error ? 'Error' : isPlaying ? 'Stop' : 'Audio'}
      </span>
      
      {/* Visualizer Animation */}
      {isPlaying && !error && (
        <span className="flex gap-0.5 h-3 items-end ml-1">
           <motion.span animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-white/80 rounded-full" />
           <motion.span animate={{ height: [6, 10, 3] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-0.5 bg-white/80 rounded-full" />
           <motion.span animate={{ height: [2, 12, 5] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-white/80 rounded-full" />
        </span>
      )}
    </button>
  );
};
