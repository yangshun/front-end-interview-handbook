import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import SponsorsAdvertiseRequestEditPage from '~/components/sponsors/request/SponsorsAdvertiseRequestEditPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ locale: string; requestId: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, requestId } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    ogImageTitle: intl.formatMessage({
      defaultMessage: 'Sponsorship request',
      description: 'Title of advertisement request page',
      id: '0JpG1r',
    }),
    pathname: `/advertise-with-us/request/${requestId}`,
    title: intl.formatMessage({
      defaultMessage: 'Edit Request form | Advertise with us',
      description: 'Title of advertise with us page',
      id: 'WJgAdh',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { requestId } = params;

  const sponsorAdRequest = await prisma.sponsorsAdRequest.findUnique({
    include: {
      ads: {
        include: {
          slots: true,
        },
      },
      review: {
        select: {
          comments: true,
        },
      },
    },
    where: {
      id: requestId,
    },
  });

  if (sponsorAdRequest == null) {
    return notFound();
  }

  return <SponsorsAdvertiseRequestEditPage adRequest={sponsorAdRequest} />;
}
