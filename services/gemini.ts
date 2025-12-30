
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
    // We expect 'history' to contain the full conversation including the latest user message.
    // We remove the last message (raw user text) so we can replace it with the context-enriched version.
    const previousTurns = history.slice(0, -1).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // 2. Construct the Final Turn with Context
    // This ensures the context is attached to the most recent prompt, maximizing adherence.
    const finalUserText = context 
      ? `[KONTEKS APLIKASI SAAT INI]\n${context}\n\n[PERTANYAAN PENGGUNA]\n${lastUserMessage}` 
      : lastUserMessage;

    // Add the enriched last message
    previousTurns.push({
      role: 'user',
      parts: [{ text: finalUserText }]
    });

    // 3. Generate Response with Full Context
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: previousTurns, 
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, 
      }
    });

    return response.text || "Hmm, Ustadz perlu berpikir sejenak. Coba tanyakan dengan cara lain ya, Nak.";
    
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Mohon maaf, koneksi batin kita terputus sejenak (Error Jaringan). Coba periksa koneksi internetmu ya.";
  }
};
