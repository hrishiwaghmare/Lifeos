import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Habit } from '../../types';
import { HabitModal } from './HabitModal';
import { 
  Plus, 
  Flame, 
  Check, 
  Edit3, 
  Trash2, 
  Trophy, 
  CheckCircle2, 
  CalendarDays 
} from 'lucide-react';

export const HabitTracker: React.FC = () => {
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabitDay, openConfirmDialog } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  // Generate last 7 days info
  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const isToday = i === 6;
    return { dateStr, dayLabel, isToday };
  });

  const todayStr = past7Days[6].dateStr;

  const handleOpenAdd = () => {
    setEditingHabit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (habit: Habit) => {
    openConfirmDialog({
      title: 'Delete Habit',
      message: `Are you sure you want to delete "${habit.title}"? Your streak history will be permanently cleared.`,
      confirmLabel: 'Delete Habit',
      isDestructive: true,
      onConfirm: () => deleteHabit(habit.id),
    });
  };

  // Metrics
  const habitsDoneToday = habits.filter((h) => h.history[todayStr]).length;
  const totalHabits = habits.length;
  const completionRateToday = totalHabits > 0 ? Math.round((habitsDoneToday / totalHabits) * 100) : 0;
  const maxStreak = Math.max(...habits.map((h) => h.currentStreak), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Habit Tracker & Consistency Loops
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Build discipline with atomic daily routines, streak preservation, and 7-day progress logs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Habit</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Today's Execution
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {habitsDoneToday} / {totalHabits}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              completed
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionRateToday}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Best Current Streak
            </span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {maxStreak} Days
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              unbroken
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Consistency compound interest in action
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Daily Consistency
            </span>
            <Trophy className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {completionRateToday}%
            </span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 font-semibold">
              {completionRateToday >= 75 ? 'Target Met' : 'In Progress'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Aim for &ge;80% daily completion
          </p>
        </div>
      </div>

      {/* Habit Rows Table/List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          <div className="col-span-5">Habit Details</div>
          <div className="col-span-2 text-center">Streaks</div>
          <div className="col-span-3 text-center">Past 7 Days</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Habit List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {habits.length === 0 ? (
            <div className="p-12 text-center">
              <CalendarDays className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                No habits created yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                Define the small daily behaviors that will elevate your academic performance and lifestyle.
              </p>
              <button
                onClick={handleOpenAdd}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              >
                Create First Habit
              </button>
            </div>
          ) : (
            habits.map((habit) => {
              const isTodayCompleted = Boolean(habit.history[todayStr]);

              // Calculate past 7 days completion count
              const completedLast7 = past7Days.filter((d) => habit.history[d.dateStr]).length;
              const rateLast7 = Math.round((completedLast7 / 7) * 100);

              return (
                <div
                  key={habit.id}
                  className="p-4 sm:px-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center"
                >
                  {/* Col 1: Habit Details */}
                  <div className="w-full md:col-span-5 flex items-start gap-3">
                    <button
                      onClick={() => toggleHabitDay(habit.id, todayStr)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                        isTodayCompleted
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'border-2 border-slate-300 dark:border-slate-700 text-transparent hover:border-indigo-500'
                      }`}
                      aria-label={`Toggle habit ${habit.title} for today`}
                      title="Click to check off for today"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold tracking-tight ${
                          isTodayCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {habit.title}
                        </span>
                      </div>
                      {habit.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {habit.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mt-1">
                        <span>{habit.category}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="capitalize">{habit.frequency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Col 2: Streaks */}
                  <div className="w-full md:col-span-2 flex md:flex-col items-center justify-between md:justify-center text-xs">
                    <div className="flex items-center gap-1.5 text-amber-500 font-semibold tabular-nums">
                      <Flame className="w-4 h-4" />
                      <span>{habit.currentStreak} day streak</span>
                    </div>
                    <span className="text-[11px] text-slate-400 tabular-nums">
                      Record: {habit.longestStreak} days
                    </span>
                  </div>

                  {/* Col 3: Past 7 Days Matrix */}
                  <div className="w-full md:col-span-3 flex items-center justify-between md:justify-center gap-2 py-1">
                    {past7Days.map((day) => {
                      const isDone = Boolean(habit.history[day.dateStr]);
                      return (
                        <button
                          key={day.dateStr}
                          onClick={() => toggleHabitDay(habit.id, day.dateStr)}
                          title={`${day.dateStr} (${day.isToday ? 'Today' : ''}): ${isDone ? 'Completed' : 'Missed'}`}
                          className={`flex flex-col items-center gap-1 group/day focus:outline-hidden`}
                        >
                          <span className={`text-[10px] font-semibold ${
                            day.isToday ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-400'
                          }`}>
                            {day.dayLabel}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                              isDone
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                            } ${day.isToday ? 'ring-2 ring-indigo-500/30' : ''}`}
                          >
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Col 4: Actions & Completion rate */}
                  <div className="w-full md:col-span-2 flex items-center justify-between md:justify-end gap-3 text-xs">
                    <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400 hidden sm:inline">
                      {rateLast7}% 7d
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(habit)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Edit habit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePrompt(habit)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                        title="Delete habit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Habit Add/Edit Modal */}
      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (editingHabit) {
            updateHabit(editingHabit.id, data);
          } else {
            addHabit(data);
          }
        }}
        initialHabit={editingHabit}
      />
    </div>
  );
};
