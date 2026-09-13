import { Settings as SettingsIcon, Bell, Globe } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export default function AdminSettings() {
  const { addToast } = useToast();

  const handleSave = () => {
    addToast({ type: 'success', title: 'Settings Saved', message: 'Command Centre preferences updated.' });
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-4 sm:space-y-6 w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-surface-900 truncate">System Settings</h1>
          <p className="text-sm sm:text-base text-surface-500">Configure global parameters and thresholds</p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <Card className="bg-white shadow-sm border-surface-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-surface-200 flex items-center bg-surface-50">
            <Globe className="w-4 sm:w-5 h-4 sm:h-5 text-surface-500 mr-2 shrink-0" />
            <h2 className="font-bold text-base sm:text-lg text-surface-900 truncate">Region & Display</h2>
          </div>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-surface-700 mb-1">Active State</label>
                <select className="w-full p-2 text-sm sm:text-base border border-surface-300 rounded-md bg-surface-50" disabled>
                  <option>Demo Environment</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-surface-700 mb-1">Dashboard Language</label>
                <select className="w-full p-2 text-sm sm:text-base border border-surface-300 rounded-md">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-surface-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-surface-200 flex items-center bg-surface-50">
            <SettingsIcon className="w-4 sm:w-5 h-4 sm:h-5 text-surface-500 mr-2 shrink-0" />
            <h2 className="font-bold text-base sm:text-lg text-surface-900 truncate">AI & Capacity Thresholds</h2>
          </div>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <p className="text-xs sm:text-sm text-surface-500 mb-2 sm:mb-4">Adjust the sensitivity of the AI congestion prediction engine.</p>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-surface-700 mb-1">High Congestion Alert Threshold (%)</label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <input type="number" defaultValue={85} className="w-full sm:w-32 p-2 text-sm sm:text-base border border-surface-300 rounded-md" />
                <span className="text-xs sm:text-sm text-surface-500">Trigger critical alert if capacity exceeds this percentage.</span>
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-surface-700 mb-1">Load Balancing Buffer</label>
              <select className="w-full sm:w-64 p-2 text-sm sm:text-base border border-surface-300 rounded-md">
                <option>Conservative (10% capacity)</option>
                <option>Aggressive (5% capacity)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-surface-200">
          <div className="px-6 py-4 border-b border-surface-200 flex items-center bg-surface-50">
            <Bell className="w-5 h-5 text-surface-500 mr-2" />
            <h2 className="font-bold text-surface-900">Notification Preferences</h2>
          </div>
          <CardContent className="p-6 space-y-3">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 rounded border-surface-300" />
              <span className="ml-2 text-sm text-surface-700">Push Notifications for Critical Alerts</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 rounded border-surface-300" />
              <span className="ml-2 text-sm text-surface-700">Daily Digest Email</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-surface-300" />
              <span className="ml-2 text-sm text-surface-700">SMS Alerts for Centre Outages</span>
            </label>
          </CardContent>
        </Card>

        <Card className="bg-red-50 shadow-sm border-red-200">
          <div className="px-6 py-4 border-b border-red-200 flex items-center bg-red-100/50">
            <h2 className="font-bold text-red-900">Developer / Demo Tools</h2>
          </div>
          <CardContent className="p-6 space-y-3">
            <p className="text-sm text-red-800 mb-4">
              Use this option to reset the mock transaction state (TX938421) back to its initial 'Confirmed' status for repeated hackathon demonstrations.
            </p>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white" 
              onClick={async () => {
                const { mockService } = await import('../../services/mockDataService');
                await mockService.resetDemo();
                addToast({ type: 'success', title: 'Demo Reset', message: 'Transaction TX938421 restored to initial state.' });
              }}
            >
              Reset Demo State
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4 border-t border-surface-200">
          <Button className="bg-primary-600 hover:bg-primary-700 px-8" onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
