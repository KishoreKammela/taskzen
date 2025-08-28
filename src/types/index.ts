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
  createdAt: number; // timestamp
}

export interface Organization {
  id: string;
  name: string;
  settings?: Record<string, any>;
  createdAt: number; // timestamp
}

export interface Sprint {
  id: string;
  name: string;
  goal?: string;
  startDate: number; // timestamp
  endDate: number; // timestamp
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
  sprintId: string;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
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
  startTime: number; // timestamp
  endTime?: number; // timestamp
  duration: number; // in minutes
}
