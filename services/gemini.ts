
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Anda adalah "Ustadz Logika", seorang pembimbing bahasa Arab yang sepuh, bijaksana, dan sangat sabar. 

PERATURAN UTAMA:
1. JIKA diberikan konteks (Bab, Kalimat, Kata Terpilih), GUNAKAN itu untuk menjawab. Fokus jelaskan kata yang dipilih pengguna jika ada.
2. JANGAN PERNAH menjawab seperti robot. Gunakan bahasa lisan yang hangat.
3. Gunakan ANALOGI KEHIDUPAN. Contoh: Jangan bilang "Mubtada", bilang "Kepala Kalimat".
4. Pendek & Padat. Jangan berikan kuliah panjang lebar kecuali diminta. Jawab langsung intinya dulu.

Struktur Jawaban:
- **Paragraf 1 (Validasi & Logika)**: "Pertanyaan bagus, Nak. Kata '[Kata Terpilih]' ini menarik karena..."
- **Paragraf 2 (Analogi)**: "Bayangkan dia seperti..."
- **Paragraf 3 (Simpulan)**: Kunci ingatan singkat.
`;

export const sendMessageToGemini = async (
  history: {role: 'user'|'model', text: string}[], 
  lastUserMessage: string,
  context?: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // 1. Prepare History
    // We remove the last message because we will reconstruct it with context below.
    let rawPreviousTurns = history.slice(0, -1).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // CRITICAL FIX: Gemini API requires the conversation to START with a 'user' message.
    // If our history starts with a 'model' greeting (e.g. "Assalamu'alaikum"), we must skip it 
    // for the API payload, otherwise it throws a 400 error.
    
    // Find the index of the first user message
    const firstUserIndex = rawPreviousTurns.findIndex(t => t.role === 'user');
    
    // If we found a user message, slice from there. 
    // If NO user message is found in history (e.g. only a greeting exists), 
    // validPreviousTurns becomes empty [], which is perfectly valid as the START of a chat.
    const validPreviousTurns = firstUserIndex >= 0 ? rawPreviousTurns.slice(firstUserIndex) : [];

    // 2. Construct the Final Turn with Context
    const finalUserText = context 
      ? `[KONTEKS APLIKASI SAAT INI]\n${context}\n\n[PERTANYAAN PENGGUNA]\n${lastUserMessage}` 
      : lastUserMessage;

    // Add the enriched last message
    const finalContent = [
      ...validPreviousTurns,
      {
        role: 'user',
        parts: [{ text: finalUserText }]
      }
    ];

    // 3. Generate Response
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: finalContent, 
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, 
      }
    });

    return response.text || "Hmm, Ustadz perlu berpikir sejenak. Coba tanyakan dengan cara lain ya, Nak.";
    
  } catch (error) {
    console.error("Gemini Error:", error);
    // More descriptive error for debugging (visible in console, friendly in UI)
    return "Mohon maaf, koneksi batin kita terputus sejenak. Pastikan internet lancar, atau coba tanyakan hal yang lebih sederhana.";
  }
};
