import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { playArabicAudio } from '../services/audio';

interface AudioControlProps {
  text: string;
  audioSrc?: string;
}

export const AudioControl: React.FC<AudioControlProps> = ({ text, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const stopAudioRef = useRef<(() => void) | null>(null);

  // Safety cleanup: Stop audio if component unmounts or text changes
  useEffect(() => {
    return () => {
        if (stopAudioRef.current) {
            stopAudioRef.current();
        }
    };
  }, [text]);

  const togglePlay = () => {
    if (isPlaying) {
      // User wants to STOP
      if (stopAudioRef.current) stopAudioRef.current();
      setIsPlaying(false);
    } else {
      // User wants to PLAY
      setIsPlaying(true);
      // Panggil service audio kita
      stopAudioRef.current = playArabicAudio(text, audioSrc, () => {
          // Callback ketika audio selesai
          setIsPlaying(false);
      });
    }
  };

  return (
    <button 
      onClick={togglePlay}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all shadow-sm
        ${isPlaying 
          ? 'bg-[#8a1c1c] text-[#fdfbf7] border-[#8a1c1c]' 
          : 'bg-white text-[#8a1c1c] border-[#8a1c1c] hover:bg-[#8a1c1c]/5'
        }
      `}
    >
      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
      <span className="text-xs font-serif font-bold uppercase tracking-widest">
        {isPlaying ? 'Dengarkan...' : 'Audio'}
      </span>
      
      {/* Visualizer Animation */}
      {isPlaying && (
        <span className="flex gap-0.5 h-3 items-end ml-1">
           <motion.span animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-white/80 rounded-full" />
           <motion.span animate={{ height: [6, 10, 3] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-0.5 bg-white/80 rounded-full" />
           <motion.span animate={{ height: [2, 12, 5] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-white/80 rounded-full" />
        </span>
      )}
    </button>
  );
};