'use client';

import React from 'react';
import { Search, LogOut } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogout = async () => {
    await signOut(auth);
    // Clear cookie
    await fetch('/api/auth/session', { method: 'DELETE' });
    router.push('/login');
  };
  
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <SidebarTrigger className="md:hidden" />

      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tasks..."
          className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>{user.displayName ?? user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
