'use server';

/**
 * @fileOverview This file defines a Genkit flow for smart task prioritization based on Jira issue metadata.
 *
 * - smartPrioritization - A function that takes Jira issue metadata and returns a re-prioritized task list.
 * - SmartPrioritizationInput - The input type for the smartPrioritization function.
 * - SmartPrioritizationOutput - The return type for the smartPrioritization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JiraIssueMetadataSchema = z.object({
  issueId: z.string().describe('The unique identifier for the Jira issue.'),
  priority: z.string().describe('The priority of the Jira issue (e.g., High, Medium, Low).'),
  status: z.string().describe('The current status of the Jira issue (e.g., Open, In Progress, Resolved).'),
  resolution: z.string().optional().describe('The resolution of the Jira issue, if applicable (e.g., Done, Cancelled).'),
  dueDate: z.string().optional().describe('The due date of the Jira issue, in ISO 8601 format (YYYY-MM-DD).'),
  taskDescription: z.string().describe('The description of the task associated with the Jira issue.'),
});

export type JiraIssueMetadata = z.infer<typeof JiraIssueMetadataSchema>;

const SmartPrioritizationInputSchema = z.array(JiraIssueMetadataSchema).describe('An array of Jira issue metadata objects.');
export type SmartPrioritizationInput = z.infer<typeof SmartPrioritizationInputSchema>;

const PrioritizedTaskSchema = z.object({
  issueId: z.string().describe('The unique identifier for the Jira issue.'),
  priorityScore: z.number().describe('A numerical score indicating the priority of the task (higher is more urgent).'),
  reason: z.string().describe('The reason for the assigned priority score.'),
});

const SmartPrioritizationOutputSchema = z.array(PrioritizedTaskSchema).describe('An array of prioritized tasks with their priority scores and reasons.');
export type SmartPrioritizationOutput = z.infer<typeof SmartPrioritizationOutputSchema>;

export async function smartPrioritization(input: SmartPrioritizationInput): Promise<SmartPrioritizationOutput> {
  return smartPrioritizationFlow(input);
}

const smartPrioritizationPrompt = ai.definePrompt({
  name: 'smartPrioritizationPrompt',
  input: {schema: SmartPrioritizationInputSchema},
  output: {schema: SmartPrioritizationOutputSchema},
  prompt: `You are an AI-powered task prioritization assistant. Given a list of tasks with associated Jira issue metadata, you will analyze the metadata and assign a priority score to each task. The priority score should reflect the urgency of the task, with higher scores indicating more urgent tasks. You will explain the reasoning behind each assigned priority score.

Here is the list of tasks with their Jira issue metadata:

{{#each this}}
Issue ID: {{issueId}}
Priority: {{priority}}
Status: {{status}}
{{#if resolution}}Resolution: {{resolution}}{{/if}}
{{#if dueDate}}Due Date: {{dueDate}}{{/if}}
Task Description: {{taskDescription}}
---
{{/each}}

Prioritize the tasks based on their urgency, considering factors such as priority, status, resolution, due date, and task description. Return a list of prioritized tasks with their priority scores and reasons. Focus on the factors that suggest the tasks are urgent:

- High priority Jira issues should generally have higher priority scores.
- Issues with approaching due dates should have higher priority scores.
- Open or In Progress issues should generally have higher priority scores than Resolved issues.
- Issues with blockers or critical dependencies should have higher priority scores.
- Urgent requests in the task description should increase the priority score.

Output each task's issueId, a numerical priorityScore (higher is more urgent), and a reason for the score.`, 
});

const smartPrioritizationFlow = ai.defineFlow(
  {
    name: 'smartPrioritizationFlow',
    inputSchema: SmartPrioritizationInputSchema,
    outputSchema: SmartPrioritizationOutputSchema,
  },
  async input => {
    const {output} = await smartPrioritizationPrompt(input);
    return output!;
  }
);
