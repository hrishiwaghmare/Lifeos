/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { ConfirmModal } from './components/common/ConfirmModal';

// Workspace Views
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { TaskManager } from './components/tasks/TaskManager';
import { HabitTracker } from './components/habits/HabitTracker';
import { GoalTracker } from './components/goals/GoalTracker';
import { CalendarPlanner } from './components/calendar/CalendarPlanner';
import { NotesManager } from './components/notes/NotesManager';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { UserProfileView } from './components/profile/UserProfile';
import { SettingsView } from './components/settings/SettingsView';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { NavigationPage } from './types';

const MainLayout: React.FC = () => {
  const { activePage, setActivePage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync hash with active page for smooth routing & back-button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '') as NavigationPage;
      const validPages: NavigationPage[] = [
        'landing', 'dashboard', 'tasks', 'habits', 'goals',
        'calendar', 'notes', 'analytics', 'profile', 'settings',
        'about', 'contact', 'faq', 'privacy', 'terms', 'login', 'signup'
      ];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setActivePage]);

  // Keep hash updated when activePage changes
  useEffect(() => {
    if (activePage === 'landing') {
      if (window.location.hash !== '') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } else {
      window.location.hash = `#/${activePage}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Determine if active page is a public marketing/info page or authenticated workspace
  const isPublicPage = [
    'landing',
    'about',
    'contact',
    'faq',
    'privacy',
    'terms',
    'login',
    'signup',
  ].includes(activePage);

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        {activePage === 'landing' && <LandingPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'faq' && <FAQPage />}
        {activePage === 'privacy' && <PrivacyPolicyPage />}
        {activePage === 'terms' && <TermsConditionsPage />}
        {activePage === 'login' && <LoginPage />}
        {activePage === 'signup' && <SignUpPage />}
        <ToastContainer />
        <ConfirmModal />
      </div>
    );
  }

  // Render Authenticated SaaS Workspace Shell
  return (
    <div className="min-h-screen flex bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sidebar (Desktop 260px + Mobile Drawer) */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onQuickAdd={
            activePage === 'tasks' || activePage === 'dashboard'
              ? undefined // Task manager has its own modal trigger
              : undefined
          }
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activePage === 'dashboard' && <DashboardOverview />}
          {activePage === 'tasks' && <TaskManager />}
          {activePage === 'habits' && <HabitTracker />}
          {activePage === 'goals' && <GoalTracker />}
          {activePage === 'calendar' && <CalendarPlanner />}
          {activePage === 'notes' && <NotesManager />}
          {activePage === 'analytics' && <AnalyticsDashboard />}
          {activePage === 'profile' && <UserProfileView />}
          {activePage === 'settings' && <SettingsView />}
        </main>
      </div>

      <ToastContainer />
      <ConfirmModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
