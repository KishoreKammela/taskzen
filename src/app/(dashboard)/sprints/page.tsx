
import React from 'react';
import { sprints } from '@/lib/mock-data';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { CreateSprintDialog } from './components/create-sprint-dialog';

export default function SprintsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Sprints</h1>
          <p className="text-muted-foreground">Manage and track your team's sprints.</p>
        </div>
        <CreateSprintDialog />
      </div>
      <DataTable data={sprints} columns={columns} />
    </div>
  );
}
