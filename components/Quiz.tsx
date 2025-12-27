import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, HelpCircle, Trophy } from 'lucide-react';
import { Sentence, WordType } from '../types';
import { SFX } from '../services/sfx';

interface QuizProps {
  sentence: Sentence;
  onComplete: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ sentence, onComplete }) => {
  if (!sentence || !sentence.segments) {
      return null;
  }

  const [targetState, setTargetState] = useState<{ id: string, type: string } | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (!sentence || !sentence.segments) return;

    let targetSegment = sentence.segments.find(s => s.type === WordType.OPERATOR);
    let type = 'OPERATOR';

    if (!targetSegment) {
        targetSegment = sentence.segments.find(s => 
            s.grammaticalRole === 'Mubtada' || 
            s.grammaticalRole === 'Fa\'il' || 
            s.grammaticalRole === 'Fail'
        );
        type = 'SUBJECT';
    }

    if (!targetSegment) {
        targetSegment = sentence.segments.find(s => s.type === WordType.NOUN);
        type = 'NOUN';
    }

    if (targetSegment) {
        setTargetState({ id: targetSegment.id, type });
    }
  }, [sentence]);

  if (!targetState) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
           <motion.div 
             initial={{ scale: 0 }} animate={{ scale: 1 }} type="spring"
             className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
           >
              <Trophy className="w-10 h-10 text-green-700" />
           </motion.div>
           <h3 className="font-serif font-bold text-2xl mb-2">Bab Selesai!</h3>
           <p className="text-gray-500 mb-8">Kamu telah menyelesaikan materi bacaan ini.</p>
           <button 
             onClick={onComplete}
             className="px-8 py-3 bg-[#1a1512] text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
           >
             Lanjut ke Menu
           </button>
        </div>
    );
  }

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const correct = id === targetState.id;
    setIsCorrect(correct);
    
    if (correct) {
      SFX.playSuccess();
      setTimeout(onComplete, 2000);
    } else {
      SFX.playError();
    }
  };

  const getQuestionText = () => {
    if (targetState.type === 'OPERATOR') {
        return (
            <>
                Tunjukkan manakah <br/>
                <span className="font-bold text-[#8a1c1c] bg-[#fee2e2] px-2 rounded">AMIL (FAKTOR PENGUBAH)</span> <br/>
                dalam kalimat ini:
            </>
        );
    } else if (targetState.type === 'SUBJECT') {
        return (
            <>
                Tunjukkan manakah <br/>
                <span className="font-bold text-[#1e40af] bg-[#dbeafe] px-2 rounded">SUBJEK (MUBTADA/FA'IL)</span> <br/>
                atau Pelaku Utama:
            </>
        );
    } else {
         return (
            <>
                Tunjukkan manakah <br/>
                <span className="font-bold text-[#1e40af] bg-[#dbeafe] px-2 rounded">KATA BENDA (ISIM)</span> <br/>
                dalam kalimat ini:
            </>
        );
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#fff] border-2 border-[#1a1512] p-8 relative shadow-lg transform rotate-1 rounded-sm mt-10">
      {/* Paku/Pin Visual */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#8a1c1c] border border-[#1a1512] shadow-sm"></div>

      <h3 className="text-center font-bold text-[#8a1c1c] uppercase tracking-widest text-lg mb-6 border-b-2 border-double border-[#dcd0b3] pb-2 font-serif">
        MUNAQASYAH (UJIAN)
      </h3>
      
      <p className="mb-8 text-center text-[#1a1512] font-serif text-lg leading-relaxed">
        Wahai penuntut ilmu, <br/>
        {getQuestionText()}
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center mb-6" dir="rtl">
        {sentence.segments.map((seg) => (
          <motion.button
            key={seg.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(seg.id)}
            disabled={isCorrect === true}
            className={`
              px-6 py-3 text-3xl font-arabic transition-all border-2 rounded-lg shadow-sm relative
              ${selectedId === seg.id 
                ? (isCorrect ? 'text-green-800 border-green-600 bg-green-50 z-10' : 'text-red-800 border-red-600 bg-red-50')
                : 'text-[#1a1512] border-[#dcd0b3] hover:border-[#1a1512] hover:bg-[#f9fafb]'
              }
            `}
          >
            {seg.text}
          </motion.button>
        ))}
      </div>

      {isCorrect !== null && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={`text-center font-bold font-serif text-lg flex flex-col items-center gap-2 mt-8 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}
        >
          {isCorrect ? (
            <>
              <motion.div 
                initial={{ rotate: -45 }} animate={{ rotate: 0 }} 
                className="bg-green-100 p-3 rounded-full border-2 border-green-600"
              >
                 <Check className="w-8 h-8" /> 
              </motion.div>
              <span>Ahsanta! Jawabanmu Tepat.</span>
              <span className="text-xs text-black font-sans font-normal opacity-50">Mengalihkan ke menu...</span>
            </>
          ) : (
            <>
              <X className="w-12 h-12 border-4 border-current rounded-full p-2 mb-2" /> 
              <span>Khata' (Salah). Coba lagi.</span>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};