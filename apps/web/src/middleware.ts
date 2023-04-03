import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { currentExperiment } from '~/components/experiments';

import { i18nMiddleware } from '~/next-i18nostic/src';

function upsertCookie(request: NextRequest, response: NextResponse) {
  if (
    currentExperiment.isRunning &&
    !request.cookies.get(currentExperiment.name)
  ) {
    response.cookies.set(
      currentExperiment.name,
      Math.random() >= 0.5
        ? currentExperiment.variants.a
        : currentExperiment.variants.b,
    );
  }
}

// Migrate tokens from supabase JS SDK v1 to v2 format to preserve
// logged in state for users.
// TODO: Remove after v2 has been in use for a while (in 2023 April/May).
function migrateSupabaseAuthTokens(req: NextRequest, res: NextResponse) {
  if (req.cookies.get('supabase-auth-token')?.value) {
    return;
  }

  if (
    req.cookies.get('sb-access-token')?.value != null &&
    req.cookies.get('sb-refresh-token')?.value != null
  ) {
    const tokens = [
      req.cookies.get('sb-access-token')?.value,
      req.cookies.get('sb-refresh-token')?.value,
      null,
      null,
    ];

    res.cookies.set('supabase-auth-token', JSON.stringify(tokens));

    res.cookies.delete('sb-access-token');
    res.cookies.delete('sb-refresh-token');
    req.cookies.delete('sb-access-token');
    req.cookies.delete('sb-refresh-token');
  }
}

function addBrowserFingerprint(req: NextRequest, res: NextResponse) {
  if (req.cookies.get('gfp')?.value) {
    return;
  }

  res.cookies.set('gfp', `gfp-${uuidv4()}`);
}

export function middleware(req: NextRequest) {
  const i18nMiddlewareRes = i18nMiddleware(req, {
    '/prepare': '/prepare/coding',
    '/questions': '/questions/js',
  });

  const res = i18nMiddlewareRes ?? NextResponse.next();

  upsertCookie(req, res);
  migrateSupabaseAuthTokens(req, res);
  addBrowserFingerprint(req, res);

  const country = req.geo?.country ?? null;

  if (country != null) {
    res.cookies.set('country', country);
  }

  return res;
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
     * - img (public imgs)
     *
     * Add/remove where necessary.
     */
    '/((?!api|_vercel|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|img).*)',
  ],
};
