import React from 'react';
import { motion as m } from 'framer-motion';
import { Segment } from '../types';
import { TYPE_COLORS, BOUNCE } from '../constants';
import { SFX } from '../services/sfx';

const motion = m as any;

interface ArabicWordProps {
  segment: Segment;
  isSelected: boolean;
  isRelated: boolean; 
  onClick: (segment: Segment) => void;
  showHints: boolean;
}

export const ArabicWord: React.FC<ArabicWordProps> = ({ segment, isSelected, isRelated, onClick, showHints }) => {
  if (!segment) return null;

  const displayText = segment.text || '';
  
  let textColor = showHints 
    ? (TYPE_COLORS[segment.type] || 'text-[#1a1512]') 
    : 'text-[#1a1512]';
  
  if (isSelected) textColor = 'text-[#8a1c1c]'; 
  if (isRelated) textColor = 'text-[#b45309]'; 

  const isOperator = segment.type === 'Amil';

  const handleClick = () => {
      SFX.playPop(); // Play sound
      onClick(segment);
  };

  return (
    <motion.div
      variants={BOUNCE}
      initial="initial"
      whileTap="animate"
      whileHover={{ y: -3 }} // Lift effect on hover
      onClick={handleClick}
      className="relative inline-block cursor-pointer px-2 mx-1 select-none group"
    >
        {/* 1. Selection Highlight */}
        {isSelected && (
            <motion.div 
                layoutId="highlight-bg"
                className="absolute inset-0 bg-[#ffe4e6] rounded-lg -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />
        )}

        {/* 2. Relation Highlight */}
        {isRelated && (
             <motion.div 
                className="absolute inset-0 border-2 border-dashed border-[#b45309] rounded-lg -z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            />
        )}

        {/* Operator Pulse - Subtle hint for the brain */}
        {showHints && isOperator && !isSelected && (
            <motion.div 
                className="absolute inset-0 bg-red-100 rounded-lg -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        )}

        {/* The Word */}
        <span className={`text-5xl md:text-7xl font-arabic font-bold ${textColor} drop-shadow-sm transition-colors duration-300 relative z-10`}>
            {displayText}
        </span>
      
      {/* 3. Logic Indicators (Dots) */}
      {showHints && isOperator && !isSelected && (
          <motion.div 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8a1c1c] rounded-full opacity-50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
      )}
      
      {/* 4. Vowel Emphasis */}
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