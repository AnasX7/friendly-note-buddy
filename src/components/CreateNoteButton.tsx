
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const CreateNoteButton = () => {
  return (
    <Link 
      to="/note/new" 
      className="fixed right-6 bottom-6 rounded-full bg-note-purple text-white w-14 h-14 flex items-center justify-center shadow-lg hover:bg-note-purple/90 transition-colors"
      aria-label="Create new note"
    >
      <Plus className="w-6 h-6" />
    </Link>
  );
};

export default CreateNoteButton;
