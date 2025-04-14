import { cdnUrl } from '~/utils/cdnUrl';

import { getSiteOrigin } from './siteUrl';

import type { IntlShape } from '@formatjs/intl';

type PageMetadata = Readonly<{
  absoluteTitle?: string;
  description?: string;
  imageUrl?: string;
  locale: string;
  pathname: string;
  siteName?: string;
  template?: string;
  title: string;
}>;

export default function defaultProjectsMetadata(
  intl: IntlShape<string>,
  params: PageMetadata,
) {
  const { description, pathname, locale, title, absoluteTitle } = params;

  return {
    alternates: {
      canonical: pathname,
    },
    description,
    metadataBase: new URL(getSiteOrigin()),
    openGraph: {
      description,
      images: cdnUrl('/img/seo/og-projects.jpg'),
      locale,
      siteName: intl.formatMessage({
        defaultMessage: 'GreatFrontEnd Projects',
        description: 'Title of Projects product',
        id: 'ctbPZV',
      }),
      title,
      type: 'website',
      url: pathname,
    },
    // Disable crawling for non-prod.
    robots:
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? null
        : {
            follow: false,
            index: false,
          },
    title: {
      absolute: absoluteTitle,
      default: title,
      template: intl.formatMessage({
        defaultMessage:
          '%s | GreatFrontEnd Projects - Real-world project challenges',
        description:
          'SEO title with placeholder, please leave the %s untouched',
        id: 'IWsI3H',
      }),
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@greatfrontend',
      description,
      images: '/img/seo/og-projects.jpg',
      site: '@greatfrontend',
      title,
    },
  };
}
