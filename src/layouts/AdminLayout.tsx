import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutDashboard, Map, BarChart3, AlertTriangle, FileText, Settings, Building2, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ResponsiveSidebar } from '../components/common/ResponsiveSidebar';

export function AdminLayout() {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
    { to: '/admin/map', icon: Map, label: 'GIS Command Centre' },
    { to: '/admin/centres', icon: Building2, label: 'Live Centres' },
    { to: '/admin/forecast', icon: BarChart3, label: 'AI Forecast' },
    { to: '/admin/alerts', icon: AlertTriangle, label: 'Operational Alerts' },
    { to: '/admin/reports', icon: FileText, label: 'Reports & Analytics' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden w-full">
      <ResponsiveSidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        title={<h1 className="text-xl font-bold tracking-tight">KISAN VIKALP</h1>}
        navItems={navItems}
        onLogout={logout}
        theme="admin"
        headerContent={
          <>
            <div className="text-xs uppercase tracking-wider text-surface-400 font-semibold mb-1">System Status</div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
              <span className="font-medium text-green-400">Operational</span>
            </div>
          </>
        }
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        <header className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-surface-100 text-surface-600"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-surface-800 truncate">Command Centre</h2>
            <div className="hidden sm:block bg-surface-100 text-surface-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider border border-surface-300">Demo</div>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="hidden sm:block text-sm text-surface-500 font-medium">Govt Admin</div>
            <div className="h-8 w-8 rounded-full bg-surface-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
              GA
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-surface-50 p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
