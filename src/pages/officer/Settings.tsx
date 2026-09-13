import { Settings2, AlertTriangle, MonitorStop } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function Settings() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900 mb-1">Operational Settings</h1>
        <p className="text-surface-500">Manage Centre B capacity and report delays</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Capacity Management */}
        <section>
          <div className="flex items-center mb-4">
            <Settings2 className="w-5 h-5 text-primary-600 mr-2" />
            <h2 className="text-lg font-bold">Counter Capacity</h2>
          </div>
          <Card className="bg-white shadow-sm border-surface-200">
            <CardContent className="p-0 divide-y divide-surface-100">
              <div className="p-4 flex items-center justify-between hover:bg-surface-50">
                <div>
                  <div className="font-bold text-surface-900">Counter 1</div>
                  <div className="text-xs text-green-600 font-medium">Active</div>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-surface-50">
                <div>
                  <div className="font-bold text-surface-900">Counter 2</div>
                  <div className="text-xs text-green-600 font-medium">Active</div>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-surface-50">
                <div>
                  <div className="font-bold text-surface-900">Counter 3</div>
                  <div className="text-xs text-surface-500 font-medium">Offline</div>
                </div>
                <div className="w-12 h-6 bg-surface-300 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
                </div>
              </div>
              <div className="p-4 bg-surface-50 flex items-center justify-between border-t-2 border-surface-200">
                <span className="font-bold text-surface-700">Total Active</span>
                <span className="font-black text-xl text-primary-700">2 / 3</span>
              </div>
            </CardContent>
          </Card>
          <p className="text-xs text-surface-500 mt-2">
            Changing active counters automatically updates the Smart Slot prediction engine for new bookings.
          </p>
        </section>

        {/* Delay Reporting */}
        <section>
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
            <h2 className="text-lg font-bold">Report Delay</h2>
          </div>
          <Card className="bg-white shadow-sm border-surface-200">
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-surface-600 mb-2">
                Reporting a delay recalculates ETAs for all farmers currently in the queue.
              </p>
              
              <div className="space-y-2">
                {['Equipment Issue', 'Staff Shortage', 'Network Problem', 'Quality Inspection Delay', 'Other'].map(delay => (
                  <label key={delay} className="flex items-center p-3 border border-surface-200 rounded-lg hover:bg-surface-50 cursor-pointer">
                    <input type="radio" name="delay_type" className="w-4 h-4 text-primary-600 border-surface-300 focus:ring-primary-500" />
                    <span className="ml-3 font-medium text-surface-700">{delay}</span>
                  </label>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-sm font-medium text-surface-700 mb-1">Estimated Delay (Minutes)</label>
                <input type="number" className="w-full p-2 border border-surface-300 rounded-md" placeholder="e.g. 30" />
              </div>

              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white mt-4">
                <MonitorStop className="w-4 h-4 mr-2" />
                Broadcast Delay to Queue
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
