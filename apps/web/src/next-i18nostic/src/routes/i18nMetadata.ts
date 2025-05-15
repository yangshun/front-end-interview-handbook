import type { Metadata } from 'next';
import nextI18nosticConfig from 'next-i18nostic/config';
import type { AlternateLinkDescriptor } from 'next/dist/lib/metadata/types/alternative-urls-types';

import type { Locale } from '../types';
import i18nHref from '../utils/i18nHref';
import stripTrailingSlashDependingOnConfig from '../utils/stripTrailingSlashDependingOnConfig';

type UrlType =
  | Readonly<{
      canonical: AlternateLinkDescriptor;
      pathname: string;
      type: 'alt_link';
    }>
  | Readonly<{
      canonical: string;
      pathname: string;
      type: 'relative_pathname';
    }>
  | Readonly<{
      canonical: string;
      pathname: string;
      type: 'url_string';
    }>
  | Readonly<{
      canonical: URL;
      pathname: string;
      type: 'url';
    }>;

export function parseCanonical(
  canonical: AlternateLinkDescriptor | URL | string,
): UrlType {
  // URL object.
  if (canonical instanceof URL) {
    return { canonical, pathname: canonical.pathname, type: 'url' };
  }

  if (typeof canonical === 'string') {
    // Full URL string.
    if (/^https?:\/\//.test(canonical)) {
      const canonicalURL = new URL(canonical);

      return { canonical, pathname: canonicalURL.pathname, type: 'url_string' };
    }

    return { canonical, pathname: canonical, type: 'relative_pathname' };
  }

  const canonicalURL = new URL(canonical.url);

  return { canonical, pathname: canonicalURL.pathname, type: 'alt_link' };
}

function generateLanguageUrl({
  pathname,
  type,
  canonical,
}: UrlType): Array<AlternateLinkDescriptor> | URL | string {
  switch (type) {
    case 'url': {
      const newURL = new URL(canonical);

      newURL.pathname = pathname;

      return newURL;
    }

    case 'url_string': {
      const newURL = new URL(canonical);

      newURL.pathname = pathname;

      return newURL.toString();
    }

    case 'relative_pathname': {
      return pathname;
    }

    case 'alt_link': {
      return [
        {
          title: canonical.title,
          url: pathname,
        },
      ];
    }
  }
}

function createLanguages(
  canonicalParam: AlternateLinkDescriptor | URL | string,
) {
  const { pathname, type, canonical } = parseCanonical(canonicalParam);

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

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const newURL = generateLanguageUrl({
        canonical,
        pathname: newPathname,
        type,
      });

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
export default function i18nMetadata(
  nextMetadata: Metadata,
  locale: string,
): Metadata {
  if (!nextMetadata.alternates?.canonical) {
    throw new Error(
      'Canonical field has to provide the generate languages field',
    );
  }

  const canonical = nextMetadata.alternates?.canonical;
  const i18nCanonical =
    typeof canonical === 'string' || canonical instanceof URL
      ? i18nHref(canonical, locale)
      : i18nHref(canonical.url, locale);

  const { robots } = nextMetadata;

  if (typeof robots === 'string') {
    throw 'Cannot specify metadata.robots as string';
  }

  const googleBot = robots?.googleBot;

  if (typeof googleBot === 'string') {
    throw 'Cannot specify metadata.robots.googleBot as string';
  }

  return {
    ...nextMetadata,
    alternates: {
      ...nextMetadata.alternates,
      canonical: i18nCanonical.toString(),
      languages: createLanguages(canonical),
    },
    robots: {
      ...(robots ?? {}),
      googleBot: {
        ...googleBot,
        // To disable Google Chrome from automatically offering to translate
        // to locales that already have dedicated translated versions.
        notranslate: nextI18nosticConfig.defaultLocale !== locale,
      },
    },
  };
}
