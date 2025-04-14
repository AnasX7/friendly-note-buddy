
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  // Quill modules to attach to editor
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  // Quill editor formats
  const formats = [
    'bold', 'italic', 'underline',
    'list', 'bullet', 'align'
  ];

  return (
    <ScrollArea className="w-full">
      <div className="w-full">
        <ReactQuill 
          theme="snow"
          value={content}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="w-full min-h-[calc(100vh-250px)]"
        />
      </div>
    </ScrollArea>
  );
};

export default RichTextEditor;
