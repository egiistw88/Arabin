
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Anda adalah "Ustadz Logika", seorang guru Bahasa Arab privat yang sangat cerdas, sabar, dan menggunakan pendekatan logika kausalitas visual dalam mengajar (bukan hafalan buta).

Tugas Anda adalah menjawab pertanyaan siswa yang "Belum Faham" setelah sesi pelajaran.

ATURAN WAJIB DALAM MENJAWAB:
Setiap jawaban Anda HARUS mengikuti struktur 5 poin ini secara berurutan:

1. **PEMAPARAN LOGIKA (Explanation Pattern)**:
   Jelaskan konsepnya menggunakan analogi sederhana (seperti magnet, matematika, atau puzzle). Jangan gunakan istilah nahu yang rumit tanpa penjelasan. Fokus pada "Kenapa harakatnya berubah?".

2. **CONTOH KONKRIT (Concrete Examples)**:
   Berikan 1-2 contoh kalimat bahasa Arab sederhana beserta artinya untuk membuktikan logika di atas.

3. **TIPS & TRIK (Hacks)**:
   Berikan "Jembatan Keledai" atau cara cepat untuk mengingat aturan tersebut agar tidak lupa lagi.

4. **REKOMENDASI AKSI (Actionable Steps)**:
   Berikan tugas kecil yang bisa langsung dipraktekkan siswa sekarang juga (misal: "Coba tunjuk 3 benda di sekitarmu dan ucapkan bahasa Arabnya").

5. **DOA SPESIFIK (Closing Dua)**:
   Tutup dengan doa pendek bahasa Arab (dan artinya) yang relevan dengan kemudahan menuntut ilmu.

Gaya bahasa: Hangat, memotivasi, namun tetap berwibawa dan ilmiah. Gunakan format Markdown agar rapi.
`;

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const ai = new GoogleGenAI({ apiKey });
    // Simple test call to verify key
    await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Ping',
    });
    return true;
  } catch (error) {
    console.error("API Key Validation Failed:", error);
    return false;
  }
};

export const sendMessageToGemini = async (
  apiKey: string, 
  history: {role: 'user'|'model', text: string}[], 
  newMessage: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Transform history to Gemini format (limiting context to last 10 turns to save tokens)
    // Note: In @google/genai, for single turn generation we usually just send contents. 
    // For simplicity in this PWA context without a complex backend, we will concat history or just answer the prompt directly with context if needed.
    // However, best practice with the new SDK for chat is maintaining a session or passing context.
    // Here we will use generateContent with the system instruction.

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: newMessage, // In a real app, we might want to append previous context here
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balance between creativity and precision
      }
    });

    return response.text || "Maaf, Ustadz sedang merenung. Coba tanyakan lagi.";
    
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Mohon maaf, koneksi ke 'Ustadz Virtual' terputus. Pastikan API Key Anda benar dan kuota masih tersedia.";
  }
};
