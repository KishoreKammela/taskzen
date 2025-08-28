'use server';

import { smartPrioritization, SmartPrioritizationInput, SmartPrioritizationOutput } from '@/ai/flows/smart-prioritization';
import type { Task } from '@/types';

function transformTasksForAI(tasks: Task[]): SmartPrioritizationInput {
  return tasks.map(task => ({
    issueId: task.id,
    priority: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
    status: task.status
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    dueDate: task.dueDate,
    taskDescription: task.title,
  }));
}

export async function runSmartPrioritization(tasks: Task[]): Promise<SmartPrioritizationOutput> {
  try {
    const aiInput = transformTasksForAI(tasks);
    const result = await smartPrioritization(aiInput);
    // Sort results by priority score descending
    return result.sort((a, b) => b.priorityScore - a.priorityScore);
  } catch (error) {
    console.error('Error in smart prioritization flow:', error);
    throw new Error('Failed to run smart prioritization. Please check the logs.');
  }
}
