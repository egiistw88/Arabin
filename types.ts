// Grammatical Roles mapped to colors/functions
export enum WordType {
  NOUN = 'Isim',
  VERB = 'Fi\'il',
  PARTICLE = 'Harf',
  OPERATOR = 'Amil', // Words that change others (e.g., Harf Jar)
}

// Logic IDs for the Tutor Engine
export enum LogicId {
  DEFAULT_NOUN = 'rule_initial_noun', // Mubtada/Default state
  PREPOSITION_TRIGGER = 'rule_preposition', // The magnet
  AFTER_PREPOSITION = 'rule_after_preposition', // The result (Majrur)
  DEMONSTRATIVE = 'rule_demonstrative', // Isim Isyarah
  QUESTION_TOOL = 'rule_question', // Istifham
}

export interface Segment {
  id: string;
  text: string; // The Arabic word
  rootWord?: string;
  transliteration?: string;
  type: WordType;
  vowelEnding?: string; // u, i, a
  logicId: LogicId;
  explanation: string; // The "Tutor" persona text
  grammaticalRole?: string; // Explicit role e.g., "Mubtada", "Khobar"
  relatedToId?: string; // If this word is affected by another (causality)
}

export interface Sentence {
  id: string;
  arabicText: string;
  translation: string;
  segments: Segment[];
  audioSrc?: string; // Path to audio file
}

export interface VocabularyItem {
  arabic: string;
  latin: string;
  meaning: string;
  plural?: string; // Jamak
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  sentences: Sentence[];
  concepts: string[];
  vocabulary: VocabularyItem[]; // New: List of vocab for this lesson
}

export interface UserProgress {
  lastLessonId: string;
  lastPageId: string;
  completedLessons: string[]; // Array of Lesson IDs that are 100% done
  currentStreak: number;
  lastStudyDate: string; // Format: YYYY-MM-DD
}