import { Outlet, NavLink } from 'react-router-dom';
import { Home, Calendar, Clock, User, Bell, Leaf } from 'lucide-react';
import { cn } from '../utils/cn';
import { useAuth } from '../context/AuthContext';

export function FarmerLayout() {
  const { logout } = useAuth();
  const navItems = [
    { to: '/farmer', icon: Home, label: 'Home', end: true },
    { to: '/farmer/book', icon: Calendar, label: 'Book' },
    { to: '/farmer/queue', icon: Clock, label: 'Queue' },
    { to: '/farmer/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface-50 text-surface-900 pb-16 md:pb-0 w-full overflow-hidden">
      {/* Header */}
      <header className="bg-primary-600 text-white p-4 flex justify-between items-center shadow-md z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold shadow-sm">
            <Leaf className="w-5 h-5" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">Kisan Vikalp</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-primary-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider border border-primary-500 hidden sm:block">Demo Mode</div>
          <button className="p-2 bg-primary-700 rounded-full hover:bg-primary-800 transition">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 bg-primary-700 rounded-full hover:bg-primary-800 transition" onClick={logout}>
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto md:max-w-4xl bg-surface-50 md:p-6 shadow-sm min-h-full">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-surface-200 flex justify-around items-center h-16 pb-safe md:hidden z-10">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-full h-full text-xs transition-colors",
                isActive ? "text-primary-600 font-medium" : "text-surface-500 hover:text-primary-500"
              )
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
