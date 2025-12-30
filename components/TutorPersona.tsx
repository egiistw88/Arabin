
import React from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Tag, Sparkles, AlertCircle, ArrowDown, ArrowUpRight, Search } from 'lucide-react';
import { Segment, WordType, LogicId } from '../types';

const motion = m as any;

interface TutorPersonaProps {
  selectedSegment: Segment | null;
}

export const TutorPersona: React.FC<TutorPersonaProps> = ({ selectedSegment }) => {
  if (!selectedSegment) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center h-full bg-gray-50 rounded-xl border border-dashed border-gray-200">
        <Sparkles className="w-8 h-8 text-gray-300 mb-2" />
        <h4 className="font-serif font-bold text-[#1a1512] mb-1">Analisa Logika</h4>
        <p className="font-serif italic text-xs text-gray-400">"Ketuk salah satu kata Arab di atas untuk melihat mengapa harakatnya berubah."</p>
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
                <h3 className="font-arabic text-3xl font-bold leading-none text-[#1a1512] mb-1">{selectedSegment.text}</h3>
                <span className="text-[10px] font-sans text-gray-400 uppercase tracking-widest inline-block">
                    {selectedSegment.rootWord ? `Akar: ${selectedSegment.rootWord}` : 'Kata Dasar'}
                </span>
            </div>
            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${isOperator ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-blue-50 text-blue-800 border border-blue-100'}`}>
                {selectedSegment.type}
            </span>
        </div>

        {/* Content: Penjelasan */}
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4">
            
            {/* Status Gramatikal */}
            <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg">
                <Tag className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-sm font-bold text-[#1a1512]">
                        {selectedSegment.grammaticalRole || 'Posisi belum ditentukan'}
                    </p>
                    {selectedSegment.vowelEnding && (
                        <p className="text-xs text-gray-500 mt-0.5">
                            Tanda: <span className="font-bold text-[#1a1512]">{selectedSegment.vowelEnding === 'u' || selectedSegment.vowelEnding === 'un' ? 'Dommah (u/un)' : selectedSegment.vowelEnding === 'i' || selectedSegment.vowelEnding === 'in' ? 'Kasrah (i/in)' : 'Fathah (a/an)'}</span>
                        </p>
                    )}
                </div>
            </div>

            {/* Penjelasan Logika Dasar */}
            <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-600 leading-relaxed font-serif">
                   {selectedSegment.explanation}
                </div>
            </div>

            {/* DEEP LOGIC / NUANCE (New Feature) */}
            {selectedSegment.deepLogic && (
                 <div className="mt-2 pl-3 border-l-2 border-[#1a1512]/20">
                     <div className="flex items-center gap-1.5 mb-1">
                        <Search className="w-3 h-3 text-[#1a1512]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a1512]">Logika Kuncian</span>
                     </div>
                     <p className="text-xs text-gray-500 italic font-serif">
                        "{selectedSegment.deepLogic}"
                     </p>
                 </div>
            )}
            
             {/* Kausalitas Highlight (The Aha Moment) */}
            {selectedSegment.logicId === LogicId.AFTER_PREPOSITION && (
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-2 bg-amber-50 p-3 rounded-lg border border-amber-100 text-xs text-amber-900 flex flex-col gap-1 relative overflow-hidden"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400"></div>
                    <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[10px] text-amber-600">
                        <ArrowDown className="w-3 h-3" />
                        Efek Domino (Sebab-Akibat)
                    </div>
                    <p className="leading-relaxed">
                        Harakatnya jadi Kasrah (i) <span className="underline decoration-amber-400 decoration-2 underline-offset-2">bukan kebetulan</span>, tapi karena dipaksa oleh Huruf Jar di depannya.
                    </p>
                </motion.div>
            )}

            {selectedSegment.logicId === LogicId.PREPOSITION_TRIGGER && (
                 <motion.div 
                 initial={{ scale: 0.95, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="mt-2 bg-red-50 p-3 rounded-lg border border-red-100 text-xs text-red-900 flex flex-col gap-1 relative overflow-hidden"
             >
                 <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[10px] text-red-600">
                     <ArrowUpRight className="w-3 h-3" />
                     Sang Eksekutor (Amil)
                 </div>
                 <p className="leading-relaxed">
                     Kata inilah "Pelaku Utama" yang mengubah harakat kata setelahnya menjadi Kasrah.
                 </p>
             </motion.div>
            )}
        </div>

      </motion.div>
    </AnimatePresence>
  );
};
