import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationPage } from '../../types';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  const handleNav = (page: NavigationPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                L
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                LIFEOS
              </span>
            </div>

            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 max-w-sm">
              &ldquo;Organize Your Life. Master Your Time. Achieve Your Goals.&rdquo;
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              An all-in-one personal productivity and life-management platform built to streamline tasks, habit loops, academic goals, and daily schedules in one synchronized workspace.
            </p>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              Developed as a 2nd-Year BTech Computer Science Main Academic Project.
            </div>
          </div>

          {/* Product Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tasks')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Smart Tasks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('habits')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Habit Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('goals')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Goal Setting
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('calendar')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Daily Planner
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  About Academic Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  FAQ & Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('analytics')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Productivity Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Contact & Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            &copy; 2026 LIFEOS. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Client-side Storage Enabled</span>
            <span aria-hidden="true">&middot;</span>
            <span>Production Grade SPA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
