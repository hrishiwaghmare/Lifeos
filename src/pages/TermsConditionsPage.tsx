import React from 'react';
import { PublicHeader } from '../components/common/PublicHeader';
import { Footer } from '../components/common/Footer';
import { FileText, CheckCircle2 } from 'lucide-react';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <PublicHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>Academic Platform Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-400">
            Effective Date: October 2026 &middot; Academic Year 2026-2027
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and utilizing LIFEOS (&ldquo;the Application&rdquo;), you acknowledge and accept these Terms and Conditions. LIFEOS is developed as a student capstone engineering project intended for personal productivity, educational management, and time tracking.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. Acceptable Use
            </h2>
            <p>
              You agree to use LIFEOS for lawful personal organization, academic scheduling, and project planning. You must not attempt to compromise application integrity, inject malicious code into client storage scripts, or deploy automated scrapers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Academic Disclaimer & Availability
            </h2>
            <p>
              The platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis for demonstration and academic evaluation. While we strive for maximum data stability and 100% offline uptime via LocalStorage, the development team is not liable for data loss caused by manual browser cache clearances or hardware device failures.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Intellectual Property
            </h2>
            <p>
              The design system, branding, component implementations, and algorithm architectures of LIFEOS are the academic property of the student development team. Open-source dependencies (React, Tailwind CSS, Lucide icons) remain governed by their respective licenses.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              5. Modifications
            </h2>
            <p>
              These terms may be updated as LIFEOS evolves toward multi-tenant cloud storage and mobile app distribution.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
