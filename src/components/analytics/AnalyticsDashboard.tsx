import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  WeeklyProductivityChart, 
  CategoryBreakdownBar, 
  RadialProductivityScore 
} from '../common/ChartComponents';
import { 
  TrendingUp, 
  BarChart3, 
  CheckCircle2, 
  Flame, 
  Target, 
  Award, 
  Calendar, 
  Clock,
  ArrowUpRight
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { tasks, habits, goals } = useApp();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length || 1;
  const taskCompletionRate = Math.round((completedTasks / totalTasks) * 100);

  const avgGoalProgress = goals.length > 0 
    ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length) 
    : 0;

  const todayStr = new Date().toISOString().split('T')[0];
  const habitsDoneToday = habits.filter((h) => h.history[todayStr]).length;
  const habitRate = habits.length > 0 ? Math.round((habitsDoneToday / habits.length) * 100) : 0;

  // Composite productivity score
  const productivityScore = Math.min(
    98, 
    Math.round(taskCompletionRate * 0.45 + habitRate * 0.35 + avgGoalProgress * 0.20)
  );

  const weeklyTrendData = [
    { day: 'Mon', date: 'Oct 28', score: 72, tasks: 5 },
    { day: 'Tue', date: 'Oct 29', score: 88, tasks: 8 },
    { day: 'Wed', date: 'Oct 30', score: 65, tasks: 4 },
    { day: 'Thu', date: 'Oct 31', score: 94, tasks: 9 }, // Most productive day!
    { day: 'Fri', date: 'Nov 01', score: 81, tasks: 7 },
    { day: 'Sat', date: 'Nov 02', score: 85, tasks: 6 },
    { day: 'Sun', date: 'Nov 03', score: productivityScore, tasks: completedTasks },
  ];

  const categoryBreakdown = [
    { name: 'Study & Academics', count: tasks.filter((t) => t.category === 'Study').length, color: 'bg-indigo-600' },
    { name: 'Project & Code', count: tasks.filter((t) => t.category === 'Work').length, color: 'bg-violet-500' },
    { name: 'Health & Fitness', count: tasks.filter((t) => t.category === 'Health').length, color: 'bg-emerald-500' },
    { name: 'Personal Growth', count: tasks.filter((t) => t.category === 'Personal').length, color: 'bg-amber-500' },
    { name: 'Other', count: tasks.filter((t) => t.category === 'Other').length, color: 'bg-slate-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Productivity Analytics & Velocity
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Empirical metrics assessing task throughput, habit stability, and milestone execution speed.
          </p>
        </div>

        {/* Time range switcher */}
        <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs self-start sm:self-auto">
          <button
            onClick={() => setTimeRange('daily')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              timeRange === 'daily'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Daily View
          </button>
          <button
            onClick={() => setTimeRange('weekly')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              timeRange === 'weekly'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Weekly Sprint
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              timeRange === 'monthly'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Aggregate
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Overall Productivity
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {productivityScore}%
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              <ArrowUpRight className="w-4 h-4" />
              +6.4%
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            Composite efficiency rating
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Most Productive Day
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Thursday
            </span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
              94% Index
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            Peak focus & 9 tasks executed
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Habit Consistency
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              86.2%
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              12d Streak
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            Across 6 daily rituals
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Goal Velocity
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {avgGoalProgress}%
            </span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              4 Goals
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            Target deadlines on track
          </span>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Trend */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Sprint Productivity Output
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tracked output across past 7 days with day-by-day task volume.
              </p>
            </div>
            <span className="text-xs font-mono tabular-nums text-slate-400">
              Avg 81.7%
            </span>
          </div>

          <WeeklyProductivityChart data={weeklyTrendData} />
        </div>

        {/* Score Ring */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Performance Grade
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Composite formula based on tasks (45%), habits (35%), and strategic goals (20%).
            </p>

            <RadialProductivityScore value={productivityScore} size={150} />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Task Execution (45%)</span>
              <span className="font-mono tabular-nums font-semibold">{taskCompletionRate}%</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Habit Loops (35%)</span>
              <span className="font-mono tabular-nums font-semibold">{habitRate}%</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Goal Milestones (20%)</span>
              <span className="font-mono tabular-nums font-semibold">{avgGoalProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category breakdown bar card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Workload Allocation by Domain
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Distribution of energy across academic obligations, project builds, health, and personal development.
        </p>

        <CategoryBreakdownBar categories={categoryBreakdown} />
      </div>
    </div>
  );
};
