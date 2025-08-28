import type { LucideIcon } from 'lucide-react';

export type Task = {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done' | 'canceled';
  priority: 'low' | 'medium' | 'high';
  project: string;
  dueDate: string;
};

export type Project = {
  id: string;
  name: string;
  icon: LucideIcon;
};
