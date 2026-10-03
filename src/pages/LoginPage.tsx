import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PublicHeader } from '../components/common/PublicHeader';
import { Footer } from '../components/common/Footer';
import { ArrowRight, Lock, Mail, CheckCircle2, Shield } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, setActivePage } = useApp();
  const [email, setEmail] = useState('hrishikeshwaghmare07@gmail.com');
  const [password, setPassword] = useState('demo1234');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'Hrishikesh Waghmare');
  };

  const handleDemoSignIn = () => {
    login('hrishikeshwaghmare07@gmail.com', 'Hrishikesh Waghmare');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <PublicHeader />

      <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl mx-auto shadow-md shadow-indigo-600/30">
              L
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Welcome back to LIFEOS
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sign in to access your personal dashboard, daily habits, and academic goals.
            </p>
          </div>

          {/* Quick Demo Sign In Button */}
          <button
            onClick={handleDemoSignIn}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Instant Demo Sign-in (Pre-filled CSE Student)</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Or with credentials</span>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.01]"
            >
              <span>Sign In to LIFEOS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Architecture note */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed border border-slate-100 dark:border-slate-800 flex items-start gap-2">
            <Shield className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> Initial working version uses high-speed LocalStorage authentication. Architecture is designed to plug directly into Supabase or Firebase Authentication in Phase 2.
            </span>
          </div>

          <div className="text-center text-xs text-slate-500">
            Don&apos;t have an account yet?{' '}
            <button
              onClick={() => setActivePage('signup')}
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
