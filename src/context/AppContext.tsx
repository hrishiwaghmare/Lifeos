import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Task, 
  Habit, 
  Goal, 
  CalendarEvent, 
  Note, 
  UserProfile, 
  UserSettings, 
  ToastNotification, 
  NavigationPage 
} from '../types';
import { StorageService } from '../services/storageService';
import { initialTasks, initialHabits, initialGoals, initialEvents, initialNotes, initialProfile, initialSettings } from '../data/demoData';

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
}

interface AppContextType {
  activePage: NavigationPage;
  setActivePage: (page: NavigationPage) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Data
  tasks: Task[];
  habits: Habit[];
  goals: Goal[];
  events: CalendarEvent[];
  notes: Note[];
  profile: UserProfile;
  settings: UserSettings;

  // Task actions
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;

  // Habit actions
  addHabit: (habit: Omit<Habit, 'id' | 'currentStreak' | 'longestStreak' | 'history' | 'createdAt'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitDay: (id: string, dateStr: string) => void;

  // Goal actions
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;

  // Event actions
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;

  // Note actions
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  togglePinNote: (id: string) => void;

  // Profile & Settings
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  resetAllData: () => void;

  // Feedback & Dialogs
  toasts: ToastNotification[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  confirmDialog: ConfirmDialogState | null;
  openConfirmDialog: (config: Omit<ConfirmDialogState, 'isOpen'>) => void;
  closeConfirmDialog: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<NavigationPage>('landing');
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(() => StorageService.getIsLoggedIn());

  // Entity States
  const [tasks, setTasks] = useState<Task[]>(() => StorageService.getTasks());
  const [habits, setHabits] = useState<Habit[]>(() => StorageService.getHabits());
  const [goals, setGoals] = useState<Goal[]>(() => StorageService.getGoals());
  const [events, setEvents] = useState<CalendarEvent[]>(() => StorageService.getEvents());
  const [notes, setNotes] = useState<Note[]>(() => StorageService.getNotes());
  const [profile, setProfile] = useState<UserProfile>(() => StorageService.getProfile());
  const [settings, setSettings] = useState<UserSettings>(() => StorageService.getSettings());

  // UI States
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = StorageService.getSettings().theme;
    if (saved === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return saved === 'light' ? 'light' : 'dark';
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);

  // Apply Dark Mode Class to HTML Element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Persist State Changes
  useEffect(() => {
    StorageService.setTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    StorageService.setHabits(habits);
  }, [habits]);

  useEffect(() => {
    StorageService.setGoals(goals);
  }, [goals]);

  useEffect(() => {
    StorageService.setEvents(events);
  }, [events]);

  useEffect(() => {
    StorageService.setNotes(notes);
  }, [notes]);

  useEffect(() => {
    StorageService.setProfile(profile);
  }, [profile]);

  useEffect(() => {
    StorageService.setSettings(settings);
  }, [settings]);

  // Toast System
  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Confirm Modal
  const openConfirmDialog = (config: Omit<ConfirmDialogState, 'isOpen'>) => {
    setConfirmDialog({ ...config, isOpen: true });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog(null);
  };

  // Toggle Theme
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setSettings((prev) => ({ ...prev, theme: next }));
    addToast(`Switched to ${next} mode`, 'info');
  };

  // Tasks Handlers
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: 'task_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks((prev) => [newTask, ...prev]);
    addToast('Task added successfully.', 'success');
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    addToast('Task updated successfully.', 'success');
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    addToast('Task deleted successfully.', 'info');
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            confetti({
              particleCount: 35,
              spread: 60,
              origin: { y: 0.75 },
              colors: ['#6366F1', '#4F46E5', '#8B5CF6'],
            });
            addToast('Task marked as completed! Great progress.', 'success');
          } else {
            addToast('Task marked incomplete.', 'info');
          }
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString().split('T')[0] : undefined,
          };
        }
        return t;
      })
    );
  };

  // Habit Handlers
  const addHabit = (habitData: Omit<Habit, 'id' | 'currentStreak' | 'longestStreak' | 'history' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: 'habit_' + Date.now(),
      currentStreak: 0,
      longestStreak: 0,
      history: {},
      createdAt: new Date().toISOString().split('T')[0],
    };
    setHabits((prev) => [...prev, newHabit]);
    addToast('Habit added successfully.', 'success');
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );
    addToast('Habit updated successfully.', 'success');
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    addToast('Habit deleted successfully.', 'info');
  };

  const toggleHabitDay = (id: string, dateStr: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const isDone = !h.history[dateStr];
          const newHistory = { ...h.history, [dateStr]: isDone };

          // Recalculate streak
          let currentStreak = 0;
          let longestStreak = h.longestStreak;
          const today = new Date();

          for (let i = 0; i < 365; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const str = checkDate.toISOString().split('T')[0];
            if (newHistory[str]) {
              currentStreak++;
            } else if (i === 0) {
              // today not done yet is fine, check yesterday
              continue;
            } else {
              break;
            }
          }

          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }

          if (isDone) {
            confetti({
              particleCount: 45,
              spread: 70,
              origin: { y: 0.7 },
              colors: ['#10B981', '#6366F1', '#3B82F6'],
            });
            addToast(`Completed "${h.title}" for today! 🔥 Streak: ${currentStreak} days`, 'success');
          }

          return {
            ...h,
            history: newHistory,
            currentStreak,
            longestStreak,
          };
        }
        return h;
      })
    );
  };

  // Goals Handlers
  const addGoal = (goalData: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: 'goal_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setGoals((prev) => [...prev, newGoal]);
    addToast('Goal created successfully.', 'success');
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
    );
    addToast('Goal updated successfully.', 'success');
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    addToast('Goal deleted successfully.', 'info');
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const updatedMilestones = g.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          );
          const completedCount = updatedMilestones.filter((m) => m.completed).length;
          const calculatedProgress = updatedMilestones.length > 0
            ? Math.round((completedCount / updatedMilestones.length) * 100)
            : g.progress;

          const isFullyDone = calculatedProgress === 100;
          if (isFullyDone && g.status !== 'completed') {
            confetti({
              particleCount: 80,
              spread: 90,
              origin: { y: 0.6 },
            });
            addToast(`Milestone hit! Goal "${g.title}" is 100% complete! 🎯`, 'success');
          } else {
            addToast('Milestone updated.', 'info');
          }

          return {
            ...g,
            milestones: updatedMilestones,
            progress: calculatedProgress,
            status: isFullyDone ? 'completed' : g.status === 'completed' ? 'active' : g.status,
          };
        }
        return g;
      })
    );
  };

  // Event Handlers
  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: 'ev_' + Date.now(),
    };
    setEvents((prev) => [...prev, newEvent]);
    addToast('Calendar event scheduled successfully.', 'success');
  };

  const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
    addToast('Event updated successfully.', 'success');
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    addToast('Event removed.', 'info');
  };

  // Notes Handlers
  const addNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newNote: Note = {
      ...noteData,
      id: 'note_' + Date.now(),
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => [newNote, ...prev]);
    addToast('Note created successfully.', 'success');
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    const now = new Date().toISOString().split('T')[0];
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates, updatedAt: now } : n))
    );
    addToast('Note saved successfully.', 'success');
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    addToast('Note deleted.', 'info');
  };

  const togglePinNote = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
    addToast('Note pin status updated.', 'info');
  };

  // Profile & Settings
  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    addToast('Profile updated successfully.', 'success');
  };

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    addToast('Settings updated successfully.', 'success');
  };

  const login = (email: string, name?: string) => {
    setIsLoggedInState(true);
    StorageService.setIsLoggedIn(true);
    if (name) {
      setProfile((prev) => ({ ...prev, name, email }));
    }
    setActivePage('dashboard');
    addToast(`Welcome back, ${name || profile.name}! 👋`, 'success');
  };

  const logout = () => {
    setIsLoggedInState(false);
    StorageService.setIsLoggedIn(false);
    setActivePage('landing');
    addToast('Logged out successfully.', 'info');
  };

  const resetAllData = () => {
    StorageService.resetToDemoData();
    setTasks(initialTasks);
    setHabits(initialHabits);
    setGoals(initialGoals);
    setEvents(initialEvents);
    setNotes(initialNotes);
    setProfile(initialProfile);
    setSettings(initialSettings);
    addToast('All demo data has been reset to defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        isLoggedIn,
        setIsLoggedIn: (v) => {
          setIsLoggedInState(v);
          StorageService.setIsLoggedIn(v);
        },
        theme,
        toggleTheme,
        tasks,
        habits,
        goals,
        events,
        notes,
        profile,
        settings,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabitDay,
        addGoal,
        updateGoal,
        deleteGoal,
        toggleMilestone,
        addEvent,
        updateEvent,
        deleteEvent,
        addNote,
        updateNote,
        deleteNote,
        togglePinNote,
        updateProfile,
        updateSettings,
        login,
        logout,
        resetAllData,
        toasts,
        addToast,
        removeToast,
        confirmDialog,
        openConfirmDialog,
        closeConfirmDialog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
