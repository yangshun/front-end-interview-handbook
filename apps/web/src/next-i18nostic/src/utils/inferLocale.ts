import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import nextI18nosticConfig from 'next-i18nostic/config';
import type { NextRequest } from 'next/server';

// Taken from https://github.com/vercel/next.js/blob/canary/examples/app-dir-i18n-routing/middleware.ts
export default function inferLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers.
  const negotiatorHeaders: Record<string, string> = {};

  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale.
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return matchLocale(
    languages,
    nextI18nosticConfig.locales.slice(),
    nextI18nosticConfig.defaultLocale,
  );
}
