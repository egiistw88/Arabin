import React, { useState } from 'react';
import { Volume2, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioControlProps {
  onPlay: () => void;
}

export const AudioControl: React.FC<AudioControlProps> = ({ onPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      onPlay();
      // Simulate audio ending after 3 seconds
      setTimeout(() => setIsPlaying(false), 3000); 
    }
  };

  return (
    <button 
      onClick={togglePlay}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all
        ${isPlaying 
          ? 'bg-[#8a1c1c] text-[#fdfbf7] border-[#8a1c1c]' 
          : 'bg-transparent text-[#8a1c1c] border-[#8a1c1c] hover:bg-[#8a1c1c]/10'
        }
      `}
    >
      {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      <span className="text-xs font-serif font-bold uppercase tracking-widest">
        {isPlaying ? 'Mendengarkan...' : 'Dengar'}
      </span>
      {isPlaying && (
        <span className="flex gap-0.5 h-3 items-end ml-1">
           <motion.span animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-white/70" />
           <motion.span animate={{ height: [6, 10, 3] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-0.5 bg-white/70" />
           <motion.span animate={{ height: [2, 12, 5] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-white/70" />
        </span>
      )}
    </button>
  );
};