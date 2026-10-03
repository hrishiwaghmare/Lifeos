import { Task, Habit, Goal, CalendarEvent, Note, UserProfile, UserSettings } from '../types';

export const initialProfile: UserProfile = {
  id: 'usr_demo_01',
  name: 'Hrishikesh Waghmare',
  email: 'hrishikeshwaghmare07@gmail.com',
  bio: '2nd-Year BTech Computer Science student specializing in scalable web systems. Passionate about productivity, software design, and engineering craft.',
  avatarUrl: '/src/assets/images/avatar_student_founder_1791028590365.jpg',
  role: 'BTech Student & Software Builder',
  institution: 'School of Computer Science & Engineering',
  joinedDate: 'August 2025',
};

export const initialSettings: UserSettings = {
  theme: 'dark',
  emailNotifications: true,
  dailySummary: true,
  soundEnabled: true,
  language: 'English (US)',
  compactMode: false,
};

// Helper for dynamic relative dates
const getFormattedDate = (offsetDays: number = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const initialTasks: Task[] = [
  {
    id: 'task_1',
    title: 'Complete OOP Assignment',
    description: 'Implement polymorphic factory pattern and write unit test suites in C++.',
    category: 'Study',
    priority: 'high',
    dueDate: getFormattedDate(0),
    completed: true,
    completedAt: getFormattedDate(0),
    createdAt: getFormattedDate(-2),
  },
  {
    id: 'task_2',
    title: 'Study Data Structures',
    description: 'Solve 3 graph traversal problems (BFS/DFS, Dijkstra, Topological Sort).',
    category: 'Study',
    priority: 'high',
    dueDate: getFormattedDate(0),
    completed: false,
    createdAt: getFormattedDate(-1),
  },
  {
    id: 'task_3',
    title: 'Prepare Project Presentation',
    description: 'Draft the architectural slides and system flow diagrams for the semester review.',
    category: 'Study',
    priority: 'medium',
    dueDate: getFormattedDate(1),
    completed: false,
    createdAt: getFormattedDate(-3),
  },
  {
    id: 'task_4',
    title: 'Exercise & Core Workout',
    description: '45-minute calisthenics and cardio session at the campus fitness center.',
    category: 'Health',
    priority: 'medium',
    dueDate: getFormattedDate(0),
    completed: true,
    completedAt: getFormattedDate(0),
    createdAt: getFormattedDate(0),
  },
  {
    id: 'task_5',
    title: 'Read Chapter 4: Computer Networks',
    description: 'Transport layer protocols: TCP congestion control and UDP multiplexing.',
    category: 'Personal',
    priority: 'low',
    dueDate: getFormattedDate(2),
    completed: false,
    createdAt: getFormattedDate(-1),
  },
  {
    id: 'task_6',
    title: 'Review Database Normalization',
    description: 'Practice 1NF, 2NF, 3NF, and BCNF functional dependency decomposition.',
    category: 'Study',
    priority: 'medium',
    dueDate: getFormattedDate(0),
    completed: true,
    completedAt: getFormattedDate(0),
    createdAt: getFormattedDate(-2),
  },
  {
    id: 'task_7',
    title: 'Update Resume & Portfolio',
    description: 'Add the LIFEOS production architecture and technical accomplishments.',
    category: 'Work',
    priority: 'high',
    dueDate: getFormattedDate(3),
    completed: false,
    createdAt: getFormattedDate(-4),
  },
  {
    id: 'task_8',
    title: 'Morning 5km Run',
    description: 'Zone 2 aerobic conditioning session along campus trail.',
    category: 'Health',
    priority: 'medium',
    dueDate: getFormattedDate(-1),
    completed: true,
    completedAt: getFormattedDate(-1),
    createdAt: getFormattedDate(-2),
  },
  {
    id: 'task_9',
    title: 'Push LIFEOS Git Commits',
    description: 'Clean up modular components, verify build pipelines and write clean commits.',
    category: 'Work',
    priority: 'high',
    dueDate: getFormattedDate(0),
    completed: true,
    completedAt: getFormattedDate(0),
    createdAt: getFormattedDate(-1),
  },
  {
    id: 'task_10',
    title: 'Plan Weekly Study Schedule',
    description: 'Allocate dedicated revision blocks for mid-term lab exams.',
    category: 'Personal',
    priority: 'low',
    dueDate: getFormattedDate(0),
    completed: true,
    completedAt: getFormattedDate(0),
    createdAt: getFormattedDate(-1),
  }
];

// Helper to build realistic 14-day history for habits
const generateHabitHistory = (rate: number, todayCompleted: boolean = true): Record<string, boolean> => {
  const history: Record<string, boolean> = {};
  for (let i = 14; i >= 1; i--) {
    const dateStr = getFormattedDate(-i);
    history[dateStr] = Math.random() < rate;
  }
  history[getFormattedDate(0)] = todayCompleted;
  return history;
};

export const initialHabits: Habit[] = [
  {
    id: 'habit_1',
    title: 'Study 2 Hours Deep Work',
    description: 'Dedicated focus block with phone silenced and no social media tabs.',
    category: 'Academic',
    frequency: 'daily',
    currentStreak: 8,
    longestStreak: 14,
    history: generateHabitHistory(0.85, true),
    createdAt: getFormattedDate(-30),
  },
  {
    id: 'habit_2',
    title: 'Drink 3L Water',
    description: 'Maintain hydration throughout study and work sessions.',
    category: 'Health',
    frequency: 'daily',
    currentStreak: 12,
    longestStreak: 21,
    history: generateHabitHistory(0.9, true),
    createdAt: getFormattedDate(-30),
  },
  {
    id: 'habit_3',
    title: 'Exercise & Movement',
    description: 'Minimum 30 minutes of physical training or brisk walking.',
    category: 'Health',
    frequency: 'daily',
    currentStreak: 5,
    longestStreak: 10,
    history: generateHabitHistory(0.75, true),
    createdAt: getFormattedDate(-25),
  },
  {
    id: 'habit_4',
    title: 'Read 20 Pages',
    description: 'Non-fiction books on engineering, mental models, or psychology.',
    category: 'Personal Growth',
    frequency: 'daily',
    currentStreak: 9,
    longestStreak: 15,
    history: generateHabitHistory(0.8, true),
    createdAt: getFormattedDate(-28),
  },
  {
    id: 'habit_5',
    title: 'Sleep on Time (11:00 PM)',
    description: 'Maintain consistent 7.5+ hour sleep schedule for cognitive performance.',
    category: 'Health',
    frequency: 'daily',
    currentStreak: 4,
    longestStreak: 8,
    history: generateHabitHistory(0.65, false),
    createdAt: getFormattedDate(-20),
  },
  {
    id: 'habit_6',
    title: 'Practice Coding (LeetCode)',
    description: 'Solve at least 1 algorithmic problem with optimal time/space complexity.',
    category: 'Career',
    frequency: 'daily',
    currentStreak: 11,
    longestStreak: 18,
    history: generateHabitHistory(0.85, true),
    createdAt: getFormattedDate(-30),
  },
];

export const initialGoals: Goal[] = [
  {
    id: 'goal_1',
    title: 'Complete Semester Project (LIFEOS)',
    description: 'Architect, engineer, and deploy a production-grade personal productivity OS with full responsiveness and clean UI.',
    category: 'Academic',
    deadline: '2026-10-15',
    progress: 70,
    status: 'active',
    milestones: [
      { id: 'm_1_1', title: 'System Architecture & Data Modeling', completed: true },
      { id: 'm_1_2', title: 'Interactive Task & Habit Engine', completed: true },
      { id: 'm_1_3', title: 'Analytics Dashboard & Charts', completed: true },
      { id: 'm_1_4', title: 'Final Testing & Project Documentation', completed: false },
    ],
    createdAt: getFormattedDate(-35),
  },
  {
    id: 'goal_2',
    title: 'Learn Advanced C++ & Concurrency',
    description: 'Master modern C++20 features, memory models, multithreading primitives, and custom allocator designs.',
    category: 'Academic',
    deadline: '2026-11-20',
    progress: 45,
    status: 'active',
    milestones: [
      { id: 'm_2_1', title: 'Smart Pointers & RAII Best Practices', completed: true },
      { id: 'm_2_2', title: 'Templates & Metaprogramming Patterns', completed: true },
      { id: 'm_2_3', title: 'Thread Synchronization & Atomics', completed: false },
      { id: 'm_2_4', title: 'Build a Lock-Free Circular Buffer', completed: false },
    ],
    createdAt: getFormattedDate(-25),
  },
  {
    id: 'goal_3',
    title: 'Improve Daily Productivity Consistency',
    description: 'Sustain an 80%+ weekly productivity score and maintain active habits without breaking streaks.',
    category: 'Personal',
    deadline: '2026-12-31',
    progress: 82,
    status: 'active',
    milestones: [
      { id: 'm_3_1', title: 'Establish 6:30 AM Morning Routine', completed: true },
      { id: 'm_3_2', title: 'Implement 90-min Deep Focus Blocks', completed: true },
      { id: 'm_3_3', title: 'Zero Zero-Productivity Days for 30 Days', completed: true },
      { id: 'm_3_4', title: 'Conduct Sunday Evening Sprint Reviews', completed: false },
    ],
    createdAt: getFormattedDate(-40),
  },
  {
    id: 'goal_4',
    title: 'Secure Summer Software Internship',
    description: 'Target Tier-1 tech internships by strengthening DSA fundamentals, system design, and building live applications.',
    category: 'Career',
    deadline: '2026-11-30',
    progress: 60,
    status: 'active',
    milestones: [
      { id: 'm_4_1', title: 'Solve 150 Curated LeetCode Problems', completed: true },
      { id: 'm_4_2', title: 'Polish Technical Resume & GitHub Profile', completed: true },
      { id: 'm_4_3', title: 'Conduct 5 Mock Technical Interviews', completed: false },
      { id: 'm_4_4', title: 'Submit 25 Targeted Job Applications', completed: false },
    ],
    createdAt: getFormattedDate(-30),
  },
];

export const initialEvents: CalendarEvent[] = [
  {
    id: 'ev_1',
    title: 'OOP Lecture: Virtual Tables & RTTI',
    description: 'CS204 class in Lecture Hall 3B with Prof. Sharma.',
    category: 'Study',
    date: getFormattedDate(0),
    startTime: '09:30',
    endTime: '11:00',
    location: 'Auditorium 3B',
  },
  {
    id: 'ev_2',
    title: 'Project Work & Code Review',
    description: 'Pair programming and integration testing with the team.',
    category: 'Work',
    date: getFormattedDate(0),
    startTime: '13:00',
    endTime: '15:30',
    location: 'Innovation Lab 2',
  },
  {
    id: 'ev_3',
    title: 'Study Session: Graph Theory',
    description: 'Solving topological sorting and minimum spanning tree problems.',
    category: 'Study',
    date: getFormattedDate(0),
    startTime: '16:00',
    endTime: '18:00',
    location: 'Central Library Room 4',
  },
  {
    id: 'ev_4',
    title: 'Fitness & Cardio Session',
    description: 'Workout with calisthenics routine.',
    category: 'Health',
    date: getFormattedDate(0),
    startTime: '18:30',
    endTime: '19:30',
    location: 'Campus Sports Complex',
  },
  {
    id: 'ev_5',
    title: 'Operating Systems Mid-Semester Prep',
    description: 'Review paging, virtual memory, and process scheduling algorithms.',
    category: 'Study',
    date: getFormattedDate(1),
    startTime: '10:00',
    endTime: '12:30',
    location: 'Study Hall',
  },
  {
    id: 'ev_6',
    title: 'Weekly Tech Society Meetup',
    description: 'Lightning talks on modern web performance and distributed systems.',
    category: 'Personal',
    date: getFormattedDate(2),
    startTime: '17:00',
    endTime: '18:30',
    location: 'Student Activity Center',
  },
];

export const initialNotes: Note[] = [
  {
    id: 'note_1',
    title: 'C++ OOP Revision & Concepts',
    content: `# C++ OOP Revision Notes

## 1. Virtual Functions & V-Table
- A class with at least one virtual function receives a hidden pointer (\`vptr\`) pointing to the \`vtable\`.
- Dynamic dispatch enables run-time polymorphism with minimal overhead (~1 pointer dereference).

## 2. RAII (Resource Acquisition Is Initialization)
- Tie resource lifetime (memory, socket, mutex) directly to object scope.
- Prefer \`std::unique_ptr\` and \`std::make_shared\`.

## 3. The Rule of Five
If you define one of these, define all five:
1. Destructor
2. Copy Constructor
3. Copy Assignment Operator
4. Move Constructor
5. Move Assignment Operator`,
    category: 'Study',
    isPinned: true,
    tags: ['C++', 'OOP', 'BTech', 'CS'],
    updatedAt: getFormattedDate(0),
    createdAt: getFormattedDate(-10),
  },
  {
    id: 'note_2',
    title: 'LIFEOS Architecture & Project Ideas',
    content: `# LIFEOS Architectural Blueprint

## Core Objectives
- Unify task management, habit loops, and quarterly goal tracking into one dashboard.
- Provide clean analytics without bloated charts or unnecessary clutter.
- Responsive mobile & desktop experience.

## Key Subsystems
- **Task Engine**: Dynamic priority filtering, due date tracking, category tagging.
- **Habit Streak Tracker**: Daily completion toggle, 14-day history, streak continuity.
- **Goal System**: Milestone decomposition with automatic percentage progress calculation.
- **Unified Planner**: Weekly and monthly views of events and deep focus sessions.`,
    category: 'Projects',
    isPinned: true,
    tags: ['LIFEOS', 'Architecture', 'Engineering'],
    updatedAt: getFormattedDate(-1),
    createdAt: getFormattedDate(-15),
  },
  {
    id: 'note_3',
    title: 'Semester Exam Preparation Checklist',
    content: `# Mid-Semester Exam Checklist

- [x] Computer Networks: TCP/IP Stack & Subnetting
- [x] Database Systems: ER Diagrams & SQL Joins
- [ ] Operating Systems: Deadlock Detection & Semaphores
- [ ] Theory of Computation: Regular Expressions & DFA Reduction
- [ ] Software Engineering: Agile Ceremonies & Design Patterns

Exam begins in 2 weeks. Allocate 2 hours revision block per evening.`,
    category: 'Study',
    isPinned: false,
    tags: ['Exams', 'Academics'],
    updatedAt: getFormattedDate(-2),
    createdAt: getFormattedDate(-7),
  },
  {
    id: 'note_4',
    title: 'Important Books & Reading List',
    content: `# Recommended Reading

1. **Designing Data-Intensive Applications** - Martin Kleppmann
2. **Clean Architecture** - Robert C. Martin
3. **Atomic Habits** - James Clear
4. **Deep Work** - Cal Newport

Aim: 20 pages per morning with a cup of black coffee.`,
    category: 'Personal',
    isPinned: false,
    tags: ['Books', 'Growth'],
    updatedAt: getFormattedDate(-5),
    createdAt: getFormattedDate(-20),
  },
];
