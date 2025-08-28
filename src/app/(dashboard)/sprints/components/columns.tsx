
'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import type { Sprint } from '@/types';
import { format } from 'date-fns';
import { DataTableRowActions } from './data-table-row-actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  active: 'default',
  completed: 'secondary',
  planning: 'outline',
};

export const columns: ColumnDef<Sprint>[] = [
  {
    accessorKey: 'name',
    header: 'Sprint',
    cell: ({ row }) => {
      return (
        <Button variant="link" asChild>
          <Link href={`/sprints/${row.original.id}`} className="font-medium">
            {row.getValue('name')}
          </Link>
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant={statusVariantMap[status]} className="capitalize">
          {status}
        </Badge>
      );
    },
     filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'goal',
    header: 'Goal',
    cell: ({ row }) => <p className="max-w-xs truncate">{row.getValue('goal')}</p>,
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => format(new Date(row.getValue('startDate')), 'PPP'),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => format(new Date(row.getValue('endDate')), 'PPP'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
