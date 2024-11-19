'use client';

import { RiTimeLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading, themeTextColor } from '~/components/ui/theme';

import { SOCIAL_DISCOUNT_PERCENTAGE } from '../promotions/social/SocialDiscountConfig';

export default function RewardsHeader() {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center gap-y-6">
      <Badge
        icon={RiTimeLine}
        iconClassName={themeTextColor}
        label={intl.formatMessage({
          defaultMessage: 'Limited time offer',
          description: 'Label for rewards campaign',
          id: 'b8crUg',
        })}
        variant="neutral-active"
      />
      <Heading className={themeGradientHeading} level="heading2">
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
          <Text
            className="block text-center"
            color="secondary"
            size="body0"
            weight="medium">
            {intl.formatMessage(
              {
                defaultMessage:
                  'We are giving away an exclusive {discountPercentage}% of all plans for completing simple tasks like following our socials!',
                description: 'Title for rewards page',
                id: 'iP5QzF',
              },
              {
                discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
              },
            )}
          </Text>
        </div>
      </Section>
    </div>
  );
}
