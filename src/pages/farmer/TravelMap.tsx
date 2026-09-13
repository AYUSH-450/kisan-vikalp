import { ArrowLeft, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFarmerContext } from '../../features/farmer/FarmerContext';
import { Card, CardContent } from '../../components/ui/Card';
// removed Button import
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// removed useEffect import

// Fix Leaflet default marker icons issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const farmerLocation: [number, number] = [28.61, 77.19];
const centreLocation: [number, number] = [28.62, 77.21];

export default function TravelMap() {
  const navigate = useNavigate();
  const { activeTransaction } = useFarmerContext();

  if (!activeTransaction) {
    return <div className="p-4 text-center mt-10">No active journey.</div>;
  }

  // To hide attribution nicely or let it be
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-surface-50">
      <header className="bg-white border-b border-surface-200 px-4 py-3 flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate('/farmer')} className="p-2 -ml-2 text-surface-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold ml-2">When should I leave?</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* LEAVE NOW engine card */}
        <Card className="bg-amber-500 text-white border-0 shadow-lg relative overflow-hidden animate-in zoom-in-95 duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
          <CardContent className="p-6 relative z-10">
            <h2 className="text-4xl font-black uppercase tracking-tight text-center mb-6 text-white drop-shadow-sm">Leave Now</h2>
            
            <div className="grid grid-cols-2 gap-4 divide-x divide-amber-400/50">
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-amber-200 mb-1">Expected Service</div>
                <div className="text-xl font-bold">{activeTransaction.expectedServiceTime}</div>
              </div>
              <div className="pl-4">
                <div className="text-xs uppercase tracking-wider font-bold text-amber-200 mb-1">Travel Time</div>
                <div className="text-xl font-bold">24 min</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-amber-400/50 flex justify-between items-center">
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-amber-200 mb-1">Safety Buffer</div>
                <div className="font-bold">10 min</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider font-bold text-amber-200 mb-1">Rec. Departure</div>
                <div className="font-bold text-xl">{activeTransaction.recommendedDepartureTime}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline visualization */}
        <Card className="bg-white border-surface-200 shadow-sm">
          <CardContent className="p-6 relative">
            <div className="absolute left-9 top-8 bottom-8 w-0.5 bg-surface-200"></div>
            
            <div className="space-y-6 relative">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm mr-4 relative z-10">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="font-bold text-surface-900 leading-tight">Now</h3>
                  <p className="text-sm text-surface-500">11:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center border-4 border-white shadow-sm mr-4 relative z-10">
                  <Car className="w-3 h-3 text-white" />
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="font-bold text-surface-900 leading-tight">Leave</h3>
                  <p className="text-sm text-surface-500">11:01 AM</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-surface-300 rounded-full flex items-center justify-center border-4 border-white shadow-sm mr-4 relative z-10">
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="font-bold text-surface-900 leading-tight">Travel</h3>
                  <p className="text-sm text-surface-500">~24 mins</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-surface-300 rounded-full flex items-center justify-center border-4 border-white shadow-sm mr-4 relative z-10">
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="font-bold text-surface-900 leading-tight">Arrive</h3>
                  <p className="text-sm text-surface-500">11:25 AM</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-surface-300 rounded-full flex items-center justify-center border-4 border-white shadow-sm mr-4 relative z-10">
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-surface-900 leading-tight">Service Expected</h3>
                  <p className="text-sm text-surface-500">11:35 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <div className="h-64 rounded-xl overflow-hidden border border-surface-200 shadow-sm relative z-0">
          <MapContainer center={[28.615, 77.2]} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={farmerLocation}>
              <Popup>Your Location</Popup>
            </Marker>
            <Marker position={centreLocation}>
              <Popup>{activeTransaction.centreName}</Popup>
            </Marker>
            <Polyline positions={[farmerLocation, centreLocation]} color="#22c55e" weight={4} dashArray="8, 8" />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
