import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useOfficerContext } from '../../features/officer/OfficerContext';

export default function ProcurementWorkflow() {
  const navigate = useNavigate();
  const { activeTransaction } = useOfficerContext();

  if (!activeTransaction) return <div className="p-6">No active transaction.</div>;

  const stages = [
    { key: 'Checked In', label: 'CHECK-IN', link: null },
    { key: 'Quality Inspection', label: 'QUALITY', link: '/officer/quality' },
    { key: 'Weighing', label: 'WEIGHING', link: '/officer/weighing' },
    { key: 'Completed', label: 'PROCUREMENT', link: '/officer/completed' }
  ];

  const statusOrder = ['Confirmed', 'Checked In', 'Quality Inspection', 'Weighing', 'Completed', 'Paid'];
  const currentIndex = statusOrder.indexOf(activeTransaction.status);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 mb-1">Procurement Workflow</h1>
          <p className="text-surface-500">Transaction: <span className="font-mono text-surface-700">{activeTransaction.id}</span></p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-1 border-primary-200 bg-primary-50 text-primary-700">
          Token: {activeTransaction.tokenNumber}
        </Badge>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {stages.map((stage, i) => {
          const stageIndex = statusOrder.indexOf(stage.key);
          const isPast = currentIndex > stageIndex;
          const isCurrent = currentIndex === stageIndex || (currentIndex === 1 && i === 0); // Handle 'Checked In' offset
          const isNext = currentIndex === stageIndex - 1;
          
          let stateClass = "bg-white border-surface-200 opacity-50";
          let icon = <Circle className="w-6 h-6 text-surface-300" />;
          
          if (isPast) {
            stateClass = "bg-green-50 border-green-200 opacity-100";
            icon = <CheckCircle2 className="w-6 h-6 text-green-600" />;
          } else if (isCurrent) {
            stateClass = "bg-primary-50 border-primary-500 ring-2 ring-primary-500 shadow-md opacity-100";
            icon = <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse" />;
          } else if (isNext) {
            stateClass = "bg-white border-primary-200 shadow-sm opacity-100";
            icon = <Circle className="w-6 h-6 text-primary-300" />;
          }

          // Adjust Checked In display
          if (stage.key === 'Checked In' && currentIndex >= 1) {
            stateClass = "bg-green-50 border-green-200 opacity-100";
            icon = <CheckCircle2 className="w-6 h-6 text-green-600" />;
          }

          return (
            <Card key={i} className={`relative transition-all duration-300 ${stateClass}`}>
              <CardContent className="p-5 flex flex-col items-center text-center h-full justify-center min-h-[140px]">
                <div className="w-8 h-8 flex items-center justify-center mb-3">
                  {icon}
                </div>
                <h3 className={`font-bold text-sm tracking-wider uppercase ${isPast ? 'text-green-800' : isCurrent ? 'text-primary-800' : 'text-surface-500'}`}>
                  {stage.label}
                </h3>
                
                {isNext && stage.link && (
                  <Button 
                    size="sm" 
                    className="mt-4 w-full bg-primary-600 hover:bg-primary-700"
                    onClick={() => navigate(stage.link!)}
                  >
                    Start <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
                
                {isCurrent && stage.key !== 'Checked In' && stage.link && (
                   <Button 
                     size="sm" 
                     className="mt-4 w-full bg-surface-900 hover:bg-surface-800 text-white"
                     onClick={() => navigate(stage.link!)}
                   >
                     Resume
                   </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Quick summary below workflow */}
      <Card className="bg-white border-surface-200 mt-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-6 divide-x divide-surface-100">
            <div>
              <div className="text-xs text-surface-500 font-bold uppercase tracking-wider mb-1">Farmer</div>
              <div className="font-semibold text-surface-900">{activeTransaction.farmerName}</div>
            </div>
            <div className="pl-6">
              <div className="text-xs text-surface-500 font-bold uppercase tracking-wider mb-1">Crop</div>
              <div className="font-semibold text-surface-900">{activeTransaction.crop}</div>
            </div>
            <div className="pl-6">
              <div className="text-xs text-surface-500 font-bold uppercase tracking-wider mb-1">Expected Qty</div>
              <div className="font-semibold text-surface-900">{activeTransaction.expectedQuantity} Q</div>
            </div>
            <div className="pl-6">
              <div className="text-xs text-surface-500 font-bold uppercase tracking-wider mb-1">Status</div>
              <div className="font-semibold text-primary-700">{activeTransaction.status}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
