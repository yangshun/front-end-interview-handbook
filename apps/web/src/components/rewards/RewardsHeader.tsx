'use client';

import clsx from 'clsx';
import { RiTimeLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import Anchor from '../ui/Anchor';
import Container from '../ui/Container';

type Props = Readonly<{
  isSignedIn: boolean;
}>;

const DISCOUNT_PERCENTAGE = 20;

export default function RewardsHeader({ isSignedIn }: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center gap-y-2 sm:gap-y-4">
      <Anchor
        className={clsx(
          'group relative inline-flex items-center gap-x-1 rounded-full',
          'px-3 py-0.5',
          'text-sm font-medium text-neutral-300',
          'bg-brand/20 hover:bg-brand/30 transition-colors',
          'shiny shadow-sm',
        )}
        variant="unstyled">
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
      </Anchor>
      <Heading level="heading2">
        {intl.formatMessage(
          {
            defaultMessage: '{DISCOUNT_PERCENTAGE}% off all plans',
            description: 'Title for rewards page',
            id: 'De+COK',
          },
          {
            DISCOUNT_PERCENTAGE,
          },
        )}
      </Heading>
      <Section>
        {isSignedIn ? (
          <div className="max-w-md">
            <Text
              className="text-center"
              color="secondary"
              display="block"
              size="body1">
              {intl.formatMessage(
                {
                  defaultMessage:
                    'We are giving away an exclusive {discountPercentage}% off all plans for completing simple tasks like following our socials!',
                  description: 'Subtext for rewards page',
                  id: 'W8ke1i',
                },
                {
                  discountPercentage: DISCOUNT_PERCENTAGE,
                },
              )}
            </Text>
          </div>
        ) : (
          <div>
            <Text
              className="text-center"
              color="secondary"
              display="block"
              size="body1">
              {intl.formatMessage(
                {
                  defaultMessage:
                    'We are giving away exclusive promo codes for {discountPercentage}% off all plans.',
                  description: 'Subtext for rewards page',
                  id: 'hdCLkO',
                },
                {
                  discountPercentage: DISCOUNT_PERCENTAGE,
                },
              )}
            </Text>
            <Text
              className="text-center"
              color="secondary"
              display="block"
              size="body1">
              <FormattedMessage
                defaultMessage="Simply complete social tasks like following our socials to claim your code!"
                description="Subtext for rewards page"
                id="wJFwf9"
              />
            </Text>
          </div>
        )}
      </Section>
    </div>
  );
}
