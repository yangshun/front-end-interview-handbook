'use client';

import clsx from 'clsx';
import { RiTimeLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import {
  SOCIAL_DISCOUNT_PERCENTAGE,
  useSocialDiscountLabels,
} from '../promotions/social/SocialDiscountConfig';

export default function RewardsHeader() {
  const intl = useIntl();
  const socialDiscountLabels = useSocialDiscountLabels();

  return (
    <div className="flex flex-col items-center gap-y-2 sm:gap-y-4">
      <span
        className={clsx(
          'group relative inline-flex items-center gap-x-1 rounded-full',
          'px-3 py-0.5',
          'text-sm font-medium text-neutral-300',
          'bg-brand/20 hover:bg-brand/30 transition-colors',
          'shiny shadow-sm',
        )}>
        <RiTimeLine
          className={clsx(
            'text-brand h-4 w-4 shrink-0',
            'transition-transform duration-150 ease-in-out group-hover:scale-105',
          )}
        />
        {intl.formatMessage({
          defaultMessage: 'Limited time campaign',
          description: 'Label for rewards campaign',
          id: '8bXZIp',
        })}
      </span>
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
          <Text
            className="text-center"
            color="secondary"
            display="block"
            size="body1">
            {socialDiscountLabels.subtitle}
          </Text>
        </div>
      </Section>
    </div>
  );
}
