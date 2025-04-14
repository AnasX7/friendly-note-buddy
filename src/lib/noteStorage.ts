
import { Note } from "./types";

const STORAGE_KEY = "notes";

// Default notes for first-time users
const DEFAULT_NOTES: Note[] = [
  {
    id: "1",
    title: "Welcome to NoteBuddy!",
    content: "This is your new note-taking app. Tap the + button to create a new note.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: "purple",
    tags: ["welcome"],
    isPinned: true
  },
  {
    id: "2",
    title: "Shopping List",
    content: "- Milk\n- Eggs\n- Bread\n- Apples\n- Coffee",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    color: "green",
    tags: ["shopping"],
    isPinned: false
  },
  {
    id: "3",
    title: "Meeting Notes",
    content: "- Discuss project timeline\n- Review budget\n- Assign tasks to team members\n- Set next meeting date",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    color: "yellow",
    tags: ["work", "meetings"],
    isPinned: false
  }
];

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
