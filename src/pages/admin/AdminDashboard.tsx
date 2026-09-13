import { useState, useEffect } from 'react';
import { Users, Building2, CheckCircle, Clock, Activity, BarChart2, AlertTriangle, ChevronRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from 'recharts';
import { Card, CardContent } from '../../components/ui/Card';
import { mockService } from '../../services/mockDataService';

const hourlyData = [
  { time: '08:00', farmers: 1200 },
  { time: '09:00', farmers: 2100 },
  { time: '10:00', farmers: 3400 },
  { time: '11:00', farmers: 4200 },
  { time: '12:00', farmers: 3800 },
  { time: '13:00', farmers: 2500 },
  { time: '14:00', farmers: 2900 },
  { time: '15:00', farmers: 3100 },
  { time: '16:00', farmers: 2400 },
  { time: '17:00', farmers: 1800 },
];

const waitTimeData = [
  { time: '08:00', wait: 12 },
  { time: '09:00', wait: 18 },
  { time: '10:00', wait: 24 },
  { time: '11:00', wait: 35 },
  { time: '12:00', wait: 42 },
  { time: '13:00', wait: 38 },
  { time: '14:00', wait: 31 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    mockService.getAdminStats().then(setStats);
  }, []);

  if (!stats) return <div className="p-6">Loading...</div>;

  const kpis = [
    { label: 'Total Centres', value: stats.totalCentres, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Centres', value: stats.active, icon: Activity, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Farmers Today', value: stats.farmersToday.toLocaleString(), icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Completed', value: stats.completed.toLocaleString(), icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Average Wait', value: `${stats.averageWaitMin} min`, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Avg Processing', value: `${stats.averageProcessingMin} min`, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Capacity Util', value: `${stats.capacityPercent}%`, icon: BarChart2, color: 'text-cyan-600', bg: 'bg-cyan-100' },
    { label: 'High Risk', value: stats.highRiskCentres, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 mb-1">Command Centre Overview</h1>
          <p className="text-surface-500">State-wide procurement operations status</p>
        </div>
        <div className="text-sm font-medium text-surface-500 bg-white px-4 py-2 rounded-md shadow-sm border border-surface-200">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className="bg-white shadow-sm border-surface-200">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className={`p-2 rounded-full ${kpi.bg} ${kpi.color} mb-3`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-surface-900 mb-1">{kpi.value}</span>
              <span className="text-[10px] font-bold text-surface-500 uppercase tracking-wider">{kpi.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Arrivals Chart */}
        <Card className="bg-white shadow-sm border-surface-200 flex flex-col w-full overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-surface-200">
            <h2 className="text-base sm:text-lg font-bold text-surface-900 truncate">Farmers Processed by Hour</h2>
          </div>
          <CardContent className="p-4 sm:p-6 flex-1 min-w-0">
            <div className="h-[260px] sm:h-[300px] lg:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFarmers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} minTickGap={15} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} width={40} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="farmers" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorFarmers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Wait Time Chart */}
        <Card className="bg-white shadow-sm border-surface-200 flex flex-col w-full overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-surface-200">
            <h2 className="text-base sm:text-lg font-bold text-surface-900 truncate">Average Waiting Time (Mins)</h2>
          </div>
          <CardContent className="p-4 sm:p-6 flex-1 min-w-0">
            <div className="h-[260px] sm:h-[300px] lg:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waitTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} minTickGap={15} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} width={30} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="wait" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Capacity Overview */}
        <Card className="lg:col-span-2 bg-white shadow-sm border-surface-200 flex flex-col w-full overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-surface-200 flex flex-wrap gap-2 justify-between items-center">
            <h2 className="text-base sm:text-lg font-bold text-surface-900 truncate">Top Centres by Capacity Utilization</h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center shrink-0">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <CardContent className="p-4 sm:p-6 flex-1 min-w-0">
             <div className="h-[260px] sm:h-[300px] lg:h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={[
                    { name: 'Centre A', utilization: 94 },
                    { name: 'Centre F', utilization: 88 },
                    { name: 'Centre D', utilization: 82 },
                    { name: 'Centre K', utilization: 79 },
                    { name: 'Centre B', utilization: 62 },
                 ]} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                   <XAxis type="number" domain={[0, 100]} stroke="#6b7280" fontSize={11} />
                   <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={11} width={65} tick={{ fontSize: 11 }} />
                   <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                   <Bar dataKey="utilization" radius={[0, 4, 4, 0]}>
                     {
                       [94, 88, 82, 79, 62].map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry > 90 ? '#ef4444' : entry > 80 ? '#f59e0b' : '#3b82f6'} />
                       ))
                     }
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

        {/* Critical Alerts Preview */}
        <Card className="bg-white shadow-sm border-surface-200">
          <div className="px-4 sm:px-6 py-4 border-b border-surface-200 flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-bold text-surface-900 flex items-center truncate">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2 shrink-0" /> Action Required
            </h2>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-surface-100">
              <div className="p-4 sm:p-5 hover:bg-surface-50">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                  <span className="font-bold text-surface-900">Centre A</span>
                  <span className="text-[10px] sm:text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded uppercase shrink-0">Critical</span>
                </div>
                <p className="text-sm text-surface-600">High congestion risk. Queue exceeds capacity.</p>
                <div className="mt-2 text-xs text-surface-500">10:15 AM</div>
              </div>
              <div className="p-4 sm:p-5 hover:bg-surface-50">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                  <span className="font-bold text-surface-900">Centre D</span>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded uppercase shrink-0">Warning</span>
                </div>
                <p className="text-sm text-surface-600">Processing slowdown detected. Average wait rising.</p>
                <div className="mt-2 text-xs text-surface-500">09:45 AM</div>
              </div>
              <div className="p-4 text-center">
                <button className="text-sm font-medium text-primary-600 hover:text-primary-700 w-full sm:w-auto">View All Alerts</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
