import React from 'react';
import { tasks } from '@/lib/mock-data';
import SmartPrioritizationClient from './components/smart-prioritization-client';

export default function SmartPrioritizationPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Smart Prioritization</h1>
        <p className="text-muted-foreground">Let AI help you re-prioritize your tasks based on urgency.</p>
      </div>
      <SmartPrioritizationClient initialTasks={tasks} />
    </div>
  );
}
