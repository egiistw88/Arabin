import React from 'react';
import { Map, Book, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { SFX } from '../services/sfx';

interface BottomNavProps {
  currentPath?: string;
  navigate: (path: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPath, navigate }) => {
  const navItems = [
    { to: '/contents', icon: Map, label: 'Peta Belajar', id: 'nav-map' },
    { to: '/dictionary', icon: Book, label: 'Kamus', id: 'nav-book' },
    { to: '/profile', icon: User, label: 'Profil', id: 'nav-profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 nav-shadow z-50 safe-bottom">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label, id }) => {
            const isActive = currentPath === to;
            return (
              <button
                key={to}
                onClick={() => { SFX.playClick(); navigate(to); }}
                className={`
                  relative flex flex-col items-center justify-center w-full h-full transition-colors duration-200
                  ${isActive ? 'text-[#8a1c1c]' : 'text-gray-400 hover:text-gray-600'}
                `}
              >
                {/* Sliding Active Background */}
                {isActive && (
                    <motion.div 
                        layoutId="nav-bg"
                        className="absolute w-12 h-12 bg-[#8a1c1c]/5 rounded-xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                
                <div className={`p-1 rounded-xl transition-all z-10`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                </div>
                <span className="text-[10px] font-sans font-bold mt-1 tracking-wide z-10">{label}</span>
              </button>
            );
        })}
      </div>
    </div>
  );
};