import { FormattedMessage } from '~/components/intl';
import type { PurchasePrice } from '~/components/purchase/PurchaseTypes';
import { themeTextBrandColor } from '~/components/ui/theme';

import PurchasePriceLabel from '../PurchasePriceLabel';

type Props = Readonly<{
  discount: number;
  price: PurchasePrice;
}>;

export default function PurchasePriceQuarterlyComparison({
  discount,
  price,
}: Props) {
  return (
    <span>
      <span className="whitespace-nowrap">
        <FormattedMessage
          defaultMessage="{price} billed every 3 months"
          description="Description of billing frequency for quarterly plan"
          id="2XR9B5"
          values={{
            price: (
              <PurchasePriceLabel
                amount={price.unitCostCurrency.withPPP.after}
                currency={price.currency.toUpperCase()}
                symbol={price.symbol}
              />
            ),
          }}
        />
      </span>{' '}
      <span className="whitespace-nowrap">
        <span className={themeTextBrandColor}>
          <FormattedMessage
            defaultMessage="(Save {discountPercentage}% vs monthly)"
            description="Save more compared to monthly plan."
            id="Dynazi"
            values={{
              discountPercentage: discount,
            }}
          />
        </span>
      </span>
    </span>
  );
}
