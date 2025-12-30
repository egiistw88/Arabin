
import React, { useState, useEffect, useRef } from 'react';
import { motion as m } from 'framer-motion';
import { Send, User, Sparkles, ChevronLeft } from 'lucide-react';
import { sendMessageToGemini } from '../services/gemini';
import { ChatMessage } from '../types';
import { SFX } from '../services/sfx';

const motion = m as any;

interface GeminiChatProps {
  navigate: (path: string) => void;
  seenGuidanceIds?: string[];
  onMarkSeen?: (id: string) => void;
}

export const GeminiChat: React.FC<GeminiChatProps> = ({ navigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Greeting from Ustadz
    setMessages([{
        role: 'model',
        text: "Assalamu'alaikum warahmatullah. Mari duduk sejenak. Bagian mana dari pelajaran tadi yang masih mengganjal di hati? Jangan sungkan bertanya, Ustadz di sini untuk menemani belajarmu.",
        timestamp: Date.now()
    }]);
  }, []);

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

    const responseText = await sendMessageToGemini(historyPayload, userText);
    
    setIsTyping(false);
    SFX.playPop();
    
    setMessages(prev => [
      ...prev,
      { role: 'model', text: responseText, timestamp: Date.now() }
    ]);
  };

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