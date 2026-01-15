
import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { RECYCLING_POINTS } from '../constants';
import { RecyclingPoint } from '../types';
import { MapPin, Search, Navigation, ExternalLink, Filter, X, Map as MapIcon, ChevronRight } from 'lucide-react';

const createCustomIcon = (type: string, isActive: boolean) => {
  const colors: Record<string, string> = {
    plastic: '#6366f1', paper: '#10b981', batteries: '#f43f5e', glass: '#f59e0b',
  };
  const color = colors[type] || '#94a3b8';
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background-color: ${color}; 
        width: ${isActive ? '36px' : '28px'}; 
        height: ${isActive ? '36px' : '28px'}; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        border: 2px solid white; 
        box-shadow: 0 0 15px ${color}80;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      ">
        <div style="transform: rotate(45deg); color: white; font-size: 10px; font-weight: 900;">
          ${type.charAt(0).toUpperCase()}
        </div>
      </div>`,
    iconSize: [isActive ? 36 : 28, isActive ? 36 : 28],
    iconAnchor: [isActive ? 18 : 14, isActive ? 36 : 28]
  });
};

const MapEffects = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 12, { duration: 1.5 });
  }, [center, map]);
  return null;
};

export const ModuleC: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPoint, setSelectedPoint] = useState<RecyclingPoint | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([55.7558, 37.6173]);

  const filteredPoints = useMemo(() => {
    return RECYCLING_POINTS.filter(p => {
      const matchesSearch = p.address.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || p.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const goToPoint = (point: RecyclingPoint) => {
    setSelectedPoint(point);
    setMapCenter(point.coords);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 h-full flex flex-col">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tighter flex items-center gap-3">
            Эко-Навигатор РФ
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400 tracking-widest uppercase">Database 2025</span>
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Глобальная база данных пунктов приема без участия AI.</p>
        </div>
        
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-100 placeholder-slate-600 transition-all font-medium"
            placeholder="Город, адрес или название пункта..."
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
        {['all', 'plastic', 'paper', 'glass', 'batteries'].map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
              activeFilter === f 
              ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-900/40' 
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-200'
            }`}
          >
            {f === 'all' ? 'Все пункты' : f === 'plastic' ? 'Пластик' : f === 'paper' ? 'Бумага' : f === 'glass' ? 'Стекло' : 'Батарейки'}
          </button>
        ))}
      </div>

      {/* Map Main Layout */}
      <div className="relative flex-1 min-h-[500px] flex gap-6">
        
        {/* Sidebar List */}
        <div className="hidden lg:flex flex-col w-80 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden shrink-0">
          <div className="p-6 border-b border-slate-800 bg-slate-900/80">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <MapIcon className="w-3 h-3" /> Найдено: {filteredPoints.length}
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {filteredPoints.map(p => (
              <button 
                key={p.id}
                onClick={() => goToPoint(p)}
                className={`w-full p-4 rounded-2xl text-left transition-all border ${
                  selectedPoint?.id === p.id 
                  ? 'bg-indigo-600/10 border-indigo-500/50 shadow-lg' 
                  : 'bg-slate-950 border-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">{p.type}</span>
                  <ChevronRight className={`w-3 h-3 transition-transform ${selectedPoint?.id === p.id ? 'rotate-90 text-indigo-400' : 'text-slate-700'}`} />
                </div>
                <div className="font-bold text-xs text-slate-200 mb-1">{p.name}</div>
                <div className="text-[9px] text-slate-500 flex items-center gap-1 font-medium truncate">
                   <MapPin className="w-2.5 h-2.5 text-indigo-500" /> {p.address}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl">
          <MapContainer center={mapCenter} zoom={11} className="h-full w-full">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <MapEffects center={mapCenter} />
            {filteredPoints.map((p) => (
              <Marker 
                key={p.id} 
                position={p.coords}
                icon={createCustomIcon(p.type, selectedPoint?.id === p.id)}
                eventHandlers={{ click: () => setSelectedPoint(p) }}
              >
                <Popup className="dark-popup">
                  <div className="p-1 font-bold text-xs uppercase">{p.name}</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Floating Detail Card */}
          {selectedPoint && (
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:w-96 bg-slate-950/95 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-indigo-500/30 z-[1000] animate-in slide-in-from-bottom-5 shadow-2xl">
              <button onClick={() => setSelectedPoint(null)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-slate-900 rounded-full">
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-500/20">
                  <MapPin className="text-indigo-400 w-8 h-8" />
                </div>
                <div>
                  <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">{selectedPoint.type}</div>
                  <h4 className="font-black text-slate-100 text-lg leading-tight">{selectedPoint.name}</h4>
                  <div className="text-[10px] text-slate-500 font-bold mt-1">{selectedPoint.hours}</div>
                </div>
              </div>
              
              <p className="text-xs text-slate-400 mb-6 bg-slate-900/50 p-3 rounded-xl border border-white/5 leading-relaxed">
                {selectedPoint.description}
              </p>
              
              <div className="text-[10px] text-slate-500 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Navigation className="w-3.5 h-3.5 text-indigo-500" /> {selectedPoint.address}
              </div>
              
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-900/40">
                Маршрут в навигаторе <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
