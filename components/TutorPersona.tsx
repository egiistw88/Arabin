import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Sparkles, AlertCircle } from 'lucide-react';
import { Segment, WordType, LogicId } from '../types';

interface TutorPersonaProps {
  selectedSegment: Segment | null;
}

export const TutorPersona: React.FC<TutorPersonaProps> = ({ selectedSegment }) => {
  if (!selectedSegment) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center h-full bg-gray-50 rounded-xl border border-dashed border-gray-200">
        <Sparkles className="w-8 h-8 text-gray-300 mb-2" />
        <p className="font-serif italic text-sm text-gray-400">"Klik kata Arab di atas untuk membedah logikanya."</p>
      </div>
    );
  }

  const isOperator = selectedSegment.type === WordType.OPERATOR;
  const cardBorder = isOperator ? 'border-l-4 border-l-[#8a1c1c]' : 'border-l-4 border-l-[#1a1512]';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedSegment.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${cardBorder} h-full flex flex-col`}
      >
        {/* Header: Kata & Tipe */}
        <div className="flex justify-between items-start mb-3">
            <div>
                <h3 className="font-arabic text-2xl font-bold leading-none text-[#1a1512]">{selectedSegment.text}</h3>
                <span className="text-xs font-sans text-gray-400 uppercase tracking-widest mt-1 inline-block">
                    {selectedSegment.rootWord ? `Akar: ${selectedSegment.rootWord}` : 'Kata Dasar'}
                </span>
            </div>
            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isOperator ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-800'}`}>
                {selectedSegment.type}
            </span>
        </div>

        {/* Content: Penjelasan */}
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-3">
            
            {/* Status Gramatikal */}
            <div className="flex items-start gap-2">
                <Tag className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-sm font-bold text-[#1a1512]">
                        {selectedSegment.grammaticalRole || 'Posisi belum ditentukan'}
                    </p>
                    {selectedSegment.vowelEnding && (
                        <p className="text-xs text-gray-500">
                            Harakat Akhir: <span className="font-bold">{selectedSegment.vowelEnding === 'u' ? 'Dommah (u)' : selectedSegment.vowelEnding === 'i' ? 'Kasrah (i)' : 'Fathah (a)'}</span>
                        </p>
                    )}
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Penjelasan Logika */}
            <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600 leading-relaxed font-serif">
                   {selectedSegment.explanation}
                </div>
            </div>
            
             {/* Kausalitas Highlight */}
            {selectedSegment.logicId === LogicId.AFTER_PREPOSITION && (
                <div className="mt-2 bg-amber-50 p-2 rounded-lg border border-amber-100 text-xs text-amber-800 flex gap-2">
                    <span className="font-bold">Logic Alert:</span>
                    Kata ini berubah menjadi 'i' (Kasrah) <span className="underline">hanya karena</span> kata sebelumnya adalah Huruf Jar.
                </div>
            )}
        </div>

      </motion.div>
    </AnimatePresence>
  );
};