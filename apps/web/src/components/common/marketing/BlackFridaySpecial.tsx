import clsx from 'clsx';
import { RiFileCopyLine } from 'react-icons/ri';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import {
  SEASONAL_PROMO_CODE,
  SEASONAL_PROMO_CODE_DISCOUNT_PERCENTAGE,
} from '~/data/PromotionConfig';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import Button from '~/components/ui/Button';
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
      <Text className="text-2xl" display="block" size="custom" weight="bold">
        {SEASONAL_PROMO_CODE_DISCOUNT_PERCENTAGE}% off
      </Text>
      <div className="flex justify-between">
        <Text display="block" size="body3">
          with code{' '}
          <strong className="text-medium">{SEASONAL_PROMO_CODE}</strong>
        </Text>
        <Button
          icon={RiFileCopyLine}
          isLabelHidden={true}
          label="Copy code"
          tooltip={isCopied ? 'Copied!' : 'Copy promo code'}
          variant="secondary"
          onClick={() => {
            onCopy(SEASONAL_PROMO_CODE);
          }}
        />
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
      subtitle={
        <Text
          className="text-2xs"
          color="inherit"
          display="block"
          size="custom">
          2 months free
        </Text>
      }
      title={
        <Text className="text-2xs" display="block" size="custom">
          Exclusive beta access to our new mystery product
        </Text>
      }
      width={width}
    />
  );
}

export function BlackFridaySpecial() {
  const { userProfile } = useUserProfile();

  if (userProfile?.isPremium) {
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
          Black Friday Special
        </Text>
        <BlackFridayLiveBadge />
      </div>
      <div className="mt-4 flex flex-col items-center gap-2">
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
