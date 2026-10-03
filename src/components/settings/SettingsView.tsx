import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sun, 
  Moon, 
  Bell, 
  Volume2, 
  Globe, 
  Shield, 
  Trash2, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    theme, 
    toggleTheme, 
    resetAllData, 
    openConfirmDialog 
  } = useApp();

  const handleResetPrompt = () => {
    openConfirmDialog({
      title: 'Reset Demo Data to Factory Defaults',
      message: 'This will reset all tasks, habits, goals, events, notes, and profile settings to the default academic presentation state. This action cannot be undone.',
      confirmLabel: 'Reset Everything',
      isDestructive: true,
      onConfirm: () => resetAllData(),
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          System Settings & Preferences
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure interface appearance, audio feedback cues, privacy controls, and data storage options.
        </p>
      </div>

      {/* Appearance Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Appearance & Visual Theme
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
              Color Theme
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Select your preferred visual style. Supports high-contrast dark mode.
            </span>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => {
                if (theme !== 'light') toggleTheme();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                theme === 'light'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light Mode</span>
            </button>
            <button
              onClick={() => {
                if (theme !== 'dark') toggleTheme();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications & Sound */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Notifications & Feedback
        </h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
              Daily Morning Summary Notification
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Receive a daily recap of due tasks, unbroken streaks, and classes.
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.dailySummary}
            onChange={(e) => updateSettings({ dailySummary: e.target.checked })}
            className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-0.5">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
              Achievement & Streak Confetti Animations
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Micro-celebrations upon completing milestones or hitting habit streaks.
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
            className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700"
          />
        </div>
      </div>

      {/* Localization */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Language & Regional Settings
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
              Display Language
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Choose the primary language for system alerts and date formats.
            </span>
          </div>

          <select
            value={settings.language}
            onChange={(e) => updateSettings({ language: e.target.value })}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            <option value="English (US)">English (US)</option>
            <option value="English (UK)">English (UK)</option>
            <option value="English (IN)">English (India)</option>
            <option value="German">Deutsch (German)</option>
            <option value="French">Français (French)</option>
          </select>
        </div>
      </div>

      {/* Data Management & Danger Zone */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400 pb-3 border-b border-slate-100 dark:border-slate-800">
          Data Governance & Reset
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
              Reset Demo Dataset
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Restores all sample tasks, habits, academic goals, calendar events, and notes to the pristine default state.
            </span>
          </div>

          <button
            onClick={handleResetPrompt}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors border border-rose-200 dark:border-rose-900 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
