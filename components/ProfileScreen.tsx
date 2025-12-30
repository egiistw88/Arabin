
import React, { useState } from 'react';
import { RefreshCw, Edit2, ChevronRight, RotateCcw, LogOut, Flame, Trophy, Medal, Settings, GraduationCap, Star, Check } from 'lucide-react';
import { motion as m, AnimatePresence } from 'framer-motion'; 
import { SFX } from '../services/sfx';
import { ConfirmationDialog } from './ConfirmationDialog';
import { UserProgress } from '../types';
import { calculateVocabMastery } from '../services/data';
import { StatsChart } from './StatsChart'; 

const motion = m as any;

const STORAGE_KEY = 'durus_progress_v2';

interface ProfileScreenProps {
    progress: UserProgress;
    updateUserName: (name: string) => void;
    resetGuidanceHistory: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ progress, updateUserName, resetGuidanceHistory }) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(progress.userName || 'Penuntut Ilmu');
    const [showResetDialog, setShowResetDialog] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
  
    const vocabMasteredCount = calculateVocabMastery(progress);

    const totalXp = progress.totalXp || 0;
    const level = Math.floor(totalXp / 500) + 1;
    const currentLevelXp = totalXp - ((level - 1) * 500);
    const progressPercent = Math.min((currentLevelXp / 500) * 100, 100);
  
    const getTitle = (lvl: number) => {
        if (lvl >= 10) return "Al-Alim (Ahli)";
        if (lvl >= 5) return "Thalib (Penuntut)";
        return "Mubtadi (Pemula)";
    };
  
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

    const handleResetTips = () => {
        SFX.playPop();
        resetGuidanceHistory();
        setNotification("Tips guru akan muncul kembali di pelajaran.");
        setTimeout(() => setNotification(null), 3000);
    };
  
    const performReset = () => {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    };
  
    return (
      <div className="min-h-screen bg-[#f8f9fa] relative">
         
         <ConfirmationDialog 
            isOpen={showResetDialog}
            title="Hapus Semua Data?"
            message="PERINGATAN: Tindakan ini akan menghapus semua riwayat belajar, hafalan, dan XP Anda. Ini tidak dapat dibatalkan."
            confirmLabel="Ya, Hapus Semuanya"
            isDanger={true}
            onConfirm={performReset}
            onCancel={() => setShowResetDialog(false)}
         />

         {/* Notification Toast */}
         <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="fixed top-24 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none"
                >
                    <div className="bg-[#1a1512] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-700/50 backdrop-blur-md">
                        <div className="bg-green-500 rounded-full p-1 text-[#1a1512]">
                            <Check className="w-3 h-3" strokeWidth={4} />
                        </div>
                        <span className="text-sm font-bold font-serif tracking-wide">{notification}</span>
                    </div>
                </motion.div>
            )}
         </AnimatePresence>
  
         {/* HEADER */}
         <div className="bg-[#1a1512] text-[#fdfbf7] pt-10 pb-16 px-6 rounded-b-[40px] shadow-xl relative overflow-hidden">
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
  
         <div className="max-w-md mx-auto px-6 -mt-10 relative z-20 space-y-6 pb-24">
           
           <div className="grid grid-cols-2 gap-4">
               {/* Stats Cards */}
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
  
               <div className="col-span-2">
                  <StatsChart stats={{ vocab: vocabMasteredCount, xp: totalXp, grammar: 0 }} />
               </div>
           </div>
  
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
                      onClick={handleResetTips}
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
               <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Arabin v1.1.0 (AI Connected)</p>
           </div>
  
         </div>
      </div>
    );
};
