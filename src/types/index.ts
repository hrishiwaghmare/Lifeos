export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'Study' | 'Personal' | 'Work' | 'Health' | 'Other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string; // YYYY-MM-DD
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  title: string;
  description?: string;
  category: string;
  frequency: 'daily' | 'weekdays' | 'weekends';
  currentStreak: number;
  longestStreak: number;
  history: Record<string, boolean>; // 'YYYY-MM-DD': boolean
  createdAt: string;
}

export type GoalCategory = 'Academic' | 'Career' | 'Personal' | 'Health';
export type GoalStatus = 'active' | 'completed' | 'on_hold';

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  deadline: string; // YYYY-MM-DD
  progress: number; // 0-100
  milestones: Milestone[];
  status: GoalStatus;
  createdAt: string;
}

export type EventCategory = 'Study' | 'Work' | 'Personal' | 'Health' | 'Other';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  location?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  tags?: string[];
  updatedAt: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  role: string;
  institution: string;
  joinedDate: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  dailySummary: boolean;
  soundEnabled: boolean;
  language: string;
  compactMode: boolean;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export type NavigationPage = 
  | 'landing'
  | 'dashboard'
  | 'tasks'
  | 'habits'
  | 'goals'
  | 'calendar'
  | 'notes'
  | 'analytics'
  | 'profile'
  | 'settings'
  | 'about'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'login'
  | 'signup';
