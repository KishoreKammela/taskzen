
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set this to true to bypass authentication for development purposes.
// REMEMBER to set this back to false for production.
const BYPASS_AUTH = true;

export function middleware(request: NextRequest) {
  if (BYPASS_AUTH) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get('firebase-session');
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/tasks', '/smart-prioritization', '/dashboard', '/sprints', '/backlog', '/reports'];

  if (!sessionToken && protectedRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (sessionToken && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
