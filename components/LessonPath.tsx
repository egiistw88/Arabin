import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Lock, Play, Star, BookOpen, Trophy, Flame, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import { LESSON_DATA } from '../services/data';
import { UserProgress } from '../types';
import { SFX } from '../services/sfx';

interface LessonPathProps {
  progress: UserProgress;
}

export const LessonPath: React.FC<LessonPathProps> = ({ progress }) => {
  // --- INTELLIGENT PROGRESS LOGIC ---
  
  let activeLessonIndex = LESSON_DATA.findIndex(l => !progress.completedLessons.includes(l.id));
  
  const isCourseComplete = activeLessonIndex === -1 && progress.completedLessons.length > 0;
  
  if (isCourseComplete) {
    activeLessonIndex = LESSON_DATA.length - 1; 
  }
  if (activeLessonIndex === -1) activeLessonIndex = 0;

  const activeLesson = LESSON_DATA[activeLessonIndex];
  
  const stats = {
    vocabMastered: progress.completedLessons.length * 6,
    currentStreak: progress.currentStreak, 
    totalXp: progress.completedLessons.length * 150
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] pb-32">
      
      {/* 1. HEADER */}
      <div className="bg-white px-6 pt-8 pb-6 border-b border-gray-100 rounded-b-3xl shadow-sm z-10 relative">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-xs font-sans font-bold text-gray-400 uppercase tracking-widest mb-1">Ahlan wa Sahlan,</p>
              <h1 className="font-serif text-2xl font-bold text-[#1a1512]">Penuntut Ilmu</h1>
            </div>
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-[#1a1512] flex items-center justify-center text-[#fdfbf7] font-serif font-bold border-2 border-[#8a1c1c] shadow-lg"
            >
              A
            </motion.div>
          </div>

          {/* Mini Stats Row */}
          <div className="flex gap-4 mb-2 overflow-x-auto no-scrollbar">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
               className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100"
             >
                <Flame className={`w-4 h-4 ${stats.currentStreak > 0 ? 'text-orange-500 fill-orange-500' : 'text-gray-300'}`} />
                <div className="flex flex-col">
                   <span className="text-[10px] text-gray-400 font-bold uppercase">Streak</span>
                   <span className="text-sm font-bold text-[#1a1512] leading-none">{stats.currentStreak} Hari</span>
                </div>
             </motion.div>
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
               className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100"
             >
                <Medal className="w-4 h-4 text-yellow-600" />
                <div className="flex flex-col">
                   <span className="text-[10px] text-gray-400 font-bold uppercase">Bab</span>
                   <span className="text-sm font-bold text-[#1a1512] leading-none">{progress.completedLessons.length} Selesai</span>
                </div>
             </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 mt-6">
        
        {/* 2. HERO CARD (NEXT ACTION) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative overflow-hidden bg-[#1a1512] rounded-2xl p-6 shadow-xl shadow-gray-200 mb-10 group cursor-pointer"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3 transition-transform group-hover:rotate-12 duration-700">
             <span className="font-arabic text-9xl text-white">ع</span>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
               <span className={`px-2 py-1 text-white text-[10px] font-bold uppercase rounded tracking-wider shadow-sm ${isCourseComplete ? 'bg-green-600' : 'bg-[#8a1c1c]'}`}>
                 {isCourseComplete ? 'Semua Selesai' : progress.completedLessons.includes(activeLesson.id) ? 'Ulangi Pelajaran' : 'Sedang Dipelajari'}
               </span>
               <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                 <Play className="w-5 h-5 text-white fill-white" />
               </div>
            </div>
            
            <h2 className="text-white font-serif text-xl font-bold mb-1 line-clamp-1">
              {activeLesson.title.split(':')[1]?.trim() || activeLesson.title}
            </h2>
            <p className="text-gray-400 text-xs mb-6 line-clamp-2">
              {activeLesson.description}
            </p>

            <Link 
              to={`/read/${activeLesson.id}/0`}
              onClick={() => SFX.playClick()}
              className="block w-full py-3 bg-[#fdfbf7] text-[#1a1512] font-bold text-center rounded-xl hover:bg-white transition-colors shadow-lg"
            >
              {isCourseComplete ? 'Murojaah (Ulang)' : progress.completedLessons.includes(activeLesson.id) ? 'Baca Ulang' : 'Lanjutkan'}
            </Link>
          </div>
        </motion.div>


        {/* 3. LEARNING PATH (TIMELINE) */}
        <div className="flex items-center gap-3 mb-6">
           <Trophy className="w-5 h-5 text-[#8a1c1c]" />
           <h3 className="font-serif font-bold text-lg text-[#1a1512]">Peta Perjalanan</h3>
        </div>

        <div className="relative space-y-0 pl-4">
          {/* Vertical Guide Line */}
          <div className="absolute left-[27px] top-4 bottom-12 w-0.5 bg-gray-200 -z-10"></div>

          {LESSON_DATA.map((lesson, idx) => {
            // Determine State
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isCurrent = lesson.id === activeLesson.id && !isCourseComplete;
            const isLocked = !isCompleted && !isCurrent && !isCourseComplete;

            return (
              <motion.div 
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                className={`group relative flex gap-5 pb-10 last:pb-0 ${isLocked ? 'opacity-60' : ''}`}
              >
                {/* Node Marker */}
                <div className={`
                    w-6 h-6 rounded-full border-4 flex-shrink-0 bg-white z-10 mt-6 box-content transition-all duration-500
                    ${isCurrent ? 'border-[#8a1c1c] shadow-[0_0_0_4px_rgba(138,28,28,0.2)] scale-110' : 
                      isCompleted ? 'border-green-600 bg-green-600 shadow-[0_0_0_2px_rgba(22,163,74,0.2)]' : 'border-gray-200'}
                `}>
                    {isCompleted && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <CheckCircle2 className="w-full h-full text-white p-0.5" />
                        </motion.div>
                    )}
                </div>

                {/* Lesson Content Card */}
                <Link 
                  to={!isLocked ? `/read/${lesson.id}/0` : '#'}
                  onClick={() => !isLocked && SFX.playClick()}
                  className="block flex-1"
                >
                    <motion.div 
                        whileHover={!isLocked ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!isLocked ? { scale: 0.98 } : {}}
                        className={`
                            rounded-xl p-5 border transition-all duration-300 relative overflow-hidden
                            ${isCurrent ? 'bg-white border-[#8a1c1c] card-shadow' : 
                              isCompleted ? 'bg-green-50/50 border-green-200 shadow-sm' : 
                              'bg-white border-gray-100 shadow-sm hover:border-gray-300'}
                            ${isLocked ? 'cursor-not-allowed bg-gray-50' : 'cursor-pointer'}
                        `}
                    >
                        {/* Completed Ribbon/Badge */}
                        {isCompleted && (
                            <div className="absolute top-0 right-0">
                                <div className="bg-green-600 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl shadow-sm">
                                    LULUS
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-2">
                            <span className={`font-sans text-[10px] font-bold uppercase tracking-wider ${isCompleted ? 'text-green-700' : 'text-gray-400'}`}>
                            Bab {idx + 1}
                            </span>
                            {isLocked && <Lock className="w-3 h-3 text-gray-300" />}
                        </div>

                        <h4 className={`font-serif font-bold text-lg mb-2 ${isCurrent ? 'text-[#8a1c1c]' : isCompleted ? 'text-green-900' : 'text-[#1a1512]'}`}>
                            {lesson.title.split(':')[1]?.trim() || lesson.title}
                        </h4>
                        
                        <div className="flex flex-wrap gap-1.5">
                            {lesson.concepts.slice(0, 3).map((concept, i) => (
                            <span key={i} className={`px-2 py-1 text-[10px] rounded-md font-medium border ${isCompleted ? 'bg-white/50 text-green-800 border-green-100' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                                {concept}
                            </span>
                            ))}
                        </div>
                    </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        {/* Footer Quote */}
        <div className="mt-16 text-center opacity-40 mb-8">
            <p className="font-arabic text-xl mb-2">مَنْ جَدَّ وَجَدَ</p>
            <p className="font-serif text-xs italic">"Barangsiapa bersungguh-sungguh, ia akan dapat."</p>
        </div>

      </div>
    </div>
  );
};