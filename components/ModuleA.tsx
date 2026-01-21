
import React, { useState, useEffect } from 'react';
import { Table, Sparkles, Loader2, Landmark, Microscope, Info, Database } from 'lucide-react';
import { getHistoricalReport } from '../services/geminiService';
import { HistorySwipeMap } from './HistorySwipeMap';
import { TROITSK_COORDS } from '../constants';

const TROITSK_BOUNDS: [[number, number], [number, number]] = [
  [55.455, 37.260], // Юго-запад
  [55.515, 37.345]  // Северо-восток
];

const HISTORICAL_DATA = {
  '1984': { url: "https://r.jina.ai/i/8d43849f168846c2b184285223062319", area: 1380, label: "1984 (Landsat)" },
  '2011': { url: "https://r.jina.ai/i/440f3408a0df47c1b500305047863584", area: 1150, label: "2011 (Maxar)" },
  '2017': { url: "https://r.jina.ai/i/9e006616422b406e9317079207164478", area: 1020, label: "2017 (Sentinel)" },
  '2022': { url: "https://r.jina.ai/i/850f2497677943d7890250624022839b", area: 840, label: "2022 (Maxar)" }
};

export const ModuleA: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('1984');
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAiReport = async () => {
    setLoading(true);
    const report = await getHistoricalReport(
      "Троицк, динамика лесов, вырубка под школу и ЖК Солнечный", 
      selectedYear, 
      "2026 (Live)"
    );
    setAiReport(report);
    setLoading(false);
  };

  useEffect(() => {
    fetchAiReport();
  }, [selectedYear]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-900/50 p-8 rounded-[3rem] border border-slate-800 backdrop-blur-md shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
               <Landmark className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tighter">История трансформации</h2>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mt-1">Метод наложения растровых слоев (Swipe Map)</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-2xl border border-slate-800 shadow-inner">
          <span className="text-[9px] font-black text-slate-600 uppercase ml-3 tracking-widest">Архивный слой:</span>
          <div className="flex gap-1">
            {Object.keys(HISTORICAL_DATA).map(year => (
              <button 
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-5 py-2.5 rounded-xl text-[11px] font-black transition-all ${selectedYear === year ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Swipe Map Component */}
          <HistorySwipeMap 
            historicalImageUrl={HISTORICAL_DATA[selectedYear as keyof typeof HISTORICAL_DATA].url}
            bounds={TROITSK_BOUNDS}
            center={TROITSK_COORDS}
            zoom={13}
          />

          {/* Methodology Info Card */}
          <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] space-y-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Database className="w-40 h-40" />
             </div>
             <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                  <Microscope className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Методика исследования</h3>
             </div>
             <p className="text-sm text-slate-400 leading-relaxed font-bold relative z-10">
               Для визуализации динамики изменений был разработан модуль «История», использующий <span className="text-emerald-400">2GIS Maps SDK</span> для отображения актуальной застройки и метод наложения растровых слоев (Image Overlay) для архивных данных. Это позволило добиться точного совмещения границ вырубок прошлых лет с современной картой города.
             </p>
          </div>

          {/* Stats Table */}
          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
             <div className="flex items-center gap-3 mb-6">
                <Table className="w-5 h-5 text-emerald-500" />
                <h3 className="font-black text-slate-100 uppercase text-xs tracking-widest">Таблица 2.2: Итоговые расчеты Егора Токарева</h3>
             </div>
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   <th className="py-4">Год</th>
                   <th className="py-4">Площадь леса (га)</th>
                   <th className="py-4">Динамика</th>
                   <th className="py-4">Источник</th>
                 </tr>
               </thead>
               <tbody className="text-xs font-bold text-slate-300">
                 {Object.entries(HISTORICAL_DATA).map(([year, data], idx) => (
                   <tr key={year} className={`border-b border-slate-800/50 hover:bg-slate-800/10 transition-colors ${selectedYear === year ? 'bg-emerald-500/5' : ''}`}>
                     <td className="py-4">{year}</td>
                     <td className="py-4 text-emerald-400">{data.area} га</td>
                     <td className={`py-4 ${idx === 0 ? 'text-slate-500' : 'text-red-500'}`}>
                       {idx === 0 ? 'Базовый' : `-${Math.round((1 - data.area/1380)*100)}%`}
                     </td>
                     <td className="py-4 text-[9px] uppercase text-slate-600">{data.label.split('(')[1].replace(')', '')}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl space-y-6 relative overflow-hidden group">
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-100 uppercase text-xs tracking-widest">AI Сопоставление</h3>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Анализ снимков...</p>
              </div>
            ) : (
              <div className="space-y-4 relative z-10">
                <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800/50 shadow-inner min-h-[160px]">
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold italic">
                    "{aiReport}"
                  </p>
                </div>
                <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 flex flex-col gap-1">
                  <span className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em]">Статус экосистемы:</span>
                  <span className="text-lg font-black text-red-500 uppercase">Критическая трансформация</span>
                </div>
              </div>
            )}

            <button 
              onClick={fetchAiReport}
              className="w-full py-4 bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 font-black rounded-xl text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600 hover:text-white transition-all shadow-lg"
            >
              Пересчитать данные
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-4">
             <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Как пользоваться</span>
             </div>
             <p className="text-[11px] text-slate-400 leading-relaxed font-bold">
               1. Выберите <span className="text-emerald-400">архивный год</span> в верхней панели.<br/>
               2. Тяните <span className="text-emerald-400">центральный слайдер</span>, чтобы увидеть разницу между прошлым и настоящим.<br/>
               3. AI автоматически подготовит отчет на основе выбранных слоев.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
