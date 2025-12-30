
import { Lesson, LogicId, WordType } from '../types';

export const LESSON_DATA: Lesson[] = [
  {
    id: 'lesson_01',
    title: 'Bab 1: Pondasi & Pertanyaan',
    description: 'Mengenal struktur dasar kalimat, kata tunjuk, dan cara bertanya (Apa, Siapa, Apakah).',
    concepts: ['Haza (Ini)', 'Ma vs Man', 'Hamzah Istifham (Apakah)'],
    introConcepts: [
      {
        title: "Konsep 1: Jembatan Ghaib",
        description: "Dalam Bahasa Arab, kita tidak menulis kata 'adalah'. Cukup sandingkan [Penunjuk] + [Benda], otomatis menjadi kalimat sempurna.",
        visualRule: {
          before: "Haza Baitun",
          after: "Ini [adalah] Rumah",
          explanation: "Hemat kata, padat makna."
        }
      },
      {
        title: "Konsep 2: Logika Bertanya",
        description: "Ada 3 kunci bertanya dasar: 'MA' untuk benda mati, 'MAN' untuk makhluk berakal, dan 'A' (Hamzah) untuk konfirmasi Ya/Tidak.",
        visualRule: {
          before: "Ma Haza? / Man Haza?",
          after: "Benda / Manusia",
          explanation: "Jangan tertukar! Manusia itu mulia, pakai MAN."
        }
      }
    ],
    summary: {
      title: "Khulashah: Tiga Pilar Bab 1",
      keyPoints: [
        "Rumus Dasar: Haza + Isim (Un).",
        "MA = Apa (Untuk benda mati/hewan).",
        "MAN = Siapa (Untuk manusia/malaikat/Allah).",
        "A...? = Apakah...? Jawabannya wajib LA (Tidak) atau NA'AM (Ya)."
      ],
      teacherTip: "Perhatikan nada bicaramu. Saat membaca 'A-Haza...?', naikkan intonasi di akhir seperti bertanya."
    },
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
      { arabic: 'طَالِبٌ', latin: 'Thoolibun', meaning: 'Mahasiswa/Pelajar' },
      { arabic: 'رَجُلٌ', latin: 'Rojulun', meaning: 'Pria Dewasa' },
      { arabic: 'تَاجِرٌ', latin: 'Taajirun', meaning: 'Pedagang' },
      { arabic: 'كَلْبٌ', latin: 'Kalbun', meaning: 'Anjing' },
      { arabic: 'قِطٌّ', latin: 'Qitthu', meaning: 'Kucing' },
      { arabic: 'حِمَارٌ', latin: 'Himarun', meaning: 'Keledai' },
    ],
    sentences: [
      // STEP 1: Basic Recognition
      {
        id: '1_1',
        arabicText: 'هَذَا بَيْتٌ',
        translation: 'Ini adalah rumah.',
        tutorGuidance: "Mulai dengan yang sederhana. 'Haza' (Mubtada) menunjuk, 'Baitun' (Khobar) menjelaskan. Perhatikan bunyi 'un' di akhir.",
        segments: [
          { id: '1_1_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Kata Tunjuk (Ini).', deepLogic: 'Mabni (Kebal Perubahan).' },
          { id: '1_1_2', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rumah.', deepLogic: 'Nakirah (Umum) ditandai dengan Tanwin.' }
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
      // STEP 2: Asking "What"
      {
        id: '1_3',
        arabicText: 'مَا هَذَا؟ هَذَا قَلَمٌ',
        translation: 'Apa ini? Ini pena.',
        tutorGuidance: "Sekarang kita bertanya. Gunakan 'MA' karena pena adalah benda mati (Ghoiru Aqil).",
        segments: [
          { id: '1_3_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Apa (Untuk benda).' },
          { id: '1_3_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_3_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_3_4', text: 'قَلَمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Pena.' }
        ]
      },
      // STEP 3: Yes/No Questions (The Hamzah)
      {
        id: '1_4',
        arabicText: 'أَهَذَا بَيْتٌ؟ نَعَمْ، هَذَا بَيْتٌ',
        translation: 'Apakah ini rumah? Ya, ini rumah.',
        tutorGuidance: "Lihat huruf Alif kecil (Hamzah) di depan Haza? Itu adalah 'Apakah'. Jika benar, jawab 'Na'am'.",
        segments: [
          { id: '1_4_1', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_HAMZAH, grammaticalRole: 'Hamzah Istifham', explanation: 'Apakah?', deepLogic: 'Huruf tanya untuk konfirmasi.' },
          { id: '1_4_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_4_3', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rumah.' },
          { id: '1_4_4', text: 'نَعَمْ', type: WordType.PARTICLE, logicId: LogicId.ANSWER_PARTICLE, grammaticalRole: 'Jawab', explanation: 'Ya.' },
          { id: '1_4_5', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_4_6', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rumah.' }
        ]
      },
      // STEP 4: Negation (No)
      {
        id: '1_5',
        arabicText: 'أَهَذَا سَرِيْرٌ؟ لَا، هَذَا كُرْسِيٌّ',
        translation: 'Apakah ini ranjang? Tidak, ini kursi.',
        tutorGuidance: "Jika salah, gunakan 'LA' (Tidak), lalu sebutkan benda yang sebenarnya.",
        segments: [
          { id: '1_5_1', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_HAMZAH, grammaticalRole: 'Istifham', explanation: 'Apakah?' },
          { id: '1_5_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_5_3', text: 'سَرِيْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Ranjang.' },
          { id: '1_5_4', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.ANSWER_PARTICLE, grammaticalRole: 'Jawab', explanation: 'Tidak (Nafi).' },
          { id: '1_5_5', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_5_6', text: 'كُرْسِيٌّ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kursi.' }
        ]
      },
      // STEP 5: Humans (Man)
      {
        id: '1_6',
        arabicText: 'مَنْ هَذَا؟ هَذَا طَبِيْبٌ',
        translation: 'Siapa ini? Ini seorang dokter.',
        tutorGuidance: "Dokter itu manusia (berakal). Jadi JANGAN pakai 'Ma', tapi pakailah 'MAN'.",
        segments: [
          { id: '1_6_1', text: 'مَنْ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Siapa (Berakal).' },
          { id: '1_6_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_6_3', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_6_4', text: 'طَبِيْبٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Dokter.' }
        ]
      },
      // STEP 6: Contrast (Man vs Ma)
      {
        id: '1_7',
        arabicText: 'هَذَا وَلَدٌ وَ هَذَا حِمَارٌ',
        translation: 'Ini seorang anak dan ini seekor keledai.',
        tutorGuidance: "Latihan membedakan. Walad (Anak) itu Manusia. Himar (Keledai) itu Hewan. Perhatikan konteksnya.",
        segments: [
          { id: '1_7_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_7_2', text: 'وَلَدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Anak.' },
          { id: '1_7_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: '1_7_4', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '1_7_5', text: 'حِمَارٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Keledai.' }
        ]
      }
    ]
  },
  {
    id: 'lesson_02',
    title: 'Bab 2: Jarak & Koneksi',
    description: 'Menunjuk benda jauh (Itu) dan menggabungkan kalimat dengan kata sambung.',
    concepts: ['Zalika (Itu)', 'Wawu Athof (Dan)'],
    introConcepts: [
      {
        title: "Konsep 1: Jarak Jauh",
        description: "Jika Haza untuk yang dekat (Touch), maka ZALIKA untuk yang jauh (Point). Gramatikanya sama persis, hanya beda rasa jarak.",
        visualRule: {
          before: "Haza (👇)",
          after: "Zalika (👉)",
          explanation: "Zalika juga Mabni (Kebal), akhiran 'ka' tidak berubah."
        }
      },
      {
        title: "Konsep 2: Kekuatan 'Dan'",
        description: "Huruf 'Wa' (Dan) adalah lem super. Dia menjadikan kata setelahnya punya status hukum yang sama dengan kata sebelumnya.",
        visualRule: {
          before: "Kalimat A. Kalimat B.",
          after: "Kalimat A + WA + Kalimat B",
          explanation: "Menyambung dua ide menjadi satu napas."
        }
      }
    ],
    vocabulary: [
      { arabic: 'ذَلِكَ', latin: 'Zalika', meaning: 'Itu' },
      { arabic: 'إِمَامٌ', latin: 'Imamun', meaning: 'Imam/Pemimpin' },
      { arabic: 'حَجَرٌ', latin: 'Hajarun', meaning: 'Batu' },
      { arabic: 'سُكَّرٌ', latin: 'Sukkarun', meaning: 'Gula' },
      { arabic: 'لَبَنٌ', latin: 'Labanun', meaning: 'Susu' },
    ],
    summary: {
      title: "Khulashah: Bab 2",
      keyPoints: [
        "Zalika = Itu (Laki-laki Jauh).",
        "Wa = Dan (Partikel Penyambung).",
        "Pola kalimatnya masih sama: Mubtada + Khobar."
      ],
      teacherTip: "Jangan bingung. Haza dan Zalika fungsinya sama. Yang satu 'Here', yang satu 'There'."
    },
    sentences: [
      {
        id: '2_1',
        arabicText: 'مَا ذَلِكَ؟ ذَلِكَ نَجْمٌ',
        translation: 'Apa itu? Itu bintang.',
        tutorGuidance: "Bintang itu jauh di langit, maka kita wajib pakai ZALIKA, bukan Haza.",
        segments: [
          { id: '2_1_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Apa.' },
          { id: '2_1_2', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu (Jauh).', deepLogic: 'Mabni Fathah.' },
          { id: '2_1_3', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_1_4', text: 'نَجْمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Bintang.' }
        ]
      },
      {
        id: '2_2',
        arabicText: 'هَذَا مَسْجِدٌ وَ ذَلِكَ بَيْتٌ',
        translation: 'Ini masjid dan itu rumah.',
        tutorGuidance: "Kita gabungkan Haza dan Zalika dengan 'Wa'. Perhatikan alurnya: Dekat... DAN... Jauh.",
        segments: [
          { id: '2_2_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '2_2_2', text: 'مَسْجِدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Masjid.' },
          { id: '2_2_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Huruf Athof', explanation: 'Dan (Penyambung).', deepLogic: 'Menyetarakan kedudukan kalimat.' },
          { id: '2_2_4', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_2_5', text: 'بَيْتٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Rumah.' }
        ]
      },
      {
        id: '2_3',
        arabicText: 'هَذَا حِصَانٌ وَ ذَلِكَ حِمَارٌ',
        translation: 'Ini kuda dan itu keledai.',
        segments: [
          { id: '2_3_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
          { id: '2_3_2', text: 'حِصَانٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kuda.' },
          { id: '2_3_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: '2_3_4', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_3_5', text: 'حِمَارٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Keledai.' }
        ]
      },
      {
        id: '2_4',
        arabicText: 'أَذَلِكَ كَلْبٌ؟ لَا، ذَلِكَ قِطٌّ',
        translation: 'Apakah itu anjing? Tidak, itu kucing.',
        tutorGuidance: "Mengulang pelajaran 'Ya/Tidak' tapi dengan jarak jauh.",
        segments: [
          { id: '2_4_1', text: 'أَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_HAMZAH, grammaticalRole: 'Istifham', explanation: 'Apakah?' },
          { id: '2_4_2', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_4_3', text: 'كَلْبٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Anjing.' },
          { id: '2_4_4', text: 'لَا', type: WordType.PARTICLE, logicId: LogicId.ANSWER_PARTICLE, grammaticalRole: 'Jawab', explanation: 'Tidak.' },
          { id: '2_4_5', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
          { id: '2_4_6', text: 'قِطٌّ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kucing.' }
        ]
      },
      {
        id: '2_5',
        arabicText: 'مَا ذَلِكَ؟ ذَلِكَ سَرِيْرٌ',
        translation: 'Apa itu? Itu ranjang.',
        segments: [
           { id: '2_5_1', text: 'مَا', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Apa.' },
           { id: '2_5_2', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
           { id: '2_5_3', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
           { id: '2_5_4', text: 'سَرِيْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Ranjang.' }
        ]
      },
      {
        id: '2_6',
        arabicText: 'مَنْ هَذَا وَ مَنْ ذَلِكَ؟',
        translation: 'Siapa ini dan siapa itu?',
        tutorGuidance: "Pertanyaan ganda! Menggabungkan Man, Haza, Wa, dan Zalika.",
        segments: [
            { id: '2_6_1', text: 'مَنْ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Siapa.' },
            { id: '2_6_2', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
            { id: '2_6_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
            { id: '2_6_4', text: 'مَنْ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Siapa.' },
            { id: '2_6_5', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
        ]
      },
      {
        id: '2_7',
        arabicText: 'هَذَا مُدَرِّسٌ وَ ذَلِكَ إِمَامٌ',
        translation: 'Ini guru dan itu imam.',
        segments: [
            { id: '2_7_1', text: 'هَذَا', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Ini.' },
            { id: '2_7_2', text: 'مُدَرِّسٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Guru.' },
            { id: '2_7_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
            { id: '2_7_4', text: 'ذَلِكَ', type: WordType.NOUN, logicId: LogicId.DEMONSTRATIVE, grammaticalRole: 'Mubtada', explanation: 'Itu.' },
            { id: '2_7_5', text: 'إِمَامٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Imam.' },
        ]
      }
    ]
  },
  {
    id: 'lesson_03',
    title: 'Bab 3: Al-Ma\'rifah (Spesifik)',
    description: 'Transformasi dari benda "sembarang" (Nakirah) menjadi "spesifik" (Ma\'rifah) dan Sifat.',
    concepts: ['Al-Ma\'rifah (The)', 'Nakirah (A/An)', 'Mubtada Khobar Sempurna'],
    introConcepts: [
      {
        title: "Konsep 1: Musuh Bebuyutan",
        description: "'AL' (اَلْـ) dan 'TANWIN' (un) adalah musuh abadi. Mereka tidak akan pernah bisa tinggal dalam satu kata yang sama.",
        visualRule: {
          before: "Qolam-UN (Benar)",
          after: "AL-Qolam-U (Benar)",
          explanation: "Salah Besar: Al-Qolam-UN. Pilih satu: Topi (Al) atau Ekor (Tanwin)."
        }
      },
      {
        title: "Konsep 2: Mubtada Harus Jelas",
        description: "Mubtada (Subjek) biasanya harus Jelas/Spesifik (Pakai Al). Khobar (Predikat) biasanya Umum (Tanwin).",
        visualRule: {
          before: "Nakirah (Umum)",
          after: "Ma'rifah (Khusus)",
          explanation: "Al-Qolamu (Pena itu) Maksurun (Rusak). Pena yg mana? Yang itu!"
        }
      }
    ],
    summary: {
      title: "Khulashah: Spesifik vs Umum",
      keyPoints: [
        "Isim pakai 'AL' = Ma'rifah (Khusus/The). Bunyinya 'u'.",
        "Isim tanpa 'AL' = Nakirah (Umum/A). Bunyinya 'un'.",
        "Mubtada biasanya Ma'rifah. Khobar biasanya Nakirah.",
        "Jangan gabungkan Al dan Tanwin!"
      ],
      teacherTip: "Bayangkan 'Al' itu seperti jari telunjuk yang menunjuk benda spesifik. 'Buku itu' (Al-Kitabu)."
    },
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
      { arabic: 'نَظِيْفٌ', latin: 'Nazhiifun', meaning: 'Bersih' },
    ],
    sentences: [
      // STEP 1: Visualizing the change
      {
        id: '3_0',
        arabicText: 'قَلَمٌ  ---  اَلْقَلَمُ',
        translation: 'Sebuah pena --- Pena itu.',
        tutorGuidance: "Perhatikan bedanya. Kiri pakai Tanwin (un). Kanan pakai Al, tanwinnya hilang jadi (u).",
        segments: [
           { id: '3_0_1', text: 'قَلَمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Nakirah', explanation: 'Sembarang pena.', deepLogic: 'Tanwin = Indefinite' },
           { id: '3_0_2', text: 'اَلْقَلَمُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Ma\'rifah', explanation: 'Pena itu (Spesifik).', deepLogic: 'Al = Definite. Tanwin hilang.' },
        ]
      },
      // STEP 2: The Broken Pen
      {
        id: '3_1',
        arabicText: 'اَلْقَلَمُ مَكْسُوْرٌ',
        translation: 'Pena itu rusak.',
        tutorGuidance: "Ini kalimat sempurna. 'Al-Qolamu' (Subjek Khusus) + 'Maksurun' (Sifat Umum).",
        segments: [
          { id: '3_1_1', text: 'اَلْقَلَمُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Mubtada', explanation: 'Subjek Spesifik (Ada Al).', deepLogic: 'Harakat "u" (Dhommah).' },
          { id: '3_1_2', text: 'مَكْسُوْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Predikat (Rusak).', deepLogic: 'Harakat "un" (Tanwin).' }
        ]
      },
      // STEP 3: The Open Door
      {
        id: '3_2',
        arabicText: 'اَلْبَابُ مَفْتُوْحٌ',
        translation: 'Pintu itu terbuka.',
        segments: [
          { id: '3_2_1', text: 'اَلْبَابُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Mubtada', explanation: 'Pintu itu.' },
          { id: '3_2_2', text: 'مَفْتُوْحٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Terbuka.' }
        ]
      },
      // STEP 4: Sitting & Standing
      {
        id: '3_3',
        arabicText: 'اَلْوَلَدُ جَالِسٌ وَ الْمُدَرِّسُ وَاقِفٌ',
        translation: 'Anak itu duduk dan guru itu berdiri.',
        tutorGuidance: "Dua kejadian sekaligus. Polanya sama: [Isim Al] + [Isim Tanwin].",
        segments: [
          { id: '3_3_1', text: 'اَلْوَلَدُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Mubtada', explanation: 'Anak itu.' },
          { id: '3_3_2', text: 'جَالِسٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Duduk.' },
          { id: '3_3_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
          { id: '3_3_4', text: 'الْمُدَرِّسُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Mubtada', explanation: 'Guru itu.' },
          { id: '3_3_5', text: 'وَاِقفٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Berdiri.' }
        ]
      },
      // STEP 5: New & Old (Adjectives as Khobar)
      {
        id: '3_4',
        arabicText: 'اَلْكِتَابُ جَدِيْدٌ وَ الْقَلَمُ قَدِيْمٌ',
        translation: 'Buku itu baru dan pena itu lama.',
        segments: [
           { id: '3_4_1', text: 'اَلْكِتَابُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Mubtada', explanation: 'Buku itu.' },
           { id: '3_4_2', text: 'جَدِيْدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Baru.' },
           { id: '3_4_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
           { id: '3_4_4', text: 'الْقَلَمُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Mubtada', explanation: 'Pena itu.' },
           { id: '3_4_5', text: 'قَدِيْمٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Lama.' },
        ]
      },
      // STEP 6: Size Comparison
      {
        id: '3_5',
        arabicText: 'اَلْحِمَارُ صَغِيْرٌ وَ الْحِصَانُ كَبِيْرٌ',
        translation: 'Keledai itu kecil dan kuda itu besar.',
        segments: [
           { id: '3_5_1', text: 'اَلْحِمَارُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Mubtada', explanation: 'Keledai itu.' },
           { id: '3_5_2', text: 'صَغِيْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kecil.' },
           { id: '3_5_3', text: 'وَ', type: WordType.PARTICLE, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Athof', explanation: 'Dan.' },
           { id: '3_5_4', text: 'الْحِصَانُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Mubtada', explanation: 'Kuda itu.' },
           { id: '3_5_5', text: 'كَبِيْرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Besar.' },
        ]
      },
      // STEP 7: Condition
      {
        id: '3_6',
        arabicText: 'اَلْمِنْدِيْلُ وَسِخٌ',
        translation: 'Sapu tangan itu kotor.',
        segments: [
            { id: '3_6_1', text: 'اَلْمِنْدِيْلُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Mubtada', explanation: 'Sapu tangan itu.' },
            { id: '3_6_2', text: 'وَسِخٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Khobar', explanation: 'Kotor.' }
        ]
      }
    ]
  },
  {
    id: 'lesson_04',
    title: 'Bab 4: Gravitasi Huruf Jar',
    description: 'Kekuatan "Amil" (Operator) yang menarik harakat menjadi Kasrah (i).',
    concepts: ['Huruf Jar (Fi, Ala, Min, Ila)', 'Isim Majrur', 'Kausalitas (Sebab-Akibat)'],
    introConcepts: [
      {
        title: "Konsep 1: Magnet Kasrah",
        description: "Ada sekelompok huruf kecil yang punya kekuatan besar. Kita sebut 'Huruf Jar'. Jika mereka muncul, kata setelahnya JATUH (Majrur) harakatnya ke bawah menjadi 'i' atau 'in'.",
        visualRule: {
          before: "Al-Bait-U (Rumah)",
          after: "FI Al-Bait-I (Di Rumah)",
          explanation: "FI adalah penyebab (Amil), BAITI adalah akibat (Ma'mul). Jangan pernah baca 'Fi Al-Baitu'!"
        }
      },
      {
        title: "Konsep 2: Nama Orang",
        description: "Nama laki-laki (Muhammad, Yasir) itu bertanwin (un). Jika kena huruf jar, jadi 'in'.",
        visualRule: {
          before: "Muhammad-un",
          after: "Ila Muhammad-in",
          explanation: "Nama orang tetap tunduk pada hukum Jar."
        }
      }
    ],
    summary: {
      title: "Khulashah: Hukum Kausalitas",
      keyPoints: [
        "Huruf Jar (Fi, Ala, Min, Ila) adalah 'Operator'.",
        "Kata benda setelah Huruf Jar disebut 'Majrur' (Yang ditarik).",
        "Tanda Majrur paling dasar adalah KASRAH (baris bawah/i).",
        "Rumus: Amil (Penyebab) -> Ma'mul (Korban) -> Tanda (Harakat)."
      ],
      teacherTip: "Inilah inti Nahwu: Perubahan akhir kata karena ada faktor (Amil) yang mempengaruhinya. Fi merubah u jadi i."
    },
    vocabulary: [
      { arabic: 'فِي', latin: 'Fii', meaning: 'Di dalam' },
      { arabic: 'عَلَى', latin: 'Ala', meaning: 'Di atas' },
      { arabic: 'مِنْ', latin: 'Min', meaning: 'Dari' },
      { arabic: 'إِلَى', latin: 'Ila', meaning: 'Ke' },
      { arabic: 'اَلْغُرْفَةُ', latin: 'Al-Ghurfatu', meaning: 'Kamar' },
      { arabic: 'اَلْحَمَّامُ', latin: 'Al-Hamaamu', meaning: 'Kamar Mandi' },
      { arabic: 'اَلْمَطْبَخُ', latin: 'Al-Mathbakhu', meaning: 'Dapur' },
      { arabic: 'السَّمَاءُ', latin: 'As-Samaa\'u', meaning: 'Langit' },
      { arabic: 'اَلْفَصْلُ', latin: 'Al-Fashlu', meaning: 'Kelas' },
    ],
    sentences: [
      // STEP 1: Basic FI (In)
      {
        id: '4_1',
        arabicText: 'مُحَمَّدٌ فِي الْغُرْفَةِ',
        translation: 'Muhammad ada di dalam kamar.',
        tutorGuidance: "Perhatikan kata 'Al-Ghurfati'. Kenapa 'ti'? Karena sebelumnya ada 'Fi' (Di dalam). Inilah yang disebut Jar-Majrur.",
        segments: [
          { id: '4_1_1', text: 'مُحَمَّدٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Subjek Nama Orang (Alam). Tetap "un".', vowelEnding: 'un' },
          { 
              id: '4_1_2', text: 'فِي', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Huruf Jar', 
              explanation: '[OPERATOR] Si Penyebab. Dia "menjar-kan" kata setelahnya.',
              deepLogic: 'Huruf ini punya "amal" (pekerjaan): Memaksa kata depannya berharakat kasrah.'
          },
          { 
              id: '4_1_3', text: 'الْغُرْفَةِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: '4_1_2', 
              explanation: 'Majrur (Korban). Harakat WAJIB "i" (Kasrah) karena ada "Fi".', 
              deepLogic: 'Jika "Fi" hilang, dia akan kembali jadi "Al-Ghurfatu".'
          }
        ]
      },
      // STEP 2: Basic ALA (On)
      {
        id: '4_2',
        arabicText: 'اَلْكِتَابُ عَلَى الْمَكْتَبِ',
        translation: 'Buku itu ada di atas meja.',
        segments: [
          { id: '4_2_1', text: 'اَلْكِتَابُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Mubtada', explanation: 'Buku itu (Subjek). Harakat "u".' },
          { id: '4_2_2', text: 'عَلَى', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Huruf Jar', explanation: 'Di atas (Operator).' },
          { id: '4_2_3', text: 'الْمَكْتَبِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Isim Majrur', relatedToId: '4_2_2', explanation: 'Meja (Objek Preposisi). Harakat "i".' }
        ]
      },
      // STEP 3: Questioning Location
      {
        id: '4_3',
        arabicText: 'أَيْنَ يَاسِرٌ؟ هُوَ فِي الْحَمَّامِ',
        translation: 'Dimana Yasir? Dia di kamar mandi.',
        tutorGuidance: "Kata ganti 'Huwa' (Dia lk) menggantikan Yasir. Perhatikan 'Al-Hammami' (Kasrah).",
        segments: [
            { id: '4_3_1', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Dimana.' },
            { id: '4_3_2', text: 'يَاسِرٌ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Yasir.' },
            { id: '4_3_3', text: 'هُوَ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Dia (Kata Ganti/Dhomir).' },
            { id: '4_3_4', text: 'فِي', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Huruf Jar', explanation: 'Di.' },
            { id: '4_3_5', text: 'الْحَمَّامِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Majrur', explanation: 'Kamar mandi (i).', relatedToId: '4_3_4' },
        ]
      },
      // STEP 4: Feminine Location
      {
        id: '4_4',
        arabicText: 'أَيْنَ آمِنَةُ؟ هِيَ فِي الْمَطْبَخِ',
        translation: 'Dimana Aminah? Dia di dapur.',
        tutorGuidance: "Aminah itu perempuan, pakai 'HIYA' (Dia pr). Aminah tidak boleh bertanwin (nanti kita bahas kenapa).",
        segments: [
            { id: '4_4_1', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Istifham', explanation: 'Dimana.' },
            { id: '4_4_2', text: 'آمِنَةُ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Aminah (Nama wanita tidak bertanwin).' },
            { id: '4_4_3', text: 'هِيَ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada', explanation: 'Dia (Perempuan).' },
            { id: '4_4_4', text: 'فِي', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Huruf Jar', explanation: 'Di.' },
            { id: '4_4_5', text: 'الْمَطْبَخِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Majrur', explanation: 'Dapur (i).', relatedToId: '4_4_4' },
        ]
      },
      // STEP 5: Min & Ila (Movement)
      {
        id: '4_5',
        arabicText: 'خَرَجَ الْمُدَرِّسُ مِنَ الْفَصْلِ',
        translation: 'Guru itu keluar dari kelas.',
        tutorGuidance: "Kata 'Min' artinya Dari. Al-Fashli jadi kasrah karena Min.",
        segments: [
            { id: '4_5_1', text: 'خَرَجَ', type: WordType.VERB, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Fi\'il Madhi', explanation: 'Telah keluar (Kata Kerja).' },
            { id: '4_5_2', text: 'الْمُدَرِّسُ', type: WordType.NOUN, logicId: LogicId.DEFINITE_AL, grammaticalRole: 'Fa\'il', explanation: 'Guru (Pelaku).' },
            { id: '4_5_3', text: 'مِنَ', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Huruf Jar', explanation: 'Dari.' },
            { id: '4_5_4', text: 'الْفَصْلِ', type: WordType.NOUN, logicId: LogicId.AFTER_PREPOSITION, grammaticalRole: 'Majrur', explanation: 'Kelas (i).', relatedToId: '4_5_3' },
        ]
      },
      // STEP 6: Question with Preposition
      {
        id: '4_6',
        arabicText: 'مِنْ أَيْنَ أَنْتَ؟',
        translation: 'Dari mana kamu?',
        tutorGuidance: "Huruf Jar juga bisa masuk ke kata tanya. Min + Aina.",
        segments: [
          { id: '4_6_1', text: 'مِنْ', type: WordType.OPERATOR, logicId: LogicId.PREPOSITION_TRIGGER, grammaticalRole: 'Huruf Jar', explanation: 'Dari.' },
          { id: '4_6_2', text: 'أَيْنَ', type: WordType.PARTICLE, logicId: LogicId.QUESTION_TOOL, grammaticalRole: 'Isim Istifham', explanation: 'Mana.', deepLogic: 'Aina adalah "Mabni". Walaupun ada Min, dia tetap dibaca Aina, bukan Aini.' },
          { id: '4_6_3', text: 'أَنْتَ', type: WordType.NOUN, logicId: LogicId.DEFAULT_NOUN, grammaticalRole: 'Mubtada Muakhar', explanation: 'Kamu (Dhomir).' }
        ]
      }
    ]
  }
];

// Utility functions remain unchanged...
export const calculateVocabMastery = (progress: { completedLessons: string[], lastLessonId: string, lastPageId: string }): number => {
  let totalWords = 0;
  progress.completedLessons.forEach(lessonId => {
    const lesson = LESSON_DATA.find(l => l.id === lessonId);
    if (lesson?.vocabulary) {
      totalWords += lesson.vocabulary.length;
    }
  });
  const currentLesson = LESSON_DATA.find(l => l.id === progress.lastLessonId);
  if (currentLesson && !progress.completedLessons.includes(currentLesson.id) && currentLesson.vocabulary) {
    const totalPages = currentLesson.sentences.length || 1;
    const currentPage = parseInt(progress.lastPageId || '0');
    const ratio = Math.min(currentPage / totalPages, 0.9); 
    const earnedFromCurrent = Math.floor(currentLesson.vocabulary.length * ratio);
    totalWords += earnedFromCurrent;
  }
  return totalWords;
};
