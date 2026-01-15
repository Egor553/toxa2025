
import React, { useState, useRef, useEffect } from 'react';
import { ecoAssistantChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2, Sparkles, Trash2 } from 'lucide-react';

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
      setMessages(prev => [...prev, { role: 'model', text: "Извините, возникла ошибка соединения с AI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="text-indigo-400" />
            Green AI Гид
          </h2>
          <p className="text-slate-400">Ваш персональный помощник по экологии и аналитике.</p>
        </div>
        <button 
          onClick={() => setMessages([])} 
          className="p-2 text-slate-500 hover:text-red-400 transition"
          title="Очистить чат"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl mb-4 overflow-y-auto p-6 space-y-6 shadow-inner"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Bot className="w-16 h-16 text-indigo-500 mb-2" />
            <div className="space-y-2">
              <p className="font-bold text-slate-200">Задайте мне любой вопрос</p>
              <p className="text-xs max-w-xs">"Как изменился лес в Троицке за 20 лет?" или "Куда сдать старые батарейки?"</p>
            </div>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              m.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800'
            }`}>
              {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-indigo-400" />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-900/20' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center animate-pulse">
              <Bot className="w-4 h-4 text-slate-500" />
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl rounded-tl-none border border-slate-700/50">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
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
          placeholder="Спросите AI..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 pr-16 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none shadow-xl transition-all"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors disabled:opacity-30"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
