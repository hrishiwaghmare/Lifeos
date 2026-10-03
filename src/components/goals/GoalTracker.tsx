import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Goal, GoalCategory } from '../../types';
import { GoalModal } from './GoalModal';
import { 
  Plus, 
  Target, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Edit3, 
  CheckSquare,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const GoalTracker: React.FC = () => {
  const { goals, addGoal, updateGoal, deleteGoal, toggleMilestone, openConfirmDialog } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const handleOpenAdd = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (goal: Goal) => {
    openConfirmDialog({
      title: 'Delete Goal',
      message: `Are you sure you want to delete "${goal.title}"? All milestone progress will be lost.`,
      confirmLabel: 'Delete Goal',
      isDestructive: true,
      onConfirm: () => deleteGoal(goal.id),
    });
  };

  const filteredGoals = goals.filter((g) => {
    if (categoryFilter !== 'all' && g.category !== categoryFilter) return false;
    if (statusFilter === 'active' && g.status !== 'active') return false;
    if (statusFilter === 'completed' && g.status !== 'completed') return false;
    return true;
  });

  const activeCount = goals.filter((g) => g.status === 'active').length;
  const completedCount = goals.filter((g) => g.status === 'completed').length;
  const avgProgress = goals.length > 0 ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Goal Setting & Milestone Tracking
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Turn large academic ambitions and career milestones into actionable, verifiable checkpoints.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Strategic Goal</span>
        </button>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Active Objectives
            </span>
            <Target className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {activeCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              currently in execution
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Completed Goals
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {completedCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              mastered milestones
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Average Progress
            </span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {avgProgress}%
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              across all sectors
            </span>
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {['all', 'Academic', 'Career', 'Personal', 'Health'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Domains' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded-md ${statusFilter === 'all' ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}
          >
            All
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-2.5 py-1 rounded-md ${statusFilter === 'active' ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}
          >
            Active
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-2.5 py-1 rounded-md ${statusFilter === 'completed' ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredGoals.length === 0 ? (
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center">
            <Target className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              No goals match your criteria
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
              Set clear quarterly targets to keep your academic trajectory on schedule.
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              Add First Goal
            </button>
          </div>
        ) : (
          filteredGoals.map((goal) => {
            const isDone = goal.progress === 100 || goal.status === 'completed';

            return (
              <div
                key={goal.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Header: Category & Controls */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {goal.category}
                      </span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="flex items-center gap-1 font-mono tabular-nums">
                        <Calendar className="w-3 h-3" />
                        <span>Deadline: {goal.deadline}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(goal)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Edit goal"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePrompt(goal)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                        title="Delete goal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Goal Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {goal.description}
                  </p>

                  {/* Progress Bar & Number */}
                  <div className="mt-4 mb-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-medium text-slate-500 dark:text-slate-400">
                        Milestone Completion
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isDone
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-indigo-600 to-violet-500'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones List */}
                  {goal.milestones && goal.milestones.length > 0 && (
                    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 space-y-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                        Sub-Milestones
                      </span>
                      <div className="space-y-1.5">
                        {goal.milestones.map((milestone) => (
                          <button
                            key={milestone.id}
                            onClick={() => toggleMilestone(goal.id, milestone.id)}
                            className="w-full flex items-start gap-2.5 p-1.5 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group/m"
                          >
                            <span className="mt-0.5 shrink-0 text-slate-400 group-hover/m:text-indigo-600 dark:group-hover/m:text-indigo-400 transition-colors">
                              {milestone.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4" />
                              )}
                            </span>
                            <span
                              className={`text-xs leading-snug transition-all ${
                                milestone.completed
                                  ? 'line-through text-slate-400 dark:text-slate-500'
                                  : 'text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {milestone.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer status text */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="capitalize font-medium">
                    Status: {goal.status.replace('_', ' ')}
                  </span>
                  {isDone ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : (
                    <span>
                      {goal.milestones.filter((m) => m.completed).length} of{' '}
                      {goal.milestones.length} milestones reached
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Goal Add / Edit Modal */}
      <GoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (editingGoal) {
            updateGoal(editingGoal.id, data);
          } else {
            addGoal(data);
          }
        }}
        initialGoal={editingGoal}
      />
    </div>
  );
};
