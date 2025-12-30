
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
  QUESTION_TOOL = 'rule_question', // Istifham (Ma/Man)
  QUESTION_HAMZAH = 'rule_question_hamzah', // Istifham (A...)
  ANSWER_PARTICLE = 'rule_answer', // Na'am / La
  DEFINITE_AL = 'rule_definite_al', // Al-Ma'rifah
  POSSESSION = 'rule_mudhaf', // Idhafah
  ADJECTIVE = 'rule_naat', // Na'at Man'ut
}

// Session Modes for Lesson Flow
export enum SessionMode {
  CONCEPT = 'concept', // NEW: Theory Phase
  EXPLORE = 'explore', 
  BUILD = 'build',
  QUIZ = 'quiz',
  SUMMARY = 'summary'
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
  deepLogic?: string; // NEW: Detailed grammatical nuance (The "Why")
  grammaticalRole?: string; // Explicit role e.g., "Mubtada", "Khobar"
  relatedToId?: string; // If this word is affected by another (causality)
}

export interface Sentence {
  id: string;
  arabicText: string;
  translation: string;
  segments: Segment[];
  audioSrc?: string; // Path to audio file
  tutorGuidance?: string; // NEW: Contextual guidance from the teacher popup
}

export interface VocabularyItem {
  arabic: string;
  latin: string;
  meaning: string;
  plural?: string; // Jamak
}

export interface LessonSummary {
  title: string;
  keyPoints: string[]; // Bullet points of logic learned
  teacherTip: string; // The "Pro Tip" or mnemonic
}

// NEW: Concept Slide for Theoretical Grounding
export interface ConceptSlide {
    title: string;
    description: string;
    analogyIcon?: string; // e.g., "Magnet", "Crown", "Bridge"
    visualRule: {
        before: string;
        after: string;
        explanation: string;
    };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  introConcepts: ConceptSlide[]; // NEW: Theory before Practice
  sentences: Sentence[];
  concepts: string[];
  vocabulary: VocabularyItem[]; 
  summary?: LessonSummary; 
}

export interface UserProgress {
  userName?: string; 
  lastLessonId: string;
  lastPageId: string;
  completedLessons: string[]; 
  currentStreak: number;
  lastStudyDate: string; 
  totalXp?: number; 
  seenGuidanceIds?: string[]; 
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
