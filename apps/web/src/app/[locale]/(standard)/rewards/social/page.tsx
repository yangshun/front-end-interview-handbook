import type { Metadata } from 'next';

import RewardsIntroPage from '~/components/rewards/RewardsIntroPage';

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
    pathname: '/rewards/social',
    title: intl.formatMessage({
      defaultMessage: 'Social rewards',
      description: 'Title of Rewards page',
      id: 'tk2fQh',
    }),
  });
}

export default async function Page() {
  return <RewardsIntroPage />;
}
