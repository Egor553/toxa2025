
import React, { useState } from 'react';
import { analyzeEcologicalState, getEnvironmentalAdvice } from '../services/geminiService';
import { NDVIResult } from '../types';
import { Search, Loader2, BookOpen, BarChart3, PieChart as PieIcon, LayoutGrid, Trees, Building2 } from 'lucide-react';
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
      setResults(prev => [data, ...prev].slice(0, 5));
      const aiAdvice = await getEnvironmentalAdvice(data);
      setAdvice(aiAdvice);
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tight">Эко-Аналитика</h2>
          <p className="text-slate-400 font-medium">Мониторинг баланса экосистемы и урбанизации.</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400" />
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-100 placeholder-slate-600 transition-all w-full md:w-64"
              placeholder="Введите город..."
            />
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-500 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-900/20 uppercase text-xs tracking-widest"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BarChart3 className="w-5 h-5" />}
            Анализ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {currentData ? (
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <BarChart3 className="w-48 h-48" />
              </div>

              <div className="flex items-center justify-between mb-12 relative z-10">
                <div>
                  <h3 className="text-3xl font-black text-slate-100 uppercase tracking-tighter">{currentData.city}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{currentData.healthStatus}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-black text-indigo-400 leading-none">{currentData.ndviValue.toFixed(2)}</div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">NDVI Score</div>
                </div>
              </div>

              {/* Расчет соотношения */}
              <div className="mb-12 space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">Баланс территории</h4>
                  <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[9px] font-black text-indigo-400 uppercase tracking-widest">Calculated by Gemini AI</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                    <Trees className="w-6 h-6 text-emerald-500" />
                    <div>
                      <div className="text-2xl font-black text-emerald-400 leading-none">{greenRatio}%</div>
                      <div className="text-[8px] font-black text-emerald-600 uppercase mt-1 tracking-wider">Растительность</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-800/20 rounded-2xl border border-slate-800">
                    <Building2 className="w-6 h-6 text-slate-500" />
                    <div>
                      <div className="text-2xl font-black text-slate-300 leading-none">{urbanRatio}%</div>
                      <div className="text-[8px] font-black text-slate-600 uppercase mt-1 tracking-wider">Застройка</div>
                    </div>
                  </div>
                </div>

                <div className="h-4 w-full bg-slate-800/50 rounded-full overflow-hidden flex ring-4 ring-slate-950 shadow-2xl">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000 ease-out relative shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                    style={{ width: `${greenRatio}%` }} 
                  >
                    <div className="absolute inset-0 bg-white/10 animate-shimmer" style={{ backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
                  </div>
                  <div className="h-full bg-slate-700" style={{ width: `${urbanRatio}%` }} />
                </div>
              </div>

              <div className="h-64 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData.historicalTrend?.map((val, i) => ({ year: 2020 + i, val })) || []}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="year" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#475569" fontSize={10} domain={[0, 1]} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
                      itemStyle={{ color: '#818cf8', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase' }}
                    />
                    <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="h-[500px] bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-slate-500">
              <LayoutGrid className="w-16 h-16 mb-4 opacity-5" />
              <p className="font-black uppercase tracking-[4px] text-[10px]">Ожидание ввода данных</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
            <div className="absolute -top-6 -right-6 p-4 opacity-10 group-hover:rotate-12 transition-transform">
               <PieIcon className="w-32 h-32" />
            </div>
            <h3 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter">
              <BookOpen className="w-5 h-5" />
              AI Резюме
            </h3>
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-3 bg-white/20 rounded-full w-3/4"></div>
                <div className="h-3 bg-white/20 rounded-full w-full"></div>
                <div className="h-3 bg-white/20 rounded-full w-2/3"></div>
              </div>
            ) : advice ? (
              <div className="text-sm leading-relaxed text-indigo-50 font-bold space-y-4">
                {advice.split('. ').map((point, idx) => (
                  <p key={idx} className="border-l-2 border-white/20 pl-4">{point}</p>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-indigo-100 opacity-60 leading-relaxed uppercase font-black tracking-widest">
                Выберите город и нажмите кнопку анализа для получения рекомендаций по озеленению.
              </p>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-6 shadow-xl">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[4px]">Журнал событий</h4>
            <div className="space-y-3">
              {results.slice(1).map((r, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-tight group-hover:text-slate-100 transition-colors">{r.city}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">{r.ndviValue.toFixed(2)}</span>
                  </div>
                </div>
              ))}
              {results.length <= 1 && (
                <div className="text-center py-12">
                   <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest">История пуста</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
