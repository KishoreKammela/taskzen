import type { Project, Task } from '@/types';
import { FileText, Code, Home } from 'lucide-react';

export const projects: Project[] = [
  { id: 'PROJ-1', name: 'Website Redesign', icon: Home },
  { id: 'PROJ-2', name: 'API Integration', icon: Code },
  { id: 'PROJ-3', name: 'Documentation', icon: FileText },
];

export const tasks: Task[] = [
  {
    id: 'TASK-8782',
    title: 'Deploy to production',
    status: 'todo',
    priority: 'medium',
    project: 'Website Redesign',
    dueDate: '2024-08-15',
  },
  {
    id: 'TASK-7878',
    title: 'Fix authentication bug',
    status: 'in-progress',
    priority: 'high',
    project: 'API Integration',
    dueDate: '2024-08-01',
  },
  {
    id: 'TASK-4567',
    title: 'Design new landing page',
    status: 'done',
    priority: 'medium',
    project: 'Website Redesign',
    dueDate: '2024-07-20',
  },
  {
    id: 'TASK-2345',
    title: 'Write API documentation',
    status: 'canceled',
    priority: 'low',
    project: 'Documentation',
    dueDate: '2024-07-30',
  },
  {
    id: 'TASK-9876',
    title: 'Implement user profile page',
    status: 'todo',
    priority: 'high',
    project: 'Website Redesign',
    dueDate: '2024-09-01',
  },
  {
    id: 'TASK-5432',
    title: 'Set up CI/CD pipeline',
    status: 'in-progress',
    priority: 'high',
    project: 'API Integration',
    dueDate: '2024-08-10',
  },
  {
    id: 'TASK-1011',
    title: 'Update component library',
    status: 'done',
    priority: 'low',
    project: 'Website Redesign',
    dueDate: '2024-07-15',
  },
  {
    id: 'TASK-1213',
    title: 'Onboard new developer',
    status: 'todo',
    priority: 'medium',
    project: 'API Integration',
    dueDate: '2024-08-05',
  },
  {
    id: 'TASK-1415',
    title: 'Review analytics data',
    status: 'in-progress',
    priority: 'low',
    project: 'Website Redesign',
    dueDate: '2024-07-28',
  },
  {
    id: 'TASK-1617',
    title: 'Create getting started guide',
    status: 'todo',
    priority: 'medium',
    project: 'Documentation',
    dueDate: '2024-09-15',
  },
];
