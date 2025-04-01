'use client';

import clsx from 'clsx';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import { useIntl } from '~/components/intl';
import ExclusiveTicket from '~/components/promotions/tickets/ExclusiveTicket';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeBorderColor } from '~/components/ui/theme';

export const SEASONAL_PROMO_CODE = 'CYBERMONDAY23';
export const SEASONAL_PROMO_CODE_DISCOUNT_PERCENTAGE = 30;

export function BlackFridayLiveBadge() {
  const intl = useIntl();

  return (
    <span
      className={clsx(
        'bg-danger inline-flex items-center gap-x-1 rounded-full px-2 py-0.5',
      )}>
      <span className="size-1.5 rounded-full bg-white" />
      <Text className="block" color="light" size="body3" weight="medium">
        {intl.formatMessage({
          defaultMessage: 'Live',
          description: 'Sale live label',
          id: 'kUfggU',
        })}
      </Text>
    </span>
  );
}

export function BlackFridayPromoCard() {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        'flex w-full flex-col gap-y-1 rounded-md p-4',
        ['border', themeBorderColor],
        themeBackgroundColor,
      )}>
      <Text className="block text-xl" size="inherit" weight="bold">
        {intl.formatMessage(
          {
            defaultMessage: '{percent}% off',
            description: 'Promo code discount percentage',
            id: 'eiyEx8',
          },
          { percent: SEASONAL_PROMO_CODE_DISCOUNT_PERCENTAGE },
        )}
      </Text>
      <div className="flex justify-between">
        <Text className="block" size="body3">
          {intl.formatMessage({
            defaultMessage: 'with code',
            description: 'Promo code label',
            id: 'q9omKc',
          })}{' '}
          <strong className="text-medium">{SEASONAL_PROMO_CODE}</strong>
        </Text>
      </div>
    </div>
  );
}

export function BlackFridayExclusiveTicket({
  width = 182,
}: Readonly<{ width?: number }>) {
  const intl = useIntl();

  return (
    <ExclusiveTicket
      padding="sm"
      ratio="normal"
      title={
        <Text className="text-2xs block" size="inherit">
          {intl.formatMessage({
            defaultMessage: 'Exclusive beta access to new product',
            description: 'Exclusive ticket title',
            id: 'XMXhLh',
          })}
        </Text>
      }
      tooltip={intl.formatMessage({
        defaultMessage:
          '"2 months free exclusive beta access to our new mystery product dropping in Jan – Feb 2024"',
        description: 'Exclusive ticket tooltip',
        id: 'CgF99H',
      })}
      width={width}
    />
  );
}

export function BlackFridaySpecial() {
  const intl = useIntl();
  const { userProfile, isUserProfileLoading } = useUserProfile();

  if (isUserProfileLoading || userProfile?.isInterviewsPremium) {
    return null;
  }

  return (
    <div
      className={clsx(
        'rounded-md border p-3',
        themeBorderColor,
        'bg-neutral-50 dark:bg-neutral-900',
      )}>
      <div className="flex w-full items-center justify-between">
        <Text className="block" size="body3" weight="medium">
          {intl.formatMessage({
            defaultMessage: 'Cyber Monday Sale',
            description: 'Cyber Monday Sale label',
            id: 'R9kAtY',
          })}
        </Text>
        <BlackFridayLiveBadge />
      </div>
      <div className="flex flex-col items-center gap-2 pt-4">
        <BlackFridayPromoCard />
        <Text
          className="block text-lg leading-5"
          color="secondary"
          size="inherit"
          weight="medium">
          +
        </Text>
        <BlackFridayExclusiveTicket />
        <Text className="block" color="secondary" size="body3" weight="medium">
          {intl.formatMessage({
            defaultMessage: 'With every purchase',
            description: 'Label for with every purchase for Black Friday sale',
            id: 'ZwXhsm',
          })}
        </Text>
      </div>
    </div>
  );
}
