
import React, { useState } from 'react';
import { ModuleType } from './types';
import { NAV_ITEMS, RECYCLING_POINTS } from './constants';
import { ModuleA } from './components/ModuleA';
import { ModuleB } from './components/ModuleB';
import { ModuleC } from './components/ModuleC';
import { ModuleAssistant } from './components/ModuleAssistant';
import { Sparkles, GraduationCap, Info, X, ExternalLink, BarChart, Database, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>('retrospective');
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case 'retrospective': return <ModuleA />;
      case 'analyzer': return <ModuleB />;
      case 'recycling': return <ModuleC />;
      case 'assistant': return <ModuleAssistant />;
      default: return <ModuleA />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
      {/* About Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-[2rem] md:rounded-[3rem] shadow-2xl p-6 md:p-12 relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
              <button onClick={() => setIsAboutOpen(false)} className="p-2 md:p-3 bg-slate-800 hover:bg-slate-700 rounded-xl md:rounded-2xl text-slate-400 hover:text-white transition-all">
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            
            <div className="space-y-6 md:space-y-8 overflow-y-auto pr-2 scrollbar-hide">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-600 rounded-xl md:rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-emerald-900/40 shrink-0">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">О проекте</h2>
                  <p className="text-emerald-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-0.5 md:mt-1">Зеленый Навигатор v2.0</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-slate-300 font-bold leading-relaxed text-xs md:text-sm">
                  Геоинформационная система для мониторинга лесных экосистем г. Троицка. Мы используем снимки Landsat и Sentinel-2 для анализа динамики озеленения.
                </p>

                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <div className="bg-slate-950 border border-slate-800 p-3 md:p-5 rounded-2xl md:rounded-3xl text-center">
                    <Database className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 mx-auto mb-2" />
                    <div className="text-lg md:text-2xl font-black text-white leading-none">40+</div>
                    <div className="text-[7px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Лет данных</div>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 md:p-5 rounded-2xl md:rounded-3xl text-center">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-indigo-500 mx-auto mb-2" />
                    <div className="text-lg md:text-2xl font-black text-white leading-none">{RECYCLING_POINTS.length}</div>
                    <div className="text-[7px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Объектов</div>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 md:p-5 rounded-2xl md:rounded-3xl text-center">
                    <BarChart className="w-4 h-4 md:w-5 md:h-5 text-amber-500 mx-auto mb-2" />
                    <div className="text-lg md:text-2xl font-black text-white leading-none">5</div>
                    <div className="text-[7px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Миссий</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 md:p-6 bg-slate-950 rounded-2xl md:rounded-3xl border border-slate-800">
                    <h4 className="text-[8px] md:text-[10px] font-black text-emerald-400 uppercase mb-3 tracking-widest">Инструкция</h4>
                    <ul className="text-[10px] md:text-xs text-slate-400 space-y-2 font-bold">
                      <li className="flex items-start gap-2">• Слайдер в «Истории» для сравнения лет.</li>
                      <li className="flex items-start gap-2">• Маркеры на карте - пункты вторсырья.</li>
                    </ul>
                  </div>
                  <div className="p-4 md:p-6 bg-slate-950 rounded-2xl md:rounded-3xl border border-slate-800">
                    <h4 className="text-[8px] md:text-[10px] font-black text-indigo-400 uppercase mb-3 tracking-widest">Разработчик</h4>
                    <p className="text-[10px] md:text-xs text-slate-100 font-black mb-1">Токарев Егор</p>
                    <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase">9 «И» класс</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsAboutOpen(false)}
                className="w-full py-4 md:py-5 bg-emerald-600 text-white font-black rounded-xl md:rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20 uppercase tracking-[0.2em] text-[10px] md:text-xs mt-auto"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:flex flex-col w-80 bg-slate-900 border-r border-slate-800 p-8 sticky top-0 h-screen overflow-y-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter uppercase leading-none text-emerald-400">Зеленый<br/>Навигатор</h1>
            </div>
          </div>

          <nav className="flex-1 space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id as ModuleType)}
                className={`group w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left border ${
                  activeModule === item.id 
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-900/30' 
                    : 'border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className={`${activeModule === item.id ? 'text-white' : 'text-slate-600 group-hover:text-emerald-400'}`}>
                  {item.icon}
                </div>
                <div className="font-black text-xs uppercase tracking-widest">{item.label}</div>
              </button>
            ))}
            
            <button
              onClick={() => setIsAboutOpen(true)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-all mt-4"
            >
              <Info className="w-5 h-5" />
              <div className="font-black text-xs uppercase tracking-widest">О проекте</div>
            </button>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 lg:p-12 pb-32 lg:pb-12 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 flex justify-between items-center px-4 py-3 z-[2000] pb-safe-area shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id as ModuleType)}
            className={`flex flex-col items-center gap-1 transition-all flex-1 py-1 ${
              activeModule === item.id ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${activeModule === item.id ? 'bg-emerald-500/10 scale-110' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => setIsAboutOpen(true)}
          className="flex flex-col items-center gap-1 transition-all flex-1 py-1 text-indigo-400"
        >
          <div className="p-2 rounded-xl bg-indigo-500/10">
            <Info className="w-5 h-5" />
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest">Проект</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
