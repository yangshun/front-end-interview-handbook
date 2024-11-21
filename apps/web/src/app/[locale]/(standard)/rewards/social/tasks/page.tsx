import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import url from 'node:url';

import { SOCIAL_DISCOUNT_PERCENTAGE } from '~/components/promotions/social/SocialDiscountConfig';
import RewardsTasksPage from '~/components/rewards/tasks/RewardsTasksPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Start completing simple tasks to unlock {discount}% off with GreatFrontEnd.',
        description: 'Title of Rewards tasks page',
        id: 'K366Ff',
      },
      { discount: SOCIAL_DISCOUNT_PERCENTAGE },
    ),
    locale,
    pathname: '/rewards/social/tasks',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Start Tasks - GreatFrontEnd Social Rewards Campaign',
      description: 'Title of Rewards tasks page',
      id: 'ScxpRs',
    }),
    title: intl.formatMessage(
      {
        defaultMessage: 'Start Tasks - Unlock {discount}% Off',
        description: 'Title of Rewards tasks page',
        id: 'cWZk16',
      },
      { discount: SOCIAL_DISCOUNT_PERCENTAGE },
    ),
  });
}

export default async function Page() {
  const viewer = await readViewerFromToken();

  if (viewer == null) {
    return redirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/rewards/social/tasks',
        },
      }),
    );
  }

  return <RewardsTasksPage />;
}
