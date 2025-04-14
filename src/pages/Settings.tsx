
import { ArrowLeft, User, Moon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClearAllNotes = () => {
    if (confirm("Are you sure you want to delete all notes? This cannot be undone.")) {
      localStorage.removeItem("notes");
      toast({
        title: "All notes deleted",
        description: "Your notes have been permanently removed",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="flex items-center py-3 px-4 border-b">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-3 font-semibold">Settings</h1>
        </div>
      </header>
      
      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-sm uppercase text-gray-500 font-medium mb-3">Appearance</h2>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Moon className="h-5 w-5 text-gray-500 mr-3" />
                <span>Dark Mode</span>
              </div>
              <Switch id="dark-mode" />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-sm uppercase text-gray-500 font-medium mb-3">Account</h2>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-3" />
              <span>Guest User</span>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-sm uppercase text-gray-500 font-medium mb-3">Data</h2>
          <div className="bg-white rounded-lg shadow-sm">
            <button 
              onClick={handleClearAllNotes}
              className="p-4 w-full flex items-center text-left text-red-500"
            >
              <Trash2 className="h-5 w-5 mr-3" />
              <span>Clear All Notes</span>
            </button>
          </div>
        </div>
        
        <div className="pt-4 text-center">
          <p className="text-sm text-gray-400">NoteBuddy v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
