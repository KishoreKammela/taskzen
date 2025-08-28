
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle, Rocket } from 'lucide-react';
import SprintOverview from './components/sprint-overview';
import TaskDistributionCharts from './components/task-distribution-charts';
import RecentActivity from './components/recent-activity';
import SprintBurndownChart from './components/sprint-burndown-chart';
import TeamVelocity from './components/team-velocity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
          <p className="text-muted-foreground">An overview of your team's progress and performance.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => router.push('/sprints')}>
            <Rocket className="mr-2" />
            Create Sprint
          </Button>
          <Button variant="outline" onClick={() => router.push('/tasks')}>
            <PlusCircle className="mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <SprintBurndownChart />
          <TaskDistributionCharts />
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-6">
          <SprintOverview />
          <TeamVelocity />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
