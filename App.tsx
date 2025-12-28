import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, X, RotateCcw, Search, Sparkles, Play, Layers, Home, RefreshCw, Quote, GraduationCap, Eye, EyeOff, Volume2, Filter, Edit2, Settings, Trophy, Calendar, Flame, Star, LogOut, Github, Info, Medal, Music } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion'; 
import { LESSON_DATA } from './services/data';
import { ArabicWord } from './components/ArabicWord';
import { TutorPersona } from './components/TutorPersona';
import { Quiz } from './components/Quiz';
import { SentenceBuilder } from './components/SentenceBuilder';
import { AudioControl } from './components/AudioControl';
import { BottomNav } from './components/BottomNav';
import { LessonPath } from './components/LessonPath';
import { TutorDialog } from './components/TutorDialog'; 
import { ConfirmationDialog } from './components/ConfirmationDialog';
import { Segment, VocabularyItem, UserProgress } from './types';
import { SFX } from './services/sfx';
import { playArabicAudio } from './services/audio';

// --- STORAGE HELPER ---
const STORAGE_KEY = 'durus_progress_v2';

const getTodayString = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().split('T')[0];
};

const getProgress = (): UserProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return { 
        userName: 'Penuntut Ilmu',
        lastLessonId: LESSON_DATA[0].id, 
        lastPageId: '0', 
        completedLessons: [],
        currentStreak: 0,
        lastStudyDate: '',
        totalXp: 0,
        seenGuidanceIds: []
      };
    }
    const parsed = JSON.parse(saved);
    return {
      userName: parsed.userName || 'Penuntut Ilmu',
      lastLessonId: parsed.lastLessonId || LESSON_DATA[0].id,
      lastPageId: parsed.lastPageId || '0',
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      currentStreak: typeof parsed.currentStreak === 'number' ? parsed.currentStreak : 0,
      lastStudyDate: parsed.lastStudyDate || '',
      totalXp: parsed.totalXp || (Array.isArray(parsed.completedLessons) ? parsed.completedLessons.length * 150 : 0),
      seenGuidanceIds: Array.isArray(parsed.seenGuidanceIds) ? parsed.seenGuidanceIds : []
    };
  } catch (e) {
    return { 
      userName: 'Penuntut Ilmu',
      lastLessonId: LESSON_DATA[0].id, 
      lastPageId: '0', 
      completedLessons: [],
      currentStreak: 0,
      lastStudyDate: '',
      totalXp: 0,
      seenGuidanceIds: []
    };
  }
};

const calculateNewStreak = (currentStreak: number, lastDate: string): { newStreak: number, isToday: boolean } => {
  const today = getTodayString();
  if (!lastDate) return { newStreak: 1, isToday: false };
  if (lastDate === today) return { newStreak: currentStreak, isToday: true };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split('T')[0];

  if (lastDate === yesterdayString) {
    return { newStreak: currentStreak + 1, isToday: false }; 
  } else {
    return { newStreak: 1, isToday: false };
  }
};

const saveProgress = (lessonId: string, pageId: string) => {
  const current = getProgress();
  const { newStreak } = calculateNewStreak(current.currentStreak, current.lastStudyDate);
  
  const updated: UserProgress = {
    ...current,
    lastLessonId: lessonId,
    lastPageId: pageId,
    currentStreak: newStreak,
    lastStudyDate: getTodayString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('durus-progress-updated'));
};

const markLessonComplete = (lessonId: string) => {
  const current = getProgress();
  const { newStreak } = calculateNewStreak(current.currentStreak, current.lastStudyDate);

  if (!current.completedLessons.includes(lessonId)) {
    const updated: UserProgress = {
      ...current,
      completedLessons: [...current.completedLessons, lessonId],
      currentStreak: newStreak,
      lastStudyDate: getTodayString(),
      totalXp: (current.totalXp || 0) + 150 // XP Reward
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('durus-progress-updated'));
  }
};

const updateUserName = (name: string) => {
    const current = getProgress();
    const updated: UserProgress = { ...current, userName: name };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('durus-progress-updated'));
};

// NEW: Helper to mark tutor guidance as seen PERSISTENTLY
const markGuidanceSeen = (guidanceId: string) => {
    const current = getProgress();
    if (!current.seenGuidanceIds?.includes(guidanceId)) {
        const updated: UserProgress = {
            ...current,
            seenGuidanceIds: [...(current.seenGuidanceIds || []), guidanceId]
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('durus-progress-updated'));
    }
};

const resetGuidanceHistory = () => {
    const current = getProgress();
    const updated: UserProgress = { ...current, seenGuidanceIds: [] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('durus-progress-updated'));
};

// --- CUSTOM ROUTER ---
const useHashLocation = () => {
  const [loc, setLoc] = useState(window.location.hash.replace('#', '') || '/');
  useEffect(() => {
    const handler = () => setLoc(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return loc;
};

const navigate = (to: string) => {
  window.location.hash = to;
};

// --- LAYOUTS ---
const MainLayout = ({ children, currentPath }: { children: React.ReactNode, currentPath: string }) => (
  <div className="min-h-screen bg-[#f8f9fa] text-[#1a1512] pb-20">
    {children}
    <BottomNav currentPath={currentPath} navigate={navigate} />
  </div>
);

// --- SCREENS ---
const DictionaryScreen = () => {
  const [search, setSearch] = useState('');
  const [isMemorizeMode, setIsMemorizeMode] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  // Aggregate vocab grouped by Lesson
  const groupedVocab = LESSON_DATA.map(lesson => ({
    lessonTitle: lesson.title,
    lessonId: lesson.id,
    items: lesson.vocabulary.filter(v => 
        v.latin.toLowerCase().includes(search.toLowerCase()) || 
        v.meaning.toLowerCase().includes(search.toLowerCase()) ||
        v.arabic.includes(search)
    )
  })).filter(group => group.items.length > 0);

  const totalWords = LESSON_DATA.reduce((acc, lesson) => acc + lesson.vocabulary.length, 0);

  const toggleReveal = (uniqueId: string) => {
    if (!isMemorizeMode) return;
    SFX.playClick();
    setRevealedCards(prev => {
        const next = new Set(prev);
        if (next.has(uniqueId)) next.delete(uniqueId);
        else next.add(uniqueId);
        return next;
    });
  };

  const playWord = (e: React.MouseEvent, word: string) => {
      e.stopPropagation();
      setPlayingWord(word);
      playArabicAudio(word, undefined, () => setPlayingWord(null));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      {/* Sticky Header */}
      <div className="bg-white sticky top-0 z-20 px-6 py-4 border-b border-gray-100 shadow-sm">
          <div className="flex justify-between items-end mb-4">
            <div>
                <h1 className="font-serif font-bold text-2xl text-[#1a1512]">Kamus Al-Mufradat</h1>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                    {totalWords} Kosakata Tersimpan
                </p>
            </div>
            <button 
                onClick={() => { SFX.playClick(); setIsMemorizeMode(!isMemorizeMode); setRevealedCards(new Set()); }}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all border ${isMemorizeMode ? 'bg-[#1a1512] border-[#1a1512] text-white' : 'bg-white border-gray-200 text-gray-400 hover:border-[#1a1512] hover:text-[#1a1512]'}`}
            >
                {isMemorizeMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span className="text-[8px] font-bold uppercase mt-1">Hafalan</span>
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
            type="text" 
            placeholder="Cari kata..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#8a1c1c]/20 focus:border-[#8a1c1c] transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
          </div>
      </div>

      {/* Content List */}
      <div className="px-6 py-6 space-y-8">
        {groupedVocab.length > 0 ? groupedVocab.map((group) => (
            <div key={group.lessonId} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-4 opacity-60">
                    <BookOpen className="w-4 h-4 text-[#8a1c1c]" />
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1512]">{group.lessonTitle}</h2>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.items.map((item, idx) => {
                        const uniqueId = `${group.lessonId}-${idx}`;
                        const isRevealed = revealedCards.has(uniqueId) || !isMemorizeMode;
                        const isPlaying = playingWord === item.arabic;
                        
                        return (
                            <motion.div 
                                layoutId={uniqueId}
                                onClick={() => toggleReveal(uniqueId)}
                                key={uniqueId}
                                className={`
                                    bg-white rounded-xl p-4 border transition-all cursor-pointer relative overflow-hidden group
                                    ${isMemorizeMode && !isRevealed 
                                        ? 'border-dashed border-[#8a1c1c]/30 hover:bg-[#8a1c1c]/5' 
                                        : 'border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'}
                                    ${isPlaying ? 'ring-2 ring-[#8a1c1c] ring-offset-2' : ''}
                                `}
                            >
                                {/* Front: Arabic */}
                                <div className="flex justify-between items-start mb-2">
                                    <button 
                                         className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10 ${isPlaying ? 'bg-[#8a1c1c] text-white' : 'bg-gray-50 text-gray-400 hover:bg-[#8a1c1c] hover:text-white'}`}
                                         onClick={(e) => playWord(e, item.arabic)}
                                    >
                                        {isPlaying ? (
                                            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>
                                                <Volume2 className="w-4 h-4" />
                                            </motion.span>
                                        ) : (
                                            <Play className="w-3 h-3 fill-current" />
                                        )}
                                    </button>
                                    <h3 className="font-arabic text-3xl font-bold text-[#1a1512] text-right">{item.arabic}</h3>
                                </div>

                                {/* Divider or Blur overlay */}
                                <div className="h-px bg-gray-100 w-full my-3"></div>

                                {/* Back: Meaning */}
                                <div className={`transition-all duration-300 ${!isRevealed ? 'blur-md select-none opacity-50' : 'blur-0 opacity-100'}`}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-[#1a1512] text-lg leading-none mb-1">{item.latin}</p>
                                            <p className="text-sm text-gray-500 italic">{item.meaning}</p>
                                        </div>
                                        {item.plural && (
                                            <div className="text-right">
                                                <span className="text-[9px] text-[#8a1c1c] font-bold uppercase bg-red-50 px-2 py-1 rounded">Jamak</span>
                                                <p className="font-arabic text-lg text-[#8a1c1c]">{item.plural}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Tap Hint */}
                                {isMemorizeMode && !isRevealed && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-white/80 px-2 py-1 rounded-full backdrop-blur-sm">
                                            Ketuk untuk melihat
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        )) : (
            <div className="text-center py-20 opacity-50">
                <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-serif italic">"Kata yang dicari tidak ditemukan."</p>
            </div>
        )}
      </div>
    </div>
  );
};

const ProfileScreen = () => {
  const progress = getProgress();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(progress.userName || 'Penuntut Ilmu');
  const [showResetDialog, setShowResetDialog] = useState(false);

  // Gamification Logic
  const totalXp = progress.totalXp || 0;
  const level = Math.floor(totalXp / 500) + 1;
  const nextLevelXp = level * 500;
  const currentLevelXp = totalXp - ((level - 1) * 500);
  const progressPercent = Math.min((currentLevelXp / 500) * 100, 100);

  // Dynamic Title based on Level
  const getTitle = (lvl: number) => {
      if (lvl >= 10) return "Al-Alim (Ahli)";
      if (lvl >= 5) return "Thalib (Penuntut)";
      return "Mubtadi (Pemula)";
  };

  // Badges Logic
  const badges = [
      { id: 'streak_3', icon: Flame, label: 'Istiqomah', desc: 'Streak 3 Hari', unlocked: progress.currentStreak >= 3 },
      { id: 'streak_7', icon: Flame, label: 'Mujahid', desc: 'Streak 7 Hari', unlocked: progress.currentStreak >= 7 },
      { id: 'first_step', icon: Star, label: 'Fatih', desc: 'Selesaikan 1 Bab', unlocked: progress.completedLessons.length >= 1 },
      { id: 'scholar', icon: GraduationCap, label: 'Faqih', desc: 'Selesaikan 5 Bab', unlocked: progress.completedLessons.length >= 5 },
  ];

  const handleNameSave = () => {
      SFX.playSuccess();
      updateUserName(tempName);
      setIsEditingName(false);
  };

  const performReset = () => {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-32">
       
       <ConfirmationDialog 
          isOpen={showResetDialog}
          title="Hapus Semua Data?"
          message="PERINGATAN: Tindakan ini akan menghapus semua riwayat belajar, hafalan, dan XP Anda. Ini tidak dapat dibatalkan."
          confirmLabel="Ya, Hapus Semuanya"
          isDanger={true}
          onConfirm={performReset}
          onCancel={() => setShowResetDialog(false)}
       />

       {/* 1. HEADER PROFILE CARD */}
       <div className="bg-[#1a1512] text-[#fdfbf7] pt-10 pb-16 px-6 rounded-b-[40px] shadow-xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
            
            <div className="relative z-10 max-w-md mx-auto text-center">
                <div className="relative inline-block mb-4">
                     <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-24 h-24 bg-[#fdfbf7] rounded-full flex items-center justify-center border-4 border-[#8a1c1c] shadow-2xl mx-auto"
                     >
                        <span className="font-serif font-bold text-4xl text-[#1a1512]">{tempName.charAt(0).toUpperCase()}</span>
                     </motion.div>
                     <div className="absolute -bottom-2 -right-2 bg-[#8a1c1c] text-white text-[10px] font-bold px-3 py-1 rounded-full border-2 border-[#1a1512]">
                        Lvl {level}
                     </div>
                </div>

                {isEditingName ? (
                    <div className="flex items-center gap-2 justify-center mb-1">
                        <input 
                            autoFocus
                            type="text" 
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-center text-white font-serif font-bold focus:outline-none focus:border-[#8a1c1c]"
                        />
                        <button onClick={handleNameSave} className="p-1.5 bg-[#8a1c1c] rounded-md hover:bg-red-700"><RefreshCw className="w-4 h-4" /></button>
                    </div>
                ) : (
                    <h2 
                        onClick={() => { setIsEditingName(true); SFX.playClick(); }}
                        className="text-2xl font-serif font-bold flex items-center justify-center gap-2 cursor-pointer hover:text-gray-300 transition-colors"
                    >
                        {progress.userName || 'Penuntut Ilmu'} 
                        <Edit2 className="w-4 h-4 opacity-50" />
                    </h2>
                )}
                
                <p className="text-[#8a1c1c] font-sans text-xs font-bold uppercase tracking-[0.2em] mb-6">{getTitle(level)}</p>

                {/* XP Progress Bar */}
                <div className="bg-white/10 h-3 rounded-full overflow-hidden w-full max-w-[200px] mx-auto mb-2 relative">
                    <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#8a1c1c] to-red-500"
                    />
                </div>
                <p className="text-[10px] text-gray-400">{currentLevelXp} / 500 XP menuju level {level + 1}</p>
            </div>
       </div>

       <div className="max-w-md mx-auto px-6 -mt-10 relative z-20 space-y-6">
         
         {/* 2. STATS GRID */}
         <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2">
                 <div className="p-2 bg-orange-50 rounded-full text-orange-600">
                    <Flame className="w-6 h-6" />
                 </div>
                 <div className="text-center">
                    <span className="block text-2xl font-bold text-[#1a1512]">{progress.currentStreak}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Hari Streak</span>
                 </div>
             </div>
             
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2">
                 <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                    <Trophy className="w-6 h-6" />
                 </div>
                 <div className="text-center">
                    <span className="block text-2xl font-bold text-[#1a1512]">{progress.completedLessons.length}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Bab Selesai</span>
                 </div>
             </div>

             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 col-span-2">
                 <div className="flex justify-between w-full px-4 items-center">
                     <div className="flex items-center gap-3">
                         <div className="p-2 bg-green-50 rounded-full text-green-600">
                            <BookOpen className="w-5 h-5" />
                         </div>
                         <div className="text-left">
                            <span className="block text-lg font-bold text-[#1a1512]">{progress.completedLessons.length * 24}</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Perkiraan Kata Dikuasai</span>
                         </div>
                     </div>
                     <div className="h-10 w-px bg-gray-100"></div>
                     <div className="text-right">
                         <span className="block text-lg font-bold text-[#8a1c1c]">{totalXp}</span>
                         <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total XP</span>
                     </div>
                 </div>
             </div>
         </div>

         {/* 3. BADGES SECTION */}
         <div>
             <h3 className="font-serif font-bold text-[#1a1512] mb-3 flex items-center gap-2">
                <Medal className="w-4 h-4 text-[#8a1c1c]" />
                Pencapaian (Badges)
             </h3>
             <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-x-auto no-scrollbar flex gap-4">
                {badges.map((badge) => (
                    <div key={badge.id} className={`flex-shrink-0 flex flex-col items-center w-24 text-center ${!badge.unlocked ? 'opacity-40 grayscale' : ''}`}>
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 border-2 ${badge.unlocked ? 'bg-yellow-50 border-yellow-400 text-yellow-600' : 'bg-gray-100 border-gray-200 text-gray-400'}`}>
                            <badge.icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-[#1a1512]">{badge.label}</span>
                        <span className="text-[9px] text-gray-400 mt-0.5">{badge.desc}</span>
                    </div>
                ))}
             </div>
         </div>

         {/* 4. SETTINGS & ACTIONS */}
         <div>
            <h3 className="font-serif font-bold text-[#1a1512] mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#8a1c1c]" />
                Pengaturan
             </h3>
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <button 
                    onClick={() => { setIsEditingName(true); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100"
                 >
                    <div className="flex items-center gap-3">
                        <Edit2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-bold text-[#1a1512]">Ubah Nama Panggilan</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                 </button>
                 
                 <button 
                    onClick={() => { SFX.playPop(); resetGuidanceHistory(); alert("Riwayat bimbingan guru telah direset."); }}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100"
                 >
                    <div className="flex items-center gap-3">
                        <RotateCcw className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-bold text-[#1a1512]">Tampilkan Lagi Tips Guru</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                 </button>

                 <button 
                    onClick={() => {
                        SFX.playClick();
                        setShowResetDialog(true);
                    }}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-red-50 transition-colors group"
                 >
                    <div className="flex items-center gap-3">
                        <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-600" />
                        <span className="text-sm font-bold text-red-400 group-hover:text-red-600">Reset Semua Data</span>
                    </div>
                 </button>
             </div>
         </div>

         <div className="text-center pb-8 pt-4">
             <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Arabin v1.0.4</p>
         </div>

       </div>
    </div>
  );
}

// --- INTELLIGENT LESSON SESSION ---
enum SessionMode {
  EXPLORE = 'explore', 
  BUILD = 'build',
  QUIZ = 'quiz'
}

interface LessonSessionProps {
    lessonId?: string;
    pageId?: string;
    navigate: (path: string) => void;
}

const LessonSession = ({ lessonId, pageId, navigate }: LessonSessionProps) => {
  const pageIndex = isNaN(parseInt(pageId || '0')) ? 0 : parseInt(pageId || '0');
  
  const lesson = LESSON_DATA.find(l => l.id === lessonId);
  const progress = getProgress(); // Get fresh progress
  
  // State
  const [mode, setMode] = useState<SessionMode>(SessionMode.EXPLORE);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [quizSentence, setQuizSentence] = useState<any>(null);
  const [showTutorDialog, setShowTutorDialog] = useState(false); 
  
  // No local state for seen guidance anymore. We use the global progress.

  // Initialize Quiz Sentence once per lesson load
  useEffect(() => {
    if (lesson && lesson.sentences.length > 0) {
        const randomIdx = Math.floor(Math.random() * lesson.sentences.length);
        setQuizSentence(lesson.sentences[randomIdx]);
    }
  }, [lessonId]); // Only re-run if lesson changes
  
  // Reset state on page change
  useEffect(() => {
    setMode(SessionMode.EXPLORE);
    setSelectedSegment(null);
    setShowTutorDialog(false); 
    window.scrollTo(0,0);
  }, [pageIndex, lessonId]);

  // Auto-save
  useEffect(() => {
    if (lessonId && mode === SessionMode.EXPLORE) {
        saveProgress(lessonId, pageIndex.toString());
    }
  }, [lessonId, pageIndex, mode]);

  // TRIGGER TUTOR GUIDANCE
  useEffect(() => {
    const currentSent = lesson?.sentences[pageIndex];
    if (mode === SessionMode.EXPLORE && currentSent?.tutorGuidance) {
        // Check global history
        const hasSeen = progress.seenGuidanceIds?.includes(currentSent.id);
        
        if (!hasSeen) {
            const timer = setTimeout(() => {
                SFX.playPop();
                setShowTutorDialog(true);
            }, 600);
            return () => clearTimeout(timer);
        }
    }
  }, [pageIndex, mode, lesson]);

  // --- SAFETY CHECKS ---
  if (!lesson) {
    // Redirect logic handled by render
    setTimeout(() => navigate('/contents'), 0);
    return null;
  }
  if (!lesson.sentences || lesson.sentences.length === 0) {
    setTimeout(() => navigate('/contents'), 0);
    return null;
  }

  const totalPages = lesson.sentences.length;
  if (pageIndex < 0 || pageIndex >= totalPages) {
      setTimeout(() => navigate(`/read/${lessonId}/0`), 0);
      return null;
  }
  
  const currentSentence = lesson.sentences[pageIndex];
  if (!currentSentence) {
    setTimeout(() => navigate('/contents'), 0);
    return null;
  }

  const checkRelationship = (segId: string) => {
    if (!selectedSegment) return false;
    if (!currentSentence.segments) return false;
    
    const segment = currentSentence.segments.find(s => s.id === segId);
    return segId === selectedSegment.relatedToId || (segment?.relatedToId === selectedSegment.id);
  };

  const handleNext = () => {
    SFX.playClick();
    if (mode === SessionMode.EXPLORE) {
      setMode(SessionMode.BUILD);
    } else if (mode === SessionMode.BUILD) {
      if (pageIndex < totalPages - 1) {
        navigate(`/read/${lessonId}/${pageIndex + 1}`);
      } else {
        setMode(SessionMode.QUIZ);
      }
    }
  };

  const handlePrev = () => {
    SFX.playClick();
    if (mode === SessionMode.QUIZ) {
      setMode(SessionMode.BUILD);
    } else if (mode === SessionMode.BUILD) {
      setMode(SessionMode.EXPLORE);
    } else {
      if (pageIndex > 0) {
        navigate(`/read/${lessonId}/${pageIndex - 1}`);
      } else {
        navigate('/contents');
      }
    }
  };

  // Safe sentence for quiz
  const finalQuizSentence = quizSentence || currentSentence;

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      
      {/* HEADER */}
      <div className="w-full max-w-lg px-4 py-4 flex items-center gap-4 bg-white border-b border-gray-100 sticky top-0 z-30">
        <button onClick={() => { SFX.playClick(); navigate('/contents'); }} className="p-1 text-gray-400 hover:text-red-500">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 flex flex-col justify-center">
           <div className="flex justify-between items-center mb-1">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
               {mode === SessionMode.EXPLORE ? 'FAHAMI (Explore)' : mode === SessionMode.BUILD ? 'SUSUN (Practice)' : 'UJIAN (Final)'}
             </span>
             <span className="text-[10px] font-bold text-[#1a1512]">{pageIndex + 1} / {totalPages}</span>
           </div>
           <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#8a1c1c]"
              initial={{ width: 0 }}
              animate={{ width: `${((pageIndex + 1) / totalPages) * 100}%` }}
            />
           </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 w-full max-w-lg flex flex-col relative px-4 pt-6 pb-32 overflow-y-auto">
        
        {/* TUTOR POPUP DIALOG */}
        <TutorDialog 
            isVisible={showTutorDialog} 
            text={currentSentence.tutorGuidance || ''} 
            onDismiss={() => {
                setShowTutorDialog(false);
                // Mark as persistently seen
                markGuidanceSeen(currentSentence.id);
            }}
        />

        {mode === SessionMode.EXPLORE && (
            <div className="flex-1 flex flex-col animate-in fade-in duration-500">
               <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#8a1c1c]" />
                    <span className="text-xs font-bold text-[#8a1c1c] uppercase">Bedah Logika</span>
                    
                    {/* Recall Button: Only shows if guidance is available but hidden */}
                    {currentSentence.tutorGuidance && !showTutorDialog && (
                        <motion.button 
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            onClick={() => {
                                SFX.playPop();
                                setShowTutorDialog(true);
                            }}
                            className="ml-2 w-6 h-6 bg-[#1a1512] rounded-full flex items-center justify-center text-white shadow-sm hover:scale-110 transition-transform"
                        >
                            <GraduationCap className="w-3 h-3" />
                        </motion.button>
                    )}
                 </div>
                 <AudioControl 
                    text={currentSentence.arabicText} 
                    audioSrc={currentSentence.audioSrc} 
                 />
               </div>

               <div 
                 className="bg-white rounded-2xl p-8 mb-6 card-shadow text-center min-h-[220px] flex flex-col justify-center items-center relative border border-gray-100"
                 dir="rtl"
               >
                 <div className="flex flex-wrap justify-center gap-y-8 leading-[3]">
                    {/* Safety map with fallback array */}
                    {(currentSentence.segments || []).map((segment) => (
                      <ArabicWord 
                        key={segment.id}
                        segment={segment}
                        isSelected={selectedSegment?.id === segment.id}
                        isRelated={checkRelationship(segment.id)}
                        onClick={setSelectedSegment}
                        showHints={true} 
                      />
                    ))}
                    {(!currentSentence.segments || currentSentence.segments.length === 0) && (
                        <p className="text-red-500 font-sans text-sm">Data kalimat tidak tersedia.</p>
                    )}
                 </div>
               </div>

               <p className="text-center text-[#1a1512] font-serif text-lg leading-relaxed px-4 mb-6">
                "{currentSentence.translation}"
               </p>

               {!selectedSegment && (
                <div className="mt-auto text-center py-4">
                    <p className="text-sm text-gray-400 animate-pulse">Ketuk kata Arab di atas untuk melihat hubungan sebab-akibat.</p>
                </div>
               )}

               {selectedSegment && (
                 <div className="flex-1 min-h-[200px]">
                    <TutorPersona selectedSegment={selectedSegment} />
                 </div>
               )}
            </div>
        )}

        {mode === SessionMode.BUILD && (
            <div className="flex-1 animate-in zoom-in-95 duration-300">
               <SentenceBuilder 
                  sentence={currentSentence} 
                  onSuccess={handleNext}
               />
            </div>
        )}

        {mode === SessionMode.QUIZ && (
             <div className="flex-1 animate-in slide-in-from-right duration-300">
                <Quiz 
                  sentence={finalQuizSentence} 
                  onComplete={() => {
                    SFX.playFanfare();
                    markLessonComplete(lessonId || '');
                    navigate('/contents');
                  }} 
                />
             </div>
        )}
      </div>

      {/* FOOTER NAV - Always Visible if Explore */}
      {mode === SessionMode.EXPLORE && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom z-50">
            <div className="max-w-lg mx-auto flex justify-between items-center">
                <button 
                  onClick={handlePrev}
                  className="p-3 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={handleNext}
                  className="flex-1 ml-4 py-3 rounded-xl bg-[#1a1512] text-white font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Latih Susunan</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
      )}

      {/* Back button for Build Mode */}
      {mode === SessionMode.BUILD && (
         <div className="fixed bottom-0 left-0 right-0 p-4 safe-bottom z-40 pointer-events-none">
             <div className="max-w-lg mx-auto">
                <button 
                  onClick={handlePrev}
                  className="pointer-events-auto p-3 rounded-xl bg-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-300 flex items-center gap-1 shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" /> Ulangi Materi
                </button>
             </div>
         </div>
      )}

    </div>
  );
};

// --- NEW INTERACTIVE COVER SCREEN ---
interface CoverScreenProps {
    navigate: (path: string) => void;
}

const CoverScreen = ({ navigate }: CoverScreenProps) => {
  const progress = getProgress();
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

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#1a1512] rounded-full opacity-[0.03]"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size } as any}
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
          <div className="w-24 h-24 bg-[#1a1512] rounded-3xl flex items-center justify-center shadow-xl rotate-3 border-b-4 border-r-4 border-[#8a1c1c] group hover:scale-105 transition-transform">
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
          {progress.lastLessonId ? (
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

// --- MAIN APP COMPONENT ---
const App = () => {
  const [progress, setProgress] = useState(getProgress());
  const path = useHashLocation();

  // Init SFX on user gesture
  useEffect(() => {
      const initSound = () => {
          SFX.playClick();
          window.removeEventListener('click', initSound);
      };
      window.addEventListener('click', initSound);
      return () => window.removeEventListener('click', initSound);
  }, []);

  useEffect(() => {
    const handleStorage = () => setProgress(getProgress());
    window.addEventListener('storage', handleStorage);
    window.addEventListener('durus-progress-updated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('durus-progress-updated', handleStorage);
    };
  }, []);

  let content;
  if (path === '/' || path === '') {
      content = <CoverScreen navigate={navigate} />;
  } else if (path === '/contents') {
      content = (
          <MainLayout currentPath={path}>
            <LessonPath progress={progress} navigate={navigate} />
          </MainLayout>
      );
  } else if (path === '/dictionary') {
      content = (
          <MainLayout currentPath={path}>
            <DictionaryScreen />
          </MainLayout>
      );
  } else if (path === '/profile') {
        content = (
          <MainLayout currentPath={path}>
            <ProfileScreen />
          </MainLayout>
      );
  } else if (path.startsWith('/read/')) {
        const parts = path.split('/');
        const lessonId = parts[2];
        const pageId = parts[3];
        content = <LessonSession lessonId={lessonId} pageId={pageId} navigate={navigate} />;
  } else {
        // Fallback
        window.location.hash = '/';
        content = null;
  }

  return <div>{content}</div>;
};

export default App;