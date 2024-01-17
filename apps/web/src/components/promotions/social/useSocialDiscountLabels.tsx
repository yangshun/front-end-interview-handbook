import { useIntl } from 'react-intl';

import { SOCIAL_DISCOUNT_PERCENTAGE } from './SocialDiscountConfig';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
});

export function useSocialDiscountLabels() {
  const intl = useIntl();

  return {
    ctaLabel: intl.formatMessage({
      defaultMessage: 'Check it out',
      description: 'Button label',
      id: 'SUmtwn',
    }),
    existingPromoCtaLabel: intl.formatMessage({
      defaultMessage: 'Use now',
      description: 'Button label',
      id: 'TDZuZW',
    }),
    existingPromoSubtitle: (
      expiryDate: number,
      discountPercentage: number | null = SOCIAL_DISCOUNT_PERCENTAGE,
    ) =>
      intl.formatMessage(
        {
          defaultMessage: '{discountPercentage}% off, expires on {expiryDate}',
          description: 'Rewards discount message',
          id: '8tpjrI',
        },
        {
          discountPercentage,
          expiryDate: dateFormatter.format(expiryDate * 1000),
        },
      ),
    existingPromoTitle: intl.formatMessage({
      defaultMessage: 'You have an unused promo code',
      description: 'Rewards discount message',
      id: 'VRv5cU',
    }),
    subtitle: intl.formatMessage(
      {
        defaultMessage:
          'Complete simple social tasks like following our social accounts to get {discountPercentage}% off all plans.',
        description: 'Rewards discount message',
        id: 'XLT5qF',
      },
      {
        discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
      },
    ),
    ticketSubtitle: intl.formatMessage({
      defaultMessage: 'All plans, including lifetime',
      description: 'Rewards discount message',
      id: '/8GtPZ',
    }),
    ticketTitle: intl.formatMessage(
      {
        defaultMessage: '{discountPercentage}% off',
        description: 'Rewards discount message',
        id: 'T4ajXP',
      },
      {
        discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
      },
    ),
    title: intl.formatMessage(
      {
        defaultMessage: 'Giving away {discountPercentage}% off all plans!',
        description: 'Rewards discount message',
        id: 'Tjz+5U',
      },
      {
        discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
      },
    ),
  };
}
