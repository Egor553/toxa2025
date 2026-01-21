
import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { RECYCLING_POINTS } from '../constants';
import { RecyclingPoint } from '../types';
import { MapPin, Search, X, Map as MapIcon, ChevronRight, Globe, ChevronLeft, Recycle } from 'lucide-react';

const ITEMS_PER_PAGE = 4;
const DG_API_KEY = '27e355f4-05c3-46d8-86c6-03262619cdf4';

const createCustomIcon = (type: string, isActive: boolean) => {
  const colors: Record<string, string> = {
    plastic: '#10b981', paper: '#6366f1', batteries: '#f43f5e', glass: '#f59e0b',
  };
  const color = colors[type] || '#94a3b8';
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: ${isActive ? '36px' : '28px'}; height: ${isActive ? '36px' : '28px'}; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 0 15px ${color}80; transition: all 0.2s ease-out;"><div style="transform: rotate(45deg); color: white; font-size: 10px; font-weight: 900;">${type.charAt(0).toUpperCase()}</div></div>`,
    iconSize: [isActive ? 36 : 28, isActive ? 36 : 28],
    iconAnchor: [isActive ? 18 : 14, isActive ? 36 : 28]
  });
};

const MapEffects = ({ center, zoom = 10 }: { center: [number, number], zoom?: number }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom, { duration: 1.0 });
  }, [center, zoom, map]);
  return null;
};

export const ModuleC: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPoint, setSelectedPoint] = useState<RecyclingPoint | null>(null);
  const [mapState, setMapState] = useState({ center: [55.7558, 37.6173] as [number, number], zoom: 10 });
  const [currentPage, setCurrentPage] = useState(0);

  const filteredPoints = useMemo(() => {
    return RECYCLING_POINTS.filter(p => {
      const matchesSearch = p.address.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || p.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, activeFilter]);

  const totalPages = Math.ceil(filteredPoints.length / ITEMS_PER_PAGE);
  const paginatedPoints = filteredPoints.slice(
    currentPage * ITEMS_PER_PAGE, 
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tighter flex items-center gap-3">
            Эко-Логистика 2ГИС
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 tracking-widest uppercase">Live Map</span>
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Глобальная база пунктов переработки РФ.</p>
        </div>
        
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-100 placeholder-slate-600 transition-all font-black"
            placeholder="Поиск пункта..."
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
        <button 
          onClick={() => {setMapState({center: [61.5, 105.3], zoom: 3}); setSelectedPoint(null);}}
          className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 flex items-center gap-2"
        >
          <Globe className="w-3 h-3" /> Вся Россия
        </button>
        {['all', 'plastic', 'paper', 'glass', 'batteries'].map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${activeFilter === f ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-900/40' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-200'}`}>
            {f === 'all' ? 'Все' : f === 'plastic' ? 'Пластик' : f === 'paper' ? 'Бумага' : f === 'glass' ? 'Стекло' : 'Батарейки'}
          </button>
        ))}
      </div>

      <div className="relative flex-1 min-h-[500px] flex flex-col lg:flex-row gap-6">
        <div className="hidden lg:flex flex-col w-80 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden shrink-0 backdrop-blur-md shadow-2xl">
          <div className="p-6 border-b border-slate-800 bg-slate-900/80">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Recycle className="w-3 h-3 text-emerald-500" /> Объекты
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {paginatedPoints.map(p => (
              <button 
                key={p.id} 
                onClick={() => {setSelectedPoint(p); setMapState({center: p.coords, zoom: 15});}} 
                className={`w-full p-4 rounded-2xl text-left transition-all border ${selectedPoint?.id === p.id ? 'bg-emerald-600/10 border-emerald-500/50 shadow-lg' : 'bg-slate-950 border-slate-900 hover:border-slate-700'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${p.type === 'plastic' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>{p.type}</span>
                  <ChevronRight className={`w-3 h-3 ${selectedPoint?.id === p.id ? 'text-emerald-400' : 'text-slate-700'}`} />
                </div>
                <div className="font-black text-xs text-slate-200 mb-1 leading-tight">{p.name}</div>
                <div className="text-[9px] text-slate-500 flex items-center gap-1 font-bold truncate">
                  <MapPin className="w-2.5 h-2.5 text-emerald-500" /> {p.address}
                </div>
              </button>
            ))}
            {filteredPoints.length === 0 && (
              <div className="py-12 text-center opacity-30">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Пусто</p>
              </div>
            )}
          </div>
          
          <div className="p-6 border-t border-slate-800 bg-slate-900/80 flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Стр. {currentPage + 1} / {totalPages || 1}
              </span>
              <span className="text-[8px] font-black text-slate-600 uppercase bg-slate-950 px-2 py-1 rounded-md">{filteredPoints.length} пунтков</span>
            </div>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(p => p - 1)}
                className="flex-1 p-3 bg-slate-800 rounded-xl disabled:opacity-20 text-slate-400 hover:text-white flex items-center justify-center transition-all border border-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage(p => p + 1)}
                className="flex-[2] py-3 bg-emerald-600 text-white rounded-xl disabled:opacity-20 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40"
              >
                Дальше <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 relative bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl group">
          <MapContainer center={mapState.center} zoom={mapState.zoom} className="h-full w-full" zoomControl={false}>
            <TileLayer 
              url={`https://tile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1.1&key=${DG_API_KEY}`} 
              attribution='&copy; 2GIS' 
            />
            <MapEffects center={mapState.center} zoom={mapState.zoom} />
            {filteredPoints.map((p) => (
              <Marker 
                key={p.id} 
                position={p.coords} 
                icon={createCustomIcon(p.type, selectedPoint?.id === p.id)} 
                eventHandlers={{ click: () => {setSelectedPoint(p); setMapState({center: p.coords, zoom: 15});} }}
              >
                <Popup><div className="p-1 font-black text-xs">{p.name}</div></Popup>
              </Marker>
            ))}
          </MapContainer>

          {selectedPoint && (
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:w-96 bg-slate-950/95 backdrop-blur-2xl p-8 rounded-[3rem] border border-emerald-500/30 z-[1000] animate-in slide-in-from-bottom-5 shadow-2xl">
              <button onClick={() => setSelectedPoint(null)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white bg-slate-900 rounded-full transition-colors"><X className="w-4 h-4" /></button>
              
              <div className="flex gap-4 mb-6">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-inner">
                  <MapIcon className="text-emerald-400 w-7 h-7" />
                </div>
                <div className="pt-1">
                  <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">{selectedPoint.type}</div>
                  <h4 className="font-black text-slate-100 text-lg leading-tight tracking-tight">{selectedPoint.name}</h4>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-widest">Режим</p>
                  <p className="text-xs text-slate-300 font-bold">{selectedPoint.hours}</p>
                </div>
                
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-widest">Инфо</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{selectedPoint.description}</p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider truncate">{selectedPoint.address}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
