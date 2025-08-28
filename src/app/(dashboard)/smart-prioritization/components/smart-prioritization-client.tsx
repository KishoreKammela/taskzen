'use client';

import React, from 'react';
import { runSmartPrioritization } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import type { Task } from '@/types';
import type { SmartPrioritizationOutput } from '@/ai/flows/smart-prioritization';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { priorities, statuses } from '@/lib/constants';

interface SmartPrioritizationClientProps {
  initialTasks: Task[];
}

export default function SmartPrioritizationClient({ initialTasks }: SmartPrioritizationClientProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [prioritizedTasks, setPrioritizedTasks] = React.useState<SmartPrioritizationOutput | null>(null);
  const { toast } = useToast();

  const handlePrioritize = async () => {
    setIsLoading(true);
    setPrioritizedTasks(null);
    try {
      const result = await runSmartPrioritization(initialTasks);
      setPrioritizedTasks(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTaskById = (id: string) => initialTasks.find(task => task.id === id);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Prioritize Your Tasks</CardTitle>
          <CardDescription>
            Click the button below to analyze your current tasks using AI. The model will assess urgency based on priority, due dates, and descriptions to generate a new, optimized priority list.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={handlePrioritize} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Analyze & Prioritize
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Original Tasks</h2>
          <div className="space-y-3">
            {initialTasks.map(task => {
              const priority = priorities.find(p => p.value === task.priority);
              const status = statuses.find(s => s.value === task.status);
              return (
                <Card key={task.id} className="text-sm">
                  <CardContent className="p-4">
                    <p className="font-medium">{task.title}</p>
                    <div className="mt-2 flex items-center justify-between text-muted-foreground">
                      <div className="flex items-center gap-2">
                        {priority?.icon && <priority.icon className="h-4 w-4" />}
                        <span>{priority?.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {status?.icon && <status.icon className="h-4 w-4" />}
                        <span>{status?.label}</span>
                      </div>
                      <span>Due: {task.dueDate}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="text-accent" /> AI Prioritized List
          </h2>
          {isLoading && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 font-semibold">AI is analyzing your tasks...</p>
              <p className="text-sm text-muted-foreground">This may take a moment.</p>
            </div>
          )}
          {prioritizedTasks && (
             <div className="space-y-3">
              {prioritizedTasks.map((pTask, index) => {
                const originalTask = getTaskById(pTask.issueId);
                if (!originalTask) return null;
                return (
                  <Card key={pTask.issueId} className="transition-all hover:shadow-md">
                    <CardHeader className="flex flex-row items-start justify-between gap-4 p-4">
                       <div className="flex items-center gap-4">
                         <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                           {index + 1}
                         </span>
                         <div>
                           <CardTitle className="text-base">{originalTask.title}</CardTitle>
                           <CardDescription>Priority Score: <Badge variant="secondary" className="font-mono">{pTask.priorityScore}</Badge></CardDescription>
                         </div>
                       </div>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                       <Alert>
                         <Lightbulb className="h-4 w-4" />
                         <AlertTitle>Reasoning</AlertTitle>
                         <AlertDescription>{pTask.reason}</AlertDescription>
                       </Alert>
                    </CardContent>
                  </Card>
                )
              })}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
