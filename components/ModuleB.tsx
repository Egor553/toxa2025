
import React, { useState } from 'react';
import { analyzeEcologicalState, getEnvironmentalAdvice } from '../services/geminiService';
import { NDVIResult } from '../types';
import { Search, Loader2, BookOpen, BarChart3, PieChart as PieIcon, LayoutGrid } from 'lucide-react';
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
  
  // Simulated ratios for "соотношение" request
  const greenRatio = currentData ? Math.round(currentData.percentage) : 0;
  const urbanRatio = 100 - greenRatio;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tight">Эко-Аналитика</h2>
          <p className="text-slate-400">Спутниковый мониторинг вегетации и застройки.</p>
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
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BarChart3 className="w-5 h-5" />}
            Анализ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {currentData ? (
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">{currentData.city}</h3>
                  <p className="text-slate-500 text-sm italic">Индекс состояния: {currentData.healthStatus}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-indigo-400">{currentData.ndviValue.toFixed(2)}</div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">NDVI Index</div>
                </div>
              </div>

              {/* Соотношение площадей */}
              <div className="mb-10 space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Растительность</div>
                  <div className="flex items-center gap-2">Застройка <div className="w-2 h-2 rounded-full bg-slate-600"></div></div>
                </div>
                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                    style={{ width: `${greenRatio}%` }} 
                  />
                  <div className="h-full bg-slate-600" style={{ width: `${urbanRatio}%` }} />
                </div>
                <div className="flex justify-between text-xl font-black tracking-tight">
                  <span className="text-emerald-400">{greenRatio}%</span>
                  <span className="text-slate-400">{urbanRatio}%</span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData.historicalTrend?.map((val, i) => ({ year: 2020 + i, val })) || []}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="year" stroke="#475569" fontSize={10} />
                    <YAxis stroke="#475569" fontSize={10} domain={[0, 1]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="h-[400px] bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500">
              <LayoutGrid className="w-16 h-16 mb-4 opacity-10" />
              <p className="font-bold uppercase tracking-widest text-xs">Данные не загружены</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-950/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
               <PieIcon className="w-24 h-24" />
            </div>
            <h3 className="text-lg font-black mb-4 flex items-center gap-2 uppercase tracking-tight">
              <BookOpen className="w-5 h-5" />
              AI Резюме
            </h3>
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
                <div className="h-4 bg-white/20 rounded w-full"></div>
                <div className="h-4 bg-white/20 rounded w-2/3"></div>
              </div>
            ) : advice ? (
              <p className="text-sm leading-relaxed text-indigo-50 font-medium">
                {advice}
              </p>
            ) : (
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed uppercase tracking-widest">
                Выберите город для генерации экологического отчета.
              </p>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[2px]">История запросов</h4>
            <div className="space-y-2">
              {results.slice(1).map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-slate-300">{r.city}</span>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">{r.ndviValue.toFixed(2)}</span>
                </div>
              ))}
              {results.length <= 1 && <p className="text-[10px] text-slate-600 text-center py-6 uppercase tracking-widest">Архив пуст</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
