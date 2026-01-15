
import React, { useState } from 'react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Info, Calendar, Map as MapIcon, Sparkles } from 'lucide-react';

const IMAGES = {
  1995: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
  2005: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200",
  2025: "https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&q=80&w=1200"
};

export const ModuleA: React.FC = () => {
  const [years, setYears] = useState({ before: '1995', after: '2025' });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tight">Ретроспектива</h2>
          <p className="text-slate-400">Сравнение спутниковых снимков Троицка в высоком разрешении.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-900 p-2 rounded-2xl border border-slate-800 shadow-xl">
          <div className="px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
            <label className="block text-[8px] font-black text-slate-600 uppercase tracking-[2px] mb-1">Снимок A</label>
            <select 
              value={years.before} 
              onChange={(e) => setYears({...years, before: e.target.value})}
              className="bg-transparent font-bold focus:outline-none text-indigo-400 text-sm appearance-none cursor-pointer"
            >
              <option value="1995">1995 ГОД</option>
              <option value="2005">2005 ГОД</option>
            </select>
          </div>
          <div className="text-slate-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </div>
          <div className="px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
            <label className="block text-[8px] font-black text-slate-600 uppercase tracking-[2px] mb-1">Снимок B</label>
            <select 
              value={years.after} 
              onChange={(e) => setYears({...years, after: e.target.value})}
              className="bg-transparent font-bold focus:outline-none text-indigo-400 text-sm appearance-none cursor-pointer"
            >
              <option value="2005">2005 ГОД</option>
              <option value="2025">2025 ГОД</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl flex gap-4 text-indigo-200">
        <div className="bg-indigo-600/20 p-2 rounded-lg h-fit">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold">Обнаружены критические изменения</p>
          <p className="text-xs opacity-70 leading-relaxed">
            В период с {years.before} по {years.after} отмечается значительное увеличение площади застройки. 
            Коэффициент лесистости в северных секторах снизился на 18%. Рекомендуется обратить внимание на сохранение защитных поясов.
          </p>
        </div>
      </div>

      <BeforeAfterSlider 
        beforeImg={IMAGES[years.before as keyof typeof IMAGES]} 
        afterImg={IMAGES[years.after as keyof typeof IMAGES]} 
        beforeLabel={years.before}
        afterLabel={years.after}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-indigo-400">
            <Calendar className="w-5 h-5" />
          </div>
          <h4 className="font-bold">Период анализа</h4>
          <p className="text-xs text-slate-500">Данные накоплены за 30 лет непрерывного спутникового мониторинга Троицкого округа.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-indigo-400">
            <MapIcon className="w-5 h-5" />
          </div>
          <h4 className="font-bold">Локализация</h4>
          <p className="text-xs text-slate-500">Привязка данных осуществляется по координатам 55.485°N 37.302°E с точностью до 10 метров.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold">Источник</h4>
          <p className="text-xs text-slate-500">Используются архивы программы Landsat и актуальные снимки группировки Sentinel-2 (ESA).</p>
        </div>
      </div>
    </div>
  );
};
