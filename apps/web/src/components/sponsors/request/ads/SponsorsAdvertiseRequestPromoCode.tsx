import clsx from 'clsx';
import { useState } from 'react';
import { RiCheckLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import { SponsorsPromoCodeConfig } from '~/components/sponsors/SponsorsPromoCodeConfig';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeTextSuccessColor } from '~/components/ui/theme';

type Props = Readonly<{
  appliedPromoCode?: string;
  className?: string;
  onApplyPromoCode: ({
    code,
    percentOff,
  }: Readonly<{ code: string; percentOff: number }>) => void;
}>;

export default function SponsorsAdvertiseRequestPromoCode({
  appliedPromoCode,
  className,
  onApplyPromoCode,
}: Props) {
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Add promotion code',
    description: 'Label to add promotion code',
    id: 'YQhqx6',
  });
  const [isValidated, setIsValidated] = useState(!!appliedPromoCode);
  const [promoCode, setPromoCode] = useState<{
    error: boolean;
    percentOff: number | null;
    value: string;
  }>({
    error: false,
    percentOff:
      SponsorsPromoCodeConfig[appliedPromoCode ?? '']?.percentOff ?? null,
    value: appliedPromoCode ?? '',
  });

  async function handleValidate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = SponsorsPromoCodeConfig[promoCode.value];

    setIsValidated(data != null);
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
        percentOff: data.percentOff,
        value: data.code,
      });
    } else {
      setPromoCode({
        ...promoCode,
        error: true,
        percentOff: null,
        value: promoCode.value,
      });
    }
  }

  return (
    <div className={clsx('space-y-2', 'w-60', className)}>
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
            setIsValidated(false);
            setPromoCode({ ...promoCode, value });
          }}
        />
        {isValidated ? (
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
  );
}
