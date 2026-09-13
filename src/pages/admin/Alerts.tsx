import { useState, useEffect } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock, Filter } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockService } from '../../services/mockDataService';
import type { Alert } from '../../types';

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    mockService.getAlerts().then(setAlerts);
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: newStatus as any } : a));
  };

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'All') return true;
    if (filter === 'Resolved') return a.status === 'Resolved';
    return a.severity === filter;
  });

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-surface-900 truncate">Operational Alerts</h1>
          <p className="text-sm sm:text-base text-surface-500">Real-time system events requiring attention</p>
        </div>
      </div>

      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-surface-200 flex gap-2 overflow-x-auto hide-scrollbar">
        <Filter className="w-5 h-5 text-surface-400 mr-2 my-auto shrink-0" />
        {['All', 'Critical', 'Warning', 'Info', 'Resolved'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors shrink-0 ${
              filter === f 
              ? 'bg-surface-900 text-white' 
              : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredAlerts.map(alert => {
          const isCritical = alert.severity === 'Critical';
          const isWarning = alert.severity === 'Warning';
          const isResolved = alert.status === 'Resolved';
          
          let bg = 'bg-white';
          let border = 'border-surface-200';
          let icon = <AlertCircle className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500" />;
          
          if (isResolved) {
            bg = 'bg-surface-50 opacity-70';
            icon = <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-green-500" />;
          } else if (isCritical) {
            border = 'border-red-300';
            icon = <AlertTriangle className="w-5 sm:w-6 h-5 sm:h-6 text-red-600" />;
          } else if (isWarning) {
            border = 'border-amber-300';
            icon = <AlertTriangle className="w-5 sm:w-6 h-5 sm:h-6 text-amber-500" />;
          }

          return (
            <Card key={alert.id} className={`${bg} shadow-sm border ${border} transition-all`}>
              <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row gap-4 sm:gap-6">
                <div className="flex-1 flex items-start gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-3 rounded-full shrink-0 ${isResolved ? 'bg-green-100' : isCritical ? 'bg-red-100' : 'bg-amber-100'}`}>
                    {icon}
                  </div>
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="font-bold text-base sm:text-lg text-surface-900 truncate">{alert.centreName}</h3>
                      <span className="flex items-center text-[10px] sm:text-xs text-surface-500 font-medium shrink-0">
                        <Clock className="w-3 h-3 mr-1" /> {alert.time}
                      </span>
                    </div>
                    <p className={`text-xs sm:text-sm ${isResolved ? 'text-surface-500 line-through' : 'text-surface-700 font-medium'}`}>
                      {alert.description}
                    </p>
                    {!isResolved && (
                      <div className="bg-surface-50 p-2 sm:p-3 rounded-md text-xs sm:text-sm text-surface-800 border border-surface-200 mt-2 sm:mt-3">
                        <strong>Recommended Action:</strong> {alert.recommendedAction}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col gap-2 min-w-[140px] border-t md:border-t-0 md:border-l border-surface-200 pt-3 md:pt-0 md:pl-6 justify-end md:justify-center mt-2 md:mt-0">
                  {alert.status === 'New' && (
                    <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => handleStatusChange(alert.id, 'Acknowledged')}>
                      Acknowledge
                    </Button>
                  )}
                  {alert.status !== 'Resolved' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto" onClick={() => handleStatusChange(alert.id, 'Resolved')}>
                      <CheckCircle2 className="w-4 h-4 mr-1 sm:mr-2" /> Resolve
                    </Button>
                  )}
                  {isResolved && (
                    <div className="text-sm font-bold text-green-600 flex items-center justify-center h-full w-full">
                      <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 mr-1" /> Resolved
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {filteredAlerts.length === 0 && (
          <div className="text-center p-12 bg-white rounded-lg border border-surface-200">
            <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-surface-900">All Clear</h3>
            <p className="text-surface-500">No {filter.toLowerCase()} alerts at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
