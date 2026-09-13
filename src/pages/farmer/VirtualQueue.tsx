import { useState } from 'react';
import { ArrowLeft, Clock, Users, RefreshCcw, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFarmerContext } from '../../features/farmer/FarmerContext';
import { Card, CardContent } from '../../components/ui/Card';
import { cn } from '../../utils/cn';

export default function VirtualQueue() {
  const navigate = useNavigate();
  const { activeTransaction } = useFarmerContext();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  if (!activeTransaction) {
    return <div className="p-4 text-center mt-10">No active queue.</div>;
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // Mock queue sequence for visualization
  const currentlyServing = 'A034';
  const myToken = activeTransaction.tokenNumber || 'A042';
  
  // Create array from A034 to A042
  const queueItems = Array.from({ length: 9 }, (_, i) => {
    const num = 34 + i;
    return `A0${num}`;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-surface-50">
      <header className="bg-white border-b border-surface-200 px-4 py-3 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate('/farmer')} className="p-2 -ml-2 text-surface-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold ml-2">Live Queue</h1>
        </div>
        <button 
          onClick={handleRefresh} 
          className={cn("p-2 text-primary-600 rounded-full hover:bg-primary-50 transition", isRefreshing && "animate-spin")}
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </header>

      <div className="p-4 pb-20">
        {/* Main Status Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-primary-600 text-white border-0 shadow-md">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-primary-100 font-medium uppercase tracking-wider mb-1">Your Token</span>
              <span className="text-3xl font-black">{myToken}</span>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-surface-200 shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-surface-500 font-medium uppercase tracking-wider mb-1">Serving Now</span>
              <span className="text-3xl font-black text-surface-900">{currentlyServing}</span>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border-surface-200 shadow-sm mb-6">
          <CardContent className="p-0 divide-y divide-surface-100">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-surface-400 mr-3" />
                <span className="font-medium text-surface-700">Farmers Ahead</span>
              </div>
              <span className="font-bold text-lg text-surface-900">7</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-amber-500 mr-3" />
                <span className="font-medium text-surface-700">Estimated Wait</span>
              </div>
              <span className="font-bold text-lg text-amber-600">32 min</span>
            </div>
            <div className="p-4 flex items-center justify-between bg-surface-50">
              <div className="flex items-center">
                <span className="w-5 h-5 flex items-center justify-center rounded-full border border-primary-500 text-primary-600 text-[10px] font-bold mr-3">E</span>
                <span className="font-medium text-surface-700">Expected Service</span>
              </div>
              <span className="font-bold text-lg text-primary-700">{activeTransaction.expectedServiceTime}</span>
            </div>
          </CardContent>
        </Card>

        {/* Visual Queue Timeline */}
        <h3 className="font-bold text-surface-900 mb-4 px-1">Queue Progression</h3>
        <Card className="bg-white border-surface-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <ul className="divide-y divide-surface-50">
              {queueItems.map((item, index) => {
                const isServing = item === currentlyServing;
                const isMe = item === myToken;
                const isPast = index < queueItems.indexOf(currentlyServing);
                
                if (isPast) return null; // Only show current and future

                return (
                  <li 
                    key={item} 
                    className={cn(
                      "px-4 py-3 flex items-center transition-colors",
                      isServing ? "bg-surface-50" : "",
                      isMe ? "bg-primary-50/50" : ""
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mr-4 transition-all duration-300",
                      isServing ? "bg-surface-800 text-white shadow-md ring-2 ring-surface-200 ring-offset-2" : 
                      isMe ? "bg-primary-600 text-white shadow-md ring-2 ring-primary-200 ring-offset-2 scale-110" : 
                      "bg-surface-100 text-surface-500"
                    )}>
                      {index + 1}
                    </div>
                    
                    <span className={cn(
                      "font-mono font-bold text-lg flex-1",
                      isServing ? "text-surface-900" : isMe ? "text-primary-700" : "text-surface-500"
                    )}>
                      {item}
                    </span>
                    
                    {isServing && (
                      <span className="text-xs font-bold uppercase tracking-wider bg-surface-200 text-surface-700 px-2 py-1 rounded shadow-sm animate-pulse">
                        Serving
                      </span>
                    )}
                    {isMe && (
                      <span className="text-xs font-bold uppercase tracking-wider bg-primary-600 text-white px-2 py-1 rounded shadow-sm">
                        You
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
        
        <div className="mt-4 flex items-start gap-2 px-1 text-surface-500 text-xs">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>Estimated time may change as the centre's processing speed changes. Updated just now.</p>
        </div>
      </div>
    </div>
  );
}
