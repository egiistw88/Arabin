
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, GraduationCap, Lightbulb, ChevronRight, HelpCircle } from 'lucide-react';
import { LessonSummary as SummaryType } from '../types';
import { SFX } from '../services/sfx';

interface LessonSummaryProps {
  summary: SummaryType;
  onComplete: () => void;
  onAskTeacher: () => void; // New callback
}

export const LessonSummary: React.FC<LessonSummaryProps> = ({ summary, onComplete, onAskTeacher }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full max-w-lg mx-auto p-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24">
      
      {/* Title */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
             <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-[#1a1512]">Sesi Selesai</h2>
        <p className="text-gray-500 text-sm">Bagaimana pemahamanmu sejauh ini?</p>
      </motion.div>

      {/* Card Content */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-full relative mb-6">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#8a1c1c]"></div>
        
        <div className="p-6">
            <h3 className="font-bold text-lg text-[#1a1512] mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                <GraduationCap className="w-5 h-5 text-[#8a1c1c]" />
                {summary.title || "Ringkasan Materi"}
            </h3>

            <ul className="space-y-3 mb-6">
                {summary.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1a1512] mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 relative mt-6">
                <Lightbulb className="w-5 h-5 text-amber-500 absolute -top-2.5 -left-2.5 bg-white rounded-full p-0.5 shadow-sm border border-amber-100" />
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Tips Rahasia Guru</p>
                <p className="text-xs text-amber-900 italic font-serif leading-relaxed">
                    "{summary.teacherTip}"
                </p>
            </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="w-full space-y-3">
        {/* Primary Action: Understand */}
        <button 
            onClick={() => { SFX.playClick(); onComplete(); }}
            className="w-full py-4 bg-[#1a1512] text-white rounded-xl font-bold shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 group border-2 border-[#1a1512]"
        >
            <span>Saya Faham, Lanjut</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Secondary Action: Ask Teacher */}
        <button 
            onClick={() => { SFX.playPop(); onAskTeacher(); }}
            className="w-full py-4 bg-white text-[#8a1c1c] rounded-xl font-bold shadow-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2 group border-2 border-dashed border-[#8a1c1c]/30"
        >
            <HelpCircle className="w-4 h-4" />
            <span>Belum Faham, Tanya Ustadz AI</span>
        </button>
      </div>

    </div>
  );
};
