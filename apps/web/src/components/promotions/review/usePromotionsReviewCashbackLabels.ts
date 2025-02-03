import { PROMO_REVIEW_CASHBACK_DISCOUNT_PERCENTAGE } from '~/data/PromotionConfig';

import { useIntl } from '~/components/intl';

export default function usePromotionsReviewCashbackLabels() {
  const intl = useIntl();

  return {
    subtitle: intl.formatMessage(
      {
        defaultMessage:
          'Write or film a review of your experience with GreatFrontEnd for a {discountPercentage}% cashback on your first order amount. Success stories are welcome too!',
        description: 'Subtitle of discount promotion card',
        id: 'l/9/qK',
      },
      {
        discountPercentage: PROMO_REVIEW_CASHBACK_DISCOUNT_PERCENTAGE,
      },
    ),
    title: intl.formatMessage({
      defaultMessage: 'Review Cashback',
      description: 'Promotion title',
      id: 'f5UO3s',
    }),
  };
}
