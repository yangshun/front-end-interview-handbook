import { PROMO_SOCIAL_DISCOUNT_PERCENTAGE } from '~/data/PromotionConfig';

import { FormattedMessage, useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';

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
    existingPromoExpiry: (expiryDate: number) =>
      intl.formatMessage(
        {
          defaultMessage: 'Expires {expiryDate}',
          description: 'Rewards discount message',
          id: 'P4knVE',
        },
        {
          expiryDate: dateFormatter.format(expiryDate * 1000),
        },
      ),
    existingPromoSubtitle: (
      expiryDate: number | null,
      discountPercentage: number | null = PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
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
              defaultMessage: '{discountPercentage}% off, expires {expiryDate}',
              description: 'Rewards discount message',
              id: 'Hc2Ee0',
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
            <Text color="inherit" size="inherit" weight="bold">
              {chunks}
            </Text>
          ),
          discountPercentage: PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
        }}
      />
    ),
    ticketSubtitle: intl.formatMessage({
      defaultMessage: 'All plans, incl. lifetime',
      description: 'Rewards discount message',
      id: 'KTxLJk',
    }),
    ticketTitle: intl.formatMessage(
      {
        defaultMessage: '{discountPercentage}% off',
        description: 'Rewards discount message',
        id: 'T4ajXP',
      },
      {
        discountPercentage: PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
      },
    ),
    title: intl.formatMessage(
      {
        defaultMessage: 'Giving away {discountPercentage}% off all plans!',
        description: 'Rewards discount message',
        id: 'Tjz+5U',
      },
      {
        discountPercentage: PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
      },
    ),
  };
}
