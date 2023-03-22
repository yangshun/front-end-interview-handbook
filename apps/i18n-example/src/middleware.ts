import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { i18nMiddleware } from 'next-i18nostic';

export function middleware(req: NextRequest) {
  // `/_next/` and `/api/` are ignored by the watcher, but we need to
  // ignore files in `public` manually if they're not already handled below.
  //
  // if (
  //   [
  //     '/manifest.json',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return

  return i18nMiddleware(req) ?? NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _vercel (Vercel internal routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots.txt file)
     *
     * Add/remove where necessary.
     */
    '/((?!api|_vercel|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
