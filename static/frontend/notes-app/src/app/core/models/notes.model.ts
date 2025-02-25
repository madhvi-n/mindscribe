import { User } from './user.model';

export class Label {
  id: number;
  name: string;
}

export class Note {
  id: number;
  title: string;
  content: string;
  color: string;
  created_at: string;
  updated_at: string;
  is_pinned: boolean;
  is_archived: boolean;
  is_edited: boolean;
  labels: Label[];
  collaborators: User[];
}
