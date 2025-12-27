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
        id: 's1_1',
        arabicText: 'هَذَا بَيْتٌ',
        translation: 'Ini adalah rumah.',
        segments: [
          { id: 's1_1_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Kata Tunjuk jarak dekat (Ini).' },
          { id: 's1_1_2', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Benda yang ditunjuk (Rumah).' }
        ]
      },
      {
        id: 's1_2',
        arabicText: 'هَذَا مَسْجِدٌ',
        translation: 'Ini adalah masjid.',
        segments: [
          { id: 's1_2_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_2_2', text: 'مَسْجِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Masjid.' }
        ]
      },
      {
        id: 's1_3',
        arabicText: 'هَذَا بَابٌ',
        translation: 'Ini adalah pintu.',
        segments: [
          { id: 's1_3_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_3_2', text: 'بَابٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Pintu.' }
        ]
      },
      {
        id: 's1_4',
        arabicText: 'مَا هَذَا؟ هَذَا قَلَمٌ',
        translation: 'Apa ini? Ini pena.',
        segments: [
          { id: 's1_4_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Kata tanya untuk benda mati.' },
          { id: 's1_4_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_4_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_4_4', text: 'قَلَمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Pena.' }
        ]
      },
      {
        id: 's1_5',
        arabicText: 'أَهَذَا بَيْتٌ؟ لَا، هَذَا مَسْجِدٌ',
        translation: 'Apakah ini rumah? Bukan, ini masjid.',
        segments: [
          { id: 's1_5_1', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Hamzah Istifham', explanation: 'Apakah (Pertanyaan Ya/Tidak).' },
          { id: 's1_5_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_5_3', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rumah.' },
          { id: 's1_5_4', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Jawab', explanation: 'Bukan/Tidak.' },
          { id: 's1_5_5', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_5_6', text: 'مَسْجِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Masjid.' }
        ]
      },
      {
        id: 's1_6',
        arabicText: 'أَهَذَا مِفْتَاحٌ؟ لَا، هَذَا قَلَمٌ',
        translation: 'Apakah ini kunci? Bukan, ini pena.',
        segments: [
          { id: 's1_6_1', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Hamzah Istifham', explanation: 'Apakah.' },
          { id: 's1_6_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_6_3', text: 'مِفْتَاحٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kunci.' },
          { id: 's1_6_4', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Jawab', explanation: 'Bukan.' },
          { id: 's1_6_5', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_6_6', text: 'قَلَمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Pena.' }
        ]
      },
      {
        id: 's1_7',
        arabicText: 'مَا هَذَا؟ هَذَا نَجْمٌ',
        translation: 'Apa ini? Ini bintang.',
        segments: [
          { id: 's1_7_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Apa.' },
          { id: 's1_7_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_7_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_7_4', text: 'نَجْمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Bintang.' }
        ]
      },
      {
        id: 's1_8',
        arabicText: 'مَنْ هَذَا؟ هَذَا طَبِيْبٌ',
        translation: 'Siapa ini? Ini dokter.',
        segments: [
          { id: 's1_8_1', text: 'مَنْ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Kata tanya untuk yang berakal (Siapa).' },
          { id: 's1_8_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_8_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_8_4', text: 'طَبِيْبٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Dokter.' }
        ]
      },
      {
        id: 's1_9',
        arabicText: 'مَنْ هَذَا؟ هَذَا وَلَدٌ',
        translation: 'Siapa ini? Ini anak laki-laki.',
        segments: [
          { id: 's1_9_1', text: 'مَنْ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Siapa.' },
          { id: 's1_9_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_9_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_9_4', text: 'وَلَدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Anak laki-laki.' }
        ]
      },
      {
        id: 's1_10',
        arabicText: 'مَنْ هَذَا؟ هَذَا طَالِبٌ',
        translation: 'Siapa ini? Ini siswa.',
        segments: [
          { id: 's1_10_1', text: 'مَنْ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Siapa.' },
          { id: 's1_10_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_10_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_10_4', text: 'طَالِبٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Siswa (Penuntut Ilmu).' }
        ]
      },
      {
        id: 's1_11',
        arabicText: 'أَهَذَا وَلَدٌ؟ لَا، هَذَا رَجُلٌ',
        translation: 'Apakah ini anak kecil? Bukan, ini pria dewasa.',
        segments: [
          { id: 's1_11_1', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Hamzah Istifham', explanation: 'Apakah.' },
          { id: 's1_11_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_11_3', text: 'وَلَدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Anak kecil.' },
          { id: 's1_11_4', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Jawab', explanation: 'Bukan.' },
          { id: 's1_11_5', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_11_6', text: 'رَجُلٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Pria dewasa.' }
        ]
      },
      {
        id: 's1_12',
        arabicText: 'مَا هَذَا؟ هَذَا مَسْجِدٌ',
        translation: 'Apa ini? Ini masjid.',
        segments: [
          { id: 's1_12_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Apa.' },
          { id: 's1_12_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_12_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_12_4', text: 'مَسْجِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Masjid.' }
        ]
      },
      {
        id: 's1_13',
        arabicText: 'مَنْ هَذَا؟ هَذَا تَاجِرٌ',
        translation: 'Siapa ini? Ini pedagang.',
        segments: [
          { id: 's1_13_1', text: 'مَنْ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Siapa.' },
          { id: 's1_13_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_13_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_13_4', text: 'تَاجِرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Pedagang.' }
        ]
      },
      {
        id: 's1_14',
        arabicText: 'هَذَا كَلْبٌ. أَهَذَا كَلْبٌ؟ لَا، هَذَا قِطٌّ',
        translation: 'Ini anjing. Apakah ini anjing? Bukan, ini kucing.',
        segments: [
          { id: 's1_14_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_14_2', text: 'كَلْبٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Anjing.' },
          { id: 's1_14_3', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Hamzah', explanation: 'Apakah.' },
          { id: 's1_14_4', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_14_5', text: 'كَلْبٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Anjing.' },
          { id: 's1_14_6', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Jawab', explanation: 'Bukan.' },
          { id: 's1_14_7', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_14_8', text: 'قِطٌّ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kucing.' }
        ]
      },
      {
        id: 's1_15',
        arabicText: 'هَذَا حِمَارٌ. أَهَذَا حِمَارٌ؟ لَا، هَذَا حِصَانٌ',
        translation: 'Ini keledai. Apakah ini keledai? Bukan, ini kuda.',
        segments: [
          { id: 's1_15_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_15_2', text: 'حِمَارٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Keledai.' },
          { id: 's1_15_3', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Hamzah', explanation: 'Apakah.' },
          { id: 's1_15_4', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_15_5', text: 'حِمَارٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Keledai.' },
          { id: 's1_15_6', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Jawab', explanation: 'Bukan.' },
          { id: 's1_15_7', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_15_8', text: 'حِصَانٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kuda.' }
        ]
      },
      {
        id: 's1_16',
        arabicText: 'وَمَا هَذَا؟ هَذَا جَمَلٌ',
        translation: 'Dan apa ini? Ini unta.',
        segments: [
          { id: 's1_16_1', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's1_16_2', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Apa.' },
          { id: 's1_16_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_16_4', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's1_16_5', text: 'جَمَلٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Unta.' }
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
        id: 's2_1',
        arabicText: 'مَا ذَلِكَ؟ ذَلِكَ نَجْمٌ',
        translation: 'Apa itu? Itu bintang.',
        segments: [
          { id: 's2_1_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Isim Istifham', explanation: 'Kata tanya benda.' },
          { id: 's2_1_2', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Kata tunjuk JAUH (Itu).' },
          { id: 's2_1_3', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: 's2_1_4', text: 'نَجْمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Bintang.' }
        ]
      },
      {
        id: 's2_2',
        arabicText: 'هَذَا مَسْجِدٌ وَذَلِكَ بَيْتٌ',
        translation: 'Ini masjid dan itu rumah.',
        segments: [
          { id: 's2_2_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's2_2_2', text: 'مَسْجِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Masjid.' },
          { id: 's2_2_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's2_2_4', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: 's2_2_5', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rumah.' }
        ]
      },
      {
        id: 's2_3',
        arabicText: 'هَذَا حِصَانٌ وَذَلِكَ حِمَارٌ',
        translation: 'Ini kuda dan itu keledai.',
        segments: [
          { id: 's2_3_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's2_3_2', text: 'حِصَانٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kuda.' },
          { id: 's2_3_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's2_3_4', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: 's2_3_5', text: 'حِمَارٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Keledai.' }
        ]
      },
      {
        id: 's2_4',
        arabicText: 'أَ ذَلِكَ كَلْبٌ؟ لَا، ذَلِكَ قِطٌّ',
        translation: 'Apakah itu anjing? Bukan, itu kucing.',
        segments: [
          { id: 's2_4_1', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Hamzah', explanation: 'Apakah.' },
          { id: 's2_4_2', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: 's2_4_3', text: 'كَلْبٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Anjing.' },
          { id: 's2_4_4', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Jawab', explanation: 'Bukan.' },
          { id: 's2_4_5', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: 's2_4_6', text: 'قِطٌّ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kucing.' }
        ]
      },
      {
        id: 's2_5',
        arabicText: 'مَا ذَلِكَ؟ ذَلِكَ سَرِيْرٌ',
        translation: 'Apa itu? Itu ranjang.',
        segments: [
          { id: 's2_5_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Apa.' },
          { id: 's2_5_2', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: 's2_5_3', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: 's2_5_4', text: 'سَرِيْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Ranjang.' }
        ]
      },
      {
        id: 's2_6',
        arabicText: 'مَنْ هَذَا وَ مَنْ ذَلِكَ؟',
        translation: 'Siapa ini dan siapa itu?',
        segments: [
          { id: 's2_6_1', text: 'مَنْ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Siapa.' },
          { id: 's2_6_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's2_6_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's2_6_4', text: 'مَنْ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Siapa.' },
          { id: 's2_6_5', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' }
        ]
      },
      {
        id: 's2_7',
        arabicText: 'هَذَا مُدَرِّسٌ وَ ذَلِكَ إِمَامٌ',
        translation: 'Ini guru dan itu imam.',
        segments: [
          { id: 's2_7_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's2_7_2', text: 'مُدَرِّسٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Guru.' },
          { id: 's2_7_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's2_7_4', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: 's2_7_5', text: 'إِمَامٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Imam.' }
        ]
      },
      {
        id: 's2_8',
        arabicText: 'مَا ذَلِكَ؟ ذَلِكَ حَجَرٌ',
        translation: 'Apa itu? Itu batu.',
        segments: [
          { id: 's2_8_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Apa.' },
          { id: 's2_8_2', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: 's2_8_3', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: 's2_8_4', text: 'حَجَرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Batu.' }
        ]
      },
      {
        id: 's2_9',
        arabicText: 'هَذَا سُكَّرٌ وَذَلِكَ لَبَنٌ',
        translation: 'Ini gula dan itu susu.',
        segments: [
          { id: 's2_9_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: 's2_9_2', text: 'سُكَّرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Gula.' },
          { id: 's2_9_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's2_9_4', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: 's2_9_5', text: 'لَبَنٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Susu.' }
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
      { arabic: 'قَرِيْبٌ', latin: 'Qoriibun', meaning: 'Dekat' },
      { arabic: 'بَعِيْدٌ', latin: 'Ba\'iidun', meaning: 'Jauh' },
      { arabic: 'ثَقِيْلٌ', latin: 'Thaqiilun', meaning: 'Berat' },
      { arabic: 'خَفِيْفٌ', latin: 'Khofiifun', meaning: 'Ringan' },
      { arabic: 'نَظِيْفٌ', latin: 'Nazhiifun', meaning: 'Bersih' },
      { arabic: 'حَارٌّ', latin: 'Haarrun', meaning: 'Panas' }
    ],
    sentences: [
      {
        id: 's3_1',
        arabicText: 'اَلْقَلَمُ مَكْسُوْرٌ',
        translation: 'Pena itu rusak.',
        segments: [
          { id: 's3_1_1', text: 'اَلْقَلَمُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Ma\'rifah (Ada Al).' },
          { id: 's3_1_2', text: 'مَكْسُوْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rusak.' }
        ]
      },
      {
        id: 's3_2',
        arabicText: 'اَلْبَابُ مَفْتُوْحٌ',
        translation: 'Pintu itu terbuka.',
        segments: [
          { id: 's3_2_1', text: 'اَلْبَابُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Pintu itu.' },
          { id: 's3_2_2', text: 'مَفْتُوْحٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Terbuka.' }
        ]
      },
      {
        id: 's3_3',
        arabicText: 'اَلْوَلَدُ جَالِسٌ وَالْمُدَرِّسُ وَاقِفٌ',
        translation: 'Anak itu duduk dan guru itu berdiri.',
        segments: [
          { id: 's3_3_1', text: 'اَلْوَلَدُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Anak itu.' },
          { id: 's3_3_2', text: 'جَالِسٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Duduk.' },
          { id: 's3_3_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's3_3_4', text: 'الْمُدَرِّسُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Guru itu.' },
          { id: 's3_3_5', text: 'وَاِقفٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Berdiri.' }
        ]
      },
      {
        id: 's3_4',
        arabicText: 'اَلْكِتَابُ جَدِيْدٌ وَالْقَلَمُ قَدِيْمٌ',
        translation: 'Buku itu baru dan pena itu lama.',
        segments: [
          { id: 's3_4_1', text: 'اَلْكِتَابُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Buku itu.' },
          { id: 's3_4_2', text: 'جَدِيْدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Baru.' },
          { id: 's3_4_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's3_4_4', text: 'الْقَلَمُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Pena itu.' },
          { id: 's3_4_5', text: 'قَدِيْمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Lama.' }
        ]
      },
      {
        id: 's3_5',
        arabicText: 'اَلْحِمَارُ صَغِيْرٌ وَالْحِصَانُ كَبِيْرٌ',
        translation: 'Keledai itu kecil dan kuda itu besar.',
        segments: [
          { id: 's3_5_1', text: 'اَلْحِمَارُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Keledai itu.' },
          { id: 's3_5_2', text: 'صَغِيْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kecil.' },
          { id: 's3_5_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's3_5_4', text: 'الْحِصَانُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Kuda itu.' },
          { id: 's3_5_5', text: 'كَبِيْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Besar.' }
        ]
      },
      {
        id: 's3_6',
        arabicText: 'اَلْكُرْسِيُّ مَكْسُوْرٌ',
        translation: 'Kursi itu rusak.',
        segments: [
          { id: 's3_6_1', text: 'اَلْكُرْسِيُّ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Kursi itu.' },
          { id: 's3_6_2', text: 'مَكْسُوْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rusak.' }
        ]
      },
      {
        id: 's3_7',
        arabicText: 'اَلْمِنْدِيْلُ وَسِخٌ',
        translation: 'Sapu tangan itu kotor.',
        segments: [
          { id: 's3_7_1', text: 'اَلْمِنْدِيْلُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Sapu tangan itu.' },
          { id: 's3_7_2', text: 'وَسِخٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kotor.' }
        ]
      },
      {
        id: 's3_8',
        arabicText: 'اَلْمَاءُ بَارِدٌ',
        translation: 'Air itu dingin.',
        segments: [
          { id: 's3_8_1', text: 'اَلْمَاءُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Air itu.' },
          { id: 's3_8_2', text: 'بَارِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Dingin.' }
        ]
      },
      {
        id: 's3_9',
        arabicText: 'اَلْقَمَرُ جَمِيْلٌ',
        translation: 'Bulan itu indah.',
        segments: [
          { id: 's3_9_1', text: 'اَلْقَمَرُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Bulan itu.' },
          { id: 's3_9_2', text: 'جَمِيْلٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Indah.' }
        ]
      },
      {
        id: 's3_10',
        arabicText: 'اَلْبَيْتُ قَرِيْبٌ وَالْمَسْجِدُ بَعِيْدٌ',
        translation: 'Rumah itu dekat dan masjid itu jauh.',
        segments: [
          { id: 's3_10_1', text: 'اَلْبَيْتُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Rumah itu.' },
          { id: 's3_10_2', text: 'قَرِيْبٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Dekat.' },
          { id: 's3_10_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's3_10_4', text: 'الْمَسْجِدُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Masjid itu.' },
          { id: 's3_10_5', text: 'بَعِيْدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Jauh.' }
        ]
      },
      {
        id: 's3_11',
        arabicText: 'اَلْحَجَرُ ثَقِيْلٌ وَالْوَرَقُ خَفِيْفٌ',
        translation: 'Batu itu berat dan kertas itu ringan.',
        segments: [
          { id: 's3_11_1', text: 'اَلْحَجَرُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Batu itu.' },
          { id: 's3_11_2', text: 'ثَقِيْلٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Berat.' },
          { id: 's3_11_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's3_11_4', text: 'الْوَرَقُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Kertas itu.' },
          { id: 's3_11_5', text: 'خَفِيْفٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Ringan.' }
        ]
      },
      {
        id: 's3_12',
        arabicText: 'اَللَّبَنُ حَارٌّ',
        translation: 'Susu itu panas.',
        segments: [
          { id: 's3_12_1', text: 'اَللَّبَنُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Susu itu.' },
          { id: 's3_12_2', text: 'حَارٌّ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Panas.' }
        ]
      },
      {
        id: 's3_13',
        arabicText: 'اَلْقَمِيْصُ نَظِيْفٌ',
        translation: 'Kemeja itu bersih.',
        segments: [
          { id: 's3_13_1', text: 'اَلْقَمِيْصُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Kemeja itu.' },
          { id: 's3_13_2', text: 'نَظِيْفٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Bersih.' }
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
      { arabic: 'اَلْمِرْحَاضُ', latin: 'Al-Mirhaadhu', meaning: 'Toilet' },
      { arabic: 'اَلْجَامِعَةُ', latin: 'Al-Jaami\'atu', meaning: 'Universitas' },
      { arabic: 'اَلسُّوْقُ', latin: 'As-Suuqu', meaning: 'Pasar' },
      { arabic: 'اَلْيَابَانُ', latin: 'Al-Yaabaanu', meaning: 'Jepang' },
      { arabic: 'اَلصِّيْنُ', latin: 'Ash-Shiinu', meaning: 'China' },
      { arabic: 'اَلْهِنْدُ', latin: 'Al-Hindu', meaning: 'India' },
      { arabic: 'اَلْفِلِبِّيْنُ', latin: 'Al-Filippiinu', meaning: 'Filipina' },
      { arabic: 'اَلْمُدِيْرُ', latin: 'Al-Mudiiru', meaning: 'Kepala Sekolah/Direktur' },
      { arabic: 'خَرَجَ', latin: 'Khoroja', meaning: 'Keluar (Dia Lk)' },
      { arabic: 'ذَهَبَ', latin: 'Zahaba', meaning: 'Pergi (Dia Lk)' },
    ],
    sentences: [
      {
        id: 's4_1',
        arabicText: 'مُحَمَّدٌ فِي الْغُرْفَةِ',
        translation: 'Muhammad ada di dalam kamar.',
        segments: [
          { id: 's4_1_1', text: 'مُحَمَّدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Nama orang (Alam) umumnya bertanwin "un". Subjek.', vowelEnding: 'un' },
          { id: 's4_1_2', text: 'فِي', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: '[OPERATOR] Huruf Jar ibarat MAGNET. Ia menarik harakat kata setelahnya ke bawah.' },
          { id: 's4_1_3', text: 'الْغُرْفَةِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: 's4_1_2', explanation: 'Majrur (Jatuh/Bawah). Harakat WAJIB "i" (Kasrah) karena ditarik oleh "Fi".', vowelEnding: 'i' }
        ]
      },
      {
        id: 's4_2',
        arabicText: 'وَ يَاسِرٌ فِي الْحَمَّامِ',
        translation: 'Dan Yasir ada di kamar mandi.',
        segments: [
          { id: 's4_2_1', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's4_2_2', text: 'يَاسِرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Nama orang, tanwin "un".' },
          { id: 's4_2_3', text: 'فِي', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Magnet penarik ke bawah.' },
          { id: 's4_2_4', text: 'الْحَمَّامِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: 's4_2_3', explanation: 'Berakhiran "i" karena ada "Fi" sebelumnya.', vowelEnding: 'i' }
        ]
      },
      {
        id: 's4_3',
        arabicText: 'أَيْنَ آمِنَةُ؟ هِيَ فِي الْمَطْبَخِ',
        translation: 'Di mana Aminah? Dia di dapur.',
        segments: [
          { id: 's4_3_1', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Isim Istifham', explanation: 'Kata tanya tempat (Di mana).' },
          { id: 's4_3_2', text: 'آمِنَةُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Nama wanita TIDAK BOLEH Tanwin. Jadi "u" saja (Aminatu), bukan "un".', vowelEnding: 'u' },
          { id: 's4_3_3', text: 'هِيَ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Dhomir', explanation: 'Dia (Perempuan). Menggantikan Aminah.' },
          { id: 's4_3_4', text: 'فِي', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Operator penyebab Kasrah.' },
          { id: 's4_3_5', text: 'الْمَطْبَخِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: 's4_3_4', explanation: 'Berakhiran "i" akibat "Fi".', vowelEnding: 'i' }
        ]
      },
      {
        id: 's4_4',
        arabicText: 'اَلْكِتَابُ عَلَى الْمَكْتَبِ',
        translation: 'Buku itu di atas meja.',
        segments: [
          { id: 's4_4_1', text: 'اَلْكِتَابُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Subjek Ma\'rifah (Al).', vowelEnding: 'u' },
          { id: 's4_4_2', text: 'عَلَى', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Di atas (menempel). Ini juga magnet penarik harakat.' },
          { id: 's4_4_3', text: 'الْمَكْتَبِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: 's4_4_2', explanation: 'Majrur bil Kasrah (i) karena "Ala".', vowelEnding: 'i' }
        ]
      },
      {
        id: 's4_5',
        arabicText: 'اَلسَّاعَةُ عَلَى السَّرِيْرِ',
        translation: 'Jam itu di atas ranjang.',
        segments: [
          { id: 's4_5_1', text: 'اَلسَّاعَةُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Subjek.' },
          { id: 's4_5_2', text: 'عَلَى', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Preposisi.' },
          { id: 's4_5_3', text: 'السَّرِيْرِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: 's4_5_2', explanation: 'Objek preposisi.' }
        ]
      },
      {
        id: 's4_6',
        arabicText: 'مِنْ أَيْنَ أَنْتَ؟ أَنَا مِنَ الْيَابَانِ',
        translation: 'Dari mana kamu? Saya dari Jepang.',
        segments: [
          { id: 's4_6_1', text: 'مِنْ', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Dari.' },
          { id: 's4_6_2', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Istifham', explanation: 'Mana.' },
          { id: 's4_6_3', text: 'أَنْتَ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Dhomir', explanation: 'Kamu (Lk).' },
          { id: 's4_6_4', text: 'أَنَا', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Dhomir', explanation: 'Saya.' },
          { id: 's4_6_5', text: 'مِنَ', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Dari (dibaca Mina).' },
          { id: 's4_6_6', text: 'الْيَابَانِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: 's4_6_5', explanation: 'Jepang (Majrur).' }
        ]
      },
      {
        id: 's4_7',
        arabicText: 'وَ مِنْ أَيْنَ عَمَّارٌ؟ هُوَ مِنَ الصِّيْنِ',
        translation: 'Dan dari mana Ammar? Dia dari China.',
        segments: [
          { id: 's4_7_1', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's4_7_2', text: 'مِنْ', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Dari.' },
          { id: 's4_7_3', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Istifham', explanation: 'Mana.' },
          { id: 's4_7_4', text: 'عَمَّارٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Ammar.' },
          { id: 's4_7_5', text: 'هُوَ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Dhomir', explanation: 'Dia (Lk).' },
          { id: 's4_7_6', text: 'مِنَ', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Dari.' },
          { id: 's4_7_7', text: 'الصِّيْنِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: 's4_7_6', explanation: 'China (Majrur).' }
        ]
      },
      {
        id: 's4_8',
        arabicText: 'وَ مِنْ أَيْنَ حَامِدٌ؟ هُوَ مِنَ الْهِنْدِ',
        translation: 'Dan dari mana Hamid? Dia dari India.',
        segments: [
          { id: 's4_8_1', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's4_8_2', text: 'مِنْ', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Dari.' },
          { id: 's4_8_3', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Istifham', explanation: 'Mana.' },
          { id: 's4_8_4', text: 'حَامِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Hamid.' },
          { id: 's4_8_5', text: 'هُوَ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Dhomir', explanation: 'Dia.' },
          { id: 's4_8_6', text: 'مِنَ', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Dari.' },
          { id: 's4_8_7', text: 'الْهِنْدِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: 's4_8_6', explanation: 'India.' }
        ]
      },
      {
        id: 's4_9',
        arabicText: 'أَيْنَ عَبَّاسٌ؟ خَرَجَ',
        translation: 'Di mana Abbas? Dia telah keluar.',
        segments: [
          { id: 's4_9_1', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Di mana.' },
          { id: 's4_9_2', text: 'عَبَّاسٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Abbas.' },
          { id: 's4_9_3', text: 'خَرَجَ', type: WordType.VERB, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Fi\'il Madhi', explanation: 'Kata Kerja Lampau (Dia telah keluar).' }
        ]
      },
      {
        id: 's4_10',
        arabicText: 'أَيْنَ ذَهَبَ؟ ذَهَبَ إِلَى الْمُدِيْرِ',
        translation: 'Ke mana dia pergi? Dia pergi ke kepala sekolah.',
        segments: [
          { id: 's4_10_1', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Ke mana (konteks).' },
          { id: 's4_10_2', text: 'ذَهَبَ', type: WordType.VERB, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Fi\'il', explanation: 'Pergi.' },
          { id: 's4_10_3', text: 'ذَهَبَ', type: WordType.VERB, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Fi\'il', explanation: 'Dia pergi.' },
          { id: 's4_10_4', text: 'إِلَى', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Ke (Operator).' },
          { id: 's4_10_5', text: 'الْمُدِيْرِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: 's4_10_4', explanation: 'Kepala Sekolah (Majrur).' }
        ]
      },
      {
        id: 's4_11',
        arabicText: 'وَ أَيْنَ ذَهَبَ عَلِيٌّ؟ ذَهَبَ إِلَى الْمِرْحَاضِ',
        translation: 'Dan ke mana Ali pergi? Dia pergi ke toilet.',
        segments: [
          { id: 's4_11_1', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: 's4_11_2', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Istifham', explanation: 'Mana.' },
          { id: 's4_11_3', text: 'ذَهَبَ', type: WordType.VERB, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Fi\'il', explanation: 'Pergi.' },
          { id: 's4_11_4', text: 'عَلِيٌّ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Fa\'il', explanation: 'Pelaku (Subjek Verb).' },
          { id: 's4_11_5', text: 'ذَهَبَ', type: WordType.VERB, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Fi\'il', explanation: 'Dia pergi.' },
          { id: 's4_11_6', text: 'إِلَى', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Ke.' },
          { id: 's4_11_7', text: 'الْمِرْحَاضِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: 's4_11_6', explanation: 'Toilet (Majrur).' }
        ]
      }
    ]
  }
];