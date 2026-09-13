import { useState } from 'react';
import { Download, FileText, Calendar, PieChart, BarChart2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export default function Reports() {
  const { addToast } = useToast();
  const [dateRange, setDateRange] = useState('Last 7 Days');

  const reportTypes = [
    { title: 'Daily Procurement Summary', icon: FileText, desc: 'Aggregated totals of crop quantities across all centres.' },
    { title: 'Centre Utilization', icon: PieChart, desc: 'Efficiency metrics and capacity bottlenecks.' },
    { title: 'Farmer Arrivals & Wait Times', icon: ClockIcon, desc: 'Analytics on queue times and SLA breaches.' },
    { title: 'Payment Status Report', icon: BarChart2, desc: 'Financial disbursement tracking.' },
  ];

  function ClockIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
  }

  const handleExport = (title: string) => {
    addToast({ type: 'info', title: 'Export Started', message: `Generating ${title} report...` });
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-surface-900 truncate">Analytics & Reports</h1>
          <p className="text-sm sm:text-base text-surface-500">Generate and export system reports</p>
        </div>
      </div>

      <Card className="bg-white shadow-sm border-surface-200 mb-8">
        <div className="p-3 sm:p-4 border-b border-surface-200 bg-surface-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="font-bold text-surface-700 flex items-center">
            <Calendar className="w-4 sm:w-5 h-4 sm:h-5 mr-2" /> Date Range
          </div>
          <select 
            className="w-full sm:w-auto border-surface-300 rounded-md text-sm font-medium py-1.5 pl-3 pr-8 focus:ring-primary-500 focus:border-primary-500"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Season (Kharif)</option>
          </select>
        </div>
        <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {reportTypes.map(report => (
            <div key={report.title} className="border border-surface-200 rounded-lg p-4 sm:p-5 flex flex-col hover:border-primary-300 transition-colors bg-white">
              <div className="flex flex-col sm:flex-row items-start mb-4 gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-primary-50 text-primary-600 rounded-lg shrink-0">
                  <report.icon className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-surface-900">{report.title}</h3>
                  <p className="text-xs sm:text-sm text-surface-500 mt-1">{report.desc}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button variant="outline" className="w-full sm:flex-1 text-surface-700 bg-surface-50">View Online</Button>
                <Button className="w-full sm:flex-1 bg-primary-600 hover:bg-primary-700" onClick={() => handleExport(report.title)}>
                  <Download className="w-4 h-4 mr-1 sm:mr-2" /> Export CSV
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="bg-surface-50 p-6 rounded-xl border border-surface-200 text-center">
        <h3 className="font-bold text-surface-900 mb-2">Automated Report Delivery</h3>
        <p className="text-sm text-surface-600 mb-4 max-w-md mx-auto">
          Configure daily digest emails for district magistrates and state procurement officers.
        </p>
        <Button variant="outline">Manage Subscriptions</Button>
      </div>
    </div>
  );
}
