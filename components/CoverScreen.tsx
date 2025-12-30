
import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { Quote, RefreshCw, Play, Layers } from 'lucide-react';
import { SFX } from '../services/sfx';
import { UserProgress } from '../types';

const motion = m as any;

interface CoverScreenProps {
  navigate: (path: string) => void;
  progress: UserProgress;
}

export const CoverScreen = ({ navigate, progress }: CoverScreenProps) => {
    const safeStreak = progress?.currentStreak || 0; 
    const [quoteIdx, setQuoteIdx] = useState(0);
    const [rotation, setRotation] = useState(0);
    
    const quotes = [
        { arab: "مَنْ جَدَّ وَجَدَ", arti: "Barangsiapa bersungguh-sungguh, ia akan dapat." },
        { arab: "مَنْ صَبَرَ ظَفِرَ", arti: "Barangsiapa bersabar, ia akan beruntung." },
        { arab: "اَلْعِلْمُ بِلَا عَمَلٍ كَالشَّجَرِ بِلَا ثَمَرٍ", arti: "Ilmu tanpa amal bagai pohon tak berbuah." }
    ];
  
    const handleLogoClick = () => {
        SFX.playSuccess();
        setRotation(r => r + 360);
    };
  
    const nextQuote = () => {
        SFX.playPop();
        setQuoteIdx((prev) => (prev + 1) % quotes.length);
    };
    
    const particles = [
      { x: '10%', y: '20%', size: 40, delay: 0 },
      { x: '80%', y: '15%', size: 60, delay: 2 },
      { x: '50%', y: '60%', size: 90, delay: 4 },
      { x: '15%', y: '80%', size: 30, delay: 1 },
      { x: '85%', y: '70%', size: 50, delay: 3 },
    ];

    // Determine if user has started learning (based on study date existence)
    const hasStarted = progress.lastStudyDate !== '';
  
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-[#1a1512] rounded-full opacity-[0.03]"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center max-w-md w-full"
        >
          {/* INTERACTIVE LOGO */}
          <motion.div 
             animate={{ y: [0, -8, 0], rotate: rotation }}
             transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 0.6, type: "spring" } }}
             className="mb-8 cursor-pointer"
             onClick={handleLogoClick}
             whileTap={{ scale: 0.9 }}
          >
            <div className="w-24 h-24 bg-[#1a1512] rounded-3xl flex items-center justify-center shadow-xl rotate-3 border-b-4 border-r-4 border-[#8a1c1c] group hover:scale-105 transition-transform"
            >
               <span className="font-arabic text-6xl text-[#fdfbf7] mt-2 select-none group-hover:text-[#8a1c1c] transition-colors">ع</span>
            </div>
          </motion.div>
  
          <h1 className="font-serif text-5xl text-[#1a1512] font-bold tracking-tight mb-2">Arabin</h1>
          <div className="h-1 w-12 bg-[#8a1c1c] rounded-full mb-6"></div>
          <p className="font-sans text-sm text-gray-500 uppercase tracking-[0.2em] mb-8">Belajar Logika Arab</p>
          
          {/* INTERACTIVE FEATURE: KALAM HIKMAH */}
          <div 
              onClick={nextQuote}
              className="w-full bg-white border border-dashed border-gray-300 rounded-xl p-4 mb-10 cursor-pointer relative group hover:border-[#8a1c1c] transition-colors"
          >
              <Quote className="absolute -top-3 left-4 w-6 h-6 bg-[#fdfbf7] text-[#8a1c1c] px-1" />
              <motion.div
                  key={quoteIdx}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center"
              >
                  <p className="font-arabic text-xl font-bold mb-2 text-[#1a1512]">{quotes[quoteIdx].arab}</p>
                  <p className="font-serif text-xs italic text-gray-500">"{quotes[quoteIdx].arti}"</p>
              </motion.div>
              <div className="absolute -bottom-3 right-4 bg-[#fdfbf7] px-2 text-[10px] text-gray-400 flex items-center gap-1 group-hover:text-[#8a1c1c]">
                  <RefreshCw className="w-3 h-3" /> Tap untuk ganti
              </div>
          </div>
  
          <div className="flex flex-col gap-4 w-full px-8">
            {hasStarted ? (
              <div onClick={() => { SFX.playClick(); navigate(`/read/${progress.lastLessonId}/${progress.lastPageId}`); }} className="group relative w-full cursor-pointer">
                <div className="absolute inset-0 bg-[#8a1c1c] rounded-xl translate-y-1 group-hover:translate-y-2 transition-transform"></div>
                <div className="relative bg-[#1a1512] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:-translate-y-1 transition-transform border border-[#1a1512]">
                  <span>Lanjutkan</span>
                  <Play className="w-4 h-4 fill-current" />
                </div>
              </div>
            ) : (
              <div onClick={() => { SFX.playClick(); navigate('/contents'); }} className="group relative w-full cursor-pointer">
                <div className="absolute inset-0 bg-[#dcd0b3] rounded-xl translate-y-1 group-hover:translate-y-2 transition-transform"></div>
                <div className="relative bg-[#1a1512] text-white py-4 rounded-xl font-bold text-center group-hover:-translate-y-1 transition-transform border border-[#1a1512]">
                  Mulai Belajar
                </div>
              </div>
            )}
            
            <button onClick={() => { SFX.playClick(); navigate('/contents'); }} className="py-3 text-[#1a1512] text-sm font-bold text-center hover:bg-gray-50 rounded-xl transition-colors w-full">
                Buka Peta Belajar
            </button>
          </div>
          
          <div className="mt-8 flex items-center gap-2 opacity-50">
             <Layers className="w-4 h-4" />
             <span className="text-xs font-bold">{safeStreak} Hari Beruntun</span>
          </div>
  
          <div className="absolute -bottom-24 md:-bottom-32 text-center opacity-60">
             <p className="font-serif italic text-sm text-[#1a1512]">by : abudzan</p>
          </div>
        </motion.div>
      </div>
    );
};
