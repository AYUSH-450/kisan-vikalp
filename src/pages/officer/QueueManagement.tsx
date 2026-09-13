import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Check, AlertTriangle, Users } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { mockService } from '../../services/mockDataService';
import { useOfficerContext } from '../../features/officer/OfficerContext';

export default function QueueManagement() {
  const navigate = useNavigate();
  const { activeTransaction } = useOfficerContext();
  const [queue, setQueue] = useState<any>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    mockService.getQueue('C_B').then(setQueue);
  }, []);

  if (!queue) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Queue Management</h1>
          <p className="text-surface-500">Live view of Centre B processing line</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant={isPaused ? "default" : "outline"} 
            className={isPaused ? "bg-amber-500 hover:bg-amber-600 border-amber-500" : "text-amber-600 border-amber-200 hover:bg-amber-50"}
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
            {isPaused ? "Resume Queue" : "Pause Queue"}
          </Button>
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report Delay
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          <Card className={`border-2 shadow-md ${isPaused ? 'border-amber-400 bg-amber-50' : 'border-primary-500 bg-primary-50'}`}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h2 className={`text-sm font-bold uppercase tracking-wider mb-2 ${isPaused ? 'text-amber-800' : 'text-primary-700'}`}>
                  {isPaused ? 'Queue Paused' : 'Currently Serving'}
                </h2>
                <div className="text-5xl font-black font-mono tracking-tight text-surface-900">{queue.currentlyServing}</div>
              </div>
              <div className="flex flex-col gap-3 w-48">
                <Button className="w-full bg-surface-900 text-white hover:bg-surface-800" disabled={isPaused}>
                  <Check className="w-4 h-4 mr-2" /> Mark Completed
                </Button>
                <Button className="w-full bg-primary-600 hover:bg-primary-700" disabled={isPaused}>
                  Call Next <Play className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-surface-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-surface-200 bg-surface-50 flex items-center">
                <Users className="w-5 h-5 text-surface-500 mr-2" />
                <h3 className="font-bold text-surface-900">Next in line ({queue.next.length})</h3>
             </div>
             <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-surface-100">
                  {queue.next.map((token: string, idx: number) => {
                    // Inject active transaction into the mock list for the demo
                    const isDemoTx = token === activeTransaction?.tokenNumber;
                    
                    return (
                      <tr key={token} className={isDemoTx ? 'bg-primary-50/50' : 'hover:bg-surface-50'}>
                        <td className="px-6 py-4 font-mono font-bold text-surface-500">{idx + 1}</td>
                        <td className="px-6 py-4 font-mono font-bold text-lg text-surface-900">
                          {token}
                          {isDemoTx && <span className="ml-3 text-[10px] bg-primary-100 text-primary-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Demo Farmer</span>}
                        </td>
                        <td className="px-6 py-4">
                          {isDemoTx ? (
                             <Badge variant="outline" className="border-primary-200 text-primary-700 bg-white">Checked In</Badge>
                          ) : (
                             <Badge variant="outline" className="text-surface-500 border-surface-200">Waiting</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <Button variant="ghost" size="sm" onClick={() => isDemoTx ? navigate('/officer/transaction') : null}>
                             View Details
                           </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
             </table>
          </Card>
        </div>

        <div className="space-y-4">
           <Card className="bg-white border-surface-200 shadow-sm">
             <CardContent className="p-5 flex flex-col gap-1">
               <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">Queue Length</span>
               <span className="text-3xl font-bold text-surface-900">{queue.next.length + 1}</span>
             </CardContent>
           </Card>
           <Card className="bg-white border-surface-200 shadow-sm">
             <CardContent className="p-5 flex flex-col gap-1">
               <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">Avg Waiting Time</span>
               <span className="text-3xl font-bold text-amber-600">{queue.averageWaitTimeMin} min</span>
             </CardContent>
           </Card>
           <Card className="bg-white border-surface-200 shadow-sm">
             <CardContent className="p-5 flex flex-col gap-1">
               <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">Processing Rate</span>
               <span className="text-3xl font-bold text-blue-600">20 / hr</span>
             </CardContent>
           </Card>
           <Card className="bg-white border-surface-200 shadow-sm">
             <CardContent className="p-5 flex flex-col gap-1">
               <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">Est. Completion</span>
               <span className="text-3xl font-bold text-green-600">02:15 PM</span>
               <span className="text-xs text-surface-500 mt-1">Based on current rate</span>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
