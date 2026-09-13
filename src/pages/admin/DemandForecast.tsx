import { useState, useEffect } from 'react';
import { AlertTriangle, ArrowRight, Activity, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockService } from '../../services/mockDataService';
import type { Forecast } from '../../types';

const forecastData = [
  { day: 'Mon', historical: 180, predicted: 180 },
  { day: 'Tue', historical: 240, predicted: 240 },
  { day: 'Wed', historical: 310, predicted: 310 },
  { day: 'Today', historical: 350, predicted: 350 },
  { day: 'Tomorrow', predicted: 470 },
  { day: 'Sat', predicted: 410 },
  { day: 'Sun', predicted: 280 },
];

export default function DemandForecast() {
  const [forecasts, setForecasts] = useState<Forecast[]>([]);

  useEffect(() => {
    mockService.getAIForecasts().then(setForecasts);
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center mb-1">
            <Zap className="w-5 h-5 text-indigo-600 mr-2 shrink-0" />
            <h1 className="text-xl sm:text-2xl font-bold text-surface-900 truncate">AI Demand Forecast</h1>
          </div>
          <p className="text-sm sm:text-base text-surface-500">Predictive analytics for state-wide capacity planning</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center shadow-sm shrink-0">
          <Activity className="w-4 h-4 mr-2" /> Simulated AI Engine
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forecast Chart */}
        <Card className="lg:col-span-2 bg-white shadow-sm border-surface-200 flex flex-col w-full overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-surface-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-base sm:text-lg font-bold text-surface-900 truncate">7-Day Demand Trend (Centre A)</h2>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
               <div className="flex items-center"><div className="w-3 h-3 bg-blue-600 rounded-full mr-2 shrink-0"></div> Historical</div>
               <div className="flex items-center"><div className="w-3 h-3 bg-indigo-500 rounded-full mr-2 border-2 border-white outline outline-1 outline-indigo-500 shrink-0"></div> Predicted</div>
            </div>
          </div>
          <CardContent className="p-4 sm:p-6 flex-1 min-w-0">
            <div className="h-[260px] sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} minTickGap={15} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} width={40} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <ReferenceLine x="Today" stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: '#ef4444', fontSize: 11 }} />
                  <ReferenceLine y={400} stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'right', value: 'Capacity', fill: '#f59e0b', fontSize: 11 }} />
                  <Line type="monotone" dataKey="historical" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="predicted" stroke="#6366f1" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Risks */}
        <div className="space-y-6 w-full">
          <h3 className="text-base sm:text-lg font-bold text-surface-900 mb-4 px-1 uppercase tracking-wider">High Congestion Risk</h3>
          
          {forecasts.filter(f => f.congestionRisk === 'HIGH').map((forecast, i) => {
            const gap = forecast.predictedFarmers - forecast.availableCapacity;
            return (
              <Card key={i} className="bg-red-50 border-red-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-red-900">Centre A</h4>
                      <p className="text-sm text-red-700">Tomorrow's Forecast</p>
                    </div>
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-red-700 font-bold uppercase mb-1">Predicted</div>
                      <div className="text-2xl font-black text-red-900">{forecast.predictedFarmers}</div>
                    </div>
                    <div>
                      <div className="text-xs text-red-700 font-bold uppercase mb-1">Capacity Gap</div>
                      <div className="text-2xl font-black text-red-600">+{gap}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-red-800 leading-relaxed mb-4">
                    High risk because predicted arrivals exceed current centre capacity by {Math.round((gap / forecast.availableCapacity) * 100)}%.
                  </p>
                  
                  <div className="bg-white/60 p-4 rounded-lg">
                    <div className="text-xs font-bold text-surface-900 uppercase tracking-wider mb-2 flex items-center">
                      <Zap className="w-3 h-3 text-indigo-600 mr-1" /> AI Recommendations
                    </div>
                    <ul className="space-y-2 text-sm text-surface-800">
                      {forecast.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-indigo-600 mr-2 font-bold">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Load Balancing Simulation */}
      <Card className="bg-white shadow-sm border-surface-200 mt-8">
         <div className="px-6 py-4 border-b border-surface-200 bg-surface-50 flex items-center">
            <Activity className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-bold text-surface-900">Load Balancing Simulation</h2>
         </div>
         <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-surface-600 mb-6 leading-relaxed">
                  The AI engine recommends directing <strong>120 future bookings</strong> from District North (Centre A) toward District East (Centre B) to optimize state-wide wait times.
                </p>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-surface-900">Centre A (High Load)</span>
                      <span className="text-red-600 font-bold">117% Util</span>
                    </div>
                    <div className="w-full bg-surface-200 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center text-surface-400"><ArrowRight className="w-6 h-6 rotate-90 md:rotate-0" /></div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-surface-900">Centre B (Low Load)</span>
                      <span className="text-green-600 font-bold">62% Util → 88% Util</span>
                    </div>
                    <div className="w-full bg-surface-200 rounded-full h-2.5 relative">
                      <div className="bg-green-500 h-2.5 rounded-full absolute left-0" style={{ width: '62%' }}></div>
                      <div className="bg-green-300 h-2.5 rounded-r-full absolute left-[62%]" style={{ width: '26%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
                 <div className="text-indigo-900 font-bold mb-2 uppercase tracking-wider text-sm">Potential Wait Time Reduction</div>
                 <div className="text-5xl font-black text-indigo-600 mb-4">-42 min</div>
                 <p className="text-indigo-800 text-sm">per farmer in District North</p>
                 <Button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700">
                   Apply Capacity Rules to Smart Slots
                 </Button>
                 <div className="text-xs text-indigo-500 mt-3 font-medium">Demo AI Prediction</div>
              </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
