
import React, { useState, useRef, useEffect } from 'react';
import { ecoAssistantChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2, Sparkles, Trash2, Globe } from 'lucide-react';

export const ModuleAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(false); // input clear UI feedback
    setLoading(true);

    try {
      const response = await ecoAssistantChat(messages, input);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Ошибка подключения к Gemini. Проверьте API ключ." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="text-indigo-400 animate-pulse" />
            AI Гид Navigator
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <Globe className="w-3 h-3 text-emerald-500" /> На базе Google Gemini 3.0
          </p>
        </div>
        <button 
          onClick={() => setMessages([])} 
          className="p-2 text-slate-500 hover:text-red-400 transition bg-slate-900 rounded-xl border border-slate-800"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 bg-slate-900/30 border border-slate-800 rounded-[3rem] mb-6 overflow-y-auto p-8 space-y-6 shadow-2xl backdrop-blur-sm scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
            <div className="w-20 h-20 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center border border-indigo-500/20">
              <Bot className="w-10 h-10 text-indigo-400" />
            </div>
            <div className="space-y-2">
              <p className="font-black text-slate-200 uppercase tracking-[0.2em] text-sm">Нейросеть активна</p>
              <p className="text-[10px] max-w-xs uppercase font-black text-slate-500 leading-relaxed">
                Задайте вопрос о переработке в РФ, индексе NDVI или попросите составить план эко-поездки.
              </p>
            </div>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-5 ${m.role === 'user' ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl transition-transform hover:scale-105 ${
              m.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700'
            }`}>
              {m.role === 'user' ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-indigo-400" />}
            </div>
            <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed font-semibold shadow-xl border ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none border-indigo-400' 
                : 'bg-slate-950/80 text-slate-200 rounded-tl-none border-slate-800'
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-5 animate-pulse">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center">
              <Bot className="w-6 h-6 text-slate-600" />
            </div>
            <div className="bg-slate-900/50 p-6 rounded-[2rem] rounded-tl-none border border-slate-800 w-32 flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Спросите о будущем экологии..."
          className="relative w-full bg-slate-900 border border-slate-800 rounded-2xl px-8 py-6 pr-24 text-slate-100 focus:ring-0 focus:border-indigo-500 outline-none transition-all font-bold text-lg"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all disabled:opacity-30 shadow-2xl flex items-center gap-2"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
