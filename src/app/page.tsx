'use client';
import { useAuth } from '@/hooks/use-auth';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (user) {
    redirect('/tasks');
  } else {
    redirect('/login');
  }
}
