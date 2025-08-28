
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock } from 'lucide-react';

const activities = [
  {
    user: { name: 'Alex', avatar: '/avatars/01.png' },
    action: 'created task',
    target: 'TASK-1024',
    time: '2m ago',
  },
  {
    user: { name: 'Mia', avatar: '/avatars/02.png' },
    action: 'moved task',
    target: 'TASK-1023 to In Progress',
    time: '10m ago',
  },
  {
    user: { name: 'Sam', avatar: '/avatars/03.png' },
    action: 'commented on',
    target: 'TASK-1022',
    time: '30m ago',
  },
  {
    user: { name: 'Alex', avatar: '/avatars/01.png' },
    action: 'completed task',
    target: 'TASK-1021',
    time: '1h ago',
  },
];

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p>
                  <span className="font-medium">{activity.user.name}</span> {activity.action}{' '}
                  <span className="font-medium text-primary">{activity.target}</span>.
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
