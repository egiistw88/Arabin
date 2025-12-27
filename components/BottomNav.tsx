import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, Book, User } from 'lucide-react';

export const BottomNav = () => {
  const navItems = [
    { to: '/contents', icon: Map, label: 'Peta Belajar' },
    { to: '/dictionary', icon: Book, label: 'Kamus' },
    { to: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 nav-shadow z-50 safe-bottom">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex flex-col items-center justify-center w-full h-full transition-colors duration-200
              ${isActive ? 'text-[#8a1c1c]' : 'text-gray-400 hover:text-gray-600'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-[#8a1c1c]/5' : ''}`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                </div>
                <span className="text-[10px] font-sans font-bold mt-1 tracking-wide">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};