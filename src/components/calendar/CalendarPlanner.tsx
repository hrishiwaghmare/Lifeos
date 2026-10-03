import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarEvent, EventCategory } from '../../types';
import { EventModal } from './EventModal';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Trash2, 
  Edit3,
  CalendarDays
} from 'lucide-react';

export const CalendarPlanner: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent, openConfirmDialog } = useApp();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleOpenAdd = (dateStr?: string) => {
    setEditingEvent(null);
    if (dateStr) setSelectedDate(dateStr);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (event: CalendarEvent) => {
    openConfirmDialog({
      title: 'Remove Calendar Event',
      message: `Are you sure you want to remove "${event.title}" from your schedule?`,
      confirmLabel: 'Remove Event',
      isDestructive: true,
      onConfirm: () => deleteEvent(event.id),
    });
  };

  // Month grid calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Array of days for current month
  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    calendarDays.push({ day, dateStr: dStr });
  }

  // Selected Day Events
  const eventsForSelectedDay = events.filter((e) => e.date === selectedDate);

  // Upcoming Events (sorted)
  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingEvents = [...events]
    .filter((e) => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
    .slice(0, 5);

  const getCategoryColor = (cat: EventCategory): string => {
    switch (cat) {
      case 'Study': return 'bg-indigo-500 text-white';
      case 'Work': return 'bg-amber-500 text-white';
      case 'Health': return 'bg-emerald-500 text-white';
      case 'Personal': return 'bg-sky-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Calendar & Daily Planner
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Coordinate lecture timetables, revision sessions, project deadlines, and gym appointments.
          </p>
        </div>

        <button
          onClick={() => handleOpenAdd(selectedDate)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Calendar View (Month / Week) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          
          {/* Calendar Header Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {monthName} {year}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevMonth}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Segmented View Mode */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  viewMode === 'month'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Month Grid
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  viewMode === 'week'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Week Agenda
              </button>
            </div>
          </div>

          {viewMode === 'month' ? (
            /* Month Calendar Grid */
            <div>
              {/* Day Name Headers */}
              <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 dark:text-slate-500 pb-2">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>

              {/* Grid cells */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {calendarDays.map((cell, idx) => {
                  if (!cell) {
                    return (
                      <div
                        key={`empty_${idx}`}
                        className="h-20 sm:h-24 bg-slate-50/50 dark:bg-slate-800/20 rounded-xl border border-transparent"
                      />
                    );
                  }

                  const dayEvents = events.filter((e) => e.date === cell.dateStr);
                  const isToday = cell.dateStr === todayStr;
                  const isSelected = cell.dateStr === selectedDate;

                  return (
                    <div
                      key={cell.dateStr}
                      onClick={() => setSelectedDate(cell.dateStr)}
                      className={`h-20 sm:h-24 p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/40 shadow-xs'
                          : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded-md ${
                            isToday
                              ? 'bg-indigo-600 text-white'
                              : isSelected
                              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {cell.day}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 overflow-hidden">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <div
                            key={ev.id}
                            className={`text-[10px] px-1.5 py-0.5 rounded truncate font-medium ${getCategoryColor(
                              ev.category
                            )}`}
                            title={`${ev.startTime} ${ev.title}`}
                          >
                            {ev.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-[9px] text-slate-400 block px-1">
                            +{dayEvents.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Week Agenda View */
            <div className="space-y-3">
              {Array.from({ length: 7 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() + i);
                const dStr = d.toISOString().split('T')[0];
                const dayLabel = d.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                });
                const dayEvents = events.filter((e) => e.date === dStr);

                return (
                  <div
                    key={dStr}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {dayLabel} {dStr === todayStr && '(Today)'}
                      </span>
                      <button
                        onClick={() => handleOpenAdd(dStr)}
                        className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Event</span>
                      </button>
                    </div>

                    {dayEvents.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No scheduled sessions</p>
                    ) : (
                      <div className="space-y-2">
                        {dayEvents.map((ev) => (
                          <div
                            key={ev.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-indigo-600 dark:text-indigo-400 tabular-nums font-semibold">
                                {ev.startTime} - {ev.endTime}
                              </span>
                              <span className="font-medium text-slate-800 dark:text-slate-200">
                                {ev.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 text-[11px]">{ev.category}</span>
                              <button
                                onClick={() => handleOpenEdit(ev)}
                                className="text-slate-400 hover:text-slate-600 p-1"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Day & Upcoming Events Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Selected Date Details */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Schedule for {selectedDate}
                </h3>
                <span className="text-xs text-slate-400">
                  {eventsForSelectedDay.length} planned session{eventsForSelectedDay.length === 1 ? '' : 's'}
                </span>
              </div>
              <button
                onClick={() => handleOpenAdd(selectedDate)}
                className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg text-xs flex items-center gap-1 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="mt-3 space-y-2.5">
              {eventsForSelectedDay.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No events booked for this date.
                </div>
              ) : (
                eventsForSelectedDay.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {ev.title}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(ev)}
                          className="text-slate-400 hover:text-slate-700 p-1"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeletePrompt(ev)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                      <Clock className="w-3 h-3" />
                      <span>{ev.startTime} - {ev.endTime}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="font-sans font-medium text-indigo-600 dark:text-indigo-400">
                        {ev.category}
                      </span>
                    </div>

                    {ev.location && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                    )}

                    {ev.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
                        {ev.description}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming High Priority Events */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Upcoming Agenda
            </h3>
            <div className="space-y-2.5">
              {upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedDate(ev.date)}
                  className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-900 dark:text-white truncate">
                      {ev.title}
                    </span>
                    <span className="font-mono tabular-nums text-slate-400 text-[11px] shrink-0">
                      {ev.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{ev.startTime}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{ev.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Add/Edit Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (editingEvent) {
            updateEvent(editingEvent.id, data);
          } else {
            addEvent(data);
          }
        }}
        initialEvent={editingEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};
