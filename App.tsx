import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams, Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, BookOpen, X, RotateCcw, Search, Sparkles, Play, Layers, Home } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion'; 
import { LESSON_DATA } from './services/data';
import { ArabicWord } from './components/ArabicWord';
import { TutorPersona } from './components/TutorPersona';
import { Quiz } from './components/Quiz';
import { SentenceBuilder } from './components/SentenceBuilder';
import { AudioControl } from './components/AudioControl';
import { BottomNav } from './components/BottomNav';
import { LessonPath } from './components/LessonPath';
import { Segment, VocabularyItem, UserProgress } from './types';

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
        lastLessonId: LESSON_DATA[0].id, 
        lastPageId: '0', 
        completedLessons: [],
        currentStreak: 0,
        lastStudyDate: ''
      };
    }
    const parsed = JSON.parse(saved);
    return {
      lastLessonId: parsed.lastLessonId || LESSON_DATA[0].id,
      lastPageId: parsed.lastPageId || '0',
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      currentStreak: typeof parsed.currentStreak === 'number' ? parsed.currentStreak : 0,
      lastStudyDate: parsed.lastStudyDate || ''
    };
  } catch (e) {
    return { 
      lastLessonId: LESSON_DATA[0].id, 
      lastPageId: '0', 
      completedLessons: [],
      currentStreak: 0,
      lastStudyDate: ''
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
      lastStudyDate: getTodayString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('durus-progress-updated'));
  }
};

// --- LAYOUTS ---
const MainLayout = () => (
  <div className="min-h-screen bg-[#f8f9fa] text-[#1a1512] pb-20">
    <Outlet />
    <BottomNav />
  </div>
);

// --- SCREENS ---
const DictionaryScreen = () => {
  const [search, setSearch] = useState('');
  const allVocab = LESSON_DATA.flatMap(l => 
    l.vocabulary.map(v => ({...v, lessonTitle: l.title}))
  );
  const filtered = allVocab.filter(v => 
    v.latin.toLowerCase().includes(search.toLowerCase()) || 
    v.meaning.toLowerCase().includes(search.toLowerCase()) ||
    v.arabic.includes(search)
  );

  return (
    <div className="p-6 max-w-md mx-auto min-h-screen bg-[#f8f9fa]">
      <h1 className="font-serif font-bold text-2xl mb-6">Kamus Saku</h1>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Cari kata (Arab/Latin)..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a1c1c]/20 focus:border-[#8a1c1c]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="space-y-3 pb-20">
        {filtered.length > 0 ? filtered.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
               <p className="font-bold font-serif text-[#1a1512]">{item.latin}</p>
               <p className="text-sm text-gray-500 italic">{item.meaning}</p>
            </div>
            <div className="text-right">
               <p className="font-arabic text-2xl font-bold">{item.arabic}</p>
               {item.plural && <p className="text-[10px] text-[#8a1c1c]">Jamak: {item.plural}</p>}
            </div>
          </div>
        )) : (
            <div className="text-center text-gray-400 mt-10 italic">Kata tidak ditemukan.</div>
        )}
      </div>
    </div>
  );
};

const ProfileScreen = () => {
  const progress = getProgress();
  return (
    <div className="p-6 max-w-md mx-auto flex flex-col items-center justify-center min-h-[80vh]">
       <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center relative shadow-inner">
         <span className="font-serif font-bold text-2xl text-gray-400">A</span>
         <div className="absolute -bottom-2 -right-2 bg-[#8a1c1c] text-white text-xs px-2 py-1 rounded-full border-2 border-white font-bold">
            Lvl {progress.completedLessons.length + 1}
         </div>
       </div>
       <h2 className="font-bold text-xl">Ahlan wa Sahlan!</h2>
       
       <div className="mt-8 grid grid-cols-2 gap-4 w-full">
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
            <span className="block text-3xl font-bold text-[#8a1c1c] mb-1">{progress.currentStreak}</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest">Hari Streak</span>
         </div>
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
            <span className="block text-3xl font-bold text-[#1a1512] mb-1">{progress.completedLessons.length}</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest">Bab Selesai</span>
         </div>
       </div>

       <button 
         onClick={() => {
             if(confirm("Yakin ingin menghapus semua progress?")) {
                 localStorage.removeItem(STORAGE_KEY);
                 window.location.reload();
             }
         }}
         className="mt-12 px-6 py-2 rounded-full border border-red-100 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-colors"
       >
         Reset Progress
       </button>
    </div>
  );
}

// --- INTELLIGENT LESSON SESSION ---
enum SessionMode {
  EXPLORE = 'explore', 
  BUILD = 'build',
  QUIZ = 'quiz'
}

const LessonSession = () => {
  const { lessonId, pageId } = useParams();
  const navigate = useNavigate();
  const pageIndex = isNaN(parseInt(pageId || '0')) ? 0 : parseInt(pageId || '0');
  
  const lesson = LESSON_DATA.find(l => l.id === lessonId);
  
  // State
  const [mode, setMode] = useState<SessionMode>(SessionMode.EXPLORE);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [quizSentence, setQuizSentence] = useState<any>(null);

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
    window.scrollTo(0,0);
  }, [pageIndex, lessonId]);

  // Auto-save
  useEffect(() => {
    if (lessonId && mode === SessionMode.EXPLORE) {
        saveProgress(lessonId, pageIndex.toString());
    }
  }, [lessonId, pageIndex, mode]);

  // --- SAFETY CHECKS ---
  if (!lesson) return <Navigate to="/contents" />;
  if (!lesson.sentences || lesson.sentences.length === 0) return <Navigate to="/contents" />;

  const totalPages = lesson.sentences.length;
  if (pageIndex < 0 || pageIndex >= totalPages) return <Navigate to={`/read/${lessonId}/0`} replace />;
  
  const currentSentence = lesson.sentences[pageIndex];
  if (!currentSentence) return <Navigate to="/contents" />;

  const checkRelationship = (segId: string) => {
    if (!selectedSegment) return false;
    if (!currentSentence.segments) return false;
    
    const segment = currentSentence.segments.find(s => s.id === segId);
    return segId === selectedSegment.relatedToId || (segment?.relatedToId === selectedSegment.id);
  };

  const handleNext = () => {
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
        <button onClick={() => navigate('/contents')} className="p-1 text-gray-400 hover:text-red-500">
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
        
        {/* Removed AnimatePresence for Page Content to prevent white-screen crashes */}
        {mode === SessionMode.EXPLORE && (
            <div className="flex-1 flex flex-col animate-in fade-in duration-500">
               <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#8a1c1c]" />
                    <span className="text-xs font-bold text-[#8a1c1c] uppercase">Bedah Logika</span>
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

// --- MAIN APP COMPONENT ---
const App = () => {
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    const handleStorage = () => setProgress(getProgress());
    window.addEventListener('storage', handleStorage);
    window.addEventListener('durus-progress-updated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('durus-progress-updated', handleStorage);
    };
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CoverScreen />} />
        <Route element={<MainLayout />}>
          <Route path="/contents" element={<LessonPath progress={progress} />} />
          <Route path="/dictionary" element={<DictionaryScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
        <Route path="/read/:lessonId/:pageId" element={<LessonSession />} />
      </Routes>
    </HashRouter>
  );
};

const CoverScreen = () => {
  const progress = getProgress();
  const safeStreak = progress?.currentStreak || 0; 
  
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
        <motion.div 
           animate={{ y: [0, -8, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="mb-8"
        >
          <div className="w-24 h-24 bg-[#1a1512] rounded-3xl flex items-center justify-center shadow-xl rotate-3 border-b-4 border-r-4 border-[#8a1c1c]">
             <span className="font-arabic text-6xl text-[#fdfbf7] mt-2 select-none">ع</span>
          </div>
        </motion.div>
        <h1 className="font-serif text-5xl text-[#1a1512] font-bold tracking-tight mb-2">Arabin</h1>
        <div className="h-1 w-12 bg-[#8a1c1c] rounded-full mb-4"></div>
        <p className="font-sans text-sm text-gray-500 uppercase tracking-[0.2em] mb-12">Belajar Logika Arab</p>
        
        <div className="flex flex-col gap-4 w-full px-8">
          {progress.lastLessonId ? (
            <Link to={`/read/${progress.lastLessonId}/${progress.lastPageId}`} className="group relative w-full">
              <div className="absolute inset-0 bg-[#8a1c1c] rounded-xl translate-y-1 group-hover:translate-y-2 transition-transform"></div>
              <div className="relative bg-[#1a1512] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:-translate-y-1 transition-transform border border-[#1a1512]">
                <span>Lanjutkan</span>
                <Play className="w-4 h-4 fill-current" />
              </div>
            </Link>
          ) : (
            <Link to="/contents" className="group relative w-full">
              <div className="absolute inset-0 bg-[#dcd0b3] rounded-xl translate-y-1 group-hover:translate-y-2 transition-transform"></div>
              <div className="relative bg-[#1a1512] text-white py-4 rounded-xl font-bold text-center group-hover:-translate-y-1 transition-transform border border-[#1a1512]">
                Mulai Belajar
              </div>
            </Link>
          )}
          
          <Link to="/contents" className="py-3 text-[#1a1512] text-sm font-bold text-center hover:bg-gray-50 rounded-xl transition-colors">
              Buka Peta Belajar
          </Link>
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

export default App;