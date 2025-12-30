
import React, { useState } from 'react';
import { BookOpen, Search, Eye, EyeOff, Volume2, Play } from 'lucide-react';
import { motion as m } from 'framer-motion';
import { LESSON_DATA } from '../services/data';
import { Lesson, VocabularyItem } from '../types';
import { SFX } from '../services/sfx';
import { audioService } from '../services/audio';

const motion = m as any;

export const DictionaryScreen = () => {
  const [search, setSearch] = useState('');
  const [isMemorizeMode, setIsMemorizeMode] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const groupedVocab = LESSON_DATA.map((lesson: Lesson) => ({
    lessonTitle: lesson.title,
    lessonId: lesson.id,
    items: lesson.vocabulary.filter((v: VocabularyItem) => 
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
      audioService.play(word, undefined, () => setPlayingWord(null));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
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
