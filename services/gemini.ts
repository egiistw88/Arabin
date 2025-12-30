
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
  // Accessing process.env.API_KEY directly. The updated vite.config.ts ensures this populates correctly.
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === '') {
      console.error("API_KEY is missing or empty.");
      return "⚠️ Assalamu'alaikum. Mohon maaf, Ustadz belum memegang kunci akses (API Key). Mohon pastikan file .env berisi API_KEY yang valid.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    // 2. Build Content Array with Strict Alternation Rules
    const contents: Content[] = [];
    
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
            const previousContent = contents[contents.length - 1];
            
            // Safe access to parts to avoid TS errors
            if (previousContent.parts && previousContent.parts.length > 0) {
                const lastPart = previousContent.parts[0];
                if (lastPart && 'text' in lastPart) {
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

    // 3. Final Safety: The conversation MUST end with a User message
    if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
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
    
    let errorMessage = "Koneksi batin terputus (Network Error).";
    
    if (error.message) {
        if (error.message.includes('400')) errorMessage = "Format percakapan ditolak (400). Mulai chat baru.";
        else if (error.message.includes('401') || error.message.includes('API_KEY')) errorMessage = "Izin akses ditolak (Invalid API Key).";
        else if (error.message.includes('429')) errorMessage = "Terlalu banyak permintaan (429). Tunggu sebentar.";
        else if (error.message.includes('404')) errorMessage = "Model AI sedang istirahat (404).";
        else errorMessage = `Error: ${error.message}`;
    }

    return `Mohon maaf, ${errorMessage}`;
  }
};
