import { Lesson, LogicId, WordType } from '../types';

export const LESSON_DATA: Lesson[] = [
  {
    id: 'lesson_01',
    title: 'Pelajaran 1: Haza (Ini)',
    description: 'Dasar menunjuk benda jarak dekat dan membedakan benda berakal vs tidak.',
    concepts: ['Isim Isyarah (Kata Tunjuk)', 'Mubtada-Khobar', 'Pertanyaan (Ma & Man)'],
    vocabulary: [
      { arabic: 'بَيْتٌ', latin: 'Baitun', meaning: 'Rumah' },
      { arabic: 'مَسْجِدٌ', latin: 'Masjidun', meaning: 'Masjid' },
      { arabic: 'بَابٌ', latin: 'Baabun', meaning: 'Pintu' },
      { arabic: 'كِتَابٌ', latin: 'Kitaabun', meaning: 'Buku' },
      { arabic: 'قَلَمٌ', latin: 'Qolamun', meaning: 'Pena' },
      { arabic: 'مِفْتَاحٌ', latin: 'Miftaahun', meaning: 'Kunci' },
      { arabic: 'مَكْتَبٌ', latin: 'Maktabun', meaning: 'Meja Tulis' },
      { arabic: 'سَرِيْرٌ', latin: 'Sariirun', meaning: 'Ranjang' },
      { arabic: 'كُرْسِيٌّ', latin: 'Kursiyyun', meaning: 'Kursi' },
      { arabic: 'قَمِيْصٌ', latin: 'Qomiisun', meaning: 'Kemeja' },
      { arabic: 'نَجْمٌ', latin: 'Najmun', meaning: 'Bintang' },
      { arabic: 'طَبِيْبٌ', latin: 'Thobiibun', meaning: 'Dokter' },
      { arabic: 'وَلَدٌ', latin: 'Waladun', meaning: 'Anak Laki-laki' },
      { arabic: 'طَالِبٌ', latin: 'Tholibun', meaning: 'Siswa' },
      { arabic: 'رَجُلٌ', latin: 'Rajulun', meaning: 'Pria Dewasa' },
      { arabic: 'تَاجِرٌ', latin: 'Taajirun', meaning: 'Pedagang' },
      { arabic: 'كَلْبٌ', latin: 'Kalbun', meaning: 'Anjing' },
      { arabic: 'قِطٌّ', latin: 'Qittun', meaning: 'Kucing' },
      { arabic: 'حِمَارٌ', latin: 'Himaarun', meaning: 'Keledai' },
      { arabic: 'حِصَانٌ', latin: 'Hishoonun', meaning: 'Kuda' },
      { arabic: 'جَمَلٌ', latin: 'Jamalun', meaning: 'Unta' },
      { arabic: 'دِيْكٌ', latin: 'Diikun', meaning: 'Ayam Jago' },
      { arabic: 'مُدَرِّسٌ', latin: 'Mudarrisun', meaning: 'Guru' },
      { arabic: 'مِنْدِيْلٌ', latin: 'Mindiilun', meaning: 'Sapu Tangan' },
    ],
    sentences: [
      {
        id: '1_1',
        arabicText: 'هَذَا بَيْتٌ',
        translation: 'Ini adalah rumah.',
        segments: [
          { id: '1_1_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Kata Tunjuk jarak dekat (Ini).' },
          { id: '1_1_2', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Benda yang ditunjuk (Rumah).' }
        ]
      },
      {
        id: '1_2',
        arabicText: 'هَذَا مَسْجِدٌ',
        translation: 'Ini adalah masjid.',
        segments: [
          { id: '1_2_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_2_2', text: 'مَسْجِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Masjid.' }
        ]
      },
      {
        id: '1_3',
        arabicText: 'هَذَا بَابٌ',
        translation: 'Ini adalah pintu.',
        segments: [
          { id: '1_3_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_3_2', text: 'بَابٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Pintu.' }
        ]
      },
      {
        id: '1_4',
        arabicText: 'مَا هَذَا؟ هَذَا قَلَمٌ',
        translation: 'Apa ini? Ini pena.',
        segments: [
          { id: '1_4_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Kata tanya untuk benda mati.' },
          { id: '1_4_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_4_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_4_4', text: 'قَلَمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Pena.' }
        ]
      },
      {
        id: '1_5',
        arabicText: 'أَهَذَا بَيْتٌ؟ لَا، هَذَا مَسْجِدٌ',
        translation: 'Apakah ini rumah? Bukan, ini masjid.',
        segments: [
          { id: '1_5_1', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Hamzah Istifham', explanation: 'Apakah (Pertanyaan Ya/Tidak).' },
          { id: '1_5_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_5_3', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rumah.' },
          { id: '1_5_4', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Jawab', explanation: 'Bukan/Tidak.' },
          { id: '1_5_5', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_5_6', text: 'مَسْجِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Masjid.' }
        ]
      },
      {
        id: '1_6',
        arabicText: 'أَهَذَا مِفْتَاحٌ؟ لَا، هَذَا قَلَمٌ',
        translation: 'Apakah ini kunci? Bukan, ini pena.',
        segments: [
          { id: '1_6_1', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Hamzah Istifham', explanation: 'Apakah.' },
          { id: '1_6_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_6_3', text: 'مِفْتَاحٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kunci.' },
          { id: '1_6_4', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Jawab', explanation: 'Bukan.' },
          { id: '1_6_5', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_6_6', text: 'قَلَمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Pena.' }
        ]
      },
      {
        id: '1_7',
        arabicText: 'مَا هَذَا؟ هَذَا نَجْمٌ',
        translation: 'Apa ini? Ini bintang.',
        segments: [
          { id: '1_7_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Apa.' },
          { id: '1_7_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_7_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_7_4', text: 'نَجْمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Bintang.' }
        ]
      },
      {
        id: '1_8',
        arabicText: 'مَنْ هَذَا؟ هَذَا طَبِيْبٌ',
        translation: 'Siapa ini? Ini dokter.',
        segments: [
          { id: '1_8_1', text: 'مَنْ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Kata tanya untuk yang berakal (Siapa).' },
          { id: '1_8_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_8_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_8_4', text: 'طَبِيْبٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Dokter.' }
        ]
      }
    ]
  },
  {
    id: 'lesson_02',
    title: 'Pelajaran 2: Zalika (Itu)',
    description: 'Menunjuk benda jarak jauh.',
    concepts: ['Isim Isyarah Jauh', 'Wawu Athof (Kata Sambung)'],
    vocabulary: [
      { arabic: 'ذَلِكَ', latin: 'Zalika', meaning: 'Itu' },
      { arabic: 'إِمَامٌ', latin: 'Imamun', meaning: 'Imam/Pemimpin' },
      { arabic: 'حَجَرٌ', latin: 'Hajarun', meaning: 'Batu' },
      { arabic: 'سُكَّرٌ', latin: 'Sukkarun', meaning: 'Gula' },
      { arabic: 'لَبَنٌ', latin: 'Labanun', meaning: 'Susu' },
    ],
    sentences: [
      {
        id: '2_1',
        arabicText: 'مَا ذَلِكَ؟ ذَلِكَ نَجْمٌ',
        translation: 'Apa itu? Itu bintang.',
        segments: [
          { id: '2_1_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Isim Istifham', explanation: 'Kata tanya benda.' },
          { id: '2_1_2', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Kata tunjuk JAUH (Itu).' },
          { id: '2_1_3', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_1_4', text: 'نَجْمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Bintang.' }
        ]
      },
      {
        id: '2_2',
        arabicText: 'هَذَا مَسْجِدٌ وَذَلِكَ بَيْتٌ',
        translation: 'Ini masjid dan itu rumah.',
        segments: [
          { id: '2_2_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '2_2_2', text: 'مَسْجِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Masjid.' },
          { id: '2_2_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: '2_2_4', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_2_5', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rumah.' }
        ]
      }
    ]
  },
  {
    id: 'lesson_03',
    title: 'Pelajaran 3: Al (Ma\'rifah)',
    description: 'Perubahan dari "Sebuah Rumah" menjadi "Rumah Itu" (Spesifik).',
    concepts: ['Al-Ma\'rifah (Definite)', 'Nakirah (Indefinite)', 'Huruf Syamsiah & Qamariah'],
    vocabulary: [
      { arabic: 'مَكْسُوْرٌ', latin: 'Maksurun', meaning: 'Patah/Rusak' },
      { arabic: 'مَفْتُوْحٌ', latin: 'Maftuuhun', meaning: 'Terbuka' },
      { arabic: 'جَالِسٌ', latin: 'Jaalisun', meaning: 'Duduk' },
      { arabic: 'وَاِقفٌ', latin: 'Waaqifun', meaning: 'Berdiri' },
      { arabic: 'جَدِيْدٌ', latin: 'Jadiidun', meaning: 'Baru' },
      { arabic: 'قَدِيْمٌ', latin: 'Qodiimun', meaning: 'Lama/Usang' },
      { arabic: 'صَغِيْرٌ', latin: 'Shoghiirun', meaning: 'Kecil' },
      { arabic: 'كَبِيْرٌ', latin: 'Kabiirun', meaning: 'Besar' },
      { arabic: 'وَسِخٌ', latin: 'Wasikhun', meaning: 'Kotor' },
      { arabic: 'بَارِدٌ', latin: 'Baaridun', meaning: 'Dingin' },
      { arabic: 'جَمِيْلٌ', latin: 'Jamiilun', meaning: 'Indah' },
    ],
    sentences: [
      {
        id: '3_1',
        arabicText: 'اَلْقَلَمُ مَكْسُوْرٌ',
        translation: 'Pena itu rusak.',
        segments: [
          { id: '3_1_1', text: 'اَلْقَلَمُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Ma\'rifah (Ada Al).' },
          { id: '3_1_2', text: 'مَكْسُوْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rusak.' }
        ]
      },
      {
        id: '3_2',
        arabicText: 'اَلْبَابُ مَفْتُوْحٌ',
        translation: 'Pintu itu terbuka.',
        segments: [
          { id: '3_2_1', text: 'اَلْبَابُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Pintu itu.' },
          { id: '3_2_2', text: 'مَفْتُوْحٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Terbuka.' }
        ]
      }
    ]
  },
  {
    id: 'lesson_04',
    title: 'Pelajaran 4: Huruf Jar',
    description: 'Kekuatan "Amil" (Operator) yang mengubah harakat menjadi Kasrah (i).',
    concepts: ['Huruf Jar (Fi, Ala, Min, Ila)', 'Isim Majrur', 'Dhomir (Huwa, Hiya)'],
    vocabulary: [
      { arabic: 'فِي', latin: 'Fii', meaning: 'Di dalam' },
      { arabic: 'عَلَى', latin: 'Ala', meaning: 'Di atas' },
      { arabic: 'مِنْ', latin: 'Min', meaning: 'Dari' },
      { arabic: 'إِلَى', latin: 'Ila', meaning: 'Ke' },
      { arabic: 'اَلْغُرْفَةُ', latin: 'Al-Ghurfatu', meaning: 'Kamar' },
      { arabic: 'اَلْحَمَّامُ', latin: 'Al-Hamaamu', meaning: 'Kamar Mandi' },
      { arabic: 'اَلْمَطْبَخُ', latin: 'Al-Mathbakhu', meaning: 'Dapur' },
      { arabic: 'أَيْنَ', latin: 'Aina', meaning: 'Di mana?' },
      { arabic: 'اَلسَّمَاءُ', latin: 'As-Samaa\'u', meaning: 'Langit' },
      { arabic: 'اَلْفَصْلُ', latin: 'Al-Fashlu', meaning: 'Kelas' },
    ],
    sentences: [
      {
        id: '4_1',
        arabicText: 'مُحَمَّدٌ فِي الْغُرْفَةِ',
        translation: 'Muhammad ada di dalam kamar.',
        segments: [
          { id: '4_1_1', text: 'مُحَمَّدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Nama orang (Alam) umumnya bertanwin "un". Subjek.', vowelEnding: 'un' },
          { id: '4_1_2', text: 'فِي', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: '[OPERATOR] Huruf Jar ibarat MAGNET. Ia menarik harakat kata setelahnya ke bawah.' },
          { id: '4_1_3', text: 'الْغُرْفَةِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: '4_1_2', explanation: 'Majrur (Jatuh/Bawah). Harakat WAJIB "i" (Kasrah) karena ditarik oleh "Fi".', vowelEnding: 'i' }
        ]
      },
      {
        id: '4_2',
        arabicText: 'وَ يَاسِرٌ فِي الْحَمَّامِ',
        translation: 'Dan Yasir ada di kamar mandi.',
        segments: [
          { id: '4_2_1', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: '4_2_2', text: 'يَاسِرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Nama orang, tanwin "un".' },
          { id: '4_2_3', text: 'فِي', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Magnet penarik ke bawah.' },
          { id: '4_2_4', text: 'الْحَمَّامِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: '4_2_3', explanation: 'Berakhiran "i" karena ada "Fi" sebelumnya.', vowelEnding: 'i' }
        ]
      }
    ]
  }
];