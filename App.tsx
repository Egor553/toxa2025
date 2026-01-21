
import React, { useState } from 'react';
import { ModuleType } from './types';
import { NAV_ITEMS } from './constants';
import { ModuleA } from './components/ModuleA';
import { ModuleB } from './components/ModuleB';
import { ModuleC } from './components/ModuleC';
import { ModuleAssistant } from './components/ModuleAssistant';
import { Sparkles, GraduationCap, Info, X, ExternalLink } from 'lucide-react';

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
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-[3rem] shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <button onClick={() => setIsAboutOpen(false)} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl text-slate-400 hover:text-white transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-emerald-900/40">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">О проекте</h2>
                  <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mt-1">Зеленый Навигатор v2.0</p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none space-y-6">
                <p className="text-slate-300 font-bold leading-relaxed">
                  Данная геоинформационная система разработана для мониторинга антропогенной нагрузки на лесные экосистемы г. Троицка. Мы используем исторические спутниковые снимки (Landsat, Sentinel-2) и современные картографические данные 2ГИС для анализа динамики озеленения.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800">
                    <h4 className="text-[10px] font-black text-emerald-400 uppercase mb-3 tracking-widest">Инструкция</h4>
                    <ul className="text-xs text-slate-400 space-y-2 font-bold">
                      <li className="flex items-start gap-2">• Используйте слайдер в «Истории» для сравнения 2000 и 2025 гг.</li>
                      <li className="flex items-start gap-2">• Зеленые маркеры — это пункты приема вторсырья в Троицке.</li>
                      <li className="flex items-start gap-2">• AI Гид ответит на вопросы по экологии ТиНАО.</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800">
                    <h4 className="text-[10px] font-black text-indigo-400 uppercase mb-3 tracking-widest">Разработчик</h4>
                    <p className="text-xs text-slate-100 font-black mb-1">Токарев Егор</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Ученик 9 «И» класса</p>
                    <p className="text-[9px] text-emerald-500/60 mt-4 flex items-center gap-1 uppercase font-black">
                      <ExternalLink className="w-3 h-3" /> ГИС-аналитик
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsAboutOpen(false)}
                className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20 uppercase tracking-[0.2em] text-xs"
              >
                Вернуться к системе
              </button>
            </div>
          </div>
        </div>
      )}

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
            
            <button
              onClick={() => setIsAboutOpen(true)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-all mt-4"
            >
              <Info className="w-5 h-5" />
              <div className="font-black text-xs uppercase tracking-widest">О проекте</div>
            </button>
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
        <button onClick={() => setIsAboutOpen(true)} className="p-2 text-slate-400">
          <Info className="w-5 h-5" />
        </button>
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
