# LIFEOS – Personal Life & Productivity Management Platform

> **"Organize Your Life. Master Your Time. Achieve Your Goals."**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Project Overview

**LIFEOS** is an all-in-one personal productivity and life-management platform developed as a **2nd-Year BTech Computer Science Main Academic Project**. It resolves the issue of productivity fragmentation by unifying daily tasks, atomic habit loops, quarterly goal setting, interactive calendar planning, structured knowledge notes, and quantitative productivity statistics into a single high-performance dashboard.

Designed specifically for university students, engineers, and ambitious professionals, LIFEOS bridges the gap between daily execution and long-term academic trajectories.

---

## 🚀 Key Features

### 1. Smart Task Management
- Full CRUD operations with priority grading (High, Medium, Low).
- Domain tagging: Study, Work, Personal, Health, Other.
- Instant search filter and sorting by due date, priority, or title.
- Real-time completion toggles with celebratory micro-animations.

### 2. Atomic Habit Tracker & Streaks
- Daily completion toggle with persistent historical logs.
- Visual 7-day past week matrix (M-T-W-T-F-S-S).
- Real-time streak tracking (current consecutive days and all-time record).
- Confetti celebration upon maintaining streaks.

### 3. Strategic Goal Tracker
- Quarterly and annual objectives categorized into Academic, Career, Personal, and Health.
- Multi-stage sub-milestones checklist with dynamic completion percentage calculation.
- Verifiable deadline dates with status indicators (Active, Completed, On Hold).

### 4. Interactive Calendar & Planner
- Integrated Monthly Calendar grid view and Weekly Agenda view.
- Color-coded event tags (Study/Lectures, Work/Projects, Personal, Fitness).
- Upcoming events timeline and custom time-slot scheduling.

### 5. Structured Notes & Knowledge Base
- Rich markdown support for algorithmic revision, lecture formulas, and architecture blueprints.
- Quick search across titles, content, and tags.
- Pinning mechanism for high-frequency reference notes.

### 6. Productivity Analytics & Scoring
- Daily, weekly, and monthly velocity tracking.
- Weighted composite Productivity Score ($45\%$ tasks $+$ $35\%$ habits $+$ $20\%$ goals).
- Identification of peak focus days and domain workload allocation charts.

### 7. Modern SaaS UX & Accessibility
- High-contrast **Dark Mode** and clean **Light Mode** toggle.
- Non-pill typographic hierarchy adhering to modern SaaS design guidelines.
- Responsive layout across desktop ($1440\text{px}$), tablets, and mobile smartphones.
- Zero-latency LocalStorage persistence.

---

## 🛠 Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/) & [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Data Layer**: Structured LocalStorage abstraction with typed getters/setters (ready for Supabase/Firebase migration)

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/lifeos.git
cd lifeos

# Install dependencies
npm install

# Start development server
npm run dev
```
The application will launch at `http://localhost:3000`.

---

## 🏗 Build & Production Verification

```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```
The output files will be compiled into the `dist/` directory.

---

## 🚀 Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your `lifeos` repository.
4. Set Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Deploying to Netlify
1. Log in to [Netlify](https://netlify.com/) and select **Add new site** > **Import an existing project**.
2. Connect your Git repository.
3. Set Build Configuration:
   - **Base directory**: `/`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**.

---

## 🔍 SEO & Google Search Console Setup

LIFEOS comes fully configured for search engine crawling and rich snippet generation:

1. **Meta & OpenGraph Tags**: Configured in `index.html` with title, meta description, and social share previews.
2. **Schema.org Structured Data**: Embedded JSON-LD `WebApplication` schema for rich search results.
3. **Robots File**: Located at `/public/robots.txt` allowing search engines to index public landing and resource pages while excluding private workspace routes.
4. **XML Sitemap**: Located at `/public/sitemap.xml` referencing all indexable marketing, FAQ, about, and legal pages.
5. **Google Search Console Verification**:
   - Open `index.html`.
   - Locate the `<meta name="google-site-verification" content="YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE" />` tag.
   - Replace the placeholder with your site verification token provided in Google Search Console.
6. **Google Analytics (GA4)**:
   - A dedicated placeholder block is included in `index.html`. Uncomment the script and insert your Measurement ID (`G-XXXXXXXXXX`).

---

## 🔮 Future Scope & Academic Roadmap

- **AI Personal Productivity Assistant**: Context-aware agent powered by Google Gemini to summarize lecture notes and answer queries.
- **AI Automated Timetable Generation**: Algorithmic generation of study schedules based on exam dates and historical focus curves.
- **Cloud Backend Integration**: Seamless migration to Supabase or Firebase Auth with real-time multi-device cloud synchronization.
- **Native Mobile Apps**: Cross-platform mobile version using React Native / PWA.
- **Google Calendar / Outlook Sync**: Bi-directional event integration via OAuth 2.0.

---

## 📜 License & Acknowledgments

Developed by **Hrishikesh Waghmare** as a 2nd-Year BTech Computer Science Main Project.  
Licensed under the [MIT License](LICENSE).
