'use client';

import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, GripVertical } from 'lucide-react';
import type { Sprint, Task } from '@/types';
import { priorities, statuses } from '@/lib/constants';

interface SprintPlanningClientProps {
  allSprints: Sprint[];
  allTasks: Task[];
}

const TaskCard = ({ task, index }: { task: Task; index: number }) => {
  const priority = useMemo(() => priorities.find(p => p.value === task.priority), [task.priority]);
  const status = useMemo(() => statuses.find(s => s.value === task.status), [task.status]);
  
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-2 rounded-md border bg-card p-3 shadow-sm ${snapshot.isDragging ? 'bg-accent' : ''}`}
        >
          <div className="flex items-start justify-between">
            <p className="font-medium">{task.title}</p>
            <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs font-semibold">{task.storyPoints || 0}</span>
                <GripVertical className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              {priority?.icon && <priority.icon className="h-3 w-3" />}
              <span>{priority?.label}</span>
            </div>
            <Badge variant="outline">{task.id}</Badge>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default function SprintPlanningClient({ allSprints, allTasks }: SprintPlanningClientProps) {
  const [selectedSprintId, setSelectedSprintId] = useState<string | null>(null);
  const [tasks, setTasks] = useState(allTasks);

  const backlogTasks = useMemo(() => tasks.filter(t => !t.sprintId), [tasks]);
  const sprintTasks = useMemo(() => tasks.filter(t => t.sprintId === selectedSprintId), [tasks, selectedSprintId]);

  const selectedSprint = useMemo(() => allSprints.find(s => s.id === selectedSprintId), [allSprints, selectedSprintId]);
  const sprintCapacity = selectedSprint?.capacity || 50; // default capacity
  const currentLoad = useMemo(() => sprintTasks.reduce((acc, task) => acc + (task.storyPoints || 0), 0), [sprintTasks]);
  const capacityProgress = (currentLoad / sprintCapacity) * 100;

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
        // Re-ordering within the same list
        // This is complex to implement correctly without a proper state management library
        // For now, we will skip reordering logic
        return;
    }
    
    // Moving from one list to another
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === draggableId) {
          return { ...task, sprintId: destination.droppableId === 'sprint-tasks' ? selectedSprintId : undefined };
        }
        return task;
      })
    );
  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Select a Sprint to Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
                <Select onValueChange={setSelectedSprintId}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a sprint..." />
                </SelectTrigger>
                <SelectContent>
                    {allSprints.filter(s => s.status !== 'completed').map(sprint => (
                    <SelectItem key={sprint.id} value={sprint.id}>
                        {sprint.name}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                 {selectedSprint && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium">Sprint Capacity</span>
                            <span>{currentLoad} / {sprintCapacity} Story Points</span>
                        </div>
                        <Progress value={capacityProgress} />
                    </div>
                )}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Backlog</CardTitle>
            </CardHeader>
            <CardContent>
              <Droppable droppableId="backlog-tasks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[400px] rounded-md bg-muted p-2">
                    {backlogTasks.length > 0 ? (
                      backlogTasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        Backlog is empty.
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{selectedSprint ? selectedSprint.name : 'Sprint Tasks'}</CardTitle>
            </CardHeader>
            <CardContent>
               <Droppable droppableId="sprint-tasks">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`min-h-[400px] rounded-md bg-muted p-2 ${snapshot.isDraggingOver ? 'bg-accent' : ''}`}
                  >
                    {selectedSprintId ? (
                        sprintTasks.length > 0 ? (
                            sprintTasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                Drag tasks here to add them to the sprint.
                            </div>
                        )
                    ) : (
                         <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            Please select a sprint to see its tasks.
                         </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>
        </div>
      </div>
    </DragDropContext>
  );
}
