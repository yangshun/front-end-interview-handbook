import type { Metadata } from 'next';
import url from 'node:url';

import { PROMO_SOCIAL_DISCOUNT_PERCENTAGE } from '~/data/PromotionConfig';

import RewardsTasksPage from '~/components/rewards/tasks/RewardsTasksPage';

import { getIntlServerOnly } from '~/i18n';
import i18nRedirect from '~/next-i18nostic/src/utils/i18nRedirect';
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
  const title = intl.formatMessage(
    {
      defaultMessage: 'Start Tasks - Unlock {discount}% Off',
      description: 'Title of Rewards tasks page',
      id: 'cWZk16',
    },
    { discount: PROMO_SOCIAL_DISCOUNT_PERCENTAGE },
  );

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Start completing simple tasks to unlock {discount}% off with GreatFrontEnd.',
        description: 'Title of Rewards tasks page',
        id: 'K366Ff',
      },
      { discount: PROMO_SOCIAL_DISCOUNT_PERCENTAGE },
    ),
    locale,
    ogImageProduct: null,
    ogImageTitle: title,
    pathname: '/rewards/social/tasks',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Start Tasks - GreatFrontEnd Social Rewards Campaign',
      description: 'Title of Rewards tasks page',
      id: 'ScxpRs',
    }),
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const viewer = await readViewerFromToken();

  if (viewer == null) {
    return i18nRedirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/rewards/social/tasks',
        },
      }),
      { locale },
    );
  }

  return <RewardsTasksPage />;
}
