
import { GoogleGenAI, Content, Part } from "@google/genai";

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
  
  // 1. Validate API Key Availability
  if (!process.env.API_KEY) {
      console.error("API_KEY is missing.");
      return "⚠️ Kunci akses (API Key) belum diatur. Mohon konfigurasi file .env Anda.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // 2. Build Content Array with Strict Alternation Rules
    // Gemini API throws 400 if:
    // - History starts with 'model'
    // - Roles do not alternate (User -> Model -> User)
    
    const contents: Content[] = [];
    
    // We iterate through the ENTIRE history (including the latest message)
    // Note: We don't rely on 'lastUserMessage' param for construction, we assume it's in 'history'.
    // If 'history' contains duplicates of the last message due to UI state, we handle it carefully.
    
    for (const msg of history) {
        const role = msg.role;
        let text = msg.text;

        // SKIP initial model messages (Greeting) if it's the start of conversation
        if (contents.length === 0 && role === 'model') {
            continue;
        }

        // Context Injection (Only for the very last user message)
        const isLastMessage = msg === history[history.length - 1];
        if (isLastMessage && role === 'user' && context) {
            text = `[KONTEKS APLIKASI]\n${context}\n\n[PERTANYAAN PENGGUNA]\n${text}`;
        }

        // Merge logic to prevent "User -> User" or "Model -> Model"
        if (contents.length > 0 && contents[contents.length - 1].role === role) {
            // Append text to the previous turn of the same role
            const previousContent = contents[contents.length - 1];
            
            // Safe access to parts (Fix for TS2532)
            if (previousContent.parts && previousContent.parts.length > 0) {
                const lastPart = previousContent.parts[0];
                if (lastPart && 'text' in lastPart) {
                    // We add a newline to separate thoughts. 
                    // Casting to any to avoid strict readonly checks if present in SDK types
                    (lastPart as any).text += `\n\n${text}`;
                }
            }
        } else {
            // New turn
            contents.push({
                role: role,
                parts: [{ text }]
            });
        }
    }

    // 3. Final Safety: The conversation MUST end with a User message for the model to reply
    if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
        // If we filtered everything out (e.g. only greetings), push the user prompt manually
        const finalPrompt = context 
            ? `[KONTEKS]\n${context}\n\n[PERTANYAAN]\n${lastUserMessage}` 
            : lastUserMessage;
            
        contents.push({
            role: 'user',
            parts: [{ text: finalPrompt }]
        });
    }

    // 4. Call API
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: contents, 
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, 
      }
    });

    return response.text || "Hmm, Ustadz perlu berpikir sejenak. Coba tanyakan lagi.";
    
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // Return detailed error for debugging in UI
    let errorMessage = "Koneksi batin terputus (Network Error).";
    
    if (error.message) {
        if (error.message.includes('400')) errorMessage = "Format percakapan ditolak (400). Mulai chat baru.";
        else if (error.message.includes('401')) errorMessage = "API Key tidak valid (401).";
        else if (error.message.includes('429')) errorMessage = "Terlalu banyak permintaan (429). Tunggu sebentar.";
        else if (error.message.includes('404')) errorMessage = "Model AI sedang istirahat (404).";
        else errorMessage = `Error: ${error.message}`;
    }

    return `Mohon maaf, ${errorMessage}`;
  }
};
