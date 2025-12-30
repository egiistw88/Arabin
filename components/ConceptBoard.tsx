
import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lightbulb, ChevronRight, Magnet, Crown, Component } from 'lucide-react';
import { ConceptSlide } from '../types';
import { SFX } from '../services/sfx';

const motion = m as any;

interface ConceptBoardProps {
  concepts: ConceptSlide[];
  onComplete: () => void;
}

export const ConceptBoard: React.FC<ConceptBoardProps> = ({ concepts, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    SFX.playClick();
    if (currentIndex < concepts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const currentConcept = concepts[currentIndex];
  
  // Icon Mapping logic (simple heuristic)
  const renderIcon = () => {
     if (currentConcept.title.includes("Jembatan")) return <Component className="w-8 h-8 text-blue-500" />;
     if (currentConcept.title.includes("Musuh")) return <Crown className="w-8 h-8 text-amber-500" />;
     if (currentConcept.title.includes("Magnet") || currentConcept.title.includes("Jar")) return <Magnet className="w-8 h-8 text-red-500" />;
     return <Lightbulb className="w-8 h-8 text-yellow-500" />;
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] pt-6 pb-20 px-4">
      
      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {concepts.map((_, idx) => (
          <motion.div 
            key={idx}
            animate={{ 
                width: idx === currentIndex ? 24 : 8,
                backgroundColor: idx === currentIndex ? '#8a1c1c' : '#d1d5db' 
            }}
            className="h-2 rounded-full"
          />
        ))}
      </div>

      {/* Main Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center relative overflow-hidden flex-1 justify-center"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-10 -mt-10 opacity-50 z-0"></div>

          <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-4 ring-white">
                 {renderIcon()}
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#1a1512] mb-4">
                {currentConcept.title}
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-xs">
                {currentConcept.description}
              </p>

              {/* Visual Rule Box */}
              <div className="w-full bg-[#1a1512] text-white rounded-xl p-4 shadow-lg mb-4">
                 <div className="flex items-center justify-center gap-4 text-lg font-bold font-arabic mb-2">
                    <span className="opacity-50 line-through decoration-red-500 decoration-2">{currentConcept.visualRule.before}</span>
                    <ArrowRight className="w-5 h-5 text-[#8a1c1c]" />
                    <span className="text-green-400">{currentConcept.visualRule.after}</span>
                 </div>
                 <p className="text-[10px] text-gray-400 border-t border-gray-700 pt-2 mt-2 font-serif">
                    {currentConcept.visualRule.explanation}
                 </p>
              </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Button */}
      <div className="mt-8">
        <button 
          onClick={handleNext}
          className="w-full py-4 bg-[#8a1c1c] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
        >
           {currentIndex === concepts.length - 1 ? 'Mulai Praktek' : 'Lanjut'}
           <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
