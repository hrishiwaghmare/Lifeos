import React, { useState } from 'react';

interface WeeklyBarChartProps {
  data: { day: string; date: string; score: number; tasks: number }[];
}

export const WeeklyProductivityChart: React.FC<WeeklyBarChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxScore = 100;
  const chartHeight = 140;

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2 h-44 pt-6 pb-2 px-2">
        {data.map((item, idx) => {
          const heightPercent = Math.max(10, Math.min(100, item.score));
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.day + item.date}
              className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-12 z-20 px-2.5 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs rounded-lg shadow-md whitespace-nowrap pointer-events-none tabular-nums animate-in fade-in zoom-in-95">
                  <span className="font-semibold">{item.score}%</span> · {item.tasks} tasks done
                </div>
              )}

              {/* Bar Container */}
              <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800/80 rounded-t-lg h-32 flex items-end p-1 overflow-hidden transition-all duration-200">
                <div
                  className={`w-full rounded-md transition-all duration-500 ${
                    item.score >= 80
                      ? 'bg-gradient-to-t from-indigo-600 to-violet-500'
                      : item.score >= 50
                      ? 'bg-gradient-to-t from-indigo-500 to-indigo-400'
                      : 'bg-gradient-to-t from-slate-400 to-slate-300 dark:from-slate-600 dark:to-slate-500'
                  } ${isHovered ? 'brightness-110 shadow-sm' : ''}`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Day Label */}
              <span className={`text-xs font-medium transition-colors ${
                isHovered ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-500 dark:text-slate-400'
              }`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 pt-3 mt-1 px-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-indigo-600" />
            <span>High (&ge;80%)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-indigo-400" />
            <span>Moderate (50-79%)</span>
          </span>
        </div>
        <span className="tabular-nums">Avg 82% this week</span>
      </div>
    </div>
  );
};

interface CategoryDistributionProps {
  categories: { name: string; count: number; color: string }[];
}

export const CategoryBreakdownBar: React.FC<CategoryDistributionProps> = ({ categories }) => {
  const total = categories.reduce((sum, c) => sum + c.count, 0) || 1;

  return (
    <div className="space-y-3">
      {/* Stacked Bar */}
      <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full flex overflow-hidden">
        {categories.map((cat) => {
          const pct = Math.round((cat.count / total) * 100);
          if (pct === 0) return null;
          return (
            <div
              key={cat.name}
              title={`${cat.name}: ${cat.count} (${pct}%)`}
              className={`h-full transition-all duration-300 ${cat.color}`}
              style={{ width: `${pct}%` }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {categories.map((cat) => {
          const pct = Math.round((cat.count / total) * 100);
          return (
            <div key={cat.name} className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 truncate">
                <span className={`w-2 h-2 rounded-full shrink-0 ${cat.color}`} />
                <span className="truncate">{cat.name}</span>
              </span>
              <span className="font-mono tabular-nums text-slate-400 text-xs">
                {cat.count} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface RadialProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export const RadialProductivityScore: React.FC<RadialProgressProps> = ({
  value,
  size = 140,
  strokeWidth = 10,
  label = 'Productivity',
  sublabel = 'Overall Rating',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 dark:text-slate-800"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#radial-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="radial-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
          {value}%
        </span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
    </div>
  );
};
