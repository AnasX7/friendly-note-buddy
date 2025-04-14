
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Trash2, Palette } from "lucide-react";
import { getNote, saveNote, deleteNote } from "@/lib/noteStorage";
import { Note, NoteColor } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const colorOptions: {color: NoteColor, label: string}[] = [
  { color: "purple", label: "Purple" },
  { color: "red", label: "Red" },
  { color: "green", label: "Green" },
  { color: "yellow", label: "Yellow" },
  { color: "blue", label: "Blue" },
  { color: "pink", label: "Pink" },
  { color: "orange", label: "Orange" },
];

const NoteEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewNote = id === "new";

  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    color: "purple",
    tags: [],
    isPinned: false
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!isNewNote && id) {
      const existingNote = getNote(id);
      if (existingNote) {
        setNote(existingNote);
      } else {
        toast({
          title: "Note not found",
          description: "Redirecting to create a new note",
          variant: "destructive",
        });
        navigate("/note/new");
      }
    }
  }, [id, isNewNote, navigate, toast]);

  const handleSave = () => {
    if (!note.title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title for your note",
        variant: "destructive",
      });
      return;
    }
    
    saveNote(note);
    toast({
      title: isNewNote ? "Note created" : "Note updated",
      description: "Your changes have been saved",
    });
    navigate("/");
  };

  const handleDelete = () => {
    if (!isNewNote && id) {
      deleteNote(id);
      toast({
        title: "Note deleted",
        description: "Your note has been removed",
      });
      navigate("/");
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!note.tags.includes(tagInput.trim())) {
        setNote({
          ...note,
          tags: [...note.tags, tagInput.trim()]
        });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNote({
      ...note,
      tags: note.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const setColor = (color: NoteColor) => {
    setNote({
      ...note,
      color
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="flex justify-between items-center py-3 px-4 border-b">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            {!isNewNote && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Palette className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {colorOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.color}
                    onClick={() => setColor(option.color)}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-4 h-4 rounded-full bg-note-${option.color}`} 
                      />
                      <span>{option.label}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button onClick={handleSave} size="sm">
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </header>
      
      <div className="p-4">
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          className="w-full font-semibold text-xl mb-4 p-2 bg-transparent border-none focus:outline-none focus:ring-0"
        />
        
        <textarea
          placeholder="Write your note here..."
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          className="w-full min-h-[calc(100vh-220px)] p-2 bg-transparent border-none focus:outline-none focus:ring-0 resize-none"
        />
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {note.tags.map(tag => (
              <div 
                key={tag} 
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1"
              >
                <span className="text-sm text-gray-700">{tag}</span>
                <button 
                  onClick={() => handleRemoveTag(tag)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <input
            type="text"
            placeholder="Add tags... (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="w-full p-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
