
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingDown } from 'lucide-react';

const data = [
  { day: 'Day 1', ideal: 100, actual: 100 },
  { day: 'Day 2', ideal: 90, actual: 95 },
  { day: 'Day 3', ideal: 80, actual: 85 },
  { day: 'Day 4', ideal: 70, actual: 78 },
  { day: 'Day 5', ideal: 60, actual: 65 },
  { day: 'Day 6', ideal: 50, actual: 52 },
  { day: 'Day 7', ideal: 40, actual: 48 },
  { day: 'Day 8', ideal: 30, actual: 35 },
  { day: 'Day 9', ideal: 20, actual: 22 },
  { day: 'Day 10', ideal: 10, actual: 10 },
  { day: 'Day 11', ideal: 0, actual: 5 },
];

export default function SprintBurndownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown />
          Sprint Burndown
        </CardTitle>
        <CardDescription>An overview of the remaining work in the current sprint.</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis label={{ value: 'Story Points', angle: -90, position: 'insideLeft' }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Area type="monotone" dataKey="ideal" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Ideal" />
            <Area type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" name="Actual" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
