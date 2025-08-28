import React from 'react';
import SprintPlanningClient from './components/sprint-planning-client';
import { sprints, tasks } from '@/lib/mock-data';

export default function SprintPlanningPage() {
  // For now, we'll pass all tasks as backlog tasks.
  // In a real app, you'd filter tasks that are not already in a sprint.
  const backlogTasks = tasks.filter(t => !t.sprintId);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Sprint Planning</h1>
        <p className="text-muted-foreground">Plan your upcoming sprints by assigning tasks from the backlog.</p>
      </div>
      <SprintPlanningClient allSprints={sprints} allTasks={tasks} />
    </div>
  );
}
