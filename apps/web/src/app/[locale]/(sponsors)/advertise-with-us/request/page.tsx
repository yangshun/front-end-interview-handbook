import type { Metadata } from 'next/types';

import SponsorsAdvertiseRequestPage from '~/components/sponsors/request/SponsorsAdvertiseRequestPage';

import { getIntlServerOnly } from '~/i18n';
import i18nRedirect from '~/next-i18nostic/src/utils/i18nRedirect';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
  searchParams: Readonly<{
    step: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    ogImageTitle: intl.formatMessage({
      defaultMessage: 'Sponsorship request',
      description: 'Title of advertisement request page',
      id: '0JpG1r',
    }),
    pathname: '/advertise-with-us/request',
    title: intl.formatMessage({
      defaultMessage: 'Request form | Advertise with us',
      description: 'Title of advertise with us page',
      id: '3W2LB+',
    }),
  });
}

export default async function Page({ searchParams, params }: Props) {
  const { locale } = params;

  // On page reload take the user to the starting to make the user start from the beginning and revalidate the form again
  if (searchParams.step) {
    return i18nRedirect('/advertise-with-us/request', { locale });
  }

  return <SponsorsAdvertiseRequestPage />;
}
