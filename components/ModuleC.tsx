
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { RECYCLING_POINTS } from '../constants';
import { RecyclingPoint } from '../types';
import { MapPin, Search, X, Map as MapIcon, ChevronRight, Globe, ChevronLeft, Recycle, Filter, ChevronDown, Check } from 'lucide-react';

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
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<RecyclingPoint | null>(null);
  const [mapState, setMapState] = useState({ center: [55.7558, 37.6173] as [number, number], zoom: 10 });
  const [currentPage, setCurrentPage] = useState(0);
  const filterRef = useRef<HTMLDivElement>(null);

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

  // Закрытие меню фильтров при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalPages = Math.ceil(filteredPoints.length / ITEMS_PER_PAGE);
  const paginatedPoints = filteredPoints.slice(
    currentPage * ITEMS_PER_PAGE, 
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const filterOptions = [
    { id: 'plastic', label: 'Пластик', color: 'text-emerald-400' },
    { id: 'paper', label: 'Бумага', color: 'text-indigo-400' },
    { id: 'glass', label: 'Стекло', color: 'text-amber-400' },
    { id: 'batteries', label: 'Батарейки', color: 'text-rose-400' },
  ];

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-700 h-full flex flex-col pb-20 lg:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-slate-100 uppercase tracking-tighter flex items-center gap-3">
            Эко-Логистика
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 tracking-widest uppercase">Live Map</span>
          </h2>
          <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">База пунктов переработки РФ.</p>
        </div>
        
        <div className="relative group w-full md:w-80 lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 md:py-4 bg-slate-900 border border-slate-800 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-100 placeholder-slate-600 transition-all font-bold text-sm"
            placeholder="Поиск пункта..."
          />
        </div>
      </div>

      {/* Новая система фильтров */}
      <div className="flex items-center gap-2 shrink-0">
        <button 
          onClick={() => { setActiveFilter('all'); setIsFilterMenuOpen(false); }}
          className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${activeFilter === 'all' ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
        >
          Все
        </button>
        
        <div className="relative" ref={filterRef}>
          <button 
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${activeFilter !== 'all' ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
          >
            <Filter className="w-3.5 h-3.5" />
            {activeFilter === 'all' ? 'Категории' : filterOptions.find(o => o.id === activeFilter)?.label}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isFilterMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isFilterMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-[2000] p-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="grid grid-cols-1 gap-1">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setActiveFilter(opt.id); setIsFilterMenuOpen(false); }}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${activeFilter === opt.id ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 text-slate-400'}`}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest ${opt.color}`}>{opt.label}</span>
                    {activeFilter === opt.id && <Check className="w-4 h-4 text-emerald-500" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => {setMapState({center: [61.5, 105.3], zoom: 3}); setSelectedPoint(null);}}
          className="ml-auto px-4 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-200 flex items-center gap-2 transition-all"
        >
          <Globe className="w-3.5 h-3.5" /> <span className="hidden sm:inline">РФ</span>
        </button>
      </div>

      <div className="relative flex-1 min-h-[400px] md:min-h-[500px] flex flex-col lg:flex-row gap-6">
        <div className="hidden lg:flex flex-col w-72 xl:w-80 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden shrink-0 backdrop-blur-md shadow-2xl">
          <div className="p-6 border-b border-slate-800 bg-slate-900/80">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Recycle className="w-3 h-3 text-emerald-500" /> Объекты ({filteredPoints.length})
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
                  <MapPin className="w-2.5 h-2.5 text-emerald-500 shrink-0" /> {p.address}
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
              <span className="text-[8px] font-black text-slate-600 uppercase bg-slate-950 px-2 py-1 rounded-md">{filteredPoints.length}</span>
            </div>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(p => p - 1)}
                className="flex-1 p-3 bg-slate-800 rounded-xl disabled:opacity-20 text-slate-400 hover:text-white flex items-center justify-center transition-all border border-slate-700 active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage(p => p + 1)}
                className="flex-[2] py-3 bg-emerald-600 text-white rounded-xl disabled:opacity-20 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                Дальше <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 relative bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl group">
          <MapContainer 
            center={mapState.center} 
            zoom={mapState.zoom} 
            className="h-full w-full" 
            zoomControl={false}
            attributionControl={false}
          >
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
            <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:right-6 lg:left-auto lg:w-96 bg-slate-950/95 backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-emerald-500/30 z-[1000] animate-in slide-in-from-bottom-5 shadow-2xl">
              <button onClick={() => setSelectedPoint(null)} className="absolute top-6 right-6 md:top-8 md:right-8 p-2 text-slate-500 hover:text-white bg-slate-900 rounded-full transition-colors"><X className="w-3 h-3 md:w-4 md:h-4" /></button>
              
              <div className="flex gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-emerald-500/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-inner">
                  <MapIcon className="text-emerald-400 w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="pt-0.5 md:pt-1 overflow-hidden">
                  <div className="text-[8px] md:text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">{selectedPoint.type}</div>
                  <h4 className="font-black text-slate-100 text-sm md:text-lg leading-tight tracking-tight truncate">{selectedPoint.name}</h4>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="p-3 md:p-4 bg-slate-900/50 rounded-xl md:rounded-2xl border border-white/5">
                  <p className="text-[8px] md:text-[10px] text-slate-500 font-black uppercase mb-0.5 md:mb-1 tracking-widest">Режим</p>
                  <p className="text-[10px] md:text-xs text-slate-300 font-bold">{selectedPoint.hours}</p>
                </div>
                
                <div className="p-3 md:p-4 bg-slate-900/50 rounded-xl md:rounded-2xl border border-white/5">
                  <p className="text-[8px] md:text-[10px] text-slate-500 font-black uppercase mb-0.5 md:mb-1 tracking-widest">Инфо</p>
                  <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed font-medium line-clamp-3 md:line-clamp-none">{selectedPoint.description}</p>
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 shrink-0" />
                  <span className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-wider truncate">{selectedPoint.address}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
