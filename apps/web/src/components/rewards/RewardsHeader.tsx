'use client';

import { RiTimeLine } from 'react-icons/ri';

import { PROMO_SOCIAL_DISCOUNT_PERCENTAGE } from '~/data/PromotionConfig';

import { FormattedMessage, useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading, themeTextColor } from '~/components/ui/theme';

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
      <Heading
        className={themeGradientHeading}
        level="heading2"
        weight="medium">
        {intl.formatMessage(
          {
            defaultMessage: '{discountPercentage}% off all plans',
            description: 'Title for rewards page',
            id: 'Vm0aAX',
          },
          {
            discountPercentage: PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
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
            <FormattedMessage
              defaultMessage="We are giving away an exclusive <strong>{discountPercentage}% off all purchases</strong> for completing simple tasks!"
              description="Title for rewards page"
              id="/arZkH"
              values={{
                discountPercentage: PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
                strong: (chunks) => (
                  <Text color="default" weight="medium">
                    {chunks}
                  </Text>
                ),
              }}
            />
          </Text>
        </div>
      </Section>
    </div>
  );
}
