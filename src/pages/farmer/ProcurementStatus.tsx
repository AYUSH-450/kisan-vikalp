import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFarmerContext } from '../../features/farmer/FarmerContext';
import { Card, CardContent } from '../../components/ui/Card';
import { cn } from '../../utils/cn';
import type { Status } from '../../types';

export default function ProcurementStatus() {
  const navigate = useNavigate();
  const { activeTransaction } = useFarmerContext();

  if (!activeTransaction) {
    return <div className="p-4 text-center mt-10">No active procurement found.</div>;
  }

  const stages: { status: Status; label: string; date?: string; time?: string }[] = [
    { status: 'Confirmed', label: 'Booking Confirmed', date: '10 Sep', time: '08:15 AM' },
    { status: 'Confirmed', label: 'PDF417 Pass Generated', date: '10 Sep', time: '08:15 AM' },
    { status: 'Checked In', label: 'Farmer Checked In' },
    { status: 'Quality Inspection', label: 'Quality Inspection' },
    { status: 'Weighing', label: 'Weighing' },
    { status: 'Completed', label: 'Procurement Completed' },
  ];

  // Derive active index
  const statusOrder: Status[] = ['Booked', 'Confirmed', 'Checked In', 'Quality Inspection', 'Weighing', 'Completed', 'Paid'];
  const currentIndex = statusOrder.indexOf(activeTransaction.status);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-surface-50">
      <header className="bg-white border-b border-surface-200 px-4 py-3 flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate('/farmer')} className="p-2 -ml-2 text-surface-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold ml-2">Procurement Status</h1>
      </header>

      <div className="p-4 space-y-4">
        <Card className="bg-white shadow-sm border-0 border-t-4 border-t-primary-500">
          <CardContent className="p-5">
             <div className="text-sm text-surface-500 font-medium mb-1">Transaction ID</div>
             <div className="font-mono font-bold text-lg text-surface-900">{activeTransaction.id}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-surface-200">
          <CardContent className="p-6 relative">
            <div className="absolute left-9 top-8 bottom-8 w-0.5 bg-surface-100"></div>
            <div className="space-y-8 relative">
              {stages.map((stage, i) => {
                const stageIndex = statusOrder.indexOf(stage.status);
                // Custom logic to handle the fact that 'Confirmed' covers the first two steps
                let isPast = false;
                let isCurrent = false;

                if (stage.label === 'Booking Confirmed' || stage.label === 'PDF417 Pass Generated') {
                  isPast = true;
                } else if (stageIndex < currentIndex) {
                  isPast = true;
                } else if (stageIndex === currentIndex && i >= 2) {
                  // For the rest, the first match of the status is current
                  const firstMatchIdx = stages.findIndex(s => s.status === activeTransaction.status);
                  if (i === firstMatchIdx || (currentIndex >= 5)) isCurrent = true; 
                  // If completed, past. Wait, let's simplify.
                  if (currentIndex > stageIndex) isPast = true;
                  if (currentIndex === stageIndex) isCurrent = true;
                }

                if (currentIndex >= 4) { // Completed or Paid
                  isPast = true;
                  isCurrent = false;
                }

                return (
                  <div key={i} className="flex items-start">
                    <div className="w-6 h-6 mr-4 flex-shrink-0 bg-white relative z-10 flex items-center justify-center">
                      {isPast ? (
                        <CheckCircle2 className="w-6 h-6 text-primary-500 bg-white" />
                      ) : isCurrent ? (
                        <div className="w-4 h-4 bg-primary-600 rounded-full ring-4 ring-primary-100 animate-pulse"></div>
                      ) : (
                        <Circle className="w-4 h-4 text-surface-300 fill-white" />
                      )}
                    </div>
                    <div className={cn("flex-1", isPast || isCurrent ? "text-surface-900" : "text-surface-400")}>
                      <h3 className={cn("font-bold leading-tight", isCurrent && "text-primary-700")}>{stage.label}</h3>
                      {(stage.date || stage.time) && (
                        <p className="text-xs text-surface-500 mt-1 font-medium">
                          {stage.date} • {stage.time}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
