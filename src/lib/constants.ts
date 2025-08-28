
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle2, Circle, CircleDashed, XCircle, Rocket, Flag, Zap } from 'lucide-react';

export const statuses = [
  {
    value: 'todo',
    label: 'Todo',
    icon: Circle,
  },
  {
    value: 'in-progress',
    label: 'In Progress',
    icon: CircleDashed,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle2,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: XCircle,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRight,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUp,
  },
];

export const sprintStatuses = [
  {
    value: 'planning',
    label: 'Planning',
    icon: Flag,
  },
  {
    value: 'active',
    label: 'Active',
    icon: Rocket,
  },
    {
    value: 'completed',
    label: 'Completed',
    icon: CheckCircle2,
  },
]
