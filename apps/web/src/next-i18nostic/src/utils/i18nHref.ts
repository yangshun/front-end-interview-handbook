import nextI18nosticConfig from 'next-i18nostic/config';
import type { LinkProps } from 'next/link';

import type { Locale } from '../types';
import parseI18nPathname from './parseI18nPathname';
import stripTrailingSlashDependingOnConfig from './stripTrailingSlashDependingOnConfig';

export default function i18nHref(
  href: LinkProps['href'],
  locale: Locale = nextI18nosticConfig.defaultLocale,
): LinkProps['href'] {
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

  if (process.env.NODE_ENV === 'development') {
    // Warn if not a relative URL.
    if (!pathname.startsWith('/')) {
      console.warn(
        `Only relative URLs supported. Pathnames must start with /, but received "${pathname}"`,
      );
    }
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
