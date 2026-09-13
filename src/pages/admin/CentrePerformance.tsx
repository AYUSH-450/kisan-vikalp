import { useState, useEffect } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockService } from '../../services/mockDataService';
import type { Centre } from '../../types';

export default function CentrePerformance() {
  const [centres, setCentres] = useState<Centre[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    mockService.getProcurementCentres().then(setCentres);
  }, []);

  const filteredCentres = centres.filter(c => {
    if (filter === 'High Risk' && c.risk !== 'High') return false;
    if (filter === 'Low Load' && c.status !== 'Low Load') return false;
    if (filter === 'Medium Load' && c.status !== 'Medium Load') return false;
    if (filter === 'High Load' && c.status !== 'High Load') return false;
    
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-surface-900 truncate">Live Centres</h1>
          <p className="text-sm sm:text-base text-surface-500">Real-time performance metrics</p>
        </div>
      </div>

      <Card className="bg-white shadow-sm border-surface-200">
        <div className="p-4 border-b border-surface-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-50">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search centres..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-surface-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {['All', 'High Risk', 'High Load', 'Medium Load', 'Low Load'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                  filter === f 
                  ? 'bg-surface-900 text-white' 
                  : 'bg-white border border-surface-300 text-surface-700 hover:bg-surface-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-50 text-surface-500 uppercase text-xs font-bold border-b border-surface-200">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:bg-surface-100"><div className="flex items-center">Centre <ArrowUpDown className="w-3 h-3 ml-1" /></div></th>
                <th className="px-6 py-4">Farmers Today</th>
                <th className="px-6 py-4 cursor-pointer hover:bg-surface-100"><div className="flex items-center">Queue <ArrowUpDown className="w-3 h-3 ml-1" /></div></th>
                <th className="px-6 py-4">Average Wait</th>
                <th className="px-6 py-4">Processing Rate</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredCentres.map((centre) => {
                const capacityUtil = Math.round((centre.currentQueue / centre.capacity) * 100);
                
                return (
                  <tr key={centre.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-surface-900">{centre.name}</div>
                      <div className="text-xs text-surface-500">{centre.location}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-surface-700">
                      {(centre.expectedArrivals || 0) + centre.currentQueue + 50}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-surface-900">{centre.currentQueue}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${centre.averageWaitTimeMin > 60 ? 'text-red-600' : 'text-surface-700'}`}>
                        {centre.averageWaitTimeMin} min
                      </span>
                    </td>
                    <td className="px-6 py-4 text-surface-600">{centre.processingRatePerHour}/hour</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${capacityUtil > 85 ? 'text-red-600' : capacityUtil > 70 ? 'text-amber-600' : 'text-green-600'}`}>
                          {capacityUtil}%
                        </span>
                        <div className="w-16 h-2 bg-surface-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${capacityUtil > 85 ? 'bg-red-500' : capacityUtil > 70 ? 'bg-amber-500' : 'bg-green-500'}`} 
                            style={{ width: `${Math.min(capacityUtil, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={centre.status === 'High Load' ? 'destructive' : centre.status === 'Medium Load' ? 'warning' : 'success'}>
                        {centre.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={centre.risk === 'High' ? 'destructive' : centre.risk === 'Medium' ? 'warning' : 'success'} className="px-3 py-1">
                        {centre.risk}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
              
              {filteredCentres.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-surface-500">
                    No centres match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
