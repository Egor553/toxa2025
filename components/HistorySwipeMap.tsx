
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ImageOverlay, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Maximize2, Loader2, Info, AlertCircle } from 'lucide-react';

// Используем OpenStreetMap - полностью бесплатный, быстрый и надежный сервис
const OSM_URL = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const OSM_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface MapSyncProps {
  onMove: (center: L.LatLng, zoom: number) => void;
  center: [number, number];
  zoom: number;
}

const MapSync = ({ onMove, center, zoom }: MapSyncProps) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom, { animate: false });
  }, [center, zoom, map]);

  useMapEvents({
    move: () => {
      onMove(map.getCenter(), map.getZoom());
    },
    zoom: () => {
      onMove(map.getCenter(), map.getZoom());
    }
  });

  return null;
};

interface Props {
  leftLayer: {
    url: string;
    bounds?: L.LatLngBoundsExpression;
    isModern: boolean;
    label: string;
  };
  rightLayer: {
    url: string;
    bounds?: L.LatLngBoundsExpression;
    isModern: boolean;
    label: string;
  };
  center: [number, number];
  zoom: number;
}

export const HistorySwipeMap: React.FC<Props> = ({ leftLayer, rightLayer, center: initialCenter, zoom: initialZoom }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [mapState, setMapState] = useState({ center: initialCenter, zoom: initialZoom });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleMapMove = (center: L.LatLng, zoom: number) => {
    setMapState({ center: [center.lat, center.lng], zoom });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(parseInt(e.target.value));
  };

  useEffect(() => {
    setError(null);
  }, [leftLayer.url, rightLayer.url]);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] lg:h-[700px] bg-slate-950 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl group select-none transition-all">
      {!isLoaded && !error && (
        <div className="absolute inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center gap-4 p-4 text-center">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Загрузка карт...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-[110] bg-slate-900 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-rose-500" />
          <p className="text-sm font-bold text-slate-200 uppercase tracking-tight">Ошибка загрузки архива</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-colors"
          >
            Обновить
          </button>
        </div>
      )}

      {/* Правая часть (Основная подложка) */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <MapContainer 
          center={mapState.center} 
          zoom={mapState.zoom} 
          className="h-full w-full" 
          zoomControl={false}
          attributionControl={false}
          whenReady={() => setIsLoaded(true)}
        >
          {rightLayer.isModern ? (
            <TileLayer 
              url={OSM_URL} 
              attribution={OSM_ATTR} 
              className="brightness-[0.8] contrast-[1.1] saturate-[1.5] hue-rotate-[5deg]" 
            />
          ) : (
             <ImageOverlay 
              url={rightLayer.url} 
              bounds={rightLayer.bounds!} 
              opacity={1} 
              zIndex={10} 
              eventHandlers={{ error: () => setError("Архив недоступен") }}
            />
          )}
          <MapSync onMove={handleMapMove} center={mapState.center} zoom={mapState.zoom} />
        </MapContainer>
      </div>

      {/* Левая часть (Слой наложения) */}
      <div 
        className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div className="h-full w-full pointer-events-auto bg-slate-950">
          <MapContainer 
            center={mapState.center} 
            zoom={mapState.zoom} 
            className="h-full w-full" 
            zoomControl={false}
            attributionControl={false}
            dragging={true}
            scrollWheelZoom={true}
          >
            {leftLayer.isModern ? (
              <TileLayer 
                url={OSM_URL} 
                attribution={OSM_ATTR} 
                className="brightness-[0.8] contrast-[1.1] saturate-[1.5] hue-rotate-[5deg]" 
              />
            ) : (
               <ImageOverlay 
                url={leftLayer.url} 
                bounds={leftLayer.bounds!} 
                opacity={1} 
                zIndex={10}
                eventHandlers={{ error: () => setError("Ошибка слоя") }}
              />
            )}
            <MapSync onMove={handleMapMove} center={mapState.center} zoom={mapState.zoom} />
          </MapContainer>
        </div>
      </div>

      {/* Ярлыки */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50 pointer-events-none">
        <div className="bg-emerald-600 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-2xl border border-white/10 backdrop-blur-md">
           {leftLayer.label}
        </div>
      </div>
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50 pointer-events-none">
        <div className="bg-slate-900 text-slate-300 px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-slate-700 shadow-2xl backdrop-blur-md">
           {rightLayer.label}
        </div>
      </div>

      <div 
        className="absolute top-0 bottom-0 z-50 w-0.5 bg-emerald-500 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-emerald-600 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-2xl">
           <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-white rotate-90" />
        </div>
      </div>

      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPos} 
        onChange={handleSliderChange}
        className="absolute inset-x-0 bottom-12 z-[60] opacity-0 cursor-ew-resize w-full h-16"
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[55] flex items-center gap-2 bg-slate-950/90 px-4 py-2 rounded-full border border-slate-800 shadow-2xl pointer-events-none">
         <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
         <span className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Анализ лесного фонда</span>
      </div>
    </div>
  );
};
