import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, AlertTriangle, Users, Clock, Activity, Settings } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { mockService } from '../../services/mockDataService';
import type { Centre } from '../../types';

// Fix for default Leaflet markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons for different loads
const createIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const getIconForRisk = (risk?: string) => {
  if (risk === 'High') return createIcon('#ef4444'); // red-500
  if (risk === 'Medium') return createIcon('#f59e0b'); // amber-500
  return createIcon('#22c55e'); // green-500
};

export default function GISMap() {
  const [centres, setCentres] = useState<Centre[]>([]);
  const [selectedCentre, setSelectedCentre] = useState<Centre | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    mockService.getProcurementCentres().then(setCentres);
  }, []);

  const filteredCentres = centres.filter(c => {
    if (filter === 'High Risk') return c.risk === 'High';
    if (filter === 'Low Load') return c.status === 'Low Load';
    if (filter === 'Medium Load') return c.status === 'Medium Load';
    return true;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] -mx-4 sm:-mx-6 lg:-mx-8 -my-4 sm:-my-6 lg:-my-8">
      {/* Top Map Controls */}
      <div className="bg-white border-b border-surface-200 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 relative shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          <div className="flex items-center text-surface-900 font-bold shrink-0">
            <Layers className="w-5 h-5 mr-2 text-primary-600" /> GIS Command Map
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'High Risk', 'Low Load', 'Medium Load'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                  filter === f 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-surface-600 w-full md:w-auto">
          <span className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-1.5 shrink-0"></div> High Risk</span>
          <span className="flex items-center"><div className="w-3 h-3 bg-amber-500 rounded-full mr-1.5 shrink-0"></div> Medium Load</span>
          <span className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-1.5 shrink-0"></div> Optimal</span>
        </div>
      </div>

      {/* Map & Side Panel Area */}
      <div className="flex-1 relative flex">
        {/* The Map */}
        <div className="flex-1 h-full bg-surface-100 z-0">
          <MapContainer 
            center={[28.62, 77.21]} 
            zoom={12} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredCentres.map((centre) => (
              <Marker 
                key={centre.id} 
                position={centre.coordinates}
                icon={getIconForRisk(centre.risk)}
                eventHandlers={{
                  click: () => setSelectedCentre(centre),
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-1 min-w-[200px]">
                    <h3 className="font-bold text-lg mb-1">{centre.name}</h3>
                    <Badge variant={centre.risk === 'High' ? 'destructive' : centre.risk === 'Medium' ? 'warning' : 'success'} className="mb-2">
                      {centre.status}
                    </Badge>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-2">
                      <div className="text-surface-500">Queue:</div><div className="font-bold text-right">{centre.currentQueue}</div>
                      <div className="text-surface-500">Wait Time:</div><div className="font-bold text-right">{centre.averageWaitTimeMin}m</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Side Panel */}
        {selectedCentre && (
          <div className="w-full sm:w-[400px] h-3/5 sm:h-full bg-white border-t sm:border-t-0 sm:border-l border-surface-200 shadow-xl z-20 flex flex-col absolute bottom-0 sm:bottom-auto sm:right-0 sm:top-0 overflow-y-auto transform transition-transform duration-300">
            <div className="p-4 sm:p-6 border-b border-surface-200 flex justify-between items-start bg-surface-50 shrink-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-surface-900 mb-2 truncate pr-2">{selectedCentre.name}</h2>
                <Badge variant={selectedCentre.risk === 'High' ? 'destructive' : selectedCentre.risk === 'Medium' ? 'warning' : 'success'} className="text-xs sm:text-sm px-2.5 py-0.5">
                  {selectedCentre.risk === 'High' ? 'HIGH RISK' : selectedCentre.risk === 'Medium' ? 'MEDIUM LOAD' : 'LOW LOAD'}
                </Badge>
              </div>
              <button 
                onClick={() => setSelectedCentre(null)}
                className="p-2 hover:bg-surface-200 rounded-md text-surface-500 shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 flex-1 min-w-0">
               <div className="grid grid-cols-2 gap-3 sm:gap-4">
                 <div className="bg-surface-50 p-3 sm:p-4 rounded-xl border border-surface-100">
                   <div className="flex items-center text-surface-500 mb-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider"><Users className="w-3 sm:w-3.5 h-3 sm:h-3.5 mr-1" /> Current Queue</div>
                   <div className="text-xl sm:text-3xl font-black text-surface-900">{selectedCentre.currentQueue}</div>
                 </div>
                 <div className="bg-surface-50 p-3 sm:p-4 rounded-xl border border-surface-100">
                   <div className="flex items-center text-surface-500 mb-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider"><Activity className="w-3 sm:w-3.5 h-3 sm:h-3.5 mr-1" /> Capacity Util</div>
                   <div className={`text-xl sm:text-3xl font-black ${selectedCentre.risk === 'High' ? 'text-red-600' : 'text-surface-900'}`}>
                     {Math.round((selectedCentre.currentQueue / selectedCentre.capacity) * 100)}%
                   </div>
                 </div>
                 <div className="bg-surface-50 p-3 sm:p-4 rounded-xl border border-surface-100">
                   <div className="flex items-center text-surface-500 mb-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider"><Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 mr-1" /> Avg Wait</div>
                   <div className={`text-xl sm:text-3xl font-black ${selectedCentre.averageWaitTimeMin > 60 ? 'text-red-600' : 'text-surface-900'}`}>
                     {selectedCentre.averageWaitTimeMin}m
                   </div>
                 </div>
                 <div className="bg-surface-50 p-3 sm:p-4 rounded-xl border border-surface-100">
                   <div className="flex items-center text-surface-500 mb-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider"><Settings className="w-3 sm:w-3.5 h-3 sm:h-3.5 mr-1" /> Rate</div>
                   <div className="text-xl sm:text-3xl font-black text-surface-900">{selectedCentre.processingRatePerHour}/h</div>
                 </div>
               </div>

               <div>
                 <h3 className="text-xs sm:text-sm font-bold text-surface-500 uppercase tracking-wider mb-2 sm:mb-3">AI Predictions</h3>
                 <div className="bg-primary-50 rounded-lg p-3 sm:p-4 border border-primary-100">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-xs sm:text-sm font-medium text-surface-700">Expected Arrivals Today</span>
                     <span className="font-bold text-base sm:text-lg">{selectedCentre.expectedArrivals}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs sm:text-sm font-medium text-surface-700">Predicted Demand (Tmrw)</span>
                     <span className="font-bold text-base sm:text-lg text-amber-700">{Math.round(selectedCentre.expectedArrivals! * 1.3)}</span>
                   </div>
                 </div>
               </div>

               {selectedCentre.risk === 'High' && (
                 <div>
                   <h3 className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-wider mb-2 sm:mb-3 flex items-center">
                     <AlertTriangle className="w-3 sm:w-4 h-3 sm:h-4 mr-1" /> Recommendation
                   </h3>
                   <div className="bg-red-50 text-red-800 p-3 sm:p-4 rounded-lg border border-red-200 text-xs sm:text-sm leading-relaxed">
                     This centre is approaching critical capacity. Recommended to <strong>redirect new bookings to nearby Centre C</strong> and consider activating Counter 3 (currently offline).
                   </div>
                 </div>
               )}

               <div className="pt-4 sm:pt-6 border-t border-surface-200 grid gap-2 sm:gap-3">
                 <button className="w-full bg-primary-600 text-white font-medium py-2.5 sm:py-3 rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base">
                   Manage Capacity
                 </button>
                 <button className="w-full bg-white border border-surface-300 text-surface-700 font-medium py-2.5 sm:py-3 rounded-lg hover:bg-surface-50 transition-colors text-sm sm:text-base">
                   View Full Performance
                 </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
