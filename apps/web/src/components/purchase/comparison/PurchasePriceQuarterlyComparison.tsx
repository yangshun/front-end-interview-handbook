import { FormattedMessage } from '~/components/intl';
import type { PurchasePrice } from '~/components/purchase/PurchaseTypes';

import PurchasePriceLabel from '../PurchasePriceLabel';

type Props = Readonly<{
  price: PurchasePrice;
}>;

export default function PurchasePriceQuarterlyComparison({ price }: Props) {
  return (
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
    </span>
  );
}
