import React from 'react';
import { tasks } from '@/lib/mock-data';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function TasksPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Tasks</h1>
          <p className="text-muted-foreground">Here's a list of your tasks for this month!</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
