
import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion as m } from 'framer-motion'; 
import { LESSON_DATA, calculateVocabMastery } from './services/data';
import { UserProgress } from './types';
import { SFX } from './services/sfx';
import { audioService } from './services/audio';

// --- LAZY LOAD COMPONENTS (Code Splitting) ---
// This drastically reduces the initial bundle size. 
// The browser only downloads the Dictionary/Chat code when the user actually goes there.
const DictionaryScreen = React.lazy(() => import('./components/DictionaryScreen').then(module => ({ default: module.DictionaryScreen })));
const ProfileScreen = React.lazy(() => import('./components/ProfileScreen').then(module => ({ default: module.ProfileScreen })));
const LessonSession = React.lazy(() => import('./components/LessonSession').then(module => ({ default: module.LessonSession })));
const GeminiChat = React.lazy(() => import('./components/GeminiChat').then(module => ({ default: module.GeminiChat })));

// Eager load core components
import { BottomNav } from './components/BottomNav';
import { LessonPath } from './components/LessonPath';
import { CoverScreen } from './components/CoverScreen';

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
  window.scrollTo(0, 0); 
};

// --- LAYOUTS ---
const MainLayout = ({ children, currentPath }: React.PropsWithChildren<{ currentPath: string }>) => (
  <div className="min-h-screen bg-[#f8f9fa] text-[#1a1512] pb-24">
    {children}
    <BottomNav currentPath={currentPath} navigate={navigate} />
  </div>
);

// Loading Fallback
const ScreenLoader = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#8a1c1c] animate-spin mb-4" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Memuat...</p>
    </div>
);

const App = () => {
    const [progress, setProgress] = useState(getProgress());
    const path = useHashLocation();
  
    useEffect(() => {
        const initSound = () => {
            SFX.playClick();
            audioService.unlockAudioContext(); 
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
  
    // --- ROUTING LOGIC ---
    let content;
    
    // Simple Router Switch
    if (path === '/' || path === '') {
        content = <CoverScreen navigate={navigate} progress={progress} />;
    } 
    else if (path === '/contents') {
        content = (
            <MainLayout currentPath={path}>
              <LessonPath 
                progress={progress} 
                navigate={navigate} 
                seenGuidanceIds={progress.seenGuidanceIds}
                onMarkSeen={markGuidanceSeen}
              />
            </MainLayout>
        );
    } 
    else if (path === '/dictionary') {
        content = (
            <MainLayout currentPath={path}>
               <Suspense fallback={<ScreenLoader />}>
                  <DictionaryScreen />
               </Suspense>
            </MainLayout>
        );
    } 
    else if (path === '/profile') {
          content = (
            <MainLayout currentPath={path}>
               <Suspense fallback={<ScreenLoader />}>
                   <ProfileScreen 
                        progress={progress} 
                        updateUserName={updateUserName} 
                        resetGuidanceHistory={resetGuidanceHistory} 
                   />
               </Suspense>
            </MainLayout>
        );
    } 
    else if (path === '/ask-teacher') {
         content = (
            <Suspense fallback={<ScreenLoader />}>
                <GeminiChat 
                   navigate={navigate}
                   seenGuidanceIds={progress.seenGuidanceIds}
                   onMarkSeen={markGuidanceSeen}
                />
            </Suspense>
         );
    } 
    else if (path.startsWith('/read/')) {
          const parts = path.split('/');
          const lessonId = parts[2];
          const pageId = parts[3];
          content = (
            <Suspense fallback={<ScreenLoader />}>
                <LessonSession 
                    lessonId={lessonId} 
                    pageId={pageId} 
                    navigate={navigate} 
                    saveProgress={saveProgress}
                    markLessonComplete={markLessonComplete}
                    progress={progress}
                    markGuidanceSeen={markGuidanceSeen}
                />
            </Suspense>
          );
    } 
    else {
          window.location.hash = '/';
          content = null;
    }
  
    return <div>{content}</div>;
};
  
export default App;
