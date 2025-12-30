import React from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Book } from 'lucide-react';
import { VocabularyItem } from '../types';

const motion = m as any;

interface VocabSheetProps {
  isOpen: boolean;
  onClose: () => void;
  vocabulary: VocabularyItem[];
}

export const VocabSheet: React.FC<VocabSheetProps> = ({ isOpen, onClose, vocabulary }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1a1512]/50 z-40 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#fdfbf7] shadow-2xl z-50 border-l border-[#dcd0b3] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-[#f4e4bc] border-b border-[#dcd0b3] flex justify-between items-center relative overflow-hidden">
               {/* Pattern Overlay */}
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
               
               <div className="flex items-center gap-3 relative z-10">
                 <div className="p-2 bg-[#8a1c1c] text-[#fdfbf7] rounded-sm">
                   <Book className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="font-bold font-serif text-[#1a1512]">Al-Mufradat</h3>
                   <p className="text-xs text-[#8a1c1c] uppercase tracking-wider">Kosa Kata Bab Ini</p>
                 </div>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full relative z-10">
                 <X className="w-6 h-6 text-[#1a1512]" />
               </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {vocabulary.length === 0 ? (
                <p className="text-center italic text-gray-400 mt-10">Belum ada data mufradat.</p>
              ) : (
                vocabulary.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-dashed border-[#dcd0b3] pb-3 last:border-0">
                    <div className="flex flex-col">
                      <span className="text-[#1a1512] font-serif font-bold text-sm">{item.latin}</span>
                      <span className="text-gray-500 text-sm italic">{item.meaning}</span>
                      {item.plural && (
                        <span className="text-[10px] text-[#8a1c1c] mt-0.5">Jamak: {item.plural}</span>
                      )}
                    </div>
                    <span className="font-arabic text-3xl text-[#1a1512] font-bold">{item.arabic}</span>
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="p-4 bg-[#f9fafb] text-center border-t border-[#dcd0b3]">
              <p className="text-xs text-gray-400 italic">"Hafalkanlah, karena ia kunci memahami kitab."</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};