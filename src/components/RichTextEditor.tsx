
import React, { useCallback } from "react";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  
  const execCommand = useCallback((command: string, value: string = "") => {
    document.execCommand(command, false, value);
  }, []);
  
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    onChange(target.innerHTML);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="bg-background border rounded-t-md p-2 flex flex-wrap gap-1">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('bold')}
        >
          <Bold size={16} />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('italic')}
        >
          <Italic size={16} />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('underline')}
        >
          <Underline size={16} />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('insertUnorderedList')}
        >
          <List size={16} />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('insertOrderedList')}
        >
          <ListOrdered size={16} />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('justifyLeft')}
        >
          <AlignLeft size={16} />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('justifyCenter')}
        >
          <AlignCenter size={16} />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('justifyRight')}
        >
          <AlignRight size={16} />
        </Button>
      </div>
      
      <div
        contentEditable
        className="w-full min-h-[calc(100vh-220px)] p-3 rounded-b-md border border-t-0 focus:outline-none focus:ring-0 overflow-auto"
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleInput}
      />
    </div>
  );
};

export default RichTextEditor;
