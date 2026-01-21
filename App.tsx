
import React, { useState } from 'react';
import { ModuleType } from './types';
import { NAV_ITEMS } from './constants';
import { ModuleA } from './components/ModuleA';
import { ModuleB } from './components/ModuleB';
import { ModuleC } from './components/ModuleC';
import { ModuleAssistant } from './components/ModuleAssistant';
import { Sparkles, GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>('retrospective');

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
      <div className="flex flex-1">
        <aside className="hidden lg:flex flex-col w-80 bg-slate-900 border-r border-slate-800 p-8 sticky top-0 h-screen overflow-y-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter uppercase leading-none text-emerald-400">Зеленый<br/>Навигатор</h1>
            </div>
          </div>

          <div className="mb-10 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Автор проекта</span>
            </div>
            <p className="text-xs font-bold text-slate-200">Егор Токарев, 9И класс</p>
            <p className="text-[9px] text-slate-500 mt-1 leading-tight italic">«Динамика антропогенной трансформации лесного массива г. Троицка»</p>
          </div>

          <nav className="flex-1 space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id as ModuleType)}
                className={`group w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left border ${
                  activeModule === item.id 
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-900/30 translate-x-1' 
                    : 'border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className={`${activeModule === item.id ? 'text-white' : 'text-slate-600 group-hover:text-emerald-400'} transition-colors`}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-black text-xs uppercase tracking-widest">{item.label}</div>
                  <div className={`text-[10px] opacity-70 leading-tight transition-all duration-300 ${activeModule === item.id ? 'h-auto mt-1' : 'h-0 overflow-hidden opacity-0'}`}>
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 lg:p-12 pb-24 lg:pb-12 bg-slate-950">
          <div className="max-w-7xl mx-auto space-y-12">
            {renderModule()}
          </div>
        </main>
      </div>

      <header className="lg:hidden flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-[2000] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-sm uppercase tracking-tighter">Зеленый Навигатор</span>
        </div>
      </header>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex justify-around items-center px-4 py-3 z-[2000] pb-safe-area">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id as ModuleType)}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeModule === item.id ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${activeModule === item.id ? 'bg-emerald-500/10' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
