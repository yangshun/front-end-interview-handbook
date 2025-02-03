import type { Metadata } from 'next';

import { PROMO_SOCIAL_DISCOUNT_PERCENTAGE } from '~/data/PromotionConfig';

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
    description: intl.formatMessage(
      {
        defaultMessage:
          'Enjoy a discount of {discount}% off all plans by completing simple tasks like following our social media pages. ',
        description: 'Title of Rewards page',
        id: 'M3b/ni',
      },
      { discount: PROMO_SOCIAL_DISCOUNT_PERCENTAGE },
    ),
    locale,
    ogImageProduct: null,
    ogImageTitle: intl.formatMessage(
      {
        defaultMessage: '{discount}% Off - Social Rewards Campaign',
        description: 'Social title of Rewards page',
        id: '7SDFxN',
      },
      { discount: PROMO_SOCIAL_DISCOUNT_PERCENTAGE },
    ),
    pathname: '/rewards/social',
    socialTitle: intl.formatMessage(
      {
        defaultMessage:
          '{discount}% Off - GreatFrontEnd Social Rewards Campaign',
        description: 'Social title of Rewards page',
        id: 'LC6VcF',
      },
      { discount: PROMO_SOCIAL_DISCOUNT_PERCENTAGE },
    ),
    title: intl.formatMessage(
      {
        defaultMessage:
          'Get {discount}% Off All Plans - GreatFrontEnd Social Rewards Campaign',
        description: 'Title of Rewards page',
        id: 'LMrUbV',
      },
      { discount: PROMO_SOCIAL_DISCOUNT_PERCENTAGE },
    ),
  });
}

export default async function Page() {
  return <RewardsIntroPage />;
}
