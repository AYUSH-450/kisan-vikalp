import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutDashboard, Barcode, Users, ListOrdered, Scale, CheckCircle, FileText, Settings, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ResponsiveSidebar } from '../components/common/ResponsiveSidebar';

export function OfficerLayout() {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navItems = [
    { to: '/officer', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/officer/scanner', icon: Barcode, label: 'PDF417 Scanner' },
    { to: '/officer/queue', icon: Users, label: 'Live Queue' },
    { to: '/officer/transaction', icon: ListOrdered, label: 'Transactions' },
    { to: '/officer/procurement', icon: CheckCircle, label: 'Procurement' },
    { to: '/officer/quality', icon: FileText, label: 'Quality' },
    { to: '/officer/weighing', icon: Scale, label: 'Weighing' },
    { to: '/officer/completed', icon: CheckCircle, label: 'Completed' },
    { to: '/officer/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-surface-50 w-full overflow-hidden">
      <ResponsiveSidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        title={<h1 className="text-xl font-bold text-primary-700">Officer Portal</h1>}
        navItems={navItems}
        onLogout={logout}
        theme="officer"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        <header className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-surface-100 text-surface-600"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="font-semibold text-lg text-primary-700 truncate lg:hidden">Officer Portal</div>
            <div className="hidden lg:block bg-primary-100 text-primary-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider border border-primary-200">Demo Mode</div>
          </div>
          
          <div className="ml-auto flex items-center space-x-3 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-surface-700">Online</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold shrink-0">
              OP
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
