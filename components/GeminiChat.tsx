
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Key, AlertTriangle, CheckCircle2, User, Sparkles, ChevronLeft, Loader2, Ticket, Lock, ShieldCheck, HelpCircle } from 'lucide-react';
import { validateApiKey, sendMessageToGemini } from '../services/gemini';
import { ChatMessage } from '../types';
import { SFX } from '../services/sfx';
import { OnboardingGuide, GuideStep } from './OnboardingGuide';

interface GeminiChatProps {
  apiKey?: string;
  onSaveKey: (key: string) => void;
  navigate: (path: string) => void;
  seenGuidanceIds?: string[];
  onMarkSeen?: (id: string) => void;
}

export const GeminiChat: React.FC<GeminiChatProps> = ({ apiKey, onSaveKey, navigate, seenGuidanceIds = [], onMarkSeen }) => {
  const [inputKey, setInputKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [forceShowGuide, setForceShowGuide] = useState(false); // Manual trigger
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // GUIDANCE LOGIC
  const GUIDE_ID = 'intro_api_key';
  // Show if never seen OR forced
  const showGuide = (!apiKey && !seenGuidanceIds.includes(GUIDE_ID)) || forceShowGuide;

  const handleGuideComplete = (id: string) => {
      setForceShowGuide(false);
      if (onMarkSeen) onMarkSeen(id);
  };

  const guideSteps: GuideStep[] = [
    {
        title: "Koneksi ke Otak Cerdas",
        description: "Fitur ini menghubungkanmu langsung dengan Kecerdasan Buatan (AI) Google Gemini. Kamu bisa bertanya apa saja tentang Bahasa Arab layaknya chat dengan guru privat.",
        icon: Sparkles
    },
    {
        title: "Apa itu API Key?",
        description: "Bayangkan API Key sebagai 'Tiket Masuk' digital. Untuk menggunakan otak Google, aplikasi ini butuh tiket tersebut. Kabar baiknya: Tiket ini 100% GRATIS.",
        icon: Ticket
    },
    {
        title: "Cara Mendapatkannya",
        description: "1. Klik link 'Dapatkan di Google AI Studio' di bawah.\n2. Login akun Google.\n3. Klik 'Create API Key' dan salin kodenya ke sini.",
        icon: Key
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveKey = async () => {
    if (!inputKey.trim()) return;
    setIsValidating(true);
    SFX.playClick();
    
    const isValid = await validateApiKey(inputKey);
    setIsValidating(false);

    if (isValid) {
      SFX.playSuccess();
      onSaveKey(inputKey);
      setMessages([{
        role: 'model',
        text: "Assalamu'alaikum warahmatullah. Mari duduk sejenak. Bagian mana dari pelajaran tadi yang masih mengganjal di hati? Jangan sungkan bertanya, Ustadz di sini untuk menemani belajarmu.",
        timestamp: Date.now()
      }]);
    } else {
      SFX.playError();
      alert("API Key tidak valid. Mohon periksa kembali.");
    }
  };

  const handleSend = async () => {
    if (!inputMsg.trim() || !apiKey) return;

    const userText = inputMsg;
    setInputMsg('');
    SFX.playClick();

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', text: userText, timestamp: Date.now() }
    ];
    setMessages(newMessages);
    setIsTyping(true);

    const historyPayload = newMessages.slice(-10).map(m => ({
        role: m.role as 'user' | 'model',
        text: m.text
    }));

    const responseText = await sendMessageToGemini(apiKey, historyPayload, userText);
    
    setIsTyping(false);
    SFX.playPop();
    
    setMessages(prev => [
      ...prev,
      { role: 'model', text: responseText, timestamp: Date.now() }
    ]);
  };

  // --- VIEW: SETUP KEY ---
  if (!apiKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
        
        {/* THE ONBOARDING GUIDE */}
        {onMarkSeen && (
            <OnboardingGuide 
                id={GUIDE_ID}
                isOpen={showGuide}
                steps={guideSteps}
                onComplete={handleGuideComplete}
            />
        )}

        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 relative">
          <Key className="w-8 h-8 text-gray-400" />
          <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-1 rounded-full border-2 border-white">
            <Lock className="w-3 h-3" />
          </div>
        </div>
        
        <h2 className="font-serif font-bold text-2xl text-[#1a1512] mb-2">Aktivasi Guru AI</h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs">
          Masukkan kunci rahasia (API Key) Anda untuk mulai bertanya.
        </p>

        <div className="w-full max-w-sm space-y-4">
          <input 
            type="password" 
            placeholder="Tempel API Key di sini..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#8a1c1c] focus:outline-none transition-colors"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
          
          <button 
            onClick={handleSaveKey}
            disabled={isValidating || !inputKey}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all
              ${isValidating || !inputKey ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#1a1512] text-white hover:bg-black'}
            `}
          >
             {isValidating ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
             {isValidating ? 'Memeriksa...' : 'Simpan & Hubungkan'}
          </button>

          <p className="text-xs text-gray-400 mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
            Belum punya key? <br/>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[#8a1c1c] font-bold underline block mt-1">
                Dapatkan GRATIS di Google AI Studio
            </a>
          </p>

          <button 
             onClick={() => setForceShowGuide(true)}
             className="flex items-center justify-center gap-1 mx-auto text-xs text-gray-400 hover:text-[#8a1c1c] mt-2 transition-colors"
          >
             <HelpCircle className="w-3 h-3" />
             <span>Saya bingung, tolong jelaskan lagi</span>
          </button>
        </div>
        
        <button onClick={() => navigate('/contents')} className="mt-8 text-sm font-bold text-gray-400 hover:text-[#1a1512]">
            Kembali ke Pelajaran
        </button>
      </div>
    );
  }

  // --- VIEW: CHAT INTERFACE ---
  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa] safe-bottom pb-20">
       <div className="bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-3 shadow-sm sticky top-0 z-10">
          <button onClick={() => navigate('/contents')} className="p-2 -ml-2 text-gray-400 hover:text-[#1a1512]">
             <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#1a1512] flex items-center justify-center border-2 border-[#8a1c1c]">
             <span className="font-arabic text-xl text-white mt-1">ع</span>
          </div>
          <div>
             <h3 className="font-serif font-bold text-[#1a1512]">Ustadz Logika (AI)</h3>
             <p className="text-[10px] text-green-600 font-bold uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Online
             </p>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
             <div className="text-center py-10 opacity-50">
                <Sparkles className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-sm">Mulai percakapan dengan salam...</p>
             </div>
          )}

          {messages.map((msg, idx) => {
             const isModel = msg.role === 'model';
             return (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className={`flex gap-3 ${isModel ? 'flex-row' : 'flex-row-reverse'}`}
                >
                   <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${isModel ? 'bg-[#1a1512] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {isModel ? <span className="font-arabic mt-1">ع</span> : <User className="w-4 h-4" />}
                   </div>

                   <div className={`
                      max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                      ${isModel 
                         ? 'bg-white text-[#1a1512] rounded-tl-none border border-gray-100' 
                         : 'bg-[#1a1512] text-white rounded-tr-none'
                      }
                   `}>
                      <div className="markdown-body" dangerouslySetInnerHTML={{ 
                          __html: msg.text
                              .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                              .replace(/\*(.*?)\*/g, '<i>$1</i>')
                              .replace(/\n/g, '<br/>') 
                      }} />
                   </div>
                </motion.div>
             );
          })}

          {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#1a1512] flex items-center justify-center mt-1">
                    <span className="font-arabic text-white mt-1">ع</span>
                 </div>
                 <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1 items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                 </div>
             </motion.div>
          )}
          
          <div ref={messagesEndRef} />
       </div>

       <div className="bg-white p-4 border-t border-gray-100 sticky bottom-0">
          <div className="flex gap-2 max-w-lg mx-auto">
             <input 
                type="text" 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya tentang Nahwu..." 
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8a1c1c] transition-colors"
             />
             <button 
                onClick={handleSend}
                disabled={!inputMsg.trim() || isTyping}
                className={`p-3 rounded-xl transition-all ${!inputMsg.trim() ? 'bg-gray-100 text-gray-400' : 'bg-[#8a1c1c] text-white shadow-lg hover:scale-105'}`}
             >
                <Send className="w-5 h-5" />
             </button>
          </div>
       </div>

    </div>
  );
};
