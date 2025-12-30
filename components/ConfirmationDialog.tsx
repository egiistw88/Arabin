import React from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { SFX } from '../services/sfx';

const motion = m as any;

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ 
  isOpen, 
  title, 
  message, 
  confirmLabel = "Ya, Lanjutkan", 
  cancelLabel = "Batal",
  isDanger = false,
  onConfirm, 
  onCancel 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1a1512]/60 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden border border-gray-100 p-6 w-full max-w-sm relative"
          >
             <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDanger ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                    <AlertTriangle className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-serif font-bold text-[#1a1512] mb-2">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                    {message}
                </p>

                <div className="flex gap-3 w-full">
                    <button 
                        onClick={() => { SFX.playClick(); onCancel(); }}
                        className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        {cancelLabel}
                    </button>
                    <button 
                        onClick={() => { SFX.playClick(); onConfirm(); }}
                        className={`flex-1 py-3 px-4 font-bold rounded-xl text-white transition-colors shadow-lg ${isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-[#1a1512] hover:bg-black'}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};