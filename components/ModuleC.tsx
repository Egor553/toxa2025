
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { RECYCLING_POINTS } from '../constants';
import { RecyclingPoint } from '../types';
import { MapPin, Search, X, Map as MapIcon, ChevronRight, Globe, ChevronLeft, Recycle, Filter, ChevronDown, Check } from 'lucide-react';

// OpenStreetMap Standard
const OSM_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const createCustomIcon = (type: string, isActive: boolean) => {
  const colors: Record<string, string> = {
    plastic: '#10b981', paper: '#6366f1', batteries: '#f43f5e', glass: '#f59e0b',
  };
  const color = colors[type] || '#94a3b8';
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: ${isActive ? '32px' : '24px'}; height: ${isActive ? '32px' : '24px'}; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 0 10px ${color}80;"><div style="transform: rotate(45deg); color: white; font-size: 8px; font-weight: 900;">${type.charAt(0).toUpperCase()}</div></div>`,
    iconSize: [isActive ? 32 : 24, isActive ? 32 : 24],
    iconAnchor: [isActive ? 16 : 12, isActive ? 32 : 24]
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ITEMS_PER_PAGE = 5;
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
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-700 h-full flex flex-col pb-24 lg:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-slate-100 uppercase tracking-tighter">Эко-Карта</h2>
          <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">База пунктов на базе OpenStreetMap.</p>
        </div>
        
        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-100 placeholder-slate-600 transition-all font-bold text-sm"
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${activeFilter === 'all' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
        >
          Все
        </button>
        {filterOptions.map(opt => (
          <button 
            key={opt.id}
            onClick={() => setActiveFilter(opt.id)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${activeFilter === opt.id ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="relative flex-1 min-h-[450px] flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
          <MapContainer 
            center={mapState.center} 
            zoom={mapState.zoom} 
            className="h-full w-full" 
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer 
              url={OSM_URL} 
              attribution={OSM_ATTR} 
              className="saturate-[1.3] brightness-[0.9] contrast-[1.1]"
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
            <div className="absolute bottom-4 left-4 right-4 lg:w-80 bg-slate-950/95 p-6 rounded-[2rem] border border-emerald-500/30 z-[1000] animate-in slide-in-from-bottom-5">
              <button onClick={() => setSelectedPoint(null)} className="absolute top-4 right-4 p-2 text-slate-500 bg-slate-900 rounded-full"><X className="w-3 h-3" /></button>
              <h4 className="font-black text-slate-100 text-lg mb-2 truncate">{selectedPoint.name}</h4>
              <p className="text-[10px] text-slate-400 mb-4 font-bold">{selectedPoint.address}</p>
              <div className="flex items-center gap-2 text-emerald-400 text-[9px] font-black uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                 Работает: {selectedPoint.hours}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
