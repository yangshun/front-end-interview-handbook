import type { Metadata } from 'next/types';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import RewardsTerms from '../../../../../components/rewards/RewardsTerms';

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
    pathname: '/rewards/terms',
    title: intl.formatMessage({
      defaultMessage: 'Rewards Terms and Conditions',
      description: 'Title of rewards terms page',
      id: 'avuK5U',
    }),
  });
}

export default function Page() {
  return (
    <RewardsTerms />
  );
}
