
import React from 'react';
import { notFound } from 'next/navigation';
import { sprints, tasks } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Flag, Play, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { DataTable } from '@/app/(dashboard)/tasks/components/data-table';
import { columns } from '@/app/(dashboard)/tasks/components/columns';

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  active: 'default',
  completed: 'secondary',
  planning: 'outline',
};

const statusActions = {
    planning: { label: 'Start Sprint', icon: Play, nextStatus: 'active' },
    active: { label: 'Complete Sprint', icon: CheckCircle, nextStatus: 'completed' },
    completed: { label: 'Re-open Sprint', icon: Edit, nextStatus: 'active' }
}

export default function SprintDetailPage({ params }: { params: { id: string } }) {
  const sprint = sprints.find((s) => s.id === params.id);

  if (!sprint) {
    notFound();
  }

  const sprintTasks = tasks.filter((task) => task.sprintId === sprint.id);
  const completedTasks = sprintTasks.filter(task => task.status === 'done').length;
  const progress = sprintTasks.length > 0 ? (completedTasks / sprintTasks.length) * 100 : 0;
  
  const CurrentStatusAction = statusActions[sprint.status as keyof typeof statusActions];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
           <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/sprints">
                <ArrowLeft className="mr-2" />
                Back to Sprints
            </Link>
           </Button>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl flex items-center gap-3">
            {sprint.name}
             <Badge variant={statusVariantMap[sprint.status]} className="capitalize text-base">
              {sprint.status}
            </Badge>
          </h1>
          <p className="text-muted-foreground mt-1">
            {format(new Date(sprint.startDate), 'MMMM d, yyyy')} - {format(new Date(sprint.endDate), 'MMMM d, yyyy')}
          </p>
        </div>
        <div className="flex gap-2">
            {CurrentStatusAction && (
                 <Button>
                    <CurrentStatusAction.icon className="mr-2" />
                    {CurrentStatusAction.label}
                </Button>
            )}
            <Button variant="outline">
                <Edit className="mr-2" />
                Edit Sprint
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Sprint Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{completedTasks} of {sprintTasks.length} tasks completed</span>
                        <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Sprint Tasks</CardTitle>
                <CardDescription>All tasks assigned to this sprint.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable data={sprintTasks} columns={columns} />
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><Flag/> Sprint Goal</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">{sprint.goal || 'No goal was set for this sprint.'}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Capacity</CardTitle>
                    <CardDescription>Team capacity vs. planned work.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="space-y-2">
                        <Label className="text-sm">Total Capacity: 80 Story Points</Label>
                        <Progress value={80} />
                    </div>
                     <div className="space-y-2">
                        <Label className="text-sm">Planned Work: 65 Story Points</Label>
                        <Progress value={(65/80)*100} />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
