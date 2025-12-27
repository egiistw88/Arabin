import { WordType } from './types';

// Visual System: Color-Coded Grammar (Kitab Kuning Palette)
// Colors must be distinct but deep/ink-like, not neon.

export const TYPE_COLORS: Record<WordType, string> = {
  // Isim: Deep Navy (Tinta Biru Klasik)
  [WordType.NOUN]: 'text-[#0f3460]',      
  // Fi'il: Deep Amber/Ochre (Tinta Emas Gelap)
  [WordType.VERB]: 'text-[#b45309]',     
  // Harf: Dark Grey (Tinta Hitam Pudar)
  [WordType.PARTICLE]: 'text-[#4a4a4a]',  
  // Operator: Deep Maroon (Tinta Merah Darah - Warning)
  [WordType.OPERATOR]: 'text-[#7f1d1d]',  
};

export const TYPE_BG_COLORS: Record<WordType, string> = {
  // Backgrounds should look like highlighter on parchment (multiply effect conceptually)
  [WordType.NOUN]: 'bg-[#e0e7ff]/50', // Very sheer blue
  [WordType.VERB]: 'bg-[#fef3c7]/50', // Very sheer amber
  [WordType.PARTICLE]: 'bg-transparent',
  [WordType.OPERATOR]: 'bg-[#ffe4e6]/50', // Very sheer rose
};

// Vowel Ending Highlights (The "Safe" Zone)
export const VOWEL_COLOR = 'text-[#15803d]'; // Islamic Green

// Animation Variants (Subtle, dignified)
export const FADE_IN = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const BOUNCE = {
  initial: { scale: 0.98 },
  animate: { scale: 1.02, transition: { duration: 0.2 } }
};