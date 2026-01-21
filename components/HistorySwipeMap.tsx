
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, ImageOverlay, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Maximize2, Loader2, Info } from 'lucide-react';

const DG_API_KEY = '27e355f4-05c3-46d8-86c6-03262619cdf4';

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
  
  const handleMapMove = (center: L.LatLng, zoom: number) => {
    setMapState({ center: [center.lat, center.lng], zoom });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(parseInt(e.target.value));
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[650px] bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl group select-none">
      {!isLoaded && (
        <div className="absolute inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center gap-4 p-4 text-center">
          <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 animate-spin" />
          <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Инициализация слоев...</p>
        </div>
      )}

      {/* Контейнер правой карты */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={mapState.center} 
          zoom={mapState.zoom} 
          className="h-full w-full" 
          zoomControl={false}
          whenReady={() => setIsLoaded(true)}
        >
          {rightLayer.isModern ? (
            <TileLayer url={`https://tile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1.1&key=${DG_API_KEY}`} attribution='&copy; 2GIS' />
          ) : (
             <>
               <TileLayer url={`https://tile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1.1&key=${DG_API_KEY}`} opacity={0.2} />
               <ImageOverlay url={rightLayer.url} bounds={rightLayer.bounds!} />
             </>
          )}
          <MapSync onMove={handleMapMove} center={mapState.center} zoom={mapState.zoom} />
        </MapContainer>
      </div>

      {/* Контейнер левой карты */}
      <div 
        className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div className="h-full w-full pointer-events-auto">
          <MapContainer 
            center={mapState.center} 
            zoom={mapState.zoom} 
            className="h-full w-full" 
            zoomControl={false}
            dragging={true}
            scrollWheelZoom={true}
          >
            {leftLayer.isModern ? (
              <TileLayer url={`https://tile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1.1&key=${DG_API_KEY}`} attribution='&copy; 2GIS' />
            ) : (
               <>
                 <TileLayer url={`https://tile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1.1&key=${DG_API_KEY}`} opacity={0.2} />
                 <ImageOverlay url={leftLayer.url} bounds={leftLayer.bounds!} />
               </>
            )}
            <MapSync onMove={handleMapMove} center={mapState.center} zoom={mapState.zoom} />
          </MapContainer>
        </div>
      </div>

      {/* Метки слоев - Уменьшены для мобильных */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50 pointer-events-none">
        <div className="bg-emerald-600 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-2xl text-[7px] md:text-[10px] font-black uppercase tracking-widest shadow-2xl border border-white/10 flex items-center gap-2 backdrop-blur-md">
           {leftLayer.label}
        </div>
      </div>
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 pointer-events-none">
        <div className="bg-slate-900/90 text-slate-300 px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-2xl text-[7px] md:text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border border-slate-700 shadow-2xl">
           {rightLayer.label}
        </div>
      </div>

      {/* Центральный разделитель */}
      <div 
        className="absolute top-0 bottom-0 z-50 w-0.5 md:w-1 bg-emerald-500 pointer-events-none shadow-[0_0_20px_rgba(16,185,129,0.8)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-14 md:h-14 bg-emerald-600 rounded-lg md:rounded-2xl border-2 md:border-4 border-slate-950 flex items-center justify-center shadow-2xl cursor-ew-resize active:scale-125 transition-transform">
           <Maximize2 className="w-4 h-4 md:w-6 md:h-6 text-white rotate-90" />
        </div>
      </div>

      {/* Невидимый инпут слайдера */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPos} 
        onChange={handleSliderChange}
        className="absolute inset-x-0 bottom-8 md:bottom-12 z-[60] opacity-0 cursor-ew-resize w-full h-12"
      />

      {/* Подсказка */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[55] flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-slate-800 pointer-events-none whitespace-nowrap">
         <Info className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-500" />
         <span className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Сравнение</span>
      </div>
    </div>
  );
};
