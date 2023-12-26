import type { Metadata } from 'next/types';

import RewardsTermsPage from '~/components/rewards/terms/RewardsTermsPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/rewards/social/terms',
    title: intl.formatMessage({
      defaultMessage: 'Rewards Terms and Conditions',
      description: 'Title of rewards terms page',
      id: 'avuK5U',
    }),
  });
}

export default function Page() {
  return <RewardsTermsPage />;
}
