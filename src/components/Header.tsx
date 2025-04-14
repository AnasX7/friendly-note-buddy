
import { Settings, Search as SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
}

const Header = ({ title, showSearch = false, onSearch }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center py-4 px-4">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        
        <div className="flex items-center gap-3">
          {showSearch && onSearch && (
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search notes"
                className="pl-9 py-1.5 pr-3 rounded-full text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 w-[140px] focus:w-[180px] transition-all"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          )}
          
          <Link to="/settings" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
