
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, ImageOverlay, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Maximize2, Loader2 } from 'lucide-react';

const DG_API_KEY = '27e355f4-05c3-46d8-86c6-03262619cdf4';

interface Props {
  historicalImageUrl: string;
  bounds: L.LatLngBoundsExpression;
  center: [number, number];
  zoom: number;
}

// Компонент для управления состоянием карты извне
const MapSync = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const HistorySwipeMap: React.FC<Props> = ({ historicalImageUrl, bounds, center, zoom }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Обработка перемещения слайдера
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(parseInt(e.target.value));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[500px] md:min-h-[650px] bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl group"
    >
      {!isLoaded && (
        <div className="absolute inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Загрузка слоев 2ГИС...</p>
        </div>
      )}

      {/* Контейнер для двух карт. Мы используем одну карту с кастомным Pane для клиппинга, 
          но для максимальной надежности и эффекта "Swipe" лучше всего работают два наложенных MapContainer, 
          синхронизированных по состоянию. */}
      
      {/* Нижний слой: Современная карта 2ГИС */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={center} 
          zoom={zoom} 
          className="h-full w-full" 
          zoomControl={false}
          whenReady={() => setIsLoaded(true)}
        >
          <TileLayer 
            url={`https://tile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1.1&key=${DG_API_KEY}`} 
            attribution='&copy; 2GIS' 
          />
          <MapSync center={center} zoom={zoom} />
        </MapContainer>
      </div>

      {/* Верхний слой: Архивный снимок поверх 2ГИС (клиппированный) */}
      <div 
        className="absolute inset-0 z-10 overflow-hidden pointer-events-none transition-none"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <MapContainer 
          center={center} 
          zoom={zoom} 
          className="h-full w-full" 
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
        >
          {/* Мы отображаем ту же карту 2ГИС + Overlay, чтобы при свайпе 
              пользователь видел "прошлое на фоне сетки города" */}
          <TileLayer 
            url={`https://tile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1.1&key=${DG_API_KEY}`} 
            opacity={0.3} // Делаем современную карту подложкой для архива
          />
          <ImageOverlay 
            url={historicalImageUrl} 
            bounds={bounds} 
            opacity={1}
            zIndex={100}
          />
          <MapSync center={center} zoom={zoom} />
        </MapContainer>
      </div>

      {/* Метки слоев */}
      <div className="absolute top-8 left-8 z-50 pointer-events-none">
        <div className="bg-emerald-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl border border-white/10 flex items-center gap-2">
           <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
           Архивный снимок
        </div>
      </div>
      <div className="absolute top-8 right-8 z-50 pointer-events-none">
        <div className="bg-slate-900/90 text-slate-300 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border border-slate-700 shadow-2xl">
           2ГИС Современная
        </div>
      </div>

      {/* Слайдер (Swipe Control) */}
      <div className="absolute inset-x-0 bottom-12 z-[60] flex justify-center px-12">
        <div className="relative w-full max-w-2xl group/slider">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderPos} 
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-ew-resize accent-emerald-500 border border-slate-700/50 shadow-2xl"
          />
        </div>
      </div>

      {/* Визуальная линия разделителя */}
      <div 
        className="absolute top-0 bottom-0 z-50 w-1 bg-emerald-500 pointer-events-none shadow-[0_0_30px_rgba(16,185,129,0.6)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-emerald-600 rounded-[1.25rem] border-4 border-slate-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
           <Maximize2 className="w-5 h-5 text-white rotate-90" />
        </div>
      </div>

      {/* Градиенты для глубины */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/40"></div>
    </div>
  );
};
