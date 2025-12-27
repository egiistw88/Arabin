import { Lesson, LogicId, WordType } from '../types';

// Struktur Data yang lebih mendalam
export const LESSON_DATA: Lesson[] = [
  {
    id: 'lesson_01',
    title: 'Ad-Darsul Awwal: Isim Isyarah',
    description: 'Kaidah dasar menunjuk benda (Mubtada) dan mengabarkannya (Khobar).',
    concepts: ['Haza (Ini)', 'Mubtada-Khobar', 'Nakirah vs Ma\'rifah'],
    vocabulary: [
      { arabic: 'بَيْتٌ', latin: 'Baitun', meaning: 'Rumah' },
      { arabic: 'مَسْجِدٌ', latin: 'Masjidun', meaning: 'Masjid' },
      { arabic: 'بَابٌ', latin: 'Baabun', meaning: 'Pintu' },
      { arabic: 'كِتَابٌ', latin: 'Kitaabun', meaning: 'Buku' },
      { arabic: 'قَلَمٌ', latin: 'Qolamun', meaning: 'Pena' },
      { arabic: 'مِفْتَاحٌ', latin: 'Miftaahun', meaning: 'Kunci' },
    ],
    sentences: [
      {
        id: 's1_1',
        arabicText: 'هَذَا بَيْتٌ',
        translation: 'Ini adalah sebuah rumah.',
        // Mock audio path - in real app connect to assets
        audioSrc: 'https://example.com/audio/lesson1_1.mp3', 
        segments: [
          {
            id: 'seg_1_1',
            text: 'هَذَا',
            type: WordType.NOUN,
            logicId: LogicId.DEMONSTRATIVE,
            grammaticalRole: 'Mubtada (Subjek)',
            explanation: 'Isim Isyarah (Kata Tunjuk) untuk jarak dekat. Karena di awal kalimat, ia menjadi Mubtada (Pangkal Kalimat).',
            vowelEnding: 'a'
          },
          {
            id: 'seg_1_2',
            text: 'بَيْتٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar (Predikat)',
            explanation: 'Khobar (Kabar). Ia menyempurnakan makna "Haza". Tanwin "un" menandakan benda ini masih umum (Nakirah).',
            vowelEnding: 'un'
          }
        ]
      },
      {
        id: 's1_2',
        arabicText: 'مَا هَذَا؟',
        translation: 'Apakah ini?',
        segments: [
          {
            id: 'seg_1_3',
            text: 'مَا',
            type: WordType.PARTICLE,
            logicId: LogicId.QUESTION_TOOL,
            grammaticalRole: 'Isim Istifham',
            explanation: 'Kata Tanya untuk benda mati (Ghayru Aqil).',
          },
          {
            id: 'seg_1_4',
            text: 'هَذَا',
            type: WordType.NOUN,
            logicId: LogicId.DEMONSTRATIVE,
            grammaticalRole: 'Mubtada Muakhar',
            explanation: 'Subjek yang diakhirkan karena adab bertanya.',
          }
        ]
      }
    ]
  },
  {
    id: 'lesson_04',
    title: 'Ad-Darsur Rabi\': Harf Jar',
    description: 'Mengenal "Amil" (Pengubah) yang menarik harakat Isim menjadi Kasrah.',
    concepts: ['Fi (Di dalam)', 'Ala (Di atas)', 'Majrur', 'Tanda Jar'],
    vocabulary: [
      { arabic: 'اَلْبَيْتُ', latin: 'Al-Baitu', meaning: 'Rumah itu' },
      { arabic: 'اَلْمَدِينَةُ', latin: 'Al-Madinatu', meaning: 'Kota itu' },
      { arabic: 'اَلسُّوقُ', latin: 'As-Suuqu', meaning: 'Pasar' },
      { arabic: 'فِي', latin: 'Fii', meaning: 'Di dalam' },
      { arabic: 'عَلَى', latin: 'Ala', meaning: 'Di atas' },
    ],
    sentences: [
      {
        id: 's4_1',
        arabicText: 'الْبَيْتُ فِي الْمَدِينَةِ',
        translation: 'Rumah itu ada di dalam kota.',
        segments: [
          {
            id: 'seg_4_1',
            text: 'الْبَيْتُ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Mubtada',
            explanation: 'Mubtada (Subjek). Ada "Al" maka Tanwin hilang. Harakat "u" (Dommah) karena ia sepi dari Amil.',
            vowelEnding: 'u'
          },
          {
            id: 'seg_4_2',
            text: 'فِي',
            type: WordType.OPERATOR,
            logicId: LogicId.PREPOSITION_TRIGGER,
            grammaticalRole: 'Harf Jar',
            explanation: '[AMIL] Huruf Jar. Fungsinya "men-jar-kan" (mengkasrahkan) kata setelahnya.',
            vowelEnding: 'i'
          },
          {
            id: 'seg_4_3',
            text: 'الْمَدِينَةِ',
            type: WordType.NOUN,
            logicId: LogicId.AFTER_PREPOSITION,
            grammaticalRole: 'Isim Majrur',
            relatedToId: 'seg_4_2',
            explanation: 'Isim Majrur. Wajib berakhiran "i" (Kasrah) karena didahului "Fi". Ini hukum kausalitas mutlak.',
            vowelEnding: 'i'
          }
        ]
      },
      {
        id: 's4_2',
        arabicText: 'الْكِتَابُ عَلَى الْمَكْتَبِ',
        translation: 'Buku itu di atas meja.',
        segments: [
          {
            id: 'seg_4_4',
            text: 'الْكِتَابُ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Mubtada',
            explanation: 'Benda tertentu (Ma\'rifah) yang sedang dibicarakan.',
            vowelEnding: 'u'
          },
          {
            id: 'seg_4_5',
            text: 'عَلَى',
            type: WordType.OPERATOR,
            logicId: LogicId.PREPOSITION_TRIGGER,
            grammaticalRole: 'Harf Jar',
            explanation: '[AMIL] Huruf Jar "Ala" (Di atas - menempel).',
          },
          {
            id: 'seg_4_6',
            text: 'الْمَكْتَبِ',
            type: WordType.NOUN,
            logicId: LogicId.AFTER_PREPOSITION,
            grammaticalRole: 'Isim Majrur',
            relatedToId: 'seg_4_5',
            explanation: 'Majrur bil Kasrah. Akibat dari "Ala".',
            vowelEnding: 'i'
          }
        ]
      }
    ]
  },
  { id: 'lesson_02', title: 'Ad-Darsus Tsaani: Dzalika', description: 'Isim Isyarah lil Ba\'id (Jauh).', sentences: [], concepts: [], vocabulary: [] },
  { id: 'lesson_03', title: 'Ad-Darsus Tsalits: Al-Ma\'rifah', description: 'Bedanya "Rumah" dan "Rumah Itu".', sentences: [], concepts: [], vocabulary: [] },
];