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
     * - monaco-editor (monaco editor library)
     *
     * Add/remove where necessary.
     */
    '/((?!api|_vercel|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|img|monaco-editor).*)',
  ],
};
