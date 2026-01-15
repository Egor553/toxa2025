
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from 'react-leaflet';
import L from 'leaflet';
import { RECYCLING_POINTS, RECYCLING_ZONES, TROITSK_COORDS } from '../constants';
import { RecyclingPoint, RecyclingZone } from '../types';
import { MapPin, Search, Navigation, Info, ExternalLink, ShieldCheck, Layers, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Internal component to fix the "gray area" bug by invalidating size
const MapEffects = ({ center, sidebarOpen }: { center: [number, number], sidebarOpen: boolean }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) map.setView(center, 14);
  }, [center, map]);

  useEffect(() => {
    // Delay slightly to wait for CSS transitions
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);
    return () => clearTimeout(timer);
  }, [sidebarOpen, map]);

  return null;
};

export const ModuleC: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<RecyclingPoint | null>(null);
  const [selectedZone, setSelectedZone] = useState<RecyclingZone | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(TROITSK_COORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [showZones, setShowZones] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredPoints = RECYCLING_POINTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const findMe = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        setMapCenter(coords);
      },
      (err) => console.error(err)
    );
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500 h-full flex flex-col">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tight flex items-center gap-3">
            Эко-Карта
            <div className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 text-[10px] text-indigo-400">HQ DATA</div>
          </h2>
          <p className="text-slate-400 text-sm font-medium">Мониторинг зон ответственности и пунктов сбора.</p>
        </div>
        
        <div className="flex gap-2">
           <button 
            onClick={() => setShowZones(!showZones)}
            className={`p-3 rounded-xl border transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest ${
              showZones ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <Layers className="w-4 h-4" />
            Слои
          </button>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-100 placeholder-slate-600 w-full md:w-64 transition-all"
              placeholder="Поиск..."
            />
          </div>
          <button 
            onClick={findMe}
            className="p-3 bg-slate-800 text-slate-100 rounded-xl hover:bg-slate-700 transition border border-slate-700 shadow-lg"
          >
            <Navigation className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Map Layout */}
      <div className="relative flex-1 min-h-[500px] md:min-h-[650px] lg:min-h-[750px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex">
        
        {/* Collapsible Sidebar */}
        <div 
          className={`bg-slate-900/95 backdrop-blur-md border-r border-slate-800 flex flex-col transition-all duration-300 z-20 ${
            sidebarOpen ? 'w-80' : 'w-0 overflow-hidden opacity-0'
          }`}
        >
          <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex justify-between items-center shrink-0">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Объекты Троицка</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {showZones && (
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Активные Зоны
                </h4>
                <div className="grid gap-2">
                  {RECYCLING_ZONES.map(zone => (
                    <button 
                      key={zone.id}
                      onClick={() => {
                        setSelectedZone(zone);
                        setSelectedPoint(null);
                        setMapCenter(zone.polygon[0]);
                      }}
                      className={`w-full p-3 rounded-xl text-left transition-all border ${
                        selectedZone?.id === zone.id ? 'bg-indigo-600/20 border-indigo-500' : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: zone.color }} />
                        <div className="font-bold text-xs text-slate-200">{zone.name}</div>
                      </div>
                      <div className="text-[10px] text-slate-500 leading-tight">{zone.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Пункты Сбора</h4>
              <div className="grid gap-2">
                {filteredPoints.map((point) => (
                  <button 
                    key={point.id}
                    onClick={() => {
                      setSelectedPoint(point);
                      setSelectedZone(null);
                      setMapCenter(point.coords);
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all border ${
                      selectedPoint?.id === point.id ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-xs mb-1">{point.name}</div>
                    <div className="text-[9px] opacity-70 flex items-center gap-1 uppercase">
                      <MapPin className="w-2.5 h-2.5" /> {point.address}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Toggle Button */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-slate-900 border-y border-r border-slate-800 p-2 rounded-r-xl text-indigo-400 hover:bg-slate-800 transition-colors shadow-2xl lg:flex items-center hidden"
        >
          {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer center={mapCenter} zoom={14} className="h-full w-full">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            />
            <MapEffects center={mapCenter} sidebarOpen={sidebarOpen} />
            
            {showZones && RECYCLING_ZONES.map(zone => (
              <Polygon 
                key={zone.id}
                positions={zone.polygon}
                pathOptions={{ 
                  color: zone.color, 
                  fillColor: zone.color, 
                  fillOpacity: selectedZone?.id === zone.id ? 0.45 : 0.2,
                  weight: selectedZone?.id === zone.id ? 4 : 1
                }}
                eventHandlers={{
                  click: () => {
                    setSelectedZone(zone);
                    setSelectedPoint(null);
                  }
                }}
              />
            ))}

            {filteredPoints.map((point) => (
              <Marker 
                key={point.id} 
                position={point.coords}
                eventHandlers={{ click: () => {
                  setSelectedPoint(point);
                  setSelectedZone(null);
                } }}
              >
                <Popup>
                   <div className="text-slate-900">
                     <div className="font-bold">{point.name}</div>
                     <div className="text-xs">{point.address}</div>
                   </div>
                </Popup>
              </Marker>
            ))}
            
            {userLocation && (
              <Marker position={userLocation} icon={L.divIcon({ className: 'user-marker', html: '<div class="w-8 h-8 bg-indigo-500 rounded-full border-[6px] border-white/20 shadow-[0_0_30px_rgba(99,102,241,0.8)] animate-pulse"></div>' })} />
            )}
          </MapContainer>

          {/* Collapsed UI Hint */}
          {!sidebarOpen && (
            <div className="absolute top-6 left-6 z-10">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-indigo-400 shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
              >
                <Maximize2 className="w-4 h-4" /> Объекты
              </button>
            </div>
          )}

          {/* Floating Point Overlay */}
          {selectedPoint && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 w-[calc(100%-3rem)] md:w-96 bg-slate-950/95 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl border border-indigo-500/40 z-[1000] animate-in slide-in-from-bottom-20 duration-500">
              <button onClick={() => setSelectedPoint(null)} className="absolute top-6 right-8 text-slate-500 hover:text-white transition-colors">
                <XIcon />
              </button>
              <div className="flex gap-5 mb-5">
                <div className="relative shrink-0">
                  <img src={selectedPoint.image} className="w-24 h-24 rounded-3xl object-cover ring-2 ring-indigo-500/20" />
                  <div className="absolute -bottom-2 -right-2 bg-indigo-600 rounded-lg p-1 text-[8px] font-black text-white px-2 shadow-lg ring-1 ring-white/20 uppercase tracking-widest">Point</div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-black text-slate-100 text-xl tracking-tight leading-tight">{selectedPoint.name}</h4>
                  <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[2px] mt-1">{selectedPoint.type}</p>
                  <p className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-2">
                    <MapPin className="w-3 h-3" /> {selectedPoint.address}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
                   <p className="text-xs text-slate-300 font-medium leading-relaxed italic">"{selectedPoint.description}"</p>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-indigo-900/40 flex items-center justify-center gap-2">
                  Проложить маршрут <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Floating Zone Detail */}
          {selectedZone && !selectedPoint && (
            <div className="absolute top-8 right-8 w-80 bg-slate-950/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-indigo-500/30 z-[1000] animate-in slide-in-from-right-10 duration-300">
               <button onClick={() => setSelectedZone(null)} className="absolute top-4 right-4 text-slate-600 hover:text-white">
                <XIcon />
              </button>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${selectedZone.color}20`, border: `1px solid ${selectedZone.color}40` }}>
                  <ShieldCheck className="w-7 h-7" style={{ color: selectedZone.color }} />
                </div>
                <div>
                  <h4 className="font-black text-slate-100 uppercase text-xs tracking-[1px]">{selectedZone.name}</h4>
                  <p className="text-[9px] text-slate-500 uppercase font-bold mt-0.5">Экологический сектор</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 pl-4 py-1" style={{ borderColor: selectedZone.color }}>
                {selectedZone.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
);
