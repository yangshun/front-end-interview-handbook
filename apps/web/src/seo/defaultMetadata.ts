import 'server-only';

import type { Metadata } from 'next/types';

import { i18nMetadata } from '~/next-i18nostic/src';

import { getSiteUrl } from './siteUrl';

type PageMetadata = Readonly<{
  description?: string;
  locale: string;
  pathname: string;
  title: string;
}>;

export default function defaultMetadata({
  description,
  locale,
  pathname,
  title,
}: PageMetadata): Metadata {
  return i18nMetadata({
    alternates: {
      canonical: pathname,
    },
    description,
    metadataBase: new URL(getSiteUrl()),
    openGraph: {
      description,
      images: '/img/seo/og.jpg',
      locale,
      siteName: 'GreatFrontEnd',
      title,
      type: 'website',
      url: pathname,
    },
    title: {
      default: title,
      template: '%s | GreatFrontEnd',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@greatfrontend',
      description,
      images: '/img/seo/og.jpg',
      site: '@greatfrontend',
      title,
    },
  });
}
