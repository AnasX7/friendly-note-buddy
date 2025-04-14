
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CreateNoteButton from "@/components/CreateNoteButton";
import NoteCard from "@/components/NoteCard";
import SearchBar from "@/components/SearchBar";
import { Note } from "@/lib/types";
import { getNotes, searchNotes, togglePinNote } from "@/lib/noteStorage";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    const allNotes = searchQuery ? searchNotes(searchQuery) : getNotes();
    setNotes(allNotes);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchNotes(query);
    setNotes(results);
  };

  const handlePinNote = (id: string) => {
    togglePinNote(id);
    loadNotes();
    toast({
      title: "Note updated",
      description: "Pin status changed",
      duration: 2000,
    });
  };

  // Separate pinned and unpinned notes
  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <Header title="My Notes" />
      <SearchBar onSearch={handleSearch} />

      <div className="px-4 pb-4">
        {pinnedNotes.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm uppercase text-gray-500 font-medium mb-3 ml-1">Pinned</h2>
            <div className="grid grid-cols-1 gap-4">
              {pinnedNotes.map(note => (
                <NoteCard key={note.id} note={note} onPin={handlePinNote} />
              ))}
            </div>
          </div>
        )}

        <div>
          {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
            <h2 className="text-sm uppercase text-gray-500 font-medium mb-3 ml-1">Others</h2>
          )}
          
          {notes.length === 0 ? (
            <div className="mt-10 text-center">
              <p className="text-gray-500">No notes found</p>
              {searchQuery && (
                <button 
                  onClick={() => handleSearch("")} 
                  className="mt-2 text-primary text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {unpinnedNotes.map(note => (
                <NoteCard key={note.id} note={note} onPin={handlePinNote} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <CreateNoteButton />
    </div>
  );
};

export default Index;
