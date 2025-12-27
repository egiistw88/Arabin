import { Lesson, LogicId, WordType } from '../types';

export const LESSON_DATA: Lesson[] = [
  {
    id: 'lesson_01',
    title: 'Pelajaran 1: Haza (Ini)',
    description: 'Dasar menunjuk benda jarak dekat (Isim Isyarah) dan pertanyaan (Istifham).',
    concepts: ['Isim Isyarah', 'Mubtada-Khobar', 'Ma (Apa) vs Man (Siapa)'],
    vocabulary: [
      { arabic: 'بَيْتٌ', latin: 'Baitun', meaning: 'Rumah' },
      { arabic: 'مَسْجِدٌ', latin: 'Masjidun', meaning: 'Masjid' },
      { arabic: 'بَابٌ', latin: 'Baabun', meaning: 'Pintu' },
      { arabic: 'كِتَابٌ', latin: 'Kitaabun', meaning: 'Buku' },
      { arabic: 'قَلَمٌ', latin: 'Qolamun', meaning: 'Pena' },
      { arabic: 'مِفْتَاحٌ', latin: 'Miftaahun', meaning: 'Kunci' },
      { arabic: 'مَكْتَبٌ', latin: 'Maktabun', meaning: 'Meja' },
      { arabic: 'سَرِيْرٌ', latin: 'Sariirun', meaning: 'Ranjang' },
      { arabic: 'كُرْسِيٌّ', latin: 'Kursiyyun', meaning: 'Kursi' },
      { arabic: 'طَبِيْبٌ', latin: 'Thobiibun', meaning: 'Dokter' },
      { arabic: 'وَلَدٌ', latin: 'Waladun', meaning: 'Anak Kecil' },
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
      { arabic: 'مِنْدِيْلٌ', latin: 'Mindiilun', meaning: 'Sapu Tangan' }
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
        arabicText: 'مَا هَذَا؟ هَذَا قَلَمٌ',
        translation: 'Apa ini? Ini pena.',
        segments: [
          { id: '1_2_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Kata tanya untuk benda mati.' },
          { id: '1_2_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_2_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_2_4', text: 'قَلَمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Pena.' }
        ]
      },
      {
        id: '1_3',
        arabicText: 'أَهَذَا بَيْتٌ؟ لَا، هَذَا مَسْجِدٌ',
        translation: 'Apakah ini rumah? Bukan, ini masjid.',
        segments: [
          { id: '1_3_1', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Hamzah', explanation: 'Apakah (Pertanyaan Ya/Tidak).' },
          { id: '1_3_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_3_3', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rumah.' },
          { id: '1_3_4', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Jawab', explanation: 'Bukan/Tidak.' },
          { id: '1_3_5', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_3_6', text: 'مَسْجِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Masjid.' }
        ]
      },
      {
        id: '1_4',
        arabicText: 'مَنْ هَذَا؟ هَذَا طَبِيْبٌ',
        translation: 'Siapa ini? Ini dokter.',
        segments: [
          { id: '1_4_1', text: 'مَنْ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Siapa (Untuk Berakal).' },
          { id: '1_4_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_4_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_4_4', text: 'طَبِيْبٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Dokter.' }
        ]
      },
      {
        id: '1_5',
        arabicText: 'أَهَذَا كَلْبٌ؟ لَا، هَذَا قِطٌّ',
        translation: 'Apakah ini anjing? Bukan, ini kucing.',
        segments: [
          { id: '1_5_1', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Hamzah', explanation: 'Apakah.' },
          { id: '1_5_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_5_3', text: 'كَلْبٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Anjing.' },
          { id: '1_5_4', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Jawab', explanation: 'Bukan.' },
          { id: '1_5_5', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_5_6', text: 'قِطٌّ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kucing.' }
        ]
      },
      {
        id: '1_6',
        arabicText: 'هَذَا دِيْكٌ كَبِيْرٌ',
        translation: 'Ini ayam jago besar.',
        segments: [
          { id: '1_6_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_6_2', text: 'دِيْكٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Ayam Jago.' },
          { id: '1_6_3', text: 'كَبِيْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Na\'at', explanation: 'Besar (Sifat).' }
        ]
      }
    ]
  },
  {
    id: 'lesson_02',
    title: 'Pelajaran 2: Zalika (Itu)',
    description: 'Menunjuk benda jarak jauh (Isim Isyarah Lil Ba\'id).',
    concepts: ['Zalika (Itu)', 'Wa (Dan)'],
    vocabulary: [
      { arabic: 'ذَلِكَ', latin: 'Zalika', meaning: 'Itu' },
      { arabic: 'إِمَامٌ', latin: 'Imamun', meaning: 'Pemimpin Sholat' },
      { arabic: 'حَجَرٌ', latin: 'Hajarun', meaning: 'Batu' },
      { arabic: 'سُكَّرٌ', latin: 'Sukkarun', meaning: 'Gula' },
      { arabic: 'لَبَنٌ', latin: 'Labanun', meaning: 'Susu' }
    ],
    sentences: [
      {
        id: '2_1',
        arabicText: 'مَا ذَلِكَ؟ ذَلِكَ نَجْمٌ',
        translation: 'Apa itu? Itu bintang.',
        segments: [
          { id: '2_1_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Apa.' },
          { id: '2_1_2', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu (Jauh).' },
          { id: '2_1_3', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_1_4', text: 'نَجْمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Bintang.' }
        ]
      },
      {
        id: '2_2',
        arabicText: 'هَذَا مَسْجِدٌ وَ ذَلِكَ بَيْتٌ',
        translation: 'Ini masjid dan itu rumah.',
        segments: [
          { id: '2_2_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '2_2_2', text: 'مَسْجِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Masjid.' },
          { id: '2_2_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: '2_2_4', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_2_5', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rumah.' }
        ]
      },
      {
        id: '2_3',
        arabicText: 'مَا ذَلِكَ؟ ذَلِكَ حَجَرٌ',
        translation: 'Apa itu? Itu batu.',
        segments: [
          { id: '2_3_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Apa.' },
          { id: '2_3_2', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_3_3', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_3_4', text: 'حَجَرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Batu.' }
        ]
      },
      {
        id: '2_4',
        arabicText: 'هَذَا سُكَّرٌ وَ ذَلِكَ لَبَنٌ',
        translation: 'Ini gula dan itu susu.',
        segments: [
          { id: '2_4_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '2_4_2', text: 'سُكَّرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Gula.' },
          { id: '2_4_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: '2_4_4', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_4_5', text: 'لَبَنٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Susu.' }
        ]
      }
    ]
  },
  {
    id: 'lesson_03',
    title: 'Pelajaran 3: Al (Ma\'rifah)',
    description: 'Perbedaan Nakirah (Umum) dan Ma\'rifah (Khusus) dengan Alif-Lam.',
    concepts: ['Al-Ma\'rifah', 'Nakirah', 'Mubtada Ma\'rifah', 'Khobar Nakirah'],
    vocabulary: [
      { arabic: 'مَكْسُوْرٌ', latin: 'Maksurun', meaning: 'Patah/Rusak' },
      { arabic: 'مَفْتُوْحٌ', latin: 'Maftuuhun', meaning: 'Terbuka' },
      { arabic: 'جَالِسٌ', latin: 'Jaalisun', meaning: 'Duduk' },
      { arabic: 'وَاِقفٌ', latin: 'Waaqifun', meaning: 'Berdiri' },
      { arabic: 'جَدِيْدٌ', latin: 'Jadiidun', meaning: 'Baru' },
      { arabic: 'قَدِيْمٌ', latin: 'Qodiimun', meaning: 'Lama' },
      { arabic: 'صَغِيْرٌ', latin: 'Shoghiirun', meaning: 'Kecil' },
      { arabic: 'كَبِيْرٌ', latin: 'Kabiirun', meaning: 'Besar' },
      { arabic: 'وَسِخٌ', latin: 'Wasikhun', meaning: 'Kotor' },
      { arabic: 'نَظِيْفٌ', latin: 'Nazhiifun', meaning: 'Bersih' },
      { arabic: 'بَارِدٌ', latin: 'Baaridun', meaning: 'Dingin' },
      { arabic: 'حَارٌّ', latin: 'Haarrun', meaning: 'Panas' }
    ],
    sentences: [
      {
        id: '3_1',
        arabicText: 'اَلْقَلَمُ مَكْسُوْرٌ',
        translation: 'Pena itu rusak.',
        segments: [
          { id: '3_1_1', text: 'اَلْقَلَمُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Ma\'rifah dengan Al. Akhiran \'u\' (Dommah).' },
          { id: '3_1_2', text: 'مَكْسُوْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Nakirah (Tanwin). Menjelaskan keadaan.' }
        ]
      },
      {
        id: '3_2',
        arabicText: 'اَلْبَابُ مَفْتُوْحٌ',
        translation: 'Pintu itu terbuka.',
        segments: [
          { id: '3_2_1', text: 'اَلْبَابُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Subjek spesifik.' },
          { id: '3_2_2', text: 'مَفْتُوْحٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Keterangan.' }
        ]
      },
      {
        id: '3_3',
        arabicText: 'اَلْوَلَدُ جَالِسٌ وَ الْمُدَرِّسُ وَاقِفٌ',
        translation: 'Anak itu duduk dan guru itu berdiri.',
        segments: [
          { id: '3_3_1', text: 'اَلْوَلَدُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Anak itu.' },
          { id: '3_3_2', text: 'جَالِسٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Duduk.' },
          { id: '3_3_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: '3_3_4', text: 'الْمُدَرِّسُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Guru itu.' },
          { id: '3_3_5', text: 'وَاِقفٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Berdiri.' }
        ]
      },
      {
        id: '3_4',
        arabicText: 'اَلْكِتَابُ جَدِيْدٌ وَ الْقَلَمُ قَدِيْمٌ',
        translation: 'Buku itu baru dan pena itu lama.',
        segments: [
          { id: '3_4_1', text: 'اَلْكِتَابُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Buku itu.' },
          { id: '3_4_2', text: 'جَدِيْدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Baru.' },
          { id: '3_4_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: '3_4_4', text: 'الْقَلَمُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Pena itu.' },
          { id: '3_4_5', text: 'قَدِيْمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Lama.' }
        ]
      },
      {
        id: '3_5',
        arabicText: 'اَلْمِنْدِيْلُ نَظِيْفٌ',
        translation: 'Sapu tangan itu bersih.',
        segments: [
          { id: '3_5_1', text: 'اَلْمِنْدِيْلُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Sapu tangan.' },
          { id: '3_5_2', text: 'نَظِيْفٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Bersih.' }
        ]
      }
    ]
  },
  {
    id: 'lesson_04',
    title: 'Pelajaran 4: Huruf Jar',
    description: 'Pengaruh Huruf Jar (Preposisi) yang memajrurkan (meng-kasrah-kan) isim.',
    concepts: ['Huruf Jar (Fi, Ala, Min, Ila)', 'Isim Majrur', 'Dhomir (Kata Ganti)'],
    vocabulary: [
      { arabic: 'فِي', latin: 'Fii', meaning: 'Di dalam' },
      { arabic: 'عَلَى', latin: 'Ala', meaning: 'Di atas' },
      { arabic: 'مِنْ', latin: 'Min', meaning: 'Dari' },
      { arabic: 'إِلَى', latin: 'Ila', meaning: 'Ke' },
      { arabic: 'اَلْغُرْفَةُ', latin: 'Al-Ghurfatu', meaning: 'Kamar' },
      { arabic: 'اَلْحَمَّامُ', latin: 'Al-Hammaamu', meaning: 'Kamar Mandi' },
      { arabic: 'اَلْمَطْبَخُ', latin: 'Al-Mathbakhu', meaning: 'Dapur' },
      { arabic: 'أَيْنَ', latin: 'Aina', meaning: 'Di mana' },
      { arabic: 'اَلسَّمَاءُ', latin: 'As-Samaa\'u', meaning: 'Langit' },
      { arabic: 'اَلْفَصْلُ', latin: 'Al-Fashlu', meaning: 'Kelas' },
      { arabic: 'اَلْمِرْحَاضُ', latin: 'Al-Mirhaadhu', meaning: 'Toilet' },
      { arabic: 'اَلْجَامِعَةُ', latin: 'Al-Jaami\'atu', meaning: 'Universitas' },
      { arabic: 'اَلْمُدِيْرُ', latin: 'Al-Mudiiru', meaning: 'Kepala Sekolah' }
    ],
    sentences: [
      {
        id: '4_1',
        arabicText: 'مُحَمَّدٌ فِي الْغُرْفَةِ',
        translation: 'Muhammad ada di dalam kamar.',
        segments: [
          { id: '4_1_1', text: 'مُحَمَّدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Nama orang (Subjek).' },
          { id: '4_1_2', text: 'فِي', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: '[OPERATOR] Menarik harakat ke bawah.' },
          { id: '4_1_3', text: 'الْغُرْفَةِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: '4_1_2', explanation: 'Majrur (Kasrah) karena FI.', vowelEnding: 'i' }
        ]
      },
      {
        id: '4_2',
        arabicText: 'وَ يَاسِرٌ فِي الْحَمَّامِ',
        translation: 'Dan Yasir ada di kamar mandi.',
        segments: [
          { id: '4_2_1', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: '4_2_2', text: 'يَاسِرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Yasir.' },
          { id: '4_2_3', text: 'فِي', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Di dalam.' },
          { id: '4_2_4', text: 'الْحَمَّامِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: '4_2_3', explanation: 'Kamar Mandi (Kasrah).', vowelEnding: 'i' }
        ]
      },
      {
        id: '4_3',
        arabicText: 'أَيْنَ آمِنَةُ؟ هِيَ فِي الْمَطْبَخِ',
        translation: 'Di mana Aminah? Dia di dapur.',
        segments: [
          { id: '4_3_1', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Di mana.' },
          { id: '4_3_2', text: 'آمِنَةُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Aminah (Tanpa Tanwin).' },
          { id: '4_3_3', text: 'هِيَ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Dhomir', explanation: 'Dia (Pr).' },
          { id: '4_3_4', text: 'فِي', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Di dalam.' },
          { id: '4_3_5', text: 'الْمَطْبَخِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: '4_3_4', explanation: 'Dapur (Kasrah).', vowelEnding: 'i' }
        ]
      },
      {
        id: '4_4',
        arabicText: 'اَلْكِتَابُ عَلَى الْمَكْتَبِ',
        translation: 'Buku itu di atas meja.',
        segments: [
          { id: '4_4_1', text: 'اَلْكِتَابُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Buku itu.' },
          { id: '4_4_2', text: 'عَلَى', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Di atas.' },
          { id: '4_4_3', text: 'الْمَكْتَبِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: '4_4_2', explanation: 'Meja (Kasrah).', vowelEnding: 'i' }
        ]
      },
      {
        id: '4_5',
        arabicText: 'مِنْ أَيْنَ أَنْتَ؟ أَنَا مِنَ الْيَابَانِ',
        translation: 'Dari mana kamu? Saya dari Jepang.',
        segments: [
          { id: '4_5_1', text: 'مِنْ', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Dari.' },
          { id: '4_5_2', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Istifham', explanation: 'Mana.' },
          { id: '4_5_3', text: 'أَنْتَ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Dhomir', explanation: 'Kamu (Lk).' },
          { id: '4_5_4', text: 'أَنَا', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Dhomir', explanation: 'Saya.' },
          { id: '4_5_5', text: 'مِنَ', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Dari.' },
          { id: '4_5_6', text: 'الْيَابَانِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: '4_5_5', explanation: 'Jepang (Kasrah).', vowelEnding: 'i' }
        ]
      },
      {
        id: '4_6',
        arabicText: 'ذَهَبَ خَالِدٌ إِلَى الْمَدْرَسَةِ',
        translation: 'Khalid pergi ke sekolah.',
        segments: [
          { id: '4_6_1', text: 'ذَهَبَ', type: WordType.VERB, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Fi\'il', explanation: 'Telah pergi.' },
          { id: '4_6_2', text: 'خَالِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Fa\'il', explanation: 'Khalid (Pelaku).' },
          { id: '4_6_3', text: 'إِلَى', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Harf Jar', explanation: 'Ke.' },
          { id: '4_6_4', text: 'الْمَدْرَسَةِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: '4_6_3', explanation: 'Sekolah (Kasrah).', vowelEnding: 'i' }
        ]
      }
    ]
  }
];