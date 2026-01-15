
import React, { useState, useRef, useEffect } from 'react';
import { ecoAssistantChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2, Sparkles, Trash2, Info } from 'lucide-react';

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
    setLoading(true);

    try {
      const response = await ecoAssistantChat(messages, input);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Система временно недоступна. Пожалуйста, попробуйте позже." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-250px)] flex flex-col max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="text-indigo-400" />
            Эко-Справка РФ
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Локальная база знаний без участия нейросетей.</p>
        </div>
        <button 
          onClick={() => setMessages([])} 
          className="p-2 text-slate-500 hover:text-red-400 transition"
          title="Очистить чат"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-center gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-[10px] text-indigo-200/60 font-medium leading-relaxed">
          Этот модуль работает в автономном режиме на базе ГОСТ и экологических регламентов РФ. Ответы формируются мгновенно из предустановленной базы знаний.
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 bg-slate-900/50 border border-slate-800 rounded-[2rem] mb-4 overflow-y-auto p-6 space-y-6 shadow-inner"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Bot className="w-16 h-16 text-indigo-500 mb-2" />
            <div className="space-y-2">
              <p className="font-bold text-slate-200 uppercase tracking-widest text-xs">Готов к работе</p>
              <p className="text-[10px] max-w-xs uppercase font-black text-slate-500 tracking-tighter">Спросите про NDVI, переработку пластика или экологию Троицка.</p>
            </div>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
              m.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700'
            }`}>
              {m.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-indigo-400" />}
            </div>
            <div className={`max-w-[80%] p-5 rounded-3xl text-sm leading-relaxed font-medium ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center animate-pulse">
              <Bot className="w-5 h-5 text-slate-500" />
            </div>
            <div className="bg-slate-800/50 p-5 rounded-3xl rounded-tl-none border border-slate-700/50">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ваш вопрос..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-5 pr-20 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none shadow-2xl transition-all font-medium"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors disabled:opacity-30 shadow-lg shadow-indigo-900/40"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
