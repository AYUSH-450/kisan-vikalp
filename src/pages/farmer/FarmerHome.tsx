import { Link, useNavigate } from 'react-router-dom';
import { useFarmerContext } from '../../features/farmer/FarmerContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MapPin, Calendar, Clock, ChevronRight, Barcode, History, Building2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function FarmerHome() {
  const { activeTransaction, isLoading } = useFarmerContext();
  const navigate = useNavigate();

  // Simple mock logic: if the booking is today and we are within 30 mins of recommended departure time, show leave now.
  // For the demo, we'll just hardcode it to true to show the red LEAVE NOW state, or we can make it false for "Don't Leave Yet"
  const isLeaveNow = true;

  if (isLoading) {
    return <div className="p-4 flex justify-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-3xl mx-auto">
      <header className="flex flex-col mb-2">
        <h1 className="text-3xl font-bold text-surface-900 tracking-tight">Namaste, Ramesh</h1>
        <p className="text-surface-600 font-medium mt-1">Your procurement journey is on track.</p>
      </header>

      {activeTransaction ? (
        <>
          <section>
            <h2 className="text-lg font-bold text-surface-900 mb-4">Your Next Procurement</h2>
            <Card className="border-surface-200 shadow-sm relative overflow-hidden bg-white">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-600"></div>
              <CardContent className="p-5 md:p-6">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="font-bold text-xl text-surface-900">{activeTransaction.crop} <span className="text-surface-400 font-normal mx-1">&middot;</span> {activeTransaction.expectedQuantity} Quintals</h3>
                  </div>
                  <Badge variant="success" className="bg-primary-50 text-primary-700 border border-primary-200">
                    {activeTransaction.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-sm text-surface-700">
                    <div className="bg-surface-100 p-2 rounded-full mr-3">
                      <MapPin className="w-4 h-4 text-surface-500" />
                    </div>
                    <span className="font-medium">{activeTransaction.centreName}</span>
                  </div>
                  <div className="flex items-center text-sm text-surface-700">
                    <div className="bg-surface-100 p-2 rounded-full mr-3">
                      <Calendar className="w-4 h-4 text-surface-500" />
                    </div>
                    <span className="font-medium">{new Date(activeTransaction.bookingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center text-sm text-surface-700">
                    <div className="bg-surface-100 p-2 rounded-full mr-3">
                      <Clock className="w-4 h-4 text-surface-500" />
                    </div>
                    <span className="font-medium">Slot: {activeTransaction.slot}</span>
                  </div>
                </div>

                <Button 
                  variant="outline"
                  className="w-full justify-between bg-white text-surface-700 hover:bg-surface-50 hover:text-surface-900 border-surface-200 font-medium h-12" 
                  onClick={() => navigate('/farmer/procurement')}
                >
                  View Procurement Details
                  <ChevronRight className="w-4 h-4 text-surface-400" />
                </Button>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-lg font-bold text-surface-900 mb-4">Your Procurement Status</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Card className="bg-white border-surface-200 shadow-sm">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
                  <span className="text-xs text-surface-500 font-bold uppercase tracking-wider mb-2">Expected Service</span>
                  <span className="text-2xl font-black text-surface-900">{activeTransaction.expectedServiceTime}</span>
                </CardContent>
              </Card>
              <Card className="bg-white border-surface-200 shadow-sm">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
                  <span className="text-xs text-surface-500 font-bold uppercase tracking-wider mb-2">Farmers Ahead</span>
                  <span className="text-2xl font-black text-surface-900">7</span>
                  <span className="text-sm text-primary-600 mt-1 font-semibold">~32 min wait</span>
                </CardContent>
              </Card>
            </div>

            <Card className={cn("border shadow-sm", isLeaveNow ? "bg-primary-50 border-primary-200" : "bg-surface-50 border-surface-200")}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <h2 className={cn("text-2xl font-black uppercase tracking-tight mb-4", isLeaveNow ? "text-primary-800" : "text-surface-800")}>
                  {isLeaveNow ? "LEAVE NOW" : "Don't Leave Yet"}
                </h2>
                <div className="flex justify-between w-full text-sm mt-2 max-w-sm px-4">
                  <div className="flex flex-col items-start">
                    <span className={cn("font-semibold mb-1 text-xs uppercase tracking-wide", isLeaveNow ? "text-primary-600/80" : "text-surface-500")}>Expected service</span>
                    <span className={cn("text-lg font-bold", isLeaveNow ? "text-primary-900" : "text-surface-900")}>{activeTransaction.expectedServiceTime}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={cn("font-semibold mb-1 text-xs uppercase tracking-wide", isLeaveNow ? "text-primary-600/80" : "text-surface-500")}>Leave at</span>
                    <span className={cn("text-lg font-bold", isLeaveNow ? "text-primary-900" : "text-surface-900")}>{activeTransaction.recommendedDepartureTime}</span>
                  </div>
                </div>
                {isLeaveNow && (
                   <div className="text-sm font-semibold text-primary-800 mt-6 bg-white/60 px-4 py-2 rounded-full border border-primary-100">
                     It is time to leave for {activeTransaction.centreName}.
                   </div>
                )}
                <Button 
                  className={cn("w-full mt-6 h-12 text-base font-bold shadow-sm", isLeaveNow ? "bg-primary-600 hover:bg-primary-700 text-white" : "bg-surface-200 text-surface-700 hover:bg-surface-300")}
                  onClick={() => navigate('/farmer/travel')}
                >
                  View Travel Plan
                </Button>
              </CardContent>
            </Card>
          </section>
        </>
      ) : (
        <section className="py-12 text-center bg-white rounded-xl border border-surface-200 border-dashed">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-surface-900 mb-2">No Upcoming Procurement</h2>
          <p className="text-surface-500 text-sm mb-6 max-w-xs mx-auto">Book a slot at a procurement centre to sell your crops without waiting.</p>
          <Button onClick={() => navigate('/farmer/book')} className="h-12 px-8">
            Book Procurement
          </Button>
        </section>
      )}

      <section>
        <h2 className="text-lg font-bold text-surface-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/farmer/book" className="flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-surface-200 shadow-sm hover:border-primary-300 hover:shadow-md transition group">
            <div className="bg-surface-50 p-3.5 rounded-full mb-3 group-hover:bg-primary-50 transition border border-surface-100">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <span className="text-sm font-semibold text-center text-surface-700 group-hover:text-primary-700 transition">Book<br/>Procurement</span>
          </Link>
          <Link to="/farmer/pass" className="flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-surface-200 shadow-sm hover:border-primary-300 hover:shadow-md transition group">
            <div className="bg-surface-50 p-3.5 rounded-full mb-3 group-hover:bg-blue-50 transition border border-surface-100">
              <Barcode className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-center text-surface-700 group-hover:text-blue-700 transition">Digital<br/>Pass</span>
          </Link>
          <Link to="/farmer/queue" className="flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-surface-200 shadow-sm hover:border-primary-300 hover:shadow-md transition group">
            <div className="bg-surface-50 p-3.5 rounded-full mb-3 group-hover:bg-amber-50 transition border border-surface-100">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-sm font-semibold text-center text-surface-700 group-hover:text-amber-700 transition">Live<br/>Queue</span>
          </Link>
          <Link to="/farmer/history" className="flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-surface-200 shadow-sm hover:border-primary-300 hover:shadow-md transition group">
            <div className="bg-surface-50 p-3.5 rounded-full mb-3 group-hover:bg-surface-100 transition border border-surface-100">
              <History className="w-6 h-6 text-surface-600" />
            </div>
            <span className="text-sm font-semibold text-center text-surface-700 group-hover:text-surface-900 transition">History &<br/>Payments</span>
          </Link>
        </div>
      </section>

      <section className="mb-4">
        <div className="flex flex-col mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-surface-900">Nearby Centres</h2>
            <Button variant="ghost" size="sm" className="text-primary-600 font-semibold px-2 hover:bg-primary-50" onClick={() => navigate('/farmer/centres')}>
              View All
            </Button>
          </div>
          <p className="text-sm text-surface-500 font-medium">Centres near you, ranked by expected journey time.</p>
        </div>
        
        <div className="space-y-4">
           <Card className="bg-white border-surface-200 shadow-sm hover:border-primary-300 hover:shadow-md transition cursor-pointer" onClick={() => navigate('/farmer/centres')}>
             <CardContent className="p-5 flex items-center justify-between">
               <div className="flex items-center">
                 <div className="bg-primary-50 p-3 rounded-xl mr-4 border border-primary-100">
                   <Building2 className="w-6 h-6 text-primary-700" />
                 </div>
                 <div>
                   <h4 className="font-bold text-surface-900 text-base">Centre B</h4>
                   <p className="text-sm text-surface-500 font-medium mt-0.5">7 km away &middot; 25 min wait</p>
                 </div>
               </div>
               <Badge variant="success" className="text-[10px] font-bold tracking-wider px-2.5 py-1 bg-green-50 text-green-700 border border-green-200">LOW LOAD</Badge>
             </CardContent>
           </Card>
        </div>
      </section>
    </div>
  );
}
