import type { Url } from 'next/dist/shared/lib/router/router';
import nextI18nosticConfig from 'next-i18nostic/config';

import parseI18nPathname from './parseI18nPathname';
import stripTrailingSlashDependingOnConfig from './stripTrailingSlashDependingOnConfig';
import type { Locale } from '../types';

export default function i18nHref(
  href: Url,
  locale: Locale = nextI18nosticConfig.defaultLocale,
): Url {
  // Don't add locale prefix to external URLs.
  if (typeof href === 'string' && /^(http|mailto)/.test(href)) {
    return href;
  }

  // Extract the pathname out.
  const pathname =
    href instanceof Object
      ? href.pathname
      : typeof href === 'string'
      ? href
      : null;

  if (pathname == null) {
    return href;
  }

  // Throw if not an absolute URL.
  if (!pathname.startsWith('/')) {
    throw new Error(
      `Only absolute URLs supported. Pathnames must start with /, but received ${pathname}`,
    );
  }

  const { pathname: rawPathname } = parseI18nPathname(pathname);

  const finalPathname = stripTrailingSlashDependingOnConfig(
    [
      locale === nextI18nosticConfig.defaultLocale ? null : `/${locale}`,
      rawPathname,
    ]
      .filter(Boolean)
      .join(''),
  );

  return href instanceof Object
    ? { ...href, pathname: finalPathname }
    : finalPathname;
}
