import 'server-only';

import type { Metadata } from 'next/types';
import url from 'node:url';

import { i18nMetadata } from '~/next-i18nostic/src';
import { cdnUrl } from '~/utils/cdnUrl';

import { getSiteOrigin } from './siteUrl';

type PageMetadata = Readonly<{
  absoluteTitle?: string;
  description?: string;
  imageUrl?: string;
  locale: string;
  ogImagePageType?: string;
  ogImageProduct?: 'INTERVIEWS' | 'PROJECTS' | null;
  ogImageTitle?: string;
  pathname: string;
  siteName?: string;
  socialTitle?: string;
  template?: string;
  title: string;
}>;

export default function defaultMetadata({
  absoluteTitle,
  description,
  imageUrl,
  locale,
  ogImagePageType,
  ogImageProduct = 'INTERVIEWS',
  ogImageTitle,
  pathname,
  siteName,
  socialTitle,
  template,
  title,
}: PageMetadata): Metadata {
  const ogImageUrl = ogImageTitle
    ? url.format({
        pathname: '/api/og',
        query: {
          category: ogImagePageType,
          product: ogImageProduct,
          title: ogImageTitle,
        },
      })
    : cdnUrl(imageUrl || '/img/seo/og.jpg');

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
        absolute: absoluteTitle,
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
