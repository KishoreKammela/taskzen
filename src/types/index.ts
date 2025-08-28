
import type { LucideIcon } from 'lucide-react';

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
  createdAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  settings?: Record<string, any>;
  createdAt: Date;
}

export interface Sprint {
  id: string;
  name: string;
  goal?: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'active' | 'completed';
  organizationId: string;
  createdBy: string; // userId
  capacity?: number;
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
  storyPoints?: number;
  createdAt?: Date;
  updatedAt?: Date;
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
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
}
