
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  color?: string;
  tags: string[];
  isPinned: boolean;
}

export type NoteColor = "purple" | "red" | "green" | "yellow" | "blue" | "pink" | "orange";
