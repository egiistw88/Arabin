import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Check, AlertCircle } from 'lucide-react';
import { Sentence, Segment } from '../types';
import { SFX } from '../services/sfx';

interface SentenceBuilderProps {
  sentence: Sentence;
  onSuccess: () => void;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({ sentence, onSuccess }) => {
  // Shuffle segments for the challenge
  const [availableWords, setAvailableWords] = useState<Segment[]>([]);
  const [builtSentence, setBuiltSentence] = useState<Segment[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (sentence && sentence.segments) {
        resetChallenge();
    }
  }, [sentence]); // Reset whenever sentence changes

  const resetChallenge = () => {
    // Robust Fisher-Yates Shuffle
    // To ensure the words are truly randomized
    const shuffled = [...sentence.segments];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setAvailableWords(shuffled);
    setBuiltSentence([]);
    setFeedback(null);
  };

  const handleAddWord = (segment: Segment) => {
    SFX.playPop();
    setBuiltSentence([...builtSentence, segment]);
    setAvailableWords(availableWords.filter(w => w.id !== segment.id));
    setFeedback(null);
  };

  const handleRemoveWord = (segment: Segment) => {
    SFX.playPop();
    setAvailableWords([...availableWords, segment]);
    setBuiltSentence(builtSentence.filter(w => w.id !== segment.id));
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!sentence || !sentence.segments) return;

    const currentString = builtSentence.map(s => s.id).join('-');
    const correctString = sentence.segments.map(s => s.id).join('-');

    if (currentString === correctString) {
      SFX.playSuccess();
      setFeedback('Ahsanta! Susunan kalimatmu tepat.');
      setTimeout(onSuccess, 1000);
    } else {
      SFX.playError();
      // Intelligent Feedback Logic
      // Check if the first word is correct
      if (builtSentence.length > 0 && builtSentence[0].id !== sentence.segments[0].id) {
         setFeedback("Awal kalimat belum tepat. Coba perhatikan lagi Mubtada atau Isim Isyarah-nya.");
      } 
      // Check if the last word is correct (usually the Khobar/Majrur)
      else if (builtSentence.length === sentence.segments.length && 
               builtSentence[builtSentence.length - 1].id !== sentence.segments[sentence.segments.length - 1].id) {
         setFeedback("Akhiran kalimat sepertinya tertukar.");
      } 
      else {
         setFeedback("Urutan masih keliru. Coba rasakan alur logikanya.");
      }
    }
  };

  // Safety fallback
  if (!sentence || !sentence.segments) return null;

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-serif font-bold text-[#1a1512] flex items-center gap-2">
          <RefreshCcw className="w-4 h-4 text-[#8a1c1c]" />
          Latihan Tarkib (Menyusun)
        </h3>
        <span className="text-xs text-gray-400">Susun kata di bawah ini</span>
      </div>

      {/* Target Area (Slot) */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap gap-2 items-center justify-center min-h-[100px] shadow-inner" dir="rtl">
        <AnimatePresence>
          {builtSentence.length === 0 && (
             <p className="text-gray-300 text-sm font-serif italic absolute pointer-events-none">Ketuk kata di bawah untuk menyusun...</p>
          )}
          {builtSentence.map((word) => (
            <motion.button
              key={word.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => handleRemoveWord(word)}
              className="bg-[#fdfbf7] border border-[#1a1512] text-[#1a1512] font-arabic text-2xl px-4 py-2 rounded-lg shadow-sm hover:bg-red-50"
            >
              {word.text}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Feedback Message */}
      <div className="h-8 mb-4 text-center">
         {feedback && (
            <motion.p 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm font-bold flex items-center justify-center gap-2 ${feedback.includes('Ahsanta') ? 'text-green-600' : 'text-amber-600'}`}
            >
                {feedback.includes('Ahsanta') ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {feedback}
            </motion.p>
         )}
      </div>

      {/* Source Words */}
      <div className="flex flex-wrap gap-3 justify-center mb-6" dir="rtl">
        {availableWords.map((word) => (
          <motion.button
            key={word.id}
            layoutId={word.id}
            onClick={() => handleAddWord(word)}
            className="bg-white border-b-4 border-[#8a1c1c] text-[#1a1512] font-arabic text-2xl px-5 py-3 rounded-xl shadow hover:translate-y-1 transition-transform"
          >
            {word.text}
          </motion.button>
        ))}
      </div>

      {/* Check Button */}
      <button
        onClick={checkAnswer}
        disabled={builtSentence.length !== sentence.segments.length}
        className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-colors
            ${builtSentence.length !== sentence.segments.length 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-[#1a1512] text-white hover:bg-[#333] shadow-lg'}
        `}
      >
        Cek Susunan
      </button>
    </div>
  );
};