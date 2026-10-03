import React from 'react';
import { PublicHeader } from '../components/common/PublicHeader';
import { Footer } from '../components/common/Footer';
import { ShieldCheck, Lock, Database, EyeOff } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <PublicHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy-First Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: October 2026 &middot; Version 1.0 (Academic Edition)
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-500" />
              1. Local-First Client Storage
            </h2>
            <p>
              LIFEOS is built with a client-first privacy architecture. In this release, all data you input—including your task lists, daily habit streaks, semester goals, personal study notes, and schedule timetables—is stored strictly within your browser&apos;s local storage (<code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code>).
            </p>
            <p>
              We do not transmit, sell, or analyze your personal study data on external telemetry servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-indigo-500" />
              2. Zero Surveillance & Third-Party Tracking
            </h2>
            <p>
              We do not embed third-party advertising scripts, biometric profiling, or cross-site tracking pixels. The application operates self-contained in your browser.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-500" />
              3. Data Ownership & Deletion Rights
            </h2>
            <p>
              You maintain total ownership of your data at all times. You can purge or reset your entire dataset back to default templates at any moment via the <strong className="text-slate-900 dark:text-white">System Settings &gt; Reset Demo Data</strong> control, or by clearing your browser cache.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Future Cloud Synchronization Protocols
            </h2>
            <p>
              When optional cloud synchronization (e.g. Supabase or Firebase Authentication) is introduced in future releases, users will have explicit opt-in controls with end-to-end transport layer security (TLS 1.3) and strict role-based access controls.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              5. Contact Regarding Privacy
            </h2>
            <p>
              If you have any questions regarding privacy architecture, please contact the engineering team at{' '}
              <a href="mailto:hrishikeshwaghmare07@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                hrishikeshwaghmare07@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
