import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for a protected route
  if (request.nextUrl.pathname.startsWith('/(app)')) {
    // Check for session token
    const sessionToken = request.cookies.get('session_token');
    
    if (!sessionToken) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow auth pages and API routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login, register (auth pages)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ],
};