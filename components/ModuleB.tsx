
import React, { useState } from 'react';
import { analyzeEcologicalState, getEnvironmentalAdvice } from '../services/geminiService';
import { NDVIResult } from '../types';
import { Search, Loader2, BookOpen, BarChart3, Trees, Building2, Info, LayoutGrid } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ModuleB: React.FC = () => {
  const [city, setCity] = useState('Троицк');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<NDVIResult[]>([]);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!city) return;
    setLoading(true);
    setAdvice(null);
    try {
      const data = await analyzeEcologicalState(city);
      setResults(prev => [data, ...prev].filter((v, i, a) => a.findIndex(t => t.city === v.city) === i).slice(0, 5));
      const staticAdvice = await getEnvironmentalAdvice(data);
      setAdvice(staticAdvice);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const currentData = results[0];
  const greenRatio = currentData ? Math.round(currentData.percentage) : 0;
  const urbanRatio = currentData ? 100 - greenRatio : 0;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20 md:pb-24">
      {/* Шапка аналитики */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-slate-100 uppercase tracking-tight">Эко-Аналитика РФ</h2>
          <p className="text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">Локальный мониторинг NDVI.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <div className="relative group flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400" />
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-100 placeholder-slate-600 transition-all font-bold text-sm"
              placeholder="Введите город..."
            />
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20 uppercase text-[10px] md:text-xs tracking-widest active:scale-95"
          >
            {loading ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />}
            Анализ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8 space-y-6">
          {currentData ? (
            <div className="bg-slate-900/50 border border-slate-800 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 hidden sm:block">
                <BarChart3 className="w-48 h-48" />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 relative z-10 gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-100 uppercase tracking-tighter">{currentData.city}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${greenRatio > 50 ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    <p className="text-slate-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest">{currentData.healthStatus}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-4xl md:text-5xl font-black text-indigo-400 leading-none tracking-tighter">{currentData.ndviValue.toFixed(2)}</div>
                  <div className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">NDVI Score</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 md:mb-12 relative z-10">
                <div className="flex items-center gap-4 p-4 md:p-5 bg-emerald-500/5 rounded-2xl md:rounded-3xl border border-emerald-500/10">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                    <Trees className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-emerald-400 leading-none">{greenRatio}%</div>
                    <div className="text-[8px] md:text-[9px] font-black text-emerald-600/60 uppercase mt-1 tracking-wider">Лес</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 md:p-5 bg-slate-800/20 rounded-2xl md:rounded-3xl border border-slate-800">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 md:w-6 md:h-6 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-slate-300 leading-none">{urbanRatio}%</div>
                    <div className="text-[8px] md:text-[9px] font-black text-slate-600 uppercase mt-1 tracking-wider">Город</div>
                  </div>
                </div>
              </div>

              <div className="h-48 md:h-64 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData.historicalTrend?.map((val, i) => ({ year: 2020 + i, val })) || []}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="year" stroke="#475569" fontSize={9} axisLine={false} tickLine={false} />
                    <YAxis stroke="#475569" fontSize={9} domain={[0, 1]} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                    />
                    <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="h-[200px] bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center text-slate-500 group hover:border-emerald-500/30 transition-all p-6 text-center">
              <LayoutGrid className="w-8 h-8 md:w-10 md:h-10 mb-4 opacity-5 group-hover:opacity-10 transition-opacity" />
              <p className="font-black uppercase tracking-[2px] md:tracking-[4px] text-[8px] md:text-[9px]">Введите название города для запуска системы анализа</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-indigo-600 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-white/10">
            <h3 className="text-lg md:text-xl font-black mb-4 md:mb-6 flex items-center gap-3 uppercase tracking-tighter">
              <BookOpen className="w-5 h-5" />
              Рекомендации
            </h3>
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-2.5 bg-white/20 rounded-full w-3/4"></div>
                <div className="h-2.5 bg-white/20 rounded-full w-full"></div>
                <div className="h-2.5 bg-white/20 rounded-full w-5/6"></div>
              </div>
            ) : advice ? (
              <div className="text-xs md:text-sm leading-relaxed text-indigo-50 font-bold space-y-4">
                <p className="border-l-2 md:border-l-4 border-white/30 pl-4 py-1">{advice}</p>
                <div className="pt-4 border-t border-white/10 flex items-start gap-2 text-[8px] md:text-[10px] uppercase font-black opacity-60">
                  <Info className="w-3 h-3 md:w-3.5 md:h-3.5" /> Актуально: 2025
                </div>
              </div>
            ) : (
              <p className="text-[8px] md:text-[10px] text-indigo-100 opacity-60 leading-relaxed uppercase font-black tracking-widest">
                Ожидание данных для генерации отчета...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
