import { ArrowLeft, Globe, Volume2, MessageSquare, Smartphone, UserCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-surface-50">
      <header className="bg-primary-600 text-white px-4 py-8 flex flex-col items-center justify-center relative">
        <button onClick={() => navigate('/farmer')} className="absolute top-4 left-4 p-2 text-white/80 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-3">
          <UserCircle className="w-16 h-16 text-primary-300" />
        </div>
        <h1 className="text-2xl font-bold">Ramesh Kumar</h1>
        <p className="text-primary-100 font-medium">+91 9876543210</p>
      </header>

      <div className="p-4 space-y-6 -mt-4 relative z-10">
        <section>
          <h2 className="text-sm font-bold text-surface-500 uppercase tracking-wider mb-2 ml-1">Language & Voice</h2>
          <Card className="bg-white shadow-sm border-surface-200 overflow-hidden">
            <CardContent className="p-0 divide-y divide-surface-100">
              <div className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-surface-50">
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-surface-400 mr-3" />
                  <span className="font-medium text-surface-700">App Language</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-primary-600 mr-2">English</span>
                  <div className="text-surface-300">›</div>
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-surface-50">
                <div className="flex items-center">
                  <Volume2 className="w-5 h-5 text-surface-400 mr-3" />
                  <span className="font-medium text-surface-700">Voice Assistance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-6 bg-primary-500 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-sm font-bold text-surface-500 uppercase tracking-wider mb-2 ml-1">Accessibility (No Internet)</h2>
          <Card className="bg-white shadow-sm border-surface-200 overflow-hidden">
            <CardContent className="p-0 divide-y divide-surface-100">
              <div className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-surface-50">
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 text-surface-400 mr-3" />
                  <div className="flex flex-col">
                    <span className="font-medium text-surface-700">SMS Updates</span>
                    <span className="text-xs text-surface-500">Receive queue status via SMS</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-6 bg-primary-500 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-surface-50">
                <div className="flex items-center">
                  <Smartphone className="w-5 h-5 text-surface-400 mr-3" />
                  <div className="flex flex-col">
                    <span className="font-medium text-surface-700">IVR Call Alerts</span>
                    <span className="text-xs text-surface-500">Get a phone call when it's your turn</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-6 bg-surface-300 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <button onClick={() => navigate('/login')} className="w-full py-4 flex items-center justify-center text-red-600 font-bold bg-white rounded-xl shadow-sm border border-surface-200 hover:bg-red-50 transition">
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out Demo
        </button>
      </div>
    </div>
  );
}
