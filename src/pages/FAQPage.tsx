import React, { useState } from 'react';
import { PublicHeader } from '../components/common/PublicHeader';
import { Footer } from '../components/common/Footer';
import { ChevronDown, Search, HelpCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FAQPage: React.FC = () => {
  const { setActivePage } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqItems = [
    {
      question: 'What is LIFEOS?',
      answer: 'LIFEOS is an all-in-one personal productivity and life-management platform. It combines task management, daily habit tracking, quarterly goal setting, daily calendar planning, structured knowledge notes, and quantitative productivity analytics into one synchronized dashboard.',
      category: 'General',
    },
    {
      question: 'How can LIFEOS help students?',
      answer: 'Students face constant juggling between coursework deadlines, lab examinations, fitness schedules, and career preparations. LIFEOS eliminates application fragmentation by unifying daily obligations, enabling students to prioritize assignments by urgency, schedule study sessions on a calendar, and maintain continuous LeetCode and revision streaks.',
      category: 'Academics',
    },
    {
      question: 'What is a habit tracker and why is it important?',
      answer: 'A habit tracker is a behavioral system designed to log daily execution of micro-actions (e.g., studying 2 hours, drinking water, coding daily). LIFEOS calculates ongoing streaks and provides 7-day visual consistency matrices, leveraging the psychological principle of continuous visual momentum to prevent breaking healthy routines.',
      category: 'Habits',
    },
    {
      question: 'How can I manage my daily tasks efficiently in LIFEOS?',
      answer: 'In the Tasks module, you can categorize tasks into Study, Work, Personal, and Health domains, assign priorities (High, Medium, Low), and set precise deadlines. You can quickly filter by status, sort by due date or priority weight, and check off items directly from the morning dashboard overview.',
      category: 'Tasks',
    },
    {
      question: 'How can I track my goals and break them into milestones?',
      answer: 'In the Goal Tracker, you establish high-level strategic objectives (Academic, Career, Health, or Personal). Each goal can be broken into concrete sub-milestones. As you check off milestones, your progress percentage updates dynamically, and reaching 100% triggers a milestone celebration.',
      category: 'Goals',
    },
    {
      question: 'How does LIFEOS calculate and improve my productivity score?',
      answer: 'The LIFEOS productivity index is a composite formula calculated from your actual task completion rate (45%), daily habit consistency (35%), and milestone progression velocity (20%). It gives you a non-judgmental, quantitative metric of your daily focus and identifies which days of the week you perform best.',
      category: 'Analytics',
    },
    {
      question: 'Is my data private and stored securely?',
      answer: 'Yes. In the current release, all your tasks, notes, habits, and schedules are stored locally in your browser using structured LocalStorage. No private academic data, passwords, or personal notes are transmitted to unauthorized third-party trackers.',
      category: 'Security',
    },
    {
      question: 'Can I use LIFEOS on my phone or tablet?',
      answer: 'Yes. LIFEOS is built with a mobile-first responsive architecture. The layout smoothly adapts with a collapsible navigation drawer, touch-friendly checkboxes, and responsive charts tailored for mobile and tablet viewports.',
      category: 'Platform',
    },
  ];

  const filteredFaqs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <PublicHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base & Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Everything you need to know about the LIFEOS productivity system, habit mechanics, and academic workflow.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-lg mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., habits, tasks, score)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No matching questions found for &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-base hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Contact Prompt */}
        <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-3xl p-8 text-center space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Have a question not addressed here?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Feel free to send feedback, feature proposals, or academic project inquiries to our development team.
          </p>
          <button
            onClick={() => setActivePage('contact')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
          >
            <span>Contact Support</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};
