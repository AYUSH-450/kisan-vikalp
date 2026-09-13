import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

interface ResponsiveSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: ReactNode;
  navItems: NavItem[];
  onLogout: () => void;
  theme?: 'admin' | 'officer';
  headerContent?: ReactNode;
}

export function ResponsiveSidebar({
  isOpen,
  setIsOpen,
  title,
  navItems,
  onLogout,
  theme = 'admin',
  headerContent
}: ResponsiveSidebarProps) {
  
  const isAdmin = theme === 'admin';
  const sidebarWidth = isAdmin ? 'w-72' : 'w-64';
  const bgClass = isAdmin ? 'bg-surface-900 text-white border-r border-surface-800' : 'bg-white border-r border-surface-200 text-surface-900';
  
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarWidth,
          bgClass,
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className={cn("h-16 flex items-center justify-between px-6 border-b", isAdmin ? "border-surface-800" : "border-surface-200")}>
          {title}
          <button 
            className="lg:hidden p-2 rounded-md hover:bg-surface-500/20 text-current" 
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {headerContent && (
          <div className={cn("px-6 py-3 border-b", isAdmin ? "border-surface-800 bg-surface-800/50" : "border-surface-200 bg-surface-50")}>
            {headerContent}
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsOpen(false)} // Close on navigate for mobile
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors group",
                      isActive
                        ? (isAdmin ? "bg-primary-600 text-white" : "bg-primary-50 text-primary-700")
                        : (isAdmin ? "text-surface-300 hover:bg-surface-800 hover:text-white" : "text-surface-600 hover:bg-surface-100 hover:text-surface-900")
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={cn("w-5 h-5 mr-3 flex-shrink-0 transition-colors", 
                        isActive 
                          ? (isAdmin ? "text-white" : "text-primary-700")
                          : (isAdmin ? "text-surface-400 group-hover:text-surface-200" : "text-surface-400 group-hover:text-surface-600")
                      )} />
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className={cn("p-4 border-t", isAdmin ? "border-surface-800" : "border-surface-200")}>
          <button onClick={onLogout} className={cn("flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors", 
            isAdmin ? "text-surface-300 hover:bg-surface-800 hover:text-white" : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
          )}>
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
