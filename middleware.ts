import { NextResponse, type NextRequest } from 'next/server';
export function middleware(req: NextRequest) {
  const isAdmin = req.nextUrl.pathname.startsWith('/admin');
  if (isAdmin && process.env.APP_ENV === 'production' && !req.cookies.get('sr_session')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/admin/:path*'] };
