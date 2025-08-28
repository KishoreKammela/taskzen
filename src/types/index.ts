
import type { LucideIcon } from 'lucide-react';
import type { FieldValue, Timestamp } from 'firebase/firestore';

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
  createdAt: Timestamp | FieldValue;
}

export interface Organization {
  id: string;
  name: string;
  settings?: Record<string, any>;
  createdAt: Timestamp | FieldValue;
}

export interface Sprint {
  id: string;
  name: string;
  goal?: string;
  startDate: Timestamp | FieldValue;
  endDate: Timestamp | FieldValue;
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
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
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
  startTime: Timestamp | FieldValue;
  endTime?: Timestamp | FieldValue;
  duration: number; // in minutes
}
