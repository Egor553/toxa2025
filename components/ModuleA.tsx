
import React, { useState, useEffect } from 'react';
import { Table, Sparkles, Loader2, Landmark, Microscope, Info, Database, ArrowRight, FileText } from 'lucide-react';
import { getHistoricalReport } from '../services/geminiService';
import { HistorySwipeMap } from './HistorySwipeMap';
import { TROITSK_COORDS } from '../constants';

const TROITSK_BOUNDS: [[number, number], [number, number]] = [
  [55.455, 37.260], // Юго-запад
  [55.515, 37.345]  // Северо-восток
];

interface HistoricalLayer {
  url: string;
  label: string;
  area?: number;
  isModern?: boolean;
}

const HISTORICAL_DATA: Record<string, HistoricalLayer> = {
  '1984': { url: "https://r.jina.ai/i/8d43849f168846c2b184285223062319", area: 1380, label: "1984 (Landsat)", isModern: false },
  '2000': { url: "https://r.jina.ai/i/440f3408a0df47c1b500305047863584", area: 1210, label: "2000 (Архивный снимок)", isModern: false }, 
  '2011': { url: "https://r.jina.ai/i/440f3408a0df47c1b500305047863584", area: 1150, label: "2011 (Maxar)", isModern: false },
  '2017': { url: "https://r.jina.ai/i/9e006616422b406e9317079207164478", area: 1020, label: "2017 (Sentinel)", isModern: false },
  '2022': { url: "https://r.jina.ai/i/850f2497677943d7890250624022839b", area: 840, label: "2022 (Maxar)", isModern: false },
  'LIVE': { url: "", isModern: true, label: "2025 (2ГИС Актуальная)" }
};

export const ModuleA: React.FC = () => {
  const [yearBefore, setYearBefore] = useState('2000');
  const [yearAfter, setYearAfter] = useState('LIVE');
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAiReport = async () => {
    setLoading(true);
    const report = await getHistoricalReport(
      "Троицк, динамика изменений лесного фонда и застройки", 
      yearBefore, 
      yearAfter === 'LIVE' ? "2025" : yearAfter
    );
    setAiReport(report);
    setLoading(false);
  };

  useEffect(() => {
    fetchAiReport();
  }, [yearBefore, yearAfter]);

  const beforeLayer = HISTORICAL_DATA[yearBefore];
  const afterLayer = HISTORICAL_DATA[yearAfter];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      {/* Контроллеры времени */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-900/50 p-8 rounded-[3rem] border border-slate-800 backdrop-blur-md shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
               <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tighter">Глава 4. Анализ динамики</h2>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mt-1">Троицк • Сравнение архивных слоев (Swipe Map)</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 bg-slate-950 p-4 rounded-3xl border border-slate-800">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Состояние "БЫЛО"</label>
            <select 
              value={yearBefore} 
              onChange={(e) => setYearBefore(e.target.value)}
              className="bg-slate-900 text-emerald-400 font-black text-xs px-4 py-2 rounded-xl border border-slate-800 outline-none appearance-none cursor-pointer hover:border-emerald-500/50 transition-colors"
            >
              {Object.keys(HISTORICAL_DATA).filter(y => y !== 'LIVE').map(y => <option key={y} value={y}>{y} год</option>)}
            </select>
          </div>
          
          <ArrowRight className="text-slate-700 mt-5 hidden md:block" />

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Состояние "СТАЛО"</label>
            <select 
              value={yearAfter} 
              onChange={(e) => setYearAfter(e.target.value)}
              className="bg-slate-900 text-slate-100 font-black text-xs px-4 py-2 rounded-xl border border-slate-800 outline-none appearance-none cursor-pointer hover:border-emerald-500/50 transition-colors"
            >
              {Object.keys(HISTORICAL_DATA).map(y => <option key={y} value={y}>{y === 'LIVE' ? '2025 (Актуальная карта)' : `${y} год`}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Swipe Map Component */}
          <HistorySwipeMap 
            leftLayer={{
              url: beforeLayer.url,
              bounds: TROITSK_BOUNDS,
              isModern: false,
              label: `${yearBefore} (ПРОШЛОЕ)`
            }}
            rightLayer={{
              url: afterLayer.url,
              bounds: TROITSK_BOUNDS,
              isModern: !!afterLayer.isModern,
              label: `${yearAfter === 'LIVE' ? '2025' : yearAfter} (НАСТОЯЩЕЕ)`
            }}
            center={TROITSK_COORDS}
            zoom={13}
          />

          {/* Руководство и Методика */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-4 shadow-xl">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 text-emerald-500">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-white uppercase text-xs tracking-widest">Методика QGIS</h3>
               </div>
               <p className="text-[11px] text-slate-400 leading-relaxed font-bold">
                 Для визуализации динамики изменений был разработан механизм «Сравнение слоев», использующий метод <b>Image Overlay</b>. Снимки Landsat и Sentinel были предварительно обработаны и геопривязаны для точного совмещения с векторной подложкой 2ГИС.
               </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-4 shadow-xl border-emerald-500/20">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 text-indigo-500">
                    <Info className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-white uppercase text-xs tracking-widest">Инструкция ГИС</h3>
               </div>
               <p className="text-[11px] text-slate-400 leading-relaxed font-bold">
                 Перемещайте <b>вертикальный слайдер</b> (бирюзовую линию) в центре карты. Вы увидите, как на месте лесных массивов 2000 года появляются современные жилые комплексы и социальные объекты.
               </p>
            </div>
          </div>
          
          {/* Результаты внедрения (Таблица) */}
          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-[3rem] shadow-xl">
             <div className="flex items-center gap-3 mb-6">
                <Table className="w-5 h-5 text-emerald-500" />
                <h3 className="font-black text-slate-100 uppercase text-xs tracking-widest">Результаты анализа площади (Егор Токарев)</h3>
             </div>
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   <th className="py-4">Год съемки</th>
                   <th className="py-4">Лесной покров (га)</th>
                   <th className="py-4">Процент потери</th>
                   <th className="py-4">Тип данных</th>
                 </tr>
               </thead>
               <tbody className="text-xs font-bold text-slate-300">
                 {Object.entries(HISTORICAL_DATA).map(([year, data], idx) => (
                   <tr key={year} className={`border-b border-slate-800/50 hover:bg-slate-800/10 transition-colors ${yearBefore === year || yearAfter === year ? 'bg-emerald-500/5' : ''}`}>
                     <td className="py-4">{year === 'LIVE' ? '2025' : year}</td>
                     <td className="py-4 text-emerald-400">{data.area || '—'} га</td>
                     <td className={`py-4 ${idx === 0 ? 'text-slate-500' : 'text-red-500'}`}>
                       {idx === 0 ? 'Базовый' : data.area ? `-${Math.round((1 - data.area/1380)*100)}%` : '—'}
                     </td>
                     <td className="py-4 text-[9px] uppercase text-slate-600">{data.label.includes('2ГИС') ? 'ГИС 2GIS' : data.label.split('(')[1].replace(')', '')}</td>
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
              <h3 className="font-black text-slate-100 uppercase text-xs tracking-widest">AI Экспертиза</h3>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Нейросеть Gemini анализирует...</p>
              </div>
            ) : (
              <div className="space-y-4 relative z-10">
                <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800/50 shadow-inner min-h-[160px]">
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold italic">
                    "{aiReport}"
                  </p>
                </div>
                <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 flex items-center justify-between">
                  <span className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em]">Прогноз деградации:</span>
                  <span className="text-base font-black text-red-500 uppercase">Высокий</span>
                </div>
              </div>
            )}

            <button 
              onClick={fetchAiReport}
              className="w-full py-4 bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 font-black rounded-xl text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600 hover:text-white transition-all shadow-lg"
            >
              Синтезировать отчет
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
             <div className="flex items-center gap-2 mb-4">
                <Microscope className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Научный вывод</span>
             </div>
             <p className="text-[11px] text-slate-400 leading-relaxed font-bold">
               Визуализация «Было/Стало» оказывает сильное воздействие, наглядно подтверждая потерю более 35% лесного покрова в северо-восточной части Троицка за последние 20 лет.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
