import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { 
  WeeklyProductivityChart, 
  CategoryBreakdownBar, 
  RadialProductivityScore 
} from '../common/ChartComponents';
import { 
  CheckSquare, 
  Flame, 
  Target, 
  Zap, 
  Plus, 
  Calendar as CalendarIcon, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Circle,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { 
    tasks, 
    habits, 
    goals, 
    events, 
    profile, 
    setActivePage, 
    toggleTaskCompletion, 
    toggleHabitDay 
  } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  // Metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const totalHabits = habits.length;
  const completedHabitsToday = habits.filter((h) => h.history[todayStr]).length;

  const activeGoals = goals.filter((g) => g.status === 'active');
  const avgGoalProgress = goals.length > 0 
    ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length) 
    : 0;

  // Productivity Score Calculation: Weighted composite of tasks, habits, goals
  const productivityScore = useMemo(() => {
    const taskRatio = totalTasks > 0 ? completedTasks / totalTasks : 0.8;
    const habitRatio = totalHabits > 0 ? completedHabitsToday / totalHabits : 0.8;
    const goalRatio = avgGoalProgress / 100;
    
    const composite = (taskRatio * 0.45) + (habitRatio * 0.35) + (goalRatio * 0.20);
    return Math.min(98, Math.max(45, Math.round(composite * 100)));
  }, [totalTasks, completedTasks, totalHabits, completedHabitsToday, avgGoalProgress]);

  // Weekly data simulation based on real task completions
  const weeklyData = [
    { day: 'Mon', date: 'Oct 28', score: 75, tasks: 6 },
    { day: 'Tue', date: 'Oct 29', score: 85, tasks: 8 },
    { day: 'Wed', date: 'Oct 30', score: 68, tasks: 5 },
    { day: 'Thu', date: 'Oct 31', score: 92, tasks: 9 },
    { day: 'Fri', date: 'Nov 01', score: 80, tasks: 7 },
    { day: 'Sat', date: 'Nov 02', score: 88, tasks: 8 },
    { day: 'Sun', date: 'Nov 03', score: productivityScore, tasks: completedTasks },
  ];

  // Category breakdown
  const categoryBreakdown = [
    { name: 'Study', count: tasks.filter((t) => t.category === 'Study').length, color: 'bg-indigo-600' },
    { name: 'Work', count: tasks.filter((t) => t.category === 'Work').length, color: 'bg-violet-500' },
    { name: 'Health', count: tasks.filter((t) => t.category === 'Health').length, color: 'bg-emerald-500' },
    { name: 'Personal', count: tasks.filter((t) => t.category === 'Personal').length, color: 'bg-amber-500' },
    { name: 'Other', count: tasks.filter((t) => t.category === 'Other').length, color: 'bg-slate-400' },
  ];

  // Today's Priority Tasks (Max 4)
  const todaysFocusTasks = tasks.slice(0, 4);

  // Today's Upcoming Events
  const todaysEvents = events
    .filter((e) => e.date === todayStr)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="space-y-6">
      
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle decorative background gradient glows */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-16 w-60 h-60 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{todayFormatted}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Good morning, {profile.name.split(' ')[0]} 👋
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Here&apos;s your productivity overview for today. You have{' '}
              <span className="font-semibold text-white">{pendingTasks} pending tasks</span>{' '}
              and{' '}
              <span className="font-semibold text-white">{todaysEvents.length} calendar sessions</span>{' '}
              scheduled.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActivePage('tasks')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </button>
            <button
              onClick={() => setActivePage('calendar')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>View Agenda</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tasks Completed"
          value={`${completedTasks} / ${totalTasks}`}
          subtitle={`${pendingTasks} remaining for today`}
          icon={<CheckSquare className="w-5 h-5" />}
          trend={{ value: '14% vs last week', isPositive: true }}
          progress={totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}
        />
        <StatCard
          title="Daily Habits"
          value={`${completedHabitsToday} / ${totalHabits}`}
          subtitle="Routine consistency loops"
          icon={<Flame className="w-5 h-5" />}
          trend={{ value: 'Best streak 12d', isPositive: true }}
          progress={totalHabits > 0 ? (completedHabitsToday / totalHabits) * 100 : 0}
        />
        <StatCard
          title="Active Goals"
          value={`${activeGoals.length} Active`}
          subtitle={`${avgGoalProgress}% average progress`}
          icon={<Target className="w-5 h-5" />}
          trend={{ value: 'On Track', isPositive: true }}
          progress={avgGoalProgress}
        />
        <StatCard
          title="Productivity Score"
          value={`${productivityScore}%`}
          subtitle="Calculated composite index"
          icon={<Zap className="w-5 h-5" />}
          trend={{ value: '4% this week', isPositive: true }}
          progress={productivityScore}
        />
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Productivity Bar Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Weekly Productivity Velocity
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily output percentage based on completed deliverables and active study hours.
              </p>
            </div>
            <button
              onClick={() => setActivePage('analytics')}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <WeeklyProductivityChart data={weeklyData} />
        </div>

        {/* Productivity Score Ring & Category Distribution */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Overall Index
              </h2>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Optimal
              </span>
            </div>

            <div className="py-2">
              <RadialProductivityScore value={productivityScore} size={150} />
            </div>
          </div>

          {/* Task distribution */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2.5">
              Task Workload by Domain
            </span>
            <CategoryBreakdownBar categories={categoryBreakdown} />
          </div>
        </div>
      </div>

      {/* Two Column Section: Priority Tasks & Scheduled Classes/Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Today's Priority Tasks */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Today&apos;s Focus Tasks
              </h2>
            </div>
            <button
              onClick={() => setActivePage('tasks')}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All ({tasks.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {todaysFocusTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 transition-all flex items-start justify-between gap-3 group"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                    aria-label="Toggle completion"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <span
                      className={`text-xs sm:text-sm font-semibold block truncate ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      <span>{task.category}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="capitalize">{task.priority} Priority</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="font-mono tabular-nums">Due {task.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule & Habit Quick Log */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Schedule */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Today&apos;s Timetable
                </h2>
              </div>
              <button
                onClick={() => setActivePage('calendar')}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Open Planner
              </button>
            </div>

            <div className="space-y-2">
              {todaysEvents.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">
                  No sessions scheduled for today.
                </p>
              ) : (
                todaysEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block">
                        {ev.title}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {ev.location || ev.category}
                      </span>
                    </div>
                    <span className="font-mono tabular-nums text-indigo-600 dark:text-indigo-400 font-semibold">
                      {ev.startTime}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Habits Strip */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Daily Habit Check-in
                </h2>
              </div>
              <button
                onClick={() => setActivePage('habits')}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                All Habits
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {habits.slice(0, 4).map((h) => {
                const isDone = Boolean(h.history[todayStr]);
                return (
                  <button
                    key={h.id}
                    onClick={() => toggleHabitDay(h.id, todayStr)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isDone
                        ? 'border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-mono font-semibold text-amber-500">
                        🔥 {h.currentStreak}d
                      </span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                          isDone ? 'bg-emerald-500 text-white' : 'border border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isDone && '✓'}
                      </div>
                    </div>
                    <span className="text-xs font-semibold block truncate">
                      {h.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
