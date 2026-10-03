import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  CheckSquare, 
  Flame, 
  Target, 
  Calendar as CalendarIcon, 
  FileText, 
  BarChart3, 
  Moon, 
  Smartphone, 
  ShieldCheck, 
  Zap,
  Users,
  ChevronDown,
  Sparkles,
  Award,
  Layers,
  Clock,
  BookOpen
} from 'lucide-react';
import { PublicHeader } from '../components/common/PublicHeader';
import { Footer } from '../components/common/Footer';

export const LandingPage: React.FC = () => {
  const { setActivePage, isLoggedIn } = useApp();

  const features = [
    {
      icon: <CheckSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: 'Smart Task Management',
      description: 'Prioritize by urgency, tag by academic domain, set due dates, and filter with zero friction.',
    },
    {
      icon: <Flame className="w-5 h-5 text-amber-500" />,
      title: 'Habit Tracking & Streaks',
      description: 'Build unbreakable daily disciplines with 7-day matrices, streak records, and celebratory cues.',
    },
    {
      icon: <Target className="w-5 h-5 text-indigo-500" />,
      title: 'Strategic Goal Tracking',
      description: 'Deconstruct semester aspirations into verifiable checkpoints with auto-calculating progress.',
    },
    {
      icon: <CalendarIcon className="w-5 h-5 text-sky-500" />,
      title: 'Daily & Weekly Planner',
      description: 'Coordinate lecture timetables, revision blocks, and fitness appointments in a unified calendar.',
    },
    {
      icon: <FileText className="w-5 h-5 text-violet-500" />,
      title: 'Structured Notes System',
      description: 'Draft algorithmic summaries, code snippets, and revision cards with instant search and pin controls.',
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-emerald-500" />,
      title: 'Productivity Analytics',
      description: 'Evaluate workload distribution, identify peak focus days, and track your compound productivity index.',
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: 'Personal Dashboard',
      description: 'Consolidates all deliverables, routines, upcoming events, and focus tasks into one morning briefing.',
    },
    {
      icon: <Moon className="w-5 h-5 text-indigo-400" />,
      title: 'Dark & Light Mode',
      description: 'Flawlessly tuned contrast palettes for late-night programming sessions and bright lecture halls.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      title: 'Fully Responsive Design',
      description: 'Engineered from the ground up for seamless operation across desktop workstations, tablets, and mobile.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Capture Everything in One Place',
      description: 'Input your semester courses, project milestones, daily habits, and revision notes without context switching between disconnected apps.',
    },
    {
      step: '02',
      title: 'Execute with Focused Priority',
      description: 'Your morning dashboard curates top focus tasks and calendar sessions, keeping you locked on high-leverage activities.',
    },
    {
      step: '03',
      title: 'Analyze & Compound Momentum',
      description: 'Watch your consistency streaks grow and monitor weekly productivity scores as you steadily progress toward your degree and career goals.',
    },
  ];

  const audienceBenefits = [
    {
      role: 'College & BTech Students',
      icon: <Award className="w-5 h-5 text-indigo-600" />,
      points: [
        'Balance coding assignments, lab exams, and theory revisions effortlessly',
        'Maintain daily algorithmic practice streaks (DSA / LeetCode)',
        'Track semester project architecture and deliverables with milestones',
      ],
    },
    {
      role: 'School & High School Students',
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      points: [
        'Organize weekly homework and test preparation timetables',
        'Build healthy daily reading and hydration routines',
        'Learn effective time management before entering university',
      ],
    },
    {
      role: 'Young Professionals & Builders',
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      points: [
        'Track career objectives, resume updates, and interview prep',
        'Plan deep-work sprint blocks without distraction',
        'Review weekly performance velocity with clean data visuals',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Aditya Kulkarni',
      role: '3rd Year Computer Science Student',
      feedback: 'LIFEOS eliminated the mess of using Notion for notes, Todoist for tasks, and Excel for habits. Having my timetable, LeetCode streak, and project milestones in one clean dashboard boosted my semester GPA significantly.',
    },
    {
      name: 'Priya Sharma',
      role: 'Software Engineering Intern',
      feedback: 'The milestone breakdown feature for semester goals is outstanding. I mapped out my summer internship prep into 4 clear phases and tracked every single checklist item. The UI feels like an enterprise SaaS tool.',
    },
    {
      name: 'Rohan Mehta',
      role: 'BTech Student & Open Source Contributor',
      feedback: 'The zero-clutter philosophy and dark mode make it enjoyable to keep open on my second monitor all day. The weekly productivity velocity chart keeps me honest about my actual deep work output.',
    },
  ];

  const faqs = [
    {
      q: 'What is LIFEOS?',
      a: 'LIFEOS is an all-in-one personal productivity and life-management platform built specifically for students and young professionals to orchestrate tasks, habits, goals, schedules, notes, and analytics in a single unified workspace.',
    },
    {
      q: 'How does LIFEOS help students stay organized?',
      a: 'Students frequently suffer from fragmentation—switching between calendar apps, habit trackers, and notes apps. LIFEOS aggregates all these modules onto one unified dashboard so you never miss a lecture, assignment deadline, or study habit.',
    },
    {
      q: 'Is my data saved automatically?',
      a: 'Yes. All tasks, habits, milestones, calendar events, and notes are instantly saved to your browser local storage. Your data persists across reloads and offline sessions.',
    },
    {
      q: 'Can I customize habits and goals for my own schedule?',
      a: 'Absolutely. You can create custom habits with personalized frequencies (daily, weekdays, weekends), track current and longest streaks, and define multi-stage goals with custom milestones.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 border-b border-slate-200/80 dark:border-slate-800/80">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Natural human editorial kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Capstone &middot; BTech Main Project 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
            Organize Your Life. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
              Master Your Time.
            </span>{' '}
            Achieve Your Goals.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            LIFEOS brings your tasks, habits, goals, schedules, notes and productivity insights together in one simple, synchronized workspace designed for modern students and young professionals.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <button
              onClick={() => setActivePage('dashboard')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{isLoggedIn ? 'Launch Workspace' : 'Get Started Free'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs"
            >
              Explore Features
            </a>
          </div>

          {/* High-Fidelity UI Mockup Preview */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden p-2 sm:p-3 ring-1 ring-slate-900/10 dark:ring-white/10">
              <img
                src="/src/assets/images/hero_dashboard_mockup_1791028574940.jpg"
                alt="LIFEOS All-in-One Productivity Dashboard Interface"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-xl sm:rounded-2xl object-cover shadow-inner"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why LIFEOS Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
              The Problem & The Solution
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why Traditional Productivity Fails Students
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Juggling semester timetables across Google Calendar, tasks in Apple Reminders, habits in random mobile apps, and notes across paper pads causes cognitive exhaustion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Zero Tool Fragmentation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                No more synchronizing four separate subscriptions. LIFEOS integrates every pillar of personal organization into one unified operational system.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Verifiable Milestone Tracking
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Break complex academic units and engineering capstones into concrete sub-milestones with automated progress percentages that update dynamically.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Objective Productivity Scoring
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A quantitative index based on your real task completion velocity and daily habit consistency, giving you honest feedback on weekly output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
              Comprehensive Feature Suite
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Engineered for Complete Life Management
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every tool in LIFEOS has been deliberately designed to optimize student focus, time allocation, and academic performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group"
              >
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 w-fit mb-4 group-hover:scale-105 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How LIFEOS Works */}
      <section className="py-20 lg:py-28 bg-white dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
              Workflow Protocol
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              How LIFEOS Transforms Your Day
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A frictionless 3-step loop that turns scattered obligations into focused momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st) => (
              <div key={st.step} className="space-y-3">
                <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  {st.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {st.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quantitative Social Proof & Statistics */}
      <section className="py-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tabular-nums">
                82%
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                Average Target Productivity Score
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tabular-nums">
                100%
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                Client-Side Local Storage Privacy
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tabular-nums">
                6+
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                Integrated Academic Subsystems
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tabular-nums">
                &lt; 50ms
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                Zero-Latency Instant Search & Filter
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Different Audiences */}
      <section className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
              Tailored For Ambition
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Built for Those Who Refuse to Waste Time
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audienceBenefits.map((aud) => (
              <div
                key={aud.role}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {aud.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {aud.role}
                  </h3>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {aud.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Clearly labeled sample/demo content as requested) */}
      <section className="py-20 lg:py-28 bg-white dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
              User Perspectives (Sample Demonstration Content)
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              What Students Say About LIFEOS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{t.feedback}&rdquo;
                </p>

                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {t.name}
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    {t.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
              Got Questions?
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setActivePage('faq')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View all frequently asked questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Ready to Take Control of Your Daily Rhythm?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Launch LIFEOS right now in your browser. No subscription fees, no credit card, and immediate access to full task, habit, and goal tracking.
          </p>

          <button
            onClick={() => setActivePage('dashboard')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            <span>Launch LIFEOS Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};
