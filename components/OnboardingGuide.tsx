
import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, X, HelpCircle, Sparkles } from 'lucide-react';
import { SFX } from '../services/sfx';

const motion = m as any;

export interface GuideStep {
  title: string;
  description: string;
  icon?: React.ElementType;
}

interface OnboardingGuideProps {
  id: string; // Unique ID to track if seen
  steps: GuideStep[];
  isOpen: boolean;
  onComplete: (id: string) => void;
  allowSkip?: boolean; // New prop to optionally hide skip button
}

export const OnboardingGuide: React.FC<OnboardingGuideProps> = ({ id, steps, isOpen, onComplete, allowSkip = true }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // 1. BODY SCROLL LOCK
  // Mencegah background bergerak saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset step if re-opened
  useEffect(() => {
      if(isOpen) setCurrentStep(0);
  }, [isOpen]);

  const handleNext = () => {
    SFX.playClick();
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      SFX.playSuccess();
      onComplete(id);
    }
  };

  const handleSkip = () => {
    SFX.playPop();
    onComplete(id);
  };

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const Icon = step.icon || HelpCircle;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1a1512]/80 backdrop-blur-sm"
            onClick={allowSkip ? handleSkip : undefined}
          />

          {/* Card Container */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]"
          >
            {/* Header Persona */}
            <div className="bg-[#1a1512] p-6 text-center relative flex-shrink-0">
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
               
               <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#fdfbf7] border-4 border-[#8a1c1c] flex items-center justify-center mb-3 shadow-lg relative">
                      <span className="font-arabic text-2xl font-bold text-[#1a1512]">ع</span>
                      {/* Celebration Particle on Last Step */}
                      {isLast && (
                          <motion.div 
                             initial={{ scale: 0 }} animate={{ scale: 1.5, opacity: 0 }} 
                             transition={{ duration: 0.8, repeat: Infinity }}
                             className="absolute inset-0 rounded-full border-2 border-[#fdfbf7]"
                          />
                      )}
                  </div>
                  <h3 className="text-[#fdfbf7] font-serif font-bold text-lg">Asisten Logika</h3>
                  
                  {/* Progress Indicators */}
                  <div className="flex gap-1.5 mt-3">
                    {steps.map((_, idx) => (
                        <motion.div 
                            key={idx} 
                            animate={{ 
                                width: idx === currentStep ? 24 : 8,
                                backgroundColor: idx === currentStep ? '#8a1c1c' : '#4b5563'
                            }}
                            className="h-1.5 rounded-full"
                        />
                    ))}
                  </div>
               </div>
               
               {allowSkip && (
                   <button onClick={handleSkip} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2">
                      <X className="w-5 h-5" />
                   </button>
               )}
            </div>

            {/* Body - Scrollable content for small screens */}
            <div className="p-6 text-center overflow-y-auto flex-1 custom-scrollbar">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 ring-4 ring-amber-50/50">
                    <Icon className="w-6 h-6" />
                </div>
                
                <h4 className="font-bold text-xl text-[#1a1512] mb-3 leading-tight">{step.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">
                    {step.description}
                </p>
            </div>

            {/* Footer Action - Always visible */}
            <div className="p-6 pt-2 flex-shrink-0 bg-white border-t border-gray-50">
                <button 
                    onClick={handleNext}
                    className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95
                        ${isLast ? 'bg-[#8a1c1c] text-white hover:bg-red-800' : 'bg-[#1a1512] text-white hover:bg-gray-800'}
                    `}
                >
                    {isLast ? (
                        <>Faham, Saya Siap <CheckCircle2 className="w-4 h-4" /></>
                    ) : (
                        <>Lanjut <ChevronRight className="w-4 h-4" /></>
                    )}
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};