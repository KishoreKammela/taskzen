
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap } from 'lucide-react';

const velocityData = [
  { sprint: 'Sprint 1', points: 35 },
  { sprint: 'Sprint 2', points: 42 },
  { sprint: 'Sprint 3', points: 38 },
  { sprint: 'Sprint 4', points: 45 },
];

export default function TeamVelocity() {
  const averageVelocity = Math.round(velocityData.reduce((acc, sprint) => acc + sprint.points, 0) / velocityData.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="text-accent" />
          Team Velocity
        </CardTitle>
        <CardDescription>
          Average Velocity: <span className="font-bold text-primary">{averageVelocity} pts</span> / sprint
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={velocityData}>
            <XAxis dataKey="sprint" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              contentStyle={{
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Bar dataKey="points" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
