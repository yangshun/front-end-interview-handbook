'use client';

import clsx from 'clsx';
import { LuClock3 } from "react-icons/lu";
import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import Anchor from '../ui/Anchor';

type Props = Readonly<{
  isSignedIn: boolean;
}>;

export default function RewardsHeader({ isSignedIn }: Props) {
  return (
    <div className="flex flex-col items-center mx-auto max-w-7xl px-4 pt-8 sm:px-4 lg:pt-12 gap-y-2 sm:gap-y-4">
      <Anchor
        className={clsx(
          'group relative inline-flex items-center gap-x-1 rounded-full',
          'px-3 py-0.5',
          'text-sm font-medium text-neutral-300',
          'bg-brand/20 hover:bg-brand/30 transition-colors',
          'shiny shadow-sm',
        )}
        variant="unstyled">
        <LuClock3
          className={clsx(
            'text-brand h-4 w-4 shrink-0',
            'transition-transform duration-150 ease-in-out group-hover:scale-105',
          )}
        />
        Limited time campaign
      </Anchor>
      <Heading level="heading1">
        <FormattedMessage
          defaultMessage="20% off all plans"
          description="Title for rewards page"
          id="yLsxUM"
        />
      </Heading>
      { isSignedIn ? (
          <div>
            <Text className="text-center text-neutral-600 dark:text-neutral-400" display="block" size="body1">
              <FormattedMessage
                defaultMessage="We are giving away an exclusive 20% of all plans"
                description="Subtext for rewards page"
                id="SMYzrt"
              />
            </Text>
            <Text className="text-center text-neutral-600 dark:text-neutral-400" display="block" size="body1">
              <FormattedMessage
                defaultMessage="for completing simple tasks like following our socials!"
                description="Subtext for rewards page"
                id="3UVuxe"
              />
            </Text>
          </div>
        ) : (
          <div>
            <Text className="text-center text-neutral-600 dark:text-neutral-400" display="block" size="body1">
              <FormattedMessage
                defaultMessage="We are giving away exclusive promo codes for 20% off all plans."
                description="Subtext for rewards page"
                id="Vpiw8N"
              />
            </Text>
            <Text className="text-center text-neutral-600 dark:text-neutral-400" display="block" size="body1">
              <FormattedMessage
                defaultMessage="Simply complete social tasks like following our socials to claim your code!"
                description="Subtext for rewards page"
                id="wJFwf9"
              />
            </Text>
          </div>
        )
      }
    </div>
  );
}
