
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ImageOverlay, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Maximize2, Loader2, Info, AlertCircle } from 'lucide-react';

// Используем Esri Satellite для максимальной скорости и детализации
const SATELLITE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const SATELLITE_ATTR = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community';

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

  // Сброс ошибки при смене слоев
  useEffect(() => {
    setError(null);
  }, [leftLayer.url, rightLayer.url]);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] lg:h-[700px] bg-slate-950 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl group select-none transition-all">
      {!isLoaded && !error && (
        <div className="absolute inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 p-4 text-center">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Загрузка данных со спутника...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-[110] bg-slate-900 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-rose-500" />
          <p className="text-sm font-bold text-slate-200 uppercase tracking-tight">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-colors"
          >
            Перезагрузить
          </button>
        </div>
      )}

      {/* Контейнер правой карты (ОСНОВНОЙ СЛОЙ) */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <MapContainer 
          center={mapState.center} 
          zoom={mapState.zoom} 
          className="h-full w-full" 
          zoomControl={false}
          attributionControl={false}
          style={{ background: '#020617' }}
          whenReady={() => setIsLoaded(true)}
        >
          {rightLayer.isModern ? (
            <TileLayer url={SATELLITE_URL} attribution={SATELLITE_ATTR} />
          ) : (
             <ImageOverlay 
              url={rightLayer.url} 
              bounds={rightLayer.bounds!} 
              opacity={1} 
              zIndex={10} 
              eventHandlers={{ error: () => setError("Слой 2025 временно недоступен") }}
            />
          )}
          <MapSync onMove={handleMapMove} center={mapState.center} zoom={mapState.zoom} />
        </MapContainer>
      </div>

      {/* Контейнер левой карты (СЛОЙ НАЛОЖЕНИЯ С ОБРЕЗКОЙ) */}
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
            style={{ background: '#020617' }}
          >
            {leftLayer.isModern ? (
              <TileLayer url={SATELLITE_URL} attribution={SATELLITE_ATTR} />
            ) : (
               <ImageOverlay 
                url={leftLayer.url} 
                bounds={leftLayer.bounds!} 
                opacity={1} 
                zIndex={10}
                eventHandlers={{ error: () => setError(`Слой ${leftLayer.label} не прогрузился`) }}
              />
            )}
            <MapSync onMove={handleMapMove} center={mapState.center} zoom={mapState.zoom} />
          </MapContainer>
        </div>
      </div>

      {/* Ярлыки временных периодов */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50 pointer-events-none">
        <div className="bg-emerald-600/90 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-2xl border border-white/10 backdrop-blur-xl">
           {leftLayer.label}
        </div>
      </div>
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50 pointer-events-none">
        <div className="bg-slate-900/90 text-slate-300 px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-slate-700 shadow-2xl backdrop-blur-xl">
           {rightLayer.label}
        </div>
      </div>

      {/* Вертикальный разделитель */}
      <div 
        className="absolute top-0 bottom-0 z-50 w-1 bg-emerald-500 pointer-events-none shadow-[0_0_20px_rgba(16,185,129,0.5)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-emerald-600 rounded-full border-4 border-slate-950 flex items-center justify-center shadow-2xl">
           <Maximize2 className="w-4 h-4 md:w-6 md:h-6 text-white rotate-90" />
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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[55] flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 shadow-2xl">
         <Info className="w-3 h-3 text-emerald-500" />
         <span className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Двигайте слайдер для анализа</span>
      </div>
    </div>
  );
};
