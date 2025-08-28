
import type { LucideIcon } from 'lucide-react';
import type { FieldValue } from 'firebase/firestore';

export type Project = {
  id: string;
  name: string;
  icon: LucideIcon;
};

// Firestore Schema Types

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'member';
  organizationId: string;
  createdAt: FieldValue;
}

export interface Organization {
  id: string;
  name: string;
  settings?: Record<string, any>;
  createdAt: FieldValue;
}

export interface Sprint {
  id: string;
  name: string;
  goal?: string;
  startDate: FieldValue;
  endDate: FieldValue;
  status: 'planning' | 'active' | 'completed';
  organizationId: string;
  createdBy: string; // userId
}

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done' | 'canceled';
  priority: 'low' | 'medium' | 'high';
  assigneeId?: string; // userId
  sprintId?: string;
  project?: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};


export interface Backlog {
  id: string;
  organizationId: string;
  tasks: string[]; // array of taskIds
}

export interface TimeTracking {
  id:string;
  taskId: string;
  userId: string;
  startTime: FieldValue;
  endTime?: FieldValue;
  duration: number; // in minutes
}
