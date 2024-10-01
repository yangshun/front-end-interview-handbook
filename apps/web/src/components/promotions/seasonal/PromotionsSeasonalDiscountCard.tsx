import clsx from 'clsx';
import { RiFileCopyLine } from 'react-icons/ri';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import {
  PERPETUAL_PROMO_CODE,
  PERPETUAL_PROMO_CODE_DISCOUNT_PERCENTAGE,
} from '~/data/PromotionConfig';

import { FormattedMessage, useIntl } from '~/components/intl';
import PurchaseBlockCard from '~/components/purchase/PurchaseBlockCard';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import { PromotionsEmailUsLink } from '../PromotionsEmailUsLink';

export function PromotionsSeasonalDiscountCard() {
  const intl = useIntl();
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);

  return (
    <PurchaseBlockCard
      features={[
        intl.formatMessage({
          defaultMessage:
            'One-time use; only applicable to GreatFrontEnd Annual plan.',
          description: 'Condition for promotion',
          id: 'Lnj3bs',
        }),
        intl.formatMessage({
          defaultMessage:
            'Can only be redeemed once per eligible user; duplicate accounts prohibited.',
          description: 'Condition for promotion',
          id: 'V5oBr9',
        }),
      ]}
      footer={
        <div className="flex justify-end text-xs">
          <PromotionsEmailUsLink />
        </div>
      }
      rightSectionContents={
        <>
          <div className="mt-4 flex items-end gap-1">
            <Text
              className={clsx('inline-flex items-center text-5xl font-bold')}>
              {PERPETUAL_PROMO_CODE_DISCOUNT_PERCENTAGE}%
            </Text>
            <Text
              className="text-xl font-medium tracking-normal"
              color="label"
              size="inherit"
              weight="bold">
              <FormattedMessage
                defaultMessage="OFF"
                description="Amount cashback/discount"
                id="piqimi"
              />
            </Text>
          </div>
          <Text
            className="mt-4 block"
            color="secondary"
            size="body2"
            weight="medium">
            <FormattedMessage
              defaultMessage="GreatFrontEnd Annual"
              description="GFE annual plan"
              id="GDgFZ0"
            />
          </Text>
          <div className="mt-4">
            <Button
              display="block"
              icon={RiFileCopyLine}
              label={
                isCopied
                  ? intl.formatMessage({
                      defaultMessage: 'Copied!',
                      description: 'Indication that text has been copied',
                      id: 'EHngws',
                    })
                  : PERPETUAL_PROMO_CODE
              }
              size="md"
              type="button"
              variant="primary"
              onClick={() => {
                onCopy(PERPETUAL_PROMO_CODE);
              }}
            />
          </div>
          <Text className="mt-2 block" color="secondary" size="body3">
            <FormattedMessage
              defaultMessage="Use code at checkout"
              description="Instruction to apply discount"
              id="Ad94JV"
            />
          </Text>
        </>
      }
      subtitle={
        <FormattedMessage
          defaultMessage="{discountPercentage}% off GreatFrontEnd Annual plan."
          description="Subtitle of discount promotion card"
          id="k64L83"
          values={{
            discountPercentage: PERPETUAL_PROMO_CODE_DISCOUNT_PERCENTAGE,
          }}
        />
      }
      title={
        <div className="flex items-center gap-x-2">
          <FormattedMessage
            defaultMessage="Fall Discount"
            description="Promotion title"
            id="dPdK9A"
          />
          <Badge
            label={intl.formatMessage({
              defaultMessage: 'While offer lasts',
              description: 'Label to indicate offer is a limited time deal',
              id: 'N5Cp1r',
            })}
            variant="special"
          />
        </div>
      }
    />
  );
}
