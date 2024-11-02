import { FormattedMessage, useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';

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
      expiryDate: number | null,
      discountPercentage: number | null = SOCIAL_DISCOUNT_PERCENTAGE,
    ) =>
      expiryDate == null
        ? intl.formatMessage(
            {
              defaultMessage: '{discountPercentage}% off',
              description: 'Rewards discount message',
              id: 'T4ajXP',
            },
            {
              discountPercentage,
            },
          )
        : intl.formatMessage(
            {
              defaultMessage:
                '{discountPercentage}% off, expires on {expiryDate}',
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
    subtitle: (
      <FormattedMessage
        defaultMessage="Get additional <bold>{discountPercentage}% discount</bold> off by following our social accounts"
        description="Rewards discount message"
        id="A9b+nP"
        values={{
          bold: (chunks) => (
            <Text size="inherit" weight="bold">
              {chunks}
            </Text>
          ),
          discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
        }}
      />
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
