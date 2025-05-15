import nextI18nosticConfig from 'next-i18nostic/config';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import i18nHref from '../utils/i18nHref';
import inferLocale from '../utils/inferLocale';
import parseI18nPathname from '../utils/parseI18nPathname';
import pathnameStartsWithLocale from '../utils/pathnameStartsWithLocale';
import stripTrailingSlashFromPathname from '../utils/stripTrailingSlashFromPathname';

type Rewrites = Record<string, string>;

function stripTrailingSlashFromPathnameIfNecessary(pathname: string) {
  return nextI18nosticConfig.trailingSlash
    ? pathname
    : stripTrailingSlashFromPathname(pathname);
}

function rewritePathnameIfNecessary(pathname: string, rewrites: Rewrites) {
  return rewrites[pathname] ?? pathname;
}

export default function i18nMiddleware(
  request: NextRequest,
  // Rewrites won't get processed by middleware again, so we
  // need to rewrite to the final destination directly.
  // TODO: Support Next.js-style rewrites config (array).
  rewrites: Rewrites = {},
) {
  const { pathname, search } = request.nextUrl;

  // Check if pathname starts with a known locale.
  const pathnameStartsWithKnownLocale = nextI18nosticConfig.locales.some(
    (locale) => pathnameStartsWithLocale(pathname, locale),
  );

  // Handle if pathname doesn't contain a locale.
  if (!pathnameStartsWithKnownLocale) {
    const locale = nextI18nosticConfig.localeDetection
      ? inferLocale(request)
      : nextI18nosticConfig.defaultLocale;

    // For non-default locales, we redirect users to the localized URLs.
    if (locale !== nextI18nosticConfig.defaultLocale) {
      return NextResponse.redirect(
        new URL(
          stripTrailingSlashFromPathnameIfNecessary(`/${locale}${pathname}`) +
            search,
          request.url,
        ),
      );
    }

    // Show contents of the path as if it's using the default locale via
    // a rewrite.
    // e.g. If default locale is `en` and incoming request is /products,
    // the new URL is now /en/products.
    return NextResponse.rewrite(
      new URL(
        stripTrailingSlashFromPathnameIfNecessary(
          `/${locale}${rewritePathnameIfNecessary(pathname, rewrites)}`,
        ) + search,
        request.url,
      ),
    );
  }

  // If path starts with a default locale, strip it.
  if (pathnameStartsWithLocale(pathname, nextI18nosticConfig.defaultLocale)) {
    const strippedPathname =
      stripTrailingSlashFromPathnameIfNecessary(
        pathname.replace(`/${nextI18nosticConfig.defaultLocale}`, ''),
      ) || '/';

    return NextResponse.redirect(
      new URL(
        rewritePathnameIfNecessary(strippedPathname, rewrites) + search,
        request.url,
      ),
    );
  }

  // Find the rawPathname and check if it matches rewrites.
  const { locale, pathname: rawPathname } = parseI18nPathname(pathname);

  if (Object.hasOwn(rewrites, rawPathname)) {
    return NextResponse.rewrite(
      new URL(
        i18nHref(
          rewritePathnameIfNecessary(rawPathname, rewrites),
          locale ?? nextI18nosticConfig.defaultLocale,
        ).toString() + search,
        request.url,
      ),
    );
  }

  // If the code reaches here, it means that the path contains
  // a known locale but doesn't match any rewrites.
  // in which we can proceed as per normal.
  return null;
}
