import React from 'react';
import { motion } from 'framer-motion';
import { Segment } from '../types';
import { TYPE_COLORS, BOUNCE } from '../constants';

interface ArabicWordProps {
  segment: Segment;
  isSelected: boolean;
  isRelated: boolean; // True if this word is affected by the currently selected word
  onClick: (segment: Segment) => void;
  showHints: boolean;
}

export const ArabicWord: React.FC<ArabicWordProps> = ({ segment, isSelected, isRelated, onClick, showHints }) => {
  const displayText = segment.text;
  
  // Logic: If hints are on, color code. 
  // If Selected/Related, override with high contrast colors.
  let textColor = showHints ? TYPE_COLORS[segment.type] : 'text-[#1a1512]';
  
  if (isSelected) textColor = 'text-[#8a1c1c]'; // Focus Color
  if (isRelated) textColor = 'text-[#b45309]'; // Result Color (Gold/Amber)

  return (
    <motion.div
      variants={BOUNCE}
      initial="initial"
      whileTap="animate"
      onClick={() => onClick(segment)}
      className="relative inline-block cursor-pointer px-2 mx-1 select-none group"
    >
        {/* 1. Selection Highlight (The Focus) */}
        {isSelected && (
            <motion.div 
                layoutId="highlight-bg"
                className="absolute inset-0 bg-[#ffe4e6] rounded-lg -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />
        )}

        {/* 2. Relation Highlight (The Effect/Result) */}
        {isRelated && (
             <motion.div 
                className="absolute inset-0 border-2 border-dashed border-[#b45309] rounded-lg -z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            />
        )}

        {/* The Word */}
        <span className={`text-5xl md:text-7xl font-arabic font-bold ${textColor} drop-shadow-sm transition-colors duration-300`}>
            {displayText}
        </span>
      
      {/* 3. Logic Indicators (Dots) */}
      {/* Jika ini Operator (Amil), beri titik merah di bawah */}
      {showHints && segment.type === 'Amil' && !isSelected && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8a1c1c] rounded-full opacity-50"></div>
      )}
      
      {/* 4. Vowel Emphasis (Visualizing the change) */}
      {/* Jika word ini sedang 'isRelated' (kena dampak), highlight harakat akhirnya */}
      {isRelated && (
        <motion.span 
            className="absolute bottom-2 left-2 w-8 h-8 rounded-full border-2 border-[#b45309] opacity-30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}

    </motion.div>
  );
};