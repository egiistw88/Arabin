import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, GraduationCap } from 'lucide-react';
import { SFX } from '../services/sfx';

interface TutorDialogProps {
  isVisible: boolean;
  text: string;
  onDismiss: () => void;
}

export const TutorDialog: React.FC<TutorDialogProps> = ({ isVisible, text, onDismiss }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[999] flex items-end justify-center pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1a1512]/60 backdrop-blur-[2px] pointer-events-auto"
            onClick={onDismiss}
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-full max-w-lg m-4 mb-6 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 pointer-events-auto relative z-10"
          >
            {/* Header / Accent Bar */}
            <div className="bg-[#1a1512] px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fdfbf7] flex items-center justify-center border-2 border-[#8a1c1c]">
                 <span className="font-arabic text-xl font-bold text-[#1a1512]">ع</span>
              </div>
              <div>
                <h3 className="text-[#fdfbf7] font-serif font-bold text-sm">Catatan Guru</h3>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest">Nasehat & Kaidah</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
                <div className="flex gap-4">
                     <div className="mt-1">
                        <GraduationCap className="w-6 h-6 text-[#8a1c1c]" />
                     </div>
                     <p className="text-[#1a1512] font-serif text-base leading-relaxed">
                        "{text}"
                     </p>
                </div>
                
                <button 
                    onClick={() => {
                        SFX.playClick();
                        onDismiss();
                    }}
                    className="mt-6 w-full py-3 bg-[#fdfbf7] border-2 border-[#1a1512] text-[#1a1512] font-bold rounded-xl hover:bg-[#1a1512] hover:text-white transition-colors flex items-center justify-center gap-2 group"
                >
                    <span>Faham, Lanjutkan</span>
                    <Check className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};