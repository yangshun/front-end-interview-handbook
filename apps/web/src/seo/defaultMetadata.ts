import 'server-only';

import type { Metadata } from 'next/types';
import url from 'node:url';

import { i18nMetadata } from '~/next-i18nostic/src';

import { getSiteOrigin } from './siteUrl';

type PageMetadata = Readonly<{
  description?: string;
  imageUrl?: string;
  locale: string;
  ogImageCategory?: string;
  ogImageTitle?: string;
  pathname: string;
  siteName?: string;
  socialTitle?: string;
  template?: string;
  title: string;
}>;

export default function defaultMetadata({
  description,
  locale,
  pathname,
  siteName,
  template,
  title,
  socialTitle,
  imageUrl,
  ogImageTitle,
  ogImageCategory,
}: PageMetadata): Metadata {
  const ogImageUrl = ogImageTitle
    ? url.format({
        pathname: '/api/interviews/og',
        query: {
          category: ogImageCategory,
          title: ogImageTitle,
        },
      })
    : imageUrl || '/img/seo/og.jpg';

  return i18nMetadata(
    {
      alternates: {
        canonical: pathname,
      },
      description,
      metadataBase: new URL(getSiteOrigin()),
      openGraph: {
        description,
        images: ogImageUrl,
        locale,
        siteName: siteName || 'GreatFrontEnd',
        title: socialTitle || title,
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
        default: title,
        template: template || '%s | GreatFrontEnd',
      },
      twitter: {
        card: 'summary_large_image',
        creator: '@greatfrontend',
        description,
        images: ogImageUrl,
        site: '@greatfrontend',
        title: socialTitle || title,
      },
    },
    locale,
  );
}
