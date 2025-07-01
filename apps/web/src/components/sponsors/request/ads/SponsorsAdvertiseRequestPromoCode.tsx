import clsx from 'clsx';
import type { Dispatch, SetStateAction } from 'react';
import { RiAddLine, RiCheckLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import { SponsorsPromoCodeConfig } from '~/components/sponsors/SponsorsPromoCodeConfig';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeTextSuccessColor } from '~/components/ui/theme';

export type PromoCodeStateType = Readonly<{
  error: boolean;
  isValidated: boolean;
  percentOff: number | null;
  showInput: boolean;
  value: string;
}>;

type Props = Readonly<{
  className?: string;
  onApplyPromoCode: (
    props: Readonly<{ code: string; percentOff: number }> | null,
  ) => void;
  promoCode: Readonly<PromoCodeStateType>;
  setPromoCode: Dispatch<SetStateAction<PromoCodeStateType>>;
}>;

export default function SponsorsAdvertiseRequestPromoCode({
  className,
  onApplyPromoCode,
  promoCode,
  setPromoCode,
}: Props) {
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Add promotion code',
    description: 'Label to add promotion code',
    id: 'YQhqx6',
  });

  async function handleValidate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = SponsorsPromoCodeConfig[promoCode.value];

    if (data) {
      const discount = data.percentOff;

      if (discount > 0) {
        onApplyPromoCode({
          code: data.code,
          percentOff: discount,
        });
      }

      setPromoCode({
        ...promoCode,
        error: false,
        isValidated: true,
        percentOff: data.percentOff,
        value: data.code,
      });
    } else {
      setPromoCode({
        ...promoCode,
        error: true,
        isValidated: false,
        percentOff: null,
        value: promoCode.value,
      });
      onApplyPromoCode(null);
    }
  }

  return promoCode.showInput ? (
    <div className={clsx('space-y-2', 'w-full sm:w-60', className)}>
      <form className="relative" onSubmit={handleValidate}>
        <TextInput
          className="pr-8"
          errorMessage={
            promoCode.error
              ? intl.formatMessage({
                  defaultMessage: 'Invalid promo code',
                  description: 'Error message for invalid promotion code',
                  id: 'isHmCU',
                })
              : undefined
          }
          isLabelHidden={true}
          label={label}
          placeholder={label}
          size="sm"
          value={promoCode.value}
          onChange={(value) => {
            setPromoCode({ ...promoCode, isValidated: false, value });
          }}
        />
        {promoCode.isValidated ? (
          <RiCheckLine
            aria-hidden={true}
            className={clsx(
              'absolute right-3 top-2',
              'size-4',
              themeTextSuccessColor,
            )}
          />
        ) : (
          <Button
            className="absolute right-1.5 top-0.5"
            icon={RiCheckLine}
            isDisabled={promoCode.value.length === 0}
            isLabelHidden={true}
            label={label}
            size="xs"
            type="submit"
            variant="tertiary"
          />
        )}
      </form>
      {promoCode.percentOff && (
        <Text color="secondary" size="body3">
          {intl.formatMessage(
            {
              defaultMessage: 'Code successfully applied! {percentOff}% off',
              description: 'Message when promo code is successfully applied',
              id: 'Lqq1vK',
            },
            { percentOff: promoCode.percentOff },
          )}
        </Text>
      )}
    </div>
  ) : (
    <Button
      addonPosition="start"
      icon={RiAddLine}
      label={intl.formatMessage({
        defaultMessage: 'Add promo code',
        description: 'Label to add promotion code',
        id: 'dWNz1P',
      })}
      size="md"
      variant="secondary"
      onClick={() => setPromoCode((prev) => ({ ...prev, showInput: true }))}
    />
  );
}
