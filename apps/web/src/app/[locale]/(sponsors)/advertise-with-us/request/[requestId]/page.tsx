import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next/types';

import SponsorsAdvertiseRequestEditPage from '~/components/sponsors/request/SponsorsAdvertiseRequestEditPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ locale: string; requestId: string }>;
  searchParams: Readonly<{
    step: string;
  }>;
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

export default async function Page({ searchParams, params }: Props) {
  const { requestId } = params;

  const sponsorAdRequest = await prisma.sponsorsAdRequest.findUnique({
    include: {
      ads: {
        include: {
          slots: true,
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
  // On page reload take the user to the starting to make the user start from the beginning and revalidate the form again
  if (searchParams.step) {
    return redirect(`/advertise-with-us/request/${requestId}`);
  }

  return <SponsorsAdvertiseRequestEditPage adRequest={sponsorAdRequest} />;
}
