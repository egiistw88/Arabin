
import React, { useState, useEffect, useRef } from 'react';
import { motion as m } from 'framer-motion';
import { Send, User, Sparkles, ChevronLeft, Loader2, X } from 'lucide-react';
import { sendMessageToGemini } from '../services/gemini';
import { ChatMessage } from '../types';
import { SFX } from '../services/sfx';

const motion = m as any;

interface GeminiChatProps {
  navigate: (path: string) => void;
  seenGuidanceIds?: string[];
  onMarkSeen?: (id: string) => void;
  isMainTab?: boolean; 
  // NEW PROPS FOR CONTEXT AWARENESS
  isOverlay?: boolean;
  onClose?: () => void;
  contextData?: {
      lessonTitle: string;
      sentenceArabic: string;
      sentenceTranslation: string;
      selectedWord?: string;
      selectedRole?: string;
  }
}

export const GeminiChat: React.FC<GeminiChatProps> = ({ 
    navigate, 
    isMainTab = false, 
    isOverlay = false, 
    onClose,
    contextData 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic Greeting based on context
    // This message is purely visual for the UI. The Service will filter it out 
    // to ensure the API call starts with 'user'.
    let greeting = "Assalamu'alaikum. Ada yang membingungkanmu?";
    if (contextData?.selectedWord) {
        greeting = `Assalamu'alaikum. Ingin membahas kata "${contextData.selectedWord}" pada kalimat tadi? Ustadz siap jelaskan logikanya.`;
    } else if (contextData) {
        greeting = `Assalamu'alaikum. Kita sedang di bab "${contextData.lessonTitle}". Bagian mana yang sulit?`;
    } else if (!isOverlay) {
        greeting = "Assalamu'alaikum warahmatullah. Mari duduk sejenak. Apa yang ingin didiskusikan hari ini?";
    }

    setMessages([{
        role: 'model',
        text: greeting,
        timestamp: Date.now()
    }]);
  }, [contextData?.selectedWord, contextData?.lessonTitle]); 

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setInputMsg('');
    SFX.playClick();

    // 1. Optimistic Update (Show user message immediately)
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', text: userText, timestamp: Date.now() }
    ];
    setMessages(newMessages);
    setIsTyping(true);

    // 2. Prepare Context (Only relevant for the immediate turn)
    let contextString = '';
    if (contextData) {
        contextString = `
            [DATA PELAJARAN]
            Bab: ${contextData.lessonTitle}
            Kalimat: ${contextData.sentenceArabic} ("${contextData.sentenceTranslation}")
            ${contextData.selectedWord ? `FOKUS: Kata "${contextData.selectedWord}" (${contextData.selectedRole || '?'})` : ''}
        `;
    }

    // 3. Send to Service
    // We pass the FULL newMessages array. The service will handle filtering the last message
    // and sanitizing the history to satisfy Gemini API requirements.
    const responseText = await sendMessageToGemini(newMessages, userText, contextString);
    
    setIsTyping(false);
    SFX.playPop();
    
    setMessages(prev => [
      ...prev,
      { role: 'model', text: responseText, timestamp: Date.now() }
    ]);
  };

  return (
    <div className={`flex flex-col bg-[#f8f9fa] ${isOverlay ? 'h-full rounded-t-3xl overflow-hidden' : 'h-screen safe-bottom'} ${isMainTab ? 'pb-0' : isOverlay ? 'pb-0' : 'pb-20'}`}>
       
       {/* HEADER */}
       <div className={`bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-3 shadow-sm sticky top-0 z-20 ${isOverlay ? 'bg-[#fdfbf7]' : ''}`}>
          {!isMainTab && !isOverlay && (
              <button onClick={() => navigate('/contents')} className="p-2 -ml-2 text-gray-400 hover:text-[#1a1512]">
                 <ChevronLeft className="w-6 h-6" />
              </button>
          )}
          
          <div className="w-10 h-10 rounded-full bg-[#1a1512] flex items-center justify-center border-2 border-[#8a1c1c]">
             <span className="font-arabic text-xl text-white mt-1">ع</span>
          </div>
          
          <div className="flex-1">
             <h3 className="font-serif font-bold text-[#1a1512]">Ustadz Logika</h3>
             {isOverlay && contextData?.selectedWord ? (
                 <p className="text-[10px] text-[#8a1c1c] font-bold uppercase truncate max-w-[150px]">
                    Bahas: {contextData.selectedWord}
                 </p>
             ) : (
                <p className="text-[10px] text-green-600 font-bold uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                </p>
             )}
          </div>

          {isOverlay && onClose && (
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
                  <X className="w-5 h-5" />
              </button>
          )}
       </div>

       {/* CHAT AREA */}
       <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                 <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-3">
                    <Loader2 className="w-4 h-4 text-[#8a1c1c] animate-spin" />
                    <span className="text-xs text-gray-500 font-serif italic">Sedang memikirkan jawaban...</span>
                 </div>
             </motion.div>
          )}
          
          <div ref={messagesEndRef} />
       </div>

       {/* INPUT AREA */}
       <div className={`bg-white p-4 border-t border-gray-100 sticky ${isMainTab ? 'bottom-16 border-b' : 'bottom-0'}`}>
          <div className="flex gap-2 max-w-lg mx-auto">
             <input 
                type="text" 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={contextData?.selectedWord ? `Tanya ttg "${contextData.selectedWord}"...` : "Tanya sesuatu..."}
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
