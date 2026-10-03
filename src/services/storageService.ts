import { Task, Habit, Goal, CalendarEvent, Note, UserProfile, UserSettings } from '../types';
import { initialTasks, initialHabits, initialGoals, initialEvents, initialNotes, initialProfile, initialSettings } from '../data/demoData';

const STORAGE_KEYS = {
  TASKS: 'lifeos_tasks_v1',
  HABITS: 'lifeos_habits_v1',
  GOALS: 'lifeos_goals_v1',
  EVENTS: 'lifeos_events_v1',
  NOTES: 'lifeos_notes_v1',
  PROFILE: 'lifeos_profile_v1',
  SETTINGS: 'lifeos_settings_v1',
  IS_LOGGED_IN: 'lifeos_is_logged_in_v1',
};

function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error loading ${key} from storage:`, err);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export const StorageService = {
  getTasks: (): Task[] => safeGet<Task[]>(STORAGE_KEYS.TASKS, initialTasks),
  setTasks: (tasks: Task[]): void => safeSet(STORAGE_KEYS.TASKS, tasks),

  getHabits: (): Habit[] => safeGet<Habit[]>(STORAGE_KEYS.HABITS, initialHabits),
  setHabits: (habits: Habit[]): void => safeSet(STORAGE_KEYS.HABITS, habits),

  getGoals: (): Goal[] => safeGet<Goal[]>(STORAGE_KEYS.GOALS, initialGoals),
  setGoals: (goals: Goal[]): void => safeSet(STORAGE_KEYS.GOALS, goals),

  getEvents: (): CalendarEvent[] => safeGet<CalendarEvent[]>(STORAGE_KEYS.EVENTS, initialEvents),
  setEvents: (events: CalendarEvent[]): void => safeSet(STORAGE_KEYS.EVENTS, events),

  getNotes: (): Note[] => safeGet<Note[]>(STORAGE_KEYS.NOTES, initialNotes),
  setNotes: (notes: Note[]): void => safeSet(STORAGE_KEYS.NOTES, notes),

  getProfile: (): UserProfile => safeGet<UserProfile>(STORAGE_KEYS.PROFILE, initialProfile),
  setProfile: (profile: UserProfile): void => safeSet(STORAGE_KEYS.PROFILE, profile),

  getSettings: (): UserSettings => safeGet<UserSettings>(STORAGE_KEYS.SETTINGS, initialSettings),
  setSettings: (settings: UserSettings): void => safeSet(STORAGE_KEYS.SETTINGS, settings),

  getIsLoggedIn: (): boolean => safeGet<boolean>(STORAGE_KEYS.IS_LOGGED_IN, true),
  setIsLoggedIn: (status: boolean): void => safeSet(STORAGE_KEYS.IS_LOGGED_IN, status),

  resetToDemoData: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TASKS);
      localStorage.removeItem(STORAGE_KEYS.HABITS);
      localStorage.removeItem(STORAGE_KEYS.GOALS);
      localStorage.removeItem(STORAGE_KEYS.EVENTS);
      localStorage.removeItem(STORAGE_KEYS.NOTES);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    } catch (err) {
      console.error('Error clearing local storage:', err);
    }
  },
};
