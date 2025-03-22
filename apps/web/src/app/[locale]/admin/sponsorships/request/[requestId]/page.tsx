import type { Metadata } from 'next/types';

import SponsorsAdminAdRequestPage from '~/components/sponsors/admin/SponsorsAdminAdRequestPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

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
      defaultMessage: 'Ad request | Advertise with us',
      description: 'Title of advertise with us page',
      id: 'FXRzYm',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { requestId } = params;

  return <SponsorsAdminAdRequestPage adRequestId={requestId} />;
}
