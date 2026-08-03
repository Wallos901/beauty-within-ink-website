import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;

  // If no password is set, allow through (e.g. production)
  if (!password) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization') ?? '';

  if (authHeader.startsWith('Basic ')) {
    const decoded  = Buffer.from(authHeader.slice(6), 'base64').toString();
    // Format is "username:password" — we only care about the password part
    const submitted = decoded.split(':').slice(1).join(':');

    if (submitted === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Protected — please enter the password.', {
    status:  401,
    headers: { 'WWW-Authenticate': 'Basic realm="Beauty Within Ink Dev"' },
  });
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
