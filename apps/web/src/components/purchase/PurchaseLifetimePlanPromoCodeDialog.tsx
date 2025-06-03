import clsx from 'clsx';
import { useState } from 'react';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';
import type Stripe from 'stripe';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import {
  themeBorderSecondaryColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import PurchasePriceLabel from './PurchasePriceLabel';
import { getDiscountedPrice } from './PurchasePricingUtils';
import type { PurchasePricingPlanPaymentConfigLocalized } from './PurchaseTypes';

type Props = Readonly<{
  errorMessage: string | null;
  isLoading: boolean;
  isShown: boolean;
  onClose: () => void;
  onContinue: (promoCode: string | undefined) => Promise<void>;
  paymentConfig: PurchasePricingPlanPaymentConfigLocalized;
}>;

export default function PurchaseLifetimePlanPromoCodeDialog({
  errorMessage,
  isLoading,
  isShown,
  onClose,
  onContinue,
  paymentConfig,
}: Props) {
  const intl = useIntl();
  const [showPromoCodeInput, setShowPromoCodeInput] = useState(false);
  const [promoCodeData, setPromoCodeData] =
    useState<Stripe.PromotionCode | null>(null);
  const getPromoCodeMutation = trpc.promotions.getPromoCode.useMutation();

  const label = intl.formatMessage({
    defaultMessage: 'Lifetime plan',
    description:
      'Title of LifeTime Access Pricing Plan found on Homepage or Pricing page',
    id: 'riPEvL',
  });

  const actualPrice = (
    <FormattedPrice
      amount={paymentConfig.unitCostCurrency.withPPP.after}
      currency={paymentConfig.currency.toUpperCase()}
      symbol={paymentConfig.symbol}
    />
  );

  async function validatePromoCode(code: string) {
    const data = await getPromoCodeMutation.mutateAsync({
      code,
    });

    setPromoCodeData(data);

    return data;
  }

  const discountedPrice = getDiscountedPrice({
    amountOff: promoCodeData?.coupon.amount_off,
    percentOff: promoCodeData?.coupon.percent_off,
    price: paymentConfig.unitCostCurrency.withPPP.after,
  });

  return (
    <Dialog
      isShown={isShown}
      primaryButton={
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Continue',
            description: 'Label for continue to checkout button',
            id: 'nSJ/yC',
          })}
          size="md"
          variant="primary"
          onClick={() => onContinue(promoCodeData?.code)}
        />
      }
      secondaryButton={
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Cancel',
            description: 'Label for button to cancel action',
            id: 'rfI2w+',
          })}
          size="md"
          variant="secondary"
          onClick={onClose}
        />
      }
      title={label}
      width="sm"
      onClose={onClose}>
      <div className="mb-2 space-y-2.5">
        <div className="flex items-center justify-between gap-2.5">
          <Text color="secondary" size="body2">
            {label}
          </Text>
          <Text size="body2">{actualPrice}</Text>
        </div>
        <Divider color="emphasized" />
        <div className="flex items-center justify-between gap-2.5">
          <Text color="secondary" size="body2">
            {intl.formatMessage({
              defaultMessage: 'Sub total',
              description: 'Label for sub total price',
              id: 'vLsSQG',
            })}
          </Text>
          <Text size="body2">{actualPrice}</Text>
        </div>
        {promoCodeData ? (
          <div className="flex items-center justify-between gap-2.5">
            <CouponCodeBadge
              amountOff={promoCodeData.coupon.amount_off}
              code={promoCodeData.code}
              percentOff={promoCodeData.coupon.percent_off}
              onRemoveCode={() => setPromoCodeData(null)}
            />
            <Text size="body2">
              <FormattedPrice
                amount={discountedPrice}
                currency={paymentConfig.currency.toUpperCase()}
                symbol={paymentConfig.symbol}
              />
            </Text>
          </div>
        ) : showPromoCodeInput ? (
          <PromoCodeInput
            isValidating={getPromoCodeMutation.isLoading}
            onValidate={validatePromoCode}
          />
        ) : (
          <button type="button" onClick={() => setShowPromoCodeInput(true)}>
            <Text size="body2" weight="medium">
              {intl.formatMessage({
                defaultMessage: 'Add promotion code',
                description: 'Label to add promotion code',
                id: 'YQhqx6',
              })}
            </Text>
          </button>
        )}
        {errorMessage && (
          <Text className="text-center" color="error" size="body3">
            {errorMessage}
          </Text>
        )}
        <Divider color="emphasized" />
        <div className="flex items-center justify-between gap-2.5">
          <Text color="secondary" size="body2">
            {intl.formatMessage({
              defaultMessage: 'Total due',
              description: 'Label for total due price',
              id: 'Fxe4CE',
            })}
          </Text>
          <Text size="body1" weight="bold">
            <FormattedPrice
              amount={discountedPrice}
              currency={paymentConfig.currency.toUpperCase()}
              symbol={paymentConfig.symbol}
            />
          </Text>
        </div>
      </div>
    </Dialog>
  );
}

function CouponCodeBadge({
  amountOff,
  code,
  onRemoveCode,
  percentOff,
}: Readonly<{
  amountOff?: number | null;
  code: string;
  onRemoveCode: () => void;
  percentOff?: number | null;
}>) {
  const intl = useIntl();

  return (
    <span
      className={clsx(
        'inline-flex items-center',
        'rounded-full',
        'gap-1 px-2 py-px',
        ['border', themeBorderSecondaryColor],
      )}>
      <Text color="secondary" size="body3" weight="medium">
        {code}
        {' - '}
        {percentOff
          ? intl.formatMessage(
              {
                defaultMessage: '{percentOff}% off',
                description: 'Label for promotion code discount',
                id: 'tRQG6L',
              },
              { percentOff },
            )
          : amountOff
            ? intl.formatMessage(
                {
                  defaultMessage: '{amountOff} off',
                  description: 'Label for promotion code discount',
                  id: 'mLrZGz',
                },
                { amountOff },
              )
            : null}
      </Text>
      <button type="button" onClick={onRemoveCode}>
        <RiCloseLine className={clsx('size-4', themeTextSecondaryColor)} />
      </button>
    </span>
  );
}

function FormattedPrice({
  amount,
  currency,
  symbol,
}: {
  amount: number;
  currency: string;
  symbol: string;
}) {
  return (
    <PurchasePriceLabel amount={amount} currency={currency} symbol={symbol}>
      {(parts) => (
        <Text color="default" size="inherit" weight="inherit">
          <>
            {parts[0].value}
            {parts
              .slice(1)
              .map((part) => part.value)
              .join('')}
          </>
        </Text>
      )}
    </PurchasePriceLabel>
  );
}

function PromoCodeInput({
  isValidating,
  onValidate,
}: Readonly<{
  isValidating: boolean;
  onValidate: (code: string) => Promise<Stripe.PromotionCode | null>;
}>) {
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Add promotion code',
    description: 'Label to add promotion code',
    id: 'YQhqx6',
  });
  const [promoCode, setPromoCode] = useState({
    error: false,
    value: '',
  });

  async function handleValidate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = await onValidate(promoCode.value);

    setPromoCode(
      data ? { error: false, value: '' } : { ...promoCode, error: true },
    );
  }

  return (
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
        value={promoCode.value}
        onChange={(value) => setPromoCode({ ...promoCode, value })}
      />
      <Button
        className="absolute right-1.5 top-1"
        icon={RiCheckLine}
        isDisabled={promoCode.value.length === 0 || isValidating}
        isLabelHidden={true}
        isLoading={isValidating}
        label={label}
        size="xs"
        type="submit"
        variant="tertiary"
      />
    </form>
  );
}
