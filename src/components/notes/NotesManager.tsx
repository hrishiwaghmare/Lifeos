import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Note } from '../../types';
import { NoteModal } from './NoteModal';
import { 
  Plus, 
  Search, 
  Pin, 
  Trash2, 
  Edit3, 
  FileText, 
  Tag, 
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const NotesManager: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote, togglePinNote, openConfirmDialog } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleOpenAdd = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (note: Note) => {
    openConfirmDialog({
      title: 'Delete Note',
      message: `Are you sure you want to delete "${note.title}"?`,
      confirmLabel: 'Delete Note',
      isDestructive: true,
      onConfirm: () => {
        deleteNote(note.id);
        if (selectedNote?.id === note.id) setSelectedNote(null);
      },
    });
  };

  const filteredNotes = notes.filter((n) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchBody = n.content.toLowerCase().includes(q);
      const matchTags = n.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchBody && !matchTags) return false;
    }
    if (selectedCategory !== 'all' && n.category !== selectedCategory) return false;
    return true;
  });

  const pinnedNotes = filteredNotes.filter((n) => n.isPinned);
  const otherNotes = filteredNotes.filter((n) => !n.isPinned);

  // If selectedNote is set, ensure it reflects current notes
  const activeNote = selectedNote ? notes.find((n) => n.id === selectedNote.id) || null : null;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Notes & Knowledge Repository
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Capture revision outlines, algorithmic summaries, project architecture diagrams, and reading logs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* Search & Categories Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, concepts, code, or tags..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1">
          {['all', 'Study', 'Projects', 'Personal', 'Ideas'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Notes' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Notes Cards + Active Reader Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Note Cards Grid (or single list if activeNote) */}
        <div className={activeNote ? 'lg:col-span-5 space-y-4' : 'lg:col-span-12'}>
          
          {/* Pinned Section */}
          {pinnedNotes.length > 0 && (
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Pin className="w-3.5 h-3.5" />
                <span>Pinned Notes ({pinnedNotes.length})</span>
              </div>

              <div className={`grid gap-4 ${activeNote ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {pinnedNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNote(note)}
                    className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between ${
                      activeNote?.id === note.id
                        ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                        : 'border-slate-200/80 dark:border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                          {note.category}
                        </span>
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => togglePinNote(note.id)}
                            className="p-1 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded"
                            title="Unpin note"
                          >
                            <Pin className="w-3.5 h-3.5 fill-indigo-600 dark:fill-indigo-400" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(note)}
                            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePrompt(note)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1.5">
                        {note.title}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed font-mono">
                        {note.content.replace(/^#+\s/gm, '')}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{note.updatedAt}</span>
                      </span>
                      {note.tags && note.tags.length > 0 && (
                        <span className="truncate max-w-[120px]">
                          {note.tags.map((t) => `#${t}`).join(' ')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Notes Section */}
          <div className="space-y-3">
            {pinnedNotes.length > 0 && otherNotes.length > 0 && (
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                All Other Notes ({otherNotes.length})
              </span>
            )}

            {filteredNotes.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center">
                <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  No notes found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                  Capture thoughts, lecture summaries, or project specifications.
                </p>
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                >
                  Create First Note
                </button>
              </div>
            ) : (
              <div className={`grid gap-4 ${activeNote ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {otherNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNote(note)}
                    className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between ${
                      activeNote?.id === note.id
                        ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                        : 'border-slate-200/80 dark:border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          {note.category}
                        </span>
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => togglePinNote(note.id)}
                            className="p-1 text-slate-400 hover:text-indigo-600 rounded"
                            title="Pin note"
                          >
                            <Pin className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(note)}
                            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePrompt(note)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1.5">
                        {note.title}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed font-mono">
                        {note.content.replace(/^#+\s/gm, '')}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{note.updatedAt}</span>
                      </span>
                      {note.tags && note.tags.length > 0 && (
                        <span className="truncate max-w-[120px]">
                          {note.tags.map((t) => `#${t}`).join(' ')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Note Reader & Inspector (when a note is selected) */}
        {activeNote && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {activeNote.category}
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="text-xs text-slate-400">Last updated {activeNote.updatedAt}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(activeNote)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setSelectedNote(null)}
                    className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
                  >
                    Close
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {activeNote.title}
              </h2>

              {activeNote.tags && activeNote.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5 text-xs text-slate-500">
                  {activeNote.tags.map((tag) => (
                    <span key={tag} className="font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Formatted Content Body */}
              <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                {activeNote.content}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Created {activeNote.createdAt}</span>
              <button
                onClick={() => handleDeletePrompt(activeNote)}
                className="text-rose-500 hover:text-rose-600 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete note</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Note Add/Edit Modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (editingNote) {
            updateNote(editingNote.id, data);
          } else {
            addNote(data);
          }
        }}
        initialNote={editingNote}
      />
    </div>
  );
};
