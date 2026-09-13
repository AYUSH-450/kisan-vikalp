import { Users, CheckCircle, Clock, Activity, BarChart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function OfficerDashboard() {
  const navigate = useNavigate();

  const kpis = [
    { title: "Today's Farmers", value: '284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: "Completed", value: '176', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { title: "Waiting", value: '68', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: "Avg Wait", value: '34 min', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: "Capacity", value: '82%', icon: BarChart, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { title: "Processing Rate", value: '20/hr', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-100' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-surface-900 truncate">Centre Operations</h1>
          <p className="text-sm sm:text-base text-surface-500">Live dashboard for Centre B</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <Button onClick={() => navigate('/officer/scanner')} className="bg-primary-600 hover:bg-primary-700">
            Scan PDF417 Pass
          </Button>
          <Button variant="outline" onClick={() => navigate('/officer/queue')}>
            Manage Queue
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className="bg-white shadow-sm border-surface-200">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className={`p-3 rounded-full ${kpi.bg} ${kpi.color} mb-3`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-surface-900">{kpi.value}</span>
              <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">{kpi.title}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white shadow-sm border-surface-200">
        <div className="px-6 py-4 border-b border-surface-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-surface-900">Live Queue</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/officer/queue')}>
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-50 text-surface-500 uppercase text-xs font-bold border-b border-surface-200">
              <tr>
                <th className="px-6 py-3">Token</th>
                <th className="px-6 py-3">Farmer</th>
                <th className="px-6 py-3">Crop / Qty</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Expected Time</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {[
                { token: 'A034', farmer: 'Suresh Rao', crop: 'Wheat', qty: '40 Q', status: 'Weighing', time: '11:05 AM' },
                { token: 'A035', farmer: 'Amit Patel', crop: 'Paddy', qty: '20 Q', status: 'Quality Inspection', time: '11:10 AM' },
                { token: 'A036', farmer: 'Kisan Singh', crop: 'Paddy', qty: '50 Q', status: 'Checked In', time: '11:15 AM' },
                { token: 'A042', farmer: 'Ramesh Kumar', crop: 'Paddy', qty: '30 Q', status: 'Confirmed', time: '11:35 AM', isDemo: true },
              ].map((row, i) => (
                <tr key={i} className={`hover:bg-surface-50 ${row.isDemo ? 'bg-primary-50/30' : ''}`}>
                  <td className="px-6 py-4 font-mono font-bold text-surface-900">
                    {row.token}
                    {row.isDemo && <span className="ml-2 text-[10px] bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded font-bold uppercase">Demo</span>}
                  </td>
                  <td className="px-6 py-4 font-medium text-surface-900">{row.farmer}</td>
                  <td className="px-6 py-4 text-surface-600">{row.crop} <span className="text-surface-400 mx-1">•</span> {row.qty}</td>
                  <td className="px-6 py-4">
                    <Badge variant={row.status === 'Confirmed' ? 'outline' : 'success'} className="text-[11px]">
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-medium text-surface-600">{row.time}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" onClick={() => row.isDemo ? navigate('/officer/scanner') : null}>
                      {row.status === 'Confirmed' ? 'Verify' : 'Process'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
