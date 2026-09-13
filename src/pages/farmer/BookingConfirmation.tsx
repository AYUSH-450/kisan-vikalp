import { useNavigate } from 'react-router-dom';
import { useFarmerContext } from '../../features/farmer/FarmerContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { CheckCircle2, Barcode, Clock, MapPin, CalendarDays, Sprout, Wheat, Leaf, CircleDot } from 'lucide-react';

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const { activeTransaction } = useFarmerContext();

  if (!activeTransaction) {
    return <div className="p-4 text-center mt-10 text-surface-500 font-medium">No recent booking found.</div>;
  }

  // Choose an appropriate icon based on crop name (fallback to Sprout if unknown)
  const getCropIcon = (cropName: string) => {
    switch (cropName?.toLowerCase()) {
      case 'paddy': return <Sprout className="w-5 h-5 text-primary-600" />;
      case 'wheat': return <Wheat className="w-5 h-5 text-primary-600" />;
      case 'maize': return <Leaf className="w-5 h-5 text-primary-600" />;
      case 'onion': return <CircleDot className="w-5 h-5 text-primary-600" />;
      default: return <Sprout className="w-5 h-5 text-primary-600" />;
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-[#f9f8f6]">
      <div className="px-4 py-8 md:py-12 flex-1 flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
        
        <div className="w-full max-w-xl flex flex-col items-center">
          
          {/* Success Header */}
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 md:p-8 w-full flex flex-col items-center text-center mb-6 shadow-sm">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-surface-900 mb-2">Booking Confirmed</h1>
            <p className="text-surface-600 font-medium">Your procurement visit has been successfully scheduled.</p>
          </div>

          {/* Primary Info (Crop + Quantity) */}
          <div className="w-full mb-6 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest font-bold text-surface-400 mb-2">You are bringing</span>
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl border-2 border-surface-200 shadow-sm">
              <div className="bg-primary-50 p-2 rounded-full">
                {getCropIcon(activeTransaction.crop)}
              </div>
              <div className="text-2xl font-black text-surface-900 tracking-tight">
                {activeTransaction.crop} <span className="text-surface-300 font-normal mx-1">·</span> {activeTransaction.expectedQuantity} Q
              </div>
            </div>
          </div>

          {/* Details Card */}
          <Card className="w-full bg-white shadow-sm border border-surface-200 mb-6 overflow-hidden rounded-xl">
            <div className="bg-surface-50 px-6 py-3 border-b border-surface-200 flex items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-surface-500">Procurement Details</span>
            </div>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-surface-100">
                
                {/* Centre */}
                <div className="p-6 flex items-start gap-4">
                  <div className="bg-surface-100 p-2 rounded-lg mt-0.5">
                    <MapPin className="w-5 h-5 text-surface-600" />
                  </div>
                  <div>
                    <div className="text-[10px] text-surface-500 font-bold uppercase tracking-wider mb-1">Procurement Centre</div>
                    <div className="font-bold text-surface-900 text-lg leading-tight">{activeTransaction.centreName}</div>
                  </div>
                </div>
                
                {/* Date & Slot */}
                <div className="p-6 flex items-start gap-4">
                  <div className="bg-surface-100 p-2 rounded-lg mt-0.5">
                    <CalendarDays className="w-5 h-5 text-surface-600" />
                  </div>
                  <div>
                    <div className="text-[10px] text-surface-500 font-bold uppercase tracking-wider mb-1">Date & Slot</div>
                    <div className="font-bold text-surface-900 text-lg leading-tight">10 Sep 2026</div>
                    <div className="text-primary-700 font-semibold text-sm mt-0.5">{activeTransaction.slot}</div>
                  </div>
                </div>
              </div>

              {/* Service Timing (Differentiator) */}
              <div className="bg-surface-50 p-6 border-t border-surface-200">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-[10px] text-surface-500 font-bold uppercase tracking-wider mb-1">Expected Service</div>
                    <div className="font-black text-primary-700 text-xl flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary-600" />
                      {activeTransaction.expectedServiceTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-surface-500 font-bold uppercase tracking-wider mb-1">Leave At</div>
                    <div className="font-black text-orange-600 text-xl flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-orange-500" />
                      {activeTransaction.recommendedDepartureTime}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-surface-500 font-medium leading-relaxed bg-white px-3 py-2 rounded-md border border-surface-200 inline-block">
                  Plan to leave at <strong className="text-surface-700">{activeTransaction.recommendedDepartureTime}</strong> to reach {activeTransaction.centreName} in time for your expected service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Transaction ID */}
          <div className="w-full flex justify-center mb-8">
            <div className="bg-white px-4 py-2 rounded-full border border-surface-200 shadow-sm flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-surface-400">Transaction ID</span>
              <span className="font-mono font-bold text-surface-900 tracking-wider bg-surface-100 px-2 py-0.5 rounded text-sm">{activeTransaction.id}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full space-y-3">
            <Button 
              className="w-full h-14 text-lg font-bold bg-primary-600 hover:bg-primary-700 shadow-md flex items-center justify-center gap-2"
              onClick={() => navigate('/farmer/pass')}
            >
              <Barcode className="w-6 h-6" />
              View Digital Pass
            </Button>
            <Button 
              variant="outline"
              className="w-full h-14 text-base font-bold bg-white border-2 border-surface-200 hover:bg-surface-50 hover:border-surface-300 text-surface-700 shadow-sm"
              onClick={() => navigate('/farmer/queue')}
            >
              View Virtual Queue
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
