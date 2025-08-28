
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  ClipboardCheck,
  LayoutDashboard,
  Calendar,
  Box,
  BarChart2,
  Settings,
  LifeBuoy,
  LayoutGrid,
  Sparkles,
  KanbanSquare,
} from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

const mainNav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/sprints', label: 'Sprints', icon: Calendar },
  { href: '/sprint-planning', label: 'Planning', icon: KanbanSquare },
  { href: '/backlog', label: 'Backlog', icon: Box },
  { href: '/tasks', label: 'Tasks', icon: LayoutGrid },
  { href: '/reports', label: 'Reports', icon: BarChart2 },
  { href: '/smart-prioritization', label: 'Smart Prioritization', icon: Sparkles },
];

export default function SidebarNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <ClipboardCheck className="size-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-sidebar-foreground">TaskZen</h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {mainNav.map((item) => (
             <SidebarMenuItem key={item.href}>
               <SidebarMenuButton href={item.href} isActive={isActive(item.href)} tooltip={item.label}>
                 <item.icon />
                 {item.label}
               </SidebarMenuButton>
             </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton href="#" tooltip="Support">
              <LifeBuoy />
              Support
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton href="#" tooltip="Settings">
              <Settings />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
