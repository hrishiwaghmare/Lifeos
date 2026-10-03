import React from 'react';
import { useApp } from '../context/AppContext';
import { PublicHeader } from '../components/common/PublicHeader';
import { Footer } from '../components/common/Footer';
import { 
  Target, 
  CheckCircle2, 
  Lightbulb, 
  Cpu, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Cloud,
  Smartphone,
  Bot
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useApp();

  const objectives = [
    {
      title: 'Improve Time Management',
      desc: 'Eliminate scheduling overlaps and provide actionable visibility into daily revision hours.',
    },
    {
      title: 'Improve Personal Organization',
      desc: 'Unify lecture notes, exam dates, reading lists, and project codebases into one interface.',
    },
    {
      title: 'Manage Daily Tasks with Priority',
      desc: 'Dynamic filtering by urgency (High, Medium, Low) and categories (Study, Work, Health).',
    },
    {
      title: 'Build Consistent Habits',
      desc: 'Maintain atomic habits with 7-day matrices, streak counters, and non-intrusive feedback.',
    },
    {
      title: 'Track Academic & Career Goals',
      desc: 'Deconstruct long-term semester aspirations into bite-sized, verifiable milestones.',
    },
    {
      title: 'Analyze Productivity Quantitatively',
      desc: 'Provide evidence-based velocity charts and performance scores to reveal actual focus output.',
    },
  ];

  const futureScopeItems = [
    {
      icon: <Bot className="w-5 h-5 text-indigo-500" />,
      title: 'AI Personal Productivity Assistant',
      desc: 'Intelligent context-aware agent for summarizing study materials and synthesizing revision notes.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: 'AI Schedule Generation',
      desc: 'Automatic daily timetable synthesis based on exam dates, difficulty weighting, and past energy peaks.',
    },
    {
      icon: <Cloud className="w-5 h-5 text-sky-500" />,
      title: 'Cloud Synchronization (Supabase / Firebase)',
      desc: 'Real-time multi-device sync, secure authentication, and cloud backup for all notes and goals.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-emerald-500" />,
      title: 'Native Mobile Applications (iOS & Android)',
      desc: 'Progressive touch PWA and React Native apps with offline support and haptic feedback.',
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-violet-500" />,
      title: 'Smart Productivity Recommendations',
      desc: 'Heuristic-based prompts alerting students before streaks break or when workloads spike.',
    },
    {
      icon: <Calendar className="w-5 h-5 text-indigo-400" />,
      title: 'Bi-directional Calendar Integration',
      desc: 'Direct OAuth sync with Google Calendar and Microsoft Outlook for automated class importing.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <PublicHeader />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
        
        {/* Hero / Context */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <span>2nd-Year BTech Computer Science Main Project</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Architecting the Future of Personal Productivity
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            LIFEOS was engineered as an academic capstone to address the growing friction students face when organizing rigorous coursework, extracurricular technical projects, and personal health.
          </p>
        </div>

        {/* Feature Workspace Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
          <img
            src="/src/assets/images/study_focus_workspace_1791028601802.jpg"
            alt="Modern Minimalist Study and Focus Workspace Desk"
            referrerPolicy="no-referrer"
            className="w-full h-72 sm:h-96 object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm uppercase tracking-wider">
              <span>The Problem Statement</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Application Fragmentation & Cognitive Drain
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              University students and aspiring engineers are forced to switch between 4–6 disparate apps daily: a calendar app for timetable slots, a task manager for assignments, a spreadsheet for habit logging, and separate note-taking software.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              This constant context switching leads to notification fatigue, lost deliverables, unmaintained habits, and poor visibility into overall academic trajectory.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider">
              <span>The LIFEOS Solution</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Unified Single-Pane Life Management
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              LIFEOS integrates all foundational productivity subsystems into a unified single-page platform. By linking daily habits, tasks, and calendar events to high-level semester goals, students cultivate measurable momentum.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Built using a modern TypeScript + React architecture, LIFEOS prioritizes speed, zero-clutter typography, and local privacy.
            </p>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Core Academic Objectives
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Key engineering and behavioral goals targeted in the design of LIFEOS.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, idx) => (
              <div
                key={obj.title}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center font-mono">
                    0{idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {obj.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Scope Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Roadmap & Technical Evolution
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Future Scope & Expansion
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Planned technical milestones for Phase 2 and subsequent engineering iterations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureScopeItems.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2.5"
              >
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 w-fit shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-4">
          <button
            onClick={() => setActivePage('dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 transition-all"
          >
            <span>Explore Working Prototype</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};
