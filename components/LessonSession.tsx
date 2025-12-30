
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Layers, GraduationCap, RotateCcw, MessageCircle } from 'lucide-react';
import { motion as m, AnimatePresence } from 'framer-motion'; 
import { LESSON_DATA } from '../services/data';
import { ArabicWord } from './ArabicWord';
import { TutorPersona } from './TutorPersona';
import { Quiz } from './Quiz';
import { SentenceBuilder } from './SentenceBuilder';
import { AudioControl } from './AudioControl';
import { TutorDialog } from './TutorDialog'; 
import { LessonSummary } from './LessonSummary';
import { ConceptBoard } from './ConceptBoard'; 
import { Segment, SessionMode, UserProgress } from '../types';
import { SFX } from '../services/sfx';
import { GeminiChat } from './GeminiChat'; // Import Gemini Chat

const motion = m as any;

interface LessonSessionProps {
    lessonId?: string;
    pageId?: string;
    navigate: (path: string) => void;
    saveProgress: (lessonId: string, pageId: string) => void;
    markLessonComplete: (lessonId: string) => void;
    progress: UserProgress;
    markGuidanceSeen: (id: string) => void;
}

export const LessonSession = ({ 
    lessonId, 
    pageId, 
    navigate, 
    saveProgress, 
    markLessonComplete, 
    progress,
    markGuidanceSeen
}: LessonSessionProps) => {
  const pageIndex = isNaN(parseInt(pageId || '0')) ? 0 : parseInt(pageId || '0');
  const lesson = LESSON_DATA.find(l => l.id === lessonId);
  
  const [mode, setMode] = useState<SessionMode>(
      pageIndex === 0 ? SessionMode.CONCEPT : SessionMode.EXPLORE
  );

  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [showTutorDialog, setShowTutorDialog] = useState(false);
  
  // NEW: Chat Overlay State
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (pageIndex === 0 && mode !== SessionMode.CONCEPT && mode !== SessionMode.EXPLORE && mode !== SessionMode.BUILD) {
         // Reset
    } else if (pageIndex > 0) {
         setMode(prev => prev === SessionMode.CONCEPT ? SessionMode.EXPLORE : SessionMode.EXPLORE);
    }
    
    setSelectedSegment(null);
    setShowTutorDialog(false); 
    // Close chat on page change to reset context
    setIsChatOpen(false);
    window.scrollTo(0,0);
  }, [pageIndex, lessonId]);

  useEffect(() => {
    if (lessonId && mode === SessionMode.EXPLORE) {
        saveProgress(lessonId, pageIndex.toString());
    }
  }, [lessonId, pageIndex, mode]);

  useEffect(() => {
    const currentSent = lesson?.sentences[pageIndex];
    if (mode === SessionMode.EXPLORE && currentSent?.tutorGuidance) {
        const hasSeen = progress.seenGuidanceIds?.includes(currentSent.id);
        if (!hasSeen) {
            const timer = setTimeout(() => {
                SFX.playPop();
                setShowTutorDialog(true);
            }, 800);
            return () => clearTimeout(timer);
        }
    }
  }, [pageIndex, mode, lesson]);

  if (!lesson || !lesson.sentences || lesson.sentences.length === 0) {
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

  const finalQuizSentence = lesson.sentences[lesson.sentences.length - 1];

  const checkRelationship = (segId: string) => {
    if (!selectedSegment) return false;
    if (!currentSentence.segments) return false;
    
    const segment = currentSentence.segments.find(s => s.id === segId);
    return segId === selectedSegment.relatedToId || (segment?.relatedToId === selectedSegment.id);
  };

  const handleConceptComplete = () => {
      setMode(SessionMode.EXPLORE);
      window.scrollTo(0,0);
  };

  const handleNext = () => {
    SFX.playClick();
    if (mode === SessionMode.EXPLORE) {
      setMode(SessionMode.BUILD);
      window.scrollTo(0, 0); 
    } else if (mode === SessionMode.BUILD) {
      if (pageIndex < totalPages - 1) {
        navigate(`/read/${lessonId}/${pageIndex + 1}`);
      } else {
        setMode(SessionMode.QUIZ);
        window.scrollTo(0, 0); 
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

  const handleQuizComplete = () => {
    SFX.playFanfare();
    setMode(SessionMode.SUMMARY);
    window.scrollTo(0, 0);
  };

  const handleSummaryComplete = () => {
      markLessonComplete(lessonId || '');
      navigate('/contents');
  };

  const handleAskTeacher = () => {
      setIsChatOpen(true); // Open the overlay instead of navigating
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center relative overflow-hidden">
      
      {/* HEADER */}
      <div className="w-full max-w-lg px-4 py-4 flex items-center gap-4 bg-white border-b border-gray-100 sticky top-0 z-30">
        <button onClick={() => { SFX.playClick(); navigate('/contents'); }} className="p-1 text-gray-400 hover:text-red-500">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 flex flex-col justify-center">
           <div className="flex justify-between items-center mb-1">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
               {mode === SessionMode.CONCEPT ? 'TEORI' : mode === SessionMode.EXPLORE ? 'FAHAMI' : mode === SessionMode.BUILD ? 'SUSUN' : mode === SessionMode.SUMMARY ? 'KHULASAH' : 'UJIAN'}
             </span>
             {mode !== SessionMode.SUMMARY && mode !== SessionMode.CONCEPT && (
                 <span className="text-[10px] font-bold text-[#1a1512]">{pageIndex + 1} / {totalPages}</span>
             )}
           </div>
           <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#8a1c1c]"
              initial={{ width: 0 }}
              animate={{ width: mode === SessionMode.SUMMARY ? '100%' : `${((pageIndex + 1) / totalPages) * 100}%` }}
            />
           </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 w-full max-w-lg flex flex-col relative overflow-y-auto">
        
        {/* TUTOR POPUP DIALOG */}
        <TutorDialog 
            isVisible={showTutorDialog} 
            text={currentSentence.tutorGuidance || ''} 
            onDismiss={() => {
                setShowTutorDialog(false);
                markGuidanceSeen(currentSentence.id);
            }}
        />

        {mode === SessionMode.CONCEPT && lesson.introConcepts && (
            <ConceptBoard 
                concepts={lesson.introConcepts}
                onComplete={handleConceptComplete}
            />
        )}

        {mode === SessionMode.EXPLORE && (
            <div className="flex-1 flex flex-col animate-in fade-in duration-500 px-4 pt-6 pb-32">
               <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#8a1c1c]" />
                    <span className="text-xs font-bold text-[#8a1c1c] uppercase">Bedah Logika</span>
                    
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
            <div className="flex-1 animate-in zoom-in-95 duration-300 px-4 pt-6 pb-32">
               <SentenceBuilder 
                  sentence={currentSentence} 
                  onSuccess={handleNext}
               />
            </div>
        )}

        {mode === SessionMode.QUIZ && (
             <div className="flex-1 animate-in slide-in-from-right duration-300 px-4 pt-6 pb-32">
                <Quiz 
                  sentence={finalQuizSentence} 
                  onComplete={handleQuizComplete} 
                />
             </div>
        )}

        {mode === SessionMode.SUMMARY && lesson.summary && (
            <LessonSummary 
                summary={lesson.summary} 
                onComplete={handleSummaryComplete}
                onAskTeacher={handleAskTeacher} 
            />
        )}
      </div>

      {/* FOOTER NAV - Always Visible if Explore */}
      {mode === SessionMode.EXPLORE && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom z-30">
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
         <div className="fixed bottom-0 left-0 right-0 p-4 safe-bottom z-30 pointer-events-none">
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

      {/* NEW: FLOATING "ASK USTADZ" BUTTON (Only in Explore Mode) */}
      {mode === SessionMode.EXPLORE && (
        <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { SFX.playPop(); setIsChatOpen(true); }}
            className="fixed bottom-24 right-4 z-40 w-14 h-14 bg-[#1a1512] rounded-full flex items-center justify-center shadow-xl border-2 border-[#fdfbf7] hover:bg-gray-800 transition-colors"
        >
            <span className="font-arabic text-2xl text-white mt-1">ع</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </motion.button>
      )}

      {/* NEW: USTADZ CHAT OVERLAY */}
      <AnimatePresence>
        {isChatOpen && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-[50] backdrop-blur-sm"
                    onClick={() => setIsChatOpen(false)}
                />
                <motion.div
                    initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-x-0 bottom-0 top-16 z-[51] bg-[#f8f9fa] rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-w-lg mx-auto"
                >
                    <GeminiChat 
                        navigate={navigate}
                        isOverlay={true}
                        onClose={() => setIsChatOpen(false)}
                        contextData={{
                            lessonTitle: lesson.title,
                            sentenceArabic: currentSentence.arabicText,
                            sentenceTranslation: currentSentence.translation,
                            selectedWord: selectedSegment?.text,
                            selectedRole: selectedSegment?.grammaticalRole
                        }}
                    />
                </motion.div>
            </>
        )}
      </AnimatePresence>

    </div>
  );
};
