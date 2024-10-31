import { FormattedMessage } from '~/components/intl';
import type { PurchasePrice } from '~/components/purchase/PurchaseTypes';

import PurchasePriceLabel from '../PurchasePriceLabel';

type Props = Readonly<{
  price: PurchasePrice;
}>;

export default function PurchasePriceAnnualComparison({ price }: Props) {
  return (
    <span className="whitespace-nowrap">
      <FormattedMessage
        defaultMessage="{price} billed yearly"
        description="Description of billing frequency for annual plan"
        id="7uB2Jj"
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
