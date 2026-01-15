
import React, { useState, useRef } from 'react';

interface Props {
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
}

export const BeforeAfterSlider: React.FC<Props> = ({ beforeImg, afterImg, beforeLabel, afterLabel }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl cursor-ew-resize select-none border border-slate-800 bg-slate-900"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <img src={afterImg} alt="After" className="absolute top-0 left-0 w-full h-full object-cover opacity-80" />
      
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden border-r-2 border-indigo-500 shadow-[4px_0_15px_rgba(99,102,241,0.5)]"
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src={beforeImg} 
          alt="Before" 
          className="absolute top-0 left-0 w-full h-full object-cover" 
          style={{ width: containerRef.current?.offsetWidth }} 
        />
        <div className="absolute top-4 left-4 bg-indigo-600/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
          {beforeLabel}
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-slate-800/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
        {afterLabel}
      </div>

      <div 
        className="absolute top-0 bottom-0 w-1 bg-indigo-500 flex items-center justify-center z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.8)] -ml-0.5 border-2 border-white/20 transition-transform hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 8 4 4-4 4M6 8l-4 4 4 4"/></svg>
        </div>
      </div>
    </div>
  );
};
