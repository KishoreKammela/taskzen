
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const sprintSchema = z.object({
  name: z.string().min(1, 'Sprint name is required'),
  goal: z.string().optional(),
  dates: z.object({
    from: z.date({ required_error: 'Start date is required.' }),
    to: z.date({ required_error: 'End date is required.' }),
  }),
});

export function CreateSprintDialog() {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<z.infer<typeof sprintSchema>>({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: '',
      goal: '',
      dates: {
        from: undefined,
        to: undefined,
      },
    },
  });

  function onSubmit(values: z.infer<typeof sprintSchema>) {
    console.log(values);
    // Here you would typically handle form submission, e.g., call an API
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Sprint
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Sprint</DialogTitle>
          <DialogDescription>
            Plan your next sprint by providing a name, goal, and duration.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sprint Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., August Sprint #1" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sprint Goal (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="e.g., Launch V2 of the marketing site" />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dates"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sprint Dates</FormLabel>
                   <Popover>
                    <PopoverTrigger asChild>
                       <FormControl>
                        <Button
                          id="date"
                          variant={'outline'}
                          className={cn('w-full justify-start text-left font-normal', !field.value.from && 'text-muted-foreground')}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, 'LLL dd, y')} - {format(field.value.to, 'LLL dd, y')}
                              </>
                            ) : (
                              format(field.value.from, 'LLL dd, y')
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                       </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={{ from: field.value.from, to: field.value.to }}
                        onSelect={(range) => field.onChange({from: range?.from, to: range?.to})}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Sprint</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
