'use client';

import { RiTimeLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { SOCIAL_DISCOUNT_PERCENTAGE } from '../promotions/social/SocialDiscountConfig';

export default function RewardsHeader() {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center gap-y-7">
      <Badge
        icon={RiTimeLine}
        label={intl.formatMessage({
          defaultMessage: 'Limited',
          description: 'Label for rewards campaign',
          id: 'kPJCx6',
        })}
        variant="special"
      />
      <div className="flex flex-col items-center gap-y-2 sm:gap-y-4">
        <Heading level="heading2">
          {intl.formatMessage(
            {
              defaultMessage: '{discountPercentage}% off all plans',
              description: 'Title for rewards page',
              id: 'Vm0aAX',
            },
            {
              discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
            },
          )}
        </Heading>
        <Section>
          <div className="max-w-md">
            <Text className="block text-center" color="secondary" size="body1">
              {intl.formatMessage(
                {
                  defaultMessage:
                    'Claim {discountPercentage}% off all plans by completing simple social tasks!',
                  description: 'Title for rewards page',
                  id: '2w8GaX',
                },
                {
                  discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
                },
              )}
            </Text>
          </div>
        </Section>
      </div>
    </div>
  );
}
