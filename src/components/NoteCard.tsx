
import { Note, NoteColor } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Pin } from "lucide-react";
import { Link } from "react-router-dom";

interface NoteCardProps {
  note: Note;
  onPin: (id: string) => void;
}

const NoteCard = ({ note, onPin }: NoteCardProps) => {
  const getColorClass = (color?: string): string => {
    switch (color as NoteColor) {
      case "red":
        return "bg-note-red/10 border-note-red/30";
      case "green":
        return "bg-note-green/10 border-note-green/30";
      case "yellow":
        return "bg-note-yellow/10 border-note-yellow/30";
      case "blue":
        return "bg-note-blue/10 border-note-blue/30";
      case "pink":
        return "bg-note-pink/10 border-note-pink/30";
      case "orange":
        return "bg-note-orange/10 border-note-orange/30";
      default:
        return "bg-note-purple/10 border-note-purple/30";
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  // Strip HTML tags and truncate content for preview
  const stripHtmlAndTruncate = (html: string, maxLength: number = 100) => {
    // Create a temporary div to render the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Get the text content without HTML tags
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Truncate if needed
    if (textContent.length <= maxLength) return textContent;
    return textContent.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className={cn(
        "relative rounded-xl p-4 border animate-fade-in note-card-shadow",
        getColorClass(note.color)
      )}
    >
      <Link to={`/note/${note.id}`} className="block h-full">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg mb-2">{note.title}</h3>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onPin(note.id);
            }}
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <Pin 
              className={cn(
                "w-5 h-5", 
                note.isPinned ? "fill-note-purple text-note-purple" : ""
              )} 
            />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 whitespace-pre-line mb-3">
          {stripHtmlAndTruncate(note.content)}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-1">
            {note.tags.slice(0, 2).map(tag => (
              <span 
                key={tag} 
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {note.tags.length > 2 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{note.tags.length - 2}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-400">{formatDate(note.updatedAt)}</span>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;
