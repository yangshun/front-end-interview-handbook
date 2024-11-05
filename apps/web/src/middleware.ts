import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { currentExperiment } from '~/components/experiments';

import { i18nMiddleware } from '~/next-i18nostic/src';

import { addBrowserFingerprint } from './logging/fingerprint';
import { addFirstVisit } from './logging/firstVisit';

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

function addCountry(req: NextRequest, res: NextResponse) {
  const country = req.geo?.country ?? null;

  if (country != null) {
    res.cookies.set('country', country);
  }
}

export function middleware(req: NextRequest) {
  const i18nMiddlewareRes = i18nMiddleware(req, {
    '/prepare': '/prepare/coding',
  });

  const res = i18nMiddlewareRes ?? NextResponse.next();

  upsertCookie(req, res);
  addBrowserFingerprint(req, res);
  addCountry(req, res);
  addFirstVisit(req, res);

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
     * - static (public static files)
     * - monaco-editor (monaco editor library)
     *
     * Add/remove where necessary.
     */
    '/((?!api|_vercel|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|img|static|monaco-editor).*)',
  ],
};
