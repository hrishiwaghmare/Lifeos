import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Flame, 
  Target, 
  Calendar as CalendarIcon, 
  FileText, 
  BarChart3, 
  User, 
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { NavigationPage } from '../../types';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { activePage, setActivePage, tasks, habits, goals, profile, logout } = useApp();

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const activeGoalsCount = goals.filter((g) => g.status === 'active').length;
  const maxStreak = Math.max(...habits.map((h) => h.currentStreak), 0);

  const navItems: {
    id: NavigationPage;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: <CheckSquare className="w-4 h-4" />,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined,
    },
    {
      id: 'habits',
      label: 'Habits',
      icon: <Flame className="w-4 h-4" />,
      badge: maxStreak > 0 ? `${maxStreak}d` : undefined,
    },
    {
      id: 'goals',
      label: 'Goals',
      icon: <Target className="w-4 h-4" />,
      badge: activeGoalsCount > 0 ? activeGoalsCount : undefined,
    },
    {
      id: 'calendar',
      label: 'Calendar & Planner',
      icon: <CalendarIcon className="w-4 h-4" />,
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  const secondaryNavItems: {
    id: NavigationPage;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon className="w-4 h-4" />,
    },
  ];

  const handleNavClick = (pageId: NavigationPage) => {
    setActivePage(pageId);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            L
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white block">
              LIFEOS
            </span>
            <span className="text-[10px] text-slate-400 font-medium -mt-1 block">
              v1.0 Academic Edition
            </span>
          </div>
        </button>

        <button
          onClick={() => handleNavClick('landing')}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 rounded-lg text-xs flex items-center gap-1"
          title="Visit Public Landing Page"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Workspace Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
            Workspace
          </span>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="font-mono text-xs font-semibold tabular-nums text-slate-400 dark:text-slate-500">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
            Preferences
          </span>
          <div className="space-y-1">
            {secondaryNavItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Quick Info & Logout */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={() => handleNavClick('profile')}
            className="flex items-center gap-2.5 text-left min-w-0 flex-1 group"
          >
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
              onError={(e) => {
                // styled fallback container
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {profile.name}
              </span>
              <span className="text-[11px] text-slate-400 truncate block">
                {profile.email}
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors ml-1"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (260px wide) */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 z-30 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex animate-in fade-in"
          onClick={() => setMobileOpen(false)}
        >
          <div 
            className="w-72 h-full max-w-[85vw] animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
