
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

/**
 * Helper to ensure the conversation history is perfectly valid for Gemini API.
 * Rules:
 * 1. Must start with 'user'.
 * 2. Must alternate 'user', 'model', 'user', 'model'.
 */
const sanitizeHistory = (history: {role: 'user'|'model', text: string}[]) => {
    const cleanHistory: {role: 'user'|'model', parts: {text: string}[]}[] = [];
    
    // 1. Skip all initial 'model' messages (Wait for the first 'user')
    let startIndex = history.findIndex(h => h.role === 'user');
    if (startIndex === -1) return []; // No user messages yet

    let lastRole = '';

    for (let i = startIndex; i < history.length; i++) {
        const msg = history[i];
        
        // 2. Handle duplicate roles (Merge text if User sends twice in a row)
        if (msg.role === lastRole) {
            const lastEntry = cleanHistory[cleanHistory.length - 1];
            if (lastEntry && lastEntry.parts[0]) {
                lastEntry.parts[0].text += `\n\n(Tambahan): ${msg.text}`;
            }
        } else {
            // 3. Normal alternating push
            cleanHistory.push({
                role: msg.role,
                parts: [{ text: msg.text }]
            });
            lastRole = msg.role;
        }
    }
    return cleanHistory;
};

export const sendMessageToGemini = async (
  history: {role: 'user'|'model', text: string}[], 
  lastUserMessage: string,
  context?: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // 1. Remove the active/pending message from history to avoid duplication
    // (UI usually updates state optimistically, so 'history' might already contain 'lastUserMessage')
    // We want to reconstruct the LAST message strictly with Context.
    const pastHistory = history.filter(h => h.text !== lastUserMessage);

    // 2. Sanitize Past History (Remove greetings, fix alternation)
    const validPastTurns = sanitizeHistory(pastHistory);

    // 3. Construct the Final Turn with Context Injection
    // The context is HIDDEN instruction wrapped with the user's visible question.
    const finalPrompt = context 
      ? `[SISTEM: Jawab pertanyaan berikut berdasarkan konteks ini]\n${context}\n\n[USER BERTANYA]\n${lastUserMessage}` 
      : lastUserMessage;

    // 4. Combine
    const finalContent = [
      ...validPastTurns,
      {
        role: 'user',
        parts: [{ text: finalPrompt }]
      }
    ];

    // 5. Call API
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Ensure we use a valid model name
      contents: finalContent, 
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, 
      }
    });

    return response.text || "Hmm, Ustadz perlu berpikir sejenak. Coba ulangi pertanyaanmu.";
    
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // Return specific error hints for debugging
    if (error.message?.includes('400')) {
        return "Maaf, Ustadz kurang paham urutan percakapan kita (Error 400). Coba mulai topik baru.";
    } else if (error.message?.includes('429')) {
        return "Ustadz sedang melayani banyak murid (Quota Exceeded). Tunggu sebentar ya.";
    } else if (error.message?.includes('API_KEY')) {
        return "Kunci akses Ustadz bermasalah (Invalid API Key).";
    }

    return "Mohon maaf, koneksi batin terputus (Network Error). Pastikan internet lancar.";
  }
};
