import React, { useState, useEffect } from 'react';
import { motion as m } from 'framer-motion';
import { Check, X, HelpCircle, Trophy } from 'lucide-react';
import { Sentence, WordType } from '../types';
import { SFX } from '../services/sfx';

const motion = m as any;

interface QuizProps {
  sentence: Sentence;
  onComplete: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ sentence, onComplete }) => {
  if (!sentence || !sentence.segments) {
      return null;
  }

  const [targetType, setTargetType] = useState<'OPERATOR' | 'SUBJECT' | 'NOUN' | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (!sentence || !sentence.segments) return;

    // Determine the question type based on sentence content availability
    let type: 'OPERATOR' | 'SUBJECT' | 'NOUN' | null = null;
    
    const hasOperator = sentence.segments.some(s => s.type === WordType.OPERATOR);
    const hasSubject = sentence.segments.some(s => 
        s.grammaticalRole === 'Mubtada' || 
        s.grammaticalRole === 'Fa\'il' || 
        s.grammaticalRole === 'Fail'
    );

    if (hasOperator) {
        type = 'OPERATOR';
    } else if (hasSubject) {
        type = 'SUBJECT';
    } else {
        type = 'NOUN';
    }

    setTargetType(type);
    setSelectedId(null);
    setIsCorrect(null);
  }, [sentence]);

  if (!targetType) return null;

  const handleSelect = (id: string) => {
    if (isCorrect === true) return; // Prevent clicking after success

    setSelectedId(id);
    const selectedSegment = sentence.segments.find(s => s.id === id);
    
    if (!selectedSegment) return;

    let correct = false;

    // INTELLIGENT VALIDATION: Check Role/Type instead of strict ID matching
    if (targetType === 'OPERATOR') {
        correct = selectedSegment.type === WordType.OPERATOR;
    } else if (targetType === 'SUBJECT') {
        // Any word acting as Mubtada/Fail is correct, even if there are duplicates
        correct = selectedSegment.grammaticalRole === 'Mubtada' || 
                  selectedSegment.grammaticalRole === 'Fa\'il' ||
                  selectedSegment.grammaticalRole === 'Fail';
    } else {
        // Fallback for simple sentences
        correct = selectedSegment.type === WordType.NOUN;
    }

    setIsCorrect(correct);
    
    if (correct) {
      SFX.playSuccess();
      setTimeout(onComplete, 2000);
    } else {
      SFX.playError();
    }
  };

  const getQuestionText = () => {
    if (targetType === 'OPERATOR') {
        return (
            <>
                Tunjukkan manakah <br/>
                <span className="font-bold text-[#8a1c1c] bg-[#fee2e2] px-2 rounded">AMIL (FAKTOR PENGUBAH)</span> <br/>
                dalam kalimat ini:
            </>
        );
    } else if (targetType === 'SUBJECT') {
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
              ${isCorrect === true && selectedId !== seg.id ? 'opacity-50 grayscale' : ''}
            `}
          >
            {seg.text}
          </motion.button>
        ))}
      </div>

      {isCorrect === true && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center rounded-sm"
        >
              <motion.div 
                initial={{ rotate: -45, scale: 0 }} animate={{ rotate: 0, scale: 1 }} 
                className="bg-green-100 p-4 rounded-full border-4 border-green-600 mb-4 shadow-xl"
              >
                 <Check className="w-10 h-10 text-green-700" /> 
              </motion.div>
              <h2 className="text-2xl font-serif font-bold text-green-800 mb-1">Ahsanta!</h2>
              <p className="text-gray-500 text-sm">Jawabanmu Tepat.</p>
        </motion.div>
      )}

      {isCorrect === false && (
         <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center text-red-600 font-bold mt-4"
         >
            <p className="flex items-center justify-center gap-2">
                <X className="w-4 h-4" /> Khata' (Salah). Coba lagi.
            </p>
         </motion.div>
      )}
    </div>
  );
};