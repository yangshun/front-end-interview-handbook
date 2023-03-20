import type { Metadata } from 'next';
import nextI18nosticConfig from 'next-i18nostic/config';

import type { Locale } from '../types';
import stripTrailingSlashDependingOnConfig from '../utils/stripTrailingSlashDependingOnConfig';

type UrlType = 'relative_pathname' | 'url_string' | 'url';

export function parseCanonical(
  canonical: URL | string,
): Readonly<{ pathname: string; type: UrlType }> {
  // URL object.
  if (canonical instanceof URL) {
    return { pathname: canonical.pathname, type: 'url' };
  }

  // Full URL string.
  if (/^https?:\/\//.test(canonical)) {
    const canonicalURL = new URL(canonical);

    return { pathname: canonicalURL.pathname, type: 'url_string' };
  }

  return { pathname: canonical, type: 'relative_pathname' };
}

function generateLanguageUrl(
  newPathname: string,
  type: UrlType,
  canonical: URL | string,
): URL | string {
  switch (type) {
    case 'url': {
      const newURL = new URL(canonical);

      newURL.pathname = newPathname;

      return newURL;
    }

    case 'url_string': {
      const newURL = new URL(canonical);

      newURL.pathname = newPathname;

      return newURL.toString();
    }

    case 'relative_pathname': {
      return newPathname;
    }
  }
}

function createLanguages(canonical: URL | string) {
  const { pathname, type } = parseCanonical(canonical);

  if (!pathname.startsWith('/')) {
    throw new Error(
      'Canonical field has to be an absolute URL starting with a /',
    );
  }

  const languages: NonNullable<
    NonNullable<Metadata['alternates']>['languages']
  > = {};

  for (const locale in nextI18nosticConfig.localeHrefLangs) {
    if (Object.hasOwn(nextI18nosticConfig.localeHrefLangs, locale)) {
      const hrefLang = nextI18nosticConfig.localeHrefLangs[locale as Locale];
      const newPathname = stripTrailingSlashDependingOnConfig(
        locale === nextI18nosticConfig.defaultLocale
          ? pathname
          : `/${locale}${pathname}`,
      );

      const newURL = generateLanguageUrl(newPathname, type, canonical);

      languages[hrefLang] = newURL;

      if (locale === nextI18nosticConfig.defaultLocale) {
        languages['x-default'] = newURL;
      }
    }
  }

  return languages;
}

/**
 * Add alternates.languages field to Next.js Metadata object.
 *
 * @param Metadata
 * @returns Metadata
 */
export default function i18nMetadata(nextMetadata: Metadata): Metadata {
  if (!nextMetadata.alternates?.canonical) {
    throw new Error(
      'Canonical field has to provided to generate languages field',
    );
  }

  const canonical = nextMetadata.alternates?.canonical;

  return {
    ...nextMetadata,
    alternates: {
      ...nextMetadata.alternates,
      languages: createLanguages(canonical),
    },
  };
}
