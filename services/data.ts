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
      { arabic: 'طَبِيْبٌ', latin: 'Thobiibun', meaning: 'Dokter' },
      { arabic: 'وَلَدٌ', latin: 'Waladun', meaning: 'Anak Laki-laki' },
    ],
    sentences: [
      {
        id: 's1_1',
        arabicText: 'هَذَا بَيْتٌ',
        translation: 'Ini adalah rumah.',
        audioSrc: 'https://files.catbox.moe/placeholder_audio.mp3', 
        segments: [
          {
            id: 'seg_1_1_1',
            text: 'هَذَا',
            type: WordType.NOUN,
            logicId: LogicId.DEMONSTRATIVE,
            grammaticalRole: 'Mubtada (Subjek)',
            explanation: 'Kata Tunjuk (Isim Isyarah) untuk jarak dekat. Berfungsi sebagai Subjek.',
            vowelEnding: 'a'
          },
          {
            id: 'seg_1_1_2',
            text: 'بَيْتٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar (Predikat)',
            explanation: 'Predikat yang menjelaskan "Haza". Akhiran "un" (Tanwin) menandakan benda ini masih umum (sebuah rumah, bukan rumah itu).',
            vowelEnding: 'un'
          }
        ]
      },
      {
        id: 's1_2',
        arabicText: 'مَا هَذَا؟ هَذَا قَلَمٌ',
        translation: 'Apa ini? Ini pena.',
        segments: [
          {
            id: 'seg_1_2_1',
            text: 'مَا',
            type: WordType.PARTICLE,
            logicId: LogicId.QUESTION_TOOL,
            grammaticalRole: 'Isim Istifham',
            explanation: 'Kata Tanya untuk benda mati (Ghayru Aqil).',
          },
          {
            id: 'seg_1_2_2',
            text: 'هَذَا',
            type: WordType.NOUN,
            logicId: LogicId.DEMONSTRATIVE,
            grammaticalRole: 'Mubtada',
            explanation: 'Objek yang ditanya (Ini).',
          },
          {
            id: 'seg_1_2_3',
            text: 'هَذَا',
            type: WordType.NOUN,
            logicId: LogicId.DEMONSTRATIVE,
            grammaticalRole: 'Mubtada',
            explanation: 'Jawaban dimulai dengan Subjek yang sama.',
          },
          {
            id: 'seg_1_2_4',
            text: 'قَلَمٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar',
            explanation: 'Predikat. Tanwin "un" wajib ada karena tidak ada "Al".',
            vowelEnding: 'un'
          }
        ]
      },
      {
        id: 's1_3',
        arabicText: 'أَهَذَا بَيْتٌ؟ لَا، هَذَا مَسْجِدٌ',
        translation: 'Apakah ini rumah? Bukan, ini masjid.',
        segments: [
          {
            id: 'seg_1_3_1',
            text: 'أَ',
            type: WordType.PARTICLE,
            logicId: LogicId.QUESTION_TOOL,
            grammaticalRole: 'Hamzah Istifham',
            explanation: 'Huruf tanya "A" (Apakah) untuk jawaban Ya/Tidak.',
          },
          {
            id: 'seg_1_3_2',
            text: 'هَذَا',
            type: WordType.NOUN,
            logicId: LogicId.DEMONSTRATIVE,
            grammaticalRole: 'Mubtada',
            explanation: 'Kata tunjuk.',
          },
          {
            id: 'seg_1_3_3',
            text: 'بَيْتٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar',
            explanation: 'Predikat yang ditanyakan.',
            vowelEnding: 'un'
          },
          {
            id: 'seg_1_3_4',
            text: 'لَا',
            type: WordType.PARTICLE,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Jawab',
            explanation: 'Partikel penafian (Bukan/Tidak).',
          },
          {
            id: 'seg_1_3_5',
            text: 'مَسْجِدٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar',
            explanation: 'Kabar yang sebenarnya.',
            vowelEnding: 'un'
          }
        ]
      },
      {
        id: 's1_4',
        arabicText: 'مَنْ هَذَا؟ هَذَا طَبِيْبٌ',
        translation: 'Siapa ini? Ini dokter.',
        segments: [
          {
            id: 'seg_1_4_1',
            text: 'مَنْ',
            type: WordType.PARTICLE,
            logicId: LogicId.QUESTION_TOOL,
            grammaticalRole: 'Isim Istifham',
            explanation: 'Kata Tanya khusus untuk Manusia/Berakal (Siapa).',
          },
          {
            id: 'seg_1_4_2',
            text: 'هَذَا',
            type: WordType.NOUN,
            logicId: LogicId.DEMONSTRATIVE,
            grammaticalRole: 'Mubtada',
            explanation: 'Menunjuk pada orang.',
          },
          {
            id: 'seg_1_4_3',
            text: 'طَبِيْبٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar',
            explanation: 'Profesi (Dokter) sebagai predikat.',
            vowelEnding: 'un'
          }
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
      { arabic: 'نَجْمٌ', latin: 'Najmun', meaning: 'Bintang' },
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
          {
            id: 'seg_2_1_1',
            text: 'مَا',
            type: WordType.PARTICLE,
            logicId: LogicId.QUESTION_TOOL,
            grammaticalRole: 'Isim Istifham',
            explanation: 'Kata tanya benda.',
          },
          {
            id: 'seg_2_1_2',
            text: 'ذَلِكَ',
            type: WordType.NOUN,
            logicId: LogicId.DEMONSTRATIVE,
            grammaticalRole: 'Mubtada',
            explanation: 'Kata tunjuk JAUH (Itu).',
            vowelEnding: 'a'
          },
          {
            id: 'seg_2_1_3',
            text: 'نَجْمٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar',
            explanation: 'Bintang itu jauh, maka pakai Zalika.',
            vowelEnding: 'un'
          }
        ]
      },
      {
        id: 's2_2',
        arabicText: 'هَذَا سُكَّرٌ وَذَلِكَ لَبَنٌ',
        translation: 'Ini gula dan itu susu.',
        segments: [
          {
            id: 'seg_2_2_1',
            text: 'هَذَا',
            type: WordType.NOUN,
            logicId: LogicId.DEMONSTRATIVE,
            grammaticalRole: 'Mubtada 1',
            explanation: 'Ini (dekat).',
          },
          {
            id: 'seg_2_2_2',
            text: 'سُكَّرٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar 1',
            explanation: 'Predikat pertama.',
            vowelEnding: 'un'
          },
          {
            id: 'seg_2_2_3',
            text: 'وَ',
            type: WordType.PARTICLE,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Harf Athof',
            explanation: 'Kata sambung "Dan".',
          },
          {
            id: 'seg_2_2_4',
            text: 'ذَلِكَ',
            type: WordType.NOUN,
            logicId: LogicId.DEMONSTRATIVE,
            grammaticalRole: 'Mubtada 2',
            explanation: 'Itu (jauh).',
          },
          {
            id: 'seg_2_2_5',
            text: 'لَبَنٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar 2',
            explanation: 'Predikat kedua.',
            vowelEnding: 'un'
          }
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
    ],
    sentences: [
      {
        id: 's3_1',
        arabicText: 'اَلْقَلَمُ مَكْسُوْرٌ',
        translation: 'Pena itu rusak.',
        segments: [
          {
            id: 'seg_3_1_1',
            text: 'اَلْقَلَمُ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Mubtada (Ma\'rifah)',
            explanation: 'Perhatikan awalan "Al". Karena ada "Al", akhiran Tanwin (un) HILANG menjadi Dommah (u) saja. Ini benda spesifik.',
            vowelEnding: 'u'
          },
          {
            id: 'seg_3_1_2',
            text: 'مَكْسُوْرٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar (Nakirah)',
            explanation: 'Sifat/Kabar tidak memakai "Al". Wajib Tanwin (un).',
            vowelEnding: 'un'
          }
        ]
      },
      {
        id: 's3_2',
        arabicText: 'اَلْبَابُ مَفْتُوْحٌ',
        translation: 'Pintu itu terbuka.',
        segments: [
          {
            id: 'seg_3_2_1',
            text: 'اَلْبَابُ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Mubtada',
            explanation: 'Subjek spesifik (Ma\'rifah). Harakat akhir "u".',
            vowelEnding: 'u'
          },
          {
            id: 'seg_3_2_2',
            text: 'مَفْتُوْحٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar',
            explanation: 'Kondisi pintu tersebut.',
            vowelEnding: 'un'
          }
        ]
      },
      {
        id: 's3_3',
        arabicText: 'اَلْوَلَدُ جَالِسٌ وَالْمُدَرِّسُ وَاقِفٌ',
        translation: 'Anak itu duduk dan guru itu berdiri.',
        segments: [
          {
            id: 'seg_3_3_1',
            text: 'اَلْوَلَدُ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Mubtada',
            explanation: 'Subjek 1. Ada "Al" -> Tidak boleh Tanwin.',
            vowelEnding: 'u'
          },
          {
            id: 'seg_3_3_2',
            text: 'جَالِسٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar',
            explanation: 'Kabar 1.',
            vowelEnding: 'un'
          },
          {
            id: 'seg_3_3_3',
            text: 'وَ',
            type: WordType.PARTICLE,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Athof',
            explanation: 'Dan.',
          },
          {
            id: 'seg_3_3_4',
            text: 'الْمُدَرِّسُ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Mubtada',
            explanation: 'Subjek 2.',
            vowelEnding: 'u'
          },
          {
            id: 'seg_3_3_5',
            text: 'وَاِقفٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Khobar',
            explanation: 'Kabar 2.',
            vowelEnding: 'un'
          }
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
    ],
    sentences: [
      {
        id: 's4_1',
        arabicText: 'مُحَمَّدٌ فِي الْغُرْفَةِ',
        translation: 'Muhammad ada di dalam kamar.',
        segments: [
          {
            id: 'seg_4_1_1',
            text: 'مُحَمَّدٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Mubtada',
            explanation: 'Nama orang (Alam) umumnya bertanwin "un". Subjek.',
            vowelEnding: 'un'
          },
          {
            id: 'seg_4_1_2',
            text: 'فِي',
            type: WordType.OPERATOR,
            logicId: LogicId.PREPOSITION_TRIGGER,
            grammaticalRole: 'Harf Jar',
            explanation: '[OPERATOR] Huruf Jar ibarat MAGNET. Ia menarik harakat kata setelahnya ke bawah.',
          },
          {
            id: 'seg_4_1_3',
            text: 'الْغُرْفَةِ',
            type: WordType.NOUN,
            logicId: LogicId.AFTER_PREPOSITION,
            grammaticalRole: 'Isim Majrur',
            relatedToId: 'seg_4_1_2',
            explanation: 'Majrur (Jatuh/Bawah). Harakat WAJIB "i" (Kasrah) karena ditarik oleh "Fi".',
            vowelEnding: 'i'
          }
        ]
      },
      {
        id: 's4_2',
        arabicText: 'وَ يَاسِرٌ فِي الْحَمَّامِ',
        translation: 'Dan Yasir ada di kamar mandi.',
        segments: [
          {
            id: 'seg_4_2_1',
            text: 'وَ',
            type: WordType.PARTICLE,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Athof',
            explanation: 'Dan.',
          },
          {
            id: 'seg_4_2_2',
            text: 'يَاسِرٌ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Mubtada',
            explanation: 'Nama orang, tanwin "un".',
            vowelEnding: 'un'
          },
          {
            id: 'seg_4_2_3',
            text: 'فِي',
            type: WordType.OPERATOR,
            logicId: LogicId.PREPOSITION_TRIGGER,
            grammaticalRole: 'Harf Jar',
            explanation: 'Magnet penarik ke bawah.',
          },
          {
            id: 'seg_4_2_4',
            text: 'الْحَمَّامِ',
            type: WordType.NOUN,
            logicId: LogicId.AFTER_PREPOSITION,
            grammaticalRole: 'Isim Majrur',
            relatedToId: 'seg_4_2_3',
            explanation: 'Berakhiran "i" karena ada "Fi" sebelumnya.',
            vowelEnding: 'i'
          }
        ]
      },
      {
        id: 's4_3',
        arabicText: 'أَيْنَ آمِنَةُ؟ هِيَ فِي الْمَطْبَخِ',
        translation: 'Di mana Aminah? Dia di dapur.',
        segments: [
          {
            id: 'seg_4_3_1',
            text: 'أَيْنَ',
            type: WordType.PARTICLE,
            logicId: LogicId.QUESTION_TOOL,
            grammaticalRole: 'Isim Istifham',
            explanation: 'Kata tanya tempat (Di mana).',
          },
          {
            id: 'seg_4_3_2',
            text: 'آمِنَةُ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Mubtada',
            explanation: 'Nama wanita TIDAK BOLEH Tanwin. Jadi "u" saja (Aminatu), bukan "un".',
            vowelEnding: 'u'
          },
          {
            id: 'seg_4_3_3',
            text: 'هِيَ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Dhomir (Kata Ganti)',
            explanation: 'Dia (Perempuan). Menggantikan Aminah.',
          },
          {
            id: 'seg_4_3_4',
            text: 'فِي',
            type: WordType.OPERATOR,
            logicId: LogicId.PREPOSITION_TRIGGER,
            grammaticalRole: 'Harf Jar',
            explanation: 'Operator penyebab Kasrah.',
          },
          {
            id: 'seg_4_3_5',
            text: 'الْمَطْبَخِ',
            type: WordType.NOUN,
            logicId: LogicId.AFTER_PREPOSITION,
            grammaticalRole: 'Isim Majrur',
            relatedToId: 'seg_4_3_4',
            explanation: 'Berakhiran "i" akibat "Fi".',
            vowelEnding: 'i'
          }
        ]
      },
      {
        id: 's4_4',
        arabicText: 'اَلْكِتَابُ عَلَى الْمَكْتَبِ',
        translation: 'Buku itu di atas meja.',
        segments: [
          {
            id: 'seg_4_4_1',
            text: 'اَلْكِتَابُ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Mubtada',
            explanation: 'Subjek Ma\'rifah (Al).',
            vowelEnding: 'u'
          },
          {
            id: 'seg_4_4_2',
            text: 'عَلَى',
            type: WordType.OPERATOR,
            logicId: LogicId.PREPOSITION_TRIGGER,
            grammaticalRole: 'Harf Jar',
            explanation: 'Di atas (menempel). Ini juga magnet penarik harakat.',
          },
          {
            id: 'seg_4_4_3',
            text: 'الْمَكْتَبِ',
            type: WordType.NOUN,
            logicId: LogicId.AFTER_PREPOSITION,
            grammaticalRole: 'Isim Majrur',
            relatedToId: 'seg_4_4_2',
            explanation: 'Majrur bil Kasrah (i) karena "Ala".',
            vowelEnding: 'i'
          }
        ]
      },
      {
        id: 's4_5',
        arabicText: 'مِنْ أَيْنَ أَنْتَ؟ أَنَا مِنَ الْيَابَانِ',
        translation: 'Dari mana kamu? Saya dari Jepang.',
        segments: [
          {
            id: 'seg_4_5_1',
            text: 'مِنْ',
            type: WordType.OPERATOR,
            logicId: LogicId.PREPOSITION_TRIGGER,
            grammaticalRole: 'Harf Jar',
            explanation: 'Dari.',
          },
          {
            id: 'seg_4_5_2',
            text: 'أَيْنَ',
            type: WordType.PARTICLE,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Isim Istifham',
            explanation: 'Mana. (Isim mabni/tetap, tidak berubah harakat meski ada Min).',
          },
          {
            id: 'seg_4_5_3',
            text: 'أَنْتَ',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Dhomir',
            explanation: 'Kamu (Laki-laki).',
          },
          {
            id: 'seg_4_5_4',
            text: 'أَنَا',
            type: WordType.NOUN,
            logicId: LogicId.DEFAULT_NOUN,
            grammaticalRole: 'Dhomir',
            explanation: 'Saya.',
          },
          {
            id: 'seg_4_5_5',
            text: 'مِنَ',
            type: WordType.OPERATOR,
            logicId: LogicId.PREPOSITION_TRIGGER,
            grammaticalRole: 'Harf Jar',
            explanation: 'Dari. (Dibaca Mina untuk menghindari dua sukun bertemu).',
          },
          {
            id: 'seg_4_5_6',
            text: 'الْيَابَانِ',
            type: WordType.NOUN,
            logicId: LogicId.AFTER_PREPOSITION,
            grammaticalRole: 'Isim Majrur',
            relatedToId: 'seg_4_5_5',
            explanation: 'Negara Jepang. Majrur dengan Kasrah "i" karena "Min".',
            vowelEnding: 'i'
          }
        ]
      }
    ]
  }
];