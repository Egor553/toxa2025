
import React, { useState, useEffect } from 'react';
import { Table, Sparkles, Loader2, Landmark, Microscope, Info, Database, ArrowRight, FileText } from 'lucide-react';
import { getHistoricalReport } from '../services/geminiService';
import { HistorySwipeMap } from './HistorySwipeMap';
import { TROITSK_COORDS } from '../constants';

const TROITSK_BOUNDS: [[number, number], [number, number]] = [
  [55.455, 37.260], 
  [55.515, 37.345]  
];

interface HistoricalLayer {
  url: string;
  label: string;
  area?: number;
  isModern?: boolean;
}

const HISTORICAL_DATA: Record<string, HistoricalLayer> = {
  '1984': { url: "https://i.ibb.co/Xxd9KjH/1984-landsat.jpg", area: 1380, label: "1984 (Landsat)", isModern: false },
  '2000': { url: "https://i.ibb.co/hL4L8YJ/2000-archive.jpg", area: 1210, label: "2000 (Архив)", isModern: false }, 
  '2011': { url: "https://i.ibb.co/vYvHwLz/2011-maxar.jpg", area: 1150, label: "2011 (Maxar)", isModern: false },
  '2017': { url: "https://i.ibb.co/9V0Z1M2/2017-sentinel.jpg", area: 1020, label: "2017 (Sentinel)", isModern: false },
  '2022': { url: "https://i.ibb.co/Mh8yV6v/2022-maxar.jpg", area: 840, label: "2022 (Maxar)", isModern: false },
  'LIVE': { url: "", isModern: true, label: "2025 (Esri Satellite)" }
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
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20 md:pb-24">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 bg-slate-900/50 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-slate-800 backdrop-blur-md shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/40 shrink-0">
               <FileText className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tighter">Анализ динамики</h2>
              <p className="text-emerald-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-0.5 md:mt-1">Сравнение архивных слоев</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6 bg-slate-950 p-3 md:p-4 rounded-2xl md:rounded-3xl border border-slate-800 w-full lg:w-auto overflow-x-auto scrollbar-hide">
          <div className="space-y-1 min-w-[100px] flex-1">
            <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest ml-1">БЫЛО</label>
            <select 
              value={yearBefore} 
              onChange={(e) => setYearBefore(e.target.value)}
              className="w-full bg-slate-900 text-emerald-400 font-black text-[10px] md:text-xs px-3 py-2 rounded-xl border border-slate-800 outline-none appearance-none cursor-pointer"
            >
              {Object.keys(HISTORICAL_DATA).filter(y => y !== 'LIVE').map(y => <option key={y} value={y}>{y} год</option>)}
            </select>
          </div>
          
          <ArrowRight className="text-slate-700 mt-4 shrink-0 w-4 h-4" />

          <div className="space-y-1 min-w-[100px] flex-1">
            <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest ml-1">СТАЛО</label>
            <select 
              value={yearAfter} 
              onChange={(e) => setYearAfter(e.target.value)}
              className="w-full bg-slate-900 text-slate-100 font-black text-[10px] md:text-xs px-3 py-2 rounded-xl border border-slate-800 outline-none appearance-none cursor-pointer"
            >
              {Object.keys(HISTORICAL_DATA).map(y => <option key={y} value={y}>{y === 'LIVE' ? '2025' : `${y} год`}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          <HistorySwipeMap 
            leftLayer={{
              url: beforeLayer.url,
              bounds: TROITSK_BOUNDS,
              isModern: false,
              label: `${yearBefore}`
            }}
            rightLayer={{
              url: afterLayer.url,
              bounds: TROITSK_BOUNDS,
              isModern: !!afterLayer.isModern,
              label: `${yearAfter === 'LIVE' ? '2025' : yearAfter}`
            }}
            center={TROITSK_COORDS}
            zoom={13}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[2rem] space-y-3 shadow-xl">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 text-emerald-500 shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-white uppercase text-[10px] md:text-xs tracking-widest">Методика QGIS</h3>
               </div>
               <p className="text-[10px] md:text-[11px] text-slate-400 leading-relaxed font-bold">
                 Для визуализации динамики используется метод <b>Image Overlay</b>. Снимки Landsat и Sentinel прецизионно совмещены с подложкой.
               </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[2rem] space-y-3 shadow-xl border-emerald-500/20">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 text-indigo-500 shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-white uppercase text-[10px] md:text-xs tracking-widest">Инструкция ГИС</h3>
               </div>
               <p className="text-[10px] md:text-[11px] text-slate-400 leading-relaxed font-bold">
                 Перемещайте <b>вертикальный слайдер</b> в центре карты, чтобы выявить антропогенную трансформацию ландшафта.
               </p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl space-y-6 relative overflow-hidden group">
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-100 uppercase text-[10px] md:text-xs tracking-widest">AI Экспертиза</h3>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest tracking-tighter">Анализ нейросетью...</p>
              </div>
            ) : (
              <div className="space-y-4 relative z-10">
                <div className="p-5 md:p-6 bg-slate-950 rounded-2xl md:rounded-3xl border border-slate-800/50 shadow-inner min-h-[140px]">
                  <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed font-semibold italic">
                    "{aiReport}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
