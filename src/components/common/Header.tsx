import React from 'react';
import { useApp } from '../../context/AppContext';
import { ThemeToggle } from './ThemeToggle';
import { Menu, Plus, CheckCircle2 } from 'lucide-react';
import { NavigationPage } from '../../types';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onQuickAdd?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, onQuickAdd, title }) => {
  const { activePage, setActivePage } = useApp();

  const getPageTitle = (page: NavigationPage): string => {
    switch (page) {
      case 'dashboard': return 'Dashboard';
      case 'tasks': return 'Task Management';
      case 'habits': return 'Habit Tracker';
      case 'goals': return 'Goal Tracker';
      case 'calendar': return 'Calendar & Planner';
      case 'notes': return 'Notes & Knowledge';
      case 'analytics': return 'Productivity Analytics';
      case 'profile': return 'My Profile';
      case 'settings': return 'System Settings';
      default: return 'Overview';
    }
  };

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between transition-colors">
      
      {/* Left: Mobile Toggle + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">Workspace</span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
          <h1 className="font-semibold text-slate-900 dark:text-white text-base">
            {title || getPageTitle(activePage)}
          </h1>
        </div>
      </div>

      {/* Right: Date, Quick Add, Theme Toggle, Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{todayFormatted}</span>
        </div>

        {onQuickAdd && (
          <button
            onClick={onQuickAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Item</span>
          </button>
        )}

        <ThemeToggle />

        <button
          onClick={() => setActivePage('profile')}
          className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-semibold text-xs border border-indigo-200 dark:border-indigo-800 hover:ring-2 hover:ring-indigo-500/20 transition-all"
          title="View Profile"
        >
          HW
        </button>
      </div>
    </header>
  );
};
