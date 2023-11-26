import clsx from 'clsx';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import {
  SEASONAL_PROMO_CODE,
  SEASONAL_PROMO_CODE_DISCOUNT_PERCENTAGE,
} from '~/data/PromotionConfig';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeLineColor } from '~/components/ui/theme';

import ExclusiveTicket from '../ExclusiveTicket';

export function BlackFridayLiveBadge() {
  return (
    <span
      className={clsx(
        'bg-danger inline-flex items-center gap-x-1 rounded-full px-2 py-0.5',
      )}>
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      <Text color="light" display="block" size="body3" weight="medium">
        Live
      </Text>
    </span>
  );
}

export function BlackFridayPromoCard() {
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);

  return (
    <div
      className={clsx(
        'flex w-full flex-col gap-y-1 rounded-md p-4',
        ['border', themeLineColor],
        themeBackgroundColor,
      )}>
      <Text className="text-xl" display="block" size="custom" weight="bold">
        {SEASONAL_PROMO_CODE_DISCOUNT_PERCENTAGE}% off
      </Text>
      <div className="flex justify-between">
        <Text display="block" size="body3">
          with code{' '}
          <strong className="text-medium">{SEASONAL_PROMO_CODE}</strong>
        </Text>
      </div>
    </div>
  );
}

export function BlackFridayExclusiveTicket({
  width = 182,
}: Readonly<{ width?: number }>) {
  return (
    <ExclusiveTicket
      padding="sm"
      ratio="normal"
      title={
        <Text className="text-2xs" display="block" size="custom">
          Exclusive beta access to new product
        </Text>
      }
      tooltip="2 months free exclusive beta access to our new mystery product dropping in Jan – Feb 2024"
      width={width}
    />
  );
}

export function BlackFridaySpecial() {
  const { userProfile, isUserProfileLoading } = useUserProfile();

  if (isUserProfileLoading || userProfile?.isPremium) {
    return null;
  }

  return (
    <div
      className={clsx(
        'rounded-md border p-3',
        themeLineColor,
        'bg-neutral-50 dark:bg-neutral-900',
      )}>
      <div className="flex w-full items-center justify-between">
        <Text display="block" size="body3" weight="medium">
          Cyber Monday Sale
        </Text>
        <BlackFridayLiveBadge />
      </div>
      <div className="flex flex-col items-center gap-2 pt-4">
        <BlackFridayPromoCard />
        <Text
          className="text-lg leading-5"
          color="secondary"
          display="block"
          size="custom"
          weight="medium">
          +
        </Text>
        <BlackFridayExclusiveTicket />
        <Text color="secondary" display="block" size="body3" weight="medium">
          With every purchase
        </Text>
      </div>
    </div>
  );
}
