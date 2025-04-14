
import { Note } from "./types";

const STORAGE_KEY = "notes";

// Default notes for first-time users
const DEFAULT_NOTES: Note[] = [];

// Get all notes from storage
export const getNotes = (): Note[] => {
  const storedNotes = localStorage.getItem(STORAGE_KEY);
  if (!storedNotes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NOTES));
    return DEFAULT_NOTES;
  }
  return JSON.parse(storedNotes);
};

// Get a single note by id
export const getNote = (id: string): Note | undefined => {
  const notes = getNotes();
  return notes.find(note => note.id === id);
};

// Save a new note
export const saveNote = (note: Note): void => {
  const notes = getNotes();
  const existingNoteIndex = notes.findIndex(n => n.id === note.id);
  
  if (existingNoteIndex >= 0) {
    // Update existing note
    notes[existingNoteIndex] = {
      ...note,
      updatedAt: new Date().toISOString()
    };
  } else {
    // Add new note
    notes.push({
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

// Delete a note by id
export const deleteNote = (id: string): void => {
  const notes = getNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
};

// Toggle pin status
export const togglePinNote = (id: string): void => {
  const notes = getNotes();
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex >= 0) {
    notes[noteIndex] = {
      ...notes[noteIndex],
      isPinned: !notes[noteIndex].isPinned,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }
};

// Search notes
export const searchNotes = (query: string): Note[] => {
  if (!query.trim()) return getNotes();
  
  const notes = getNotes();
  const lowerQuery = query.toLowerCase();
  
  return notes.filter(
    note => 
      note.title.toLowerCase().includes(lowerQuery) || 
      note.content.toLowerCase().includes(lowerQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
